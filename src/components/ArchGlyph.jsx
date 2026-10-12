/* Small looping diagrams for the "Designed for the load you will have" cards
 * on Technology Excellence. Each one draws the idea its card names — nothing
 * here stands for a real system or real numbers. Motion is CSS
 * (css/styles.css, .tx-glyph).
 */
const BARS = [30, 22, 34, 26, 32, 24];

const GLYPHS = {
  // Bars rise and settle just under a dashed line: capacity matched to need.
  fit: (
    <>
      <line className="g-target" x1="4" x2="236" y1="14" y2="14" />
      {BARS.map((h, i) => (
        <rect key={i} className="g-bar" x={14 + i * 38} y={52 - h} width="22" height={h} rx="3" style={{ '--i': i }} />
      ))}
    </>
  ),
  // Three services; a change lights one at a time and leaves the others still.
  bounds: (
    <>
      <path className="g-wire" d="M72 30H90M150 30H168" />
      {[0, 1, 2].map((i) => (
        <g key={i} className="g-svc" style={{ '--i': i }}>
          <rect x={8 + i * 80} y="8" width="64" height="44" rx="8" />
          <circle cx={26 + i * 80} cy="30" r="4" />
          <circle cx={40 + i * 80} cy="30" r="4" />
          <circle cx={54 + i * 80} cy="30" r="4" />
        </g>
      ))}
    </>
  ),
  // Queries flow in; most are answered at the cache, a few go on to the store.
  data: (
    <>
      <path className="g-wire" d="M8 30H214" />
      <rect className="g-cache" x="104" y="12" width="40" height="36" rx="8" />
      <ellipse className="g-store" cx="214" cy="18" rx="16" ry="5" />
      <path className="g-store" d="M198 18V42C198 45 205 47 214 47S230 45 230 42V18" />
      {[0, 1, 2, 3].map((i) => <circle key={i} className="g-query" cx="8" cy="30" r="4" style={{ '--i': i }} />)}
      <circle className="g-query is-miss" cx="8" cy="30" r="4" />
    </>
  ),
  // Capacity added node by node, not rebuilt.
  scale: (
    <>
      <path className="g-wire" d="M8 30H232" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} className={`g-node${i < 2 ? ' is-base' : ''}`} x={10 + i * 38} y="12" width="30" height="36" rx="6" style={{ '--i': i }} />
      ))}
    </>
  ),
  // Under stress the optional work dims; the core keeps running.
  degrade: (
    <>
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <rect key={i} className={`g-lane${i > 3 ? ' is-shed' : ''}`} x={6 + i * 33} y="10" width="27" height="40" rx="5" style={{ '--i': i }} />
      ))}
      <path className="g-pulse" d="M6 30H40L48 18L58 42L66 30H132" />
    </>
  ),
  // New versions slide in beside the old; the consumer's line never breaks.
  versions: (
    <>
      <circle className="g-consumer" cx="18" cy="30" r="9" />
      <path className="g-flow" d="M27 30H70" />
      {['v1', 'v2', 'v3'].map((v, i) => (
        <g key={v} className="g-ver" style={{ '--i': i }}>
          <rect x={74 + i * 56} y="17" width="48" height="26" rx="13" />
          <text x={98 + i * 56} y="34.5">{v}</text>
        </g>
      ))}
    </>
  ),

  /* Security by design ----------------------------------------------------
     Built from the shared primitives in css/styles.css: .g-mover travels by
     --dx/--dy, .g-seq lights in turn, .g-pop pops in, .g-draw draws a line. */

  // A credential reaches the one door it is scoped to; the others stay shut.
  privilege: (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <g key={i}>
          <rect className={i === 2 ? 'g-box g-seq' : 'g-box'} x={8 + i * 46} y="18" width="38" height="32" rx="6" style={{ '--dur': '3s', animationDelay: '1.95s' }} />
          <circle className="g-soft" cx={27 + i * 46} cy="34" r="3.5" />
        </g>
      ))}
      <circle className="g-ink g-mover" cx="12" cy="8" r="4.5" style={{ '--dx': '107px', '--dy': '26px', '--dur': '3s' }} />
    </>
  ),
  // Readable on one side of the lock, unreadable on the other.
  encrypt: (
    <>
      <path className="g-line" d="M8 34H232" />
      <text className="g-txt" x="26" y="38">ab12</text>
      <g className="g-beat">
        <path className="g-line is-ink" d="M112 26v-5a8 8 0 0 1 16 0v5" />
        <rect className="g-ink" x="106" y="25" width="28" height="20" rx="4" />
      </g>
      <text className="g-txt" x="212" y="40">••••</text>
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className="g-ink g-mover" x="48" y="31" width="6" height="6" rx="1.5" style={{ '--i': i, '--dx': '140px', '--dur': '3s', '--gap': '0.75s' }} />
      ))}
    </>
  ),
  // One identity through the check; only the records it may see light up.
  authz: (
    <>
      <circle className="g-ink" cx="16" cy="22" r="6" />
      <path className="g-ink" d="M6 46a10 10 0 0 1 20 0z" />
      <path className="g-wire" d="M30 30H62M92 30H112" />
      <path className="g-box g-beat" d="M77 12l12 5v10c0 9-6 15-12 18-6-3-12-9-12-18V17z" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className={i % 2 ? 'g-soft' : 'g-soft g-seq-ink'} x="116" y={9 + i * 11} width="116" height="7" rx="3.5" style={{ '--i': i / 2, '--gap': '0.6s' }} />
      ))}
    </>
  ),
  // Every build passes through every check.
  scan: (
    <>
      <path className="g-wire" d="M8 30H232" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className="g-box g-seq" x={14 + i * 58} y="14" width="42" height="32" rx="6" style={{ '--i': i, '--gap': '0.85s', '--dur': '4s' }} />
      ))}
      <rect className="g-ink g-mover is-scan" x="12" y="8" width="3" height="44" rx="1.5" style={{ '--dx': '214px', '--dur': '4s', '--ease-m': 'linear' }} />
    </>
  ),
  // Entries append, one after another, without being asked for.
  audit: (
    <>
      <path className="g-line" d="M14 6V52" />
      {[46, 70, 58, 84].map((w, i) => (
        <g key={i} className="g-pop" style={{ '--i': i, '--gap': '0.45s', '--dur': '5s', '--o': '0% 50%' }}>
          <circle className="g-ink" cx="14" cy={11 + i * 12} r="3.5" />
          <rect className="g-soft" x="26" y={8.5 + i * 12} width={w * 2.4} height="5" rx="2.5" />
        </g>
      ))}
    </>
  ),
  // The maker's change waits at the gate for the checker.
  makerChecker: (
    <>
      <path className="g-wire" d="M27 30H213" />
      <circle className="g-ink" cx="18" cy="30" r="9" />
      <circle className="g-box" cx="222" cy="30" r="9" />
      <rect className="g-box g-seq" x="106" y="14" width="28" height="32" rx="6" style={{ '--dur': '4s', animationDelay: '2.4s' }} />
      <path className="g-draw is-thin" pathLength="100" d="M113 30l5 5 9-10" style={{ '--dur': '4s', animationDelay: '2.6s' }} />
      <rect className="g-ink g-mover" x="30" y="24" width="10" height="12" rx="2" style={{ '--dx': '64px', '--dur': '4s' }} />
      <rect className="g-ink g-mover" x="140" y="24" width="10" height="12" rx="2" style={{ '--dx': '62px', '--dur': '4s', animationDelay: '2.8s' }} />
    </>
  ),

  /* Performance & reliability --------------------------------------------- */

  // Latency drawn against its budget, and it stays under.
  budget: (
    <>
      <line className="g-target" x1="4" x2="236" y1="14" y2="14" />
      <path className="g-draw" pathLength="100" d="M6 44L40 36L70 40L100 26L130 32L160 22L190 28L234 20" />
    </>
  ),
  // A trace as a waterfall: each span opens where its caller began.
  observe: (
    <>
      {[[6, 228], [30, 120], [60, 80], [60, 40], [156, 72]].map(([x, w], i) => (
        <rect key={i} className={`g-grow-x ${i % 2 ? 'g-alt' : 'g-ink'}`} x={x} y={6 + i * 9.5} width={w} height="6" rx="3" style={{ '--i': i, '--gap': '0.3s', '--dur': '4.5s' }} />
      ))}
    </>
  ),
  // Only the reading that crosses the line rings the bell.
  alert: (
    <>
      <line className="g-target" x1="4" x2="200" y1="16" y2="16" />
      {[22, 18, 26, 20, 40, 24, 19, 23].map((h, i) => (
        <rect key={i} className={i === 4 ? 'g-alt g-spike' : 'g-soft g-bob'} x={6 + i * 24} y={50 - h} width="16" height={h} rx="3" style={{ '--i': i }} />
      ))}
      <circle className="g-ring" cx="222" cy="30" r="8" />
      <circle className="g-alt g-beat is-alert" cx="222" cy="30" r="8" />
    </>
  ),
  // Primary fails; traffic moves to the standby, then back.
  recovery: (
    <>
      <circle className="g-ink" cx="40" cy="29" r="8" />
      <path className="g-wire is-primary" d="M50 27L98 17" />
      <path className="g-wire is-standby" d="M50 31L98 41" />
      <rect className="g-box is-primary" x="100" y="6" width="100" height="20" rx="6" />
      <rect className="g-box is-standby" x="100" y="32" width="100" height="20" rx="6" />
      <text className="g-txt" x="150" y="20">primary</text>
      <text className="g-txt" x="150" y="46">standby</text>
    </>
  ),
  // The spike is planned for: the line sits above it.
  capacity: (
    <>
      <line className="g-target" x1="4" x2="236" y1="8" y2="8" />
      <path className="g-draw" pathLength="100" d="M6 46L40 42L70 44L100 38L118 12L132 36L170 40L234 42" />
    </>
  ),
  // Work queues on the device in the dead zone, then syncs when it returns.
  offline: (
    <>
      <rect className="g-box" x="10" y="7" width="26" height="42" rx="5" />
      <path className="g-wire" d="M40 30H190" />
      <rect className="g-dead" x="84" y="20" width="64" height="20" rx="4" />
      <path className="g-box" d="M196 40h30a9 9 0 0 0-2-18a12 12 0 0 0-23 3a8 8 0 0 0-5 15z" />
      {[0, 1, 2].map((i) => (
        <circle key={i} className="g-ink g-queue" cx="48" cy={18 + i * 12} r="3.5" style={{ '--i': i }} />
      ))}
    </>
  ),

  /* Engineering approach -------------------------------------------------- */

  // Looking along today's process, step by step.
  discovery: (
    <>
      <path className="g-line" d="M20 34H218" />
      {[0, 1, 2, 3, 4, 5, 6].map((i) => (
        <circle key={i} className="g-soft g-seq-ink" cx={20 + i * 33} cy="34" r="5" style={{ '--i': i, '--gap': '0.6s', '--dur': '4.5s' }} />
      ))}
      <g className="g-mover is-lens" style={{ '--dx': '198px', '--dur': '4.5s', '--ease-m': 'linear' }}>
        <circle className="g-lens" cx="20" cy="22" r="9" />
        <path className="g-line is-ink" d="M27 29l6 6" />
      </g>
    </>
  ),
  // The shape of the system, drawn before it is built.
  architecture: (
    <>
      {['M140 22L40 38', 'M140 22V38', 'M140 22L220 38'].map((d, i) => (
        <path key={d} className="g-draw is-thin" pathLength="100" d={d} style={{ '--dur': '4.5s', animationDelay: `${0.4 + i * 0.2}s` }} />
      ))}
      <rect className="g-ink g-pop" x="114" y="6" width="52" height="16" rx="5" style={{ '--dur': '4.5s' }} />
      {[14, 114, 194].map((x, i) => (
        <rect key={x} className="g-box g-pop" x={x} y="38" width="52" height="14" rx="5" style={{ '--i': i + 2, '--gap': '0.35s', '--dur': '4.5s' }} />
      ))}
    </>
  ),
  // Shipped a slice at a time, each one whole.
  slices: (
    <>
      <rect className="g-box" x="6" y="16" width="228" height="26" rx="6" />
      {[0, 1, 2, 3, 4, 5].map((i) => (
        <rect key={i} className="g-ink g-pop" x={9 + i * 37.5} y="19" width="34" height="20" rx="4" style={{ '--i': i, '--gap': '0.45s', '--dur': '5s', '--o': '0% 50%' }} />
      ))}
    </>
  ),
  // Load, attacks and failures thrown at it before real traffic is.
  hardening: (
    <>
      <path className="g-box g-beat" d="M120 6l18 7v14c0 12-8 20-18 24-10-4-18-12-18-24V13z" />
      <path className="g-draw is-thin" pathLength="100" d="M112 29l6 6 11-12" style={{ '--dur': '3s' }} />
      {[0, 1, 2].map((i) => (
        <circle key={`l${i}`} className="g-alt g-mover is-hit" cx="10" cy={16 + i * 13} r="3.5" style={{ '--i': i, '--dx': '80px', '--dy': `${(1 - i) * 6}px`, '--dur': '2.4s', '--gap': '0.8s' }} />
      ))}
      {[0, 1, 2].map((i) => (
        <circle key={`r${i}`} className="g-alt g-mover is-hit" cx="230" cy={16 + i * 13} r="3.5" style={{ '--i': i + 0.4, '--dx': '-80px', '--dy': `${(1 - i) * 6}px`, '--dur': '2.4s', '--gap': '0.8s' }} />
      ))}
    </>
  ),
  // Staged rollout: a few users, then more, then everyone.
  launch: (
    <>
      {[['1%', 0.06], ['10%', 0.25], ['50%', 0.6], ['100%', 1]].map(([label, share], i) => (
        <g key={label}>
          <text className="g-txt is-start is-small" x="6" y={13.5 + i * 13}>{label}</text>
          <rect className="g-soft" x="44" y={7 + i * 13} width="190" height="7" rx="3.5" />
          <rect className="g-ink g-grow-x" x="44" y={7 + i * 13} width={190 * share} height="7" rx="3.5" style={{ '--i': i, '--gap': '0.7s', '--dur': '5s' }} />
        </g>
      ))}
    </>
  ),
  /* Engineering Insights (Resources) -------------------------------------- */

  // Requirement lines carried across into a working screen.
  product: (
    <>
      <rect className="g-box" x="6" y="6" width="56" height="44" rx="5" />
      {[0, 1, 2, 3].map((i) => (
        <rect key={i} className="g-soft" x="13" y={13 + i * 9} width={i % 2 ? 30 : 42} height="4" rx="2" />
      ))}
      <path className="g-wire" d="M68 28H150" />
      {[0, 1, 2].map((i) => (
        <rect key={i} className="g-ink g-mover" x="70" y="25" width="7" height="6" rx="1.5" style={{ '--i': i, '--dx': '72px', '--dur': '3.6s', '--gap': '0.6s' }} />
      ))}
      <rect className="g-box" x="154" y="4" width="80" height="48" rx="6" />
      <path className="g-line" d="M154 14H234" />
      <rect className="g-ink g-pop" x="160" y="19" width="22" height="27" rx="3" style={{ '--i': 0, '--gap': '0.4s', '--dur': '3.6s' }} />
      <rect className="g-soft g-pop" x="187" y="19" width="41" height="11" rx="3" style={{ '--i': 1, '--gap': '0.4s', '--dur': '3.6s' }} />
      <rect className="g-soft g-pop" x="187" y="35" width="41" height="11" rx="3" style={{ '--i': 2, '--gap': '0.4s', '--dur': '3.6s' }} />
    </>
  ),
  // An assistant suggests lines into the editor; the cursor keeps pace.
  aiCode: (
    <>
      <rect className="g-box" x="6" y="4" width="172" height="48" rx="6" />
      {[[16, 70, 0], [26, 110, 1], [26, 84, 2], [16, 54, 3]].map(([x, w, i]) => (
        <rect key={i} className={`g-grow-x ${i === 1 || i === 2 ? 'g-alt' : 'g-ink'}`} x={x} y={11 + i * 10} width={w} height="5" rx="2.5" style={{ '--i': i, '--gap': '0.5s', '--dur': '5s' }} />
      ))}
      <rect className="g-ink g-blink" x="150" y="40" width="2" height="8" />
      <g className="g-beat">
        <path className="g-alt" d="M210 12l4 10 10 4-10 4-4 10-4-10-10-4 10-4z" />
      </g>
      <path className="g-wire" d="M196 26H180" />
    </>
  ),
  /* What This Enables (AI-Assisted Engineering) --------------------------- */

  // A gauge whose needle swings up into the fast arc.
  speed: (
    <>
      <path className="g-line is-gauge" d="M78 50a42 42 0 0 1 84 0" />
      <path className="g-draw is-gauge" pathLength="100" d="M78 50a42 42 0 0 1 84 0" style={{ '--dur': '3.2s' }} />
      {[0, 1, 2, 3, 4].map((i) => {
        const a = Math.PI - (i * Math.PI) / 4;
        return <line key={i} className="g-line" x1={120 + Math.cos(a) * 34} y1={50 - Math.sin(a) * 34} x2={120 + Math.cos(a) * 28} y2={50 - Math.sin(a) * 28} />;
      })}
      <g className="g-needle"><path className="g-ink" d="M118 50L120 16L122 50z" /></g>
      <circle className="g-ink" cx="120" cy="50" r="5" />
      {[0, 1, 2].map((i) => (
        <path key={i} className="g-line is-ink g-streak" d={`M${20 + i * 6} ${22 + i * 10}H${54 + i * 4}`} style={{ '--i': i }} />
      ))}
      {[0, 1, 2].map((i) => (
        <path key={`r${i}`} className="g-line is-ink g-streak" d={`M${186 - i * 4} ${22 + i * 10}H${220 - i * 6}`} style={{ '--i': i + 0.5 }} />
      ))}
    </>
  ),
  // Steps up a staircase; a dot climbs and each step lights as it lands.
  learn: (
    <>
      {[0, 1, 2, 3, 4].map((i) => (
        <rect key={i} className="g-soft g-seq-ink" x={24 + i * 40} y={42 - i * 8} width="36" height={10 + i * 8} rx="3" style={{ '--i': i, '--gap': '0.55s', '--dur': '4s' }} />
      ))}
      <circle className="g-alt g-climb" cx="42" cy="36" r="5" />
    </>
  ),
  // A small network: signals pass between nodes, one layer to the next.
  emerging: (
    <>
      {[[30, 14], [30, 42]].flatMap(([x1, y1]) => [[120, 10], [120, 28], [120, 46]].map(([x2, y2]) => (
        <path key={`a${y1}${y2}`} className="g-line" d={`M${x1} ${y1}L${x2} ${y2}`} />
      )))}
      {[[120, 10], [120, 28], [120, 46]].map(([x1, y1]) => (
        <path key={`b${y1}`} className="g-line" d={`M${x1} ${y1}L210 28`} />
      ))}
      {[[30, 14], [30, 42], [120, 10], [120, 28], [120, 46], [210, 28]].map(([cx, cy], i) => (
        <circle key={i} className="g-box g-seq" cx={cx} cy={cy} r={i === 5 ? 9 : 6} style={{ '--i': i < 2 ? 0 : i < 5 ? 1 : 2, '--gap': '0.6s', '--dur': '3.6s' }} />
      ))}
      <circle className="g-alt g-mover" cx="30" cy="14" r="3" style={{ '--dx': '90px', '--dy': '14px', '--dur': '1.8s' }} />
      <circle className="g-alt g-mover" cx="120" cy="28" r="3" style={{ '--dx': '90px', '--dy': '0px', '--dur': '1.8s', animationDelay: '0.9s' }} />
    </>
  ),
  // Code, debug, test, improve — and round again.
  practice: (
    <>
      <path className="g-draw is-thin is-loop" pathLength="100" d="M207 30C207 54 30 54 30 30" style={{ '--dur': '5s', animationDelay: '3s' }} />
      {['code', 'debug', 'test', 'improve'].map((label, i) => (
        <g key={label}>
          <rect className="g-box g-seq" x={4 + i * 59} y="6" width="52" height="22" rx="11" style={{ '--i': i, '--gap': '0.75s', '--dur': '5s' }} />
          <text className="g-txt is-small" x={30 + i * 59} y="20.5">{label}</text>
        </g>
      ))}
    </>
  ),
  // A steady pulse after go-live, with upgrades on a cadence.
  sustain: (
    <>
      <path className="g-line" d="M6 30H60L68 18L78 42L86 30H150L158 18L168 42L176 30H234" />
      <path className="g-pulse is-ink" d="M6 30H60L68 18L78 42L86 30H150L158 18L168 42L176 30H234" />
      {[60, 150].map((x, i) => (
        <circle key={x} className="g-ink g-beat" cx={x + 8} cy="52" r="3" style={{ animationDelay: `${i * 0.8}s` }} />
      ))}
    </>
  ),
};

export default function ArchGlyph({ kind }) {
  return (
    <svg className={`tx-glyph is-${kind}`} viewBox="0 0 240 56" aria-hidden="true" focusable="false">
      {GLYPHS[kind]}
    </svg>
  );
}
