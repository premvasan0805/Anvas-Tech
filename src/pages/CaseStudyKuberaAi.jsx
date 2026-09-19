import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CaseStudyKuberaAi() {
  usePageMeta("Kubera AI | AnvasTech Case Study", "A trading platform combining AI-assisted strategy creation, market analysis, backtesting, execution workflows, and risk controls.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/case-studies">Case studies</Link> / Kubera AI</p>
        <h1>Kubera AI</h1>
        <p className="lede">A trading platform combining AI-assisted strategy creation, market analysis, backtesting, execution workflows, and risk controls.</p>
      </div>
    </section>

    <section className="section" id="product">
      <div className="wrap split">
        <div>
          <p className="kicker"><span className="cs-step">01</span> &mdash; Product</p>
          <h2 className="display">AI-Powered Trading Platform</h2>
          <p className="prose">A trading platform combining AI-assisted strategy creation, market analysis, backtesting, execution workflows, and risk controls.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-kubera.png" alt="Kubera AI trading platform" width="991" height="611" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="need">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">02</span> &mdash; The need</p>
        <h2 className="display">Why this platform exists</h2>
        <div className="prose-block">
          <p className="prose">A trading idea has to become an explicit rule set before it can be tested, and writing that rule set is usually the step that stops an idea from ever being evaluated.</p>
          <p className="prose">Testing, execution and risk control then have to refer to the same definition of the strategy, or the tested version and the live version are not the same thing.</p>
        </div>
      </div>
    </section>

    <section className="section" id="built">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">03</span> &mdash; What AnvasTech built</p>
        <h2 className="display">The platform</h2>
        <p className="prose">AnvasTech built Kubera AI as a trading platform that combines AI-assisted strategy creation with market analysis, backtesting, execution workflows and risk controls.</p>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker"><span className="cs-step">04</span> &mdash; Capabilities</p>
        <h2 className="display">What the platform does</h2>
        <div className="list-cards">
          <article className="list-card"><h3>AI-assisted strategy creation</h3><p>Trading strategies created with AI assistance within the platform.</p></article>
          <article className="list-card"><h3>Market analysis</h3><p>Market analysis available in the platform.</p></article>
          <article className="list-card"><h3>Backtesting</h3><p>Strategies tested against historical data.</p></article>
          <article className="list-card"><h3>Execution workflows</h3><p>Execution handled through defined workflows in the platform.</p></article>
          <article className="list-card"><h3>Risk controls</h3><p>Risk controls applied within the platform.</p></article>
        </div>
      </div>
    </section>

    

    <section className="section" id="related">
      <div className="wrap">
        <p className="kicker">Related case studies</p>
        <h2 className="display">Other products we have built</h2>
        <div className="list-cards">
          <Link className="list-card" to="/case-study-vishful"><h3>Vishful</h3><p>Property &amp; Co-Living Operations</p></Link>
          <Link className="list-card" to="/case-study-vishful-attendance"><h3>Vishful Attendance</h3><p>Mobile Face-Scan Attendance</p></Link>
          <Link className="list-card" to="/case-study-elegal"><h3>eLegal / GetLegal</h3><p>AI-Powered Property Legal Intelligence</p></Link>
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
