import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

export default function CloudDeployment() {
  usePageMeta("Cloud &amp; Deployment | AnvasTech", "Cloud infrastructure and delivery pipelines built for safe, frequent releases and predictable cost.");
  return (
    <main id="main">

    <section className="page-hero">
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Cloud &amp; Deployment</p>
        <h1>Cloud &amp; Deployment</h1>
        <p className="lede">Cloud infrastructure and delivery pipelines built for safe, frequent releases and predictable cost.</p>
      </div>
    </section>

    <section className="section" id="overview">
      <div className="wrap split">
        <div>
          <p className="kicker">Digital Engineering</p>
          <h2 className="display">Getting to production, repeatedly</h2>
          <p className="prose">Infrastructure defined as code, deployments automated, and rollback rehearsed — so releasing is a routine operation rather than a risk event.</p>
          <p className="prose">Cost and reliability are designed together: the cheapest architecture that meets the availability target is the right one.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Talk to our team</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/cs-rail.jpg" alt="" width="1024" height="647" />
        </figure>
      </div>
    </section>

    <section className="section mist" id="capabilities">
      <div className="wrap">
        <p className="kicker">What we deliver</p>
        <h2 className="display">Infrastructure and delivery</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Infrastructure as code</h3><p>Reproducible environments defined in version control.</p></article>
          <article className="list-card"><h3>CI/CD pipelines</h3><p>Automated build, test and deploy with quality gates that can block a release.</p></article>
          <article className="list-card"><h3>Containers and orchestration</h3><p>Docker and Kubernetes where the workload justifies them.</p></article>
          <article className="list-card"><h3>Environment strategy</h3><p>Development, staging and production that behave the same way.</p></article>
          <article className="list-card"><h3>Monitoring and alerting</h3><p>Metrics, logs and traces with alerts that map to real user impact.</p></article>
          <article className="list-card"><h3>Cost management</h3><p>Right-sizing, autoscaling and spend visibility per service.</p></article>
        </div>
      </div>
    </section>

    <section className="section" id="outcomes">
      <div className="wrap">
        <p className="kicker">Outcomes</p>
        <h2 className="display">Where it makes a difference</h2>
        <div className="list-cards">
          <article className="list-card"><h3>Release without drama</h3><p>Deployments are automated, tested and reversible.</p></article>
          <article className="list-card"><h3>Known cost</h3><p>Cloud spend is attributable and tuned rather than discovered.</p></article>
          <article className="list-card"><h3>Faster recovery</h3><p>Monitoring and rollback shorten the time from incident to resolution.</p></article>
        </div>
      </div>
    </section>

    <section className="section mist" id="related">
      <div className="wrap">
        <p className="kicker">Digital Engineering</p>
        <h2 className="display">Explore more</h2>
        <div className="list-cards">
          <Link className="list-card" to="/product-engineering"><h3>Product Development</h3><p>Turn ideas into working digital products.</p></Link>
          <Link className="list-card" to="/ai-development-workspace"><h3>AI Development Workspace</h3><p>AI-assisted development using modern coding tools and delivery practices.</p></Link>
          <Link className="list-card" to="/web-applications"><h3>Web Applications</h3><p>Build web applications around real user and business needs.</p></Link>
        </div>
      </div>
    </section>

    <section className="section" id="contact-cta">
      <div className="wrap split">
        <div>
          <h2 className="display">Get your platform production-ready</h2>
          <p className="prose">Tell us where you are today. We will map the shortest route to a working solution.</p>
          <div className="actions"><Link className="btn-blue" to="/contact">Start a conversation</Link></div>
        </div>
        <figure className="media-frame">
          <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" />
        </figure>
      </div>
    </section>
    </main>
  );
}
