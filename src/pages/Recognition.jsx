import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function Recognition() {
  usePageMeta("Recognized for AI &amp; Digital Innovation | AnvasTech", "AnvasTech brings together artificial intelligence, software engineering and digital transformation to address complex real-world challenges.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/#recognition">What We Build</Link> / Industry Recognition</p>
        <h1>Recognized for AI &amp; Digital Innovation</h1>
        <p className="lede">AnvasTech is committed to building technology that creates meaningful business and industry impact. Our work brings together artificial intelligence, software engineering, and digital transformation to address complex real-world challenges.</p>
      </div>
    </section>

    <section className="section" id="our-recognition">
      <div className="wrap split">
        <div>
          <p className="kicker">Our recognition</p>
          <h2 className="display">Judged by what we put into production</h2>
          <p className="prose">Recognition, for us, is not a wall of plaques. It is the record of systems that went live, stayed live, and changed how an organization works the following Monday.</p>
          <p className="prose">Across logistics, financial services, legal operations and public service delivery, our teams have taken complex, messy processes and turned them into software people actually use. That work is what our clients, partners and industry peers respond to.</p>
          <div className="actions"><Link className="btn-blue" to="/what-we-do">Explore our solutions</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/ai-force.jpg" alt="AnvasTech engineering and AI work" width="1400" height="874" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="by-the-numbers">
      <div className="wrap">
        <p className="kicker">By the numbers</p>
        <h2 className="display">Where the work stands today</h2>
        <div className="stats-row">
          <div className="stat"><b>11+</b><span>Active and completed systems in production</span></div>
          <div className="stat"><b>7+</b><span>AI and digital initiatives underway</span></div>
          <div className="stat"><b>Multiple</b><span>Industry domains served</span></div>
          <div className="stat"><b>AI-First</b><span>Development workflow across delivery</span></div>
        </div>
      </div>
    </section>

    <section className="section" id="ai-digital-innovation">
      <div className="wrap split reverse">
        <figure className="media-frame">
          <img src="/assets/ai-slide-4.jpg" alt="" width="1024" height="521" loading="lazy" />
        </figure>
        <div>
          <p className="kicker">AI &amp; digital innovation</p>
          <h2 className="display">AI applied to the work, not to the pitch</h2>
          <p className="prose">We build AI into the process where it changes the economics of the task: reading documents nobody has time to read, surfacing the exception hidden in a day of transactions, drafting the first version so a person can spend their time on the last one.</p>
          <p className="prose">Every deployment is grounded in the client's own data, scoped to a specific decision, and measured against the process it replaced. That discipline is why our AI work reaches production instead of stopping at the pilot.</p>
        </div>
      </div>
    </section>

    <section className="section mist" id="software-engineering">
      <div className="wrap">
        <p className="kicker">Software engineering excellence</p>
        <h2 className="display">The practices behind the delivery</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Product thinking first</h3><p>Discovery before code. The fastest way to lose a year is to build the wrong thing efficiently.</p></article>
          <article className="list-card"><h3>Test-driven delivery</h3><p>Tests define intent, which is what makes fast, AI-assisted development reviewable.</p></article>
          <article className="list-card"><h3>Architecture that fits</h3><p>Technical design matched to the real load, team size and rate of change — not to a reference diagram.</p></article>
          <article className="list-card"><h3>Release discipline</h3><p>Automated pipelines, quality gates and rehearsed rollback make shipping routine.</p></article>
          <article className="list-card"><h3>Built to be maintained</h3><p>The next team has to read it. Conventions, documentation and upgrades are part of the job.</p></article>
          <article className="list-card"><h3>Security as default</h3><p>Authentication, authorization, validation and dependency hygiene handled during build.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="business-impact">
      <div className="wrap split">
        <div>
          <p className="kicker">Business &amp; industry impact</p>
          <h2 className="display">Impact measured where the work happens</h2>
          <p className="prose">A dispatcher who stops chasing paperwork. A legal team that never misses a limitation date. A citizen who can check the status of a petition without travelling to an office. That is the level at which we judge whether a system worked.</p>
          <p className="prose">Our platforms run in conditions that are rarely flattering to software — patchy connectivity, mixed device estates, paper-based processes still in use alongside digital ones. Designing for that reality is what makes the difference between a launch and an adoption.</p>
        </div>
        <figure className="media-frame">
          <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" loading="lazy" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="featured-achievements">
      <div className="wrap">
        <p className="kicker">Featured achievements</p>
        <h2 className="display">Systems we have taken to production</h2>
        <div className="list-cards">
          <Link className="list-card" to="/anvas-logistics"><h3>Anvas Logistics</h3><p>Fleet, freight and last-mile operations on one connected platform built for Indian road logistics.</p></Link>
          <Link className="list-card" to="/kubera-ai"><h3>Kubera AI</h3><p>An AI decision and automation layer that reads business data, explains its findings and acts on them.</p></Link>
          <Link className="list-card" to="/fintech-platform"><h3>FinTech Platform</h3><p>Payments, onboarding, ledgers and regulatory reporting with controls built into the architecture.</p></Link>
          <Link className="list-card" to="/elegal"><h3>eLegal</h3><p>Matter, hearing and document management that gives legal teams one reliable record.</p></Link>
          <Link className="list-card" to="/ungal-pakkam"><h3>Ungal Pakkam – Manu System</h3><p>Citizen grievance and service delivery with an owner, a deadline and a closing record for every request.</p></Link>
          <Link className="list-card" to="/mla-calendar"><h3>MLA Calendar</h3><p>Schedule, commitments and constituency activity management built for the pace of public office.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="what-this-means">
      <div className="wrap">
        <p className="kicker">What this means for our clients</p>
        <h2 className="display">Why the record matters to you</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Fewer unknowns</h3><p>We have shipped this class of system before. The difficult parts are not a discovery exercise on your budget.</p></article>
          <article className="list-card"><h3>Realistic scoping</h3><p>Estimates come from delivered work, so the plan survives contact with the first sprint.</p></article>
          <article className="list-card"><h3>AI that is usable</h3><p>Grounded, permissioned and reviewable — the properties that decide whether a team adopts it.</p></article>
          <article className="list-card"><h3>Systems that last</h3><p>Built to be maintained and extended, not rewritten when the next requirement arrives.</p></article>
        </div>
      </div>
    </section>

    <section className="section mist" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">See what we build</h2>
          <p className="prose">Capabilities, industries and real projects — from logistics and fintech to AI platforms and public-facing systems.</p>
          <div className="actions"><Link className="btn-blue" to="/what-we-do">Explore our solutions</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" loading="lazy" />
        </figure>
      </div>
    </section>
    </main>
  );
}
