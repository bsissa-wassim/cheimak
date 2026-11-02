export function initNavigation() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const updateHeight = () => {
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  };

  updateHeight();

  const toggle = header.querySelector('[data-nav-toggle]');
  const navigation = header.querySelector('.main-nav');
  if (toggle && navigation) {
    const mobile = window.matchMedia('(max-width: 1000px)');
    const close = (restoreFocus = false) => {
      if (!header.classList.contains('is-nav-open')) return;
      header.classList.remove('is-nav-open');
      toggle.setAttribute('aria-expanded', 'false');
      if (restoreFocus) toggle.focus();
      updateHeight();
    };
    toggle.addEventListener('click', () => {
      if (!mobile.matches) return;
      const open = !header.classList.contains('is-nav-open');
      header.classList.toggle('is-nav-open', open);
      toggle.setAttribute('aria-expanded', String(open));
      if (open) navigation.querySelector('a[href]')?.focus();
      updateHeight();
    });
    navigation.addEventListener('click', event => {
      if (event.target.closest?.('a[href]')) close();
    });
    header.addEventListener('keydown', event => {
      if (event.key === 'Escape' && header.classList.contains('is-nav-open')) {
        event.preventDefault();
        close(true);
      }
    });
    document.addEventListener('click', event => {
      if (!header.contains(event.target)) close();
    });
    header.addEventListener('focusout', event => {
      if (event.relatedTarget && !header.contains(event.relatedTarget)) close();
    });
    if (mobile.addEventListener) mobile.addEventListener('change', () => close());
    else mobile.addListener?.(() => close());
    toggle.hidden = false;
  }

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
  } else {
    window.addEventListener('resize', updateHeight, { passive: true });
    document.addEventListener('glowlink:languagechange', updateHeight);
  }
  window.requestAnimationFrame?.(updateHeight);
}
