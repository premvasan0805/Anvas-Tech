import { usePageMeta } from '../lib/usePageMeta.js';
import CareersHero from '../components/CareersHero.jsx';
import ResumeSection from '../components/ResumeSection.jsx';
import BuildLoop from '../components/BuildLoop.jsx';

const AREAS = [
  {
    num: '01',
    title: 'Software Engineering',
    text: 'Build applications and digital products through practical software engineering.',
  },
  {
    num: '02',
    title: 'AI & Engineering',
    text: 'Explore AI-assisted development and intelligent software systems.',
  },
  {
    num: '03',
    title: 'Product & Design',
    text: 'Work on product experiences, interfaces, workflows, and digital products.',
  },
  {
    num: '04',
    title: 'Business & Operations',
    text: 'Support the products, services, and business operations behind AnvasTech.',
  },
];

const STEPS = [
  { num: '01', title: 'Understand', text: 'Understand the requirement, problem, and expected outcome.' },
  { num: '02', title: 'Design', text: 'Shape the product, workflow, interface, and technical approach.' },
  { num: '03', title: 'Build', text: 'Turn the defined approach into working software.' },
  { num: '04', title: 'Test', text: 'Check the implementation, identify issues, and validate the solution.' },
  { num: '05', title: 'Improve', text: 'Refine the product based on findings, requirements, and feedback.' },
];

const REASONS = [
  { num: '01', title: 'Real Product Work', text: 'Work around software products and applications built around practical requirements.' },
  { num: '02', title: 'Engineering & Technology', text: 'Work with development tools and technologies as part of real projects.' },
  { num: '03', title: 'AI-Assisted Workflows', text: 'Explore how AI tools can support development, problem solving, and productivity.' },
  { num: '04', title: 'Continuous Learning', text: 'Develop your skills through experimentation, development, and practical work.' },
  { num: '05', title: 'Collaborative Development', text: 'Work across product, design, engineering, and business requirements.' },
];

const INTERN_AREAS = [
  'Software Development',
  'Web Development',
  'Mobile Development',
  'UI/UX & Product Design',
  'AI & Intelligent Systems',
  'Data & Digital Solutions',
  'Business & Operations',
];

const LEARN = [
  { num: '01', title: 'Practical Development', text: 'Understand how software is designed and developed.' },
  { num: '02', title: 'Team Collaboration', text: 'Experience working with requirements, design, development, and feedback.' },
  { num: '03', title: 'Modern Tools', text: 'Get exposure to contemporary development and AI-assisted tools where relevant to the role.' },
  { num: '04', title: 'Problem Solving', text: 'Work through practical technical and product-related challenges.' },
];

export default function Careers() {
  usePageMeta("Careers | AnvasTech", "Build digital products and software solutions at AnvasTech — engineering, AI, product and design work on software built around practical requirements.");
  return (
    <main id="main" className="solution-page">

    {/* 01 — Hero */}
    <CareersHero />

    {/* 02 — What you can build */}
    <section className="sp-band is-white" id="opportunities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Opportunities</p>
            <h2 className="sp-h2">Work Across Technology, Products &amp; Engineering.</h2>
          </div>
          <p className="sp-lede">Our work spans different areas of software and digital product development. Depending on the role, you may contribute to technology, product, design, AI, or business operations.</p>
        </div>
        <div className="sp-links is-4up">
          {AREAS.map((a) => (
            <a key={a.num} href="#positions">
              <span className="sp-index-name">{a.num}</span>
              <h3>{a.title}</h3>
              <p>{a.text}</p>
              <span className="sp-link">Explore Roles</span>
            </a>
          ))}
        </div>
      </div>
    </section>

    {/* 03 — How we build */}
    <section className="sp-band" id="approach">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Our engineering approach</p>
            <h2 className="sp-h2">Understand First. Build With Purpose.</h2>
          </div>
          <p className="sp-lede">We focus on understanding the requirement first, choosing an appropriate technical approach, and continuously improving what we build.</p>
        </div>
        <BuildLoop steps={STEPS} />
      </div>
    </section>

    {/* 04 — Why AnvasTech */}
    <section className="sp-band is-neutral" id="why">
      <div className="sp-wrap">
        <div className="sp-intro is-top">
          <div>
            <p className="sp-eyebrow">Why AnvasTech</p>
            <h2 className="sp-h2">Build With Purpose. Grow Through Engineering.</h2>
            <p className="sp-statement">Build real things.<span>Learn by doing.</span></p>
          </div>
          <div>
            <p className="sp-lede" style={{ marginBottom: '36px' }}>AnvasTech focuses on building products and delivering technology solutions. Our work brings together different technical and creative skills to turn requirements into working software.</p>
            <div className="sp-rows is-1up">
              {REASONS.map((r) => (
                <article className="sp-row" key={r.num}>
                  <span className="sp-row-num">{r.num}</span>
                  <div>
                    <h3>{r.title}</h3>
                    <p>{r.text}</p>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 05 — Internships */}
    <section className="sp-band is-white" id="internships">
      <div className="sp-wrap">
        <div className="sp-intro is-top">
          <div>
            <p className="sp-eyebrow">Early career</p>
            <h2 className="sp-h2">Start Your Journey by Building Real Things.</h2>
            <div className="sp-actions">
              <a className="sp-btn" href="#positions">View Internship Opportunities</a>
            </div>
          </div>
          <div>
            <p className="sp-lede" style={{ marginBottom: '32px' }}>AnvasTech internships are intended for students and early-career candidates who want practical exposure to technology and software development.</p>
            <ul className="sp-list">
              {INTERN_AREAS.map((a) => <li key={a}>{a}</li>)}
            </ul>
          </div>
        </div>
        <div className="sp-steps">
          {LEARN.map((l) => (
            <article className="sp-step" key={l.num}>
              <p className="sp-step-num">{l.num}</p>
              <h3>{l.title}</h3>
              <p>{l.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    {/* 06 — Open positions */}
    <section className="sp-band" id="positions">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Open positions</p>
          <h2 className="sp-h2">Find Your Next Opportunity at AnvasTech.</h2>
          <p className="sp-lede" style={{ marginTop: '18px' }}>Explore current opportunities across technology, product, design, AI, and business operations.</p>
          {/* No vacancy is verified, so the panel says so. Replace this block
              with position cards when a real opening exists. */}
          <div className="cr-empty">
            <div className="cr-empty-copy">
              <span className="cr-status"><i aria-hidden="true" />No open roles today</span>
              <h3>No Open Positions Right Now</h3>
              <p>We don&rsquo;t currently have an active opening that matches your profile.</p>
              <p>You can still share your resume for consideration when a relevant opportunity becomes available.</p>
              <div className="sp-actions">
                <a className="sp-btn" href="#resume">Submit Your Resume</a>
              </div>
            </div>
            {/* A resume writes itself and drops into the talent pool: the
                one thing a visitor can do here today. */}
            <div className="cr-drop" aria-hidden="true">
              <div className="cr-folder-back" />
              <div className="cr-sheet">
                <div className="cr-sheet-head"><i /><b /></div>
                <span className="cr-l cr-l1" />
                <span className="cr-l cr-l2" />
                <span className="cr-l cr-l3" />
                <div className="cr-sheet-tags"><em>Engineering</em><em>Design</em><em>AI</em></div>
              </div>
              <div className="cr-folder-front"><strong>Talent pool</strong><small>AnvasTech &middot; resumes kept on file</small></div>
              <div className="cr-toast"><i />Saved for future roles</div>
            </div>
          </div>
        </div>
      </div>
    </section>

    {/* 07 — Submit your resume */}
    <ResumeSection />

    {/* 08 — Closing */}
    <section className="sp-band is-white" id="closing">
      <div className="sp-wrap">
        <div className="sp-close">
          <h2>Ready to Build What&rsquo;s Next?</h2>
          <p className="sp-lede">Explore opportunities to learn, build, and contribute to real digital products and software solutions.</p>
          <div className="sp-actions">
            <a className="sp-btn" href="#positions">View Open Positions</a>
            <a className="sp-btn-ghost on-light" href="#internships">Explore Internships</a>
          </div>
        </div>
      </div>
    </section>
    </main>
  );
}
