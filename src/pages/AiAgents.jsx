import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

const CAPABILITIES = [
  {
    num: '01',
    title: 'Task Assistance',
    text: 'Assist users with defined tasks based on instructions and available information.',
  },
  {
    num: '02',
    title: 'Information Processing',
    text: 'Work with relevant information to help users understand and complete tasks.',
  },
  {
    num: '03',
    title: 'Workflow Assistance',
    text: 'Support workflows that involve multiple steps or actions.',
  },
  {
    num: '04',
    title: 'Tool Interaction',
    text: 'AI agents can be connected with software tools when the required integration is available.',
  },
  {
    num: '05',
    title: 'Human Involvement',
    text: 'People can remain involved in tasks where review or decision-making is required.',
  },
  {
    num: '06',
    title: 'Continuous Improvement',
    text: 'Agent workflows can be evaluated and refined based on their intended use.',
  },
];

const STEPS = [
  { num: '01', title: 'Understand the Task', text: 'Read the instruction and the context it arrives with.' },
  { num: '02', title: 'Process Information', text: 'Work through the information relevant to the task.' },
  { num: '03', title: 'Determine the Next Step', text: 'Decide what the task needs next, one step at a time.' },
  { num: '04', title: 'Use Available Tools', text: 'Call the software tools it has been given access to.' },
  { num: '05', title: 'Assist With the Workflow', text: 'Carry the task through the steps that follow.' },
  { num: '06', title: 'Human Review Where Required', text: 'Hand back to a person wherever a decision needs one.' },
];

const USES = [
  { num: '01', title: 'Business Workflows', text: 'Assist with defined operational tasks.' },
  { num: '02', title: 'Information & Knowledge', text: 'Help users work with relevant information.' },
  { num: '03', title: 'Software Development', text: 'Support selected software development activities.' },
  { num: '04', title: 'Digital Applications', text: 'AI-agent capabilities can be incorporated into applications where they provide a practical use.' },
];

export default function AiAgents() {
  usePageMeta("AI Agents | AnvasTech", "AI systems designed to assist with tasks and workflows, combining language models with software tools and defined workflows.");
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
        <p className="crumbs"><Link to="/">Home</Link> / <Link to="/what-we-do">Solutions</Link> / AI Agents</p>
        <h1>AI Agents</h1>
        <p className="lede">AI systems designed to assist with tasks and workflows. AI agents can combine language models with software tools and defined workflows to assist with tasks that involve multiple steps.</p>
      </div>
    </section>

    <section className="sp-band is-white" id="overview">
      <div className="sp-wrap">
        <div className="sp-intro">
          <div>
            <p className="sp-eyebrow">AI &amp; Intelligent Systems</p>
            <h2 className="sp-h2">Exploring AI Agents for Real-World Applications</h2>
            <p className="sp-p" style={{ marginTop: '24px' }}>AI agents can help move beyond simple question-and-answer interactions by working with information, following defined instructions, and assisting with tasks.</p>
            <p className="sp-p">The right approach depends on the problem, the workflow, the systems involved, and the level of human involvement required.</p>
            <div className="sp-actions"><Link className="sp-btn" to="/contact">Talk to Our Team</Link></div>
          </div>
          <figure className="sp-plate is-flow">
            <figcaption className="sp-flow-cap">The agent loop</figcaption>
            <ol className="sp-flow-list">
              {STEPS.map((st, i) => (
                <li className="sp-flow-row" key={st.num} data-last={i === STEPS.length - 1 || undefined}>
                  <span className="sp-flow-num">{st.num}</span>
                  <span className="sp-flow-label">{st.title}</span>
                </li>
              ))}
            </ol>
            <p className="sp-flow-foot">Repeats until the task is done</p>
          </figure>
        </div>
      </div>
    </section>

    <section className="sp-band" id="capabilities">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">What AI agents can do</p>
            <h2 className="sp-h2">AI Agent Capabilities</h2>
          </div>
          <p className="sp-lede">What an agent is useful for depends on the task it is given, the tools it can reach, and how much of the decision stays with a person.</p>
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

    <section className="sp-band is-neutral" id="how-they-work">
      <div className="sp-wrap">
        <div className="sp-head">
          <div>
            <p className="sp-eyebrow">How it works</p>
            <h2 className="sp-h2">How AI Agents Work</h2>
          </div>
          <p className="sp-lede">An agent loops through the same six moves, handing back to a person wherever the work needs a human decision.</p>
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

    <section className="sp-fits" id="where-used">
      <img src="/assets/ai-leadership.jpg" alt="" width="1024" height="529" decoding="async" fetchPriority="low" aria-hidden="true" />
      <div className="sp-wrap">
        <p className="sp-eyebrow">Where it applies</p>
        <h2 className="sp-h2">Where AI Agents Can Be Used</h2>
        <ol className="sp-areas is-4up">
          {USES.map((u) => (
            <li className="sp-area" key={u.num}>
              <span className="sp-area-num">{u.num}</span>
              <h3>{u.title}</h3>
              <p>{u.text}</p>
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
            <h2 className="sp-h2">Explore more</h2>
          </div>
        </div>
        <div className="sp-links">
          <Link to="/generative-ai">
            <h3>Generative AI</h3>
            <p>Build practical software with Generative AI.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/ai-assisted-automation">
            <h3>AI-Assisted Automation</h3>
            <p>Use AI to make software workflows more efficient.</p>
            <span className="sp-link">Read more</span>
          </Link>
          <Link to="/ai-assisted-engineering">
            <h3>AI-Assisted Development</h3>
            <p>Build faster with Claude, Cursor and intelligent coding assistants.</p>
            <span className="sp-link">Read more</span>
          </Link>
        </div>
      </div>
    </section>

    <section className="sp-band is-ink" id="contact-cta">
      <div className="sp-wrap">
        <div className="sp-close">
          <p className="sp-eyebrow">Start here</p>
          <h2>Explore What AI Agents Can Do</h2>
          <p className="sp-lede">Have a workflow or software idea involving AI agents? Talk to our team about the problem and the solution you have in mind.</p>
          <div className="sp-actions"><Link className="sp-btn" to="/contact">Start a Conversation</Link></div>
        </div>
      </div>
    </section>
    </main>
  );
}
