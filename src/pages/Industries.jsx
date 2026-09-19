import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import { PRODUCTS, relatedProducts } from '../lib/products.js';
import ProductCard from '../components/ProductCard.jsx';

/* Anchor ids on both the sections and the individual product links are menu
   and cross-page targets — keep them exactly as they are.

   Each group lists product ids; the titles, category lines and descriptions
   come from src/lib/products.js, so this page and the "Explore more products"
   row on every product page describe a product the same way. */
const GROUPS = [
  {
    id: 'property-workforce',
    kicker: 'Property & Workforce',
    title: 'Property and workforce operations',
    surface: 'is-white',
    items: [
      'vishful',
      'attendance',
    ],
  },
  {
    id: 'business-operations',
    kicker: 'Business & Operations',
    title: 'Platforms that run the operation',
    surface: '',
    items: [
      'anvas-comet',
      'anvas-logistics',
      'fintech',
    ],
  },
  {
    id: 'ai-products',
    kicker: 'AI & Intelligent Products',
    title: 'Products where AI is part of the product',
    lede: 'These two are listed here because AI does work inside the product itself, not because they are software.',
    surface: 'is-white',
    items: [
      'kubera-ai',
      'elegal',
    ],
  },
  {
    id: 'digital-platforms',
    kicker: 'Digital Platforms',
    title: 'Platforms for public and sector workflows',
    surface: '',
    items: [
      'mla-calendar',
      'ungal-pakkam',
      'tn-ihip',
    ],
  },
];

export default function Industries() {
  usePageMeta("Products | AnvasTech", "AnvasTech builds digital products and platforms across property management, workforce operations, logistics, financial technology, healthcare, legal technology, and AI.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / Products</p>
        <h1>Products Built for Real-World Needs</h1>
        <p className="lede">AnvasTech builds digital products and platforms across property management, workforce operations, logistics, financial technology, healthcare, legal technology, and AI.</p>
      </div>
    </section>

    {GROUPS.map((g) => (
      <section className={`sp-band is-tight ${g.surface}`.trim()} id={g.id} key={g.id}>
        <div className="sp-wrap">
          <div className="sp-head">
            <div>
              <p className="sp-eyebrow">{g.kicker}</p>
              <h2 className="sp-h2">{g.title}</h2>
            </div>
            {g.lede ? <p className="sp-lede">{g.lede}</p> : null}
          </div>
          <div className="sp-cards">
            {relatedProducts(g.items).map((p) => <ProductCard product={p} key={p.id} />)}
          </div>
        </div>
      </section>
    ))}

    <section className="sp-band is-white" id="how-we-build">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">How we build them</p>
            <h2 className="sp-h2">Product thinking, then engineering</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Every product here started from a process someone was running by hand. We map that process first, decide what software should own, then build it with AI-assisted development and the same engineering standards we apply to client work.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/ai-assisted-engineering">How we build with AI</Link></div>
          </div>
          {/* The range itself, grouped exactly as the sections above group it,
              so the plate is a contents page rather than decoration. */}
          <figure className="sp-plate is-directory">
            <p className="sp-plate-cap">What we have built</p>
            <dl className="sp-directory">
              {GROUPS.map((g) => (
                <div key={g.id}>
                  <dt>{g.kicker}</dt>
                  <dd>{g.items.map((id) => PRODUCTS[id].title).join(' · ')}</dd>
                </div>
              ))}
            </dl>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have a product to build?</h2>
          <p className="sp-lede">We build our own products, and we build them for others. Tell us what you have in mind.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to our team</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
