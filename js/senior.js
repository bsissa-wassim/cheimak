import { translations } from './language.js';

const topicKeys = { dental: 'seniorDentalLabel', senior: 'seniorSupportLabel', both: 'seniorBothLabel' };

export function buildSeniorLinks(fields, locale = 'en') {
  const t = translations[locale] ?? translations.en;
  const clean = value => String(value ?? '').trim();
  const body = [
    t.seniorRequestTitle,
    `${t.fullName}: ${clean(fields.fullName)}`,
    `${t.emailAddress}: ${clean(fields.email)}`,
    fields.phone ? `${t.phoneNumber}: ${clean(fields.phone)}` : '',
    fields.country ? `${t.countryLabel}: ${t[{ Canada: 'countryCanada', 'United States': 'countryUsa', Other: 'countryOther' }[fields.country]] ?? clean(fields.country)}` : '',
    `${t.seniorTopicLabel}: ${t[topicKeys[fields.topic]] ?? clean(fields.topic)}`,
    fields.message?.trim() ? `${t.seniorMessageLabel}: ${clean(fields.message)}` : '',
  ].filter(Boolean).join('\n');
  return {
    whatsapp: `https://wa.me/15145703037?text=${encodeURIComponent(body)}`,
    email: `mailto:info.glowlink@gmail.com?subject=${encodeURIComponent(t.seniorEmailSubject)}&body=${encodeURIComponent(body)}`,
  };
}

export function initSeniorContact() {
  const form = document.querySelector('[data-senior-form]');
  if (!form) return;
  const status = form.querySelector('[data-senior-status]');
  const actions = form.querySelector('[data-senior-actions]');
  const whatsapp = form.querySelector('[data-senior-whatsapp]');
  const email = form.querySelector('[data-senior-email]');
  let hasDraft = false;

  const clear = () => {
    hasDraft = false;
    status.textContent = '';
    actions.hidden = true;
    whatsapp.removeAttribute('href');
    email.removeAttribute('href');
  };
  const prepare = () => {
    const locale = document.documentElement.lang;
    const links = buildSeniorLinks(Object.fromEntries(new FormData(form)), locale);
    whatsapp.href = links.whatsapp;
    email.href = links.email;
    actions.hidden = false;
    status.textContent = (translations[locale] ?? translations.en).seniorDraftReady;
    hasDraft = true;
  };
  form.addEventListener('submit', event => {
    event.preventDefault();
    for (const name of ['fullName', 'email']) {
      const field = form.elements.namedItem(name);
      field.value = field.value.trim();
    }
    if (!form.reportValidity()) return;
    prepare();
  });
  form.addEventListener('input', clear);
  form.addEventListener('change', clear);
  form.addEventListener('reset', clear);
  document.addEventListener('glowlink:languagechange', () => { if (hasDraft) prepare(); });
  document.addEventListener('click', event => {
    if (event.defaultPrevented || event.button !== 0 || event.metaKey || event.ctrlKey || event.shiftKey || event.altKey) return;
    const link = event.target.closest?.('a[data-senior-topic]');
    if (!link || !Object.hasOwn(topicKeys, link.dataset.seniorTopic)) return;
    form.elements.namedItem('topic').value = link.dataset.seniorTopic;
    clear();
  });
  form.querySelector('[data-senior-fields]').disabled = false;
  const mobileQuote = document.querySelector('.mobile-quote');
  const contactSection = document.getElementById?.('quote');
  if (mobileQuote && contactSection && typeof window !== 'undefined' && 'IntersectionObserver' in window) {
    const observer = new window.IntersectionObserver(([entry]) => {
      mobileQuote.hidden = entry.isIntersecting;
    }, { threshold: 0 });
    observer.observe(contactSection);
  }
}

if (typeof document !== 'undefined') initSeniorContact();
