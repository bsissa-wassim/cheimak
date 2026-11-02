import test, { afterEach } from 'node:test';
import assert from 'node:assert/strict';
import { initNavigation } from '../js/navigation.js';

const original = { document: globalThis.document, window: globalThis.window };
afterEach(() => {
  for (const [key, value] of Object.entries(original)) {
    if (value === undefined) delete globalThis[key]; else globalThis[key] = value;
  }
});

function fixture() {
  const headerEvents = {}, toggleEvents = {}, navEvents = {}, documentEvents = {};
  const classes = new Set();
  let viewportChange, afterFrame;
  const firstLink = { focused: false, focus() { this.focused = true; } };
  const toggle = { hidden: true, attributes: { 'aria-expanded': 'false' }, focused: false,
    setAttribute(key, value) { this.attributes[key] = value; },
    addEventListener(name, fn) { toggleEvents[name] = fn; }, focus() { this.focused = true; },
  };
  const navigation = { querySelector: () => firstLink, addEventListener(name, fn) { navEvents[name] = fn; } };
  const header = {
    classList: { contains: key => classes.has(key), remove: key => classes.delete(key), toggle: (key, on) => on ? classes.add(key) : classes.delete(key) },
    querySelector: selector => selector === '[data-nav-toggle]' ? toggle : navigation,
    getBoundingClientRect: () => ({ height: 64 }),
    addEventListener: (name, fn) => { headerEvents[name] = fn; },
    contains: node => [toggle, navigation, firstLink].includes(node),
  };
  const media = { matches: true, addEventListener: (_, fn) => { viewportChange = fn; } };
  const properties = {};
  globalThis.document = { querySelector: () => header, addEventListener: (name, fn) => { documentEvents[name] = fn; }, documentElement: { style: { setProperty: (key, value) => { properties[key] = value; } } } };
  globalThis.window = { matchMedia: () => media, addEventListener() {}, requestAnimationFrame(fn) { afterFrame = fn; } };
  initNavigation();
  return { headerEvents, toggleEvents, navEvents, documentEvents, classes, firstLink, toggle, media, properties, resize: () => viewportChange(), frame: () => afterFrame() };
}

test('mobile menu opens with correct ARIA state and keyboard focus; Escape closes and restores focus', () => {
  const f = fixture();
  assert.equal(f.toggle.hidden, false);
  f.toggleEvents.click();
  assert.equal(f.classes.has('is-nav-open'), true);
  assert.equal(f.toggle.attributes['aria-expanded'], 'true');
  assert.equal(f.firstLink.focused, true);
  let prevented = false;
  f.headerEvents.keydown({ key: 'Escape', preventDefault() { prevented = true; } });
  assert.equal(prevented, true);
  assert.equal(f.toggle.attributes['aria-expanded'], 'false');
  assert.equal(f.classes.has('is-nav-open'), false);
  assert.equal(f.toggle.focused, true);
});

test('navigation links, outside clicks and leaving the header dismiss the mobile menu', () => {
  const f = fixture();
  f.toggleEvents.click();
  f.navEvents.click({ target: { closest: () => ({}) } });
  assert.equal(f.classes.has('is-nav-open'), false);
  f.toggleEvents.click();
  f.documentEvents.click({ target: f.firstLink });
  assert.equal(f.classes.has('is-nav-open'), true);
  f.documentEvents.click({ target: {} });
  assert.equal(f.classes.has('is-nav-open'), false);
  f.toggleEvents.click();
  f.headerEvents.focusout({ relatedTarget: {} });
  assert.equal(f.classes.has('is-nav-open'), false);
});

test('desktop resizing clears the menu state and header height is measured after enhancement', () => {
  const f = fixture();
  f.toggleEvents.click();
  f.media.matches = false;
  f.resize();
  assert.equal(f.toggle.attributes['aria-expanded'], 'false');
  f.toggleEvents.click();
  assert.equal(f.classes.has('is-nav-open'), false);
  f.frame();
  assert.equal(f.properties['--header-height'], '64px');
});
