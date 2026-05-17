"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";
import { IconMail, IconLinkedIn, IconGitHub, IconSend, IconDownload, IconExternal } from '@/components/ui/icons'

/* ================================================================
   DATA
   ================================================================ */
const NAV_ITEMS = [
  { label: "About", id: "about", num: "01" },
  { label: "Stack", id: "stack", num: "02" },
  { label: "Work", id: "work", num: "03" },
  { label: "Experience", id: "experience", num: "04" },
  { label: "Contact", id: "contact", num: "05" },
];

const MARQUEE_WORDS = [
  "React", "Next.js", "TypeScript", "Node.js", "Express.js", "MongoDB", "Firebase", "Tailwind CSS", "Shadcn UI", "Figma", "Git", "Vercel", "Netlify", "Python", "C++", "Java",
];

const ABOUT_STORIES = [
  {
    index: "01",
    tag: "FULL STACK DEVELOPER",
    byline: "I turn ideas into production-ready apps.",
    sub: "MERN Stack · Next.js · TypeScript",
    body: "From pixel-perfect React interfaces to resilient Node.js backends — I engineer complete web experiences. Clean code, scalable architecture, and shipping products that make a real difference.",
    tags: ["React", "Next.js", "Node.js", "MongoDB", "TypeScript"],
  },
  {
    index: "02",
    tag: "450+ LeetCode problems solved.",
    byline: "I think in algorithms, not just Code",
    sub: "Data Structures · Algorithms · C++",
    body: "DSA isn't just practice — it's how I think. Every feature I build carries the instinct of an algorithm: efficient, intentional, built to scale under real-world conditions.",
    tags: ["LeetCode", "DSA", "C++", "Competitive Prog."],
  },
  {
    index: "03",
    tag: "HACKATHON PARTICIPANT. SHIPS FAST.",
    byline: "From idea to live in 48 hours.",
    sub: "10+ Hackathons · Rapid Prototyping",
    body: "I thrive under pressure — zero to live in 24–48 hours. Collaboration-first, relentless focus on what works, and a habit of turning constraints into creative breakthroughs.",
    tags: ["Hackathons", "Collaboration", "Shipping", "Teamwork"],
  },
  {
    index: "04",
    tag: "AI / ML ENTHUSIAST",
    byline: "Building AI, understanding the math behind it.",
    sub: "Machine Learning · LLMs · Neural Networks",
    body: "Already shipped AI-powered products — CareerCompass and Notivio — with LLMs at their core. Now diving deeper into neural networks, deep learning architectures, and what comes next.",
    tags: ["Machine Learning", "Deep Learning", "Groq AI", "Gen AI"],
  },
];

const TECH_CATEGORIES = [
  {
    label: "01 / FRONTEND", name: "Frontend", emoji: "🖥️",
    skills: [
      { icon: "⚛️", name: "React" }, { icon: "▲", name: "Next.js" },
      { icon: "🔷", name: "TypeScript" }, { icon: "🎨", name: "Tailwind CSS" },
      { icon: "📦", name: "Shadcn UI" }, { icon: "🌐", name: "HTML/CSS" },
      { icon: "⚡", name: "JavaScript" }, { icon: "🎭", name: "Responsive Design" },
    ],
  },
  {
    label: "02 / BACKEND", name: "Backend", emoji: "⚙️",
    skills: [
      { icon: "🟢", name: "Node.js" }, { icon: "🚂", name: "Express.js" },
      { icon: "🐍", name: "Python" }, { icon: "☕", name: "Java" },
      { icon: "🔷", name: "C++" }, { icon: "🌐", name: "REST APIs" },
      { icon: "📡", name: "GraphQL" }, { icon: "🔐", name: "Authentication" },
    ],
  },
  {
    label: "03 / DATABASES & TOOLS", name: "Databases & Tools", emoji: "🗄️",
    skills: [
      { icon: "🍃", name: "MongoDB" }, { icon: "🔐", name: "Firebase" },
      { icon: "🐘", name: "SQL" }, { icon: "🎯", name: "Figma" },
      { icon: "📦", name: "Git/GitHub" }, { icon: "🌊", name: "Vercel" },
      { icon: "🌐", name: "Netlify" }, { icon: "📊", name: "Jupyter Notebook" },
    ],
  },
  {
    label: "04 / LANGUAGES", name: "Programming Languages", emoji: "💻",
    skills: [
      { icon: "🌐", name: "JavaScript" }, { icon: "🔷", name: "TypeScript" },
      { icon: "🐍", name: "Python" }, { icon: "⚙️", name: "C" },
      { icon: "⚙️", name: "C++" }, { icon: "☕", name: "Java" },
      { icon: "🌐", name: "HTML/CSS" }, { icon: "📝", name: "SQL" },
    ],
  },
];

const PROJECTS = [
  {
    num: "01", image: "/1.png", title: "careerCompass",
    desc: "AI-powered career guidance platform covering 350+ career paths with personalized recommendations, detailed roadmaps, curated resources, expert blogs, and a counselor-student portal.",
    tags: ["MERN", "AI Chatbot", "Next.js", "Groq"], github: "https://github.com/Khushipawar37/careerCompasss.git",
  },
  {
    num: "02", image: "/2.png", title: "Notivio",
    desc: "AI note-taking app that converts YouTube lectures into structured notes, summaries, review questions, flashcards, and mindmaps. Reduces study time by 60% with collaborative workspace.",
    tags: ["MERN", "Next.js", "Firebase", "Groq AI"], github: "https://github.com/Khushipawar37/Notivio.git",
  },
  {
    num: "03", image: "/3.png", title: "MEC Platform",
    desc: "Web-based MEC simulation platform for managing projects, running bandwidth/concurrency tests, and simulating results through interactive graphs with real-time visualization.",
    tags: ["MERN", "Next.js", "Firebase", "Judge0"], github: "https://github.com/Khushipawar37/virtual_machine.git",
  },
  {
    num: "06", image: "/6.png", title: "Clothify",
    desc: "Modern E-commerce website showcasing men and women's collection with seamless shopping experience. Built with React, Next.js, TypeScript, and Tailwind CSS.",
    tags: ["Next.js", "TypeScript", "Tailwind CSS", "Animation"], github: "#",
  },
];

const EXPERIENCES = [
  {
    period: "June 2025 — August 2025", company: "IIT Delhi", role: "Research Intern",
    desc: "Researched Multi-access Edge Computing (MEC) concepts including scalability, low-latency processing, and distributed system performance. Developed a prototype MEC platform while gaining hands-on experience with real-time projects in a research environment.",
    skills: ["MEC Architecture", "System Design", "Real-time Processing", "Research"],
  },
  {
    period: "2024 — 2025", company: "GDG on Campus - MSIT", role: "Web Developer",
    desc: "Contributed to development of the GDG on Campus MSIT website, collaborating with team to deliver a polished, responsive platform. Built a full-stack Instagram clone as minor project, applying scalable architecture and responsive UI/UX best practices.",
    skills: ["React", "Node.js", "Firebase", "Full Stack Development"],
  },
];

/* ================================================================
   UTILS
   ================================================================ */
function lerp(a: number, b: number, t: number) { return a + (b - a) * t; }
function clamp(v: number, lo: number, hi: number) { return Math.max(lo, Math.min(hi, v)); }

/* ================================================================
   VERTICAL NAV
   ================================================================ */
function VerticalNav({ items, activeId, onNav }: {
  items: typeof NAV_ITEMS; activeId: string; onNav: (id: string) => void;
}) {
  const GEM_VH = [33, 42, 51, 61, 70];
  const activeIdx = items.findIndex(i => i.id === activeId);
  const inSections = activeIdx >= 0;
  const [label, setLabel] = useState('');
  const [labelVis, setLabelVis] = useState(false);
  const prevId = useRef('');
  const t1 = useRef<ReturnType<typeof setTimeout> | null>(null);
  const t2 = useRef<ReturnType<typeof setTimeout> | null>(null);

  useEffect(() => {
    if (!activeId) {
      prevId.current = '';
      if (t1.current) clearTimeout(t1.current);
      if (t2.current) clearTimeout(t2.current);
      setLabelVis(false);
      return;
    }
    const it = items.find(i => i.id === activeId);
    if (!it || activeId === prevId.current) return;
    prevId.current = activeId;
    if (t1.current) clearTimeout(t1.current);
    if (t2.current) clearTimeout(t2.current);
    setLabelVis(false);
    t1.current = setTimeout(() => {
      setLabel(it.label.toUpperCase());
      t2.current = setTimeout(() => setLabelVis(true), 40);
    }, 240);
  }, [activeId, items]);

  const portfolioTop = inSections ? '8vh' : 'calc(50vh - 40px)';
  const diamondOpacity = inSections ? 1 : 0;

  return (
    <div style={{ position: 'fixed', right: 28, top: 0, width: 68, height: '100vh', zIndex: 400, pointerEvents: 'none' }}>
      <div style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)', top: '7vh', height: '87vh', width: 1.5, background: 'var(--fg)', opacity: 0.45 }} />
      <div style={{ position: 'absolute', left: '50%', top: '7vh', width: 5, height: 5, borderRadius: '50%', background: 'var(--fg)', opacity: 0.6, transform: 'translate(-50%,-50%)' }} />
      <div style={{ position: 'absolute', left: '50%', top: '94vh', width: 5, height: 5, borderRadius: '50%', background: 'var(--fg)', opacity: 0.6, transform: 'translate(-50%,-50%)' }} />
      <div style={{ position: 'absolute', left: '50%', top: portfolioTop, transform: 'translateX(-50%)', writingMode: 'vertical-rl', fontFamily: '"DM Mono", monospace', fontSize: '0.75rem', letterSpacing: '0.35em', textTransform: 'uppercase', color: 'var(--fg)', opacity: 0.85, whiteSpace: 'nowrap', userSelect: 'none', transition: 'top 0.9s cubic-bezier(0.16,1,0.3,1)' }}>Portfolio</div>
      <div style={{ position: 'absolute', right: 'calc(50% + 15px)', top: inSections ? `${GEM_VH[activeIdx]}vh` : '50vh', transform: 'translateY(-50%) rotate(180deg)', writingMode: 'vertical-rl', fontFamily: '"DM Mono", monospace', textTransform: 'uppercase', color: 'var(--fg)', opacity: labelVis ? 1 : 0, whiteSpace: 'nowrap', userSelect: 'none', display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3, transition: 'top 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease' }}>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.1em', opacity: 0.5 }}>{items[activeIdx]?.num}</span>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em' }}>{label}</span>
      </div>
      {GEM_VH.map((vh, i) => {
        const active = i === activeIdx;
        return (
          <div key={i} onClick={() => items[i] && onNav(items[i].id)} style={{ position: 'absolute', left: '50%', top: `${vh}vh`, pointerEvents: 'all', cursor: 'pointer' }}>
            <div style={{ position: 'absolute', width: 13, height: 13, background: active ? 'var(--fg)' : 'transparent', border: active ? 'none' : '1.5px solid var(--fg)', opacity: diamondOpacity * (active ? 1 : 0.55), transform: 'translate(-50%,-50%) rotate(45deg)', transition: 'background 0.4s ease, opacity 0.5s ease' }} />
          </div>
        );
      })}
    </div>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function PortfolioPage() {
  const [theme, setTheme] = useState<"dark" | "light">("light");
  const [menuOpen, setMenuOpen] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [activeStory, setActiveStory] = useState(0);
  const [sent, setSent] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [kbToast, setKbToast] = useState("");
  const [kbShow, setKbShow] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const [isTouchDevice, setIsTouchDevice] = useState(false);

  useEffect(() => {
    const check = () => {
      setIsMobile(window.innerWidth <= 920);
      setIsTouchDevice(
        window.matchMedia("(pointer: coarse)").matches ||
        "ontouchstart" in window ||
        navigator.maxTouchPoints > 0
      );
    };
    check();
    window.addEventListener("resize", check, { passive: true });
    return () => window.removeEventListener("resize", check);
  }, []);

  useEffect(() => {
    document.body.classList.toggle("touch-device", isTouchDevice);
    return () => document.body.classList.remove("touch-device");
  }, [isTouchDevice]);

  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stackOuterRef = useRef<HTMLDivElement>(null);
  const card3dRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);
  const projOuterRef = useRef<HTMLDivElement>(null);
  const projTrackRef = useRef<HTMLDivElement>(null);
  const projFillRef = useRef<HTMLDivElement>(null);
  const eduInnerRef = useRef<HTMLDivElement>(null);
  const contactOuterRef = useRef<HTMLDivElement>(null);
  const contactTopRef = useRef<HTMLDivElement>(null);
  const contactBotRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const contactLineRef = useRef<HTMLDivElement>(null);
  const aboutOuterRef = useRef<HTMLDivElement>(null);
  const kbTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const anim = useRef({ mx: 0, my: 0, rx: 0, ry: 0, stackT: 0, stackC: 0, projT: 0, projC: 0, contT: 0, contC: 0, prevCat: -1 });

  const toggleTheme = useCallback(() => {
    setTheme(p => {
      const n = p === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("dark", n === "dark");
      return n;
    });
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

  const handleSubmit = useCallback(async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget;
    const formData = new FormData(form);
    setSent(true); setIsHiding(false); form.reset();
    setTimeout(() => setIsHiding(true), 2500);
    setTimeout(() => { setSent(false); setIsHiding(false); }, 3200);
    try {
      await fetch('/api/contact', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ name: formData.get('name'), email: formData.get('email'), subject: formData.get('subject'), message: formData.get('message') }) });
    } catch (err) { console.error(err); }
  }, []);

  useEffect(() => {
    const map: Record<string, { id: string; label: string }> = { "1": { id: "about", label: "01 — About" }, "2": { id: "stack", label: "02 — Stack" }, "3": { id: "work", label: "03 — Work" }, "4": { id: "experience", label: "04 — Experience" }, "5": { id: "contact", label: "05 — Contact" } };
    const h = (e: KeyboardEvent) => {
      if ((e.target as HTMLElement).tagName === "INPUT" || (e.target as HTMLElement).tagName === "TEXTAREA") return;
      const item = map[e.key]; if (!item) return;
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      setKbToast(`↳ ${item.label}`); setKbShow(true);
      if (kbTimer.current) clearTimeout(kbTimer.current);
      kbTimer.current = setTimeout(() => setKbShow(false), 2200);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  useEffect(() => {
    const last = { current: "" };
    const update = () => {
      const vh = window.innerHeight;
      const hero = document.querySelector(".hero-section") as HTMLElement | null;
      if (hero && hero.getBoundingClientRect().bottom > vh * 0.55) { if (last.current) { last.current = ""; setActiveSection(""); } return; }
      const footer = document.querySelector(".site-footer") as HTMLElement | null;
      if (footer && footer.getBoundingClientRect().top < vh * 0.9) { if (last.current) { last.current = ""; setActiveSection(""); } return; }
      let active = "";
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top < vh * 0.6) { active = NAV_ITEMS[i].id; break; }
      }
      if (active !== last.current) { last.current = active; setActiveSection(active); }
    };
    window.addEventListener("scroll", update, { passive: true }); update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* About story scroll */
  useEffect(() => {
    if (isMobile) {
      setActiveStory(0);
      return;
    }
    const onScroll = () => {
      if (!aboutOuterRef.current) return;
      const r = aboutOuterRef.current.getBoundingClientRect();
      const total = aboutOuterRef.current.offsetHeight - window.innerHeight;
      if (total <= 0) return;
      const progress = clamp(-r.top / total, 0, 1);
      setActiveStory(clamp(Math.floor(progress * ABOUT_STORIES.length), 0, ABOUT_STORIES.length - 1));
    };
    window.addEventListener("scroll", onScroll, { passive: true }); onScroll();
    return () => window.removeEventListener("scroll", onScroll);
  }, [isMobile]);

  useEffect(() => {
    const h = () => {
      const sy = window.scrollY; const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBarRef.current) progressBarRef.current.style.width = (max > 0 ? (sy / max) * 100 : 0) + "%";
      if (stackOuterRef.current) { const r = stackOuterRef.current.getBoundingClientRect(); const ht = stackOuterRef.current.offsetHeight - window.innerHeight; anim.current.stackT = clamp(ht > 0 ? -r.top / ht : 0, 0, 1); }
      if (!isMobile && projOuterRef.current) { const r = projOuterRef.current.getBoundingClientRect(); const ht = projOuterRef.current.offsetHeight - window.innerHeight; anim.current.projT = clamp(ht > 0 ? -r.top / ht : 0, 0, 1); }
      if (!isMobile && contactOuterRef.current) { const r = contactOuterRef.current.getBoundingClientRect(); const ht = contactOuterRef.current.offsetHeight - window.innerHeight; anim.current.contT = clamp(ht > 0 ? -r.top / ht : 0, 0, 1); }
    };
    window.addEventListener("scroll", h, { passive: true });
    h();
    return () => window.removeEventListener("scroll", h);
  }, [isMobile]);

  useEffect(() => {
    if (isTouchDevice) return;
    const mv = (e: MouseEvent) => {
      anim.current.mx = e.clientX; anim.current.my = e.clientY;
      if (cursorDotRef.current) { cursorDotRef.current.style.left = e.clientX + "px"; cursorDotRef.current.style.top = e.clientY + "px"; }
    };
    document.addEventListener("mousemove", mv);
    return () => document.removeEventListener("mousemove", mv);
  }, [isTouchDevice]);

  useEffect(() => {
    if (isTouchDevice) return;
    const on = () => document.body.classList.add("cursor-expand");
    const off = () => document.body.classList.remove("cursor-expand");
    const attach = () => { document.querySelectorAll("a,button,.skill-item").forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); }); };
    const release = () => off();
    attach();
    const mo = new MutationObserver(attach); mo.observe(document.body, { childList: true, subtree: true });
    document.addEventListener("mouseup", release);
    document.addEventListener("mousedown", release);
    window.addEventListener("blur", release);
    window.addEventListener("scroll", release, { passive: true });
    return () => {
      mo.disconnect();
      document.removeEventListener("mouseup", release);
      document.removeEventListener("mousedown", release);
      window.removeEventListener("blur", release);
      window.removeEventListener("scroll", release);
      off();
    };
  }, [isTouchDevice]);

  useEffect(() => {
    if (isMobile) {
      if (contactTopRef.current) contactTopRef.current.style.transform = "none";
      if (contactBotRef.current) contactBotRef.current.style.transform = "none";
      if (contactLineRef.current) contactLineRef.current.style.opacity = "1";
      if (contactFormRef.current) {
        contactFormRef.current.style.opacity = "1";
        contactFormRef.current.style.transform = "none";
        contactFormRef.current.style.pointerEvents = "auto";
      }
    } else if (contactFormRef.current) {
      contactFormRef.current.style.opacity = "0";
      contactFormRef.current.style.transform = "scale(0.91) translateY(40px)";
      contactFormRef.current.style.pointerEvents = "none";
    }
  }, [isMobile]);

  useEffect(() => {
    const obs = new IntersectionObserver(entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }), { threshold: 0.08 });
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const N = TECH_CATEGORIES.length;
    const frame = () => {
      const a = anim.current;
      a.rx = lerp(a.rx, a.mx, 0.1); a.ry = lerp(a.ry, a.my, 0.1);
      if (cursorRingRef.current) { cursorRingRef.current.style.left = a.rx + "px"; cursorRingRef.current.style.top = a.ry + "px"; }
      a.stackC = lerp(a.stackC, a.stackT, 0.075);
      const seg = 1 / N; const cat = clamp(Math.floor(a.stackC * N), 0, N - 1); const loc = clamp((a.stackC - cat * seg) / seg, 0, 1);
      if (cat !== a.prevCat) { a.prevCat = cat; setActiveCat(cat); }
      if (card3dRef.current) { const eY = (1 - clamp(loc * 2.4, 0, 1)) * 80; const xY = clamp(loc * 2.4 - 1, 0, 1) * -80; const sc = 0.84 + clamp(loc, 0, 1) * 0.16 - clamp((loc - 0.5) * 0.1, 0, 0.1); const op = clamp(loc * 12, 0, 1) * (1 - clamp((loc - 0.78) * 7, 0, 1)); const rx = (1 - loc) * 20 - loc * 10; card3dRef.current.style.transform = `translateY(${eY + xY}px) scale(${sc}) rotateX(${rx}deg)`; card3dRef.current.style.opacity = String(Math.max(0, op)); }
      if (!isMobile) {
        a.projC = lerp(a.projC, a.projT, 0.075);
        if (projTrackRef.current) { const tw = (PROJECTS.length - 1) * window.innerWidth; projTrackRef.current.style.transform = `translateX(${-a.projC * tw}px)`; }
        if (projFillRef.current) projFillRef.current.style.width = (a.projC * 100) + "%";
        a.contC = lerp(a.contC, a.contT, 0.065); const sp = clamp(a.contC * 2.8, 0, 1); const fv = clamp((a.contC - 0.28) * 3.4, 0, 1);
        if (contactTopRef.current) contactTopRef.current.style.transform = `translateY(${-sp * 100}%)`;
        if (contactBotRef.current) contactBotRef.current.style.transform = `translateY(${sp * 100}%)`;
        if (contactLineRef.current) contactLineRef.current.style.opacity = String(1 - clamp(sp * 4, 0, 1));
        if (contactFormRef.current) { contactFormRef.current.style.opacity = String(fv); contactFormRef.current.style.transform = `scale(${0.91 + fv * 0.09}) translateY(${(1 - fv) * 40}px)`; contactFormRef.current.style.pointerEvents = fv > 0.45 ? "auto" : "none"; }
      }
      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, [isMobile]);

  const onCardMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!techCardRef.current) return;
    const r = techCardRef.current.getBoundingClientRect();
    techCardRef.current.style.transform = `rotateX(${((e.clientY - r.top) / r.height - 0.5) * -10}deg) rotateY(${((e.clientX - r.left) / r.width - 0.5) * 10}deg)`;
  }, []);
  const onCardLeave = useCallback(() => { if (techCardRef.current) techCardRef.current.style.transform = "rotateX(0) rotateY(0)"; }, []);

  const cat = TECH_CATEGORIES[activeCat];
  const story = ABOUT_STORIES[activeStory];

  return (
    <>
      {!isTouchDevice && <div className="cursor-dot" ref={cursorDotRef} />}
      {!isTouchDevice && <div className="cursor-ring" ref={cursorRingRef} />}
      <div className="scroll-progress" ref={progressBarRef} />
      <div className={`kb-nav-toast${kbShow ? " show" : ""}`}>{kbToast}</div>

      {sent && (
        <div className={`success-message-overlay${isHiding ? " hiding" : ""}`}>
          <div className="success-message-content">
            <div className="success-checkmark">✓</div>
            <p className="success-message-text">Message Sent Successfully!</p>
            <p className="success-message-subtext">I'll get back to you soon.</p>
          </div>
        </div>
      )}

      {!isMobile && <VerticalNav items={NAV_ITEMS} activeId={activeSection} onNav={scrollTo} />}

      {/* ══════════ NAVBAR ══════════ */}
      <nav className="navbar">
        <button className="nav-logo-outside" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="nav-logo-dim">&lt;</span>Khushi<span className="nav-logo-dim">/&gt;</span>
        </button>
        <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
          <span className="ham-line" style={{ transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : undefined }} />
          <span className="ham-line" style={{ opacity: menuOpen ? 0 : 1 }} />
          <span className="ham-line" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : undefined }} />
        </button>
        <div className="nav-right-outside">
          <button className="nav-theme-btn" onClick={toggleTheme}>{theme === "dark" ? "☀ Light" : "☾ Dark"}</button>
          <button className="nav-hire-outside" onClick={() => scrollTo("contact")}>Hire Me</button>
        </div>
      </nav>

      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} className="mobile-nav-btn" onClick={() => scrollTo(item.id)}>
            <span className="mobile-nav-num">{item.num}</span>{item.label}
          </button>
        ))}
        <button className="nav-theme-btn" style={{ marginTop: 20 }} onClick={toggleTheme}>{theme === "dark" ? "☀ Light" : "☾ Dark"}</button>
      </div>

      {/* ══════════ HERO ══════════ */}
      <section className="hero-section">
        <div className="hero-top-intro"><span className="hero-badge-dot" />&nbsp;&nbsp;Available for work &nbsp;·&nbsp; <strong>New Delhi, India</strong></div>
        <div className="hero-title-block">
          <h1 className="hero-title-giant"><span className="hero-title-line"><span className="hero-title-inner" style={{ animationDelay: "0s" }}>Web</span></span></h1>
          <h2 className="hero-title-ghost"><span className="hero-title-line ghost-line"><span className="hero-title-inner" style={{ animationDelay: "0.12s" }}>Developer</span></span></h2>
        </div>
        <div className="hero-tagline-block">
          <p className="hero-tagline-main">MERN Stack Engineer & AI Enthusiast — Building Tomorrow's Solutions.</p>
          <p className="hero-tagline-sub">Full-stack developer crafting intelligent applications with cutting-edge AI integration and scalable architecture.</p>
        </div>
        <div className="hero-bottom-bar">
          <div className="hero-scroll-hint-inline" />
          <div className="hero-brands">
            {[{ name: "GitHub", url: "https://github.com/Khushipawar37" }, { name: "LinkedIn", url: "https://www.linkedin.com/in/khushi-pawar-2823952b0/" }, { name: "Email", url: "mailto:khushipawar987@gmail.com" }].map((b, i) => (
              <span key={b.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {i > 0 && <span className="hero-social-sep" />}
                <a href={b.url} target={b.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="hero-brand-label">{b.name}</a>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ MARQUEE ══════════ */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="marquee-item">{w}<span className="marquee-sep"> · </span></span>
          ))}
        </div>
      </div>

      {/* ══════════════════════════════════════════════
          ABOUT  —  section header then sticky stories
          ══════════════════════════════════════════════ */}

      {/* Unified about section — title lives inside the sticky area */}
      <div id="about" className="about-stories-outer" ref={aboutOuterRef} style={{ height: isMobile ? "auto" : `${ABOUT_STORIES.length * 100}vh` }}>
        <div className="about-stories-sticky">

          {/* Section label + title — top left of sticky area */}
          <div className="about-stories-heading" style={{ position: 'absolute', top: 'clamp(24px, 3vh, 36px)', left: 'clamp(80px, 8vw, 120px)', zIndex: 10, pointerEvents: 'none' }}>
            <div className="section-num-wrap" style={{ marginBottom: 0 }}>
              <span className="section-num">01</span>
              <div className="section-num-content">
                <div className="section-label">ABOUT ME</div>
                <h2 className="section-title">What I&apos;m <span style={{ opacity: 0.22 }}>About.</span></h2>
              </div>
            </div>
          </div>

          {/* Progress rail — left edge */}
          <div className="about-progress-rail">
            {ABOUT_STORIES.map((_, i) => (
              <div key={i} className={`about-rail-dot${i === activeStory ? " active" : ""}`} />
            ))}
          </div>

          {/* Story counter — top right of content */}
          <div className="about-counter">
            <span className="about-counter-cur">{String(activeStory + 1).padStart(2, "0")}</span>
            <span className="about-counter-slash"> / </span>
            <span className="about-counter-tot">{String(ABOUT_STORIES.length).padStart(2, "0")}</span>
          </div>

          {/* Story panels — all absolutely stacked, one visible at a time */}
          {ABOUT_STORIES.map((s, i) => (
            <div
              key={i}
              className={`about-panel${isMobile || i === activeStory ? " active" : i < activeStory ? " past" : ""}`}
              aria-hidden={!isMobile && i !== activeStory}
            >
              <div className="ap-eyebrow">
                <span className="ap-index">{s.index}</span>
                <span className="ap-sep" />
                <span className="ap-tag-label">{s.tag}</span>
              </div>

              <h3 className="ap-byline">{s.byline}</h3>
              <div className="ap-sub">{s.sub}</div>
              <p className="ap-body">{s.body}</p>

              <div className="ap-tags">
                {s.tags.map(t => <span key={t} className="tag-pill">{t}</span>)}
              </div>
            </div>
          ))}

          {/* Scroll nudge — bottom center */}
          <div className={`about-scroll-nudge${activeStory === 0 ? " show" : ""}`}>
            <span className="asn-line" /><span className="asn-text">SCROLL</span>
          </div>

        </div>
      </div>

      {/* ══════════ TECH STACK ══════════ */}
      <div id="stack" className="stack-section" ref={stackOuterRef} style={{ height: `${TECH_CATEGORIES.length * 140}vh` }}>
        <div className="stack-sticky">
          <div className="stack-bg-label" aria-hidden><span>STACK</span></div>
          <div className="stack-top-left">
            <div className="section-num-wrap">
              <span className="section-num">02</span>
              <div className="section-num-content">
                <div className="section-label">TECHNOLOGIES</div>
                <h2 className="section-title" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>My Tech Stack</h2>
              </div>
            </div>
          </div>
          <div className="stack-top-right">
            {TECH_CATEGORIES.map((_, i) => (
              <div key={i} className={`stack-dot${i === activeCat ? " active" : ""}`} style={{ width: i === activeCat ? 28 : 8 }} />
            ))}
          </div>
          <div className="stack-card-wrap" onMouseMove={onCardMove} onMouseLeave={onCardLeave}>
            <div className="card-3d-stage" ref={card3dRef} style={{ transformStyle: "preserve-3d" }}>
              <div className="tech-card" ref={techCardRef}>
                <div className="tech-card-counter">{String(activeCat + 1).padStart(2, "0")} / {String(TECH_CATEGORIES.length).padStart(2, "0")}</div>
                <div className="tech-card-header">
                  <div><div className="tech-card-meta-label">{cat.label}</div><div className="tech-card-title">{cat.name}</div></div>
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

      {/* ══════════ PROJECTS ══════════ */}
      <div id="work" className="projects-section" ref={projOuterRef} style={{ height: isMobile ? "auto" : `${PROJECTS.length * 100}vh` }}>
        <div className="projects-sticky">
          <div className="proj-heading-wrap">
            <div className="proj-section-label"><span className="section-num">03</span><span className="section-label">FEATURED WORK</span></div>
            <h2 className="proj-main-heading">My Work</h2>
          </div>
          <div className="proj-progress-bar"><div className="proj-progress-fill" ref={projFillRef} style={{ width: "0%" }} /></div>
          <div className="proj-track" ref={projTrackRef}>
            {PROJECTS.map((p) => (
              <div key={p.num} className="proj-slide">
                <div className="proj-slide-bg" />
                <div className="proj-slide-info">
                  <div className="proj-slide-meta"><span className="proj-slide-index">{p.num}</span><span className="proj-slide-meta-sep" /><span className="proj-slide-category">Project</span></div>
                  <div className="proj-slide-title">{p.title}</div>
                  <div className="proj-slide-desc">{p.desc}</div>
                  <div className="proj-slide-footer">
                    <div className="proj-slide-tags">{p.tags.map(t => <span key={t} className="proj-slide-tag">{t}</span>)}</div>
                    <a href={p.github} className="proj-slide-link"><IconGitHub /> View on GitHub</a>
                  </div>
                </div>
                <div className="proj-mockup-wrap">
                  <div className="proj-mockup-glow" />
                  <div className="proj-mockup-card">
                    <div className="proj-mockup-bar">
                      <div className="proj-mockup-dots"><span className="pmd pmd-red" /><span className="pmd pmd-yellow" /><span className="pmd pmd-green" /></div>
                      <div className="proj-mockup-url"><span className="proj-mockup-lock">🔒</span><span>{p.title.toLowerCase().replace(/\s/g, '')}.vercel.app</span></div>
                      <div className="proj-mockup-actions"><span className="proj-mockup-action-dot" /><span className="proj-mockup-action-dot" /></div>
                    </div>
                    <div className="proj-mockup-screen"><img src={p.image} alt={p.title} className="proj-mockup-img" /><div className="proj-mockup-screen-shine" /></div>
                  </div>
                  <div className="proj-mockup-counter"><span>{p.num}</span><span className="proj-mockup-counter-sep">—</span><span>{String(PROJECTS.length).padStart(2, "0")}</span></div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════ EDUCATION ══════════ */}
      <div className="edu-scene-outer" style={{ height: "160vh" }}>
        <div className="edu-scene-sticky">
          <div className="edu-scene-panel" ref={eduInnerRef} style={{ opacity: 1, transform: "none" }}>
            <div className="edu-scene-header"><div className="section-label">ACADEMIC BACKGROUND</div><h2 className="section-title">Education</h2></div>
            <div className="edu-rows-wrap" style={{ marginTop: 48, paddingBottom: 0 }}>
              <div className="edu-row edu-row--primary">
                <div className="edu-row-left"><span className="edu-row-badge"><span className="edu-row-badge-dot" />Current</span><div className="edu-row-year">2023 — 2027</div></div>
                <div className="edu-row-center"><div className="edu-row-degree">B.Tech · Computer Science Engineering</div><div className="edu-row-school">Maharaja Surajmal Institute of Technology · Delhi, India</div></div>
                <div className="edu-row-right"><div className="edu-row-score">9.47</div><div className="edu-row-score-unit">CGPA</div></div>
              </div>
              <div className="edu-row-divider" />
              <div className="edu-row">
                <div className="edu-row-left"><div className="edu-row-tag">Class XII · CBSE</div><div className="edu-row-year">Senior Secondary</div></div>
                <div className="edu-row-center"><div className="edu-row-degree">Holy Child Auxilium School</div><div className="edu-row-school">New Delhi, India</div></div>
                <div className="edu-row-right"><div className="edu-row-score">95</div><div className="edu-row-score-unit">%</div></div>
              </div>
              <div className="edu-row-divider" />
              <div className="edu-row">
                <div className="edu-row-left"><div className="edu-row-tag">Class X · CBSE</div><div className="edu-row-year">Secondary</div></div>
                <div className="edu-row-center"><div className="edu-row-degree">Holy Child Auxilium School</div><div className="edu-row-school">New Delhi, India</div></div>
                <div className="edu-row-right"><div className="edu-row-score">97</div><div className="edu-row-score-unit">%</div></div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ EXPERIENCE ══════════ */}
      <section id="experience" className="experience-section">
        <div className="experience-inner">
          <div className="experience-header reveal">
            <div className="section-num-wrap">
              <span className="section-num">04</span>
              <div className="section-num-content"><div className="section-label">WORK HISTORY</div><h2 className="section-title">Experience</h2></div>
            </div>
          </div>
          <div className="timeline-wrap">
            <div className="timeline-vert-line" />
            {EXPERIENCES.map((exp, i) => (
              <div key={exp.role} className={`exp-row reveal d${Math.min(i + 1, 4)}`}>
                <div><div className="exp-left-period">{exp.period}</div><div className="exp-left-company">{exp.company}</div></div>
                <div>
                  <div className="exp-role-title">{exp.role}</div>
                  <div className="exp-desc-text">{exp.desc}</div>
                  <div className="exp-skill-tags">{exp.skills.map(s => <span key={s} className="tag-pill">{s}</span>)}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════ RESUME ══════════ */}
      <section id="resume" className="resume-section">
        <div className="resume-inner">
          <div className="resume-layout">
            <div className="resume-left-heading reveal from-left">
              <div className="section-label">RESUME</div>
              <h2 className="section-title">Download<br />My CV</h2>
              <p>A concise overview of my experience, skills, and the projects I&apos;ve shipped — ready to share with your team.</p>
              <div className="resume-action-btns">
                <button className="resume-dl-btn" onClick={() => { const l = document.createElement('a'); l.href = '/resume.pdf'; l.download = 'Khushi_Pawar_Resume.pdf'; document.body.appendChild(l); l.click(); document.body.removeChild(l); }}>Download PDF <IconDownload /></button>
                <button className="resume-view-btn" onClick={() => window.open('/resume.pdf', '_blank')}>View Online <IconExternal /></button>
              </div>
            </div>
            <div className="resume-mock-card reveal from-right">
              <div className="resume-mock-header">
                <div><div className="resume-name">Khushi Pawar</div><div className="resume-role-sub">Full Stack Web Developer</div></div>
                <div className="resume-contact-block">khushipawar987@gmail.com<br />New Delhi, India</div>
              </div>
              <div className="rm-section-head">Experience</div>
              <div className="rm-entry"><div className="rm-entry-row"><span className="rm-entry-title">Research Intern · IIT Delhi</span><span className="rm-entry-date">2025</span></div><div className="rm-entry-sub">Multi-access Edge Computing — scalability, low-latency processing, distributed systems.</div></div>
              <div className="rm-section-head">Projects</div>
              <div className="rm-entry"><div className="rm-entry-row"><span className="rm-entry-title">CareerCompass — AI Career Guidance</span><span className="rm-entry-date">2024</span></div><div className="rm-entry-sub">MERN + AI · 350+ career paths, personalized roadmaps.</div></div>
              <div className="rm-entry"><div className="rm-entry-row"><span className="rm-entry-title">Notivio — AI Note-Taking App</span><span className="rm-entry-date">2024</span></div><div className="rm-entry-sub">Next.js + Groq AI · YouTube to notes, 60% study time reduction.</div></div>
              <div className="rm-section-head">Education</div>
              <div className="rm-entry"><div className="rm-entry-row"><span className="rm-entry-title">B.Tech CSE · MSIT Delhi</span><span className="rm-entry-date">2023–2027</span></div></div>
              <div className="rm-section-head">Core Skills</div>
              <div className="rm-tags-row">{["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Firebase", "TypeScript", "Groq AI", "Python", "C++"].map(s => <span key={s} className="tag-pill">{s}</span>)}</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════ OTW ══════════ */}
      <div className="otw-wrap reveal">
        <div className="otw-signal"><span className="otw-pulse" /><span className="otw-signal-text">Available Now</span></div>
        <div className="otw-statement">Looking for my next<br /><em>challenge.</em></div>
        <div className="otw-meta">
          <div className="otw-meta-item"><span className="otw-meta-label">Role</span><span className="otw-meta-value">Full Stack Developer</span></div>
          <div className="otw-meta-item"><span className="otw-meta-label">Open to</span><div className="otw-chips"><span className="otw-chip">Internship</span><span className="otw-chip">Freelance</span><span className="otw-chip">Full-time</span></div></div>
          <div className="otw-meta-item"><span className="otw-meta-label">Location</span><span className="otw-meta-value">New Delhi · Remote Worldwide</span></div>
        </div>
        <button className="otw-cta" onClick={() => scrollTo('contact')}>Let&apos;s connect<span className="otw-cta-arrow">↗</span></button>
      </div>

      {/* ══════════ CONTACT ══════════ */}
      <div id="contact" className="contact-section" ref={contactOuterRef} style={{ height: isMobile ? "auto" : "270vh" }}>
        <div className="contact-sticky-wrap">
          <div className="contact-top-half" ref={contactTopRef}>
            <div style={{ textAlign: "center" }}>
              <div className="section-num-wrap" style={{ justifyContent: "center" }}>
                <span className="section-num">05</span>
                <div className="section-num-content"><div className="section-label" style={{ justifyContent: "center", marginBottom: 14 }}>GET IN TOUCH</div></div>
              </div>
              <div className="contact-big-word">Let&apos;s Build</div>
            </div>
          </div>
          <div className="contact-bottom-half" ref={contactBotRef}><div className="contact-big-word faded">Something Great.</div></div>
          <div className="contact-center-line" ref={contactLineRef} />
          <div className="contact-form-reveal" ref={contactFormRef} style={isMobile ? { opacity: 1, transform: "none", pointerEvents: "auto" } : { opacity: 0, transform: "scale(0.91) translateY(40px)", pointerEvents: "none" }}>
            <div className="contact-form-box">
              <div className="contact-form-grid">
                <div>
                  <div className="contact-left-heading">Let&apos;s build<br />something<br /><span style={{ opacity: 0.22 }}>great.</span></div>
                  <div className="contact-otw-inline">
                    <span className="contact-otw-signal"><span className="contact-otw-dot" />Available Now</span>
                    <div className="contact-otw-chips"><span className="otw-chip">Internship</span><span className="otw-chip">Freelance</span><span className="otw-chip">Full-time</span></div>
                  </div>
                  <div className="contact-left-desc">Always excited to collaborate on innovative projects combining web development and AI. Whether it's a startup venture, research opportunity, or exciting freelance challenge, I'm eager to make an impact.</div>
                  <div className="contact-info-links">
                    <a href="mailto:khushipawar987@gmail.com" className="contact-info-link"><IconMail /> khushipawar987@gmail.com</a>
                    <a href="https://www.linkedin.com/in/khushi-pawar-2823952b0/" target="_blank" rel="noopener noreferrer" className="contact-info-link"><IconLinkedIn /> linkedin.com/in/khushi-pawar</a>
                    <a href="https://github.com/Khushipawar37" target="_blank" rel="noopener noreferrer" className="contact-info-link"><IconGitHub /> github.com/Khushipawar37</a>
                  </div>
                </div>
                <form className="contact-form-fields" onSubmit={handleSubmit}>
                  <div className="form-two-col">
                    <div className="form-field"><label className="form-field-label">YOUR NAME</label><input type="text" name="name" className="form-field-input" placeholder="John Doe" required /></div>
                    <div className="form-field"><label className="form-field-label">EMAIL</label><input type="email" name="email" className="form-field-input" placeholder="john@company.com" required /></div>
                  </div>
                  <div className="form-field"><label className="form-field-label">SUBJECT</label><input type="text" name="subject" className="form-field-input" placeholder="Project Collaboration" required /></div>
                  <div className="form-field"><label className="form-field-label">MESSAGE</label><textarea name="message" className="form-field-textarea" placeholder="Tell me about your project..." required /></div>
                  <button type="submit" className="form-submit-btn">{sent ? "Message Sent ✓" : "Send Message"}{!sent && <IconSend />}</button>
                </form>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════ FOOTER ══════════ */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-logo"><span>&lt;</span>Khushi<span>/&gt;</span></div>
          <div className="footer-tagline">Full Stack Developer · AI Enthusiast · Hackathon Participant</div>
          <div className="footer-nav-primary">{NAV_ITEMS.map(item => (<button key={item.id} className="footer-nav-primary-btn" onClick={() => scrollTo(item.id)}>{item.label}</button>))}</div>
          <div className="footer-socials-row">
            {[{ icon: <IconGitHub />, label: "GitHub", url: "https://github.com/Khushipawar37" }, { icon: <IconLinkedIn />, label: "LinkedIn", url: "https://www.linkedin.com/in/khushi-pawar-2823952b0/" }, { icon: <IconMail />, label: "Email", url: "mailto:khushipawar987@gmail.com" }].map(s => (
              <a key={s.label} href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel="noopener noreferrer" className="footer-social-circ" title={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-end-zone"><div className="footer-giant-name" aria-hidden><div className="footer-giant-name-text">Khushi</div></div></div>
      </footer>
    </>
  );
}
