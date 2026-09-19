import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

export default function TnIhip() {
  usePageMeta("eHealth / TN-IHIP | AnvasTech", "A healthcare-focused digital platform supporting healthcare and OPD-related workflows.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-platforms" aria-hidden="true">
        <video src="/assets/platforms-hero.mp4?v=1" poster="/assets/platforms-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / eHealth / TN-IHIP</p>
        <p className="kicker">Digital Healthcare Platform</p>
        <h1>eHealth / TN-IHIP</h1>
        <p className="lede">A healthcare-focused digital platform supporting healthcare and OPD-related workflows.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Digital Healthcare Platform</h2>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          {/* No published shot or feature list exists for this platform, so the
              plate carries the name and sector only. Do not add claims here. */}
          <figure className="sp-plate is-mark">
            <p className="sp-mark-kicker">Digital Healthcare Platform</p>
            <p className="sp-mark-name">eHealth / TN-IHIP</p>
            <div className="sp-mark-rule" aria-hidden="true" />
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
          <p>Rather than describe the patient, OPD, records and reporting workflows present in the live application without checking, this section is left until those workflows are verified.</p>
          <p>If you want detail on this platform in the meantime, ask us directly.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Ask about this platform</Link></div>
        </div>
      </div>
    </section>

    <RelatedProducts ids={['vishful', 'attendance', 'anvas-comet']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about eHealth / TN-IHIP, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
