import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

/* These four are not a sequence, so they are not numbered. They nest: a
   property holds apartments, apartments hold beds, occupancy is the state of
   those beds, and a tenant is who occupies one. `depth` draws that descent. */
const COVERS = [
  { depth: 0, title: 'Property Management', text: 'Manage property information and related operational details.' },
  { depth: 1, title: 'Apartment & Bed Management', text: 'Organize apartments and beds within properties.' },
  { depth: 2, title: 'Occupancy Management', text: 'Track occupancy information across managed properties.' },
  { depth: 3, title: 'Tenant Management', text: 'Maintain tenant information and support property-related workflows.' },
];

export default function Vishful() {
  usePageMeta("Vishful | AnvasTech", "A digital platform for managing properties, apartments, beds, tenants, and occupancy from a connected workspace.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-products" aria-hidden="true">
        <video src="/assets/products-hero.mp4?v=1" poster="/assets/products-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
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
        <div className="sp-intro has-portrait" id="covers">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Manage Properties. Simplify Operations.</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Vishful brings property and co-living operations into one digital platform: properties, the units inside them, who occupies them, and the tenant records behind it all.</p>
            <p className="sp-descent-cap">From the building down to the person</p>
            <ul className="sp-descent">
              {COVERS.map((c) => (
                <li key={c.title} style={{ '--depth': c.depth }}>
                  <h3>{c.title}</h3>
                  <p>{c.text}</p>
                </li>
              ))}
            </ul>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          {/* The real product screenshot. It is a tall phone capture that
              carries its own frame and backdrop, so it runs unplated. */}
          <figure className="sp-shot is-portrait">
            <img src="/assets/sol-vishful.jpg" alt="Vishful property management application" width="572" height="910" />
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
