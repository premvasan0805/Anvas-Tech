import * as THREE from 'three';

// The home hero's scene, after the "Augmented Human Mind" look: one swarm of
// points whose story runs on through all three slides, a chapter per slide,
// without ever restarting. Story position u runs 0..3 and wraps; chapter n is
// u in [n, n + 1). The points form a human head and shoulders in three
// quarter view, a neural mind glowing inside it and a ring orbiting it.
//
//  0  "AI Is Our Accelerator. Engineering Is Our Foundation."
//     The currents streaming across the frame speed up, then pour into the
//     figure from the shoulders up: the foundation first.
//  1  "Think. Design. Build. Improve."
//     The head completes, the mind inside it wires itself up connection by
//     connection, and the ring closes round it; then signals fire through the
//     mind and the figure brightens.
//  2  "Explore. Build. Improve."
//     The head turns, a scan line passes down it, lighting each part as it
//     goes, then the figure scatters back into the currents chapter 0 starts
//     from.
//
// The head's shell is lit at its rim and fades where it faces away, so it
// reads as a solid form rather than a cloud. Points near the pointer light
// up. The figure steps back behind the copy so the copy stays readable.
//
// Same interface as heroMorph.js, so HeroFlow can use either.

const COUNT = 26000;
export const CITY_WIDTH = 15.3; // the width HeroFlow fits to the frame
export const SHOW_SPARK = false;
const MAX_SPEED = 3.4;
const HEAD_SCALE = 2.05;
const HEAD_Y = 1.55; // where the head's local origin sits
const HEAD_X_WIDE = 3.9; // right of the copy on wide screens

const ease = (x) => {
  const c = Math.min(Math.max(x, 0), 1);
  return c * c * (3 - 2 * c);
};
const mix = (a, b, t) => a + (b - a) * t;

function rand(n) {
  const x = Math.sin(n * 12.9898 + 4.1414) * 43758.5453;
  return x - Math.floor(x);
}

// Everything the story drives, at story position u.
export function storyState(u) {
  const w = ((u % 3) + 3) % 3;
  const chapter = Math.floor(w);
  const c = w - chapter;
  const s = {
    chapter,
    c,
    speed: 1,
    build: 0, // formed: points with a lower order are in the figure
    draw: 0, // the mind's connections drawn
    ring: 0, // the ring closed
    shine: 0, // the finished figure brightening
    scan: 0, // 0..1 scan line, top to bottom
    scatter: 0,
    ground: 0,
    word: 0,
    beat: '',
  };
  if (chapter === 0) {
    s.speed = 1 + (MAX_SPEED - 1) * ease(c / 0.28) - (MAX_SPEED - 1.3) * ease((c - 0.4) / 0.3);
    s.build = 0.42 * ease((c - 0.34) / 0.46);
    s.ground = ease((c - 0.35) / 0.45) * 0.5;
    s.word = c < 0.4 ? 4 : 8;
    s.beat = ['explore', 'refine', 'solve', 'build'][Math.min(3, Math.floor(c / 0.21))];
  } else if (chapter === 1) {
    s.speed = 1 + 0.3 * (1 - ease(c / 0.3));
    s.build = 0.42 + 0.6 * ease((c - 0.02) / 0.4);
    s.draw = ease((c - 0.25) / 0.45);
    s.ring = ease((c - 0.35) / 0.4);
    s.shine = ease((c - 0.74) / 0.14);
    s.ground = 0.5 + 0.3 * ease(c / 0.8);
    s.word = c < 0.1 ? 1 : c < 0.3 ? 2 : c < 0.74 ? 3 : 4;
  } else {
    s.build = 1.02;
    s.draw = 1;
    s.ring = 1;
    s.shine = 1 - ease((c - 0.06) / 0.3) * 0.6;
    s.scan = Math.min(1, Math.max(0, (c - 0.12) / 0.5));
    s.scatter = ease((c - 0.84) / 0.16);
    s.ground = 0.8 - 0.8 * ease((c - 0.8) / 0.2);
    s.word = c < 0.1 ? 2 : c < 0.84 ? 3 : 1;
  }
  return s;
}

// The head's turn through the story: facing toward the copy, then round.
const YAW_KEYS = [0, 0.5, 1, 1.5, 2, 2.5, 3];
const YAWS = [-0.2, -0.35, -0.55, -0.62, -0.7, -0.95, -0.2];
const TILTS = [0.05, 0.04, 0.0, -0.04, -0.02, 0.06, 0.05];
function turnAt(u) {
  const w = ((u % 3) + 3) % 3;
  const k = Math.min(YAW_KEYS.length - 2, Math.floor(w / 0.5));
  const t = (1 - Math.cos(Math.PI * ((w - YAW_KEYS[k]) / 0.5))) / 2;
  return { yaw: mix(YAWS[k], YAWS[k + 1], t), tilt: mix(TILTS[k], TILTS[k + 1], t) };
}

// ---- The figure, as a signed distance field (head units, face toward +z).

function ellipsoid(px, py, pz, cx, cy, cz, rx, ry, rz) {
  const x = (px - cx) / rx;
  const y = (py - cy) / ry;
  const z = (pz - cz) / rz;
  const k0 = Math.sqrt(x * x + y * y + z * z);
  const x1 = x / rx;
  const y1 = y / ry;
  const z1 = z / rz;
  const k1 = Math.sqrt(x1 * x1 + y1 * y1 + z1 * z1) || 1e-6;
  return (k0 * (k0 - 1)) / k1;
}
function capsule(px, py, pz, ax, ay, az, bx, by, bz, r) {
  const pax = px - ax;
  const pay = py - ay;
  const paz = pz - az;
  const bax = bx - ax;
  const bay = by - ay;
  const baz = bz - az;
  const h = Math.min(1, Math.max(0, (pax * bax + pay * bay + paz * baz) / (bax * bax + bay * bay + baz * baz)));
  return Math.hypot(pax - bax * h, pay - bay * h, paz - baz * h) - r;
}
function smin(a, b, k) {
  const h = Math.max(k - Math.abs(a - b), 0) / k;
  return Math.min(a, b) - h * h * k * 0.25;
}
function smax(a, b, k) {
  return -smin(-a, -b, k);
}

function figure(x, y, z) {
  const ax = Math.abs(x);
  let d = ellipsoid(x, y, z, 0, 0.36, -0.1, 0.76, 0.88, 0.96); // cranium
  d = smin(d, ellipsoid(x, y, z, 0, -0.22, 0.16, 0.6, 0.74, 0.72), 0.25); // face
  d = smin(d, ellipsoid(x, y, z, 0, -0.84, 0.36, 0.3, 0.2, 0.26), 0.2); // chin
  d = smin(d, ellipsoid(ax, y, z, 0.44, -0.12, 0.44, 0.2, 0.16, 0.22), 0.15); // cheekbones
  d = smin(d, ellipsoid(x, y, z, 0, 0.24, 0.66, 0.5, 0.1, 0.16), 0.12); // brow
  d = smin(d, capsule(x, y, z, 0, 0.1, 0.8, 0, -0.26, 0.98, 0.085), 0.12); // nose
  d = smin(d, ellipsoid(x, y, z, 0, -0.3, 0.92, 0.1, 0.06, 0.08), 0.08); // nose tip
  d = smin(d, ellipsoid(x, y, z, 0, -0.52, 0.78, 0.22, 0.07, 0.1), 0.08); // lips
  d = smin(d, ellipsoid(ax, y, z, 0.74, 0.0, -0.06, 0.1, 0.24, 0.15), 0.1); // ears
  d = smax(d, -ellipsoid(ax, y, z, 0.27, 0.08, 0.8, 0.15, 0.1, 0.12), 0.1); // eye sockets
  d = smin(d, ellipsoid(ax, y, z, 0.27, 0.07, 0.72, 0.1, 0.07, 0.08), 0.03); // eyes
  d = smin(d, capsule(x, y, z, 0, -0.55, -0.18, 0, -1.55, -0.12, 0.4), 0.3); // neck
  d = smin(d, ellipsoid(x, y, z, 0, -2.0, -0.12, 1.65, 0.5, 0.72), 0.45); // shoulders
  return smax(d, -2.25 - y, 0.05); // cut flat below the shoulders
}

function gradient(x, y, z) {
  const e = 0.004;
  const gx = figure(x + e, y, z) - figure(x - e, y, z);
  const gy = figure(x, y + e, z) - figure(x, y - e, z);
  const gz = figure(x, y, z + e) - figure(x, y, z - e);
  const l = Math.hypot(gx, gy, gz) || 1;
  return [gx / l, gy / l, gz / l];
}

// A point on the figure's surface near (x, y, z), with its normal.
function toSurface(x, y, z) {
  let px = x;
  let py = y;
  let pz = z;
  for (let k = 0; k < 6; k += 1) {
    const d = figure(px, py, pz);
    const [nx, ny, nz] = gradient(px, py, pz);
    px -= nx * d;
    py -= ny * d;
    pz -= nz * d;
    if (Math.abs(d) < 0.002) break;
  }
  return { p: [px, py, pz], n: gradient(px, py, pz), d: Math.abs(figure(px, py, pz)) };
}

// The mind: a brain shape inside the cranium, folded with gyri.
const BRAIN_C = [0, 0.42, -0.14];
const BRAIN_R = [0.56, 0.46, 0.68];
function brainPoint(n) {
  const u = rand(n + 3.1) * 2 - 1;
  const phi = rand(n + 5.9) * Math.PI * 2;
  const ring = Math.sqrt(1 - u * u);
  let dx = ring * Math.cos(phi);
  const dy = u;
  const dz = ring * Math.sin(phi);
  // Two hemispheres with a groove between them, and folds over the surface.
  const fold = 1 + 0.06 * Math.sin(dx * 11 + dz * 7) * Math.sin(dy * 9 - dz * 5);
  const groove = 1 - 0.18 * Math.exp(-dx * dx * 60);
  const inner = rand(n + 8.3) < 0.15 ? 0.55 + 0.4 * rand(n + 9.7) : 1;
  dx *= groove;
  const r = fold * inner;
  return [BRAIN_C[0] + dx * BRAIN_R[0] * r, BRAIN_C[1] + dy * BRAIN_R[1] * r * groove, BRAIN_C[2] + dz * BRAIN_R[2] * r];
}

const shared = /* glsl */ `
uniform float uTime;
uniform float uFlow;
uniform float uHeat;
uniform float uBuild;
uniform float uDraw;
uniform float uRing;
uniform float uShine;
uniform float uScanY; // scan line, in head units; far off when idle
uniform float uScatter;
uniform float uAmount;
uniform vec2 uCopyDir;
uniform float uCopyFade;
uniform vec3 uHeadPos;
uniform mat3 uHeadRot;
uniform mat3 uRingRot;
uniform float uHeadScale;

const float PI = 3.14159265;
const vec3 BLUE = vec3(0.18, 0.5, 1.0);
const vec3 VIOLET = vec3(0.54, 0.12, 1.0);
const vec3 MAGENTA = vec3(0.82, 0.22, 1.0);

float clearOfCopy(vec2 ndc) {
  return mix(1.0 - uCopyFade, 1.0, smoothstep(-0.45, 0.35, dot(ndc, uCopyDir)));
}

float formedBy(float order) {
  return smoothstep(0.0, 1.0, clamp((uBuild - order) / 0.07, 0.0, 1.0));
}

// The scan line passing down the head lights what it crosses.
float scanned(float y) {
  return exp(-pow((y - uScanY) / 0.08, 2.0));
}
`;

const pointsVertex = /* glsl */ `
${shared}
uniform float uPixelRatio;
uniform vec2 uPointer;
uniform float uAspect;

attribute vec3 aFlow;
attribute vec3 aNormal;
attribute float aSeed;
attribute float aOrder;
attribute float aKind; // 0 shell, 1 mind, 2 ring, 3 motes

varying vec3 vColor;
varying float vAlpha;

vec3 currents(vec3 b) {
  float t = uFlow;
  float x = mod(b.x + 12.0 + t * (0.55 + 0.35 * aSeed), 24.0) - 12.0;
  vec3 p = vec3(x, b.y, b.z);
  p.y += 0.55 * sin(x * 0.55 + t * 0.6 + b.y * 1.7) + 0.25 * sin(x * 1.3 - t * 0.9);
  p.z += 0.5 * sin(x * 0.35 - t * 0.45 + b.y * 0.9);
  float beam = uHeadPos.y;
  p.y = mix(p.y, beam + (p.y - beam) * 0.07, uHeat);
  p.z *= 1.0 - 0.8 * uHeat;
  return p;
}

void main() {
  vec3 flow = currents(aFlow);
  float b = formedBy(aOrder);
  float r = smoothstep(0.0, 1.0, clamp(uScatter * 1.5 - aSeed * 0.5, 0.0, 1.0));

  vec3 local = position;
  vec3 formed;
  vec3 n = uHeadRot * aNormal;
  if (aKind > 1.5 && aKind < 2.5) {
    // The ring closes as uRing rises: points slide round to their places.
    float a = atan(local.z, local.x);
    float open = (1.0 - uRing) * PI * 1.6;
    float a2 = a * (1.0 - (1.0 - uRing) * 0.8) + open;
    float rad = length(local.xz);
    local = vec3(cos(a2) * rad, local.y, sin(a2) * rad);
    formed = uHeadPos + uRingRot * local * uHeadScale;
  } else if (aKind > 2.5) {
    // Motes drift slowly round the figure.
    vec3 m = local;
    m.y += 0.15 * sin(uTime * 0.4 + aSeed * 30.0);
    m.x += 0.1 * cos(uTime * 0.3 + aSeed * 17.0);
    formed = uHeadPos + uHeadRot * m * uHeadScale;
  } else {
    formed = uHeadPos + uHeadRot * local * uHeadScale;
  }

  vec3 p = mix(flow, formed, b);
  p.y += sin(PI * b) * 0.9 * (0.4 + aSeed);
  p = mix(p, flow, r);
  p.y += sin(PI * r) * (0.8 + aSeed);

  vec4 mv = modelViewMatrix * vec4(p, 1.0);
  gl_Position = projectionMatrix * mv;
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vec2 d = (ndc - uPointer) * vec2(uAspect, 1.0);
  float near = exp(-dot(d, d) / 0.03);

  // Rim light: strongest where the surface turns away from the eye; faint
  // where it faces away entirely, so the back of the head does not show.
  vec3 viewN = normalize(mat3(modelViewMatrix) * n);
  vec3 toEye = normalize(-mv.xyz);
  float facing = dot(viewN, toEye);
  float rim = pow(1.0 - abs(facing), 2.2);
  float front = smoothstep(-0.35, 0.15, facing);

  float flash = scanned(local.y) * step(aKind, 1.5);
  vec3 tint = mix(BLUE, VIOLET, clamp(0.5 - local.y * 0.25, 0.0, 1.0));
  vec3 col;
  float glow;
  if (aKind < 0.5) {
    col = mix(vec3(0.12, 0.28, 0.7), vec3(0.72, 0.9, 1.0), rim);
    col = mix(col, tint, 0.25);
    glow = (0.16 + 1.25 * rim) * mix(0.25, 1.0, front);
  } else if (aKind < 1.5) {
    // Signals race through the mind as waves from the back to the front.
    float wave = pow(0.5 + 0.5 * sin(local.z * 9.0 - uTime * 3.2 + aSeed * 2.0), 8.0);
    col = mix(VIOLET, MAGENTA, aSeed) + vec3(0.5, 0.6, 1.0) * wave * (0.3 + 0.5 * uShine);
    glow = 0.26 + 0.45 * wave * uDraw;
  } else if (aKind < 2.5) {
    float g = fract(atan(local.z, local.x) / (2.0 * PI) + uTime * 0.05);
    col = g < 0.5 ? mix(BLUE, VIOLET, g * 2.0) : mix(VIOLET, MAGENTA, (g - 0.5) * 2.0);
    col += vec3(0.6, 0.8, 1.0) * pow(abs(sin(g * PI * 3.0 - uTime * 1.5)), 30.0);
    glow = 0.6 * uRing;
  } else {
    col = mix(BLUE, VIOLET, aSeed);
    glow = 0.35 * (0.5 + 0.5 * sin(uTime * 1.2 + aSeed * 40.0));
  }
  glow *= (1.0 + 0.4 * uShine);
  // Unformed points are the currents again, in the brand colours.
  vec3 stream = mix(BLUE, MAGENTA, aSeed) * 0.9;
  vColor = mix(stream, col * glow, b * (1.0 - r)) + vec3(0.6, 0.85, 1.0) * flash * 1.4 * b * (1.0 - r)
    + vec3(0.55, 0.75, 1.0) * near * 0.9;

  float size = mix(24.0, aKind < 0.5 ? 22.0 : 26.0, b) * (0.7 + 0.6 * aSeed) * (1.0 + 0.6 * near + flash);
  gl_PointSize = size * uPixelRatio / -mv.z;
  vAlpha = (0.55 + 0.45 * aSeed) * mix(0.55 * (1.0 - 0.4 * uHeat), 1.0, b * (1.0 - r)) * clearOfCopy(ndc) * uAmount;
}
`;

const pointsFragment = /* glsl */ `
varying vec3 vColor;
varying float vAlpha;

void main() {
  float d = length(gl_PointCoord - 0.5);
  float a = 1.0 - smoothstep(0.1, 0.5, d);
  gl_FragColor = vec4(vColor * a * vAlpha, 1.0);
  #include <colorspace_fragment>
}
`;

// The mind's connections: drawn one by one, then carrying signals.
const linesVertex = /* glsl */ `
${shared}
attribute vec3 aEnd;
attribute float aTip;
attribute float aOrder;
attribute float aRand;

varying float vT;
varying float vRand;
varying float vAlpha;

void main() {
  float draw = smoothstep(0.0, 1.0, clamp((uDraw - aOrder) / 0.08, 0.0, 1.0));
  vec3 local = mix(position, mix(position, aEnd, draw), aTip);
  vec3 p = uHeadPos + uHeadRot * local * uHeadScale;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(p, 1.0);
  vec2 ndc = gl_Position.xy / gl_Position.w;
  vT = aTip;
  vRand = aRand;
  vAlpha = (draw > 0.001 ? 1.0 : 0.0) * (1.0 - uScatter) * clearOfCopy(ndc) * uAmount;
}
`;

const linesFragment = /* glsl */ `
uniform float uTime;
uniform float uShine;
varying float vT;
varying float vRand;
varying float vAlpha;

void main() {
  float head = fract(uTime * 0.6 + vRand);
  float pulse = exp(-pow((vT - head) * 9.0, 2.0));
  vec3 col = mix(vec3(0.55, 0.2, 1.0), vec3(0.75, 0.9, 1.0), pulse);
  gl_FragColor = vec4(col * (0.06 + pulse * (0.55 + 0.45 * uShine)) * vAlpha, 1.0);
  #include <colorspace_fragment>
}
`;

export function createMorph() {
  const pos = new Float32Array(COUNT * 3);
  const nor = new Float32Array(COUNT * 3);
  const flow = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT);
  const order = new Float32Array(COUNT);
  const kind = new Float32Array(COUNT);

  const SHELL = Math.floor(COUNT * 0.62);
  const MIND = Math.floor(COUNT * 0.2);
  const RING = Math.floor(COUNT * 0.12);
  let n = 0;

  // Shell: random points pulled onto the surface; those that land far off
  // it (deep in a crease) are thrown back and drawn again.
  let tries = 0;
  while (n < SHELL && tries < SHELL * 6) {
    tries += 1;
    const x = (rand(tries * 1.7 + 0.3) - 0.5) * 3.5;
    const y = -2.3 + rand(tries * 2.3 + 0.9) * 3.6;
    const z = (rand(tries * 3.1 + 0.5) - 0.5) * 2.4;
    const s = toSurface(x, y, z);
    if (s.d > 0.01 || s.p[1] < -2.27) continue;
    pos.set(s.p, n * 3);
    nor.set(s.n, n * 3);
    kind[n] = 0;
    // Formed from the shoulders up.
    order[n] = 0.02 + 0.9 * ((s.p[1] + 2.25) / 3.6) + 0.06 * rand(n + 0.7);
    n += 1;
  }

  // The mind.
  const mindStart = n;
  for (let k = 0; k < MIND; k += 1, n += 1) {
    const p = brainPoint(k);
    pos.set(p, n * 3);
    nor.set([0, 0, 1], n * 3);
    kind[n] = 1;
    order[n] = 0.62 + 0.3 * rand(k + 4.4);
  }

  // The ring: a flat band round the head, in its own plane.
  for (let k = 0; k < RING; k += 1, n += 1) {
    const a = rand(k + 11.3) * Math.PI * 2;
    const rad = 1.55 + (rand(k + 12.9) - 0.5) * 0.08 + (rand(k + 13.7) < 0.2 ? 0.12 : 0);
    pos.set([Math.cos(a) * rad, (rand(k + 14.1) - 0.5) * 0.03, Math.sin(a) * rad], n * 3);
    nor.set([0, 0, 1], n * 3);
    kind[n] = 2;
    order[n] = 0.55 + 0.35 * rand(k + 15.5);
  }

  // Motes round the figure.
  for (; n < COUNT; n += 1) {
    const a = rand(n + 16.3) * Math.PI * 2;
    const rad = 1.3 + rand(n + 17.1) * 1.4;
    pos.set([Math.cos(a) * rad, -1.8 + rand(n + 18.7) * 3.6, Math.sin(a) * rad * 0.6], n * 3);
    nor.set([0, 0, 1], n * 3);
    kind[n] = 3;
    order[n] = 0.3 + 0.6 * rand(n + 19.3);
  }

  for (let k = 0; k < COUNT; k += 1) {
    seed[k] = rand(k + 23.3);
    const band = Math.floor(rand(k + 53.1) * 7);
    flow.set([
      (rand(k + 1.3) - 0.5) * 24,
      -2.6 + band * 0.95 + (rand(k + 7.7) - 0.5) * 0.35 + (rand(k + 13.1) - 0.5) * 0.2,
      -2.5 + rand(band + 61.7) * 5 + (rand(k + 19.9) - 0.5) * 0.6,
    ], k * 3);
  }

  const pointsGeometry = new THREE.BufferGeometry();
  pointsGeometry.setAttribute('position', new THREE.BufferAttribute(pos, 3));
  pointsGeometry.setAttribute('aNormal', new THREE.BufferAttribute(nor, 3));
  pointsGeometry.setAttribute('aFlow', new THREE.BufferAttribute(flow, 3));
  pointsGeometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
  pointsGeometry.setAttribute('aOrder', new THREE.BufferAttribute(order, 1));
  pointsGeometry.setAttribute('aKind', new THREE.BufferAttribute(kind, 1));

  // The mind's connections: neurons picked from the mind's points, each wired
  // to its nearest few, drawn from the back of the head to the front.
  const neurons = [];
  for (let k = 0; k < 150; k += 1) {
    const i = mindStart + Math.floor(rand(k * 7.7 + 0.1) * MIND);
    neurons.push([pos[i * 3], pos[i * 3 + 1], pos[i * 3 + 2]]);
  }
  const links = [];
  neurons.forEach((a, ai) => {
    neurons
      .map((b, bi) => ({ bi, d: Math.hypot(b[0] - a[0], b[1] - a[1], b[2] - a[2]) }))
      .filter(({ bi, d }) => bi > ai && d < 0.4)
      .sort((p, q) => p.d - q.d)
      .slice(0, 2)
      .forEach(({ bi }) => links.push([a, neurons[bi]]));
  });
  const start = new Float32Array(links.length * 6);
  const end = new Float32Array(links.length * 6);
  const tip = new Float32Array(links.length * 2);
  const linkOrder = new Float32Array(links.length * 2);
  const linkRand = new Float32Array(links.length * 2);
  links.forEach(([a, b], e) => {
    const o = 0.9 * ((Math.min(a[2], b[2]) - (BRAIN_C[2] - BRAIN_R[2])) / (2 * BRAIN_R[2]));
    const r = rand(e * 5.3 + 0.7);
    for (let v = 0; v < 2; v += 1) {
      start.set(a, (e * 2 + v) * 3);
      end.set(b, (e * 2 + v) * 3);
      tip[e * 2 + v] = v;
      linkOrder[e * 2 + v] = o;
      linkRand[e * 2 + v] = r;
    }
  });
  const linesGeometry = new THREE.BufferGeometry();
  linesGeometry.setAttribute('position', new THREE.BufferAttribute(start, 3));
  linesGeometry.setAttribute('aEnd', new THREE.BufferAttribute(end, 3));
  linesGeometry.setAttribute('aTip', new THREE.BufferAttribute(tip, 1));
  linesGeometry.setAttribute('aOrder', new THREE.BufferAttribute(linkOrder, 1));
  linesGeometry.setAttribute('aRand', new THREE.BufferAttribute(linkRand, 1));

  const uniforms = {
    uTime: { value: 0 },
    uFlow: { value: 0 },
    uHeat: { value: 0 },
    uBuild: { value: 0 },
    uDraw: { value: 0 },
    uRing: { value: 0 },
    uShine: { value: 0 },
    uScanY: { value: 99 },
    uScatter: { value: 0 },
    uAmount: { value: 0 },
    uCopyDir: { value: new THREE.Vector2(1, 0) },
    uCopyFade: { value: 0.6 },
    uHeadPos: { value: new THREE.Vector3(HEAD_X_WIDE, HEAD_Y, 0) },
    uHeadRot: { value: new THREE.Matrix3() },
    uRingRot: { value: new THREE.Matrix3() },
    uHeadScale: { value: HEAD_SCALE },
    uPixelRatio: { value: 1 },
    uPointer: { value: new THREE.Vector2(9, 9) },
    uAspect: { value: 1 },
  };
  const material = (vertexShader, fragmentShader) => new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
    blending: THREE.AdditiveBlending,
  });
  const pointsMaterial = material(pointsVertex, pointsFragment);
  const linesMaterial = material(linesVertex, linesFragment);
  const points = new THREE.Points(pointsGeometry, pointsMaterial);
  const lines = new THREE.LineSegments(linesGeometry, linesMaterial);
  [lines, points].forEach((o, i) => {
    o.frustumCulled = false;
    o.renderOrder = 28 + i;
  });

  const group = new THREE.Group();
  group.add(lines, points);
  const headRot = new THREE.Matrix4();
  const ringRot = new THREE.Matrix4();
  const ringTilt = new THREE.Matrix4();
  const ringSpin = new THREE.Matrix4();
  const euler = new THREE.Euler();
  let flowClock = 0;

  return {
    group,
    setPixelRatio(pixelRatio) {
      uniforms.uPixelRatio.value = pixelRatio;
    },
    // Which way is away from the copy on screen, and how far the points step
    // back behind it. Copy above (narrow screens): the figure is centred.
    setCopy(x, y, fade) {
      uniforms.uCopyDir.value.set(x, y);
      uniforms.uCopyFade.value = fade;
      uniforms.uHeadPos.value.x = y < -0.5 ? 0 : HEAD_X_WIDE;
    },
    update(seconds, dt, amount, u, pointer, camera) {
      const s = storyState(u);
      flowClock += dt * s.speed;
      uniforms.uTime.value = seconds;
      uniforms.uFlow.value = flowClock;
      uniforms.uHeat.value = (s.speed - 1) / (MAX_SPEED - 1);
      uniforms.uAmount.value = amount;
      uniforms.uBuild.value = s.build;
      uniforms.uDraw.value = s.draw;
      uniforms.uRing.value = s.ring;
      uniforms.uShine.value = s.shine;
      uniforms.uScanY.value = s.scan <= 0 || s.scan >= 1 ? 99 : 1.4 - s.scan * 3.8;
      uniforms.uScatter.value = s.scatter;

      // The head's turn, with a slow breath of motion so it never sits still.
      const turn = turnAt(u);
      euler.set(turn.tilt + 0.03 * Math.sin(seconds * 0.5), turn.yaw + 0.05 * Math.sin(seconds * 0.23), 0.02 * Math.sin(seconds * 0.31));
      headRot.makeRotationFromEuler(euler);
      uniforms.uHeadRot.value.setFromMatrix4(headRot);
      // The ring: tilted round the head, spinning in its own plane.
      ringTilt.makeRotationFromEuler(new THREE.Euler(0.42, 0, -0.32));
      ringSpin.makeRotationY(seconds * 0.35);
      ringRot.multiplyMatrices(ringTilt, ringSpin);
      uniforms.uRingRot.value.setFromMatrix4(ringRot);

      group.visible = amount > 0.001;
      if (pointer) uniforms.uPointer.value.set(pointer.x, pointer.y);
      if (camera) uniforms.uAspect.value = camera.aspect;
      return s;
    },
    // HeroFlow aims its light at the builder; there is none here.
    sparkWorld(out) {
      group.updateWorldMatrix(true, false);
      out.copy(uniforms.uHeadPos.value).applyMatrix4(group.matrixWorld);
      return 0;
    },
    dispose() {
      pointsGeometry.dispose();
      linesGeometry.dispose();
      pointsMaterial.dispose();
      linesMaterial.dispose();
    },
  };
}
