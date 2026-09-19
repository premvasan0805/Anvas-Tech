import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import RelatedProducts from '../components/RelatedProducts.jsx';

/* The page's own claim is that a strategy is evaluated before it is used, so
   the areas are split at that threshold rather than listed flat. */
const BEFORE_USE = [
  { title: 'Strategy Development', text: 'Create and work with trading strategies.' },
  { title: 'Strategy Analysis', text: 'Evaluate strategies before using them.' },
  { title: 'Market Analysis', text: 'Support analysis of market information.' },
];
const IN_USE = [
  { title: 'Trading Workflows', text: 'Support defined trading-related workflows.' },
];

export default function KuberaAi() {
  usePageMeta("Kubera AI | AnvasTech", "An AI-focused platform for trading strategy development and market-related workflows.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-aiproducts" aria-hidden="true">
        <video src="/assets/aiproducts-hero.mp4?v=1" poster="/assets/aiproducts-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/industries">Products</Link> / Kubera AI</p>
        <p className="kicker">AI-Powered Trading &amp; Strategy Platform</p>
        <h1>Kubera AI</h1>
        <p className="lede">An AI-focused platform for trading strategy development and market-related workflows.</p>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product</p>
            <h2 className="sp-h2">Explore, Test and Work With Trading Strategies</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Kubera AI brings AI and software capabilities into a trading-focused platform.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-shot">
            <img src="/assets/sol-kubera.png" alt="Kubera AI platform" width="991" height="611" />
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
          <p className="sp-lede">Building a strategy, checking it before it is used, reading the market around it, and the workflows that run it.</p>
        </div>
        <div className="sp-gate">
          <div className="sp-gate-side">
            <p className="sp-gate-label">Before a strategy is used</p>
            <ul>
              {BEFORE_USE.map((a) => (
                <li key={a.title}><h3>{a.title}</h3><p>{a.text}</p></li>
              ))}
            </ul>
          </div>
          <div className="sp-gate-side is-live">
            <p className="sp-gate-label">Once it is</p>
            <ul>
              {IN_USE.map((a) => (
                <li key={a.title}><h3>{a.title}</h3><p>{a.text}</p></li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </section>

    <RelatedProducts ids={['elegal', 'anvas-logistics', 'fintech']} />

    <section className="sp-band is-tight is-neutral" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Want to know more?</h2>
          <p className="sp-lede">Ask us about Kubera AI, or tell us what you are trying to build.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
