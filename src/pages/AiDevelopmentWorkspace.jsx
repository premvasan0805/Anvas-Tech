import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  { num: '01', title: 'Tooling and environment', text: 'AI-assisted editors, agents and CI wired into the existing repository and pipeline.' },
  { num: '02', title: 'Prompt and context standards', text: 'Shared conventions so generated code fits the codebase it lands in.' },
  { num: '03', title: 'Test-first workflow', text: 'Tests define intent, which is what makes generated code reviewable.' },
  { num: '04', title: 'Code review practice', text: 'Review shifts to architecture, security and edge cases.' },
  { num: '05', title: 'Security and licence checks', text: 'Dependency, secret and licence scanning in the pipeline.' },
  { num: '06', title: 'Throughput measurement', text: 'Cycle time, change failure rate and review load tracked before and after.' },
];

/* Restates the capabilities above as the three strands the overview paragraph
   names — workspace, guardrails, habits. Nothing here is new information. */
const SETUP = [
  { title: 'Workspace', text: 'AI-assisted editors, agents and CI wired into the existing repository and pipeline.' },
  { title: 'Guardrails', text: 'Tests define intent. Dependency, secret and licence scanning run in the pipeline.' },
  { title: 'Team habits', text: 'Review shifts to architecture, security and edge cases.' },
];

const OUTCOMES = [
  { num: '01', title: 'Faster delivery cycles', text: 'Routine implementation stops being the bottleneck.' },
  { num: '02', title: 'Consistent codebase', text: 'Generated code follows the same conventions as everything else.' },
  { num: '03', title: 'Evidence, not vibes', text: 'Delivery metrics show whether the tooling is paying for itself.' },
];

export default function AiDevelopmentWorkspace() {
  usePageMeta("AI Development Workspace | AnvasTech", "An engineering setup where AI tooling is part of the delivery pipeline — with the review, testing and security practices that make it safe.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / AI Development Workspace</p>
        <h1>AI Development Workspace</h1>
        <p className="lede">An engineering setup where AI tooling is part of the delivery pipeline &mdash; with the review, testing and security practices that make it safe.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Digital Engineering</p>
            <h2 className="sp-h2">AI in the toolchain, not around it</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>AI coding tools change throughput only when the surrounding practice changes with them: tighter specifications, stronger tests, and review that focuses on design rather than syntax.</p>
            <p className="sp-p">We set up the workspace, the guardrails and the team habits together, then measure whether delivery actually improved.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to our team</Link></div>
          </div>
          {/* The three things the paragraph beside this says we set up
              together, so the plate carries the claim rather than stock art. */}
          <figure className="sp-plate is-triad">
            <p className="sp-plate-cap">Set up together</p>
            <div className="sp-triad">
              {SETUP.map((s) => (
                <div key={s.title}>
                  <h4>{s.title}</h4>
                  <p>{s.text}</p>
                </div>
              ))}
            </div>
            <p className="sp-plate-foot">Cycle time, change failure rate and review load tracked before and after.</p>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What we deliver</p>
            <h2 className="sp-h2">Setting up the practice</h2>
          </div>
          <p className="sp-lede">The tooling is the easy part. These are the habits and guardrails that decide whether it actually helps.</p>
        </div>
        <div className="sp-grid is-3up">
          {CAPABILITIES.map((c) => (
            <article className="sp-cell" key={c.num}>
              <span className="sp-num">{c.num}</span>
              <h3>{c.title}</h3>
              <p>{c.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-fits" id="outcomes">
      <img src="/assets/ai-easy.jpg?v=1" alt="" width="1024" height="416" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Outcomes</p>
        <h2 className="sp-h2">Where it makes a difference</h2>
        <ol className="sp-areas">
          {OUTCOMES.map((o) => (
            <li className="sp-area" key={o.num}>
              <span className="sp-area-num">{o.num}</span>
              <h3>{o.title}</h3>
              <p>{o.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-band is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Digital Engineering</p>
            <h2 className="sp-h2">Explore more</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/product-engineering">
            <h3>Product Development</h3>
            <p>Turn ideas into working digital products.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/web-applications">
            <h3>Web Applications</h3>
            <p>Build web applications around real user and business needs.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/mobile-applications">
            <h3>Mobile Applications</h3>
            <p>Build mobile applications around real user needs.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Modernize your development practice</h2>
          <p className="sp-lede">Tell us where you are today. We will map the shortest route to a working solution.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
