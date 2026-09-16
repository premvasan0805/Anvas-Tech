(function () {
  const root = document.body.dataset.root || ".";
  const asset = (p) => `${root}/assets/${p}`;

  const megaWhat = `
    <div class="mega mega-3">
      <div>
        <h4>AI &amp; Intelligent Systems</h4>
        <a href="${root}/generative-ai.html">Generative AI</a>
        <a href="${root}/ai-agents.html">AI Agents</a>
        <a href="${root}/ai-assisted-automation.html">Intelligent Automation</a>
        <a href="${root}/ai-assisted-engineering.html">AI-Assisted Development</a>
      </div>
      <div>
        <h4>Product &amp; Software Engineering</h4>
        <a href="${root}/product-engineering.html">Product Development</a>
        <a href="${root}/web-applications.html">Web Applications</a>
        <a href="${root}/mobile-applications.html">Mobile Applications</a>
        <a href="${root}/ui-ux-product-design.html">UI/UX &amp; Product Design</a>
      </div>
      <div>
        <h4>Business &amp; Digital Solutions</h4>
        <a href="${root}/custom-software-development.html">Custom Software Development</a>
        <a href="${root}/intelligent-workflows.html">Business Automation</a>
        <a href="${root}/data-ai-engineering.html">Data &amp; Analytics</a>
        <a href="${root}/digital-solutions.html">Digital Solutions</a>
      </div>
    </div>`;

  const megaInd = `
    <div class="mega mega-3">
      <div>
        <h4>Products</h4>
        <a href="${root}/vishful.html">Vishful<span class="mega-note">Property &amp; Co-Living Management</span></a>
        <a href="${root}/vishful-attendance.html">Vishful Attendance<span class="mega-note">Face-Scan Workforce Attendance</span></a>
        <a href="${root}/anvas-comet.html">Anvas Comet<span class="mega-note">Business Operations Platform</span></a>
        <a href="${root}/mla-calendar.html">MLA Calendar<span class="mega-note">Calendar &amp; Constituency Management</span></a>
      </div>
      <div>
        <h4>AI &amp; Intelligent Products</h4>
        <a href="${root}/kubera-ai.html">Kubera AI<span class="mega-note">AI-powered trading &amp; strategy platform</span></a>
        <a href="${root}/elegal.html">eLegal<span class="mega-note">AI-powered property legal intelligence</span></a>
      </div>
      <div>
        <h4>Digital Platforms</h4>
        <a href="${root}/fintech-platform.html">FinTech Platform<span class="mega-note">Financial technology platform</span></a>
        <a href="${root}/anvas-logistics.html">Anvas Logistics<span class="mega-note">Logistics operations platform</span></a>
        <a href="${root}/ungal-pakkam.html">Ungal Pakkam &ndash; Manu System<span class="mega-note">Digital public-facing platform</span></a>
        <a href="${root}/tn-ihip.html">eHealth / TN-IHIP<span class="mega-note">Digital healthcare platform</span></a>
      </div>
    </div>`;

  const megaWho = `
    <div class="mega mega-3">
      <div>
        <h4>Company</h4>
        <a href="${root}/who-we-are.html">About AnvasTech</a>
        <a href="${root}/who-we-are.html#story">Our Story</a>
        <a href="${root}/who-we-are.html#approach">Our Approach</a>
        <a href="${root}/who-we-are.html#leadership">Leadership</a>
      </div>
      <div>
        <h4>How We Build</h4>
        <a href="${root}/product-engineering.html">Product Engineering</a>
        <a href="${root}/ai-assisted-engineering.html">AI-Assisted Engineering</a>
        <a href="${root}/ai-development-workspace.html">Our Development Approach</a>
        <a href="${root}/technology-excellence.html">Technology &amp; Innovation</a>
      </div>
      <div>
        <h4>Our Work</h4>
        <a href="${root}/industries.html">Products We Build</a>
        <a href="${root}/what-we-do.html">Solutions We Deliver</a>
        <a href="${root}/what-we-do.html#industries">Industries We Work In</a>
        <a href="${root}/case-studies.html">Our Projects</a>
      </div>
    </div>`;

  const megaRes = `
    <div class="mega mega-3">
      <div>
        <h4>Insights</h4>
        <a href="${root}/resources.html#ai-hub">AI Intelligence Hub</a>
        <a href="${root}/resources.html#technology-insights">Technology Insights</a>
        <a href="${root}/resources.html#engineering-insights">Engineering Insights</a>
      </div>
      <div>
        <h4>Research &amp; Reports</h4>
        <a href="${root}/resources.html#ai-research">AI Research</a>
        <a href="${root}/resources.html#technology-reports">Technology Reports</a>
      </div>
      <div>
        <h4>Projects &amp; Stories</h4>
        <a href="${root}/case-studies.html">Case Studies</a>
        <a href="${root}/resources.html#project-stories">Project Stories</a>
      </div>
    </div>`;

  const megaCar = `
    <div class="mega mega-2">
      <div>
        <h4>Careers</h4>
        <a href="${root}/careers.html">Careers Overview</a>
        <a href="${root}/careers.html#why">Why AnvasTech</a>
        <a href="${root}/careers.html#internships">Internships</a>
        <a href="${root}/careers.html#positions">Open Positions</a>
        <a href="${root}/careers.html#resume">Submit Your Resume</a>
      </div>
      <div>
        <h4>Work With Us</h4>
        <a href="${root}/careers.html#software-engineering">Software Engineering</a>
        <a href="${root}/careers.html#ai-engineering">AI &amp; Engineering</a>
        <a href="${root}/careers.html#product-design">Product &amp; Design</a>
        <a href="${root}/careers.html#business-operations">Business &amp; Operations</a>
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
          <h4><button class="foot-acc" type="button" aria-expanded="true"><span>Solutions</span><i class="foot-chev" aria-hidden="true"></i></button></h4>
          <div class="foot-links">
          <a href="${root}/what-we-do.html#anvas-logistics">Anvas Logistics</a>
          <a href="${root}/what-we-do.html#anvas-comet">Anvas Comet</a>
          <a href="${root}/what-we-do.html#fintech-platform">FinTech Platform</a>
          <a href="${root}/what-we-do.html#kubera-ai">Kubera AI</a>
          <a href="${root}/what-we-do.html#elegal">eLegal</a>
          <a href="${root}/what-we-do.html#ungal-pakkam">Ungal Pakkam – Manu System</a>
          <a href="${root}/what-we-do.html#mla-calendar">MLA Calendar</a>
          </div>
        </div>
        <div>
          <h4><button class="foot-acc" type="button" aria-expanded="true"><span>Products</span><i class="foot-chev" aria-hidden="true"></i></button></h4>
          <div class="foot-links">
          <a href="${root}/vishful.html">Vishful</a>
          <a href="${root}/vishful-attendance.html">Vishful Attendance</a>
          <a href="${root}/anvas-comet.html">Anvas Comet</a>
          <a href="${root}/anvas-logistics.html">Anvas Logistics</a>
          <a href="${root}/fintech-platform.html">FinTech Platform</a>
          <a href="${root}/kubera-ai.html">Kubera AI</a>
          <a href="${root}/elegal.html">eLegal</a>
          <a href="${root}/mla-calendar.html">MLA Calendar</a>
          <a href="${root}/ungal-pakkam.html">Ungal Pakkam &ndash; Manu System</a>
          <a href="${root}/tn-ihip.html">eHealth / TN-IHIP</a>
          <a href="${root}/industries.html">View all products &rarr;</a>
          </div>
        </div>
        <div>
          <h4><button class="foot-acc" type="button" aria-expanded="true"><span>Who We Are</span><i class="foot-chev" aria-hidden="true"></i></button></h4>
          <div class="foot-links">
          <a href="${root}/who-we-are.html">About AnvasTech</a>
          <a href="${root}/who-we-are.html#leadership">Our Approach to Leadership</a>
          <a href="${root}/who-we-are.html#story">Our Story</a>
          <a href="${root}/careers.html">Careers</a>
          <a href="${root}/who-we-are.html#our-work">What We Build</a>
          <a href="${root}/resources.html">AI Intelligence Hub</a>
          </div>
        </div>
        <div>
          <h4><button class="foot-acc" type="button" aria-expanded="true"><span>Careers</span><i class="foot-chev" aria-hidden="true"></i></button></h4>
          <div class="foot-links">
          <a href="${root}/careers.html">Careers Overview</a>
          <a href="${root}/careers.html#why">Why AnvasTech</a>
          <a href="${root}/careers.html#positions">Open Positions</a>
          <a href="${root}/careers.html#resume">Submit Your Resume</a>
          <a href="${root}/contact.html">Contact Us</a>
          <a href="${root}/case-studies.html">Case Studies</a>
          </div>
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
    let leaveTimer = 0;
    const resetMore = () => {
      item.querySelectorAll("[data-mega-more]").forEach((btn) => {
        const more = btn.previousElementSibling?.classList?.contains("mega-more")
          ? btn.previousElementSibling
          : btn.parentElement?.querySelector(".mega-more");
        if (more) more.hidden = true;
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "View all projects →";
        btn.hidden = false;
      });
    };
    const open = () => {
      window.clearTimeout(leaveTimer);
      document.querySelectorAll("[data-mega]").forEach((el) => {
        if (el !== item) el.classList.remove("open");
      });
      item.classList.add("open");
    };
    const close = () => {
      item.classList.remove("open");
      resetMore();
    };
    const scheduleClose = () => {
      window.clearTimeout(leaveTimer);
      leaveTimer = window.setTimeout(close, 120);
    };
    item.addEventListener("mouseenter", open);
    item.addEventListener("mouseleave", scheduleClose);
    item.querySelector(".nav-link")?.addEventListener("focus", open);
    item.querySelector(".nav-link")?.addEventListener("blur", () => {
      window.setTimeout(() => {
        if (!item.contains(document.activeElement)) close();
      }, 0);
    });
  });

  document.querySelectorAll("[data-mega-more]").forEach((btn) => {
    btn.addEventListener("click", (e) => {
      e.preventDefault();
      e.stopPropagation();
      const more = btn.parentElement?.querySelector(".mega-more");
      if (!more) return;
      more.hidden = false;
      btn.setAttribute("aria-expanded", "true");
      btn.hidden = true;
    });
  });

  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      document.querySelectorAll("[data-mega].open").forEach((el) => el.classList.remove("open"));
      document.querySelectorAll(".mega-more").forEach((el) => {
        el.hidden = true;
      });
      document.querySelectorAll("[data-mega-more]").forEach((btn) => {
        btn.hidden = false;
        btn.setAttribute("aria-expanded", "false");
        btn.textContent = "View all projects →";
      });
    }
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
  const setMenu = (open) => {
    if (!toggle) return;
    toggle.classList.toggle("is-open", open);
    toggle.setAttribute("aria-expanded", open ? "true" : "false");
    toggle.setAttribute("aria-label", open ? "Close menu" : "Open menu");
    if (mobile) {
      mobile.hidden = !open;
      mobile.style.display = open ? "block" : "none";
    }
  };
  toggle?.setAttribute("aria-expanded", "false");
  toggle?.setAttribute("aria-controls", "mobile-nav");
  toggle?.addEventListener("click", () => setMenu(!toggle.classList.contains("is-open")));
  mobile?.querySelectorAll("a").forEach((a) => a.addEventListener("click", () => setMenu(false)));
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape" && toggle?.classList.contains("is-open")) {
      setMenu(false);
      toggle.focus();
    }
  });
  // Close the menu if the viewport grows back past the compact-nav breakpoint.
  window.addEventListener(
    "resize",
    () => {
      if (window.innerWidth > 1199 && toggle?.classList.contains("is-open")) setMenu(false);
    },
    { passive: true }
  );

  // Footer columns collapse into an accordion on phones only.
  (function footAccordion() {
    const accs = Array.from(document.querySelectorAll(".foot-acc"));
    if (!accs.length) return;
    const isPhone = () => document.documentElement.classList.contains("is-phone");
    const sync = () => {
      const phone = isPhone();
      accs.forEach((btn) => {
        // Expanded (and inert) on tablet/desktop so every link stays reachable.
        if (!phone) btn.setAttribute("aria-expanded", "true");
        else if (!btn.dataset.touched) btn.setAttribute("aria-expanded", "false");
      });
    };
    accs.forEach((btn) => {
      btn.addEventListener("click", () => {
        if (!isPhone()) return;
        btn.dataset.touched = "1";
        btn.setAttribute(
          "aria-expanded",
          btn.getAttribute("aria-expanded") === "true" ? "false" : "true"
        );
      });
    });
    sync();
    window.addEventListener("resize", sync, { passive: true });
  })();

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
    default: "AnvasTech is a product and technology company. We build our own digital products — Vishful, Vishful Attendance, eLegal, Anvas Logistics, Anvas Comet, FinTech, TN-IHIP and Kubera AI — and deliver software solutions for businesses. Ask about our products, solutions, or careers.",
    ai: "We build AI into the products we ship: document intelligence and title-chain analysis in eLegal, AI-assisted strategy creation in Kubera AI, and AI-assisted business workflows in Anvas Comet. We also use AI-assisted development tools such as Claude and Cursor to build faster.",
    cloud: "Cloud and digital infrastructure is one of our four solution areas: cloud architecture, deployment, integrations, scalability and reliable infrastructure. See Solutions for what that covers.",
    career: "AnvasTech hires across engineering, product and design. Visit Careers to see open positions and submit your resume.",
    force: "AnvasTech builds eight products across property, workforce, legal, logistics, commercial operations, fintech, healthcare and AI trading. See Products for the full list.",
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

  (function bindStepNav() {
    // Process pills: selecting one shows that step's detail in the panel below.
    document.querySelectorAll("[data-step-nav]").forEach((root) => {
      const btns = [...root.querySelectorAll("[data-step]")];
      const panel = root.querySelector("[data-step-panel]");
      if (!btns.length || !panel) return;
      const num = panel.querySelector("[data-step-num]");
      const title = panel.querySelector("[data-step-title]");
      const desc = panel.querySelector("[data-step-desc]");

      const show = (i) => {
        btns.forEach((b, j) => {
          const on = i === j;
          b.setAttribute("aria-selected", on ? "true" : "false");
          b.tabIndex = on ? 0 : -1;
        });
        const b = btns[i];
        if (num) num.textContent = String(i + 1).padStart(2, "0");
        if (title) title.textContent = b.dataset.stepTitle || b.textContent.trim();
        if (desc) desc.textContent = b.dataset.stepDesc || "";
      };

      btns.forEach((b, i) => {
        b.addEventListener("click", () => show(i));
        b.addEventListener("keydown", (e) => {
          const step = e.key === "ArrowRight" ? 1 : e.key === "ArrowLeft" ? -1 : 0;
          if (!step) return;
          e.preventDefault();
          const n = (i + step + btns.length) % btns.length;
          show(n);
          btns[n].focus();
        });
      });

      show(0);
    });
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
