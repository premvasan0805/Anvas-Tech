import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

/* A consignment moves through these in order, so the device is a route with
   stops rather than a grid of cards. */
const AREAS = [
  { title: 'Shipment & Consignment Operations', text: 'Manage logistics shipment and consignment workflows.' },
  { title: 'Trip & Dispatch Planning', text: 'Support trip and dispatch-related operations.' },
  { title: 'Fleet & Driver Management', text: 'Manage relevant fleet and driver information.' },
  { title: 'Live Tracking', text: 'Support live tracking within the logistics workflow.' },
  { title: 'Billing & Operations', text: 'Manage relevant logistics billing and operational processes.' },
];

export default function AnvasLogistics() {
  usePageMeta("Anvas Logistics | AnvasTech", "A digital platform for managing logistics operations, shipments, consignments, and related workflows.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-platforms" aria-hidden="true">
        <video src="/assets/platforms-hero.mp4?v=1" poster="/assets/platforms-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / Anvas Logistics</p>
        <p className="kicker">Logistics Operations Platform</p>
        <h1>Anvas Logistics</h1>
        <p className="lede">A digital platform for managing logistics operations, shipments, consignments, and related workflows.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">One Platform for Logistics Operations</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Anvas Logistics brings logistics workflows into a connected digital platform.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-anvas-logistics.png" alt="Anvas Logistics platform" width="1024" height="682" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-tight" id="covers">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Product Areas</h2>
          </div>
          <p className="sp-lede">The consignment, the trip that carries it, the fleet that runs it, and the billing that follows.</p>
        </div>
        <p className="sp-device-cap">Booked to billed</p>
        <ol className="sp-route">
          {AREAS.map((a) => (
            <li key={a.title}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <RelatedProducts ids={['fintech', 'ungal-pakkam', 'tn-ihip']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about Anvas Logistics, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
