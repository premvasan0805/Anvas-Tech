import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

/* Four areas that run in parallel, not in order. The product's claim is that
   they meet, so they are set around a shared centre and left unnumbered. */
const AREAS = [
  { title: 'Sales Operations', text: 'Support sales-related business workflows.' },
  { title: 'Inventory', text: 'Manage inventory-related operations.' },
  { title: 'Procurement', text: 'Support purchasing and procurement workflows.' },
  { title: 'Financial Operations', text: 'Bring relevant financial processes into the platform.' },
];

export default function AnvasComet() {
  usePageMeta("Anvas Comet | AnvasTech", "A software platform designed to bring business operations into connected digital workflows.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-products" aria-hidden="true">
        <video src="/assets/products-hero.mp4?v=1" poster="/assets/products-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / Anvas Comet</p>
        <p className="kicker">Business Operations Platform</p>
        <h1>Anvas Comet</h1>
        <p className="lede">A software platform designed to bring business operations into connected digital workflows.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Connect Business Operations in One Platform</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Anvas Comet brings multiple operational areas together so business workflows can be managed through connected software.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-comet.png" alt="Anvas Comet business operations platform" width="773" height="600" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-tight is-ink" id="covers">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Product Areas</h2>
          </div>
          <p className="sp-lede">Four operational areas that usually live in separate tools, handled in one platform.</p>
        </div>
        <div className="sp-mesh-wrap">
          <span className="sp-mesh-core" aria-hidden="true">One platform</span>
          <ul className="sp-mesh">
            {AREAS.map((a) => (
              <li key={a.title}>
                <h3>{a.title}</h3>
                <p>{a.text}</p>
              </li>
            ))}
          </ul>
        </div>
      </div>
    </section>

    <RelatedProducts ids={['mla-calendar', 'kubera-ai', 'elegal']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about Anvas Comet, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
