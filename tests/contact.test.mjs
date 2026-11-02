import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { translations } from '../js/language.js';
import { buildQuoteLinks, initContact } from '../js/contact.js';

const example = {
  fullName: '  Alex Test & Démo  ',
  email: 'alex+quote@example.com',
  phone: '+1 555 0100',
  country: 'United States',
  procedure: 'Liposuction',
  message: 'A & B? #test\nLine two + é',
  whatsapp: true,
};

test('EN/FR dictionaries cover every real page translation hook', () => {
  assert.deepEqual(Object.keys(translations.en).sort(), Object.keys(translations.fr).sort());
  const html = readFileSync(new URL('../index.html', import.meta.url), 'utf8');
  for (const match of html.matchAll(/data-i18n(?:-aria-label|-alt|-content)?="([^"]+)"/g)) {
    for (const locale of ['en', 'fr']) {
      assert.equal(typeof translations[locale][match[1]], 'string', `${locale}: ${match[1]}`);
    }
  }
});

test('quote URLs preserve encoded input, fixed recipients and localized choices', () => {
  const original = structuredClone(example);
  for (const locale of ['en', 'fr']) {
    const links = buildQuoteLinks(example, locale);
    const wa = new URL(links.whatsappUrl);
    const email = new URL(links.emailUrl);
    assert.equal(wa.origin, 'https://wa.me');
    assert.equal(wa.pathname, '/15145703037');
    assert.deepEqual([...wa.searchParams.keys()], ['text']);
    assert.equal(email.protocol, 'mailto:');
    assert.equal(email.pathname, 'info.glowlink@gmail.com');
    assert.deepEqual([...email.searchParams.keys()], ['subject', 'body']);
    assert.equal(email.searchParams.get('subject'), translations[locale].contactEmailSubject);
    const body = wa.searchParams.get('text');
    assert.equal(body, email.searchParams.get('body'));
    for (const text of ['Alex Test & Démo', example.email, example.message, ' (WhatsApp)']) {
      assert.ok(body.includes(text));
    }
    if (locale === 'fr') {
      assert.ok(body.includes('États-Unis'));
      assert.ok(body.includes('Liposuccion'));
    }
  }
  assert.deepEqual(example, original);
  const noNote = new URL(buildQuoteLinks({ ...example, message: '   ', whatsapp: false }).whatsappUrl).searchParams.get('text');
  assert.ok(!noNote.includes('(optional)'));
  assert.ok(!noNote.includes(' (WhatsApp)'));
  assert.equal(buildQuoteLinks(example, '__proto__').emailUrl, buildQuoteLinks(example, 'en').emailUrl);
});

// Fixtures exercise handlers without a browser, network requests or app launches.
const globalNames = ['document', 'window', 'FormData', 'IntersectionObserver'];
const originals = new Map(globalNames.map(name => [name, Object.getOwnPropertyDescriptor(globalThis, name)]));
after(() => {
  for (const [name, descriptor] of originals) {
    if (descriptor) Object.defineProperty(globalThis, name, descriptor);
    else delete globalThis[name];
  }
});

function fixture(useObserver = true) {
  const handlers = {}, docHandlers = {}, calls = [];
  const inputs = Object.fromEntries(Object.entries(example).filter(([key]) => key !== 'whatsapp').map(([key, value]) => [key, { value }]));
  inputs.procedure.options = [
    { value: '', disabled: true },
    ...['BBL', 'Liposuction', 'Tummy tuck / Abdominoplasty', 'Rhinoplasty', 'Breast augmentation', 'Other'].map(value => ({ value })),
  ];
  const checkbox = { checked: true };
  let disabled = true, valid = true, observerCallback;
  const fieldset = {
    get disabled() { return disabled; },
    set disabled(value) { assert.equal(typeof handlers.submit, 'function'); disabled = value; },
  };
  const status = { dataset: {}, textContent: '' };
  const actions = { hidden: true };
  const retryLabel = { dataset: {}, textContent: '' };
  const retry = { querySelector: () => retryLabel, removeAttribute(name) { delete this[name]; } };
  const email = { href: 'mailto:info.glowlink@gmail.com', hidden: false };
  const mobile = { hidden: false }, quote = {};
  const controls = {
    '[data-contact-fields]': fieldset, '[data-contact-status]': status,
    '[data-contact-actions]': actions, '[data-contact-retry]': retry,
    '[data-contact-email]': email,
  };
  const form = {
    querySelector: selector => controls[selector],
    elements: { namedItem: name => inputs[name] },
    addEventListener: (name, handler) => { handlers[name] = handler; },
    reportValidity: () => valid && Boolean(inputs.fullName.value),
    contains: node => Object.values(inputs).includes(node),
  };
  globalThis.document = {
    documentElement: { lang: 'en' },
    querySelector: selector => selector === '[data-contact-form]' ? form : selector === '.mobile-quote' ? mobile : null,
    getElementById: id => id === 'quote' ? quote : null,
    addEventListener: (name, handler) => { docHandlers[name] = handler; },
  };
  globalThis.FormData = class {
    constructor(target) { assert.equal(target, form); assert.equal(disabled, false); }
    get(name) { return inputs[name]?.value ?? null; }
    has(name) { return name === 'whatsapp' && checkbox.checked; }
  };
  globalThis.window = {
    open: (...args) => { calls.push(['whatsapp', ...args]); return null; },
    location: { assign: url => calls.push(['email', url]) },
  };
  if (useObserver) {
    globalThis.IntersectionObserver = class {
      constructor(callback) { observerCallback = callback; }
      observe(target) { assert.equal(target, quote); }
    };
    window.IntersectionObserver = IntersectionObserver;
  }
  initContact();
  assert.equal(disabled, false);
  return {
    handlers, docHandlers, calls, inputs, checkbox, status, actions, retry, email, mobile,
    submit() {
      let prevented = false;
      handlers.submit({ preventDefault: () => { prevented = true; } });
      assert.equal(prevented, true);
    },
    invalidate() { valid = false; },
    intersect(value) { observerCallback([{ isIntersecting: value }]); },
  };
}

test('contact handoff validates, supports both channels and clears stale drafts', () => {
  const wa = fixture();
  wa.submit();
  assert.equal(wa.calls.length, 1);
  assert.equal(wa.calls[0][0], 'whatsapp');
  assert.equal(wa.calls[0][2], '_blank');
  assert.equal(wa.calls[0][3], 'noopener,noreferrer');
  assert.equal(wa.actions.hidden, false);
  assert.equal(wa.email.hidden, false);
  assert.equal(wa.retry.href, wa.calls[0][1]);
  assert.equal(wa.status.dataset.i18n, 'contactWhatsappDraft');
  document.documentElement.lang = 'fr';
  wa.docHandlers['glowlink:languagechange']();
  assert.equal(wa.calls.length, 1, 'Changing language must not reopen an app');
  assert.ok(new URL(wa.retry.href).searchParams.get('text').startsWith('Demande de devis gratuit'));
  assert.equal(wa.inputs.message.value, example.message);
  wa.intersect(true); assert.equal(wa.mobile.hidden, true);
  wa.intersect(false); assert.equal(wa.mobile.hidden, false);
  wa.handlers.input();
  assert.equal(wa.status.textContent, '');
  assert.equal(wa.actions.hidden, true);
  assert.equal(wa.retry.href, undefined);
  assert.equal(wa.email.href, 'mailto:info.glowlink@gmail.com');
  wa.invalidate(); wa.submit();
  assert.equal(wa.calls.length, 1, 'Invalid data must not open a draft');

  const email = fixture(false);
  email.checkbox.checked = false;
  email.submit();
  assert.equal(email.calls[0][0], 'email');
  assert.equal(email.status.dataset.i18n, 'contactEmailDraft');
  assert.equal(email.email.hidden, true);
  assert.equal(email.retry.target, undefined);
  email.handlers.focusin(); assert.equal(email.mobile.hidden, true);
  email.handlers.focusout({ relatedTarget: null }); assert.equal(email.mobile.hidden, false);
  email.handlers.reset();
  assert.equal(email.status.textContent, '');
  assert.equal(email.actions.hidden, true);

  const manual = fixture();
  window.open = () => { throw new Error('Unavailable'); };
  manual.submit();
  assert.equal(manual.status.dataset.i18n, 'contactManualDraft');
  assert.equal(manual.actions.hidden, false);
  assert.ok(manual.retry.href.startsWith('https://wa.me/'));
  const whitespace = fixture();
  whitespace.inputs.fullName.value = '   ';
  whitespace.submit();
  assert.equal(whitespace.calls.length, 0);
});

test('procedure links select the enquiry subject without sending or losing entered details', () => {
  const page = fixture();
  const click = (value, overrides = {}) => page.docHandlers.click({
    button: 0,
    target: { closest: () => ({ dataset: { procedure: value } }) },
    preventDefault() { assert.fail('Native anchor navigation must remain available'); },
    ...overrides,
  });
  const previousDetails = { ...page.inputs.message };
  for (const value of ['BBL', 'Liposuction', 'Tummy tuck / Abdominoplasty', 'Rhinoplasty', 'Breast augmentation']) {
    click(value);
    assert.equal(page.inputs.procedure.value, value);
  }
  assert.equal(page.calls.length, 0);
  assert.equal(page.inputs.fullName.value, example.fullName);
  assert.deepEqual(page.inputs.message, previousDetails);
  for (const flags of [{ ctrlKey: true }, { metaKey: true }, { shiftKey: true }, { altKey: true }, { button: 1 }, { defaultPrevented: true }]) {
    click('BBL', flags);
    assert.equal(page.inputs.procedure.value, 'Breast augmentation');
  }
  click('unknown'); click('');
  assert.equal(page.inputs.procedure.value, 'Breast augmentation');
  page.submit();
  assert.equal(page.actions.hidden, false);
  click('BBL');
  assert.equal(page.actions.hidden, true);
  assert.equal(page.retry.href, undefined);
  assert.equal(page.calls.length, 1, 'Selecting another procedure must not launch another draft');
});
