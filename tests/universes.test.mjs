import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { translations, setLanguage, initLanguage } from '../js/language.js';
import { buildSeniorLinks, initSeniorContact } from '../js/senior.js';

const original = { document: globalThis.document, window: globalThis.window, FormData: globalThis.FormData };
afterEach(() => {
  for (const [key, value] of Object.entries(original)) {
    if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
  }
});

test('both experiences have complete English and French copy', () => {
  for (const page of ['index.html', 'senior-smile.html']) {
    const html = readFileSync(new URL(`../${page}`, import.meta.url), 'utf8');
    for (const [, key] of html.matchAll(/data-i18n(?:-aria-label|-alt|-content)?="([^"]+)"/g)) {
      for (const locale of ['en', 'fr']) assert.equal(typeof translations[locale][key], 'string', `${page}: ${locale}.${key}`);
    }
  }
});

test('page-specific titles and cross-page language links retain their destinations and fragments', () => {
  const links = ['./index.html', './senior-smile.html', './index.html#founder'].map(path => ({
    dataset: { universeLink: path }, setAttribute(key, value) { this[key] = value; },
  }));
  globalThis.document = {
    body: { dataset: { page: 'senior' } }, documentElement: { lang: 'en' },
    querySelectorAll: selector => selector === '[data-universe-link]' ? links : [],
    querySelector: () => ({ addEventListener() {} }), dispatchEvent() {},
  };
  globalThis.window = { location: { search: '?lang=fr' } };
  initLanguage();
  assert.equal(document.documentElement.lang, 'fr');
  assert.equal(document.title, translations.fr.seniorPageTitle);
  assert.deepEqual(links.map(link => link.href), ['./index.html?lang=fr', './senior-smile.html?lang=fr', './index.html?lang=fr#founder']);
  document.body.dataset.page = 'health';
  setLanguage('en');
  assert.equal(document.title, translations.en.pageTitle);
  assert.equal(links[2].href, './index.html?lang=en#founder');
  assert.equal(setLanguage('unsupported'), false);
  assert.equal(document.documentElement.lang, 'en');
});

test('senior drafts preserve text, use the right recipients and translate each topic', () => {
  for (const locale of ['en', 'fr']) {
    for (const [topic, key] of Object.entries({ dental: 'seniorDentalLabel', senior: 'seniorSupportLabel', both: 'seniorBothLabel' })) {
      const fields = { fullName: '  Alex & Amélie  ', email: 'alex+test@example.com', phone: '+1 555 0100', country: 'United States', topic, message: 'Questions? & #\nDeuxième ligne' };
      const links = buildSeniorLinks(fields, locale);
      const wa = new URL(links.whatsapp);
      const email = new URL(links.email);
      assert.equal(wa.origin, 'https://wa.me');
      assert.equal(wa.pathname, '/15145703037');
      assert.equal(email.pathname, 'info.glowlink@gmail.com');
      assert.equal(email.searchParams.get('subject'), translations[locale].seniorEmailSubject);
      const body = wa.searchParams.get('text');
      assert.equal(body, email.searchParams.get('body'));
      for (const text of ['Alex & Amélie', fields.email, fields.phone, translations[locale].countryUsa, fields.message, translations[locale][key]]) assert.ok(body.includes(text));
      assert.equal(fields.fullName, '  Alex & Amélie  ');
    }
  }
});

test('senior contact validates, refreshes translated drafts and clears stale links without losing fields', () => {
  const events = {}, documentEvents = {};
  const fields = Object.fromEntries(Object.entries({ fullName: '  Alex  ', email: ' alex@example.com ', topic: 'dental', message: 'Keep my note' }).map(([key, value]) => [key, { value }]));
  const status = { textContent: '' }, actions = { hidden: true }, fieldset = { disabled: true };
  const anchor = () => ({ removeAttribute(key) { delete this[key]; } });
  const wa = anchor(), email = anchor();
  const nodes = { '[data-senior-status]': status, '[data-senior-actions]': actions, '[data-senior-whatsapp]': wa, '[data-senior-email]': email, '[data-senior-fields]': fieldset };
  let valid = false;
  const form = { querySelector: selector => nodes[selector], elements: { namedItem: name => fields[name] }, reportValidity: () => valid, addEventListener: (name, fn) => { events[name] = fn; } };
  globalThis.document = { documentElement: { lang: 'en' }, querySelector: () => form, addEventListener: (name, fn) => { documentEvents[name] = fn; } };
  globalThis.FormData = class {
    constructor(target) { assert.equal(target, form); }
    *[Symbol.iterator]() { for (const [key, field] of Object.entries(fields)) yield [key, field.value]; }
  };
  initSeniorContact();
  assert.equal(fieldset.disabled, false);
  events.submit({ preventDefault() {} });
  assert.equal(actions.hidden, true);
  valid = true;
  events.submit({ preventDefault() {} });
  assert.equal(actions.hidden, false);
  assert.equal(fields.fullName.value, 'Alex');
  document.documentElement.lang = 'fr';
  documentEvents['glowlink:languagechange']();
  assert.equal(status.textContent, translations.fr.seniorDraftReady);
  assert.ok(new URL(wa.href).searchParams.get('text').includes(translations.fr.seniorDentalLabel));
  events.input();
  assert.equal(actions.hidden, true);
  assert.equal(wa.href, undefined);
  assert.equal(email.href, undefined);
  const click = { button: 0, target: { closest: () => ({ dataset: { seniorTopic: 'senior' } }) } };
  documentEvents.click({ ...click, ctrlKey: true });
  assert.equal(fields.topic.value, 'dental');
  documentEvents.click(click);
  assert.equal(fields.topic.value, 'senior');
  assert.equal(fields.message.value, 'Keep my note');
  events.submit({ preventDefault() {} });
  events.reset();
  assert.equal(actions.hidden, true);
  assert.equal(status.textContent, '');
});
