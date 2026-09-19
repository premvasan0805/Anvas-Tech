import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

export default function FintechPlatform() {
  usePageMeta("FinTech Platform | AnvasTech", "A digital platform for financial technology and related software workflows.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-platforms" aria-hidden="true">
        <video src="/assets/platforms-hero.mp4?v=1" poster="/assets/platforms-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / FinTech Platform</p>
        <p className="kicker">Financial Technology Platform</p>
        <h1>FinTech Platform</h1>
        <p className="lede">A digital platform for financial technology and related software workflows.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-ink" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Financial Technology Platform</h2>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-fintrack.png" alt="AnvasTech financial technology platform" width="997" height="627" />
          </figure>
        </div>
      </div>
    </section>

    {/* Deliberate gap: the feature list is not published until it has been
        checked against the live product. Do not fill this with a guess. */}
    <section className="sp-band is-tight is-neutral" id="covers">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">What It Covers</h2>
          </div>
        </div>
        <div className="sp-pending">
          <p className="sp-pending-label">Not published yet</p>
          <p>Rather than describe financial operations, transaction management, financial reporting, dashboards and data management without checking, this section is left until those workflows are verified.</p>
          <p>If you want detail on this platform in the meantime, ask us directly.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Ask about this platform</Link></div>
        </div>
      </div>
    </section>

    <RelatedProducts ids={['ungal-pakkam', 'tn-ihip', 'vishful']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about FinTech Platform, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
