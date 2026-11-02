// Anchors and horizontal navigation remain native, including keyboard scrolling.
export function initNavigation() {
  const header = document.querySelector('[data-site-header]');
  if (!header) return;

  const updateHeight = () => {
    const height = Math.ceil(header.getBoundingClientRect().height);
    document.documentElement.style.setProperty('--header-height', `${height}px`);
  };

  updateHeight();

  if ('ResizeObserver' in window) {
    const observer = new ResizeObserver(updateHeight);
    observer.observe(header);
  } else {
    window.addEventListener('resize', updateHeight, { passive: true });
    document.addEventListener('glowlink:languagechange', updateHeight);
  }
}
