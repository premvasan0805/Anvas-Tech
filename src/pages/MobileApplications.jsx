import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  { num: '01', title: 'Mobile UI & UX', text: 'Design interfaces and user flows around the mobile experience.' },
  { num: '02', title: 'Application Development', text: 'Build the functionality required for the mobile product.' },
  { num: '03', title: 'User Workflows', text: 'Structure application flows around specific user tasks and requirements.' },
  { num: '04', title: 'Backend & API Integration', text: 'Connect the mobile application with the required backend services and APIs.' },
  { num: '05', title: 'Testing & Improvement', text: 'Test application functionality and improve the experience through iteration.' },
  { num: '06', title: 'Product Updates', text: 'Continue developing the application as features and requirements evolve.' },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand users, requirements, and workflows.' },
  { num: '02', title: 'Design', text: 'Create mobile interfaces and user flows.' },
  { num: '03', title: 'Develop', text: 'Build the application and required functionality.' },
  { num: '04', title: 'Integrate', text: 'Connect the application with required APIs and services.' },
  { num: '05', title: 'Test', text: 'Validate functionality and identify issues.' },
  { num: '06', title: 'Improve', text: 'Refine the application based on requirements and feedback.' },
];

const AREAS = [
  { num: '01', title: 'Business Applications', text: 'Create mobile software around specific business workflows.' },
  { num: '02', title: 'Workforce Applications', text: 'Support employees and operational workflows through mobile applications.' },
  { num: '03', title: 'Customer Applications', text: 'Build mobile experiences for users and customers.' },
  { num: '04', title: 'Digital Products', text: 'Turn product ideas into mobile-based software experiences.' },
];

export default function MobileApplications() {
  usePageMeta("Mobile Applications | AnvasTech", "AnvasTech develops mobile applications that bring product ideas, user workflows, and software functionality together in a focused mobile experience.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-engineering" aria-hidden="true">
        <video src="/assets/engineering-hero.mp4?v=1" poster="/assets/engineering-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / Mobile Applications</p>
        <h1>Mobile Applications</h1>
        <p className="lede">Build mobile applications around real user needs. AnvasTech develops mobile applications that bring product ideas, user workflows, and software functionality together in a focused mobile experience.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">Product &amp; Software Engineering</p>
            <h2 className="sp-h2">Build for Mobile</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>We combine product thinking, UI/UX design, and software development to create mobile applications around specific requirements and user workflows.</p>
            <p className="sp-p">Our approach covers planning, design, development, testing, and continuous improvement.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          {/* A mobile page, so the overview steps are framed in a handset
              rather than laid out as another list. */}
          <figure className="sp-plate is-device">
            <p className="sp-plate-cap">Our approach</p>
            <div className="sp-device">
              <div className="sp-device-screen">
                <ol>
                  {STEPS.map((st) => (
                    <li key={st.num}>
                      <span>{st.title}</span>
                      <b>{st.num}</b>
                    </li>
                  ))}
                </ol>
              </div>
            </div>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What we deliver</p>
            <h2 className="sp-h2">Mobile Application Development</h2>
          </div>
          <p className="sp-lede">A mobile product is a small screen, a short attention span and a workflow that has to fit both.</p>
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
            <h2 className="sp-h2">Our Mobile Application Process</h2>
          </div>
          <p className="sp-lede">Six stages from understanding the user's task through to the updates that follow release.</p>
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
      <img src="/assets/ai-leadership.jpg" alt="" width="1024" height="529" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Where it applies</p>
        <h2 className="sp-h2">Where Mobile Applications Help</h2>
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
            <p>Turn ideas into working digital products.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/web-applications">
            <h3>Web Applications</h3>
            <p>Build web applications around real requirements.</p>
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
          <h2>Have a Digital Product Idea?</h2>
          <p className="sp-lede">Tell us what you&rsquo;re building and explore the product, design, and engineering approach that fits your requirements.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
