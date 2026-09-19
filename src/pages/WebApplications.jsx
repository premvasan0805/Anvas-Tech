import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  { num: '01', title: 'User Interfaces', text: 'Design and develop clear interfaces around the needs of the people using the application.' },
  { num: '02', title: 'Frontend Development', text: 'Build the application interface and user interactions.' },
  { num: '03', title: 'Backend Development', text: 'Develop the application logic and functionality required by the product.' },
  { num: '04', title: 'Database Integration', text: 'Connect applications with the data required for their workflows.' },
  { num: '05', title: 'API Integration', text: 'Connect the application with required software services and systems.' },
  { num: '06', title: 'Testing & Improvement', text: 'Test application functionality and continuously improve the software.' },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand the users, requirements, and workflow.' },
  { num: '02', title: 'Design', text: 'Create the interface and user experience.' },
  { num: '03', title: 'Develop', text: 'Build the frontend, backend, and application functionality.' },
  { num: '04', title: 'Integrate', text: 'Connect the application with databases, APIs, and required services.' },
  { num: '05', title: 'Test', text: 'Check functionality and identify issues.' },
  { num: '06', title: 'Improve', text: 'Refine the application based on requirements and feedback.' },
];

/* The capabilities above, read as the stack the overview paragraph names. */
const LAYERS = [
  { title: 'Interface', text: 'UI and UX' },
  { title: 'Frontend', text: 'Interactions' },
  { title: 'Backend', text: 'Application logic' },
  { title: 'Database', text: 'Workflow data' },
  { title: 'APIs', text: 'Connected services' },
];

const AREAS = [
  { num: '01', title: 'Business Applications', text: 'Build software around specific business processes and requirements.' },
  { num: '02', title: 'Operational Platforms', text: 'Bring operational workflows and information into a connected application.' },
  { num: '03', title: 'Customer-Facing Applications', text: 'Create web experiences for users and customers.' },
  { num: '04', title: 'Digital Products', text: 'Develop web-based products around a specific problem or use case.' },
];

export default function WebApplications() {
  usePageMeta("Web Applications | AnvasTech", "AnvasTech develops web applications that bring users, workflows, data, and business requirements together in a single digital experience.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-engineering" aria-hidden="true">
        <video src="/assets/engineering-hero.mp4?v=1" poster="/assets/engineering-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Web Applications</p>
        <h1>Web Applications</h1>
        <p className="lede">Build web applications around real user and business needs. AnvasTech develops web applications that bring users, workflows, data, and business requirements together in a single digital experience.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product &amp; Software Engineering</p>
            <h2 className="sp-h2">Build Web Applications That Solve Real Problems</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>We combine UI/UX design, frontend and backend development, databases, and software engineering to create web applications around specific product and business requirements.</p>
            <p className="sp-p">Our approach starts with understanding the workflow and continues through design, development, testing, and improvement.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          {/* A web application is a stack, and the paragraph beside this names
              its parts — so the plate draws them as layers. */}
          <figure className="sp-plate is-layers">
            <p className="sp-plate-cap">What we build</p>
            <ul className="sp-layers">
              {LAYERS.map((l) => (
                <li key={l.title}>{l.title}<span>{l.text}</span></li>
              ))}
            </ul>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What we deliver</p>
            <h2 className="sp-h2">Web Application Development</h2>
          </div>
          <p className="sp-lede">Interface, logic, data and the connections between them &mdash; built as one application rather than assembled from parts.</p>
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

    <section className="sp-band is-neutral" id="process">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">How we build</p>
            <h2 className="sp-h2">Our Web Application Process</h2>
          </div>
          <p className="sp-lede">Six stages from the first look at a workflow through to the refinements that follow it going live.</p>
        </div>
        <ol className="sp-steps is-3up">
          {STEPS.map((st) => (
            <li className="sp-step" key={st.num}>
              <span className="sp-step-num">{st.num}</span>
              <h3>{st.title}</h3>
              <p>{st.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-fits" id="where-it-helps">
      <img src="/assets/ai-easy.jpg?v=1" alt="" width="1024" height="416" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Where it applies</p>
        <h2 className="sp-h2">Where Web Applications Help</h2>
        <ol className="sp-areas is-4up">
          {AREAS.map((a) => (
            <li className="sp-area" key={a.num}>
              <span className="sp-area-num">{a.num}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-band is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Product &amp; Software Engineering</p>
            <h2 className="sp-h2">Explore More</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/product-engineering">
            <h3>Product Development</h3>
            <p>Turn product ideas into working digital products.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/mobile-applications">
            <h3>Mobile Applications</h3>
            <p>Build mobile applications around real user needs.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/ui-ux-product-design">
            <h3>UI/UX &amp; Product Design</h3>
            <p>Design digital products around people and their needs.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have a Web Application Idea?</h2>
          <p className="sp-lede">Tell us about your requirements and explore how AnvasTech can turn them into working software.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
