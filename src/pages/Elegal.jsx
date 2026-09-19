import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

/* The product reads property paperwork, so the areas are drawn as a document
   stack: each sheet steps out from the one beneath, and the top sheet is the
   review the others feed. */
const AREAS = [
  { title: 'Document Intelligence', text: 'Work with property-related documents digitally.' },
  { title: 'Document Analysis', text: 'Use AI-assisted analysis to work with relevant information.' },
  { title: 'Property Title Information', text: 'Organize and analyze information related to property title documentation.' },
  { title: 'Legal Workflow', text: 'Support structured property-related legal review.' },
];

export default function Elegal() {
  usePageMeta("eLegal | AnvasTech", "A digital platform focused on using AI and document intelligence for property-related legal workflows.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-aiproducts" aria-hidden="true">
        <video src="/assets/aiproducts-hero.mp4?v=1" poster="/assets/aiproducts-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / eLegal</p>
        <p className="kicker">AI-Powered Property Legal Intelligence</p>
        <h1>eLegal</h1>
        <p className="lede">A digital platform focused on using AI and document intelligence for property-related legal workflows.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Make Property Legal Information Easier to Understand</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>eLegal applies AI and software to property-related legal information and document workflows.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-elegal.png" alt="eLegal property legal intelligence platform" width="1034" height="693" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="covers">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Product Areas</h2>
          </div>
          <p className="sp-lede">Property paperwork is where the risk hides, so the platform works on the documents themselves rather than around them.</p>
        </div>
        <p className="sp-device-cap">The paperwork, then the review</p>
        <ol className="sp-sheets">
          {AREAS.map((a, i) => (
            <li key={a.title} style={{ '--i': i }}>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <RelatedProducts ids={['anvas-logistics', 'fintech', 'ungal-pakkam']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about eLegal, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
