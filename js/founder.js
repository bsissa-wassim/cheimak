import { translations } from './language.js';

export function initFounder() {
  const section = document.getElementById('founder');
  if (!section) return;

  const toggle = section.querySelector('[data-founder-vision-toggle]');
  if (toggle) {
    const toggleLabel = toggle.querySelector('[data-i18n]');
    const panel = section.querySelector('#vision-panel');

    const renderVision = (expanded) => {
      const key = expanded ? 'founderLess' : 'founderMore';
      toggle.setAttribute('aria-expanded', String(expanded));
      panel.setAttribute('aria-hidden', String(!expanded));
      panel.classList.toggle('open', expanded);
      toggleLabel.dataset.i18n = key;
      toggleLabel.textContent = translations[document.documentElement.lang][key];
    };

    toggle.addEventListener('click', () => {
      renderVision(toggle.getAttribute('aria-expanded') !== 'true');
    });

    // Vision text stays visible without JavaScript; enhance only after binding.
    renderVision(false);
    toggle.hidden = false;
  }

  const book = section.querySelector('[data-founder-book]');
  if (!book) return;
  const pages = Array.from(book.querySelectorAll('[data-founder-page]'));
  const previous = book.querySelector('[data-founder-chapter-step="-1"]');
  const next = book.querySelector('[data-founder-chapter-step="1"]');
  const controls = book.querySelector('[data-founder-book-controls]');
  const count = book.querySelector('[data-founder-page-count]');
  const status = book.querySelector('[data-founder-chapter-status]');
  if (pages.length < 2 || !previous || !next || !controls || !count || !status) return;

  let current = 0;
  let turnAnimation;
  let beforeManualNavigation = () => {};
  let onChapterChange = () => {};
  const renderChapter = (index, animate = false) => {
    const direction = index >= current ? 1 : -1;
    turnAnimation?.cancel();
    current = index;
    pages.forEach((page, pageIndex) => {
      const active = pageIndex === current;
      page.classList.toggle('is-active', active);
      page.setAttribute('aria-hidden', String(!active));
      page.inert = !active;
    });
    previous.disabled = current === 0;
    next.disabled = current === pages.length - 1;
    count.textContent = `${String(current + 1).padStart(2, '0')} / ${String(pages.length).padStart(2, '0')}`;
    const dictionary = translations[document.documentElement.lang] || translations.en;
    status.textContent = dictionary.founderChapterStatus
      .replace('{current}', String(current + 1))
      .replace('{total}', String(pages.length))
      .replace('{title}', pages[current].querySelector('[data-founder-page-title]').textContent);

    const reducedMotion = typeof window !== 'undefined' && window.matchMedia?.('(prefers-reduced-motion: reduce)')?.matches;
    if (animate && !reducedMotion && typeof pages[current].animate === 'function') {
      turnAnimation = pages[current].animate([
        { transform: `perspective(1100px) rotateY(${-direction * 72}deg)`, opacity: 0.15, filter: 'brightness(.7)' },
        { transform: `perspective(1100px) rotateY(${-direction * 16}deg)`, opacity: 1, filter: 'brightness(.95)', offset: 0.65 },
        { transform: 'perspective(1100px) rotateY(0deg)', opacity: 1, filter: 'brightness(1)' },
      ], { duration: 950, easing: 'cubic-bezier(.2, .7, .2, 1)' });
    }
    onChapterChange();
  };

  const moveChapter = (index, manual = true) => {
    if (manual) beforeManualNavigation();
    if (index < 0 || index >= pages.length || index === current) return;
    const focused = document.activeElement;
    renderChapter(index, true);
    // Keep focus on an enabled navigation control when reaching either end.
    if (focused === next && next.disabled) previous.focus({ preventScroll: true });
    if (focused === previous && previous.disabled) next.focus({ preventScroll: true });
  };
  previous.addEventListener('click', () => moveChapter(current - 1));
  next.addEventListener('click', () => moveChapter(current + 1));
  book.addEventListener('keydown', (event) => {
    if (event.altKey || event.ctrlKey || event.metaKey || event.shiftKey) return;
    if (event.target !== previous && event.target !== next) return;
    const destinations = { ArrowLeft: current - 1, ArrowRight: current + 1, Home: 0, End: pages.length - 1 };
    if (!Object.hasOwn(destinations, event.key)) return;
    event.preventDefault();
    moveChapter(destinations[event.key]);
  });
  document.addEventListener('glowlink:languagechange', () => {
    renderChapter(current);
  });
  renderChapter(0);
  book.classList.add('is-enhanced');
  controls.hidden = false;

  const autoplayControls = book.querySelector('[data-founder-autoplay-controls]');
  if (!autoplayControls || typeof window === 'undefined') return;
  const progress = book.querySelector('[data-founder-page-progress]');
  const motionPreference = window.matchMedia?.('(prefers-reduced-motion: reduce)');
  let visible = typeof window.IntersectionObserver !== 'function';
  let entered = false, timer = null, progressAnimation;
  status.setAttribute('aria-live', 'off');

  const scheduleTurn = () => {
    if (timer !== null) window.clearTimeout(timer);
    timer = null;
    progressAnimation?.cancel();
    progressAnimation = undefined;
    if (!visible || document.hidden) return;
    const words = pages[current].querySelector('[data-founder-page-text]').textContent.trim().split(/\s+/).length;
    const delay = Math.max(7000, Math.min(12000, words * 260));
    if (!motionPreference?.matches && typeof progress?.animate === 'function') {
      progressAnimation = progress.animate([
        { transform: 'scaleX(0)' }, { transform: 'scaleX(1)' },
      ], { duration: delay, fill: 'forwards' });
    }
    timer = window.setTimeout(() => {
      timer = null;
      status.setAttribute('aria-live', 'off');
      moveChapter((current + 1) % pages.length, false);
    }, delay);
  };
  beforeManualNavigation = () => status.setAttribute('aria-live', 'polite');
  onChapterChange = scheduleTurn;
  document.addEventListener('visibilitychange', scheduleTurn);
  motionPreference?.addEventListener?.('change', (event) => {
    if (event.matches) turnAnimation?.cancel();
    scheduleTurn();
  });
  if (!visible) {
    const observer = new window.IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting && entry.intersectionRatio >= 0.25;
      if (visible && !entered) {
        entered = true;
        renderChapter(current, true);
      } else {
        scheduleTurn();
      }
    }, { threshold: 0.25 });
    observer.observe(book);
  }
  autoplayControls.hidden = false;
  if (visible) {
    entered = true;
    renderChapter(current, true);
  } else {
    scheduleTurn();
  }
}
