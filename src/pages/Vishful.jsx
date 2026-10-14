import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

/* These four are not a sequence, so they are not numbered. They nest: a
   property holds apartments, apartments hold beds, occupancy is the state of
   those beds, and a tenant is who occupies one. `depth` draws that descent.
   `spot` is where that level shows on the phone screen, as left, top, width
   and height percentages of sol-vishful-phone.png (390 x 844). */
const COVERS = [
  { depth: 0, title: 'Property Management', text: 'Manage property information and related operational details.', tag: 'Property', spot: [6.2, 42.2, 87.7, 36.1] },
  { depth: 1, title: 'Apartment & Bed Management', text: 'Organize apartments and beds within properties.', tag: 'Apartments & beds', spot: [36.2, 23.5, 57.7, 9.2] },
  { depth: 2, title: 'Occupancy Management', text: 'Track occupancy information across managed properties.', tag: 'Occupancy', spot: [6.2, 71.8, 87.7, 6.5] },
  { depth: 3, title: 'Tenant Management', text: 'Maintain tenant information and support property-related workflows.', tag: 'Tenants', spot: [42.6, 90.6, 14.8, 6.0] },
];
const STEP_MS = 2800;

export default function Vishful() {
  usePageMeta("Vishful | AnvasTech", "A digital platform for managing properties, apartments, beds, tenants, and occupancy from a connected workspace.");

  // The descent walks itself, building to person, while the section is on
  // screen. Hovering a row holds it there; reduced motion leaves it still.
  const overview = useRef(null);
  const device = useRef(null);
  const [seen, setSeen] = useState(false);
  const [visible, setVisible] = useState(false);
  const [active, setActive] = useState(-1);
  const [held, setHeld] = useState(false);
  const still = typeof window !== 'undefined' && window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  useEffect(() => {
    const el = overview.current;
    if (!el) return undefined;
    const io = new IntersectionObserver(([entry]) => {
      setVisible(entry.isIntersecting);
      if (entry.isIntersecting) setSeen(true);
    }, { threshold: 0.3 });
    io.observe(el);
    return () => io.disconnect();
  }, []);

  useEffect(() => {
    if (!visible || held || still) return undefined;
    // First light lands once the rows have finished arriving.
    const first = setTimeout(() => setActive((i) => (i < 0 ? 0 : i)), 1300);
    const timer = setInterval(() => setActive((i) => (i + 1) % COVERS.length), STEP_MS);
    return () => { clearTimeout(first); clearInterval(timer); };
  }, [visible, held, still]);

  // A slight lean toward the pointer, mouse only.
  const tilt = (e) => {
    if (still || e.pointerType === 'touch') return;
    const r = device.current.getBoundingClientRect();
    device.current.style.setProperty('--rx', `${((e.clientY - r.top) / r.height - 0.5) * -8}deg`);
    device.current.style.setProperty('--ry', `${((e.clientX - r.left) / r.width - 0.5) * 10}deg`);
  };
  const untilt = () => {
    device.current.style.setProperty('--rx', '0deg');
    device.current.style.setProperty('--ry', '0deg');
  };

  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-products" aria-hidden="true">
        <video src="/assets/products-hero.mp4?v=2" poster="/assets/products-hero-poster.jpg?v=2" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / Vishful</p>
        <p className="kicker">Property &amp; Co-Living Management</p>
        <h1>Vishful</h1>
        <p className="lede">A digital platform for managing properties, apartments, beds, tenants, and occupancy from a connected workspace.</p>
      </div>
    </section>

    {/* Overview and "What Vishful Covers" are one section. Split across two
        bands they were a heading and three lines each, with the screenshot
        floating beside a column of white. `covers` stays as an id here so the
        old anchor still lands somewhere sensible. */}
    <section className="sp-band is-tight is-ink" id="overview">
      <div className="sp-wrap">
        <div className={`sp-intro has-portrait vf-overview${seen ? ' is-in' : ''}`} id="covers" ref={overview}>
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Manage Properties. Simplify Operations.</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Vishful brings property and co-living operations into one digital platform: properties, the units inside them, who occupies them, and the tenant records behind it all.</p>
            <p className="sp-descent-cap">From the building down to the person</p>
            <ul className="sp-descent is-live-list" onMouseLeave={() => setHeld(false)}>
              {COVERS.map((c, i) => (
                <li
                  key={c.title}
                  className={i === active ? 'is-live' : undefined}
                  style={{ '--depth': c.depth, '--i': i }}
                  onMouseEnter={() => { setActive(i); setHeld(true); }}
                >
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          {/* The real product screen, cut out of its capture so it stands on
              the ink band. Each row of the descent lights the part of the
              screen that shows it. */}
          <figure className="vf-device" ref={device} onMouseMove={tilt} onMouseLeave={untilt}>
            <span className="vf-device-glow" aria-hidden="true" />
            <div className="vf-device-body">
              <img src="/assets/sol-vishful-phone.png" alt="Vishful property management application" width="390" height="844" />
              {COVERS.map((c, i) => (
                <span
                  key={c.title}
                  className={`vf-spot${i === active ? ' is-on' : ''}`}
                  style={{ left: `${c.spot[0]}%`, top: `${c.spot[1]}%`, width: `${c.spot[2]}%`, height: `${c.spot[3]}%` }}
                  aria-hidden="true"
                >
                  <em>{c.tag}</em>
                </span>
              ))}
              <span className="vf-device-sheen" aria-hidden="true" />
            </div>
            <span className="vf-device-floor" aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>

    <RelatedProducts ids={['attendance', 'anvas-comet', 'mla-calendar']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about Vishful, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
