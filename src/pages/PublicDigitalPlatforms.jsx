import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function PublicDigitalPlatforms() {
  usePageMeta("Public-Facing Digital Platforms | AnvasTech", "Citizen services, grievance redressal and constituency platforms built for scale, accessibility and public trust.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Public-Facing Digital Platforms</p>
        <h1>Public-Facing Digital Platforms</h1>
        <p className="lede">Citizen services, grievance redressal and constituency platforms built for scale, accessibility and public trust.</p>
      </div>
    </section>

    <section className="section" id="overview">
      <div className="wrap split">
        <div>
          <p className="kicker">Industries &amp; Use Cases</p>
          <h2 className="display">Public platforms carry a higher bar</h2>
          <p className="prose">A public platform has to work on an old phone, on a slow connection, in more than one language, for someone who may be using it once a year. That shapes every design decision.</p>
          <p className="prose">It also has to be accountable: each request traceable, each action attributable, each outcome recorded.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our team</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/sol-government.jpg" alt="Public digital platform" width="1024" height="682" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker">What we deliver</p>
        <h2 className="display">Built for public service delivery</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Citizen grievance systems</h3><p>Intake, routing, escalation and closure with a reference the citizen can track.</p></article>
          <article className="list-card"><h3>Service delivery portals</h3><p>Applications, approvals and certificates delivered online.</p></article>
          <article className="list-card"><h3>Multilingual and accessible</h3><p>Regional language support and accessibility as requirements, not extras.</p></article>
          <article className="list-card"><h3>Field and camp operations</h3><p>Mobile capture for officers working away from the office.</p></article>
          <article className="list-card"><h3>Scale and resilience</h3><p>Architecture that survives announcement-day traffic.</p></article>
          <article className="list-card"><h3>Transparency reporting</h3><p>Public dashboards and internal analytics on volumes and resolution.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="outcomes">
      <div className="wrap">
        <p className="kicker">Outcomes</p>
        <h2 className="display">Where it makes a difference</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Wider reach</h3><p>Services reach people who cannot travel to an office.</p></article>
          <article className="list-card"><h3>Accountable delivery</h3><p>Every request has an owner, a deadline and a closing record.</p></article>
          <article className="list-card"><h3>Better planning</h3><p>Patterns by locality and category inform where to act next.</p></article>
        </div>
      </div>
    </section>

    <section className="section mist" id="related">
      <div className="wrap">
        <p className="kicker">Industries &amp; Use Cases</p>
        <h2 className="display">Explore more</h2>
        <div className="list-cards">
          <Link className="list-card" to="/logistics-operations"><h3>Logistics &amp; Operations</h3><p>Fleet, freight, warehouse and last-mile operations on one connected system.</p></Link>
          <Link className="list-card" to="/financial-technology"><h3>Financial Technology</h3><p>Payments, lending, compliance and digital banking journeys.</p></Link>
          <Link className="list-card" to="/legal-technology"><h3>Legal Technology</h3><p>Case management, document workflow and compliance for legal teams.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Deliver public services digitally</h2>
          <p className="prose">Tell us where you are today. We will map the shortest route to a working solution.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Start a conversation</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/cs-tile-2.jpg" alt="AnvasTech team" width="760" height="375" />
        </figure>
      </div>
    </section>
    </main>
  );
}
