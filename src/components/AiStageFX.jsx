import { useEffect, useRef } from 'react';
import * as THREE from 'three';

// Brings the AI stories' background images to life. One canvas sits behind
// all four slides and draws the active slide's own image through a shader
// written for what is in it:
//
//  0 AI Force        light streaks bend and pulses of light run along them;
//  1 AI Leadership   the particle ribbons ripple and their grain glitters;
//  2 AI Research     a glint sweeps across the low-poly face, the waves at
//                    its feet roll, and the frame pushes in slowly;
//  3 Our Perspective the wire mesh rolls, light runs down the meteor trails,
//                    and the lights twinkle.
//
// Slides crossfade here as they do in the CSS. The <img> under each slide
// stays as the fallback and is hidden only once every texture has loaded.
// It stops while the section is off screen, the tab is hidden, or the
// slider's pause button is pressed.

const FADE_SECONDS = 0.6;

const vertexShader = /* glsl */ `
varying vec2 vUv;
void main() {
  vUv = uv;
  gl_Position = vec4(position.xy, 0.0, 1.0);
}
`;

const fragmentShader = /* glsl */ `
uniform sampler2D uTexA;
uniform sampler2D uTexB;
uniform vec4 uFitA; // image aspect, object-position x, mode, unused
uniform vec4 uFitB;
uniform float uMix;
uniform float uAspect; // canvas width / height
uniform float uTime;
uniform vec2 uPointer;
uniform vec2 uRes;

varying vec2 vUv;

float hash(vec2 p) {
  p = fract(p * vec2(123.34, 456.21));
  p += dot(p, p + 45.32);
  return fract(p.x * p.y);
}

float luma(vec3 c) { return dot(c, vec3(0.299, 0.587, 0.114)); }

// Narrow repeating band: 1 at the centre of each repeat, 0 between.
float band(float x, float width) {
  float d = fract(x) - 0.5;
  return exp(-d * d / width);
}

// Screen uv to image uv, like object-fit: cover with an object-position x,
// scaled in a touch so the motion never shows an edge.
vec2 cover(vec2 uv, float imgAspect, float posX, float zoom) {
  vec2 s = vec2(1.0);
  if (uAspect > imgAspect) s.y = imgAspect / uAspect;
  else s.x = uAspect / imgAspect;
  s /= zoom;
  vec2 o = vec2((1.0 - s.x) * posX, (1.0 - s.y) * 0.5);
  return o + uv * s;
}

vec3 scene(sampler2D tex, vec4 fit, vec2 uv) {
  float mode = fit.z;
  float t = uTime;
  // Image space, y down, to match the art.
  vec2 p = cover(vec2(uv.x, 1.0 - uv.y), fit.x, fit.y, 1.06);
  p += uPointer * vec2(-0.008, 0.006);
  vec3 col;

  if (mode < 0.5) {
    // AI Force: streaks sweep up to the right. Bend them across their run,
    // then send light along them.
    vec2 q = p;
    q += vec2(-0.5, 0.8) * 0.004 * sin(p.x * 7.0 + p.y * 3.0 - t * 0.9);
    col = texture2D(tex, q).rgb;
    float l = luma(col);
    float s = p.x * 1.1 - p.y * 0.55;
    float pulse = band(s * 1.4 - t * 0.22, 0.004) + 0.6 * band(s * 2.3 - t * 0.31 + 0.4, 0.003);
    col += vec3(0.35, 0.7, 1.0) * pulse * smoothstep(0.18, 0.7, l) * 0.9;
  } else if (mode < 1.5) {
    // AI Leadership: the ribbons ripple like cloth.
    vec2 q = p;
    q.y += 0.012 * sin(p.x * 5.0 + t * 0.7) * (0.6 + 0.4 * sin(p.x * 2.3 - t * 0.35));
    q.x += 0.005 * sin(p.y * 6.0 + t * 0.45);
    col = texture2D(tex, q).rgb;
    float l = luma(col);
    // Glitter: fine cells flick on over the bright grain.
    vec2 cell = floor(q * uRes / 2.0);
    float tw = step(0.975, hash(cell + floor(t * 7.0 + hash(cell) * 7.0)));
    col += vec3(0.75, 0.82, 1.0) * tw * smoothstep(0.2, 0.55, l) * 0.9;
    // A soft sheen drifting across the folds.
    col += vec3(0.5, 0.45, 1.0) * band(p.x * 0.7 + p.y * 0.3 - t * 0.08, 0.02) * l * 0.35;
  } else if (mode < 2.5) {
    // AI Research: push in slowly, roll the waves, glint over the face.
    float zoom = 1.0 + 0.025 * (0.5 - 0.5 * cos(t * 0.15));
    vec2 q = (p - vec2(0.75, 0.45)) / zoom + vec2(0.75, 0.45);
    float waves = smoothstep(0.55, 0.85, q.y) * (1.0 - smoothstep(0.55, 0.75, q.x));
    q.y += 0.01 * sin(q.x * 16.0 - t * 1.3) * waves;
    col = texture2D(tex, q).rgb;
    float l = luma(col);
    float face = smoothstep(0.6, 0.7, q.x);
    float glint = band(q.x * 1.6 + q.y * 0.9 - t * 0.16, 0.0025);
    col += vec3(0.45, 0.62, 1.0) * glint * face * smoothstep(0.15, 0.45, l) * 0.8;
    // The small dots in the art blink.
    vec2 cell = floor(q * uRes / 3.0);
    float tw = 0.5 + 0.5 * sin(t * 3.0 + hash(cell) * 40.0);
    col += col * smoothstep(0.35, 0.6, l) * (1.0 - face) * tw * 0.6;
  } else {
    // Our Perspective: roll the mesh, run light down the meteor trails.
    vec2 q = p;
    float mesh = smoothstep(0.25, 0.6, q.y);
    q.y += 0.009 * sin(q.x * 9.0 - t * 1.0 + q.y * 4.0) * mesh;
    q.x += 0.004 * sin(q.y * 7.0 - t * 0.7) * mesh;
    col = texture2D(tex, q).rgb;
    float l = luma(col);
    // Trails run up and to the right; light travels down them, toward
    // their heads.
    vec2 dir = normalize(vec2(1.0, -0.5));
    float along = dot(q, dir);
    float sky = 1.0 - smoothstep(0.35, 0.65, q.y);
    float run = band(along * 2.2 + t * 0.4, 0.003) + band(along * 3.1 + t * 0.55 + 0.3, 0.002);
    col += vec3(0.7, 0.45, 1.0) * run * sky * smoothstep(0.12, 0.4, l) * 1.4;
    vec2 cell = floor(q * uRes / 4.0);
    float tw = 0.5 + 0.5 * sin(t * 2.2 + hash(cell) * 30.0);
    col += col * smoothstep(0.3, 0.6, l) * tw * 0.5;
  }
  return col;
}

void main() {
  vec3 a = scene(uTexA, uFitA, vUv);
  vec3 b = scene(uTexB, uFitB, vUv);
  gl_FragColor = vec4(mix(a, b, uMix), 1.0);
  #include <colorspace_fragment>
}
`;

export default function AiStageFX() {
  const hostRef = useRef(null);

  useEffect(() => {
    const host = hostRef.current;
    const stage = host?.closest('.ai-stage');
    if (!host || !stage) return undefined;
    const slides = [...stage.querySelectorAll('.ai-slide')];
    const imgs = slides.map((s) => s.querySelector('.ai-slide-bg img'));
    if (!slides.length || imgs.some((img) => !img)) return undefined;

    let renderer;
    try {
      renderer = new THREE.WebGLRenderer({ antialias: false, alpha: false, powerPreference: 'high-performance' });
    } catch {
      return undefined; // No WebGL: the plain images stay.
    }
    renderer.outputColorSpace = THREE.SRGBColorSpace;
    renderer.domElement.setAttribute('aria-hidden', 'true');
    host.appendChild(renderer.domElement);

    // Each slide's image, how it is positioned, and which effect it gets.
    const fits = slides.map((slide, i) => {
      const left = slide.matches('.ai-overview, .ai-force, .ai-wired');
      return new THREE.Vector4(16 / 9, left ? 0 : 1, i % 4, 0);
    });
    const blank = new THREE.DataTexture(new Uint8Array([5, 6, 15, 255]), 1, 1);
    blank.needsUpdate = true;
    const textures = imgs.map(() => blank);

    const uniforms = {
      uTexA: { value: blank },
      uTexB: { value: blank },
      uFitA: { value: fits[0] },
      uFitB: { value: fits[0] },
      uMix: { value: 1 },
      uAspect: { value: 1 },
      uTime: { value: 0 },
      uPointer: { value: new THREE.Vector2() },
      uRes: { value: new THREE.Vector2(1, 1) },
    };
    const material = new THREE.ShaderMaterial({ uniforms, vertexShader, fragmentShader, depthTest: false, depthWrite: false });
    const geometry = new THREE.PlaneGeometry(2, 2);
    const scene = new THREE.Scene();
    scene.add(new THREE.Mesh(geometry, material));
    const camera = new THREE.OrthographicCamera(-1, 1, 1, -1, 0, 1);

    const activeIndex = () => Math.max(0, slides.findIndex((s) => s.classList.contains('is-active')));
    let from = activeIndex();
    let to = from;
    let fade = 1;
    const setPair = () => {
      uniforms.uTexA.value = textures[from];
      uniforms.uTexB.value = textures[to];
      uniforms.uFitA.value = fits[from];
      uniforms.uFitB.value = fits[to];
      uniforms.uMix.value = fade;
    };

    let loaded = 0;
    const loader = new THREE.TextureLoader();
    imgs.forEach((img, i) => {
      loader.load(img.currentSrc || img.src, (tex) => {
        tex.colorSpace = THREE.SRGBColorSpace;
        tex.flipY = false; // the shader works in image space, y down
        tex.minFilter = THREE.LinearFilter;
        tex.generateMipmaps = false;
        tex.wrapS = THREE.ClampToEdgeWrapping;
        tex.wrapT = THREE.ClampToEdgeWrapping;
        textures[i] = tex;
        fits[i].x = tex.image.width / tex.image.height;
        loaded += 1;
        setPair();
        if (loaded === imgs.length) {
          draw();
          stage.classList.add('fx-on');
        }
      });
    });

    const layout = () => {
      const w = host.clientWidth || 1;
      const h = host.clientHeight || 1;
      renderer.setPixelRatio(Math.min(window.devicePixelRatio || 1, 1.5));
      renderer.setSize(w, h, false);
      uniforms.uAspect.value = w / h;
      uniforms.uRes.value.set(w, h);
    };

    // Pointer parallax, eased.
    const pointer = { x: 0, y: 0, tx: 0, ty: 0 };
    const onPointer = (e) => {
      const r = stage.getBoundingClientRect();
      pointer.tx = ((e.clientX - r.left) / r.width) * 2 - 1;
      pointer.ty = ((e.clientY - r.top) / r.height) * 2 - 1;
    };
    const onLeave = () => {
      pointer.tx = 0;
      pointer.ty = 0;
    };
    const fine = window.matchMedia('(pointer: fine)').matches;
    if (fine) {
      stage.addEventListener('pointermove', onPointer, { passive: true });
      stage.addEventListener('pointerleave', onLeave);
    }

    let clock = 2;
    const draw = () => {
      uniforms.uTime.value = clock;
      pointer.x += (pointer.tx - pointer.x) * 0.05;
      pointer.y += (pointer.ty - pointer.y) * 0.05;
      uniforms.uPointer.value.set(pointer.x, pointer.y);
      renderer.render(scene, camera);
    };

    // A new active slide starts a crossfade from whatever is showing now.
    const onSlide = () => {
      const next = activeIndex();
      if (next === to) return;
      from = fade < 0.5 ? from : to;
      to = next;
      fade = 0;
      setPair();
      if (!raf) {
        fade = 1;
        setPair();
        draw();
      }
    };
    const so = new MutationObserver(onSlide);
    slides.forEach((s) => so.observe(s, { attributes: true, attributeFilter: ['class'] }));

    let visible = false;
    let raf = 0;
    let last = 0;
    const running = () => visible && !document.hidden && !stage.classList.contains('is-paused');
    const frame = (now) => {
      raf = 0;
      if (!running()) return;
      const dt = last ? Math.min((now - last) / 1000, 0.1) : 0;
      last = now;
      clock += dt;
      if (fade < 1) {
        fade = Math.min(1, fade + dt / FADE_SECONDS);
        uniforms.uMix.value = fade * fade * (3 - 2 * fade);
      }
      draw();
      raf = requestAnimationFrame(frame);
    };
    const sync = () => {
      if (running()) {
        if (!raf) {
          last = 0;
          raf = requestAnimationFrame(frame);
        }
      } else if (raf) {
        cancelAnimationFrame(raf);
        raf = 0;
      }
    };

    layout();
    const ro = new ResizeObserver(() => {
      layout();
      draw();
    });
    ro.observe(host);
    const io = new IntersectionObserver(([entry]) => {
      visible = entry.isIntersecting;
      sync();
    });
    io.observe(host);
    const po = new MutationObserver(sync);
    po.observe(stage, { attributes: true, attributeFilter: ['class'] });
    document.addEventListener('visibilitychange', sync);

    return () => {
      cancelAnimationFrame(raf);
      ro.disconnect();
      io.disconnect();
      so.disconnect();
      po.disconnect();
      document.removeEventListener('visibilitychange', sync);
      stage.removeEventListener('pointermove', onPointer);
      stage.removeEventListener('pointerleave', onLeave);
      stage.classList.remove('fx-on');
      textures.forEach((t) => t.dispose());
      blank.dispose();
      geometry.dispose();
      material.dispose();
      renderer.dispose();
      renderer.domElement.remove();
    };
  }, []);

  return <div className="ai-fx" ref={hostRef} aria-hidden="true" />;
}
