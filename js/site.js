(function () {
  const root = document.body.dataset.root || ".";
  const asset = (p) => `${root}/assets/${p}`;

  const megaWhat = `
    <div class="mega">
      <div>
        <h4>Featured solutions</h4>
        <a href="${root}/what-we-do.html#vishful">Vishful</a>
        <a href="${root}/what-we-do.html#attendance">Attendance app</a>
        <a href="${root}/what-we-do.html#healthcare">Healthcare app</a>
        <a href="${root}/what-we-do.html#government">Government projects</a>
        <h4>AI and digital</h4>
        <a href="${root}/what-we-do.html#ai">AI and Generative AI</a>
        <a class="sub" href="${root}/what-we-do.html#ai">AI Advisory</a>
        <a class="sub" href="${root}/what-we-do.html#ai">AI Factory · AI Force · AI Foundry</a>
        <a class="sub" href="${root}/what-we-do.html#ai">Industry AI · Kinetic AI · Physical AI</a>
        <a href="${root}/what-we-do.html#apps">Applications</a>
        <a class="sub" href="${root}/what-we-do.html#apps">Data · Modern · Enterprise</a>
        <a href="${root}/what-we-do.html#bpo">Business Process Operations</a>
      </div>
      <div>
        <h4>Engineering and infrastructure</h4>
        <a href="${root}/what-we-do.html#edtech">EdTech</a>
        <a href="${root}/what-we-do.html#ers">Engineering and R&amp;D Services</a>
        <a href="${root}/what-we-do.html#gcc">Global Capability Center</a>
        <a href="${root}/what-we-do.html#infra">IT Infrastructure</a>
        <a class="sub" href="${root}/what-we-do.html#infra">Cloud · Cybersecurity · Workplace</a>
        <a class="sub" href="${root}/what-we-do.html#infra">Networks · USM · Platforms</a>
        <a href="${root}/what-we-do.html#supply">Supply Chain</a>
      </div>
      <div>
        <h4>Products and platforms</h4>
        <a href="${root}/what-we-do.html#products">Our Blueprint — XDO</a>
        <a href="${root}/what-we-do.html#products">Data Intelligence Platform</a>
        <a href="${root}/what-we-do.html#products">Secure Intelligent Operations</a>
        <a class="sub" href="${root}/what-we-do.html#products">Anvas BigFix · Anvas AppScan</a>
        <a href="${root}/what-we-do.html#products">Sovereign Collaboration</a>
        <a href="${root}/what-we-do.html#products">Hyper-personalized MarTech</a>
        <a href="${root}/what-we-do.html#products">Aftermarket Cloud</a>
      </div>
    </div>`;

  const megaInd = `
    <div class="mega">
      <div>
        <h4>Applications</h4>
        <a href="${root}/what-we-do.html#vishful">Vishful<span class="mega-note">Property, co-living and live occupancy</span></a>
        <a href="${root}/what-we-do.html#attendance">Attendance app<span class="mega-note">Time, attendance and shift tracking</span></a>
        <a href="${root}/what-we-do.html#healthcare">Healthcare app<span class="mega-note">Clinic and care-team workflows</span></a>
        <a href="${root}/what-we-do.html#government">Government projects<span class="mega-note">Citizen services and secure delivery</span></a>
      </div>
      <div>
        <h4>Platforms</h4>
        <a href="${root}/what-we-do.html#ai">AI Force<span class="mega-note">GenAI and agentic workflows at scale</span></a>
        <a href="${root}/what-we-do.html#products">XDO Blueprint<span class="mega-note">Experience, data and operations as one</span></a>
        <a href="${root}/what-we-do.html#products">Data Intelligence Platform<span class="mega-note">Enterprise data products with governance</span></a>
        <a href="${root}/what-we-do.html#products">Aftermarket Cloud<span class="mega-note">Service and parts operations in the cloud</span></a>
      </div>
      <div>
        <h4>Software</h4>
        <a href="${root}/anvassoftware.html">Anvas BigFix<span class="mega-note">Intelligent endpoint management</span></a>
        <a href="${root}/anvassoftware.html">Anvas AppScan<span class="mega-note">Application security across the lifecycle</span></a>
        <a href="${root}/anvassoftware.html">Sovereign Collaboration<span class="mega-note">Residency, control and trusted comms</span></a>
        <a href="${root}/anvassoftware.html">MarTech<span class="mega-note">Hyper-personalized marketing platforms</span></a>
        <a class="mega-all" href="${root}/industries.html">View all products</a>
      </div>
    </div>`;

  const megaWho = `
    <div class="mega mega-2">
      <div>
        <h4>Company</h4>
        <a href="${root}/who-we-are.html">About Us</a>
        <a href="${root}/who-we-are.html#leadership">Leadership</a>
        <a href="${root}/who-we-are.html#awards">Awards and Recognition</a>
        <a href="${root}/who-we-are.html">Analyst Recognitions</a>
        <a href="${root}/who-we-are.html">Annual Report 2026</a>
        <a href="${root}/who-we-are.html">Corporate Social Responsibility</a>
        <a href="${root}/who-we-are.html">Diversity, Equity and Inclusion</a>
      </div>
      <div>
        <h4>Governance</h4>
        <a href="${root}/who-we-are.html">Investor Relations</a>
        <a href="${root}/who-we-are.html">Newsroom</a>
        <a href="${root}/who-we-are.html">Strategic Alliances</a>
        <a href="${root}/who-we-are.html">Sustainability</a>
        <a href="${root}/who-we-are.html">Privacy Trust Center</a>
        <a href="${root}/who-we-are.html">Code of Business Ethics</a>
        <a href="${root}/who-we-are.html">Global Delivery Network</a>
      </div>
    </div>`;

  const megaRes = `
    <div class="mega mega-2">
      <div>
        <h4>Resources</h4>
        <a href="${root}/resources.html">Trends and Insights</a>
        <a href="${root}/resources.html">Case Studies</a>
        <a href="${root}/resources.html">Events and Webinars</a>
        <a href="${root}/resources.html">Knowledge Library</a>
      </div>
      <div>
        <h4>Reports</h4>
        <a href="${root}/resources.html">The Blueprint for AI Leadership</a>
        <a href="${root}/resources.html">Analyst reports</a>
        <a href="${root}/resources.html">Newsroom</a>
      </div>
    </div>`;

  const megaCar = `
    <div class="mega mega-2">
      <div>
        <h4>Careers</h4>
        <a href="${root}/careers.html">Careers Overview</a>
        <a href="${root}/careers.html">Meet our people</a>
        <a href="${root}/careers.html">Explore job opportunities</a>
      </div>
      <div>
        <h4>Regions</h4>
        <a href="${root}/careers.html">Americas</a>
        <a href="${root}/careers.html">Europe and Africa</a>
        <a href="${root}/careers.html">Asia Pacific</a>
        <a href="${root}/careers.html">India</a>
      </div>
    </div>`;

  const header = `
    <a class="skip" href="#main">Skip to main content</a>
    <header class="site-header" id="header">
      <div class="header-bar">
      <a class="logo" href="${root}/index.html" aria-label="Anvas Tech">
        <img class="logo-mark" src="${root}/assets/logo-anvas.png?v=1" alt="" width="164" height="100">
        <span class="logo-word" aria-hidden="true">Anvas Tech</span>
      </a>
        <nav class="nav-desktop" aria-label="Primary navigation">
          <div class="nav-item" data-mega>
            <a class="nav-link" href="${root}/what-we-do.html">Solutions <span class="chev"></span></a>
            ${megaWhat}
          </div>
          <div class="nav-item" data-mega>
            <a class="nav-link" href="${root}/industries.html">Products <span class="chev"></span></a>
            ${megaInd}
          </div>
          <div class="nav-item" data-mega>
            <a class="nav-link" href="${root}/who-we-are.html">Who We Are <span class="chev"></span></a>
            ${megaWho}
          </div>
          <div class="nav-item" data-mega>
            <a class="nav-link" href="${root}/resources.html">Resources <span class="chev"></span></a>
            ${megaRes}
          </div>
          <div class="nav-item" data-mega>
            <a class="nav-link" href="${root}/careers.html">Careers <span class="chev"></span></a>
            ${megaCar}
          </div>
        </nav>
        <div class="header-tools">
          <button class="icon-btn" type="button" data-open-search aria-label="Search">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <circle cx="11" cy="11" r="6.4" stroke="currentColor" stroke-width="1.7"/>
              <path d="M16.1 16.2 20 20" stroke="currentColor" stroke-width="1.7" stroke-linecap="round"/>
            </svg>
            <svg class="spark" viewBox="0 0 12 12" aria-hidden="true">
              <path fill="currentColor" d="M6 0l1.15 4.05L11.2 5.2 7.15 6.35 6 10.4 4.85 6.35.8 5.2 4.85 4.05Z"/>
            </svg>
          </button>
          <div class="lang-wrap">
            <button class="icon-btn globe" type="button" data-lang-toggle aria-label="Select language" aria-haspopup="true">
              <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
                <circle cx="12" cy="12" r="8.2" stroke="currentColor" stroke-width="1.6"/>
                <path d="M4 12h16M12 4c2.4 2.4 3.6 5.2 3.6 8s-1.2 5.6-3.6 8c-2.4-2.4-3.6-5.2-3.6-8s1.2-5.6 3.6-8Z" stroke="currentColor" stroke-width="1.4"/>
              </svg>
              <span class="chev"></span>
            </button>
            <div class="lang-menu" role="listbox">
              <button type="button">English</button>
              <button type="button">Deutsch</button>
              <button type="button">Français</button>
              <button type="button">日本語</button>
            </div>
          </div>
          <a class="chat-btn" href="${root}/contact.html" aria-label="Chat with us">
            <svg viewBox="0 0 24 24" fill="none" aria-hidden="true">
              <path d="M6.5 16.5 4 19V7.5A2.5 2.5 0 0 1 6.5 5h11A2.5 2.5 0 0 1 20 7.5v6.2a2.5 2.5 0 0 1-2.5 2.5H9.2Z" stroke="currentColor" stroke-width="1.6" stroke-linejoin="round"/>
            </svg>
          </a>
          <button class="menu-toggle" type="button" aria-label="Open menu"><span></span></button>
        </div>
      </div>
      <nav class="mobile-nav" id="mobile-nav" hidden>
        <a href="${root}/what-we-do.html">Solutions</a>
        <a href="${root}/industries.html">Products</a>
        <a href="${root}/who-we-are.html">Who We Are</a>
        <a href="${root}/resources.html">Resources</a>
        <a href="${root}/careers.html">Careers</a>
        <a href="${root}/contact.html">Contact Us</a>
      </nav>
    </header>`;

  const footer = `
    <footer class="site-footer">
      <div class="wrap foot-grid">
        <div>
          <h4>Solutions</h4>
          <a href="${root}/what-we-do.html#vishful">Vishful</a>
          <a href="${root}/what-we-do.html#attendance">Attendance app</a>
          <a href="${root}/what-we-do.html#healthcare">Healthcare app</a>
          <a href="${root}/what-we-do.html#government">Government projects</a>
          <a href="${root}/what-we-do.html#ai">AI and Generative AI</a>
          <a href="${root}/what-we-do.html#apps">Applications</a>
        </div>
        <div>
          <h4>Products</h4>
          <a href="${root}/what-we-do.html#vishful">Vishful</a>
          <a href="${root}/what-we-do.html#attendance">Attendance app</a>
          <a href="${root}/what-we-do.html#healthcare">Healthcare app</a>
          <a href="${root}/what-we-do.html#government">Government projects</a>
          <a href="${root}/anvassoftware.html">Anvas BigFix</a>
          <a href="${root}/anvassoftware.html">Anvas AppScan</a>
        </div>
        <div>
          <h4>Who We Are</h4>
          <a href="${root}/who-we-are.html">About Us</a>
          <a href="${root}/who-we-are.html#leadership">Leadership</a>
          <a href="${root}/who-we-are.html">Investor Relations</a>
          <a href="${root}/who-we-are.html">Newsroom</a>
          <a href="${root}/who-we-are.html">Sustainability</a>
          <a href="${root}/resources.html">Trends and Insights</a>
        </div>
        <div>
          <h4>Careers</h4>
          <a href="${root}/careers.html">Careers Overview</a>
          <a href="${root}/careers.html">Meet our people</a>
          <a href="${root}/careers.html">Explore job opportunities</a>
          <a href="${root}/contact.html">Contact Us</a>
          <a href="${root}/resources.html">Events and Webinars</a>
          <a href="${root}/resources.html">Case Studies</a>
        </div>
      </div>
      <div class="wrap foot-bottom">
        <div>Copyright © 2026 AnvasTech Limited</div>
        <div class="legal">
          <a href="${root}/contact.html">Contact Us</a>
          <a href="${root}/who-we-are.html">Disclaimer</a>
          <a href="${root}/who-we-are.html">Privacy Statement</a>
          <a href="${root}/who-we-are.html">Terms of use</a>
          <a href="${root}/index.html">Sitemap</a>
        </div>
        <div class="social" aria-label="Social">
          <a href="https://www.linkedin.com/company/anvastech" aria-label="LinkedIn">in</a>
          <a href="https://twitter.com/anvastech" aria-label="X">X</a>
          <a href="https://www.youtube.com/user/AnvasTechtube" aria-label="YouTube">▶</a>
          <a href="https://www.facebook.com/AnvasTechOfficial" aria-label="Facebook">f</a>
        </div>
      </div>
    </footer>
    <div class="search-layer" id="search-layer" hidden>
      <div class="search-box">
        <form id="overlay-search">
          <input type="search" name="q" placeholder="Ask a question or search AnvasTech" required>
          <button class="btn-blue" type="submit">Ask</button>
        </form>
      </div>
    </div>
    <div class="cookie" id="cookie" hidden>
      <p>We use cookies on our site. Please read more about our <a href="${root}/who-we-are.html">cookies policy</a>.</p>
      <button class="btn-blue" type="button" data-accept-cookies>Accept</button>
    </div>`;

  const mount = document.getElementById("chrome-header");
  const foot = document.getElementById("chrome-footer");
  if (mount) mount.outerHTML = header;
  if (foot) foot.outerHTML = footer;

  document.querySelectorAll("[data-mega]").forEach((item) => {
    const open = () => {
      document.querySelectorAll("[data-mega]").forEach((el) => el.classList.remove("open"));
      item.classList.add("open");
    };
    const close = () => item.classList.remove("open");
    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", close);
    item.querySelector(".nav-link")?.addEventListener("focus", open);
  });

  const langWrap = document.querySelector(".lang-wrap");
  document.querySelector("[data-lang-toggle]")?.addEventListener("click", (e) => {
    e.stopPropagation();
    langWrap?.classList.toggle("open");
  });
  document.addEventListener("click", () => langWrap?.classList.remove("open"));
  langWrap?.querySelectorAll(".lang-menu button").forEach((btn) => {
    btn.addEventListener("click", () => langWrap.classList.remove("open"));
  });

  (function bindLogoReveal() {
    const logo = document.querySelector(".logo");
    if (!logo) return;
    const on = () => logo.classList.add("is-on");
    const off = () => logo.classList.remove("is-on");
    logo.addEventListener("pointerenter", on);
    logo.addEventListener("pointerleave", off);
    logo.addEventListener("focusin", on);
    logo.addEventListener("focusout", (e) => {
      if (!logo.contains(e.relatedTarget)) off();
    });
    logo.addEventListener("click", (e) => {
      // Only intercept tap-to-reveal wordmark on coarse pointers when expand is allowed.
      if (
        window.matchMedia("(hover: none)").matches &&
        window.matchMedia("(min-width: 992px)").matches &&
        !logo.classList.contains("is-on")
      ) {
        e.preventDefault();
        on();
      }
    });
  })();

  const headerEl = document.getElementById("header");
  (function bindHeaderScrollHide() {
    if (!headerEl) return;
    let lastY = window.scrollY;
    let ticking = false;
    const update = () => {
      ticking = false;
      const y = window.scrollY;
      headerEl.classList.toggle("is-stuck", y > 8);
      const overlayOpen =
        !!document.querySelector(".nav-item.open, .menu-toggle.is-open") ||
        (document.getElementById("mobile-nav") && !document.getElementById("mobile-nav").hidden);
      if (y <= 48) {
        headerEl.classList.remove("is-away");
      } else if (!overlayOpen && y > lastY + 2) {
        headerEl.classList.add("is-away");
      } else if (y < lastY - 2) {
        headerEl.classList.remove("is-away");
      }
      lastY = y;
    };
    window.addEventListener(
      "scroll",
      () => {
        if (!ticking) {
          ticking = true;
          requestAnimationFrame(update);
        }
      },
      { passive: true }
    );
    update();
  })();

  const toggle = document.querySelector(".menu-toggle");
  const mobile = document.getElementById("mobile-nav");
  toggle?.addEventListener("click", () => {
    const open = toggle.classList.toggle("is-open");
    if (mobile) {
      mobile.hidden = !open;
      mobile.style.display = open ? "block" : "none";
    }
  });

  const layer = document.getElementById("search-layer");
  document.querySelectorAll("[data-open-search]").forEach((btn) => {
    btn.addEventListener("click", () => {
      if (!layer) return;
      layer.hidden = false;
      layer.classList.add("is-open");
      layer.querySelector("input")?.focus();
    });
  });
  layer?.addEventListener("click", (e) => {
    if (e.target === layer) {
      layer.classList.remove("is-open");
      layer.hidden = true;
    }
  });
  document.getElementById("overlay-search")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = new FormData(e.target).get("q");
    window.location.href = `${root}/index.html?q=${encodeURIComponent(q)}#ask`;
  });

  const cookie = document.getElementById("cookie");
  if (cookie && !localStorage.getItem("anvas-cookie")) {
    cookie.hidden = false;
  }
  document.querySelector("[data-accept-cookies]")?.addEventListener("click", () => {
    localStorage.setItem("anvas-cookie", "1");
    if (cookie) cookie.hidden = true;
  });

  function bindSlider({ slides, tabs, pauseBtn, interval = 7000, start = 0 }) {
    if (!slides.length) return;
    let idx = start;
    let playing = true;
    let timer;
    const show = (n) => {
      idx = (n + slides.length) % slides.length;
      slides.forEach((s, i) => s.classList.toggle("is-active", i === idx));
      tabs.forEach((t, i) => t.classList.toggle("is-active", i === idx));
    };
    const tick = () => {
      clearInterval(timer);
      if (playing) timer = setInterval(() => show(idx + 1), interval);
    };
    tabs.forEach((t, i) => t.addEventListener("click", () => { show(i); tick(); }));
    const host = pauseBtn?.closest("section");
    pauseBtn?.addEventListener("click", () => {
      playing = !playing;
      pauseBtn.setAttribute("aria-pressed", String(!playing));
      pauseBtn.setAttribute("aria-label", playing ? "Pause" : "Play");
      pauseBtn.classList.toggle("is-paused", !playing);
      host?.classList.toggle("is-paused", !playing);
      const pauseText = pauseBtn.querySelector(".hero-pause-text, .cs-play-text");
      if (pauseText) pauseText.textContent = playing ? "Pause" : "Play";
      const bars = pauseBtn.querySelector(".bars");
      if (bars) bars.textContent = playing ? "❚❚" : "▶";
      const label = pauseBtn.childNodes[pauseBtn.childNodes.length - 1];
      if (label && label.nodeType === 3) label.textContent = playing ? " Pause" : " Play";
      tick();
    });
    show(idx);
    tick();
  }

  bindSlider({
    slides: [...document.querySelectorAll(".hero .slide")],
    tabs: [...document.querySelectorAll(".hero .tab")],
    pauseBtn: document.querySelector("[data-pause]"),
    start: 0,
  });

  (function bindHeroVideo() {
    const hero = document.querySelector(".hero");
    const video = hero?.querySelector(".hero-video");
    if (!hero || !video) return;
    video.muted = true;
    video.loop = true;
    video.playsInline = true;
    const kick = () => {
      if (hero.classList.contains("is-paused")) {
        video.pause();
        return;
      }
      const play = video.play();
      if (play && typeof play.catch === "function") play.catch(() => {});
    };
    kick();
    video.addEventListener("loadeddata", kick);
    video.addEventListener("canplay", kick);
    document.addEventListener("visibilitychange", () => {
      if (!document.hidden) kick();
    });
    new MutationObserver(kick).observe(hero, { attributes: true, attributeFilter: ["class"] });
  })();
  bindSlider({
    slides: [...document.querySelectorAll(".ai-slide")],
    tabs: [...document.querySelectorAll("[data-ai-tab]")],
    pauseBtn: document.querySelector("[data-ai-pause]"),
    interval: 9000,
    start: 0,
  });

  (function bindWired() {
    const root = document.querySelector("[data-wired]");
    if (!root) return;
    const eps = [...root.querySelectorAll("[data-wired-ep]")];
    const nextBtn = root.querySelector("[data-wired-next]");
    const nextTitle = root.querySelector("[data-wired-next-title]");
    if (!eps.length) return;
    let i = 0;
    const show = (n) => {
      i = (n + eps.length) % eps.length;
      eps.forEach((ep, j) => ep.classList.toggle("is-active", j === i));
      if (nextTitle) nextTitle.textContent = eps[i].dataset.title || "";
    };
    nextBtn?.addEventListener("click", () => show(i + 1));
    show(0);
  })();

  const answers = {
    default: "AnvasTech is a global technology company with 223,000+ people across 60 countries, focused on AI, engineering and cloud. Ask about AI Force, CloudSMART, engineering services, or careers.",
    ai: "AI Force is AnvasTech’s GenAI and Agentic AI platform. It automates software, data, IT operations and business processes so AI programs move from pilots to measurable outcomes.",
    cloud: "CloudSMART helps enterprises optimize cloud estates — accelerating migration, modernization and FinOps while keeping security and sovereignty in view.",
    career: "AnvasTech hires across AI, engineering, cloud and consulting in the Americas, EMEA, APAC and India. Visit Careers to explore roles and meet our people.",
    force: "AI Force 2.0 is an agentic and GenAI service transformation platform for governed automation across software, data, IT and business operations.",
  };
  const askForm = document.getElementById("ask-form");
  askForm?.addEventListener("submit", (e) => {
    e.preventDefault();
    const q = String(new FormData(e.target).get("q") || "").toLowerCase();
    const key = q.includes("force") ? "force" : q.includes("cloud") ? "cloud" : q.includes("career") || q.includes("job") ? "career" : q.includes("ai") ? "ai" : "default";
    const box = document.getElementById("ask-result");
    if (box) {
      box.classList.add("is-open");
      box.querySelector("h3").textContent = "Answer";
      box.querySelector("p").textContent = answers[key];
    }
  });

  const quotes = [...document.querySelectorAll("#clients [data-quote]")];
  const slides = [...document.querySelectorAll("#clients [data-slide]")];
  let q = 0;
  const showQ = (n) => {
    if (!quotes.length) return;
    q = (n + quotes.length) % quotes.length;
    quotes.forEach((el, i) => el.classList.toggle("is-active", i === q));
    slides.forEach((el, i) => {
      el.classList.toggle("is-active", i === q);
      const offset = (i - q + slides.length) % slides.length;
      if (offset === 0) el.removeAttribute("data-stack");
      else el.setAttribute("data-stack", String(offset));
    });
  };
  document.querySelector("#clients [data-q-prev]")?.addEventListener("click", () => showQ(q - 1));
  document.querySelector("#clients [data-q-next]")?.addEventListener("click", () => showQ(q + 1));
  showQ(0);

  (function bindCaseStudies() {
    const root = document.getElementById("case-studies");
    if (!root) return;
    const cards = [...root.querySelectorAll(".cs-card")];
    if (!cards.length) return;

    const reduce = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
    if (reduce) {
      cards.forEach((el) => el.classList.add("is-in"));
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (!entry.isIntersecting) return;
          entry.target.classList.add("is-in");
          io.unobserve(entry.target);
        });
      },
      { threshold: 0.2, rootMargin: "0px 0px -8% 0px" }
    );
    cards.forEach((el) => io.observe(el));
  })();

  (function bindAwardWeb() {
    const rootEl = document.querySelector(".award-web-inner");
    const svg = rootEl?.querySelector(".award-lines");
    if (!rootEl || !svg) return;

    const cols = [...rootEl.querySelectorAll(".award-col")];
    const NS = "http://www.w3.org/2000/svg";

    const elbow = (x1, y1, x2, y2) => {
      const dx = x2 - x1;
      const dy = y2 - y1;
      if (Math.abs(dx) < 2) return `M${x1} ${y1} V${y2}`;
      if (Math.abs(dy) < 2) return `M${x1} ${y1} H${x2}`;
      const mid = (x1 + x2) / 2;
      const r = Math.min(11, Math.abs(dx) / 2, Math.abs(dy) / 2);
      const sx = dx >= 0 ? 1 : -1;
      const sy = dy >= 0 ? 1 : -1;
      return `M${x1} ${y1} H${mid - r * sx} Q${mid} ${y1} ${mid} ${y1 + r * sy} V${y2 - r * sy} Q${mid} ${y2} ${mid + r * sx} ${y2} H${x2}`;
    };

    const draw = () => {
      const box = rootEl.getBoundingClientRect();
      const nodes = cols.map((col) =>
        [...col.querySelectorAll(".award-tile")].map((tile) => {
          const r = tile.getBoundingClientRect();
          return {
            x: r.left - box.left + r.width / 2,
            y: r.top - box.top + r.height / 2,
            l: r.left - box.left,
            t: r.top - box.top,
            w: r.width,
            h: r.height,
          };
        }).filter((n) => n.y > -140 && n.y < box.height + 140)
      );

      const d = [];
      nodes.forEach((col) => {
        for (let i = 0; i < col.length - 1; i++) {
          d.push(elbow(col[i].x, col[i].y + col[i].h / 2, col[i + 1].x, col[i + 1].y - col[i + 1].h / 2));
        }
      });
      for (let c = 0; c < nodes.length - 1; c++) {
        nodes[c].forEach((a) => {
          let best = null;
          let bestDist = Infinity;
          nodes[c + 1].forEach((b) => {
            const dist = Math.abs(a.y - b.y) + Math.abs(a.x - b.x) * 0.15;
            if (dist < bestDist) {
              bestDist = dist;
              best = b;
            }
          });
          if (best) d.push(elbow(a.x + a.w / 2, a.y, best.x - best.w / 2, best.y));
        });
      }

      svg.setAttribute("viewBox", `0 0 ${Math.max(1, box.width)} ${Math.max(1, box.height)}`);
      svg.setAttribute("preserveAspectRatio", "none");
      svg.replaceChildren();
      d.forEach((path) => {
        const el = document.createElementNS(NS, "path");
        el.setAttribute("d", path);
        svg.appendChild(el);
      });
    };

    let running = true;
    const tick = () => {
      draw();
      requestAnimationFrame(tick);
    };
    tick();
  })();

  (function bindCineScroll() {
    const host = document.querySelector(".cine-career");
    const track = host?.querySelector(".cine-track");
    const sticky = host?.querySelector(".cine-sticky");
    const copy = host?.querySelector(".cine-copy-window");
    if (!host || !track || !sticky) return;
    const desktop = window.matchMedia("(min-width: 901px)");
    let raf = 0;
    const apply = () => {
      raf = 0;
      if (!desktop.matches) {
        host.style.removeProperty("--cine");
        host.style.removeProperty("--cine-in");
        copy?.classList.add("is-on");
        return;
      }
      const run = track.offsetHeight - window.innerHeight;
      if (run <= 0) {
        host.style.setProperty("--cine", "1");
        host.style.setProperty("--cine-in", "1");
        copy?.classList.add("is-on");
        return;
      }
      const p = Math.min(1, Math.max(0, -track.getBoundingClientRect().top / run));
      const shrink = Math.min(1, p / 0.4);
      const fade = Math.min(1, Math.max(0, (p - 0.34) / 0.16));
      host.style.setProperty("--cine", String(shrink));
      host.style.setProperty("--cine-in", String(fade));
      copy?.classList.toggle("is-on", fade > 0.85);
    };
    const onScroll = () => {
      if (!raf) raf = requestAnimationFrame(apply);
    };
    window.addEventListener("scroll", onScroll, { passive: true, capture: true });
    document.addEventListener("scroll", onScroll, { passive: true });
    window.addEventListener("resize", onScroll);
    desktop.addEventListener("change", onScroll);
    apply();
  })();

  (function bindSolSticky() {
    const root = document.getElementById("solutions");
    if (!root) return;
    const title = root.querySelector(".sol-sticky-title");
    const tag = root.querySelector(".sol-tag");
    if (!title) return;

    const size = () => {
      // Sticky stack is desktop-only; clear vars so mobile/tablet CSS stays clean.
      if (window.matchMedia("(max-width: 1200px)").matches) {
        root.style.removeProperty("--sol-head-top");
        root.style.removeProperty("--sol-head-h");
        root.style.removeProperty("--sol-card-h");
        return;
      }
      const vis = (tag ? tag.offsetHeight + 20 : 0) + title.offsetHeight + 32;
      root.style.setProperty("--sol-head-top", "88px");
      root.style.setProperty("--sol-head-h", `${vis}px`);
      root.style.setProperty("--sol-card-h", "437px");
    };

    size();
    window.addEventListener("resize", size);
  })();

  document.getElementById("news-form")?.addEventListener("submit", (e) => {
    e.preventDefault();
    const note = document.getElementById("news-note");
    if (note) {
      note.hidden = false;
      note.textContent = "You are subscribed to AnvasTech Trends and Insights.";
    }
    e.target.reset();
  });

  const params = new URLSearchParams(location.search);
  if (params.get("q") && askForm) {
    askForm.q.value = params.get("q");
    askForm.dispatchEvent(new Event("submit"));
  }
})();
