import { translations } from './language.js';

const EMAIL = 'info.glowlink@gmail.com';
const WHATSAPP = '15145703037';
const countryKeys = {
  Canada: 'countryCanada',
  'United States': 'countryUsa',
  Other: 'countryOther',
};
const procedureKeys = {
  BBL: 'procedureBbl',
  Liposuction: 'procedureLiposuction',
  'Tummy tuck / Abdominoplasty': 'procedureTummyTuck',
  Rhinoplasty: 'procedureRhinoplasty',
  'Breast augmentation': 'procedureBreast',
  Other: 'procedureOther',
};

function dictionaryFor(locale) {
  return translations[Object.hasOwn(translations, locale) ? locale : 'en'];
}

// URL generation is separate from opening a draft. Nothing is stored or sent.
export function buildQuoteLinks(fields, locale = 'en') {
  const t = dictionaryFor(locale);
  const clean = (value) => String(value ?? '').trim();
  const country = clean(fields.country);
  const procedure = clean(fields.procedure);
  const message = clean(fields.message);
  const body = [
    t.contactRequestTitle,
    `${t.fullName}: ${clean(fields.fullName)}`,
    `${t.emailAddress}: ${clean(fields.email)}`,
    `${t.phoneNumber}: ${clean(fields.phone)}${fields.whatsapp ? ' (WhatsApp)' : ''}`,
    `${t.countryLabel}: ${t[countryKeys[country]] ?? country}`,
    `${t.procedureLabel}: ${t[procedureKeys[procedure]] ?? procedure}`,
    message ? `${t.messageLabel}: ${message}` : '',
  ].filter(Boolean).join('\n');

  return {
    whatsappUrl: `https://wa.me/${WHATSAPP}?text=${encodeURIComponent(body)}`,
    emailUrl: `mailto:${EMAIL}?subject=${encodeURIComponent(t.contactEmailSubject)}&body=${encodeURIComponent(body)}`,
  };
}

export function initContact() {
  const form = document.querySelector('[data-contact-form]');
  if (!form) return;

  const fieldset = form.querySelector('[data-contact-fields]');
  const status = form.querySelector('[data-contact-status]');
  const actions = form.querySelector('[data-contact-actions]');
  const retry = form.querySelector('[data-contact-retry]');
  const retryLabel = retry.querySelector('[data-i18n]');
  const emailFallback = form.querySelector('[data-contact-email]');
  let hasDraft = false;

  const readFields = () => {
    const data = new FormData(form);
    return {
      fullName: data.get('fullName'),
      email: data.get('email'),
      phone: data.get('phone'),
      country: data.get('country'),
      procedure: data.get('procedure'),
      message: data.get('message'),
      whatsapp: data.has('whatsapp'),
    };
  };

  const setStatus = (key) => {
    status.dataset.i18n = key;
    status.textContent = dictionaryFor(document.documentElement.lang)[key];
  };

  const prepareDraft = () => {
    const fields = readFields();
    const t = dictionaryFor(document.documentElement.lang);
    const links = buildQuoteLinks(fields, document.documentElement.lang);
    const retryKey = fields.whatsapp ? 'contactRetryWhatsapp' : 'contactRetryEmail';
    retry.href = fields.whatsapp ? links.whatsappUrl : links.emailUrl;
    if (fields.whatsapp) {
      retry.target = '_blank';
      retry.rel = 'noopener noreferrer';
    } else {
      retry.removeAttribute('target');
      retry.removeAttribute('rel');
    }
    retryLabel.dataset.i18n = retryKey;
    retryLabel.textContent = t[retryKey];
    emailFallback.href = links.emailUrl;
    emailFallback.hidden = !fields.whatsapp;
    actions.hidden = false;
    hasDraft = true;
    setStatus(fields.whatsapp ? 'contactWhatsappDraft' : 'contactEmailDraft');
    return { fields, links };
  };

  const clearDraft = () => {
    hasDraft = false;
    status.textContent = '';
    delete status.dataset.i18n;
    actions.hidden = true;
    retry.removeAttribute('href');
    emailFallback.href = `mailto:${EMAIL}`;
  };

  form.addEventListener('submit', (event) => {
    event.preventDefault();
    for (const name of ['fullName', 'email', 'phone']) {
      const input = form.elements.namedItem(name);
      input.value = input.value.trim();
    }
    if (!form.reportValidity()) return;

    const { fields, links } = prepareDraft();
    try {
      if (fields.whatsapp) {
        window.open(links.whatsappUrl, '_blank', 'noopener,noreferrer');
      } else {
        window.location.assign(links.emailUrl);
      }
    } catch {
      // The generated links still work if automatic opening is unavailable.
      setStatus('contactManualDraft');
    }
  });

  form.addEventListener('input', clearDraft);
  form.addEventListener('reset', clearDraft);
  document.addEventListener('click', (event) => {
    if (event.defaultPrevented || event.button > 0 || event.ctrlKey || event.metaKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[data-procedure][href="#quote"]');
    if (!link) return;
    const procedure = form.elements.namedItem('procedure');
    if (Array.from(procedure.options).some(option => !option.disabled && option.value === link.dataset.procedure)) {
      procedure.value = link.dataset.procedure;
      clearDraft();
    }
    // Keep native anchor navigation; do not submit or open an external draft.
  });
  document.addEventListener('glowlink:languagechange', () => {
    if (hasDraft) prepareDraft();
  });

  // Native submission remains disabled until the handler above is attached.
  fieldset.disabled = false;

  const mobileQuote = document.querySelector('.mobile-quote');
  if (!mobileQuote) return;
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver(([entry]) => {
      mobileQuote.hidden = entry.isIntersecting;
    });
    observer.observe(document.getElementById('quote'));
  } else {
    form.addEventListener('focusin', () => { mobileQuote.hidden = true; });
    form.addEventListener('focusout', (event) => {
      if (!form.contains(event.relatedTarget)) mobileQuote.hidden = false;
    });
  }
}
