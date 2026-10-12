import { useState } from 'react';
import { Link } from 'react-router-dom';
import { usePageMeta } from '../lib/usePageMeta.js';

/* The three things the page already offered in prose — "a briefing, a
   proposal, or a conversation with our specialists" — made selectable, so the
   enquiry arrives saying which one it is. Nothing here is a new claim: these
   are the page's own words, promoted from a sentence to a control. */
const ASKS = ['A briefing', 'A proposal', 'A conversation'];

/* "Careers" used to sit in this list. Applications belong on the careers page,
   which has the resume upload; routing them through the enquiry form loses the
   attachment and the applicant's time. */
const TOPICS = [
  'AI and Generative AI',
  'Cloud',
  'Engineering',
  'Something else',
];

/* Feeds the pointer position to the form as --mx/--my so the glow on the
   glass follows it. Written straight to the style, no re-render. */
function trackGlow(e) {
  const r = e.currentTarget.getBoundingClientRect();
  e.currentTarget.style.setProperty('--mx', `${e.clientX - r.left}px`);
  e.currentTarget.style.setProperty('--my', `${e.clientY - r.top}px`);
}

export default function Contact() {
  const [ask, setAsk] = useState(ASKS[0]);
  usePageMeta("Contact Us | AnvasTech", "Tell us what you need — a briefing, a proposal, or a conversation with our specialists.");

  return (
    <main id="main" className="contact-page">

    <section className="ct-band">
      <div className="wrap ct-grid">

        <div className="ct-ask">
          <p className="crumbs"><Link to="/">Home</Link> / Contact Us</p>
          <h1>Start a conversation</h1>
          <p className="ct-lede">Tell us what you need &mdash; a briefing, a proposal, or a conversation with our specialists.</p>

          <p className="ct-ask-label" id="ask-label">What are you asking for?</p>
          <div className="ct-asks" role="radiogroup" aria-labelledby="ask-label">
            {ASKS.map((a) => (
              <button
                type="button"
                key={a}
                role="radio"
                aria-checked={ask === a}
                className={`ct-ask-option${ask === a ? ' is-on' : ''}`}
                onClick={() => setAsk(a)}
              >
                {a}
              </button>
            ))}
          </div>
        </div>

        <form className="ct-form" id="contact-form" onPointerMove={trackGlow}>
          {/* Carries the choice made on the left, so the enquiry says what
              kind of request it is without the sender retyping it. */}
          <input type="hidden" name="ask" value={ask} />

          <div className="ct-form-head" style={{ '--i': 0 }}>
            <h2>Your enquiry</h2>
            <span className="ct-form-ask" aria-live="polite">{ask}</span>
          </div>

          <div className="ct-field" style={{ '--i': 1 }}>
            <label htmlFor="first">First name</label>
            <input id="first" name="first" required />
          </div>
          <div className="ct-field" style={{ '--i': 2 }}>
            <label htmlFor="last">Last name</label>
            <input id="last" name="last" required />
          </div>
          <div className="ct-field" style={{ '--i': 3 }}>
            <label htmlFor="email">Work email</label>
            <input id="email" name="email" type="email" required />
          </div>
          <div className="ct-field" style={{ '--i': 4 }}>
            <label htmlFor="company">Company</label>
            <input id="company" name="company" required />
          </div>
          <div className="ct-field is-full" style={{ '--i': 5 }}>
            <label htmlFor="interest">What is it about?</label>
            <select id="interest" name="interest">
              {TOPICS.map((t) => <option key={t}>{t}</option>)}
            </select>
          </div>
          <div className="ct-field is-full" style={{ '--i': 6 }}>
            <label htmlFor="msg">How can we help?</label>
            <textarea id="msg" name="msg" required></textarea>
          </div>
          <div className="ct-field is-full" style={{ '--i': 7 }}>
            <button className="btn-blue" type="submit">Send enquiry</button>
            <p className="ct-note" id="contact-note">
              Applying for a role? The <Link to="/careers#resume">careers page</Link> takes your resume.
            </p>
          </div>
        </form>

      </div>
    </section>
    </main>
  );
}
