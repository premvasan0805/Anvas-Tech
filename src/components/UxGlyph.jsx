/* Small looping drawings for the UI/UX capability cells, one per capability.
   Each acts out its own title in a few strokes: a dot walking a user flow, a
   wireframe drawing itself, a toggle switching, a cursor tapping between two
   screens, components snapping into a set, a curve being adjusted. Decoration
   only, so hidden from assistive tech. Motion lives in css/uiux.css. */

const GLYPHS = {
  flow: (
    <>
      <path className="ux-g-track" d="M8 30 C 18 30, 20 12, 32 12 S 46 32, 56 32" />
      <path className="ux-g-comet" d="M8 30 C 18 30, 20 12, 32 12 S 46 32, 56 32" pathLength="100" />
      <circle className="ux-g-node" cx="8" cy="30" r="4" />
      <circle className="ux-g-node" cx="32" cy="12" r="4" />
      <circle className="ux-g-node" cx="56" cy="32" r="4" />
    </>
  ),
  wire: (
    <>
      <rect className="ux-g-draw" x="6" y="6" width="52" height="32" rx="4" pathLength="100" />
      <path className="ux-g-draw is-late" d="M14 16 H 40" pathLength="100" />
      <path className="ux-g-draw is-later" d="M14 24 H 32" pathLength="100" />
      <rect className="ux-g-pop" x="42" y="22" width="10" height="8" rx="2" />
    </>
  ),
  ui: (
    <>
      <rect className="ux-g-switch" x="8" y="12" width="36" height="20" rx="10" />
      <circle className="ux-g-knob" cx="18" cy="22" r="7" />
      <path className="ux-g-tick" d="M50 22 l 3 3 l 6 -7" pathLength="100" />
    </>
  ),
  proto: (
    <>
      <rect className="ux-g-screen" x="4" y="8" width="20" height="28" rx="3" />
      <rect className="ux-g-screen is-b" x="40" y="8" width="20" height="28" rx="3" />
      <path className="ux-g-link" d="M24 18 C 30 18, 34 26, 40 26" pathLength="100" />
      <path className="ux-g-cursor" d="M10 16 v 12 l 3 -3 l 2 4 l 2 -1 l -2 -4 h 4 z" />
    </>
  ),
  system: (
    <>
      <rect className="ux-g-tile" x="10" y="4" width="16" height="16" rx="3" />
      <circle className="ux-g-tile" cx="46" cy="12" r="8" />
      <rect className="ux-g-tile" x="10" y="24" width="16" height="16" rx="8" />
      <path className="ux-g-tile" d="M38 40 L 46 24 L 54 40 Z" />
    </>
  ),
  refine: (
    <>
      <g className="ux-g-bend">
        <path className="ux-g-curve" d="M6 34 C 20 34, 22 10, 32 10 S 44 34, 58 34" />
      </g>
      <g className="ux-g-handle">
        <path className="ux-g-arm" d="M22 10 H 42" />
        <circle className="ux-g-pt" cx="22" cy="10" r="2.5" />
        <circle className="ux-g-pt" cx="42" cy="10" r="2.5" />
        <rect className="ux-g-anchor" x="29" y="7" width="6" height="6" />
      </g>
    </>
  ),
};

export default function UxGlyph({ type }) {
  return (
    <svg className={`ux-glyph is-${type}`} viewBox="0 0 64 44" aria-hidden="true" focusable="false">
      {GLYPHS[type]}
    </svg>
  );
}
