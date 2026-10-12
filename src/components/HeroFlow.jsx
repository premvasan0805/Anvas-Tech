import { useEffect, useRef } from 'react';
import * as THREE from 'three';
import { EffectComposer } from 'three/examples/jsm/postprocessing/EffectComposer.js';
import { RenderPass } from 'three/examples/jsm/postprocessing/RenderPass.js';
import { UnrealBloomPass } from 'three/examples/jsm/postprocessing/UnrealBloomPass.js';
import { OutputPass } from 'three/examples/jsm/postprocessing/OutputPass.js';
import { AfterimagePass } from 'three/examples/jsm/postprocessing/AfterimagePass.js';
import { ShaderPass } from 'three/examples/jsm/postprocessing/ShaderPass.js';
import { createMorph, CITY_WIDTH, SHOW_SPARK } from './heroMorph.js';

// Home hero background, filling the frame: one swarm of points (heroMorph.js)
// whose story runs
// on through all three slides, a chapter per slide, so the picture never cuts
// or restarts when the slide changes. The story advances a chapter per slide
// interval; a slide picked out of order fast-forwards the story to it, so the
// points still travel there through every form in between. The headline word
// and first-slide phrase the story is acting out light up (data-word and
// data-beat on the hero).
//
// It renders through a chain of effects: light trails that stretch out while
// the currents accelerate and while the scan runs; bloom, so the points,
// edges and spark glow; then a film finish with grain, a vignette and a
// little colour fringing at the edges, plus a shockwave that bursts from the
// spark at each beat of the story (or from the pointer, when the hero is
// clicked). Light shafts stream out from the spark across the frame, and
// every slide change is a warp jump: a zoom blur and a punch of the camera's
// field of view. The spark also carries an anamorphic lens flare. Bloom
// needs an opaque canvas, so the hero's near-black background and its low
// violet glow are painted here as well (the CSS keeps them for when WebGL is
// missing), with a glow under the city that rises as it is built.
//
// Pointer parallax sits on top and never drives the motion. It runs whatever
// prefers-reduced-motion says, like the video it replaced: Windows turns that
// flag on with its animation setting, which left the hero frozen. The hero's
// pause button stops it.

// Seconds per chapter: the carousel's slide interval (bindSlider in site.js).
const CHAPTER_SECONDS = 7;
// Chapters per second while catching up with a slide picked out of order.
const CATCH_UP = 1.4;
// Where a chapter's form has landed, for showing it while stopped.
const LANDED = 0.82;

// Resolution steps, best first. The hero drops a step whenever frames run
// slow and never steps back up, which would just make it oscillate.
const DPR_STEPS = [1.5, 1.25, 1, 0.75];
const SLOW_FRAME_MS = 22;
const SAMPLE_FRAMES = 45;

// Bloom: strength, radius, threshold.
const BLOOM = [0.5, 0.5, 0.35];

// Light trails: how long they linger at rest, and at full speed.
const TRAIL_REST = 0.55;
const TRAIL_FAST = 0.84;

// Beats of the story that set off a shockwave, as points in each chapter:
// the spark at the end of the beam and the foundation laid; the city
// finished; the scan done and the surface scattering.
const BEATS = [[0.32, 0.74], [0.78], [0.5, 0.84]];
const SHOCK_SECONDS = 1.5;
// Shockwave ripples (story beats and clicks) are switched off.
const SHOCKWAVES = false;
const WARP_SECONDS = 1.0;
const WARP_FOV = 9; // degrees added to the field of view at the warp's peak

const finishShader = {
  uniforms: {
    tDiffuse: { value: null },
    uTime: { value: 0 },
    uAspect: { value: 16 / 9 },
    uShock: { value: new THREE.Vector4(0.5, 0.5, 0, 0) }, // centre, radius, strength
    uLight: { value: new THREE.Vector3(0.5, 0.5, 0) }, // spark on screen, strength
    uWarp: { value: new THREE.Vector3(0.5, 0.5, 0) }, // centre, strength
  },
  vertexShader: /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`,
  fragmentShader: /* glsl */ `
uniform sampler2D tDiffuse;
uniform float uTime;
uniform float uAspect;
uniform vec4 uShock;
uniform vec3 uLight;
uniform vec3 uWarp;
varying vec2 vUv;

float hash(vec2 p) {
  return fract(sin(dot(p, vec2(12.9898, 78.233))) * 43758.5453);
}

void main() {
  vec2 uv = vUv;
  // Shockwave: a ring that pushes the picture outward as it passes.
  vec2 toC = (uv - uShock.xy) * vec2(uAspect, 1.0);
  float d = length(toC);
  float ring = exp(-pow((d - uShock.z) / 0.07, 2.0)) * uShock.w;
  vec2 dir = d > 0.0001 ? toC / d : vec2(0.0);
  uv -= dir / vec2(uAspect, 1.0) * ring * 0.03;

  // Colour fringing, toward the edges and in the ring.
  vec2 fromMid = uv - 0.5;
  vec2 ca = fromMid * (dot(fromMid, fromMid) * 0.03 + ring * 0.025);
  vec3 col = vec3(
    texture2D(tDiffuse, uv + ca).r,
    texture2D(tDiffuse, uv).g,
    texture2D(tDiffuse, uv - ca).b
  );
  col += vec3(0.55, 0.7, 1.0) * ring * 0.16 * (0.6 + 0.4 * sin(d * 90.0));

  // Warp: a zoom blur rushing out from the centre of the jump.
  if (uWarp.z > 0.001) {
    vec3 acc = col;
    for (int k = 1; k < 14; k++) {
      float sc = 1.0 - uWarp.z * 0.16 * float(k) / 13.0;
      acc += texture2D(tDiffuse, uWarp.xy + (uv - uWarp.xy) * sc).rgb;
    }
    col = mix(col, acc / 14.0, min(1.0, uWarp.z * 1.5)) * (1.0 + uWarp.z * 0.5);
  }

  // Light shafts from the spark: the bright parts of the picture smeared
  // toward it.
  if (uLight.z > 0.001) {
    vec2 step = (uv - uLight.xy) / 30.0 * 0.9;
    vec2 tc = uv;
    float decay = 1.0;
    vec3 rays = vec3(0.0);
    for (int k = 0; k < 30; k++) {
      tc -= step;
      rays += max(texture2D(tDiffuse, tc).rgb - 0.35, 0.0) * decay;
      decay *= 0.93;
    }
    col += rays * 0.025 * uLight.z * vec3(0.8, 0.85, 1.0);
  }

  float vignette = smoothstep(0.95, 0.3, length(fromMid * vec2(1.0, 1.2)));
  col *= mix(0.6, 1.0, vignette);
  col += (hash(vUv * 1000.0 + fract(uTime * 7.0) * 61.0) - 0.5) * 0.03;
  gl_FragColor = vec4(col, 1.0);
}
`,
};

// The spark's anamorphic flare: a long thin horizontal streak and a glow.
const flareVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = projectionMatrix * modelViewMatrix * vec4(position, 1.0);
}
`;
const flareFragment = /* glsl */ `
uniform float uBright;
varying vec2 vUv;
void main() {
  vec2 q = vUv - 0.5;
  float streak = exp(-q.y * q.y * 2600.0) * exp(-q.x * q.x * 9.0);
  float glow = exp(-dot(q * vec2(1.0, 10.0), q * vec2(1.0, 10.0)) * 40.0);
  vec3 col = vec3(0.45, 0.62, 1.0) * streak * 0.7 + vec3(0.75, 0.6, 1.0) * glow * 0.22;
  gl_FragColor = vec4(col * uBright, 1.0);
  #include <colorspace_fragment>
}
`;

const backdropVertex = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.9999, 1.0);
}
`;

// The .hero background from styles.css, and the glow under the city.
const backdropFragment = /* glsl */ `
uniform vec3 uBase;
uniform vec3 uViolet;
uniform float uAspect;
uniform vec2 uGroundAt;
uniform float uGround;
varying vec2 vUv;

void main() {
  vec2 d = (vUv - vec2(0.62, 0.0)) / vec2(0.6, 0.45);
  vec3 col = uBase + uViolet * 0.18 * smoothstep(1.0, 0.0, length(d));
  vec2 g = (vUv - uGroundAt) * vec2(uAspect, 1.0) / vec2(1.1, 0.35);
  col += mix(vec3(0.05, 0.12, 0.45), uViolet, 0.45) * 0.22 * uGround * exp(-dot(g, g) * 2.2);
  gl_FragColor = vec4(col, 1.0);
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
    // Highlights roll off instead of clipping to white where light piles up.
    renderer.toneMapping = THREE.ACESFilmicToneMapping;
    renderer.toneMappingExposure = 0.9;
    renderer.setClearColor(0x03040a, 1);
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(34, 16 / 9, 0.1, 100);
    const CAM_Z = 16;

    const backdropUniforms = {
      uBase: { value: new THREE.Color('#03040a') },
      uViolet: { value: new THREE.Color('rgb(88, 48, 200)') },
      uAspect: { value: 16 / 9 },
      uGroundAt: { value: new THREE.Vector2(0.58, 0.2) },
      uGround: { value: 0 },
    };
    const backdropGeometry = new THREE.PlaneGeometry(2, 2);
    const backdropMaterial = new THREE.ShaderMaterial({
      uniforms: backdropUniforms,
      vertexShader: backdropVertex,
      fragmentShader: backdropFragment,
      depthTest: false,
      depthWrite: false,
    });
    const backdrop = new THREE.Mesh(backdropGeometry, backdropMaterial);
    backdrop.frustumCulled = false;
    backdrop.renderOrder = -10;
    scene.add(backdrop);

    const composer = new EffectComposer(renderer);
    composer.addPass(new RenderPass(scene, camera));
    const trails = new AfterimagePass(TRAIL_REST);
    composer.addPass(trails);
    const bloom = new UnrealBloomPass(new THREE.Vector2(256, 256), ...BLOOM);
    composer.addPass(bloom);
    composer.addPass(new OutputPass());
    const finish = new ShaderPass(finishShader);
    composer.addPass(finish);

    const flareUniforms = { uBright: { value: 0 } };
    const flareGeometry = new THREE.PlaneGeometry(1, 1);
    const flareMaterial = new THREE.ShaderMaterial({
      uniforms: flareUniforms,
      vertexShader: flareVertex,
      fragmentShader: flareFragment,
      transparent: true,
      depthTest: false,
      depthWrite: false,
      blending: THREE.AdditiveBlending,
    });
    const flare = new THREE.Mesh(flareGeometry, flareMaterial);
    flare.frustumCulled = false;
    flare.renderOrder = 40;
    if (SHOW_SPARK) scene.add(flare);
    const sparkPos = new THREE.Vector3();
    const sparkScreen = new THREE.Vector3();
    // The shockwave in flight: seconds since it started, or -1.
    let shockAge = -1;
    let lastStory = null;
    let warpAge = -1;
    let lastSlide = null;
    const startShock = (x, y) => {
      if (!SHOCKWAVES) return;
      finish.uniforms.uShock.value.x = x;
      finish.uniforms.uShock.value.y = y;
      shockAge = 0;
    };

    // The swarm.
    const morph = createMorph();
    const morphRig = new THREE.Group();
    morphRig.add(morph.group);
    scene.add(morphRig);

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
      composer.setPixelRatio(renderer.getPixelRatio());
      composer.setSize(w, h);
      morph.setPixelRatio(renderer.getPixelRatio());
      backdropUniforms.uAspect.value = aspect;
      finish.uniforms.uAspect.value = aspect;
      backdropUniforms.uGroundAt.value.set(compact ? 0.5 : 0.58, compact ? 0.12 : 0.2);
      camera.aspect = aspect;
      camera.updateProjectionMatrix();

      // Visible half extents on the z = 0 plane.
      const halfH = CAM_Z * Math.tan(THREE.MathUtils.degToRad(camera.fov / 2));
      const halfW = halfH * aspect;
      if (!compact) {
        // Edge to edge; the points step back over the copy on the left.
        morphRig.scale.setScalar((halfW * 2 * 0.8) / CITY_WIDTH);
        morphRig.position.set(halfW * 0.06, -halfH * 0.32, -2);
        morph.setCopy(1, 0, 0.6);
      } else {
        // Wider than the screen, low in the hero; the copy sits above.
        morphRig.scale.setScalar(Math.max((halfW * 2 * 1.15) / CITY_WIDTH, halfH * 0.16));
        morphRig.position.set(0, -halfH * 0.38, 0);
        morph.setCopy(0, -1, 0.6);
      }
    };

    // Pointer parallax: eased toward the pointer, a small tilt and camera
    // shift. It adds to the motion, it never drives it.
    const finePointer = window.matchMedia('(pointer: fine)');
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      pointer.tx = (e.clientX / window.innerWidth) * 2 - 1;
      pointer.ty = (e.clientY / window.innerHeight) * 2 - 1;
      pointer.seen = true;
    };
    if (finePointer.matches) window.addEventListener('pointermove', onPointer, { passive: true });
    // A click on the hero, away from its links and buttons, sends a
    // shockwave out from the pointer.
    const onPress = (e) => {
      if (e.target.closest('a, button, input, label, form, nav, header')) return;
      const rect = host.getBoundingClientRect();
      startShock((e.clientX - rect.left) / rect.width, 1 - (e.clientY - rect.top) / rect.height);
    };

    const lit = (key, value) => {
      if (!hero || (hero.dataset[key] || '') === value) return;
      if (value) hero.dataset[key] = value;
      else delete hero.dataset[key];
    };

    const draw = (seconds, dt = 0) => {
      pointer.x += (pointer.tx - pointer.x) * 0.035;
      pointer.y += (pointer.ty - pointer.y) * 0.035;
      morphRig.rotation.set(0.06 * pointer.y, 0.1 * pointer.x, 0);

      const state = morph.update(seconds, dt, 1, story, pointer.seen ? { x: pointer.x, y: -pointer.y } : null, camera);
      backdropUniforms.uGround.value = state.ground;

      // Trails stretch out while the currents race. (Not during the scan:
      // its packed surface smeared into a white glare.)
      const heat = (state.speed - 1) / 2.4;
      trails.damp = TRAIL_REST + (TRAIL_FAST - TRAIL_REST) * heat;

      // The flare rides the spark, facing the camera.
      const sparkBright = morph.sparkWorld(sparkPos);
      flare.position.copy(sparkPos);
      flare.quaternion.copy(camera.quaternion);
      flare.scale.set(11 * morphRig.scale.x, 1.6 * morphRig.scale.x, 1);
      flareUniforms.uBright.value = sparkBright * (0.85 + 0.15 * Math.sin(seconds * 7.0));

      sparkScreen.copy(sparkPos).project(camera);
      const onScreen = Math.abs(sparkScreen.x) < 1 && Math.abs(sparkScreen.y) < 1 && sparkBright > 0.05;

      // A shockwave from the spark at each beat the story passes.
      if (dt > 0 && lastStory !== null && story > lastStory && story - lastStory < 0.2) {
        const chapter = Math.floor(story) % 3;
        const from = lastStory - Math.floor(story);
        const to = story - Math.floor(story);
        if (BEATS[chapter].some((b) => from < b && to >= b)) {
          startShock(onScreen ? sparkScreen.x * 0.5 + 0.5 : 0.62, onScreen ? sparkScreen.y * 0.5 + 0.5 : 0.32);
        }
      }
      lastStory = story;

      // Light shafts from wherever the spark is on screen.
      finish.uniforms.uLight.value.set(sparkScreen.x * 0.5 + 0.5, sparkScreen.y * 0.5 + 0.5, SHOW_SPARK && onScreen ? sparkBright : 0);

      // A warp jump each time the slide changes.
      const slideNow = activeSlide();
      if (lastSlide !== null && slideNow !== lastSlide && dt > 0) {
        warpAge = 0;
        finish.uniforms.uWarp.value.x = onScreen ? sparkScreen.x * 0.5 + 0.5 : 0.62;
        finish.uniforms.uWarp.value.y = onScreen ? sparkScreen.y * 0.5 + 0.5 : 0.4;
      }
      lastSlide = slideNow;
      let warp = 0;
      if (warpAge >= 0) {
        warpAge += dt;
        const t = warpAge / WARP_SECONDS;
        warp = t < 1 ? Math.sin(Math.PI * t) ** 2 : 0;
        if (t >= 1) warpAge = -1;
      }
      finish.uniforms.uWarp.value.z = warp;
      // The lens widens as the camera dives in, stretching the perspective.
      const fov = 34 + 1.6 * Math.max(0, state.dolly || 0) + WARP_FOV * warp;
      if (camera.fov !== fov) {
        camera.fov = fov;
        camera.updateProjectionMatrix();
      }
      if (shockAge >= 0) {
        shockAge += dt;
        const t = shockAge / SHOCK_SECONDS;
        finish.uniforms.uShock.value.z = t * 1.3;
        finish.uniforms.uShock.value.w = t < 1 ? (1 - t) ** 1.5 : 0;
        if (t >= 1) shockAge = -1;
      }
      finish.uniforms.uTime.value = seconds;
      // Light the words the story is on, once it has caught up with the slide.
      const settled = Math.floor(story) % 3 === activeSlide();
      lit('word', settled && state.word ? String(state.word) : '');
      lit('beat', settled ? state.beat : '');
      camera.position.set(0.4 * pointer.x, -0.25 * pointer.y, CAM_Z);
      camera.lookAt(0.18 * pointer.x, 0, 0);

      composer.render();
    };

    const hero = host.closest('.hero');
    hero?.addEventListener('pointerdown', onPress);
    const slides = hero ? [...hero.querySelectorAll('.slide')] : [];
    const activeSlide = () => Math.max(0, slides.findIndex((el) => el.classList.contains('is-active'))) % 3;
    let visible = true;
    let raf = 0;
    let clock = 1.5; // first frame, before the loop starts
    // Story position: chapter n is [n, n + 1) mod 3. It only ever moves on.
    let story = activeSlide();
    const advance = (dt) => {
      const target = activeSlide();
      if (Math.floor(story) % 3 !== target) {
        // Catch up with the slide, through every form on the way.
        const gap = (((target - Math.floor(story)) % 3) + 3) % 3 - (story % 1);
        story += Math.min(gap, dt * CATCH_UP);
      } else {
        // Hold just short of the chapter's end until the slide moves on.
        story = Math.min(story + dt / CHAPTER_SECONDS, Math.floor(story) + 0.999);
      }
      if (story >= 3000) story -= 3000; // a multiple of 3, so the chapter holds
    };
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
        const step = Math.min(dt / 1000, 0.1);
        clock += step;
        advance(step);
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
      const step = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      draw(clock, step);
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
    // A slide picked while the animation is stopped shows that chapter's
    // finished form at once.
    const so = new MutationObserver(() => {
      if (raf) return;
      const target = activeSlide();
      if (Math.floor(story) % 3 === target) return;
      story = Math.floor(story / 3) * 3 + target + LANDED;
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
      morph.dispose();
      backdropGeometry.dispose();
      backdropMaterial.dispose();
      composer.dispose();
      flareGeometry.dispose();
      flareMaterial.dispose();
      window.removeEventListener('pointermove', onPointer);
      hero?.removeEventListener('pointerdown', onPress);
      document.removeEventListener('visibilitychange', sync);
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="hero-flow" ref={hostRef} aria-hidden="true" />;
}
