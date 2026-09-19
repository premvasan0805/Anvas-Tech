import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

export default function UngalPakkam() {
  usePageMeta("Ungal Pakkam - Manu System | AnvasTech", "A digital platform designed to support the submission and management of public-facing requests or representations.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-platforms" aria-hidden="true">
        <video src="/assets/platforms-hero.mp4?v=1" poster="/assets/platforms-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / Ungal Pakkam &ndash; Manu System</p>
        <p className="kicker">A Digital Platform for Public-Facing Engagement</p>
        <h1>Ungal Pakkam &ndash; Manu System</h1>
        <p className="lede">A digital platform designed to support the submission and management of public-facing requests or representations.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">A Digital Platform for Public-Facing Engagement</h2>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          {/* No published shot or feature list exists for this platform. The
              plate sets the one description we do publish, and nothing more. */}
          <figure className="sp-plate is-statement">
            <p className="sp-statement">A digital platform designed to support the submission and management of public-facing requests or representations.</p>
            <div className="sp-statement-rule" aria-hidden="true" />
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
          <p>Rather than describe the request and representation workflows the live system actually implements without checking, this section is left until those workflows are verified.</p>
          <p>If you want detail on this platform in the meantime, ask us directly.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Ask about this platform</Link></div>
        </div>
      </div>
    </section>

    <RelatedProducts ids={['tn-ihip', 'vishful', 'attendance']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about Ungal Pakkam &ndash; Manu System, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
