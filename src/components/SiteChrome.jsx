import { useEffect, useRef } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { bootSite } from '../../js/site.js';

/* The header/footer mount points live in index.html, outside #root, because
   site.js swaps them via outerHTML — React must not own those nodes. */
export default function SiteChrome({ children }) {
  const { pathname, hash, key } = useLocation();
  const navigate = useNavigate();
  const booted = useRef(false);
  // Set once the landing page's own widgets have been bound. Route changes
  // after that are handled by the bootSite(false) above.
  const pageBound = useRef(false);

  useEffect(() => {
    if (!booted.current) {
      booted.current = true;
      bootSite(true);
    } else {
      // New route: the previous page's nodes are gone, so element-scoped
      // widgets (step tabs, sliders, filters) need re-binding.
      bootSite(false);
      // A hash target owns the scroll position; the effect below places it.
      if (!hash) window.scrollTo(0, 0);
    }
    if (window.ScrollTrigger) window.ScrollTrigger.refresh();

    /* Pages are code-split, so on a cold load the boot above runs against a
       document that has the chrome but no page yet — every page-scoped
       widget finds nothing to bind. Wait for the page to mount, then boot
       once more. site.js guards its sliders against binding twice. */
    if (pageBound.current) return;
    let attempts = 0;
    let timer = 0;
    const bindWhenReady = () => {
      // Suspense's fallback is an empty <main id="main">, so the element
      // alone does not mean the page arrived — wait for its content.
      const main = document.getElementById('main');
      if (main && main.childElementCount > 0) {
        pageBound.current = true;
        bootSite(false);
        if (window.ScrollTrigger) window.ScrollTrigger.refresh();
        return;
      }
      if (attempts++ < 60) timer = setTimeout(bindWhenReady, 50);
    };
    bindWhenReady();
    return () => clearTimeout(timer);
  }, [pathname, hash]);

  /* Menu links point at sections (/careers#internships). The router only
     changes location, so the scroll is ours to do — and the target may not
     be mounted yet on a fresh route, hence the short retry. `key` is in the
     deps so clicking the same link twice scrolls again. */
  useEffect(() => {
    if (!hash) return;
    const id = decodeURIComponent(hash.slice(1));
    if (!id) return;

    let timer = 0;
    let attempts = 0;

    const tryScroll = () => {
      const el = document.getElementById(id);
      if (el) {
        const header = document.querySelector('.site-header');
        const offset = (header ? header.getBoundingClientRect().height : 72) + 24;
        const top = el.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top: Math.max(top, 0), behavior: 'smooth' });
        return;
      }
      if (attempts++ < 20) timer = setTimeout(tryScroll, 50);
    };
    tryScroll();
    return () => clearTimeout(timer);
  }, [pathname, hash, key]);

  // The chrome is raw HTML built by site.js, so its links are plain <a> tags.
  // Route them through the router instead of letting the browser reload.
  useEffect(() => {
    const onClick = (e) => {
      if (e.defaultPrevented || e.button !== 0) return;
      if (e.metaKey || e.ctrlKey || e.shiftKey || e.altKey) return;
      const a = e.target.closest?.('a[href]');
      if (!a || a.target === '_blank' || a.hasAttribute('download')) return;
      // Only same-origin, in-app paths.
      const href = a.getAttribute('href');
      if (!href || !href.startsWith('/')) return;
      e.preventDefault();
      const [path, hash] = href.split('#');
      navigate(hash ? { pathname: path || '/', hash: '#' + hash } : path || '/');
    };
    document.addEventListener('click', onClick);
    return () => document.removeEventListener('click', onClick);
  }, [navigate]);

  return children;
}
