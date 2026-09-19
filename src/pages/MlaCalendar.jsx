import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

/* The subject is a calendar, so the device is one. The marked cells are a
   drawing of a month, not data about any real constituency diary. */
const COVERS = [
  { title: 'Calendar Management', text: 'Organize important dates and activities.' },
  { title: 'Activity Management', text: 'Keep relevant constituency activities organized.' },
  { title: 'Information Access', text: 'Present relevant information through a digital platform.' },
];
const MARKED = [3, 6, 7, 11, 15, 16, 22, 27];
const TODAY = 18;

export default function MlaCalendar() {
  usePageMeta("MLA Calendar | AnvasTech", "A digital platform designed around calendar and constituency-related activities.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-products" aria-hidden="true">
        <video src="/assets/products-hero.mp4?v=1" poster="/assets/products-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / MLA Calendar</p>
        <p className="kicker">Calendar &amp; Constituency Management</p>
        <h1>MLA Calendar</h1>
        <p className="lede">A digital platform designed around calendar and constituency-related activities.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Keep Constituency Activities Organized</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>MLA Calendar brings calendar and activity-related information into a structured digital experience.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-mla-calendar.png" alt="MLA Calendar platform" width="1016" height="643" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-tight" id="covers">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">What It Covers</h2>
          </div>
          <p className="sp-lede">Dates, the activities attached to them, and getting that information in front of the people who need it.</p>
        </div>
        <div className="sp-dates">
          <div className="sp-dates-grid" aria-hidden="true">
            {Array.from({ length: 35 }, (_, i) => (
              <span
                key={i}
                data-on={MARKED.includes(i) || undefined}
                data-today={i === TODAY || undefined}
              />
            ))}
          </div>
          <ul>
            {COVERS.map((c) => (
              <li key={c.title}><h3>{c.title}</h3><p>{c.text}</p></li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <RelatedProducts ids={['kubera-ai', 'elegal', 'anvas-logistics']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about MLA Calendar, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
