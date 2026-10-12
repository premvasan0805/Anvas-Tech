import * as THREE from 'three';

// The home hero's one scene, filling the whole frame: a single swarm of points
// and one bright AI spark, whose story runs on through all three slides, a
// chapter per slide, without ever restarting. Story position u runs 0..3 and
// wraps; chapter n is u in [n, n + 1).
//
//  0  "AI Is Our Accelerator. Engineering Is Our Foundation."
//     The currents streaming across the frame speed up and draw together into
//     one fast beam, and the spark races along it from left to right. Then it
//     runs back along the ground, laying the ground slabs of a wide city of
//     blocks as it goes.
//  1  "Think. Design. Build. Improve."
//     The spark climbs the city level by level, back and forth, drawing the
//     blueprint, and ends over its top right; the points drop into it behind,
//     and the finished city brightens while light pulses run along its edges.
//  2  "Explore. Build. Improve."
//     The spark drops to become the head of a scan that sweeps right to left,
//     and every stack of blocks it passes turns into a sleeker round
//     glass tower, spires on the tallest: the city improved. The spark
//     leaves to the left, where chapter 0 brings it back, and the skyline
//     scatters back into the currents chapter 0 starts from.
//
// While the spark builds and scans, electric arcs crackle from it into the
// structure and a shower of welding sparks falls from it and bounces on the
// floor. The city and the skyline are reflected in a glossy floor below them.
// Points near the pointer light up and part around it.
//
// The camera moves with the story: low along the currents, craning up over
// the city, then tracking the scan. Each chapter lands its form by about 0.8
// of its length, so the payoff shows inside the slide's seven seconds. The
// points step back behind the copy so it stays readable, light up around the
// spark, blur away from the focal plane, and part around the pointer.

const COUNT = 24000;
const BLOCK = 1.0; // block edge
const PITCH = 1.18; // block edge plus gap
const NX = 13; // city blocks across
const NZ = 4; // and deep
const LEVELS = 4;
const GROUND = -1.7;
export const CITY_WIDTH = NX * PITCH;
const HALF = CITY_WIDTH / 2;
const SCAN_FROM = -HALF - 1;
const SCAN_TO = HALF + 1;
const TOWER_R = 0.5; // improved tower radius at its base
const FLOOR_GAP = 0.3; // between its floor rings
const FOUNDATION = 0.24; // build front once the ground slabs are laid
const MAX_SPEED = 3.4; // current speed at the height of the acceleration
// The spark is switched off: its head, trail, arcs, embers and the light it
// throws on the city are not drawn. Its path still places the shockwaves.
export const SHOW_SPARK = false;
const OFF = 13; // spark x when it is off the side of the frame
const TRAIL = 56; // spark trail length, in frames
const ARCS = 4; // electric arcs from the spark
const ARC_SEG = 14; // segments per arc
const EMBERS = 480; // welding sparks
const EMBER_RATE = 140; // sparks a second while welding
const GRAVITY = 6;

const ease = (x) => {
  const c = Math.min(Math.max(x, 0), 1);
  return c * c * (3 - 2 * c);
};
const mix = (a, b, t) => a + (b - a) * t;

// Everything the story drives, at story position u.
export function storyState(u) {
  const w = ((u % 3) + 3) % 3;
  const chapter = Math.floor(w);
  const c = w - chapter;
  const s = {
    chapter,
    c,
    speed: 1, // current speed
    build: 0, // build front: blocks with a lower order are filled
    draw: 0, // blueprint front, a beat ahead of the points
    shine: 0, // the finished city brightening
    scan: 0, // 0..1 scan sweep, left to right
    scatter: 0, // back to currents
    windows: 0, // 0..1 windows lit
    ground: 0, // glow under the city
    word: 0, // headline word lit, counted from 1 (0: none)
    beat: '', // phrase lit in the first slide's paragraph
  };
  if (chapter === 0) {
    s.speed = 1 + (MAX_SPEED - 1) * ease(c / 0.28) - (MAX_SPEED - 1.3) * ease((c - 0.4) / 0.3);
    s.draw = (FOUNDATION + 0.02) * ease((c - 0.32) / 0.42);
    s.build = FOUNDATION * ease((c - 0.4) / 0.4);
    s.ground = ease((c - 0.35) / 0.45) * 0.7;
    s.word = c < 0.4 ? 4 : 8; // Accelerator. / Foundation.
    s.beat = ['explore', 'refine', 'solve', 'build'][Math.min(3, Math.floor(c / 0.21))];
  } else if (chapter === 1) {
    s.speed = 1 + 0.3 * (1 - ease(c / 0.3));
    s.draw = FOUNDATION + 0.02 + (1.1 - FOUNDATION - 0.02) * ease((c - 0.06) / 0.5);
    s.build = FOUNDATION + (1.1 - FOUNDATION) * ease((c - 0.3) / 0.48);
    s.shine = ease((c - 0.76) / 0.14);
    s.windows = ease((c - 0.4) / 0.5);
    s.ground = 0.7 + 0.3 * ease(c / 0.8);
    s.word = c < 0.1 ? 1 : c < 0.3 ? 2 : c < 0.76 ? 3 : 4; // Think. Design. Build. Improve.
  } else {
    s.draw = 1.1;
    s.build = 1.1;
    s.shine = 1 - ease((c - 0.06) / 0.3);
    s.windows = 1;
    s.scan = Math.min(1, Math.max(0, (c - 0.1) / 0.4));
    s.scatter = ease((c - 0.84) / 0.16);
    s.ground = 1 - ease((c - 0.8) / 0.2);
    s.word = c < 0.1 ? 2 : c < 0.84 ? 3 : 1; // Explore. Build. Improve.
  }
  return s;
}

// Height of the top of a level of blocks, where the spark runs.
const levelTop = (level) => GROUND + level * PITCH + BLOCK + 0.18;

// Where the blueprint front is: along each level in turn, right to left on
// even levels and back on odd ones, then up to the next.
function frontAt(f) {
  const F = Math.max(0, f) * LEVELS;
  const level = Math.min(LEVELS - 1, Math.floor(F));
  const g = F - level;
  const across = ease((g - 0.075) / 0.45);
  const along = level % 2 ? across : 1 - across;
  const climb = level < LEVELS - 1 ? ease((g - 0.6) / 0.4) : 0;
  return [-HALF + along * CITY_WIDTH, levelTop(level) + climb * PITCH, 0];
}

// The polished surface: one gentle swell over the whole city.
const surface = (x, z) => GROUND + 1.9 + 0.6 * Math.sin(x * 0.42 + z * 0.3) + 0.35 * Math.cos(z * 0.9 - x * 0.2);

// Where the spark is, in the city's own space, and how bright.
function sparkAt(s) {
  const { chapter, c } = s;
  if (chapter === 0) {
    if (c < 0.32) {
      // In from the left and along the beam, as fast as the currents.
      return [mix(-OFF, HALF, ease(c / 0.32)), levelTop(0), 0, 1];
    }
    return [...frontAt(s.draw), 1];
  }
  if (chapter === 1) {
    const [x, y, z] = frontAt(s.draw);
    // Done drawing, it hovers over the city.
    return [x, y + 0.25 * Math.sin(c * 9) * ease((c - 0.56) / 0.1), z, 1];
  }
  const top = frontAt(1.1);
  const scanX = SCAN_TO + (SCAN_FROM - SCAN_TO) * s.scan;
  const head = [scanX, surface(scanX, 0) + 0.75];
  if (c < 0.1) {
    const t = ease(c / 0.1);
    return [mix(top[0], SCAN_TO, t), mix(top[1], surface(SCAN_TO, 0) + 0.75, t), 0, 1];
  }
  if (c < 0.5) return [head[0], head[1], 0, 1];
  // Away to the left, past the copy, once the scan is done.
  const t = ease((c - 0.5) / 0.14);
  return [mix(SCAN_FROM, -OFF, t), head[1] + t * 1.2, 0, 1 - 0.5 * t];
}

// The camera's path, as a turn of the city: low along the currents, craning
// up over the city, then tracking the scan, and back.
const SHOT_KEYS = [0, 0.5, 1, 1.5, 2, 2.5, 3];
// Dolly is toward the camera: in close on the racing currents, back out as
// the foundation goes down, in again over the city mid-build, right out to
// reveal it finished, then tracking in with the scan. Yaw swings the city
// round between shots so the depth shows.
const SHOTS = {
  tilt: [0.08, 0.26, 0.56, 0.1, 0.44, 0.22, 0.08],
  yaw: [-0.05, -0.36, 0.26, -0.46, 0.14, 0.4, -0.05],
  dolly: [4.0, 0.0, -3.0, 8.0, -5.5, 3.5, 4.0],
  lift: [0.0, 0.3, 0.4, -0.6, 0.3, -0.1, 0.0],
};
function shotAt(u) {
  const w = ((u % 3) + 3) % 3;
  const k = Math.min(SHOT_KEYS.length - 2, Math.floor(w / 0.5));
  const t = (1 - Math.cos(Math.PI * ((w - SHOT_KEYS[k]) / 0.5))) / 2;
  const out = {};
  for (const [name, keys] of Object.entries(SHOTS)) out[name] = mix(keys[k], keys[k + 1], t);
  return out;
}

const shared = /* glsl */ `
uniform float uTime;
uniform float uFlow; // current clock: speeds up while the story accelerates
uniform float uHeat; // 0..1 how hard it is accelerating
uniform float uBuild; // build front: blocks with a lower order are filled
uniform float uDraw; // blueprint front
uniform float uShine; // 0..1 the finished city brightening
uniform float uScanX; // scan front; everything right of it is improved
uniform float uScatter; // 0..1 back to currents
uniform float uAmount;
uniform vec2 uCopyDir; // screen direction away from the copy
uniform float uCopyFade; // how far the points step back behind the copy
uniform vec4 uSpark; // spark position in the city's space, and brightness
uniform float uMirror; // 1 when drawing the reflection in the floor

const float GROUND = ${GROUND.toFixed(2)};

const float PI = 3.14159265;
// The logo's colours, left to right across the frame.
const vec3 BLUE = vec3(0.18, 0.5, 1.0);
const vec3 VIOLET = vec3(0.54, 0.12, 1.0);
const vec3 MAGENTA = vec3(0.82, 0.22, 1.0);

vec3 brand(float x) {
  float g = clamp((x + ${HALF.toFixed(2)}) / ${CITY_WIDTH.toFixed(2)}, 0.0, 1.0);
  return g < 0.6 ? mix(BLUE, VIOLET, g / 0.6) : mix(VIOLET, MAGENTA, (g - 0.6) / 0.4);
}

// How far this point has been carried into the city, given its order.
float built(float order) {
  return smoothstep(0.0, 1.0, clamp((uBuild - order) / 0.08, 0.0, 1.0));
}

float improved(float x) {
  return smoothstep(uScanX - 0.6, uScanX + 0.6, x);
}

// Dimmer over the copy, full strength away from it.
float clearOfCopy(vec2 ndc) {
  return mix(1.0 - uCopyFade, 1.0, smoothstep(-0.45, 0.35, dot(ndc, uCopyDir)));
}

// Light thrown by the spark on what is near it.
float sparkLight(vec3 p) {
  vec3 d = p - uSpark.xyz;
  return exp(-dot(d, d) / 1.6) * uSpark.w;
}
`;

const pointsVertex = /* glsl */ `
${shared}
uniform float uPixelRatio;
uniform float uFocus;
uniform vec2 uPointer;
uniform float uAspect;

attribute vec3 aFlow;
attribute vec3 aPolish;
attribute float aSeed;
attribute float aOrder;

varying vec3 vColor;
varying float vAlpha;
varying float vBlur;

vec3 currents(vec3 b) {
  float t = uFlow;
  // Streams running left to right across the frame, wrapping off-screen.
  float x = mod(b.x + 12.0 + t * (0.55 + 0.35 * aSeed), 24.0) - 12.0;
  vec3 p = vec3(x, b.y, b.z);
  p.y += 0.55 * sin(x * 0.55 + t * 0.6 + b.y * 1.7) + 0.25 * sin(x * 1.3 - t * 0.9);
  p.z += 0.5 * sin(x * 0.35 - t * 0.45 + b.y * 0.9);
  // Accelerating, the streams draw together into one fast beam on the
  // spark's line.
  float beam = ${levelTop(0).toFixed(2)};
  p.y = mix(p.y, beam + (p.y - beam) * 0.07, uHeat);
  p.z *= 1.0 - 0.8 * uHeat;
  return p;
}

void main() {
  vec3 flow = currents(aFlow);
  vec3 stack = position;
  vec3 polish = aPolish;

  float b = built(aOrder);
  float i = improved(position.x);
  float r = smoothstep(0.0, 1.0, clamp(uScatter * 1.5 - aSeed * 0.5, 0.0, 1.0));

  vec3 p = mix(flow, stack, b);
  // Points drop into the city from above.
  p.y += sin(PI * b) * 1.2 * (0.5 + aSeed);
  p = mix(p, polish, i);
  p.y += sin(PI * i) * 0.6;
  p = mix(p, flow, r);
  p.y += sin(PI * r) * (0.8 + aSeed);

  // The reflection: the same point, upside down below the floor.
  float below = 0.0;
  if (uMirror > 0.5) {
    p.y = 2.0 * GROUND - p.y;
    below = GROUND - p.y;
  }

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;

  // Light up near the pointer, in screen space.
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 d = (ndc - uPointer) * vec2(uAspect, 1.0);
  float near = exp(-dot(d, d) / 0.03);

  // Depth of field round the city's centre.
  vBlur = clamp(abs(-mv.z - uFocus) / 5.0, 0.0, 1.0);

  float flash = exp(-pow((position.x - uScanX) / 0.3, 2.0));
  float lit = sparkLight(p);
  vec3 tint = brand(p.x);
  vec3 steel = mix(vec3(0.55, 0.72, 1.0), tint, 0.35);
  vec3 polished = mix(vec3(0.3, 0.88, 1.0), tint, 0.45 + 0.25 * sin(p.x * 0.8 + uTime));
  vec3 col = mix(tint, steel, b);
  col = mix(col, vec3(0.75, 0.9, 1.0), uHeat * 0.5 * (1.0 - b));
  col = mix(col, polished, i);
  col = mix(col, tint, r);
  float shine = uShine * b * (1.0 - r);
  vColor = col * (1.0 + 0.35 * shine) + vec3(0.1, 0.16, 0.28) * flash * (1.0 - r) + vec3(0.7, 0.85, 1.0) * lit * 1.6
    + vec3(0.55, 0.75, 1.0) * near * 1.1;

  // Built and polished forms are drawn in larger, brighter points; scattered
  // back into the currents they are the currents' points again.
  float formed = max(b, i) * (1.0 - r);
  float size = mix(26.0, 32.0, b * (1.0 - r)) * (0.7 + 0.6 * aSeed) * (1.0 + 1.4 * vBlur) * (1.0 + 0.5 * flash + 0.8 * lit + 0.9 * near);
  gl_PointSize = size * uPixelRatio / -mv.z;
  float base = mix(0.5, 0.58, formed) * (1.0 - 0.12 * i * (1.0 - r)) * (1.0 + 0.25 * shine) * (1.0 - 0.4 * uHeat * (1.0 - b));
  vAlpha = base * (0.6 + 0.4 * aSeed) * (1.0 - 0.65 * vBlur) * clearOfCopy(ndc) * uAmount
    * mix(1.0, 0.22 * formed * exp(-below * 0.9), uMirror);
}
`;

const pointsFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
varying float vBlur;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = 1.0 - smoothstep(mix(0.12, 0.0, vBlur), 0.5, d);
  gl_FragColor = vec4(vColor * a * vAlpha, 1.0);
  #include <colorspace_fragment>
}
`;

const linesVertex = /* glsl */ `
${shared}
attribute vec3 aEnd;
attribute float aTip;
attribute float aOrder;
attribute float aRand;

varying float vAlpha;
varying float vT;
varying float vRand;
varying vec3 vTint;

void main() {
  // Each edge draws itself from one corner, a beat ahead of its points.
  float draw = smoothstep(0.0, 1.0, clamp((uDraw - aOrder) / 0.08, 0.0, 1.0));
  vec3 p = mix(position, mix(position, aEnd, draw), aTip);
  float i = improved(min(position.x, aEnd.x));
  float below = 0.0;
  if (uMirror > 0.5) {
    p.y = 2.0 * GROUND - p.y;
    below = GROUND - p.y;
  }
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  vec2 ndc = gl_Position.xy / gl_Position.w;
  float clear = clearOfCopy(ndc);
  vT = aTip;
  vRand = aRand;
  vTint = mix(vec3(0.35, 0.65, 1.0), brand(p.x), 0.5) * (1.0 + 2.5 * sparkLight(p));
  vAlpha = (draw > 0.001 ? 1.0 : 0.0) * (1.0 - i) * (1.0 - 0.45 * uShine) * (1.0 - uScatter)
    * clear * clear * uAmount * mix(1.0, 0.16 * exp(-below * 0.9), uMirror);
}
`;

const linesFragment = /* glsl */ `
uniform float uTime;
uniform float uShine;

varying float vAlpha;
varying float vT;
varying float vRand;
varying vec3 vTint;

void main() {
  // Light pulses running along the finished edges, like data through them.
  float head = fract(uTime * 0.35 + vRand);
  float pulse = exp(-pow((vT - head) * 9.0, 2.0)) * step(0.5, fract(vRand * 7.31));
  float glow = 0.42 + pulse * (1.2 + 1.6 * uShine);
  gl_FragColor = vec4(vTint * glow * vAlpha, 1.0);
  #include <colorspace_fragment>
}
`;

// City life, once it stands: windows lighting up floor by floor, light
// streaks of traffic running along the streets, and beacons blinking on the
// tallest towers. All of it goes as the scan smooths the city away.
const lifeVertex = /* glsl */ `
${shared}
uniform float uPixelRatio;
uniform float uWindows; // 0..1 how many windows are lit
attribute float aKind; // 0 window, 1 traffic, 2 beacon
attribute float aOrder;
attribute float aRand;
attribute float aDir; // traffic: which way along the street
attribute float aTail; // traffic: 0 at the head, back along the streak

varying vec3 vColor;
varying float vAlpha;

void main() {
  vec3 p = position;
  float on = 0.0;
  vec3 col = vec3(0.0);
  float size = 0.0;
  if (aKind < 0.5) {
    // Lit in a random order once their block is built; a few flicker.
    on = built(aOrder) * smoothstep(aRand, aRand + 0.08, uWindows * 1.08);
    float flick = aRand > 0.9 ? step(0.25, fract(uTime * 0.3 + aRand * 7.0)) : 1.0;
    on *= flick * (0.8 + 0.2 * sin(uTime * (1.0 + aRand * 3.0) + aRand * 40.0));
    col = mix(vec3(0.55, 0.78, 1.0), vec3(0.75, 0.5, 1.0), fract(aRand * 13.7)) * 0.7;
    size = 110.0;
  } else if (aKind < 1.5) {
    float left = ${(-HALF - 1).toFixed(2)};
    float span = ${(CITY_WIDTH + 2).toFixed(2)};
    float speed = 1.1 + 1.3 * fract(aRand * 7.3);
    float x = mod(position.x - left + aDir * uTime * speed, span) + left;
    p.x = x - aDir * aTail * 0.12;
    float edge = smoothstep(left, left + 0.8, p.x) * smoothstep(left + span, left + span - 0.8, p.x);
    on = built(${(FOUNDATION * 0.6).toFixed(2)}) * edge * (1.0 - aTail / 7.0);
    col = mix(vec3(0.85, 0.93, 1.0), vec3(0.8, 0.25, 1.0), aTail / 6.0) * 1.2;
    size = mix(62.0, 30.0, aTail / 6.0);
  } else {
    float blink = pow(max(0.0, sin(uTime * 2.1 + aRand * 6.28)), 10.0);
    on = built(aOrder) * (0.15 + 0.85 * blink);
    col = vec3(0.85, 0.3, 1.0);
    size = 120.0 * (0.7 + 0.5 * blink);
  }
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vec2 ndc = gl_Position.xy / gl_Position.w;
  float gone = improved(p.x);
  vAlpha = on * (1.0 - gone) * (1.0 - uScatter) * clearOfCopy(ndc) * uAmount;
  vColor = col;
  gl_PointSize = vAlpha > 0.001 ? size * uPixelRatio / -mv.z : 0.0;
}
`;

const lifeFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;
void main() {
  vec2 q = abs(gl_PointCoord - 0.5) * 2.0;
  // Windows and streaks are soft squares; a round glow would read as stars.
  float a = (1.0 - smoothstep(0.35, 1.0, max(q.x, q.y))) * 0.8 + exp(-dot(q, q) * 3.0) * 0.3;
  gl_FragColor = vec4(vColor * a * vAlpha, 1.0);
  #include <colorspace_fragment>
}
`;

// Foreground depth: soft, out-of-focus motes hanging between the camera and
// the city. They turn and travel with it, so every camera move shows its
// depth as they slide past at a different rate.
const dustVertex = /* glsl */ `
uniform float uTime;
uniform float uPixelRatio;
uniform float uAmount;
attribute float aSeed;
varying float vAlpha;
varying vec3 vColor;
void main() {
  vec3 p = position;
  p.x += 0.35 * sin(uTime * 0.13 + aSeed * 40.0);
  p.y += 0.25 * sin(uTime * 0.17 + aSeed * 23.0);
  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  float dist = -mv.z;
  // Large and faint up close, small and sharper far off; gone behind the eye.
  gl_PointSize = clamp(150.0 * uPixelRatio / max(dist, 0.5), 2.0, 140.0 * uPixelRatio);
  vAlpha = smoothstep(0.6, 3.0, dist) * mix(0.1, 0.35, smoothstep(14.0, 4.0, dist)) * uAmount * (0.4 + 0.6 * aSeed);
  vColor = mix(vec3(0.25, 0.55, 1.0), vec3(0.7, 0.25, 1.0), fract(aSeed * 7.3));
}
`;
const dustFragment = /* glsl */ `
varying float vAlpha;
varying vec3 vColor;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  // A bokeh disc: flat with a slightly brighter rim.
  float disc = smoothstep(1.0, 0.85, d) * (0.75 + 0.25 * smoothstep(0.5, 0.9, d));
  gl_FragColor = vec4(vColor * disc * vAlpha, 1.0);
  #include <colorspace_fragment>
}
`;

// The spark: a bright head and a fading trail of where it has been.
const sparkVertex = /* glsl */ `
uniform float uPixelRatio;
uniform float uBright;
attribute float aAge;
varying float vAge;
varying float vFade;

void main() {
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  vAge = aAge;
  vFade = uBright * (1.0 - aAge) * (1.0 - aAge);
  gl_PointSize = mix(105.0, 14.0, sqrt(aAge)) * uPixelRatio / -mv.z * 6.0;
}
`;

const sparkFragment = /* glsl */ `
varying float vAge;
varying float vFade;

void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float core = exp(-d * d * 28.0);
  float halo = exp(-d * d * 5.0) * 0.35;
  vec3 hot = vec3(0.9, 0.97, 1.0);
  vec3 cool = mix(vec3(0.35, 0.7, 1.0), vec3(0.62, 0.3, 1.0), vAge);
  vec3 col = hot * core * (1.0 - vAge) + cool * (halo + core * vAge);
  gl_FragColor = vec4(col * vFade, 1.0);
  #include <colorspace_fragment>
}
`;

// Electric arcs: jagged lines from the spark, hot at the spark end.
const arcVertex = /* glsl */ `
attribute float aFade;
varying float vFade;
void main() {
  vFade = aFade;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const arcFragment = /* glsl */ `
uniform float uArc;
varying float vFade;
void main() {
  vec3 col = mix(vec3(0.9, 0.97, 1.0), vec3(0.5, 0.45, 1.0), vFade);
  gl_FragColor = vec4(col * uArc * (1.6 - vFade), 1.0);
  #include <colorspace_fragment>
}
`;

// Welding sparks: white hot, cooling to violet as they fall.
const emberVertex = /* glsl */ `
uniform float uPixelRatio;
attribute float aLife;
varying float vLife;
void main() {
  vLife = aLife;
  vec4 mv = modelViewMatrix * vec4(position, 1.0);
  gl_Position = projectionMatrix * mv;
  gl_PointSize = aLife > 0.0 ? mix(26.0, 75.0, aLife) * uPixelRatio / -mv.z : 0.0;
}
`;
const emberFragment = /* glsl */ `
varying float vLife;
void main() {
  float d = length(gl_PointCoord - 0.5) * 2.0;
  float a = exp(-d * d * 6.0);
  vec3 col = mix(vec3(0.55, 0.3, 1.0), vec3(1.0, 0.95, 0.9), vLife * vLife);
  gl_FragColor = vec4(col * a * vLife * 1.4, 1.0);
  #include <colorspace_fragment>
}
`;

function rand(n) {
  const x = Math.sin(n * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
}

// The city: NX by NZ plots, each a tower of one to four blocks, taller
// toward the right and the back, clear of the copy.
function blocks() {
  const out = [];
  for (let ix = 0; ix < NX; ix += 1) {
    for (let iz = 0; iz < NZ; iz += 1) {
      const across = ix / (NX - 1);
      const back = 1 - iz / (NZ - 1);
      const h = Math.max(1, Math.min(LEVELS, Math.round(0.6 + rand(ix * 7.1 + iz * 3.3) * (1.2 + 2.2 * across) + back * 0.8)));
      for (let level = 0; level < h; level += 1) {
        // Each level is drawn the way the spark runs along it.
        const along = level % 2 ? across : 1 - across;
        out.push({
          x: (ix - (NX - 1) / 2) * PITCH,
          y: GROUND + BLOCK / 2 + level * PITCH,
          z: (iz - (NZ - 1) / 2) * PITCH,
          h,
          order: (level + 0.45 * along + 0.15 * rand(out.length * 3.7)) / LEVELS,
        });
      }
    }
  }
  return out;
}

// The 12 edges of a unit cube centred on the origin, as corner pairs.
const EDGES = [];
for (let a = 0; a < 3; a += 1) {
  const b = (a + 1) % 3;
  const c = (a + 2) % 3;
  for (const sb of [-0.5, 0.5]) {
    for (const sc of [-0.5, 0.5]) {
      const p = [0, 0, 0];
      const q = [0, 0, 0];
      p[a] = -0.5;
      q[a] = 0.5;
      p[b] = q[b] = sb;
      p[c] = q[c] = sc;
      EDGES.push([p, q]);
    }
  }
}

export function createMorph() {
  const list = blocks();

  // Points.
  const stack = new Float32Array(COUNT * 3);
  const flow = new Float32Array(COUNT * 3);
  const polish = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT);
  const order = new Float32Array(COUNT);
  for (let n = 0; n < COUNT; n += 1) {
    const r1 = rand(n + 1.3);
    const r2 = rand(n + 7.7);
    const r3 = rand(n + 13.1);
    const r4 = rand(n + 19.9);
    seed[n] = rand(n + 23.3);
    const blk = list[n % list.length];
    order[n] = blk.order;

    // Mostly along the block edges, the rest scattered over the faces.
    let local;
    if (r1 < 0.72) {
      const [p, q] = EDGES[Math.floor(r2 * 12)];
      local = p.map((v, j) => v + (q[j] - v) * r3);
    } else {
      const axis = Math.floor(r2 * 3);
      local = [r3 - 0.5, r4 - 0.5, rand(n + 31.7) - 0.5];
      local[axis] = rand(n + 37.1) < 0.5 ? -0.5 : 0.5;
    }
    const sx = blk.x + local[0] * BLOCK;
    const sy = blk.y + local[1] * BLOCK;
    const sz = blk.z + local[2] * BLOCK;
    stack.set([sx, sy, sz], n * 3);

    // Improved: the plot's stack of blocks becomes one round glass tower, a
    // little taller and tapering as it rises, drawn by its floor rings and
    // mullions; the tallest towers carry a spire.
    const stackH = blk.h * PITCH;
    const towerH = stackH * 1.12 + 0.25;
    const rise = Math.min(1, Math.max(0, (sy - GROUND) / stackH));
    const rp = rand(n + 41.3);
    const ang = rand(n + 43.9) * Math.PI * 2;
    let ty = GROUND + rise * towerH;
    let rad = TOWER_R * (1 - 0.22 * rise);
    let a = ang;
    if (blk.h === LEVELS && rp < 0.08) {
      // Spire.
      ty = GROUND + towerH + rand(n + 47.1) * 0.7;
      rad = 0.035;
    } else if (rp < 0.5) {
      // Floor rings.
      ty = GROUND + Math.round((rise * towerH) / FLOOR_GAP) * FLOOR_GAP;
      rad = TOWER_R * (1 - 0.22 * ((ty - GROUND) / towerH));
    } else if (rp < 0.82) {
      // Mullions: eight vertical lines round the tower.
      a = (Math.floor(ang / (Math.PI / 4)) + 0.5) * (Math.PI / 4);
    }
    polish.set([blk.x + Math.cos(a) * rad, ty, blk.z + Math.sin(a) * rad], n * 3);

    // Currents: seven streams laid across the whole frame, each a loose
    // ribbon of points.
    const band = Math.floor(rand(n + 53.1) * 7);
    const fx = (r1 - 0.5) * 24;
    const fy = -2.6 + band * 0.95 + (r2 - 0.5) * 0.35 + (r3 - 0.5) * 0.2;
    const fz = -2.5 + rand(band + 61.7) * 5 + (r4 - 0.5) * 0.6;
    flow.set([fx, fy, fz], n * 3);
  }
  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute('position', new THREE.BufferAttribute(stack, 3));
  pointsGeometry.setAttribute('aFlow', new THREE.BufferAttribute(flow, 3));
  pointsGeometry.setAttribute('aPolish', new THREE.BufferAttribute(polish, 3));
  pointsGeometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  pointsGeometry.setAttribute('aOrder', new THREE.BufferAttribute(order, 1));

  // Blueprint lines: every block edge, drawn from its first corner.
  const edgeCount = list.length * EDGES.length;
  const start = new Float32Array(edgeCount * 2 * 3);
  const end = new Float32Array(edgeCount * 2 * 3);
  const tip = new Float32Array(edgeCount * 2);
  const edgeOrder = new Float32Array(edgeCount * 2);
  const edgeRand = new Float32Array(edgeCount * 2);
  let e = 0;
  list.forEach((blk) => {
    EDGES.forEach(([p, q]) => {
      const from = [blk.x + p[0] * BLOCK, blk.y + p[1] * BLOCK, blk.z + p[2] * BLOCK];
      const to = [blk.x + q[0] * BLOCK, blk.y + q[1] * BLOCK, blk.z + q[2] * BLOCK];
      const r = rand(e * 5.3 + 0.7);
      for (let v = 0; v < 2; v += 1) {
        start.set(from, (e * 2 + v) * 3);
        end.set(to, (e * 2 + v) * 3);
        tip[e * 2 + v] = v;
        edgeOrder[e * 2 + v] = blk.order;
        edgeRand[e * 2 + v] = r;
      }
      e += 1;
    });
  });
  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute('position', new THREE.BufferAttribute(start, 3));
  linesGeometry.setAttribute('aEnd', new THREE.BufferAttribute(end, 3));
  linesGeometry.setAttribute('aTip', new THREE.BufferAttribute(tip, 1));
  linesGeometry.setAttribute('aOrder', new THREE.BufferAttribute(edgeOrder, 1));
  linesGeometry.setAttribute('aRand', new THREE.BufferAttribute(edgeRand, 1));

  // City life.
  const lifePos = [];
  const lifeKind = [];
  const lifeOrder = [];
  const lifeRand = [];
  const lifeDir = [];
  const lifeTail = [];
  const life = (p, kind, ord, r, dir = 0, tail = 0) => {
    lifePos.push(...p);
    lifeKind.push(kind);
    lifeOrder.push(ord);
    lifeRand.push(r);
    lifeDir.push(dir);
    lifeTail.push(tail);
  };
  // Windows: a two-by-two grid on each side of a block, some left dark.
  const FACES = [[1, 0], [-1, 0], [0, 1], [0, -1]];
  list.forEach((blk, bi) => {
    FACES.forEach(([fx, fz], fi) => {
      for (let wy = 0; wy < 2; wy += 1) {
        for (let wx = 0; wx < 2; wx += 1) {
          const k = bi * 16 + fi * 4 + wy * 2 + wx;
          if (rand(k * 3.17 + 0.5) < 0.35) continue;
          const along = (wx - 0.5) * 0.44 * BLOCK;
          const up = (wy - 0.5) * 0.4 * BLOCK;
          const out = 0.505 * BLOCK;
          life([blk.x + fx * out + (fz ? along : 0), blk.y + up, blk.z + fz * out + (fx ? along : 0)], 0, blk.order + 0.02, rand(k * 1.91 + 0.3));
        }
      }
    });
  });
  // Traffic: streaks along the streets between the rows of plots, both ways.
  for (let lane = 0; lane <= NZ; lane += 1) {
    const z = (lane - NZ / 2) * PITCH;
    for (let car = 0; car < 6; car += 1) {
      const r = rand(lane * 31.3 + car * 7.1);
      const dir = car % 2 ? 1 : -1;
      const x = -HALF - 1 + r * (CITY_WIDTH + 2);
      for (let tail = 0; tail < 7; tail += 1) {
        life([x, GROUND + 0.03, z + dir * 0.11], 1, 0, r, dir, tail);
      }
    }
  }
  // Beacons on the towers that reach the top level.
  list.forEach((blk, bi) => {
    if (blk.y > GROUND + (LEVELS - 1) * PITCH) life([blk.x, blk.y + BLOCK / 2 + 0.1, blk.z], 2, blk.order + 0.03, rand(bi * 5.77));
  });
  const lifeGeometry = new THREE.BufferGeometry();
  lifeGeometry.setAttribute('position', new THREE.Float32BufferAttribute(lifePos, 3));
  lifeGeometry.setAttribute('aKind', new THREE.Float32BufferAttribute(lifeKind, 1));
  lifeGeometry.setAttribute('aOrder', new THREE.Float32BufferAttribute(lifeOrder, 1));
  lifeGeometry.setAttribute('aRand', new THREE.Float32BufferAttribute(lifeRand, 1));
  lifeGeometry.setAttribute('aDir', new THREE.Float32BufferAttribute(lifeDir, 1));
  lifeGeometry.setAttribute('aTail', new THREE.Float32BufferAttribute(lifeTail, 1));

  // Foreground motes.
  const DUST = 700;
  const dustPos = new Float32Array(DUST * 3);
  const dustSeed = new Float32Array(DUST);
  for (let k = 0; k < DUST; k += 1) {
    dustPos.set([(rand(k + 71.3) - 0.5) * 26, -3 + rand(k + 73.9) * 10, -5 + rand(k + 79.1) * 16], k * 3);
    dustSeed[k] = rand(k + 83.7);
  }
  const dustGeometry = new THREE.BufferGeometry();
  dustGeometry.setAttribute('position', new THREE.BufferAttribute(dustPos, 3));
  dustGeometry.setAttribute('aSeed', new THREE.BufferAttribute(dustSeed, 1));

  // The spark and its trail: TRAIL points, the head first.
  const trail = new Float32Array(TRAIL * 3);
  const age = new Float32Array(TRAIL);
  for (let k = 0; k < TRAIL; k += 1) age[k] = k / (TRAIL - 1);
  const sparkGeometry = new THREE.BufferGeometry();
  const trailAttr = new THREE.BufferAttribute(trail, 3);
  trailAttr.setUsage(THREE.DynamicDrawUsage);
  sparkGeometry.setAttribute('position', trailAttr);
  sparkGeometry.setAttribute('aAge', new THREE.BufferAttribute(age, 1));

  const uniforms = {
    uTime: { value: 0 },
    uFlow: { value: 0 },
    uHeat: { value: 0 },
    uBuild: { value: 0 },
    uDraw: { value: 0 },
    uShine: { value: 0 },
    uScanX: { value: 99 },
    uScatter: { value: 0 },
    uWindows: { value: 0 },
    uAmount: { value: 0 },
    uCopyDir: { value: new THREE.Vector2(1, 0) },
    uCopyFade: { value: 0.6 },
    uSpark: { value: new THREE.Vector4(0, 0, 0, 0) },
    uBright: { value: 0 },
    uPixelRatio: { value: 1 },
    uFocus: { value: 16 },
    uPointer: { value: new THREE.Vector2(9, 9) },
    uMirror: { value: 0 },
    uAspect: { value: 1 },
  };
  const material = (vertexShader, fragmentShader, mirror = false) => new THREE.ShaderMaterial({
    // The reflection shares every uniform but its own uMirror.
    uniforms: mirror ? { ...uniforms, uMirror: { value: 1 } } : uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const pointsMaterial = material(pointsVertex, pointsFragment);
  const linesMaterial = material(linesVertex, linesFragment);
  const sparkMaterial = material(sparkVertex, sparkFragment);
  const mirrorPointsMaterial = material(pointsVertex, pointsFragment, true);
  const mirrorLinesMaterial = material(linesVertex, linesFragment, true);
  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
  const spark = new THREE.Points(sparkGeometry, sparkMaterial);
  const mirrorPoints = new THREE.Points(pointsGeometry, mirrorPointsMaterial);
  const mirrorLines = new THREE.LineSegments(linesGeometry, mirrorLinesMaterial);
  const lifeMaterial = material(lifeVertex, lifeFragment);
  const dustMaterial = material(dustVertex, dustFragment);
  const dust = new THREE.Points(dustGeometry, dustMaterial);
  dust.frustumCulled = false;
  dust.renderOrder = 36;
  const lifePoints = new THREE.Points(lifeGeometry, lifeMaterial);
  lifePoints.frustumCulled = false;
  lifePoints.renderOrder = 33;
  [mirrorLines, mirrorPoints, lines, points, spark].forEach((o, i) => {
    o.frustumCulled = false;
    o.renderOrder = 28 + i;
  });

  const body = new THREE.Group();
  // Arcs.
  const arcPos = new Float32Array(ARCS * ARC_SEG * 2 * 3);
  const arcFade = new Float32Array(ARCS * ARC_SEG * 2);
  for (let a = 0; a < ARCS; a += 1) {
    for (let k = 0; k < ARC_SEG; k += 1) {
      arcFade[(a * ARC_SEG + k) * 2] = k / ARC_SEG;
      arcFade[(a * ARC_SEG + k) * 2 + 1] = (k + 1) / ARC_SEG;
    }
  }
  const arcGeometry = new THREE.BufferGeometry();
  const arcAttr = new THREE.BufferAttribute(arcPos, 3);
  arcAttr.setUsage(THREE.DynamicDrawUsage);
  arcGeometry.setAttribute('position', arcAttr);
  arcGeometry.setAttribute('aFade', new THREE.BufferAttribute(arcFade, 1));
  const arcUniforms = { uArc: { value: 0 } };
  const arcMaterial = new THREE.ShaderMaterial({
    uniforms: arcUniforms,
    vertexShader: arcVertex,
    fragmentShader: arcFragment,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const arcs = new THREE.LineSegments(arcGeometry, arcMaterial);
  const arcTargets = Array.from({ length: ARCS }, () => ({ x: 0, y: 0, z: 0, until: 0 }));

  // Embers.
  const emberPos = new Float32Array(EMBERS * 3);
  const emberLife = new Float32Array(EMBERS);
  const emberVel = new Float32Array(EMBERS * 3);
  const emberGeometry = new THREE.BufferGeometry();
  const emberPosAttr = new THREE.BufferAttribute(emberPos, 3);
  const emberLifeAttr = new THREE.BufferAttribute(emberLife, 1);
  emberPosAttr.setUsage(THREE.DynamicDrawUsage);
  emberLifeAttr.setUsage(THREE.DynamicDrawUsage);
  emberGeometry.setAttribute('position', emberPosAttr);
  emberGeometry.setAttribute('aLife', emberLifeAttr);
  const emberMaterial = new THREE.ShaderMaterial({
    uniforms: { uPixelRatio: uniforms.uPixelRatio },
    vertexShader: emberVertex,
    fragmentShader: emberFragment,
    transparent: true,
    depthTest: false,
    depthWrite: false,
    blending: THREE.AdditiveBlending,
  });
  const embers = new THREE.Points(emberGeometry, emberMaterial);
  let emberNext = 0;
  let emberDebt = 0;
  let arcLevel = 0;
  [arcs, embers].forEach((o, i) => {
    o.frustumCulled = false;
    o.renderOrder = 34 + i;
  });

  body.add(mirrorLines, mirrorPoints, lines, points, lifePoints);
  // The foreground motes are switched off; add `dust` here to bring them back.
  if (SHOW_SPARK) body.add(spark, arcs, embers);
  const head = new THREE.Vector4();

  // Is the spark at work: drawing the blueprint or running the scan?
  const welding = (st) => (st.chapter === 0 && st.c > 0.32 && st.c < 0.76)
    || (st.chapter === 1 && st.c > 0.06 && st.c < 0.58)
    || (st.chapter === 2 && st.c > 0.1 && st.c < 0.5);

  const updateArcs = (seconds, dt, st, hx, hy, hz) => {
    arcLevel += ((welding(st) ? 1 : 0) - arcLevel) * Math.min(1, dt * 6);
    arcUniforms.uArc.value = arcLevel * (0.75 + 0.25 * Math.random());
    if (arcLevel < 0.01 || dt <= 0) return;
    for (let a = 0; a < ARCS; a += 1) {
      const t = arcTargets[a];
      if (seconds > t.until || seconds < t.until - 1) {
        // Strike somewhere in the structure below and around the spark.
        t.x = hx + (Math.random() - 0.5) * 2.8;
        t.y = Math.max(GROUND, hy - 0.5 - Math.random() * 1.6);
        t.z = (Math.random() - 0.5) * (NZ - 1) * PITCH;
        t.until = seconds + 0.05 + Math.random() * 0.12;
      }
      const dx = t.x - hx;
      const dy = t.y - hy;
      const dz = t.z - hz;
      let px = hx;
      let py = hy;
      let pz = hz;
      for (let k = 0; k < ARC_SEG; k += 1) {
        const f = (k + 1) / ARC_SEG;
        const jag = k === ARC_SEG - 1 ? 0 : Math.sin(Math.PI * f) * 0.45;
        const nx = hx + dx * f + (Math.random() - 0.5) * jag;
        const ny = hy + dy * f + (Math.random() - 0.5) * jag;
        const nz = hz + dz * f + (Math.random() - 0.5) * jag;
        arcPos.set([px, py, pz, nx, ny, nz], (a * ARC_SEG + k) * 6);
        px = nx;
        py = ny;
        pz = nz;
      }
    }
    arcAttr.needsUpdate = true;
  };

  const updateEmbers = (dt, st, hx, hy, hz) => {
    if (dt <= 0) return;
    if (welding(st)) emberDebt += EMBER_RATE * dt;
    while (emberDebt >= 1) {
      emberDebt -= 1;
      const n = emberNext;
      emberNext = (emberNext + 1) % EMBERS;
      emberPos.set([hx, hy, hz], n * 3);
      emberVel.set([(Math.random() - 0.5) * 3.2, 0.6 + Math.random() * 2.6, (Math.random() - 0.5) * 3.2], n * 3);
      emberLife[n] = 0.6 + Math.random() * 0.4;
    }
    for (let n = 0; n < EMBERS; n += 1) {
      if (emberLife[n] <= 0) continue;
      const i = n * 3;
      emberVel[i + 1] -= GRAVITY * dt;
      emberPos[i] += emberVel[i] * dt;
      emberPos[i + 1] += emberVel[i + 1] * dt;
      emberPos[i + 2] += emberVel[i + 2] * dt;
      if (emberPos[i + 1] < GROUND) {
        // Bounce on the floor, losing most of the energy.
        emberPos[i + 1] = GROUND;
        emberVel[i + 1] *= -0.35;
        emberVel[i] *= 0.6;
        emberVel[i + 2] *= 0.6;
      }
      emberLife[n] = Math.max(0, emberLife[n] - dt / 1.4);
    }
    emberPosAttr.needsUpdate = true;
    emberLifeAttr.needsUpdate = true;
  };
  const group = new THREE.Group();
  group.add(body);
  const centre = new THREE.Vector3();
  let flowClock = 0;
  let trailReady = false;

  return {
    group,
    setPixelRatio(pixelRatio) {
      uniforms.uPixelRatio.value = pixelRatio;
    },
    // Which way is away from the copy on screen, and how far the points step
    // back behind it.
    setCopy(x, y, fade) {
      uniforms.uCopyDir.value.set(x, y);
      uniforms.uCopyFade.value = fade;
    },
    // seconds: free-running clock; dt: seconds since the last frame;
    // u: story position (see storyState); pointer: smoothed pointer in clip
    // space, or null. Returns the story state, for the copy and backdrop.
    update(seconds, dt, amount, u, pointer, camera) {
      const s = storyState(u);
      flowClock += dt * s.speed;
      uniforms.uTime.value = seconds;
      uniforms.uFlow.value = flowClock;
      uniforms.uHeat.value = (s.speed - 1) / (MAX_SPEED - 1);
      uniforms.uAmount.value = amount;
      uniforms.uBuild.value = s.build;
      uniforms.uDraw.value = s.draw;
      uniforms.uShine.value = s.shine;
      uniforms.uScanX.value = s.scan <= 0 ? 99 : SCAN_TO + (SCAN_FROM - SCAN_TO) * s.scan;
      uniforms.uScatter.value = s.scatter;
      uniforms.uWindows.value = s.windows;

      // The spark, with a little life of its own, and its trail. Stopped
      // (dt 0), the trail folds onto the head rather than smearing a jump.
      const [sx, sy, sz, sb] = sparkAt(s);
      const wob = 0.12;
      const hx = sx + wob * Math.sin(seconds * 3.1);
      const hy = sy + wob * Math.sin(seconds * 2.3 + 1.0);
      const hz = sz + wob * Math.cos(seconds * 2.7);
      if (!SHOW_SPARK) {
        // Nothing to draw.
      } else if (!trailReady || dt <= 0) {
        for (let k = 0; k < TRAIL; k += 1) trail.set([hx, hy, hz], k * 3);
        trailReady = true;
      } else {
        trail.copyWithin(3, 0, (TRAIL - 1) * 3);
        trail.set([hx, hy, hz], 0);
      }
      trailAttr.needsUpdate = true;
      const pulse = 0.85 + 0.15 * Math.sin(seconds * 5.0);
      uniforms.uSpark.value.set(hx, hy, hz, SHOW_SPARK ? sb : 0);
      head.set(hx, hy, hz, sb);
      if (SHOW_SPARK) {
        updateArcs(seconds, dt, s, hx, hy, hz);
        updateEmbers(dt, s, hx, hy, hz);
      }
      uniforms.uBright.value = sb * pulse * amount;

      group.visible = amount > 0.001;
      if (pointer) uniforms.uPointer.value.set(pointer.x, pointer.y);
      if (camera) {
        uniforms.uAspect.value = camera.aspect;
        group.getWorldPosition(centre);
        uniforms.uFocus.value = camera.position.distanceTo(centre);
      }
      // The camera's move for this point in the story, plus a slow drift so
      // it never sits still.
      const shot = shotAt(u);
      // Plus a slow breath in and out, so the camera never sits still.
      body.rotation.set(shot.tilt + 0.02 * Math.sin(seconds * 0.25), shot.yaw + 0.06 * Math.sin(seconds * 0.11), 0);
      body.position.set(0, shot.lift, shot.dolly + 0.5 * Math.sin(seconds * 0.3));
      s.dolly = shot.dolly;
      return s;
    },
    // The spark's position in world space, written into out; returns its
    // brightness.
    sparkWorld(out) {
      body.updateWorldMatrix(true, false);
      out.set(head.x, head.y, head.z).applyMatrix4(body.matrixWorld);
      return head.w;
    },
    dispose() {
      mirrorPointsMaterial.dispose();
      arcGeometry.dispose();
      arcMaterial.dispose();
      emberGeometry.dispose();
      emberMaterial.dispose();
      mirrorLinesMaterial.dispose();
      pointsGeometry.dispose();
      linesGeometry.dispose();
      lifeGeometry.dispose();
      lifeMaterial.dispose();
      dustGeometry.dispose();
      dustMaterial.dispose();
      sparkGeometry.dispose();
      pointsMaterial.dispose();
      linesMaterial.dispose();
      sparkMaterial.dispose();
    },
  };
}
