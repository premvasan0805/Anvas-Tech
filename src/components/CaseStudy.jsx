import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';
import { CASE_STUDIES, STUDIES } from '../lib/caseStudies.js';

/* One layout for every case study, built from the same bands as the product
 * pages so a study reads as part of the site rather than a plain document:
 *
 *   hero      the products backdrop, the study's chapters as jump links
 *   01        the product, on ink, beside its screenshot
 *   02        the need: the problem set as a statement plate
 *   03 + 04   what was built and what it does, on the capabilities wash
 *   related   three more studies as an index
 *   close     the enquiry
 *
 * The copy lives in src/lib/caseStudies.js.
 */
const CHAPTERS = [
  ['product', '01', 'Product'],
  ['need', '02', 'The need'],
  ['built', '03', 'What we built'],
  ['capabilities', '04', 'Capabilities'],
];

export default function CaseStudy({ id }) {
  const cs = CASE_STUDIES[id];
  usePageMeta(cs.meta[0], cs.meta[1]);
  const related = cs.related.map((to) => STUDIES.find((s) => s.to === to)).filter(Boolean);
  const { image } = cs;
  // The overview repeats nothing the hero has just said.
  const overview = cs.productText.filter((p) => p !== cs.lede);

  return (
    <main id="main" className="solution-page cs-page">

    <section className="page-hero is-light">
      <figure className="hero-art art-products" aria-hidden="true">
        <video src="/assets/products-hero.mp4?v=2" poster="/assets/products-hero-poster.jpg?v=2" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / {cs.name}</p>
        <p className="kicker">Case study &middot; {cs.title}</p>
        <h1>{cs.name}</h1>
        <p className="lede">{cs.lede}</p>
        <nav className="cs-chapters" aria-label="In this case study">
          {CHAPTERS.map(([anchor, num, label]) => (
            <a href={`#${anchor}`} key={anchor}><span>{num}</span>{label}</a>
          ))}
        </nav>
      </div>
    </section>

    <section className="sp-band is-tight is-ink" id="product">
      <div className="sp-wrap">
        <div className={`sp-intro${image.kind === 'portrait' ? ' has-portrait' : ''}`}>
          <div>
            <p className="sp-eyebrow">01 &mdash; Product</p>
            <h2 className="sp-h2">{cs.productTitle}</h2>
            {overview.map((p) => <p className="sp-p cs-p" key={p}>{p}</p>)}
            <p className="sp-descent-cap">What it covers</p>
            <ul className="cs-covers">
              {cs.capabilities.map((c) => <li key={c.title}>{c.title}</li>)}
            </ul>
            <div className="sp-actions">
              <Link className="sp-btn" to={cs.product}>View the product</Link>
              <Link className="sp-btn-ghost" to="/contact">Talk to Our Team</Link>
            </div>
          </div>
          <figure className={`sp-shot${image.kind === 'portrait' ? ' is-portrait' : ''}${image.kind === 'photo' ? ' cs-photo' : ''}`}>
            {/* A stock photograph is not the product, so it is not described as one. */}
            <img src={image.src} alt={image.kind === 'photo' ? '' : image.alt} width={image.width} height={image.height} />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band is-white" id="need">
      <div className="sp-wrap">
        <div className="sp-intro cs-need">
          <div>
            <p className="sp-eyebrow">02 &mdash; The need</p>
            <h2 className="sp-h2">{cs.needTitle}</h2>
            {cs.need.slice(1).map((p) => <p className="sp-p cs-p" key={p}>{p}</p>)}
          </div>
          <figure className="sp-plate is-statement">
            <p className="sp-statement">{cs.need[0]}</p>
            <div className="sp-statement-rule" aria-hidden="true" />
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head" id="built">
          <div>
            <p className="sp-eyebrow">03 &mdash; What AnvasTech built</p>
            <h2 className="sp-h2">{cs.builtTitle}</h2>
          </div>
          {cs.built.map((p) => <p className="sp-lede" key={p}>{p}</p>)}
        </div>
        <p className="sp-eyebrow cs-sub">04 &mdash; {cs.capsTitle}</p>
        <div className="sp-grid is-3up">
          {cs.capabilities.map((c, i) => (
            <article className="sp-cell" key={c.title}>
              <span className="sp-num">{String(i + 1).padStart(2, '0')}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-band is-tight is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Related case studies</p>
            <h2 className="sp-h2">Other products we have built</h2>
          </div>
          <div className="sp-actions"><Link className="sp-btn-ghost on-light" to="/case-studies">See all case studies</Link></div>
        </div>
        <ol className="sp-index">
          {related.map((s) => (
            <Link to={s.to} key={s.to}>
              <span className="sp-index-num">{s.num}</span>
              <span className="sp-index-name">{s.name}</span>
              <span>
                <h3>{s.title}</h3>
                <p>{s.text}</p>
              </span>
              <span className="sp-link">Read Case Study</span>
            </Link>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Building something similar?</h2>
          <p className="sp-lede">Tell us what you are trying to build. We will tell you what it would take.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
