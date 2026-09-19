import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CaseStudyFintech() {
  usePageMeta("FinTech | AnvasTech Case Study", "A multi-tenant financial operations platform for managing financial workflows, transactions, reporting, and business data.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / FinTech</p>
        <h1>FinTech</h1>
        <p className="lede">A multi-tenant financial operations platform for managing financial workflows, transactions, reporting, and business data.</p>
      </div>
    </section>

    <section className="section" id="product">
      <div className="wrap split">
        <div>
          <p className="kicker"><span className="cs-step">01</span> &mdash; Product</p>
          <h2 className="display">Financial Technology Platform</h2>
          <p className="prose">A multi-tenant financial operations platform for managing financial workflows, transactions, reporting, and business data.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-fintrack.png" alt="AnvasTech financial operations platform" width="997" height="627" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="need">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">02</span> &mdash; The need</p>
        <h2 className="display">Why this platform exists</h2>
        <div className="prose-block">
          <p className="prose">A platform that serves several organisations at once has to keep each one&rsquo;s financial data separate while running the same workflows for all of them.</p>
          <p className="prose">That constraint shapes the platform: tenancy is not a feature added to financial operations, it is a property of every record the platform holds.</p>
        </div>
      </div>
    </section>

    <section className="section" id="built">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">03</span> &mdash; What AnvasTech built</p>
        <h2 className="display">The platform</h2>
        <p className="prose">AnvasTech built the FinTech platform as a multi-tenant financial operations system covering financial workflows, transactions, reporting and business data.</p>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">04</span> &mdash; Capabilities</p>
        <h2 className="display">What the platform does</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Multi-tenant operation</h3><p>The platform serves multiple organisations, with data held per tenant.</p></article>
          <article className="list-card"><h3>Financial workflows</h3><p>Financial workflows managed within the platform.</p></article>
          <article className="list-card"><h3>Transactions</h3><p>Transactions recorded and managed in the platform.</p></article>
          <article className="list-card"><h3>Reporting</h3><p>Financial reporting produced from platform records.</p></article>
          <article className="list-card"><h3>Business data</h3><p>Business data managed alongside financial records.</p></article>
        </div>
      </div>
    </section>

    

    <section className="section" id="related">
      <div className="wrap">
        <p className="kicker">Related case studies</p>
        <h2 className="display">Other products we have built</h2>
        <div className="list-cards">
          <Link className="list-card" to="/case-study-tn-ihip"><h3>eHealth / TN-IHIP</h3><p>Digital Healthcare Platform</p></Link>
          <Link className="list-card" to="/case-study-kubera-ai"><h3>Kubera AI</h3><p>AI-Powered Trading Platform</p></Link>
          <Link className="list-card" to="/case-study-vishful"><h3>Vishful</h3><p>Property &amp; Co-Living Operations</p></Link>
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
