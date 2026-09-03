/* Home-banner particle bloom — rotating flower-shaped point cloud.
   Pauses with .hero.is-paused. Skips reduced-motion visitors. */
(function () {
  "use strict";

  const hero = document.querySelector(".hero");
  if (!hero) return;
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

  const canvas = document.createElement("canvas");
  canvas.className = "hero-bg-anim";
  canvas.setAttribute("aria-hidden", "true");
  hero.insertBefore(canvas, hero.firstChild);

  const gl = canvas.getContext("webgl", {
    alpha: true,
    antialias: false,
    depth: false,
    stencil: false,
    premultipliedAlpha: true,
    powerPreference: "high-performance",
  });
  if (!gl) return;

  const COUNT = window.innerWidth < 800 ? 10000 : 22000;
  const PETALS = 5;

  const pos = new Float32Array(COUNT * 3);
  const seed = new Float32Array(COUNT * 3);

  function rand() { return Math.random(); }
  function randn() {
    let u = 0, v = 0;
    while (u === 0) u = Math.random();
    while (v === 0) v = Math.random();
    return Math.sqrt(-2 * Math.log(u)) * Math.cos(2 * Math.PI * v);
  }

  for (let i = 0; i < COUNT; i++) {
    const theta = rand() * Math.PI * 2;
    const kind = rand();
    let x, y, z;

    if (kind < 0.78) {
      // Petals — rhodonea disk, denser at the rim
      const petal = Math.pow(Math.abs(Math.cos(PETALS * theta)), 1.35);
      const rMax = 0.16 + 0.78 * (0.18 + 0.82 * petal);
      const u = Math.pow(rand(), 0.42);
      const r = u * rMax;
      x = r * Math.cos(theta);
      y = r * Math.sin(theta);
      z = randn() * 0.07 * (1.05 - u) + 0.04 * petal * Math.sin(theta * 2);
    } else if (kind < 0.92) {
      // Inner pistil cluster
      const r = Math.pow(rand(), 0.7) * 0.18;
      const a = rand() * Math.PI * 2;
      x = r * Math.cos(a);
      y = r * Math.sin(a);
      z = randn() * 0.09;
    } else {
      // Soft halo dust around the bloom
      const r = 0.45 + rand() * 0.55;
      const a = rand() * Math.PI * 2;
      x = r * Math.cos(a) * (0.7 + 0.3 * rand());
      y = r * Math.sin(a) * (0.7 + 0.3 * rand());
      z = randn() * 0.12;
    }

    pos[i * 3] = x;
    pos[i * 3 + 1] = y;
    pos[i * 3 + 2] = z;
    seed[i * 3] = rand();
    seed[i * 3 + 1] = Math.pow(rand(), 1.4);
    seed[i * 3 + 2] = 0.38 + rand() * 0.62;
  }

  function compile(type, src) {
    const sh = gl.createShader(type);
    gl.shaderSource(sh, src);
    gl.compileShader(sh);
    if (!gl.getShaderParameter(sh, gl.COMPILE_STATUS)) {
      console.warn("[hero-bg]", gl.getShaderInfoLog(sh));
      return null;
    }
    return sh;
  }

  const vs = compile(gl.VERTEX_SHADER, [
    "attribute vec3 aPos;",
    "attribute vec3 aSeed;",
    "uniform float uTime;",
    "uniform float uDpr;",
    "varying float vBright;",
    "varying float vHue;",
    "void main() {",
    "  float t = uTime;",
    "  vec3 p = aPos;",
    "  float ph = aSeed.x;",
    "  float spin = t * 0.28;",
    "  float c = cos(spin);",
    "  float s = sin(spin);",
    "  vec2 xy = vec2(c * p.x - s * p.y, s * p.x + c * p.y);",
    "  p.x = xy.x;",
    "  p.y = xy.y;",
    "  float tilt = 0.62;",
    "  float ct = cos(tilt);",
    "  float st = sin(tilt);",
    "  float y2 = p.y * ct - p.z * st;",
    "  float z2 = p.y * st + p.z * ct;",
    "  p.y = y2;",
    "  p.z = z2;",
    "  float yaw = t * 0.11;",
    "  float cy = cos(yaw);",
    "  float sy = sin(yaw);",
    "  float x3 = p.x * cy - p.z * sy;",
    "  float z3 = p.x * sy + p.z * cy;",
    "  p.x = x3 + 0.08;",
    "  p.z = z3;",
    "  p.x += sin(t * 0.35 + ph * 6.283) * 0.012;",
    "  p.y += cos(t * 0.31 + ph * 5.1) * 0.01;",
    "  float persp = 1.85 / (1.85 + p.z * 0.62);",
    "  gl_Position = vec4(p.x * persp * 1.05, -p.y * persp * 1.38, 0.0, 1.0);",
    "  float size = mix(1.25, 3.8, aSeed.y) * persp * uDpr;",
    "  gl_PointSize = clamp(size, 1.1, 5.4);",
    "  float fog = mix(0.35, 1.0, persp);",
    "  vBright = aSeed.z * fog;",
    "  vHue = aSeed.x;",
    "}",
  ].join("\n"));

  const fs = compile(gl.FRAGMENT_SHADER, [
    "precision mediump float;",
    "varying float vBright;",
    "varying float vHue;",
    "void main() {",
    "  vec2 uv = gl_PointCoord * 2.0 - 1.0;",
    "  float d = dot(uv, uv);",
    "  if (d > 1.0) discard;",
    "  float fall = exp(-d * 3.4);",
    "  vec3 purple = vec3(0.64, 0.0, 1.0);",
    "  vec3 lilac  = vec3(0.84, 0.28, 1.0);",
    "  vec3 mist   = vec3(0.95, 0.82, 1.0);",
    "  vec3 c = mix(purple, lilac, fract(vHue * 4.1));",
    "  c = mix(c, mist, smoothstep(0.7, 1.0, vBright));",
    "  float a = fall * vBright;",
    "  gl_FragColor = vec4(c * a, a);",
    "}",
  ].join("\n"));

  if (!vs || !fs) return;

  const prog = gl.createProgram();
  gl.attachShader(prog, vs);
  gl.attachShader(prog, fs);
  gl.linkProgram(prog);
  if (!gl.getProgramParameter(prog, gl.LINK_STATUS)) return;
  gl.useProgram(prog);

  function buf(data, locName, size) {
    const b = gl.createBuffer();
    gl.bindBuffer(gl.ARRAY_BUFFER, b);
    gl.bufferData(gl.ARRAY_BUFFER, data, gl.STATIC_DRAW);
    const loc = gl.getAttribLocation(prog, locName);
    gl.enableVertexAttribArray(loc);
    gl.vertexAttribPointer(loc, size, gl.FLOAT, false, 0, 0);
  }
  buf(pos, "aPos", 3);
  buf(seed, "aSeed", 3);

  const uTime = gl.getUniformLocation(prog, "uTime");
  const uDpr = gl.getUniformLocation(prog, "uDpr");

  gl.enable(gl.BLEND);
  gl.blendFunc(gl.ONE, gl.ONE);
  gl.disable(gl.DEPTH_TEST);

  let w = 0, h = 0, dpr = 1;
  function resize() {
    const next = Math.min(window.devicePixelRatio || 1, 2);
    const rw = hero.clientWidth;
    const rh = hero.clientHeight;
    if (rw === w && rh === h && next === dpr) return;
    w = rw; h = rh; dpr = next;
    canvas.width = Math.max(1, Math.floor(w * dpr));
    canvas.height = Math.max(1, Math.floor(h * dpr));
    canvas.style.width = w + "px";
    canvas.style.height = h + "px";
    gl.viewport(0, 0, canvas.width, canvas.height);
    gl.uniform1f(uDpr, dpr);
  }

  let time = 0;
  let last = performance.now();
  let paused = false;

  function frame(now) {
    const dt = Math.min(0.05, (now - last) / 1000);
    last = now;
    if (!paused) time += dt;
    resize();
    gl.clearColor(0, 0, 0, 0);
    gl.clear(gl.COLOR_BUFFER_BIT);
    gl.uniform1f(uTime, time);
    gl.drawArrays(gl.POINTS, 0, COUNT);
    requestAnimationFrame(frame);
  }

  new MutationObserver(() => {
    paused = hero.classList.contains("is-paused");
  }).observe(hero, { attributes: true, attributeFilter: ["class"] });
  new ResizeObserver(resize).observe(hero);
  resize();
  requestAnimationFrame(frame);
})();
