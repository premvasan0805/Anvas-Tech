import { useEffect, useRef, useState } from 'react';

/* Careers "Stay connected" resume form. The fields, names and submit
 * behaviour are the same as before; what changed is the presentation:
 *
 * - A résumé card on the left fills in live from what the visitor types, so
 *   they can see what they are sending. Empty fields show as shimmering
 *   placeholders.
 * - The form sits on dark glass inside a border light that runs round it,
 *   with a bar that fills as the required fields are completed.
 * - The file input is a drop zone that names the chosen file.
 */
const AREAS = ['Software Engineering', 'AI & Engineering', 'Product & Design', 'Business & Operations'];

export default function ResumeSection() {
  const root = useRef(null);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [area, setArea] = useState(AREAS[0]);
  const [file, setFile] = useState('');
  const [over, setOver] = useState(false);

  const done = [name.trim(), /\S+@\S+\.\S+/.test(email), file].filter(Boolean).length;

  useEffect(() => {
    const el = root.current;
    const { gsap } = window;
    if (!el || !gsap) return undefined;
    const ctx = gsap.context(() => {
      const tl = gsap.timeline({ scrollTrigger: { trigger: el, start: 'top 75%', once: true } });
      tl.from('.rs-card', { autoAlpha: 0, y: 60, rotate: -6, duration: 1.1, ease: 'power3.out' })
        .from('.rs-step', { autoAlpha: 0, x: -24, duration: 0.6, ease: 'power3.out', stagger: 0.12 }, 0.4)
        .from('.rs-form', { autoAlpha: 0, y: 50, scale: 0.97, duration: 1, ease: 'power3.out' }, 0.15)
        .from('.rs-field', { autoAlpha: 0, y: 18, duration: 0.55, ease: 'power3.out', stagger: 0.07 }, 0.5);
    }, el);
    return () => ctx.revert();
  }, []);

  return (
    <section className="sp-band is-ink rs" id="resume" ref={root}>
      <div className="rs-aura" aria-hidden="true" />
      <div className="sp-wrap rs-grid">
        <div className="rs-side">
          <p className="sp-eyebrow">Stay connected</p>
          <h2 className="sp-h2">Don&rsquo;t See the Right Opening? Stay Connected.</h2>
          <p className="sp-lede">If there isn&rsquo;t a current position that matches your skills and interests, you can still share your resume with AnvasTech.</p>

          {/* Live preview of what the form will send. */}
          <div className="rs-card" aria-hidden="true">
            <span className="rs-plane" />
            <div className="rs-card-top">
              <span className="rs-avatar">{name.trim() ? name.trim()[0].toUpperCase() : ''}</span>
              <div className="rs-who">
                <span className={`rs-line is-name${name.trim() ? ' is-set' : ''}`}>{name.trim() || 'Your name'}</span>
                <span className={`rs-line is-mail${email ? ' is-set' : ''}`}>{email || 'you@email.com'}</span>
              </div>
            </div>
            <span className="rs-tag" key={area}>{area}</span>
            <div className="rs-skel"><i /><i /><i /><i /></div>
            <div className={`rs-file${file ? ' is-set' : ''}`}>
              <span className="rs-file-ico" />
              <span>{file || 'resume.pdf'}</span>
            </div>
          </div>

          <ol className="rs-steps">
            <li className={`rs-step${name.trim() && email ? ' is-done' : ''}`}><b>1</b>Your details</li>
            <li className={`rs-step${file ? ' is-done' : ''}`}><b>2</b>Your resume</li>
            <li className={`rs-step${done === 3 ? ' is-done' : ''}`}><b>3</b>Submit</li>
          </ol>
        </div>

        <form className="sp-form rs-form" id="resume-form">
          <div className="rs-progress full" aria-hidden="true">
            <span className="rs-progress-label">Required fields</span>
            <span className="rs-progress-count">{done} / 3</span>
            <span className="rs-progress-bar"><span style={{ transform: `scaleX(${done / 3})` }} /></span>
          </div>
          <div className="rs-field">
            <label htmlFor="resume-name">Full name</label>
            <input id="resume-name" name="name" placeholder="Enter your name" required value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="rs-field">
            <label htmlFor="resume-email">Email address</label>
            <input id="resume-email" name="email" type="email" placeholder="Enter your email" required value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="rs-field">
            <label htmlFor="resume-phone">Phone number</label>
            <input id="resume-phone" name="phone" type="tel" placeholder="Enter your phone number" />
          </div>
          <div className="rs-field">
            <label htmlFor="resume-interest">Area of interest</label>
            <select id="resume-interest" name="interest" value={area} onChange={(e) => setArea(e.target.value)}>
              {AREAS.map((a) => <option key={a}>{a}</option>)}
            </select>
          </div>
          <div className="rs-field full">
            <label htmlFor="resume-file">Resume</label>
            <label
              className={`rs-drop${over ? ' is-over' : ''}${file ? ' is-set' : ''}`}
              onDragEnter={() => setOver(true)}
              onDragLeave={() => setOver(false)}
              onDrop={() => setOver(false)}
            >
              <input
                id="resume-file"
                name="resume"
                type="file"
                accept=".pdf,.doc,.docx"
                required
                onChange={(e) => setFile(e.target.files?.[0]?.name || '')}
              />
              <span className="rs-drop-ico" aria-hidden="true" />
              <span className="rs-drop-text">
                {file ? <><b>{file}</b> — click to change</> : <><b>Drop your resume here</b> or click to browse</>}
              </span>
              <span className="rs-drop-hint">PDF, DOC or DOCX</span>
            </label>
          </div>
          <div className="rs-field full">
            <label htmlFor="resume-msg">Message</label>
            <textarea id="resume-msg" name="message" placeholder="Tell us briefly about yourself"></textarea>
          </div>
          <div className="rs-field full rs-submit">
            <button className="sp-btn rs-send" type="submit"><span>Submit Resume</span></button>
            <p className="sp-form-note">Please submit accurate and up-to-date information.</p>
          </div>
        </form>
      </div>
    </section>
  );
}
