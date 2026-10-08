import * as THREE from 'three';

// Second hero scene: broad glossy ribbons of indigo glass sweeping past the
// camera in long arcs, crossing each other at different depths, with milky
// lavender sheen where they turn toward the light. The arcs turn slowly and
// the whole cluster drifts toward the viewer and back.
//
// Each ribbon is an arc of a circle, set at its own angle in space, with a
// twist along its length. Like the glass arch, everything is shaped and
// shaded in shaders, with no lights or shadows.

const LOOP = 16;
const TAU = Math.PI * 2;

const vertexShader = /* glsl */ `
uniform float uPhase;
uniform float uA0;
uniform float uA1;
uniform float uRadius;
uniform float uWidth;
uniform float uTwist;
uniform float uTwistRate;
uniform float uSeed;
uniform mat3 uRot;
uniform vec3 uOffset;

varying vec3 vWorld;
varying vec3 vNormal;
varying float vU;
varying float vV;

const float PI = 3.14159265;

vec3 ribbon(float u, float v) {
  float w = uPhase * 2.0 * PI;
  float a = mix(uA0, uA1, u) + 0.12 * sin(w + uSeed);
  vec3 radial = vec3(cos(a), sin(a), 0.0);
  vec3 c = radial * uRadius;
  c.z += 0.7 * sin(u * 3.0 + w + uSeed);
  float tw = uTwist + uTwistRate * (u - 0.5) + 0.35 * sin(w + u * 2.0 + uSeed);
  vec3 across = cos(tw) * vec3(0.0, 0.0, 1.0) + sin(tw) * radial;
  // Curl the ribbon across its width, so the sheen runs along it in streaks.
  vec3 tangent = vec3(-sin(a), cos(a), 0.0);
  vec3 face = normalize(cross(tangent, across));
  float x = v - 0.5;
  vec3 p = c + across * x * uWidth + face * (x * x * 4.0 - 0.5) * uWidth * 0.11;
  return uRot * p + uOffset;
}

void main() {
  float u = position.x + 0.5;
  float v = position.y + 0.5;
  vec3 p = ribbon(u, v);
  vec3 du = ribbon(min(u + 0.003, 1.0), v) - ribbon(max(u - 0.003, 0.0), v);
  vec3 dv = ribbon(u, min(v + 0.02, 1.0)) - ribbon(u, max(v - 0.02, 0.0));
  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * cross(du, dv));
  vU = u;
  vV = v;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const fragmentShader = /* glsl */ `
uniform float uAmount;

varying vec3 vWorld;
varying vec3 vNormal;
varying float vU;
varying float vV;

void main() {
  vec3 view = normalize(cameraPosition - vWorld);
  vec3 n = normalize(vNormal);
  n *= sign(dot(n, view));
  float ndv = max(dot(n, view), 0.0);
  float fres = pow(1.0 - ndv, 3.0);
  vec3 r = reflect(-view, n);

  vec3 deep = vec3(0.008, 0.004, 0.10);
  vec3 indigo = vec3(0.07, 0.02, 0.95);
  vec3 lavender = vec3(0.52, 0.40, 1.0);
  vec3 orchid = vec3(0.85, 0.55, 1.0);

  // Indigo body lit from the upper left, sinking to near black away from it.
  float diff = max(dot(n, normalize(vec3(-0.4, 0.7, 0.6))), 0.0);
  vec3 col = mix(deep, indigo, pow(diff, 2.5));
  // Milky sheen from the right, warming to orchid at its core, and a sharp
  // white highlight from above.
  float broad = pow(max(dot(r, normalize(vec3(0.6, 0.35, 0.75))), 0.0), 7.0);
  col += mix(lavender, orchid, broad * broad) * broad * 0.8;
  float spec = pow(max(dot(r, normalize(vec3(-0.3, 0.8, 0.5))), 0.0), 60.0);
  col += vec3(0.95, 0.92, 1.0) * spec * 1.1;
  // Glassy edges where the ribbon turns away.
  col += mix(indigo, lavender, 0.4) * fres * 0.6;

  // Soft edges along the ribbon, and fade the ends.
  float edge = smoothstep(0.0, 0.07, vV) * (1.0 - smoothstep(0.93, 1.0, vV));
  float ends = smoothstep(0.0, 0.08, vU) * (1.0 - smoothstep(0.92, 1.0, vU));
  gl_FragColor = vec4(col, edge * ends * uAmount);
  #include <colorspace_fragment>
}
`;

// Arc angles, radius, width, twist and placement for each ribbon, in the same
// frame units as the arch (16.6 wide, 9.8 tall at z = 0).
const RIBBONS = [
  { a0: 2.2, a1: 4.0, radius: 7, width: 6.3, twist: 0.5, rate: 2.2, rot: [0.2, 0.5, -0.4], off: [-3, 1, 3.5] },
  { a0: -0.8, a1: 1.0, radius: 6, width: 5.1, twist: -1.0, rate: -2.4, rot: [-0.4, -0.6, 0.3], off: [6, -2, 2.5] },
  { a0: 1.9, a1: 4.4, radius: 9.5, width: 4.8, twist: 0.9, rate: 2.0, rot: [0.5, -0.3, 0.2], off: [4, 2, -6] },
  { a0: -0.4, a1: 2.0, radius: 8, width: 3.9, twist: -0.6, rate: 2.6, rot: [-0.6, 0.4, 0.9], off: [-5, -3, -4] },
  { a0: 2.6, a1: 4.8, radius: 6.5, width: 3.3, twist: 1.3, rate: -1.4, rot: [0.9, 0.2, -0.5], off: [6, -1, -2] },
  { a0: 0.3, a1: 2.3, radius: 10, width: 5.4, twist: 0.3, rate: 0.9, rot: [-0.2, -0.7, 1.4], off: [-2, 5, -8] },
  { a0: 3.4, a1: 5.6, radius: 7.5, width: 3.6, twist: -1.1, rate: 1.8, rot: [0.3, 0.8, -1.0], off: [-6, 3, -3] },
  { a0: 1.0, a1: 3.0, radius: 5.5, width: 2.4, twist: 0.7, rate: -2.0, rot: [1.2, -0.2, 0.4], off: [2, -5, 1] },
];

export function createRibbons() {
  const group = new THREE.Group();
  const shared = {
    uPhase: { value: 0 },
    uAmount: { value: 0 },
  };
  const geometry = new THREE.PlaneGeometry(1, 1, 180, 16);
  const materials = RIBBONS.map((r, i) => {
    const rot = new THREE.Matrix3().setFromMatrix4(
      new THREE.Matrix4().makeRotationFromEuler(new THREE.Euler(...r.rot)),
    );
    const material = new THREE.ShaderMaterial({
      uniforms: {
        ...shared,
        uA0: { value: r.a0 },
        uA1: { value: r.a1 },
        uRadius: { value: r.radius },
        uWidth: { value: r.width },
        uTwist: { value: r.twist },
        uTwistRate: { value: r.rate },
        uSeed: { value: i * 1.7 },
        uRot: { value: rot },
        uOffset: { value: new THREE.Vector3(...r.off) },
      },
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
    });
    const mesh = new THREE.Mesh(geometry, material);
    mesh.frustumCulled = false;
    mesh.renderOrder = 10;
    group.add(mesh);
    return material;
  });

  return {
    group,
    // amount 0..1 fades the scene in and out.
    update(seconds, amount) {
      const phase = (seconds % LOOP) / LOOP;
      const w = TAU * phase;
      shared.uPhase.value = phase;
      shared.uAmount.value = amount;
      group.visible = amount > 0.001;
      // Slow turn, and a drift toward the viewer and back.
      group.rotation.set(0.08 * Math.sin(w), 0.12 * Math.sin(w + 1), 0.2 * Math.sin(w + 2));
      group.position.z = 2.2 * Math.sin(w);
      // Fully transparent ribbons should not hide anything behind them.
      materials.forEach((m) => {
        m.depthWrite = amount > 0.99;
      });
    },
    dispose() {
      geometry.dispose();
      materials.forEach((m) => m.dispose());
    },
  };
}
