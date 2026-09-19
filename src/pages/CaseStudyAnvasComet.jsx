import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CaseStudyAnvasComet() {
  usePageMeta("Anvas Comet | AnvasTech Case Study", "A unified platform connecting sales, inventory, procurement, accounting, finance, and AI-assisted business workflows.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / Anvas Comet</p>
        <h1>Anvas Comet</h1>
        <p className="lede">A unified platform connecting sales, inventory, procurement, accounting, finance, and AI-assisted business workflows.</p>
      </div>
    </section>

    <section className="section" id="product">
      <div className="wrap split">
        <div>
          <p className="kicker"><span className="cs-step">01</span> &mdash; Product</p>
          <h2 className="display">Business Operations Platform</h2>
          <p className="prose">A unified platform connecting sales, inventory, procurement, accounting, finance, and AI-assisted business workflows.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-comet.png" alt="Anvas Comet business operations platform" width="773" height="600" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="need">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">02</span> &mdash; The need</p>
        <h2 className="display">Why this platform exists</h2>
        <div className="prose-block">
          <p className="prose">Sales, inventory, procurement, accounting and finance describe the same transactions from different angles, and are commonly run as separate systems that have to be reconciled to each other.</p>
          <p className="prose">Holding them in one platform means a sale, the stock it consumes, the purchase that replaces it and the accounting entry behind it refer to the same underlying records.</p>
        </div>
      </div>
    </section>

    <section className="section" id="built">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">03</span> &mdash; What AnvasTech built</p>
        <h2 className="display">The platform</h2>
        <p className="prose">AnvasTech built Anvas Comet as a unified platform connecting sales, inventory, procurement, accounting and finance, with AI-assisted business workflows across them.</p>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">04</span> &mdash; Capabilities</p>
        <h2 className="display">What the platform does</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Sales</h3><p>Sales managed as a module within the platform.</p></article>
          <article className="list-card"><h3>Inventory</h3><p>Inventory managed alongside sales and procurement.</p></article>
          <article className="list-card"><h3>Procurement</h3><p>Procurement managed within the same platform.</p></article>
          <article className="list-card"><h3>Accounting</h3><p>Accounting held in the platform against operational records.</p></article>
          <article className="list-card"><h3>Finance</h3><p>Finance managed as part of the connected platform.</p></article>
          <article className="list-card"><h3>AI-assisted business workflows</h3><p>AI-assisted workflows applied across the platform&rsquo;s business processes.</p></article>
        </div>
      </div>
    </section>

    

    <section className="section" id="related">
      <div className="wrap">
        <p className="kicker">Related case studies</p>
        <h2 className="display">Other products we have built</h2>
        <div className="list-cards">
          <Link className="list-card" to="/case-study-fintech"><h3>FinTech</h3><p>Financial Technology Platform</p></Link>
          <Link className="list-card" to="/case-study-tn-ihip"><h3>eHealth / TN-IHIP</h3><p>Digital Healthcare Platform</p></Link>
          <Link className="list-card" to="/case-study-kubera-ai"><h3>Kubera AI</h3><p>AI-Powered Trading Platform</p></Link>
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
