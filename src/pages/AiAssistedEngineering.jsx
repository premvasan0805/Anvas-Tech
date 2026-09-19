import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const USES = [
  {
    num: '01',
    title: 'Explore & Plan',
    text: 'Use AI to explore ideas, understand requirements, evaluate approaches, and break complex problems into practical engineering tasks.',
  },
  {
    num: '02',
    title: 'Build & Develop',
    text: 'Use AI-assisted coding to generate, refactor, explain, and improve application code.',
  },
  {
    num: '03',
    title: 'Debug & Solve',
    text: 'Use AI to investigate errors, understand unfamiliar code, identify potential issues, and explore solutions.',
  },
  {
    num: '04',
    title: 'Test & Improve',
    text: 'Use AI to support testing, documentation, code review, optimization, and continuous improvement.',
  },
];

/* The stage AI actually sits in is marked, so the diagram says where it
   belongs rather than implying it runs the whole pipeline. */
const PIPELINE = ['Idea', 'Understand', 'Design', 'AI-Assisted Build', 'Test', 'Refine', 'Deploy'];

/* The overview plate draws the division the heading claims, taken from the two
   paragraphs beside it: what AI is used for, and what stays with engineers. */
const AI_ASSISTS = ['Exploring ideas', 'Understanding requirements', 'Working with code', 'Investigating problems', 'Supporting development tasks'];
const ENGINEERS_OWN = ['Technical decisions', 'Implementation', 'Testing', 'Software quality'];

const TOOLS = [
  {
    num: '01',
    title: 'Claude',
    text: 'AI assistance for reasoning, planning, coding, debugging, and problem solving.',
  },
  {
    num: '02',
    title: 'Cursor',
    text: 'AI-assisted development environment used to work with and understand codebases.',
  },
  {
    num: '03',
    title: 'AI Coding Assistants',
    text: 'AI tools used within development workflows to support coding and repetitive engineering tasks.',
  },
];

const ENABLES = [
  { num: '01', title: 'Faster Development', text: 'AI can help accelerate selected development tasks and reduce repetitive work.' },
  { num: '02', title: 'Rapid Prototyping', text: 'Explore ideas and turn concepts into working software more quickly.' },
  { num: '03', title: 'Better Problem Solving', text: 'Use AI to investigate technical problems and explore possible solutions.' },
  { num: '04', title: 'Improved Development Workflow', text: 'Reduce repetitive engineering tasks and give developers more time for implementation and technical decisions.' },
  { num: '05', title: 'Continuous Learning', text: 'Use AI as an additional tool for understanding technologies, code, and development challenges.' },
  { num: '06', title: 'Engineering-Led Delivery', text: 'AI supports the development process; engineers remain responsible for the software that is built.' },
];

export default function AiAssistedEngineering() {
  usePageMeta("AI-Assisted Engineering | AnvasTech", "We use AI-assisted development tools such as Claude, Cursor, and intelligent coding assistants to support software development while keeping engineering, architecture, testing, and quality at the center.");
  return (
    <main id="main" className="solution-page">

    <section className="page-hero is-dark">
      <figure className="hero-art is-video art-company" aria-hidden="true">
        <video src="/assets/company-hero.mp4?v=1" poster="/assets/company-hero-poster.jpg?v=1" autoPlay muted loop playsInline preload="metadata" disablePictureInPicture></video>
      </figure>
      <div className="wrap">
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / AI-Assisted Engineering</p>
        <h1>AI-Assisted Engineering</h1>
        <p className="lede">Build faster. Think deeper. Engineer better. At AnvasTech, we use AI-assisted development tools such as Claude, Cursor, and intelligent coding assistants to support software development while keeping engineering, architecture, testing, and quality at the center.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">How we build</p>
            <h2 className="sp-h2">AI Accelerates Our Engineers. Engineering Builds the Product.</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>AI is part of our development workflow. We use it to explore ideas, understand requirements, work with code, investigate problems, and support development tasks.</p>
            <p className="sp-p">Our engineers remain responsible for technical decisions, implementation, testing, and the quality of the software we build.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-plate is-split">
            <div className="sp-split-half">
              <p className="sp-split-cap">AI assists with</p>
              <ul className="sp-split-set">
                {AI_ASSISTS.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
            <div className="sp-split-half is-owned">
              <p className="sp-split-cap">Engineers stay responsible for</p>
              <ul className="sp-split-set">
                {ENGINEERS_OWN.map((item) => <li key={item}>{item}</li>)}
              </ul>
            </div>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="how-we-use-ai">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">In practice</p>
            <h2 className="sp-h2">How We Use AI</h2>
          </div>
          <p className="sp-lede">Four points in the development workflow where AI does real work. Technical decisions, implementation and quality stay with our engineers.</p>
        </div>
        <ol className="sp-steps">
          {USES.map((u) => (
            <li className="sp-step" key={u.num}>
              <span className="sp-step-num">{u.num}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-fits" id="workflow">
      <img src="/assets/ai-easy.jpg?v=1" alt="" width="1024" height="416" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Our development workflow</p>
        <h2 className="sp-h2">Where AI Sits in the Process</h2>
        <ol className="sp-pipeline">
          {PIPELINE.map((stage) => (
            <li className={stage.startsWith('AI-') ? 'is-accent' : undefined} key={stage}>
              <span>{stage}</span>
            </li>
          ))}
        </ol>
        <p className="sp-lede" style={{ marginTop: '32px', maxWidth: '56ch' }}>AI helps our engineers move faster, while engineering decisions remain at the center of the development process.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="tools">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Tools we work with</p>
            <h2 className="sp-h2">Our AI Development Tools</h2>
          </div>
          <p className="sp-lede">The tools our engineers actually work in day to day.</p>
        </div>
        <div className="sp-grid is-3up">
          {TOOLS.map((t) => (
            <article className="sp-cell" key={t.num}>
              <span className="sp-num">{t.num}</span>
              <h3>{t.title}</h3>
              <p>{t.text}</p>
            </article>
          ))}
        </div>
      </div>
    </section>

    <section className="sp-band is-neutral" id="enables">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What this enables</p>
            <h2 className="sp-h2">What This Enables</h2>
          </div>
          <p className="sp-lede">What changes when AI is part of the toolchain &mdash; and what deliberately does not.</p>
        </div>
        <ol className="sp-rows">
          {ENABLES.map((e) => (
            <li className="sp-row" key={e.num}>
              <span className="sp-row-num">{e.num}</span>
              <div>
                <h3>{e.title}</h3>
                <p>{e.text}</p>
              </div>
            </li>
          ))}
        </ol>
      </div>
    </section>

    <section className="sp-band is-white" id="related">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">Explore more</p>
            <h2 className="sp-h2">Related Work</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/product-engineering">
            <h3>Product Development</h3>
            <p>Turn ideas into working digital products.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/generative-ai">
            <h3>Generative AI</h3>
            <p>Exploring practical applications of Generative AI.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/ai-agents">
            <h3>AI Agents</h3>
            <p>Exploring AI agents for tasks and workflows.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Build What&rsquo;s Next With AI</h2>
          <p className="sp-lede">Have a software idea or engineering challenge? Let&rsquo;s explore how AI-assisted development and software engineering can help turn it into a working product.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
