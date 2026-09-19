/* Mirrors the inline script every static page carried in <head>: width classes
   the CSS keys off. */
export function applyViewportClasses() {
  const root = document.documentElement;
  const apply = () => {
    const w = window.innerWidth || root.clientWidth || 0;
    root.classList.toggle('is-compact-nav', w <= 1199);
    root.classList.toggle('is-narrow', w <= 991);
    root.classList.toggle('is-tablet', w > 768 && w <= 991);
    root.classList.toggle('is-phone', w <= 768);
  };
  apply();
  window.addEventListener('resize', apply, { passive: true });
  window.addEventListener('orientationchange', apply, { passive: true });
}
