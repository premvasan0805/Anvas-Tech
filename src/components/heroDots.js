import * as THREE from 'three';

// Third hero scene: a flat plate of fine dots. A soft void follows the
// pointer and pushes the dots aside, so they crowd, shrink and dim around its
// rim and spread back out behind it. With no pointer (touch screens, or the
// pointer resting) the void drifts slowly across the plate on its own.
//
// Laid out in CSS pixels straight into clip space, so the grid stays crisp
// and evenly spaced whatever the camera or the hero's shape.

const SPACING = 26; // px between dots
const DOT = 3.6; // px dot diameter
const HOLE = 95; // px radius the centre dot is pushed out to
const REACH = 210; // px over which the push fades out
const IDLE_SECONDS = 2.5; // pointer rest before the void drifts on its own

const vertexShader = /* glsl */ `
uniform vec2 uRes;
uniform vec2 uMouse;
uniform vec2 uStretch;
uniform float uPixelRatio;
uniform float uAmount;

attribute float aSeed;

varying float vAlpha;

void main() {
  vec2 p = position.xy;
  vec2 d = p - uMouse;

  // Squeeze the void along its direction of travel, so it trails a little.
  float speed = length(uStretch);
  vec2 along = speed > 0.001 ? uStretch / speed : vec2(1.0, 0.0);
  vec2 across = vec2(-along.y, along.x);
  float k = 1.0 + speed;
  vec2 q = vec2(dot(d, along) / k, dot(d, across));

  // Radial lens: r maps to sqrt(r^2 + h^2), so the centre opens into a hole
  // and the dots pile up just outside it. h fades to nothing over REACH.
  float r = length(q);
  float h = ${HOLE.toFixed(1)} * exp(-pow(r / ${REACH.toFixed(1)}, 2.0));
  float g = sqrt(r * r + h * h);
  vec2 dir = r > 0.001 ? q / r : vec2(0.0, 1.0);
  vec2 moved = dir * g;
  vec2 back = along * moved.x * k + across * moved.y;
  vec2 pos = uMouse + back;

  // Compressed dots read smaller and dimmer.
  float squeeze = clamp(r / max(g, 0.001), 0.0, 1.0);
  float near = 1.0 - smoothstep(0.0, ${REACH.toFixed(1)} * 1.2, r);
  float scale = mix(1.0, 0.45 + 0.55 * squeeze, near);

  vec2 clip = pos / uRes * 2.0 - 1.0;
  gl_Position = vec4(clip.x, -clip.y, 0.0, 1.0);
  gl_PointSize = ${DOT.toFixed(1)} * (0.85 + 0.3 * aSeed) * scale * uPixelRatio;
  vAlpha = (0.62 + 0.3 * aSeed) * mix(1.0, 0.35 + 0.65 * squeeze, near) * uAmount;
}
`;

const fragmentShader = /* glsl */ `
varying float vAlpha;

void main() {
  vec2 c = gl_PointCoord - 0.5;
  float a = 1.0 - smoothstep(0.3, 0.5, length(c));
  gl_FragColor = vec4(vec3(0.86, 0.88, 0.93), a * vAlpha);
  #include <colorspace_fragment>
}
`;

export function createDots() {
  const uniforms = {
    uRes: { value: new THREE.Vector2(1, 1) },
    uMouse: { value: new THREE.Vector2(-9999, -9999) },
    uStretch: { value: new THREE.Vector2() },
    uPixelRatio: { value: 1 },
    uAmount: { value: 0 },
  };
  const material = new THREE.ShaderMaterial({
    uniforms,
    vertexShader,
    fragmentShader,
    transparent: true,
    depthWrite: false,
    depthTest: false,
  });
  let geometry = new THREE.BufferGeometry();
  const points = new THREE.Points(geometry, material);
  points.frustumCulled = false;
  points.renderOrder = 30;

  let width = 1;
  let height = 1;
  const hole = { x: 0, y: 0, vx: 0, vy: 0, placed: false };
  let lastSeconds = 0;

  return {
    group: points,
    // Rebuilds the grid for a hero of w by h CSS pixels.
    resize(w, h, pixelRatio) {
      width = w;
      height = h;
      uniforms.uRes.value.set(w, h);
      uniforms.uPixelRatio.value = pixelRatio;
      const cols = Math.ceil(w / SPACING) + 1;
      const rows = Math.ceil(h / SPACING) + 1;
      const ox = (w - (cols - 1) * SPACING) / 2;
      const oy = (h - (rows - 1) * SPACING) / 2;
      const position = new Float32Array(cols * rows * 3);
      const seed = new Float32Array(cols * rows);
      for (let j = 0; j < rows; j += 1) {
        for (let i = 0; i < cols; i += 1) {
          const n = j * cols + i;
          position[n * 3] = ox + i * SPACING;
          position[n * 3 + 1] = oy + j * SPACING;
          // Fixed per-dot variation, so a few dots read a touch larger.
          seed[n] = (Math.sin(i * 12.9898 + j * 78.233) * 43758.5453) % 1;
          seed[n] = Math.abs(seed[n]);
        }
      }
      geometry.dispose();
      geometry = new THREE.BufferGeometry();
      geometry.setAttribute('position', new THREE.BufferAttribute(position, 3));
      geometry.setAttribute('aSeed', new THREE.BufferAttribute(seed, 1));
      points.geometry = geometry;
    },
    // pointer: { x, y, at } in hero CSS pixels and clock seconds, or null.
    update(seconds, amount, pointer) {
      uniforms.uAmount.value = amount;
      points.visible = amount > 0.001;
      const dt = Math.min(Math.max(seconds - lastSeconds, 0), 0.1);
      lastSeconds = seconds;

      let tx;
      let ty;
      if (pointer && seconds - pointer.at < IDLE_SECONDS) {
        tx = pointer.x;
        ty = pointer.y;
      } else {
        // A slow figure across the right of the plate, clear of the copy.
        tx = width * (0.64 + 0.24 * Math.sin(seconds * 0.23));
        ty = height * (0.5 + 0.3 * Math.sin(seconds * 0.37 + 1.2));
      }
      if (!hole.placed) {
        hole.x = tx;
        hole.y = ty;
        hole.placed = true;
      }
      const ease = 1 - Math.exp(-dt * 5);
      const nx = hole.x + (tx - hole.x) * ease;
      const ny = hole.y + (ty - hole.y) * ease;
      // Smoothed velocity, in px per second, drives the trailing stretch.
      const vEase = 1 - Math.exp(-dt * 6);
      if (dt > 0) {
        hole.vx += ((nx - hole.x) / dt - hole.vx) * vEase;
        hole.vy += ((ny - hole.y) / dt - hole.vy) * vEase;
      }
      hole.x = nx;
      hole.y = ny;
      uniforms.uMouse.value.set(hole.x, hole.y);
      const stretch = Math.min(Math.hypot(hole.vx, hole.vy) / 900, 0.8);
      const len = Math.hypot(hole.vx, hole.vy) || 1;
      uniforms.uStretch.value.set((hole.vx / len) * stretch, (hole.vy / len) * stretch);
    },
    dispose() {
      geometry.dispose();
      material.dispose();
    },
  };
}
