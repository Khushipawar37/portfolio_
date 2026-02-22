"use client";

import { useEffect, useRef, useState, useCallback } from "react";

/* ================================================================
   STATIC DATA
   ================================================================ */
const NAV_ITEMS = ["About", "Stack", "Work", "Experience", "Contact"];

const MARQUEE_WORDS = [
  "React","Next.js","TypeScript","Node.js","PostgreSQL",
  "Docker","AWS","GraphQL","TailwindCSS","Redis","Kubernetes","Prisma",
];

const TECH_CATEGORIES = [
  {
    label: "01 / FRONTEND",
    name: "Frontend",
    emoji: "🖥️",
    skills: [
      { icon: "⚛️", name: "React" },
      { icon: "▲",  name: "Next.js" },
      { icon: "🔷", name: "TypeScript" },
      { icon: "🎨", name: "Tailwind" },
      { icon: "⚡", name: "Vite" },
      { icon: "🌐", name: "Vue.js" },
      { icon: "🎭", name: "Framer" },
      { icon: "📦", name: "Redux" },
    ],
  },
  {
    label: "02 / BACKEND",
    name: "Backend",
    emoji: "⚙️",
    skills: [
      { icon: "🟢", name: "Node.js" },
      { icon: "🚂", name: "Express" },
      { icon: "🐍", name: "Python" },
      { icon: "🦅", name: "NestJS" },
      { icon: "🐘", name: "PostgreSQL" },
      { icon: "🍃", name: "MongoDB" },
      { icon: "⚡", name: "Redis" },
      { icon: "📡", name: "GraphQL" },
    ],
  },
  {
    label: "03 / DEVOPS & CLOUD",
    name: "DevOps & Cloud",
    emoji: "☁️",
    skills: [
      { icon: "🐳", name: "Docker" },
      { icon: "☸",  name: "Kubernetes" },
      { icon: "🟠", name: "AWS" },
      { icon: "🔵", name: "Azure" },
      { icon: "🔁", name: "CI/CD" },
      { icon: "📊", name: "Terraform" },
      { icon: "🔍", name: "Datadog" },
      { icon: "🌊", name: "Vercel" },
    ],
  },
  {
    label: "04 / DATABASES",
    name: "Databases & Tools",
    emoji: "🗄️",
    skills: [
      { icon: "🐘", name: "PostgreSQL" },
      { icon: "🍃", name: "MongoDB" },
      { icon: "⚡", name: "Redis" },
      { icon: "🔷", name: "Prisma" },
      { icon: "🔍", name: "Elastic" },
      { icon: "📬", name: "RabbitMQ" },
      { icon: "📋", name: "Jira" },
      { icon: "🎯", name: "Figma" },
    ],
  },
];

const PROJECTS = [
  {
    num: "01", emoji: "🛍️", title: "EcoMart",
    desc: "Full-stack e-commerce platform with real-time inventory, Stripe payments, admin dashboard, and multi-vendor support. Handles 10k+ daily transactions.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    demo: "#", github: "#",
  },
  {
    num: "02", emoji: "💬", title: "Synapse",
    desc: "Real-time collaborative workspace with live document editing, video calls, nested docs, and permission management. Built for distributed remote teams.",
    tags: ["React", "Socket.io", "Redis", "AWS"],
    demo: "#", github: "#",
  },
  {
    num: "03", emoji: "📊", title: "DataLens",
    desc: "Enterprise analytics platform with custom chart builder, automated reports, anomaly detection, and multi-source data connectors for business intelligence.",
    tags: ["Vue.js", "Python", "FastAPI", "D3.js"],
    demo: "#", github: "#",
  },
  {
    num: "04", emoji: "🤖", title: "Dockie",
    desc: "RAG-based AI document assistant. Upload PDFs or links and chat with your data. Supports multi-session memory, document export, and team sharing.",
    tags: ["Next.js", "OpenAI", "LangChain", "Pinecone"],
    demo: "#", github: "#",
  },
  {
    num: "05", emoji: "🏠", title: "NestFind",
    desc: "Cross-platform real estate app with map-based search, 3D virtual tours, mortgage calculator, and secure document signing flow.",
    tags: ["React Native", "NestJS", "MongoDB"],
    demo: "#", github: "#",
  },
  {
    num: "06", emoji: "📋", title: "FlowBoard",
    desc: "Visual project management tool with kanban boards, timeline views, automated workflow triggers, and team productivity analytics dashboard.",
    tags: ["React", "TypeScript", "Zustand", "Supabase"],
    demo: "#", github: "#",
  },
];

const EXPERIENCES = [
  {
    period: "2023 — Present",
    company: "Veritas Tech",
    role: "Senior Full Stack Engineer",
    desc: "Led a team of 5 engineers to rebuild a legacy monolith into a microservices architecture. Improved system performance by 60% and reduced deployment time from 4 hours to 15 minutes with a new CI/CD pipeline.",
    skills: ["Next.js", "NestJS", "AWS", "Docker", "PostgreSQL"],
  },
  {
    period: "2021 — 2023",
    company: "Axiom Labs",
    role: "Full Stack Developer",
    desc: "Developed and maintained 3 production SaaS products. Introduced TypeScript across the codebase, reducing the bug rate by 40%. Built a reusable component library adopted by 8 product teams company-wide.",
    skills: ["React", "Node.js", "TypeScript", "GraphQL"],
  },
  {
    period: "2020 — 2021",
    company: "Freelance",
    role: "Frontend Developer",
    desc: "Delivered 15+ projects for clients across fintech, healthcare, and e-commerce. Specialized in React single-page applications and interactive data visualizations built with D3.js.",
    skills: ["React", "Vue", "D3.js", "Firebase"],
  },
];

/* ================================================================
   TINY UTILS
   ================================================================ */
function lerp(a: number, b: number, t: number): number {
  return a + (b - a) * t;
}
function clamp(v: number, lo: number, hi: number): number {
  return Math.max(lo, Math.min(hi, v));
}

/* ================================================================
   INLINE SVG ICONS
   ================================================================ */
function IconMail() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}>
      <rect x="2" y="4" width="20" height="16" rx="2"/>
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7"/>
    </svg>
  );
}
function IconLinkedIn() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z"/>
    </svg>
  );
}
function IconGitHub() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z"/>
    </svg>
  );
}
function IconSend() {
  return (
    <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <path d="M22 2 11 13"/>
      <path d="M22 2 15 22 11 13 2 9l20-7z"/>
    </svg>
  );
}

/* ================================================================
   MAIN PAGE COMPONENT
   ================================================================ */
export default function PortfolioPage() {
  /* ---- STATE ---- */
  const [theme, setTheme]         = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen]   = useState(false);
  const [scrolled, setScrolled]   = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [sent, setSent]           = useState(false);

  /* ---- DOM REFS ---- */
  const cursorDotRef      = useRef<HTMLDivElement>(null);
  const cursorRingRef     = useRef<HTMLDivElement>(null);
  const progressBarRef    = useRef<HTMLDivElement>(null);
  const stackOuterRef     = useRef<HTMLDivElement>(null);
  const card3dStageRef    = useRef<HTMLDivElement>(null);
  const techCardRef       = useRef<HTMLDivElement>(null);
  const projOuterRef      = useRef<HTMLDivElement>(null);
  const projTrackRef      = useRef<HTMLDivElement>(null);
  const projProgFillRef   = useRef<HTMLDivElement>(null);
  const contactOuterRef   = useRef<HTMLDivElement>(null);
  const contactTopRef     = useRef<HTMLDivElement>(null);
  const contactBotRef     = useRef<HTMLDivElement>(null);
  const contactFormRef    = useRef<HTMLDivElement>(null);

  /* ---- SMOOTH ANIMATION STATE (kept in ref to avoid re-renders) ---- */
  const anim = useRef({
    /* cursor */
    mx: 0, my: 0, rx: 0, ry: 0,
    /* scroll sections */
    stackTarget: 0, stackCur: 0,
    projTarget:  0, projCur:  0,
    contTarget:  0, contCur:  0,
    /* misc */
    prevCat: -1,
  });

  /* ================================================================
     THEME TOGGLE
     ================================================================ */
  const toggleTheme = useCallback(() => {
    setTheme(prev => {
      const next = prev === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("light", next === "light");
      return next;
    });
  }, []);

  /* ================================================================
     SMOOTH SCROLL TO SECTION
     ================================================================ */
  const scrollToSection = useCallback((id: string) => {
    setMenuOpen(false);
    const el = document.getElementById(id);
    if (el) el.scrollIntoView({ behavior: "smooth" });
  }, []);

  /* ================================================================
     SCROLL LISTENER — updates target values only
     ================================================================ */
  useEffect(() => {
    const handler = () => {
      const sy  = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;

      /* progress bar */
      if (progressBarRef.current) {
        progressBarRef.current.style.width = (max > 0 ? (sy / max) * 100 : 0) + "%";
      }

      /* nav bg */
      setScrolled(sy > 60);

      /* stack section progress */
      if (stackOuterRef.current) {
        const r = stackOuterRef.current.getBoundingClientRect();
        const h = stackOuterRef.current.offsetHeight - window.innerHeight;
        anim.current.stackTarget = clamp(h > 0 ? -r.top / h : 0, 0, 1);
      }

      /* projects section progress */
      if (projOuterRef.current) {
        const r = projOuterRef.current.getBoundingClientRect();
        const h = projOuterRef.current.offsetHeight - window.innerHeight;
        anim.current.projTarget = clamp(h > 0 ? -r.top / h : 0, 0, 1);
      }

      /* contact section progress */
      if (contactOuterRef.current) {
        const r = contactOuterRef.current.getBoundingClientRect();
        const h = contactOuterRef.current.offsetHeight - window.innerHeight;
        anim.current.contTarget = clamp(h > 0 ? -r.top / h : 0, 0, 1);
      }
    };

    window.addEventListener("scroll", handler, { passive: true });
    return () => window.removeEventListener("scroll", handler);
  }, []);

  /* ================================================================
     CURSOR MOUSE MOVE
     ================================================================ */
  useEffect(() => {
    const handler = (e: MouseEvent) => {
      anim.current.mx = e.clientX;
      anim.current.my = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top  = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", handler);
    return () => document.removeEventListener("mousemove", handler);
  }, []);

  /* ================================================================
     CURSOR HOVER EXPAND
     ================================================================ */
  useEffect(() => {
    const on  = () => document.body.classList.add("cursor-expand");
    const off = () => document.body.classList.remove("cursor-expand");
    const sel = "a, button, .project-card, .skill-item, .stat-box";
    const add = () => {
      document.querySelectorAll(sel).forEach(el => {
        el.addEventListener("mouseenter", on);
        el.addEventListener("mouseleave", off);
      });
    };
    add();
    const mo = new MutationObserver(add);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => { mo.disconnect(); document.querySelectorAll(sel).forEach(el => { el.removeEventListener("mouseenter", on); el.removeEventListener("mouseleave", off); }); };
  }, []);

  /* ================================================================
     SCROLL REVEAL OBSERVER
     ================================================================ */
  useEffect(() => {
    const els = document.querySelectorAll<HTMLElement>(".reveal");
    const obs = new IntersectionObserver(entries => {
      entries.forEach(e => {
        if (e.isIntersecting) {
          e.target.classList.add("visible");
          obs.unobserve(e.target);
        }
      });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* ================================================================
     RAF ANIMATION LOOP — smooth scroll driven animations
     ================================================================ */
  useEffect(() => {
    let rafId = 0;
    const TOTAL   = TECH_CATEGORIES.length;
    const CARD_W  = 420 + 24; /* card width + gap */

    const frame = () => {
      const a = anim.current;

      /* ---------- cursor ring ---------- */
      a.rx = lerp(a.rx, a.mx, 0.1);
      a.ry = lerp(a.ry, a.my, 0.1);
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = a.rx + "px";
        cursorRingRef.current.style.top  = a.ry + "px";
      }

      /* ---------- TECH STACK 3D ---------- */
      a.stackCur = lerp(a.stackCur, a.stackTarget, 0.08);
      const seg   = 1 / TOTAL;
      const cat   = clamp(Math.floor(a.stackCur * TOTAL), 0, TOTAL - 1);
      const local = clamp((a.stackCur - cat * seg) / seg, 0, 1);

      /* update React state only when category changes */
      if (cat !== a.prevCat) {
        a.prevCat = cat;
        setActiveCat(cat);
      }

      if (card3dStageRef.current) {
        const entryY = (1 - clamp(local * 2.5, 0, 1)) * 60;
        const exitY  = clamp(local * 2.5 - 1, 0, 1) * -60;
        const sc     = 0.87 + local * 0.13 - clamp((local - 0.55) * 0.07, 0, 0.07);
        const op     = clamp(local * 10, 0, 1) * (1 - clamp((local - 0.8) * 6, 0, 1));
        const rx     = (1 - local) * 16 - local * 9;
        card3dStageRef.current.style.transform = `translateY(${entryY + exitY}px) scale(${sc}) rotateX(${rx}deg)`;
        card3dStageRef.current.style.opacity   = String(Math.max(0, op));
      }

      /* ---------- PROJECTS HORIZONTAL ---------- */
      a.projCur = lerp(a.projCur, a.projTarget, 0.08);
      if (projTrackRef.current) {
        const vw     = window.innerWidth;
        const totalW = PROJECTS.length * CARD_W - 24 - (vw - 160);
        const xOff   = -a.projCur * Math.max(0, totalW);
        projTrackRef.current.style.transform = `translateX(${xOff}px)`;
      }
      if (projProgFillRef.current) {
        projProgFillRef.current.style.width = (a.projCur * 100) + "%";
      }

      /* ---------- CONTACT SPLIT ---------- */
      a.contCur = lerp(a.contCur, a.contTarget, 0.07);
      const splitAmt = clamp(a.contCur * 2.8, 0, 1);
      const formVis  = clamp((a.contCur - 0.3) * 3.2, 0, 1);

      if (contactTopRef.current)
        contactTopRef.current.style.transform = `translateY(${-splitAmt * 100}%)`;
      if (contactBotRef.current)
        contactBotRef.current.style.transform = `translateY(${splitAmt * 100}%)`;
      if (contactFormRef.current) {
        contactFormRef.current.style.opacity       = String(formVis);
        contactFormRef.current.style.transform     = `scale(${0.91 + formVis * 0.09}) translateY(${(1 - formVis) * 38}px)`;
        contactFormRef.current.style.pointerEvents = formVis > 0.45 ? "auto" : "none";
      }

      rafId = requestAnimationFrame(frame);
    };

    rafId = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(rafId);
  }, []);

  /* ================================================================
     TECH CARD MOUSE TILT
     ================================================================ */
  const handleCardMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!techCardRef.current) return;
    const r  = techCardRef.current.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width  - 0.5;
    const cy = (e.clientY - r.top)  / r.height - 0.5;
    techCardRef.current.style.transform = `rotateX(${cy * -11}deg) rotateY(${cx * 11}deg)`;
  }, []);

  const handleCardMouseLeave = useCallback(() => {
    if (techCardRef.current)
      techCardRef.current.style.transform = "rotateX(0deg) rotateY(0deg)";
  }, []);

  /* ================================================================
     FORM SUBMIT
     ================================================================ */
  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3200);
  }, []);

  /* ================================================================
     CURRENT TECH CATEGORY DATA
     ================================================================ */
  const cat = TECH_CATEGORIES[activeCat];

  /* ================================================================
     RENDER
     ================================================================ */
  return (
    <>
      {/* ─────────── CURSOR ─────────── */}
      <div className="cursor-dot"  ref={cursorDotRef}  />
      <div className="cursor-ring" ref={cursorRingRef} />

      {/* ─────────── SCROLL PROGRESS ─────────── */}
      <div className="scroll-progress" ref={progressBarRef} />

      {/* ═══════════════════════════════════════
          NAVBAR
          ═══════════════════════════════════════ */}
      <nav className={`navbar${scrolled ? " scrolled" : ""}`}>
        <button className="nav-logo" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="nav-logo-dim">&lt;</span>YourName<span className="nav-logo-dim">/&gt;</span>
        </button>

        <div className="nav-center">
          {NAV_ITEMS.map(item => (
            <button key={item} className="nav-btn" onClick={() => scrollToSection(item.toLowerCase())}>
              {item}
            </button>
          ))}
        </div>

        <div className="nav-right">
          <button className="nav-theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀ Light" : "☾ Dark"}
          </button>
          <button className="nav-hire-btn" onClick={() => scrollToSection("contact")}>
            Hire Me
          </button>
          <button
            className="hamburger"
            onClick={() => setMenuOpen(o => !o)}
            aria-label="Toggle menu"
          >
            <span className="hamburger-line" style={{ transform: menuOpen ? "rotate(45deg) translateY(6px)" : undefined }} />
            <span className="hamburger-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="hamburger-line" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6px)" : undefined }} />
          </button>
        </div>
      </nav>

      {/* ─────────── MOBILE MENU ─────────── */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <button key={item} className="mobile-nav-btn" onClick={() => scrollToSection(item.toLowerCase())}>
            {item}
          </button>
        ))}
        <button className="nav-theme-btn" style={{ marginTop: 20 }} onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "☾ Dark"}
        </button>
      </div>

      {/* ═══════════════════════════════════════
          HERO
          ═══════════════════════════════════════ */}
      <section className="hero-section">
        <div className="hero-grid-bg" />

        <div className="hero-content">
          <div className="hero-badge">
            <span className="hero-badge-dot" />
            Available for work &nbsp;·&nbsp; Full Stack Developer
          </div>

          <h1 className="hero-title">
            {[
              { text: "Building",           dim: false },
              { text: "Digital Experiences", dim: false },
              { text: "From Scratch.",       dim: true  },
            ].map((line, i) => (
              <span key={i} className="hero-title-line">
                <span
                  className="hero-title-inner"
                  style={{
                    animationDelay: `${i * 0.13}s`,
                    opacity: line.dim ? 0.24 : 1,
                  }}
                >
                  {line.text}
                </span>
              </span>
            ))}
          </h1>

          <p className="hero-description">
            Full-stack developer crafting scalable web apps with clean code,
            thoughtful architecture, and pixel-perfect interfaces.
          </p>

          <div className="hero-actions">
            <button className="btn-primary" onClick={() => scrollToSection("work")}>
              View My Work →
            </button>
            <button className="btn-ghost" onClick={() => scrollToSection("contact")}>
              Get in touch
            </button>
          </div>
        </div>

        {/* Socials sidebar */}
        <div className="hero-socials">
          <div className="hero-socials-line" />
          {["GitHub", "LinkedIn", "Twitter"].map(s => (
            <a key={s} href="#" className="hero-social-link">{s}</a>
          ))}
          <div className="hero-socials-line" />
        </div>

        <div className="hero-scroll-hint">
          <div className="scroll-hint-line" />
          SCROLL
        </div>
        <div className="hero-year">© 2025</div>
      </section>

      {/* ═══════════════════════════════════════
          MARQUEE
          ═══════════════════════════════════════ */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="marquee-item">
              {w} <span className="marquee-sep">·</span>
            </span>
          ))}
        </div>
      </div>

      {/* ═══════════════════════════════════════
          ABOUT
          ═══════════════════════════════════════ */}
      <section id="about" className="about-section">
        <div className="about-inner">
          <div className="reveal from-left">
            <div className="section-label">ABOUT ME</div>
            <h2 className="section-title" style={{ marginBottom: 26 }}>
              Code is my<br />
              <span style={{ opacity: 0.23 }}>craft</span>
            </h2>
            <p>
              I&apos;m a full-stack developer with a passion for building products
              that live at the intersection of engineering and design. I care deeply
              about performance, accessibility, and developer experience.
            </p>
            <p>
              With 4+ years of experience, I&apos;ve worked across the entire stack —
              from pixel-perfect UIs to robust backend systems, CI/CD pipelines,
              and cloud infrastructure.
            </p>
          </div>

          <div className="about-stats-grid">
            {[
              { n: "4+",  l: "Years of Experience" },
              { n: "30+", l: "Projects Shipped" },
              { n: "12+", l: "Clients Worldwide" },
              { n: "99%", l: "Client Satisfaction" },
            ].map((s, i) => (
              <div key={s.l} className={`stat-box reveal d${i + 1}`}>
                <div className="stat-number">{s.n}</div>
                <div className="stat-text">{s.l}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          TECH STACK — 3D PARALLAX CARD SCROLL
          ═══════════════════════════════════════ */}
      <div
        id="stack"
        className="stack-section"
        ref={stackOuterRef}
        style={{ height: `${TECH_CATEGORIES.length * 130}vh` }}
      >
        <div className="stack-sticky">
          {/* header */}
          <div className="stack-top-left">
            <div className="section-label">TECHNOLOGIES</div>
            <h2 className="section-title" style={{ fontSize: "clamp(1.9rem,3vw,2.7rem)" }}>
              My Tech Stack
            </h2>
          </div>

          {/* progress dots */}
          <div className="stack-progress-dots">
            {TECH_CATEGORIES.map((_, i) => (
              <div
                key={i}
                className={`stack-dot${i === activeCat ? " active" : ""}`}
                style={{ width: i === activeCat ? 26 : 8 }}
              />
            ))}
          </div>

          {/* 3D card */}
          <div
            className="card-perspective-wrap"
            onMouseMove={handleCardMouseMove}
            onMouseLeave={handleCardMouseLeave}
          >
            <div className="card-3d-stage" ref={card3dStageRef} style={{ transformStyle: "preserve-3d" }}>
              <div className="tech-card" ref={techCardRef}>
                <div className="tech-card-counter">
                  {String(activeCat + 1).padStart(2, "0")} / {String(TECH_CATEGORIES.length).padStart(2, "0")}
                </div>

                <div className="tech-card-header">
                  <div>
                    <div className="tech-card-meta-label">{cat.label}</div>
                    <div className="tech-card-title">{cat.name}</div>
                  </div>
                  <div className="tech-card-emoji">{cat.emoji}</div>
                </div>

                <div className="skills-grid">
                  {cat.skills.map(skill => (
                    <div key={skill.name} className="skill-item">
                      <div className="skill-icon">{skill.icon}</div>
                      <div className="skill-name">{skill.name}</div>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>

          <div className="stack-scroll-label">SCROLL TO EXPLORE</div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          PROJECTS — HORIZONTAL STICKY SCROLL
          ═══════════════════════════════════════ */}
      <div
        id="work"
        className="projects-section"
        ref={projOuterRef}
        style={{ height: `${PROJECTS.length * 85 + 100}vh` }}
      >
        <div className="projects-sticky">
          <div className="projects-header">
            <div>
              <div className="section-label">FEATURED PROJECTS</div>
              <h2 className="section-title">My Work</h2>
            </div>
            <span className="projects-scroll-tip">Scroll to explore →</span>
          </div>

          <div className="projects-track" ref={projTrackRef}>
            {PROJECTS.map(p => (
              <div key={p.num} className="project-card">
                <div className="project-thumb">
                  <div className="project-emoji">{p.emoji}</div>
                  <span className="project-card-num">{p.num}</span>
                </div>
                <div className="project-body">
                  <div className="project-tags">
                    {p.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
                  </div>
                  <div className="project-title">{p.title}</div>
                  <div className="project-desc">{p.desc}</div>
                  <div className="project-links">
                    <a href={p.demo} className="project-link">Live Demo ↗</a>
                    <a href={p.github} className="project-link">GitHub</a>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="projects-progress-wrap">
            <div className="projects-progress-fill" ref={projProgFillRef} style={{ width: "0%" }} />
          </div>
          <div className="projects-count-row">
            <span>01</span>
            <span>06</span>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          EXPERIENCE
          ═══════════════════════════════════════ */}
      <section id="experience" className="experience-section">
        <div className="experience-inner">
          <div className="experience-header reveal">
            <div className="section-label">WORK HISTORY</div>
            <h2 className="section-title">Experience</h2>
          </div>

          <div className="timeline-wrap">
            <div className="timeline-vert-line" />
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.role} className={`exp-row reveal d${Math.min(i + 1, 4)}`}>
                <div>
                  <div className="exp-left-period">{exp.period}</div>
                  <div className="exp-left-company">{exp.company}</div>
                </div>
                <div>
                  <div className="exp-role-title">{exp.role}</div>
                  <div className="exp-desc-text">{exp.desc}</div>
                  <div className="exp-skill-tags">
                    {exp.skills.map(s => <span key={s} className="tag-pill">{s}</span>)}
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          RESUME
          ═══════════════════════════════════════ */}
      <section id="resume" className="resume-section">
        <div className="resume-inner">
          <div className="reveal">
            <div className="section-label" style={{ justifyContent: "center" }}>RESUME</div>
            <h2 className="section-title">Download My CV</h2>
            <p>Everything you need — background, experience, education, and skills, neatly packaged.</p>
            <div className="resume-btn-row">
              <button className="btn-primary">Download PDF ↓</button>
              <button className="btn-outline">View Online</button>
            </div>
          </div>

          <div className="resume-mock-card reveal from-scale d1">
            <div className="resume-mock-header">
              <div>
                <div className="resume-name">Your Name</div>
                <div className="resume-role-sub">Full Stack Developer</div>
              </div>
              <div className="resume-contact-block">
                you@email.com<br />
                linkedin.com/in/yourname<br />
                github.com/yourname<br />
                +1 (555) 000-0000
              </div>
            </div>

            <div className="resume-section-head">Experience</div>
            <div className="resume-entry-row">
              <span className="resume-entry-title">Senior Full Stack Engineer · Veritas Tech</span>
              <span className="resume-entry-date">2023–Present</span>
            </div>
            <div className="resume-entry-sub">Led microservices migration, 60% performance improvement, CI/CD pipeline.</div>
            <div className="resume-entry-row">
              <span className="resume-entry-title">Full Stack Developer · Axiom Labs</span>
              <span className="resume-entry-date">2021–2023</span>
            </div>
            <div className="resume-entry-sub">TypeScript adoption, component library, 40% bug rate reduction.</div>

            <div className="resume-section-head">Education</div>
            <div className="resume-entry-row">
              <span className="resume-entry-title">B.Tech Computer Science · XYZ University</span>
              <span className="resume-entry-date">2016–2020</span>
            </div>

            <div className="resume-section-head">Skills</div>
            <div className="resume-tags-row">
              {["React","Next.js","Node.js","TypeScript","PostgreSQL","AWS","Docker","GraphQL"].map(s => (
                <span key={s} className="tag-pill">{s}</span>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ═══════════════════════════════════════
          CONTACT — SPLIT REVEAL
          ═══════════════════════════════════════ */}
      <div
        id="contact"
        className="contact-section"
        ref={contactOuterRef}
        style={{ height: "270vh" }}
      >
        <div className="contact-sticky-wrap">
          {/* TOP half — slides UP */}
          <div className="contact-top-half" ref={contactTopRef}>
            <div style={{ textAlign: "center" }}>
              <div className="section-label" style={{ justifyContent: "center", marginBottom: 14 }}>
                GET IN TOUCH
              </div>
              <div className="contact-big-word">Let&apos;s Build</div>
            </div>
          </div>

          {/* BOTTOM half — slides DOWN */}
          <div className="contact-bottom-half" ref={contactBotRef}>
            <div className="contact-big-word faded">Something Great.</div>
          </div>

          {/* divider line at center */}
          <div className="contact-center-line" />

          {/* FORM — fades in between the two halves */}
          <div
            className="contact-form-reveal"
            ref={contactFormRef}
            style={{ opacity: 0, transform: "scale(0.91) translateY(38px)", pointerEvents: "none" }}
          >
            <div className="contact-form-box">
              <div className="contact-form-grid">
                {/* LEFT SIDE */}
                <div>
                  <div className="contact-left-heading">
                    Let&apos;s build<br />
                    something<br />
                    <span style={{ opacity: 0.24 }}>great.</span>
                  </div>
                  <div className="contact-left-desc">
                    Open to full-time roles, freelance projects, and interesting
                    collaborations. If you have something in mind, I&apos;d love to hear it.
                  </div>
                  <div className="contact-info-links">
                    <a href="mailto:you@email.com" className="contact-info-link">
                      <IconMail /> you@email.com
                    </a>
                    <a href="#" className="contact-info-link">
                      <IconLinkedIn /> linkedin.com/in/yourname
                    </a>
                    <a href="#" className="contact-info-link">
                      <IconGitHub /> github.com/yourname
                    </a>
                  </div>
                </div>

                {/* RIGHT SIDE — FORM */}
                <form className="contact-form-fields" onSubmit={handleSubmit}>
                  <div className="form-two-col">
                    <div className="form-field">
                      <label className="form-field-label">YOUR NAME</label>
                      <input type="text" className="form-field-input" placeholder="John Doe" />
                    </div>
                    <div className="form-field">
                      <label className="form-field-label">EMAIL</label>
                      <input type="email" className="form-field-input" placeholder="john@company.com" />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-field-label">SUBJECT</label>
                    <input type="text" className="form-field-input" placeholder="Project Collaboration" />
                  </div>
                  <div className="form-field">
                    <label className="form-field-label">MESSAGE</label>
                    <textarea className="form-field-textarea" placeholder="Tell me about your project..." />
                  </div>
                  <button type="submit" className="form-submit-btn">
                    {sent ? "Message Sent ✓" : "Send Message"}
                    {!sent && <IconSend />}
                  </button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ═══════════════════════════════════════
          FOOTER
          ═══════════════════════════════════════ */}
      <footer className="site-footer">
        <span className="footer-mono-text">© 2025 YourName. All rights reserved.</span>
        <span className="footer-mono-text">Designed &amp; Built with ♥</span>
      </footer>
    </>
  );
}
