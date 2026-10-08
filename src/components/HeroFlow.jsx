import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { createRibbons } from './heroRibbons.js';
import { createDots } from './heroDots.js';

// Home hero background: a large curved pane of glass. Its near edge is a thick
// glowing rim that rises gently out of the left edge, rounds a corner high on
// the right and drops almost straight down out of frame. The pane itself
// sweeps back from that rim and fills the space under the arch, lit blue from
// the right and violet from below, with a dark fold through the middle. Once a
// loop the pane swings forward through the rim and back, which makes the glass
// flash edge-on.
//
// Three meshes, all shaped and shaded in shaders, no lights or shadows:
//  - the pane: a surface ruled from the rim curve toward a focal point behind
//    it, so it can never fold through itself;
//  - the rim: a flattened glass tube along the curve;
//  - the halo: a soft additive band around the rim standing in for bloom.
//
// All motion is periodic in LOOP seconds, so it repeats with no cut. Pointer
// parallax sits on top and never drives the motion. It runs whatever
// prefers-reduced-motion says, like the video it replaced: Windows turns that
// flag on with its animation setting, which left the hero frozen. The hero's
// pause button stops it.
const LOOP = 12;

// The path is laid out for a frame 16.6 units wide and 9.8 tall.
const FRAME_W = 8.3;
const FRAME_H = 4.9;

// Resolution steps, best first. The hero drops a step whenever frames run
// slow and never steps back up, which would just make it oscillate.
const DPR_STEPS = [1.5, 1.25, 1, 0.75];
const SLOW_FRAME_MS = 22;
const SAMPLE_FRAMES = 45;

const common = /* glsl */ `
uniform vec3 uP0;
uniform vec3 uP1;
uniform vec3 uP2;
uniform vec3 uP3;
uniform vec3 uFocus; // where the pane converges, behind the rim
uniform float uSag; // depth of the fold through the middle of the pane
uniform float uPhase; // 0..1 through the loop

const float PI = 3.14159265;

vec3 bez(float t) {
  float s = 1.0 - t;
  return s * s * s * uP0 + 3.0 * s * s * t * uP1 + 3.0 * s * t * t * uP2 + t * t * t * uP3;
}

vec3 bezTangent(float t) {
  float s = 1.0 - t;
  return normalize(3.0 * s * s * (uP1 - uP0) + 6.0 * s * t * (uP2 - uP1) + 3.0 * t * t * (uP3 - uP2));
}

// The rim, with a small ripple travelling along it.
vec3 rim(float u) {
  float w = uPhase * 2.0 * PI;
  vec3 c = bez(u);
  c.z += 0.35 * sin(2.0 * PI * 1.2 * u - w);
  return c;
}

// s = 0 on the rim, 1 far back toward the focus.
vec3 pane(float u, float s) {
  vec3 c = rim(u);
  vec3 d = mix(c, uFocus, 0.92);
  vec3 p = mix(c, d, s);
  vec3 t = bezTangent(u);
  vec3 fold = normalize(cross(t, d - c));
  return p + fold * uSag * sin(PI * s) * (0.6 + 0.4 * sin(PI * u));
}
`;

const paneVertex = /* glsl */ `
${common}
varying vec3 vWorld;
varying vec3 vNormal;
varying float vU;
varying float vS;

void main() {
  float u = position.x + 0.5;
  float s = 0.5 - position.y; // y = 0.5 is the rim
  vec3 p = pane(u, s);
  vec3 du = pane(min(u + 0.002, 1.0), s) - pane(max(u - 0.002, 0.0), s);
  vec3 ds = pane(u, min(s + 0.004, 1.0)) - pane(u, max(s - 0.004, 0.0));
  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * cross(du, ds));
  vU = u;
  vS = s;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const paneFragment = /* glsl */ `
uniform float uAmount;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vU;
varying float vS;

void main() {
  vec3 view = normalize(cameraPosition - vWorld);
  vec3 n = normalize(vNormal);
  n *= sign(dot(n, view)); // light the face we see
  float fres = pow(1.0 - max(dot(n, view), 0.0), 2.0);

  vec3 blue = vec3(0.10, 0.42, 1.0);
  vec3 violet = vec3(0.46, 0.12, 1.0);
  // Blue light washing in from the right, violet from below left.
  float b = pow(max(dot(n, normalize(vec3(0.85, 0.35, 0.45))), 0.0), 3.0);
  float v = pow(max(dot(n, normalize(vec3(-0.55, -0.75, 0.4))), 0.0), 3.0);
  // Violet along the tail, blue toward the right leg, as in the light
  // pooling inside the glass.
  vec3 tint = mix(violet, blue, smoothstep(0.42, 0.78, vU));
  vec3 col = tint * (b * 0.3 + v * 0.22 + fres * 0.22);
  // Just behind the rim the glass is thick and picks up its colour.
  col += mix(violet, blue, smoothstep(0.15, 0.5, vU)) * (1.0 - smoothstep(0.0, 0.06, vS)) * 0.2;

  // A shadowed fold a little way in from the rim, deepest under the corner.
  float f = (vS - 0.2) / 0.1;
  col *= 1.0 - 0.6 * exp(-f * f) * smoothstep(0.25, 0.6, vU) * (1.0 - smoothstep(0.75, 0.95, vU));
  // Dissolve toward the back, and at the ends.
  col *= 1.0 - smoothstep(0.2, 0.75, vS);
  col *= smoothstep(0.0, 0.05, vU) * (1.0 - smoothstep(0.95, 1.0, vU));
  gl_FragColor = vec4(col * uAmount, 1.0);
  #include <colorspace_fragment>
}
`;

const rimVertex = /* glsl */ `
${common}
uniform float uRadius;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vU;
varying float vA;

void main() {
  float u = position.x + 0.5;
  float a = (position.y + 0.5) * 2.0 * PI;
  vec3 c = rim(u);
  vec3 t = bezTangent(u);
  vec3 b1 = normalize(mix(c, uFocus, 0.92) - c);
  b1 = normalize(b1 - t * dot(b1, t));
  vec3 b2 = cross(t, b1);
  // A flattened tube: wider across the pane than through it.
  float r1 = uRadius * 1.7;
  float r2 = uRadius;
  vec3 p = c + b1 * (cos(a) * r1 - r1 * 0.6) + b2 * sin(a) * r2;
  vec3 nrm = normalize(b1 * cos(a) / r1 + b2 * sin(a) / r2);
  vec4 world = modelMatrix * vec4(p, 1.0);
  vWorld = world.xyz;
  vNormal = normalize(mat3(modelMatrix) * nrm);
  vU = u;
  vA = position.y + 0.5;
  gl_Position = projectionMatrix * viewMatrix * world;
}
`;

const rimFragment = /* glsl */ `
uniform float uPhase;
uniform float uAmount;
varying vec3 vWorld;
varying vec3 vNormal;
varying float vU;
varying float vA;

const float PI = 3.14159265;

float streak(float x, float c, float w) {
  float d = (x - c) / w;
  return exp(-d * d);
}

void main() {
  vec3 view = normalize(cameraPosition - vWorld);
  vec3 n = normalize(vNormal);
  float facing = dot(n, view);
  float fres = pow(1.0 - abs(facing), 1.6);
  float w = uPhase * 2.0 * PI;

  // Violet on the tail turning to icy blue round the corner.
  vec3 tint = mix(vec3(0.5, 0.26, 1.0), vec3(0.22, 0.58, 1.0), smoothstep(0.12, 0.45, vU));
  vec3 col = tint * (0.05 + fres * 0.95);
  // Light caught inside the glass: streaks running along the tube.
  float wob = 0.02 * sin(vU * 31.0 - w) + 0.015 * sin(vU * 67.0 + 2.0 * w);
  float lines = streak(vA, 0.18 + wob, 0.03) + streak(vA, 0.34 - wob, 0.02) * 0.7
    + streak(vA, 0.68 + wob, 0.025) * 0.6 + streak(vA, 0.84 - wob, 0.03) * 0.8;
  col += tint * lines * 0.22;
  // White highlights where the tube turns edge-on and toward the key light.
  col += vec3(0.7, 0.88, 1.0) * pow(fres, 5.0) * 0.3;
  vec3 r = reflect(-view, n * sign(facing));
  col += vec3(0.9, 0.97, 1.0) * pow(max(dot(r, normalize(vec3(-0.3, 0.9, 0.5))), 0.0), 40.0) * 0.7;

  col *= smoothstep(0.0, 0.05, vU) * (1.0 - smoothstep(0.95, 1.0, vU));
  gl_FragColor = vec4(col * uAmount, 1.0);
  #include <colorspace_fragment>
}
`;

const haloVertex = /* glsl */ `
${common}
uniform float uHalo;
varying float vU;
varying float vD;

void main() {
  float u = position.x + 0.5;
  float d = position.y * 2.0; // -1..1 across the band
  vec3 c = rim(u);
  vec3 t = bezTangent(u);
  vec3 side = normalize(cross(t, vec3(0.0, 0.0, 1.0)));
  vec3 p = c + side * d * uHalo;
  vU = u;
  vD = d;
  gl_Position = projectionMatrix * viewMatrix * modelMatrix * vec4(p, 1.0);
}
`;

const haloFragment = /* glsl */ `
uniform float uAmount;
varying float vU;
varying float vD;

void main() {
  vec3 tint = mix(vec3(0.5, 0.25, 1.0), vec3(0.2, 0.55, 1.0), smoothstep(0.12, 0.45, vU));
  float g = exp(-vD * vD * 5.0);
  vec3 col = tint * g * 0.07;
  col *= smoothstep(0.0, 0.06, vU) * (1.0 - smoothstep(0.94, 1.0, vU));
  gl_FragColor = vec4(col * uAmount, 1.0);
  #include <colorspace_fragment>
}
`;

export default function HeroFlow() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    if (!host) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: true, alpha: true, powerPreference: 'high-performance' });
    } catch {
      return undefined; // No WebGL: the hero keeps its dark background.
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 100);
    const CAM_Z = 16;

    const uniforms = {
      uP0: { value: new THREE.Vector3() },
      uP1: { value: new THREE.Vector3() },
      uP2: { value: new THREE.Vector3() },
      uP3: { value: new THREE.Vector3() },
      uFocus: { value: new THREE.Vector3() },
      uSag: { value: 1 },
      uPhase: { value: 0 },
      uRadius: { value: 0.17 },
      uHalo: { value: 1.1 },
      uAmount: { value: 1 },
    };

    // Additive glass throughout: overlapping layers brighten like light
    // through glass, and nothing needs sorting.
    const glassMaterial = (vertexShader, fragmentShader) => new THREE.ShaderMaterial({
      uniforms,
      vertexShader,
      fragmentShader,
      side: THREE.DoubleSide,
      transparent: true,
      depthWrite: false,
      depthTest: false,
      blending: THREE.AdditiveBlending,
    });

    const group = new THREE.Group();
    scene.add(group);
    const parts = [
      [new THREE.PlaneGeometry(1, 1, 220, 64), glassMaterial(paneVertex, paneFragment)],
      [new THREE.PlaneGeometry(1, 1, 300, 28), glassMaterial(rimVertex, rimFragment)],
      [new THREE.PlaneGeometry(1, 1, 200, 1), glassMaterial(haloVertex, haloFragment)],
    ];
    parts.forEach(([geometry, material], i) => {
      const mesh = new THREE.Mesh(geometry, material);
      mesh.frustumCulled = false;
      mesh.renderOrder = 20 + i;
      group.add(mesh);
    });

    // The ribbon scene, which fills the hero whatever its shape.
    const ribbons = createRibbons();
    const ribbonRig = new THREE.Group();
    ribbonRig.add(ribbons.group);
    scene.add(ribbonRig);
    // The dot plate, laid out in screen pixels.
    const dots = createDots();
    scene.add(dots.group);

    let dprStep = 0;
    const layout = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      const aspect = w / h;
      // Matches the CSS breakpoint where the copy goes full width.
      const compact = w < 1024 || aspect < 1.1;
      dprStep = Math.max(dprStep, compact ? 1 : 0);
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, DPR_STEPS[dprStep]));
      renderer.setSize(w, h, false);
      dots.resize(w, h, renderer.getPixelRatio());
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      // Visible half extents on the z = 0 plane.
      const halfH = CAM_Z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const halfW = halfH * aspect;
      if (!compact) {
        group.scale.setScalar(Math.min(halfW / FRAME_W, (halfH / FRAME_H) * 1.15));
        group.position.set(0, 0, 0);
        ribbonRig.scale.setScalar(Math.max(halfW / FRAME_W, halfH / FRAME_H));
      } else {
        // Under the copy: a smaller arch across the lower part of the hero.
        group.scale.setScalar(Math.min(0.75, halfW / 6.2));
        group.position.set(-halfW * 0.1, -halfH * 0.35, 0);
        // The ribbons fill the hero whatever its shape.
        ribbonRig.scale.setScalar(Math.max(halfW / FRAME_W, halfH / FRAME_H));
      }
    };

    // Pointer parallax: eased toward the pointer, a small tilt and camera
    // shift. It adds to the motion, it never drives it.
    const finePointer = window.matchMedia('(pointer: fine)');
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    // Where the pointer last was over the hero, in its pixels, for the dot
    // plate's void.
    let plate = null;
    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      const rect = host.getBoundingClientRect();
      plate = { x: e.clientX - rect.left, y: e.clientY - rect.top, at: clock };
    };
    if (finePointer.matches) window.addEventListener('pointermove', onPointer, { passive: true });

    // Both kept below the frame, so the pane's converging edge never shows.
    const FOCUS_BACK = new THREE.Vector3(1.5, -10, -6);
    const FOCUS_FRONT = new THREE.Vector3(1.0, -8, 5);

    const draw = (seconds) => {
      const phase = (seconds % LOOP) / LOOP;
      const w = Math.PI * 2 * phase;

      // The arch breathes: the corner climbs and leans, then settles.
      uniforms.uP0.value.set(-11.5, -1.4 + 0.45 * Math.sin(w + 1), -1);
      uniforms.uP1.value.set(2.2 + 0.8 * Math.sin(w + 1.8), 3.4 + 1.0 * Math.sin(w + 2.4), 0);
      uniforms.uP2.value.set(6.7 + 0.6 * Math.sin(w), 5.9 + 1.5 * Math.sin(w + 0.5), 0.6 * Math.cos(w));
      uniforms.uP3.value.set(6.3 + 0.4 * Math.sin(w + 0.3), -9.5, 1);
      // Once a loop the pane swings forward through the rim and back.
      const k = Math.min(Math.max((phase - 0.5) / 0.36, 0), 1);
      const swing = Math.sin(Math.PI * k) ** 2;
      uniforms.uFocus.value.lerpVectors(FOCUS_BACK, FOCUS_FRONT, swing);
      uniforms.uSag.value = 0.8 + 0.3 * Math.sin(w) - 0.5 * swing;
      uniforms.uPhase.value = phase;

      pointer.x += (pointer.tx - pointer.x) * 0.035;
      pointer.y += (pointer.ty - pointer.y) * 0.035;
      group.rotation.set(0.05 * pointer.y, -0.08 * pointer.x, 0);
      ribbonRig.rotation.copy(group.rotation);

      // Each slide has its own scene; they crossfade as the slides change.
      uniforms.uAmount.value = amounts[0];
      group.visible = amounts[0] > 0.001;
      ribbons.update(seconds, amounts[1]);
      dots.update(seconds, amounts[2], plate);
      camera.position.set(0.4 * pointer.x, -0.25 * pointer.y, CAM_Z);
      camera.lookAt(0.18 * pointer.x, 0, 0);

      renderer.render(scene, camera);
    };

    const hero = host.closest('.hero');
    // Scene per slide: 0 the glass arch, 1 the ribbons, 2 the dot plate.
    const SCENES = 3;
    const slides = hero ? [...hero.querySelectorAll('.slide')] : [];
    const activeScene = () => Math.max(0, slides.findIndex((el) => el.classList.contains('is-active'))) % SCENES;
    const amounts = Array.from({ length: SCENES }, (_, i) => (i === activeScene() ? 1 : 0));
    const FADE_SECONDS = 1.1;
    let visible = true;
    let raf = 0;
    let clock = 1.5; // first frame, before the loop starts
    let last = 0;
    // Frame-time governor.
    let sampleCount = 0;
    let sampleTime = 0;
    let warmup = 30; // skip frames right after a start or a step change

    const running = () => visible && !document.hidden && !hero?.classList.contains('is-paused');
    const frame = (now) => {
      raf = 0;
      if (!running()) return;
      if (last) {
        const dt = now - last;
        clock += Math.min(dt / 1000, 0.1);
        const step = Math.min(dt / 1000, 0.1) / FADE_SECONDS;
        const active = activeScene();
        amounts.forEach((a, i) => {
          amounts[i] = i === active ? Math.min(1, a + step) : Math.max(0, a - step);
        });
        if (warmup > 0) warmup -= 1;
        else if (dt < 250) { // ignore gaps from tab switches and the like
          sampleTime += dt;
          sampleCount += 1;
          if (sampleCount >= SAMPLE_FRAMES) {
            if (sampleTime / sampleCount > SLOW_FRAME_MS && dprStep < DPR_STEPS.length - 1) {
              dprStep += 1;
              layout();
              warmup = 30;
            }
            sampleTime = 0;
            sampleCount = 0;
          }
        }
      }
      last = now;
      draw(clock);
      raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      if (running()) {
        if (!raf) {
          last = 0;
          warmup = 30;
          sampleTime = 0;
          sampleCount = 0;
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    layout();
    draw(clock);
    const ro = new ResizeObserver(() => {
      layout();
      draw(clock);
    });
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(host);
    const mo = hero ? new MutationObserver(sync) : null;
    mo?.observe(hero, { attributes: true, attributeFilter: ['class'] });
    // A slide picked while the animation is stopped switches scene at once.
    const so = new MutationObserver(() => {
      if (raf) return;
      amounts.forEach((_, i) => { amounts[i] = i === activeScene() ? 1 : 0; });
      draw(clock);
    });
    slides.forEach((el) => so.observe(el, { attributes: true, attributeFilter: ['class'] }));
    document.addEventListener('visibilitychange', sync);
    sync();

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      mo?.disconnect();
      so.disconnect();
      ribbons.dispose();
      dots.dispose();
      window.removeEventListener('pointermove', onPointer);
      document.removeEventListener('visibilitychange', sync);
      parts.forEach(([geometry, material]) => {
        geometry.dispose();
        material.dispose();
      });
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-flow" ref={hostRef} aria-hidden="true" />;
}
