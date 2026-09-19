import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CaseStudyElegal() {
  usePageMeta("eLegal / GetLegal | AnvasTech Case Study", "A platform for property document analysis, OCR, title-chain analysis, and structured legal risk assessment.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / eLegal / GetLegal</p>
        <h1>eLegal / GetLegal</h1>
        <p className="lede">A platform for property document analysis, OCR, title-chain analysis, and structured legal risk assessment.</p>
      </div>
    </section>

    <section className="section" id="product">
      <div className="wrap split">
        <div>
          <p className="kicker"><span className="cs-step">01</span> &mdash; Product</p>
          <h2 className="display">AI-Powered Property Legal Intelligence</h2>
          <p className="prose">A platform for property document analysis, OCR, title-chain analysis, and structured legal risk assessment.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-elegal.png" alt="eLegal property legal intelligence platform" width="1034" height="693" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="need">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">02</span> &mdash; The need</p>
        <h2 className="display">Why this platform exists</h2>
        <div className="prose-block">
          <p className="prose">Property legal review is document work. The material arrives as scans and paper, the ownership history has to be followed across those documents in order, and the risk assessment that results is only as good as the reading behind it.</p>
          <p className="prose">Done manually, the reading is the constraint, and the reasoning behind a conclusion stays in the reviewer&rsquo;s notes rather than in a structured record.</p>
        </div>
      </div>
    </section>

    <section className="section" id="built">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">03</span> &mdash; What AnvasTech built</p>
        <h2 className="display">The platform</h2>
        <p className="prose">AnvasTech built eLegal as a property legal intelligence platform that applies OCR and document analysis to property documents, follows the title chain across them, and produces a structured risk assessment.</p>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">04</span> &mdash; Capabilities</p>
        <h2 className="display">What the platform does</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Property document analysis</h3><p>Property documents analysed within the platform.</p></article>
          <article className="list-card"><h3>OCR</h3><p>Optical character recognition applied to scanned property documents.</p></article>
          <article className="list-card"><h3>Title-chain analysis</h3><p>Ownership history analysed across the chain of title documents.</p></article>
          <article className="list-card"><h3>Structured legal risk assessment</h3><p>Legal risk assessment produced in a structured form rather than as free notes.</p></article>
        </div>
      </div>
    </section>

    

    <section className="section" id="related">
      <div className="wrap">
        <p className="kicker">Related case studies</p>
        <h2 className="display">Other products we have built</h2>
        <div className="list-cards">
          <Link className="list-card" to="/case-study-anvas-logistics"><h3>Anvas Logistics</h3><p>Logistics Operations Platform</p></Link>
          <Link className="list-card" to="/case-study-anvas-comet"><h3>Anvas Comet</h3><p>Business Operations Platform</p></Link>
          <Link className="list-card" to="/case-study-fintech"><h3>FinTech</h3><p>Financial Technology Platform</p></Link>
        </div>
        <div className="actions"><Link className="btn-blue" to="/case-studies">See all case studies</Link></div>
      </div>
    </section>

    <section className="section mist" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Building something similar?</h2>
          <p className="prose">Tell us what you are trying to build. We will tell you what it would take.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our team</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" loading="lazy" />
        </figure>
      </div>
    </section>
    </main>
  );
}
