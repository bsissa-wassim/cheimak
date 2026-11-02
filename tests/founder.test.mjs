import test, { after } from 'node:test';
import assert from 'node:assert/strict';
import { initFounder } from '../js/founder.js';
import { setLanguage, translations } from '../js/language.js';

const original = Object.getOwnPropertyDescriptor(globalThis, 'document');
const originalWindow = Object.getOwnPropertyDescriptor(globalThis, 'window');
after(() => {
  if (original) Object.defineProperty(globalThis, 'document', original);
  else delete globalThis.document;
  if (originalWindow) Object.defineProperty(globalThis, 'window', originalWindow);
  else delete globalThis.window;
});

test('founder disclosure follows the global language and retains its state', () => {
  const control = (attributes = {}) => ({
    attributes, handlers: {}, hidden: true,
    getAttribute(name) { return this.attributes[name]; },
    setAttribute(name, value) { this.attributes[name] = value; },
    addEventListener(name, handler) { this.handlers[name] = handler; },
  });
  const label = { dataset: { i18n: 'founderLess' }, textContent: '' };
  const toggle = control({ 'aria-expanded': 'true' });
  toggle.querySelector = () => label;
  const classes = new Set(['open']);
  const panel = control({ 'aria-hidden': 'false' });
  panel.classList = { toggle(name, enabled) { if (enabled) classes.add(name); else classes.delete(name); } };
  const headerButtons = ['en', 'fr'].map(locale => ({ ...control(), dataset: { locale } }));
  const hero = { dataset: { i18n: 'heroTitle' }, textContent: '' };
  const founderHeading = { dataset: { i18n: 'founderHeader' }, textContent: '' };
  const enteredContactName = { value: 'Alex Test' };
  const hooks = [label, hero, founderHeading];
  const listeners = new Map();
  const nodes = {
    '[data-founder-vision-toggle]': toggle,
    '#vision-panel': panel,
  };
  const section = { querySelector: selector => nodes[selector] };
  globalThis.document = {
    documentElement: { lang: 'en' }, title: '',
    getElementById: id => id === 'founder' ? section : null,
    querySelectorAll: selector => selector === '[data-i18n]' ? hooks : selector === '[data-locale]' ? headerButtons : [],
    addEventListener(name, handler) { listeners.set(name, handler); },
    dispatchEvent(event) { listeners.get(event.type)?.(event); },
  };

  initFounder();
  assert.equal(toggle.hidden, false);
  assert.equal(toggle.getAttribute('aria-expanded'), 'false');
  assert.equal(panel.getAttribute('aria-hidden'), 'true');
  assert.equal(classes.has('open'), false);
  assert.equal(label.textContent, translations.en.founderMore);

  toggle.handlers.click();
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(panel.getAttribute('aria-hidden'), 'false');
  assert.equal(classes.has('open'), true);
  assert.equal(label.textContent, translations.en.founderLess);

  setLanguage('fr');
  assert.equal(document.documentElement.lang, 'fr');
  assert.equal(headerButtons[1].getAttribute('aria-pressed'), 'true');
  assert.equal(headerButtons[0].getAttribute('aria-pressed'), 'false');
  assert.equal(hero.textContent, translations.fr.heroTitle);
  assert.equal(founderHeading.textContent, translations.fr.founderHeader);
  assert.equal(label.textContent, translations.fr.founderLess);
  assert.equal(toggle.getAttribute('aria-expanded'), 'true');
  assert.equal(enteredContactName.value, 'Alex Test');

  toggle.handlers.click();
  assert.equal(label.textContent, translations.fr.founderMore);
  setLanguage('en');
  assert.equal(label.textContent, translations.en.founderMore);
  assert.equal(panel.getAttribute('aria-hidden'), 'true');
});

test('founder initialization is safe on the component review without a founder', () => {
  globalThis.document = { getElementById: () => null };
  assert.doesNotThrow(initFounder);
});

function bookFixture({ reducedMotion = false, supportsAnimation = true, autoplay = false, observed = false } = {}) {
  const listeners = new Map(), animations = [];
  const control = () => ({
    handlers: {}, attributes: {}, hidden: true,
    addEventListener(name, handler) { this.handlers[name] = handler; },
    setAttribute(name, value) { this.attributes[name] = value; },
    focus(options) { assert.equal(options.preventScroll, true); document.activeElement = this; },
  });
  const previous = control(), next = control(), controls = control();
  const previousLabel = { dataset: { i18n: 'founderPreviousChapter' }, textContent: translations.en.founderPreviousChapter };
  const nextLabel = { dataset: { i18n: 'founderNextChapter' }, textContent: translations.en.founderNextChapter };
  const titles = ['founderClinicalTitle', 'founderManagementTitle', 'founderGlowlinkTitle'].map(key => ({ dataset: { i18n: key }, textContent: translations.en[key] }));
  const pages = titles.map(title => {
    const page = { ...control(), classes: new Set(), querySelector: selector => selector === '[data-founder-page-text]' ? { textContent: 'A chapter paragraph with enough words to allow a comfortable reading interval.' } : title };
    page.classList = { toggle(name, enabled) { if (enabled) page.classes.add(name); else page.classes.delete(name); } };
    if (supportsAnimation) page.animate = () => {
      const animation = { cancelled: false, cancel() { this.cancelled = true; } };
      animations.push(animation); return animation;
    };
    return page;
  });
  const count = { textContent: '' }, status = { ...control(), textContent: '' };
  const autoplayControls = control();
  const nodes = {
    '[data-founder-chapter-step="-1"]': previous,
    '[data-founder-chapter-step="1"]': next,
    '[data-founder-book-controls]': controls,
    '[data-founder-page-count]': count,
    '[data-founder-chapter-status]': status,
    '[data-founder-autoplay-controls]': autoplay ? autoplayControls : null,
  };
  const book = { ...control(), classes: new Set(), querySelectorAll: () => pages, querySelector: selector => nodes[selector], contains: node => [previous, next].includes(node) };
  book.classList = { add: name => book.classes.add(name) };
  const section = { querySelector: selector => selector === '[data-founder-book]' ? book : null };
  globalThis.document = {
    documentElement: { lang: 'en' }, activeElement: null,
    getElementById: id => id === 'founder' ? section : null,
    querySelectorAll: selector => selector === '[data-i18n]' ? [...titles, previousLabel, nextLabel] : [],
    addEventListener: (name, handler) => listeners.set(name, handler),
    dispatchEvent: event => listeners.get(event.type)?.(event),
  };
  const timers = new Map(); let timerId = 0, motionListener, observerCallback;
  const motion = { get matches() { return reducedMotion; }, addEventListener(name, handler) { motionListener = handler; } };
  globalThis.window = {
    matchMedia: () => motion,
    setTimeout(callback, delay) { assert.ok(delay >= 7000 && delay <= 12000); timers.set(++timerId, callback); return timerId; },
    clearTimeout(id) { timers.delete(id); },
  };
  if (observed) window.IntersectionObserver = class {
    constructor(callback) { observerCallback = callback; }
    observe(target) { assert.equal(target, book); }
  };
  initFounder();
  return {
    previous, next, controls, pages, book, count, status, animations, previousLabel, nextLabel, autoplayControls, timers,
    setReducedMotion(value) { reducedMotion = value; motionListener?.({ matches: value }); },
    intersect(ratio) { observerCallback([{ isIntersecting: ratio > 0, intersectionRatio: ratio }]); },
    tick() {
      assert.equal(timers.size, 1, 'Exactly one turn should be scheduled');
      const [id, callback] = timers.entries().next().value;
      timers.delete(id); callback();
    },
    hide(value) { document.hidden = value; listeners.get('visibilitychange')(); },
    key(key, overrides = {}) {
      let prevented = false;
      book.handlers.keydown({ key, target: next, preventDefault() { prevented = true; }, ...overrides });
      return prevented;
    },
    assertPage(index) {
      assert.equal(count.textContent, `0${index + 1} / 03`);
      pages.forEach((page, i) => {
        assert.equal(page.classes.has('is-active'), i === index);
        assert.equal(page.inert, i !== index);
        assert.equal(page.attributes['aria-hidden'], String(i !== index));
      });
    },
  };
}

test('chapter book pages, keeps the current chapter on language changes and preserves usable focus', () => {
  const page = bookFixture();
  assert.equal(page.controls.hidden, false);
  assert.equal(page.book.classes.has('is-enhanced'), true);
  page.assertPage(0);
  assert.equal(page.previous.disabled, true);
  assert.equal(page.next.disabled, false);
  assert.equal(page.animations.length, 0, 'Initial setup must not animate');
  page.previous.handlers.click(); page.assertPage(0);

  document.activeElement = page.next;
  page.next.handlers.click(); page.assertPage(1);
  assert.equal(page.animations.length, 1);
  assert.ok(page.status.textContent.includes(translations.en.founderManagementTitle));
  setLanguage('fr'); page.assertPage(1);
  assert.equal(page.animations[0].cancelled, true);
  assert.ok(page.status.textContent.startsWith('Chapitre 2 sur 3'));
  assert.ok(page.status.textContent.includes(translations.fr.founderManagementTitle));
  assert.equal(page.previousLabel.textContent, translations.fr.founderPreviousChapter);
  assert.equal(page.nextLabel.textContent, translations.fr.founderNextChapter);

  page.next.handlers.click(); page.assertPage(2);
  assert.equal(page.next.disabled, true);
  assert.equal(document.activeElement, page.previous);
  const animationCount = page.animations.length;
  page.next.handlers.click(); page.assertPage(2);
  assert.equal(page.animations.length, animationCount, 'End-of-book input must not restart an animation');
  page.previous.handlers.click(); page.assertPage(1);
  assert.equal(page.animations.at(-2).cancelled, true, 'Rapid page turns cancel the preceding animation');
  page.previous.handlers.click(); page.assertPage(0);
  assert.equal(document.activeElement, page.next);
  assert.equal(page.previous.disabled, true);
});

test('chapter navigation supports keyboard, live reduced-motion preference and browsers without animation support', () => {
  const page = bookFixture({ reducedMotion: true });
  assert.equal(page.key('ArrowRight'), true); page.assertPage(1);
  assert.equal(page.animations.length, 0);
  page.key('End'); page.assertPage(2);
  page.key('Home'); page.assertPage(0);
  page.key('ArrowRight'); page.assertPage(1);
  for (const flags of [{ ctrlKey: true }, { altKey: true }, { metaKey: true }, { shiftKey: true }, { target: page.pages[1] }]) {
    assert.equal(page.key('ArrowRight', flags), false); page.assertPage(1);
  }
  assert.equal(page.key('Tab'), false);
  page.setReducedMotion(false);
  page.key('ArrowRight'); page.assertPage(2);
  assert.equal(page.animations.length, 1);
  page.setReducedMotion(true);
  page.key('ArrowLeft'); page.assertPage(1);
  assert.equal(page.animations.length, 1);
  assert.equal(page.animations[0].cancelled, true);

  const fallback = bookFixture({ supportsAnimation: false });
  assert.doesNotThrow(() => fallback.next.handlers.click());
  fallback.assertPage(1);
  assert.equal(fallback.animations.length, 0);
});

test('automatic chapters keep looping through hover, focus and manual navigation', () => {
  const page = bookFixture({ autoplay: true, observed: true });
  page.assertPage(0);
  assert.equal(page.autoplayControls.hidden, false);
  assert.equal(page.timers.size, 0, 'Off-screen chapters must not turn');
  assert.equal(page.animations.length, 0);
  page.intersect(0.1); assert.equal(page.timers.size, 0);
  page.intersect(0.5); assert.equal(page.timers.size, 1);
  assert.equal(page.animations.length, 1, 'Animate the first chapter as soon as the panel enters view');
  page.tick(); page.assertPage(1);
  page.tick(); page.assertPage(2);
  page.tick(); page.assertPage(0);
  assert.equal(page.status.attributes['aria-live'], 'off');

  page.book.handlers.mouseenter?.(); assert.equal(page.timers.size, 1, 'Hovering the panel must not silently stop playback');
  page.book.handlers.mouseleave?.(); assert.equal(page.timers.size, 1);
  page.hide(true); assert.equal(page.timers.size, 0);
  page.hide(false); assert.equal(page.timers.size, 1);
  page.book.handlers.focusin?.(); assert.equal(page.timers.size, 1);
  page.book.handlers.focusout?.({ relatedTarget: page.next }); assert.equal(page.timers.size, 1);
  page.book.handlers.focusout?.({ relatedTarget: null }); assert.equal(page.timers.size, 1);
  page.intersect(0); assert.equal(page.timers.size, 0);
  page.intersect(0.7); assert.equal(page.timers.size, 1);

  page.book.handlers.focusin?.();
  page.next.handlers.click(); page.assertPage(1);
  assert.equal(page.timers.size, 1, 'Manual navigation must keep automatic switching active');
  assert.equal(page.status.attributes['aria-live'], 'polite');
  setLanguage('fr'); page.assertPage(1);
  assert.equal(page.timers.size, 1);
  page.tick(); page.assertPage(2);
  assert.equal(page.status.attributes['aria-live'], 'off');
});

test('automatic switching continues with reduced motion or without animation support', () => {
  const page = bookFixture({ autoplay: true, reducedMotion: true });
  assert.equal(page.timers.size, 1);
  page.tick(); page.assertPage(1);
  assert.equal(page.animations.length, 0);
  page.setReducedMotion(false);
  page.tick(); page.assertPage(2);
  assert.equal(page.animations.length, 1);
  page.setReducedMotion(true);
  assert.equal(page.timers.size, 1);
  assert.equal(page.animations[0].cancelled, true);
  page.tick(); page.assertPage(0);
  assert.equal(page.animations.length, 1, 'Reduced motion changes pages without turning animation');

  const fallback = bookFixture({ autoplay: true, supportsAnimation: false });
  fallback.tick(); fallback.assertPage(1);
  assert.equal(fallback.animations.length, 0);
  fallback.book.handlers.focusin?.();
  assert.equal(fallback.timers.size, 1);
});
