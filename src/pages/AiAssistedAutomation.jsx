import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  {
    num: '01',
    title: 'Workflow Automation',
    text: 'Automate defined tasks and processes within software workflows.',
  },
  {
    num: '02',
    title: 'AI-Assisted Tasks',
    text: 'Use AI capabilities to assist with tasks that involve information, content, or repetitive processing.',
  },
  {
    num: '03',
    title: 'Software Integration',
    text: 'Connect automation with the applications and systems required for the workflow.',
  },
  {
    num: '04',
    title: 'Process Improvement',
    text: 'Identify repetitive steps and explore where software and AI can simplify the process.',
  },
  {
    num: '05',
    title: 'Human Assistance',
    text: 'Keep people involved when a task requires review, input, or a decision.',
  },
  {
    num: '06',
    title: 'AI-Assisted Development',
    text: 'Use tools such as Claude, Cursor, and AI coding assistants to accelerate the development of automation solutions.',
  },
];

const STEPS = [
  { num: '01', title: 'Understand the Process', text: 'Map the process as it runs today, step by step.' },
  { num: '02', title: 'Identify Repetitive Tasks', text: 'Find the steps that repeat and the ones that need a person.' },
  { num: '03', title: 'Design the Workflow', text: 'Decide what software should own and where AI fits.' },
  { num: '04', title: 'Build the Automation', text: 'Develop it and connect the systems the workflow depends on.' },
  { num: '05', title: 'Test & Refine', text: 'Check the behaviour against the real process and adjust.' },
  { num: '06', title: 'Deploy & Improve', text: 'Put it into use, then keep refining it as the process changes.' },
];

const AREAS = [
  { num: '01', title: 'Business Operations', text: 'Support repetitive operational tasks and workflows.' },
  { num: '02', title: 'Information Processing', text: 'Assist with tasks involving business information and content.' },
  { num: '03', title: 'Software Development', text: 'Accelerate selected development and engineering activities with AI-assisted tools.' },
  { num: '04', title: 'Digital Products', text: 'Integrate automation capabilities into applications and software products.' },
];

export default function AiAssistedAutomation() {
  usePageMeta("AI-Assisted Automation | AnvasTech", "We combine AI capabilities with software engineering to automate repetitive tasks and support practical business and application workflows.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art" aria-hidden="true">
        <picture>
          <source srcSet="assets/genai-hero.webp?v=1" type="image/webp" />
          <img src="/assets/genai-hero.jpg?v=1" alt="" width="2000" height="695" fetchPriority="high" />
        </picture>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / AI-Assisted Automation</p>
        <h1>AI-Assisted Automation</h1>
        <p className="lede">Use AI to make software workflows more efficient. We combine AI capabilities with software engineering to automate repetitive tasks and support practical business and application workflows.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">AI &amp; Intelligent Systems</p>
            <h2 className="sp-h2">From Manual Work to Intelligent Automation</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>Automation can reduce repetitive work by connecting software, data, and AI capabilities around a defined workflow.</p>
            <p className="sp-p">At AnvasTech, we explore AI-assisted automation as part of building practical digital products and software solutions.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-plate is-flow">
            <figcaption className="sp-flow-cap">How we build it</figcaption>
            <ol className="sp-flow-list">
              {STEPS.map((st, i) => (
                <li className="sp-flow-row" key={st.num} data-last={i === STEPS.length - 1 || undefined}>
                  <span className="sp-flow-num">{st.num}</span>
                  <span className="sp-flow-label">{st.title}</span>
                </li>
              ))}
            </ol>
            <p className="sp-flow-foot">Refined as the process changes</p>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What we deliver</p>
            <h2 className="sp-h2">Practical AI-Assisted Automation</h2>
          </div>
          <p className="sp-lede">Six places software and AI take work off a process &mdash; and one that deliberately keeps a person in it.</p>
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

    <section className="sp-band is-neutral" id="approach">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">How we build</p>
            <h2 className="sp-h2">Our Automation Approach</h2>
          </div>
          <p className="sp-lede">We start by understanding the existing process and then determine where software automation and AI can provide practical value.</p>
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
      <img src="/assets/ai-slide-4.jpg?v=3" alt="" width="1024" height="521" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Where it applies</p>
        <h2 className="sp-h2">Where Automation Can Help</h2>
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
            <p className="sp-eyebrow">AI &amp; Intelligent Systems</p>
            <h2 className="sp-h2">Explore More</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/generative-ai">
            <h3>Generative AI</h3>
            <p>Practical applications of generative AI.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/intelligent-workflows">
            <h3>Business Automation</h3>
            <p>Simplify repetitive business processes with software.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/ai-agents">
            <h3>AI Agents</h3>
            <p>AI systems designed to assist with tasks and workflows.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Have a Process You Want to Automate?</h2>
          <p className="sp-lede">Tell us about the workflow and explore where software and AI can help simplify it.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
