import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function TechnologyExcellence() {
  usePageMeta("Engineering Built for Scale | AnvasTech", "AnvasTech engineers enterprise technology for performance, security, scalability and reliability \u2014 built to evolve with changing business needs.");
  return (
    <main id="main">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/#recognition">What We Build</Link> / Technology Excellence</p>
        <h1>Engineering Built for Scale</h1>
        <p className="lede">Enterprise technology demands more than functionality. It requires performance, security, scalability, reliability, and the ability to evolve with changing business needs. AnvasTech engineers technology solutions designed to meet those demands.</p>
      </div>
    </section>

    <section className="section" id="enterprise-engineering">
      <div className="wrap split">
        <div>
          <p className="kicker">Enterprise engineering</p>
          <h2 className="display">The requirements that outlive the feature list</h2>
          <p className="prose">Features are the part of a system everyone agrees on at the start. What decides whether it survives three years in production is everything underneath: how it handles load, how it fails, how it is deployed, and how easily the next engineer can change it.</p>
          <p className="prose">We treat those as requirements with the same standing as the functional ones, because retrofitting them is always more expensive than designing for them.</p>
          <div className="actions"><Link className="btn-blue" to="/what-we-do">Explore technology solutions</Link></div>
        </div>
        {/* The four things the paragraph beside this names, listed at the
            same weight as any feature would be — which is the claim. */}
        <figure className="media-frame tx-panel">
          <p className="tx-panel-cap">Same standing as the feature list</p>
          <ul className="tx-reqs">
            <li>How it handles load <span>Performance</span></li>
            <li>How it fails <span>Reliability</span></li>
            <li>How it is deployed <span>Operability</span></li>
            <li>How easily the next engineer can change it <span>Maintainability</span></li>
          </ul>
          <p className="tx-panel-foot">Retrofitting these is always more expensive than designing for them.</p>
        </figure>
      </div>
    </section>

    <section className="section mist" id="scalable-architecture">
      <div className="wrap">
        <p className="kicker">Scalable architecture</p>
        <h2 className="display">Designed for the load you will have</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Right-sized from the start</h3><p>Architecture matched to actual traffic and team size. Complexity you do not need is a cost, not a hedge.</p></article>
          <article className="list-card"><h3>Clear service boundaries</h3><p>Systems split along the lines the business actually changes, so one change does not touch everything.</p></article>
          <article className="list-card"><h3>Data access patterns</h3><p>Query paths, indexing and caching planned against real access patterns rather than assumed ones.</p></article>
          <article className="list-card"><h3>Horizontal headroom</h3><p>Stateless services and queue-backed processing so capacity is added rather than rearchitected.</p></article>
          <article className="list-card"><h3>Graceful degradation</h3><p>Under stress the system sheds load predictably instead of failing all at once.</p></article>
          <article className="list-card"><h3>Versioned interfaces</h3><p>APIs that can evolve without breaking every consumer on the same day.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="cloud-modernization">
      <div className="wrap split reverse">
        {/* Two lanes, because the point of the section is that both run at
            once: the legacy system keeps serving while capability moves. */}
        <figure className="media-frame tx-panel">
          <p className="tx-panel-cap">Incremental, not big-bang</p>
          <div className="tx-lanes">
            <div className="tx-lane is-legacy">Legacy system <small>still serving traffic</small></div>
            <div className="tx-lane is-new">Capability moving across <small>slice by slice</small></div>
            <div className="tx-lane is-legacy">Infrastructure as code <small>environments behave the same</small></div>
          </div>
          <p className="tx-panel-foot">The cheapest architecture that meets the availability target is the right one.</p>
        </figure>
        <div>
          <p className="kicker">Cloud &amp; modernization</p>
          <h2 className="display">Move what is worth moving</h2>
          <p className="prose">Big-bang rewrites fail for predictable reasons: they run long, they freeze the business, and they replace a known system with an unproven one. We modernize incrementally, keeping the legacy system serving traffic while capability moves across.</p>
          <p className="prose">Infrastructure is defined as code, environments behave the same way, and cost is designed alongside reliability — the cheapest architecture that meets the availability target is the right one.</p>
        </div>
      </div>
    </section>

    <section className="section mist" id="security-by-design">
      <div className="wrap">
        <p className="kicker">Security by design</p>
        <h2 className="display">Controls in the architecture, not in the audit</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Least privilege</h3><p>Services, agents and people get the narrowest access their job requires, with credentials scoped accordingly.</p></article>
          <article className="list-card"><h3>Data protection</h3><p>Encryption in transit and at rest, with sensitive fields identified and handled deliberately.</p></article>
          <article className="list-card"><h3>Authentication and authorization</h3><p>Identity, roles and record-level permissions enforced server-side, consistently.</p></article>
          <article className="list-card"><h3>Pipeline scanning</h3><p>Dependency, secret and licence checks running on every build, not quarterly.</p></article>
          <article className="list-card"><h3>Audit trails</h3><p>Who changed what, when, and on what authority — produced by the system as a matter of course.</p></article>
          <article className="list-card"><h3>Maker-checker controls</h3><p>Approval gates on irreversible and outward-facing actions, especially in regulated workflows.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="ai-enabled-engineering">
      <div className="wrap split">
        <div>
          <p className="kicker">AI-enabled engineering</p>
          <h2 className="display">AI in the toolchain, with the practice to match</h2>
          <p className="prose">AI coding tools raise throughput only when the surrounding practice changes with them. Specifications get tighter, tests carry more weight, and review shifts from syntax to architecture, security and edge cases.</p>
          <p className="prose">We measure whether it worked — cycle time, change failure rate and review load, tracked before and after — rather than assuming the tooling paid for itself.</p>
        </div>
        {/* The section makes two claims — the practice changes, and the
            change is measured — so the panel carries both. */}
        <figure className="media-frame tx-panel">
          <div className="tx-pairs">
            <div>
              <h4>What changes</h4>
              <ul>
                <li>Tighter specifications</li>
                <li>Tests carry more weight</li>
                <li>Review shifts to architecture, security and edge cases</li>
              </ul>
            </div>
            <div>
              <h4>What we measure</h4>
              <ul>
                <li>Cycle time</li>
                <li>Change failure rate</li>
                <li>Review load</li>
              </ul>
            </div>
          </div>
          <p className="tx-panel-foot">Tracked before and after, rather than assumed.</p>
        </figure>
      </div>
    </section>

    <section className="section mist" id="performance-reliability">
      <div className="wrap">
        <p className="kicker">Performance &amp; reliability</p>
        <h2 className="display">Measured, budgeted and watched</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Performance budgets</h3><p>Core Web Vitals and API latency treated as requirements, enforced in the pipeline.</p></article>
          <article className="list-card"><h3>Observability</h3><p>Metrics, logs and traces that make a production problem diagnosable rather than theoretical.</p></article>
          <article className="list-card"><h3>Alerting that means something</h3><p>Alerts mapped to user impact, so the on-call response is proportionate.</p></article>
          <article className="list-card"><h3>Tested recovery</h3><p>Backup, failover and rollback rehearsed before they are needed at two in the morning.</p></article>
          <article className="list-card"><h3>Capacity planning</h3><p>Load testing against realistic traffic shapes, including the announcement-day spike.</p></article>
          <article className="list-card"><h3>Offline resilience</h3><p>Field applications that keep working through dead zones and reconcile when the network returns.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="our-approach">
      <div className="wrap">
        <p className="kicker">Our engineering approach</p>
        <h2 className="display">How a project actually runs</h2>
        <div className="list-cards">
          <article className="list-card"><h3>1. Discovery</h3><p>Understand the process, the constraints and the exceptions people work around today.</p></article>
          <article className="list-card"><h3>2. Architecture</h3><p>Decide the shape of the system against real load, team and change-rate constraints.</p></article>
          <article className="list-card"><h3>3. Delivery in slices</h3><p>Working software in short cycles, each slice useful on its own.</p></article>
          <article className="list-card"><h3>4. Hardening</h3><p>Performance, security and failure testing before the system carries real traffic.</p></article>
          <article className="list-card"><h3>5. Launch</h3><p>Rehearsed cutover, staged rollout and a rollback path that has been tried.</p></article>
          <article className="list-card"><h3>6. Sustaining</h3><p>Monitoring, upgrades and performance work on a steady cadence after go-live.</p></article>
        </div>
      </div>
    </section>

    <section className="section mist" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Put it to the test on your system</h2>
          <p className="prose">Tell us the load, the constraints and the deadline. We will tell you what we would build and what we would not.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our engineers</Link></div>
        </div>
        {/* The closing line asks for three things; the panel names them so
            the reader knows what to send. It is not a photograph of anyone. */}
        <figure className="media-frame tx-panel">
          <p className="tx-panel-cap">Tell us three things</p>
          <ul className="tx-asks">
            <li><b>The load</b><span>Traffic shape today, and what you expect it to become.</span></li>
            <li><b>The constraints</b><span>Systems you must keep, rules you must meet, team you have.</span></li>
            <li><b>The deadline</b><span>The date that is real, and what happens if it moves.</span></li>
          </ul>
          <p className="tx-panel-foot">We will tell you what we would build and what we would not.</p>
        </figure>
      </div>
    </section>
    </main>
  );
}
