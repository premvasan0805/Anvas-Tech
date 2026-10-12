import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';

/* Featured projects on the Solutions page, as a pinned showcase. The band is
 * a few screens tall and its stage sticks to the viewport: the project list
 * sits on the left and a framed screenshot of the active project on the
 * right. Scrolling steps through the projects, each list row filling a bar
 * as its turn runs, and the screenshot swaps with a lift. Clicking a row
 * scrolls to that project's turn; clicking the active row opens its page.
 *
 * Products come from src/lib/products.js, so every title, category and
 * description is the product's own published wording. A product with no
 * published screenshot shows its name on ink, the same as everywhere else.
 *
 * On narrow screens there is no pinning: each row carries its own shot and
 * description and the list reads as a stack of cards. */
export default function ProjectShowcase({ products, anchors = {} }) {
  const bandRef = useRef(null);
  const [active, setActive] = useState(0);
  const [fill, setFill] = useState(0);
  const count = products.length;

  useEffect(() => {
    const band = bandRef.current;
    const { ScrollTrigger } = window;
    if (!band || !ScrollTrigger) return undefined;
    const st = ScrollTrigger.create({
      trigger: band,
      start: 'top top',
      end: 'bottom bottom',
      onUpdate: (self) => {
        const pos = Math.min(self.progress * count, count - 0.0001);
        setActive(Math.floor(pos));
        setFill(pos - Math.floor(pos));
      },
    });
    return () => st.kill();
  }, [count]);

  const jump = (i) => (e) => {
    const band = bandRef.current;
    // The active row is a plain link to its page; the others jump to their turn.
    if (!band || i === active || window.matchMedia('(max-width: 900px)').matches) return;
    e.preventDefault();
    const top = band.getBoundingClientRect().top + window.scrollY;
    const run = band.offsetHeight - window.innerHeight;
    window.scrollTo({ top: top + run * ((i + 0.35) / count), behavior: 'smooth' });
  };

  return (
    <section className="pshow" id="projects" ref={bandRef} style={{ '--pshow-n': count }}>
      <div className="pshow-stage">
        <div className="sp-wrap pshow-grid">
          <div className="pshow-side">
            <p className="sp-eyebrow">Featured projects</p>
            <h2 className="sp-h2">Built for real-world impact</h2>
            <p className="pshow-lede">Platforms AnvasTech has built, each with its own page.</p>
            <ol className="pshow-list">
              {products.map((p, i) => {
                const state = i === active ? 'is-active' : i < active ? 'is-past' : '';
                return (
                  <li className={`pshow-item ${state}`} key={p.id} id={anchors[p.id] || p.id}>
                    <Link to={p.to} className="pshow-row" onClick={jump(i)} aria-current={i === active ? 'true' : undefined}>
                      <span className="pshow-num">{String(i + 1).padStart(2, '0')}</span>
                      <span className="pshow-name">
                        <span className="pshow-title">{p.title}</span>
                        <span className="pshow-kicker">{p.kicker}</span>
                      </span>
                      <span className="pshow-bar" aria-hidden="true">
                        <span style={{ transform: `scaleX(${i < active ? 1 : i === active ? fill : 0})` }} />
                      </span>
                    </Link>
                    <div className="pshow-card">
                      <Shot product={p} />
                      <p>{p.desc}</p>
                      <Link className="sp-link" to={p.to}>View project</Link>
                    </div>
                  </li>
                );
              })}
            </ol>
          </div>

          <div className="pshow-view">
            <div className="pshow-glow" aria-hidden="true" />
            <div className="pshow-frame" aria-hidden="true">
              <div className="pshow-chrome">
                <span /><span /><span />
                <em>{products[active].title}</em>
              </div>
              <div className="pshow-screens">
                {products.map((p, i) => (
                  <div
                    className={`pshow-screen ${i === active ? 'is-active' : i < active ? 'is-past' : 'is-next'}`}
                    key={p.id}
                  >
                    <Shot product={p} />
                  </div>
                ))}
              </div>
            </div>
            <div className="pshow-caption">
              <span className="pshow-count">
                <b>{String(active + 1).padStart(2, '0')}</b> / {String(count).padStart(2, '0')}
              </span>
              <div className="pshow-descs">
                {products.map((p, i) => (
                  <p className={i === active ? 'is-active' : ''} key={p.id}>{p.desc}</p>
                ))}
              </div>
              <Link className="sp-btn pshow-cta" to={products[active].to}>View {products[active].title}</Link>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}

function Shot({ product }) {
  const { shot, title } = product;
  if (!shot) return <span className="pshow-mark">{title}</span>;
  return <img src={shot.src} alt="" width={shot.w} height={shot.h} loading="lazy" decoding="async" />;
}
