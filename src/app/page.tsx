"use client";
import React, { useEffect, useRef, useState, useCallback } from "react";

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

const ABOUT_CARDS = [
  {
    num: "01 / IDENTITY", icon: "🎓", title: "Web Developer & DSA Enthusiast",
    desc: "I'm a passionate web developer with strong foundations in Data Structures & Algorithms. Through continuous competitive programming on LeetCode and building real-world applications, I approach every engineering challenge with algorithmic precision and scalable solutions.",
    chips: ["LeetCode", "DSA", "Problem-Solving", "Competitive Prog."],
  },
  {
    num: "02 / MINDSET", icon: "💡", title: "Innovative & Collaborative Builder",
    desc: "I thrive at turning ambitious ideas into tangible solutions. Active hackathon participant who loves collaborating with teams to innovate. I break down complex problems systematically and focus on shipping products that create real impact for users.",
    chips: ["Hackathons", "Collaboration", "Innovation", "Rapid Prototyping"],
  },
  {
    num: "03 / CRAFT", icon: "⚛️", title: "Full Stack MERN Developer",
    desc: "From pixel-perfect React interfaces to resilient Node.js backends and robust database solutions — I build complete web experiences. Proficient in designing intuitive UX with Figma and deploying scalable applications on modern cloud platforms.",
    chips: ["MERN Stack", "Next.js", "Figma Design", "Responsive UI"],
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
    num: "04", image: "/4.png", title: "GDG on Campus MSIT",
    desc: "Full-stack responsive website for GDG on Campus community. Collaborated with team to deliver a polished, maintainable platform with modern design and optimal performance.",
    tags: ["React", "Next.js", "TypeScript", "Tailwind CSS"], github: "#",
  },
  {
    num: "05", image: "/5.png", title: "Instagram Clone",
    desc: "Full-stack Instagram clone project applying scalable architecture and responsive UI/UX best practices. Features social authentication, image uploads, and real-time interactions.",
    tags: ["MERN Stack", "Firebase", "MongoDB", "Socket.io"], github: "#",
  },
  {
    num: "06", image: "/6.png", title: "Clothify",
    desc: "Modern E-commerce website- showcasing men and women's collection with seamless shopping experience. Built with React, Next.js, TypeScript, and Tailwind CSS for a responsive and visually appealing design.",
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
   ICONS
   ================================================================ */
function IconMail() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={1.8}><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>;
}
function IconLinkedIn() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" /></svg>;
}
function IconGitHub() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" /></svg>;
}
function IconTwitter() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor"><path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-4.714-6.231-5.401 6.231H2.74l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" /></svg>;
}
function IconSend() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M22 2 11 13" /><path d="M22 2 15 22 11 13 2 9l20-7z" /></svg>;
}
function IconDownload() {
  return <svg width="17" height="17" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4" /><polyline points="7 10 12 15 17 10" /><line x1="12" y1="15" x2="12" y2="3" /></svg>;
}
function IconExternal() {
  return <svg width="15" height="15" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" /><polyline points="15 3 21 3 21 9" /><line x1="10" y1="14" x2="21" y2="3" /></svg>;
}
function IconArrow() {
  return <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}><line x1="5" y1="12" x2="19" y2="12" /><polyline points="12 5 19 12 12 19" /></svg>;
}

/* ================================================================
   VERTICAL NAV
   ================================================================ */
function VerticalNav({
  items, activeId, onNav,
}: {
  items: typeof NAV_ITEMS;
  activeId: string;
  onNav: (id: string) => void;
}) {
  const GEM_VH   = [33, 42, 51, 61, 70];
  const activeIdx = items.findIndex(i => i.id === activeId);
  const inSections = activeIdx >= 0;
  const activeGemVh = inSections ? GEM_VH[activeIdx] : null;

  const [label,    setLabel]    = useState('');
  const [labelVis, setLabelVis] = useState(false);
  const prevId = useRef('');
  const t1 = useRef<ReturnType<typeof setTimeout>>();
  const t2 = useRef<ReturnType<typeof setTimeout>>();

  useEffect(() => {
    if (!activeId) {
      prevId.current = '';
      clearTimeout(t1.current); clearTimeout(t2.current);
      setLabelVis(false);
      return;
    }
    const it = items.find(i => i.id === activeId);
    if (!it || activeId === prevId.current) return;
    prevId.current = activeId;
    clearTimeout(t1.current); clearTimeout(t2.current);
    setLabelVis(false);
    t1.current = setTimeout(() => {
      setLabel(it.label.toUpperCase());
      t2.current = setTimeout(() => setLabelVis(true), 40);
    }, 240);
  }, [activeId, items]);

  const portfolioTop  = inSections ? '8vh'  : 'calc(50vh - 40px)';
  const diamondOpacity = inSections ? 1      : 0;

  return (
    <div style={{
      position: 'fixed', right: 28, top: 0,
      width: 68, height: '100vh',
      zIndex: 400, pointerEvents: 'none',
    }}>
      <div style={{
        position: 'absolute', left: '50%',
        transform: 'translateX(-50%)',
        top: '7vh', height: '87vh',
        width: 1.5, background: 'var(--fg)', opacity: 0.45,
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '7vh',
        width: 5, height: 5, borderRadius: '50%',
        background: 'var(--fg)', opacity: 0.6,
        transform: 'translate(-50%,-50%)',
      }} />
      <div style={{
        position: 'absolute', left: '50%', top: '94vh',
        width: 5, height: 5, borderRadius: '50%',
        background: 'var(--fg)', opacity: 0.6,
        transform: 'translate(-50%,-50%)',
      }} />
      <div style={{
        position: 'absolute', left: '50%',
        top: portfolioTop,
        transform: 'translateX(-50%)',
        writingMode: 'vertical-rl',
        fontFamily: '"DM Mono", monospace',
        fontSize: '0.75rem', letterSpacing: '0.35em',
        textTransform: 'uppercase',
        color: 'var(--fg)', opacity: 0.85,
        whiteSpace: 'nowrap', userSelect: 'none',
        transition: 'top 0.9s cubic-bezier(0.16,1,0.3,1)',
      }}>
        Portfolio
      </div>
      <div style={{
        position: 'absolute',
        right: 'calc(50% + 15px)',
        top: activeGemVh !== null ? `${activeGemVh}vh` : '50vh',
        transform: 'translateY(-50%) rotate(180deg)',
        writingMode: 'vertical-rl',
        fontFamily: '"DM Mono", monospace',
        textTransform: 'uppercase',
        color: 'var(--fg)',
        opacity: labelVis ? 1 : 0,
        whiteSpace: 'nowrap', userSelect: 'none',
        display: 'flex', flexDirection: 'row', alignItems: 'center', gap: 3,
        transition: 'top 0.75s cubic-bezier(0.16,1,0.3,1), opacity 0.25s ease',
      }}>
        <span style={{ fontSize: '0.58rem', letterSpacing: '0.1em', opacity: 0.5 }}>
          {items[activeIdx]?.num}
        </span>
        <span style={{ fontSize: '0.72rem', letterSpacing: '0.22em', opacity: 1 }}>
          {label}
        </span>
      </div>
      {GEM_VH.map((vh, i) => {
        const active = i === activeIdx;
        return (
          <div
            key={i}
            onClick={() => items[i] && onNav(items[i].id)}
            style={{
              position: 'absolute', left: '50%', top: `${vh}vh`,
              pointerEvents: 'all', cursor: 'pointer',
            }}
          >
            <div style={{
              position: 'absolute',
              width: 13, height: 13,
              background: active ? 'var(--fg)' : 'transparent',
              border: active ? 'none' : '1.5px solid var(--fg)',
              opacity: diamondOpacity * (active ? 1 : 0.55),
              transform: 'translate(-50%,-50%) rotate(45deg)',
              transition: 'background 0.4s ease, opacity 0.5s ease',
            }} />
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
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [activeSection, setActiveSection] = useState("");
  const [sent, setSent] = useState(false);
  const [isHiding, setIsHiding] = useState(false);
  const [kbToast, setKbToast] = useState("");
  const [kbShow, setKbShow] = useState(false);

  /* refs */
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const stackOuterRef = useRef<HTMLDivElement>(null);
  const card3dRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);
  const projOuterRef = useRef<HTMLDivElement>(null);
  const projTrackRef = useRef<HTMLDivElement>(null);
  const projFillRef = useRef<HTMLDivElement>(null);
  const eduParallaxRef      = useRef<HTMLDivElement>(null);
  const eduParallaxInnerRef = useRef<HTMLDivElement>(null);
  const contactOuterRef = useRef<HTMLDivElement>(null);
  const contactTopRef = useRef<HTMLDivElement>(null);
  const contactBotRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const contactLineRef = useRef<HTMLDivElement>(null);
  const kbTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const anim = useRef({
    mx: 0, my: 0, rx: 0, ry: 0,
    stackT: 0, stackC: 0,
    projT: 0, projC: 0,
    eduT: 0, eduC: 0,
    contT: 0, contC: 0,
    prevCat: -1,
  });

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

    // Show success message immediately
    setSent(true);
    setIsHiding(false);
    form.reset();

    // Start hiding animation after 2.5 seconds
    setTimeout(() => { setIsHiding(true); }, 2500);
    
    // Reset state after animation completes
    setTimeout(() => { setSent(false); setIsHiding(false); }, 3200);

    // Send email in the background without blocking the UI
    try {
      await fetch('/api/contact', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: formData.get('name'),
          email: formData.get('email'),
          subject: formData.get('subject'),
          message: formData.get('message'),
        }),
      });
    } catch (error) {
      console.error('Contact form error:', error);
    }
  }, []);

  /* Keyboard nav */
  useEffect(() => {
    const map: Record<string, { id: string; label: string }> = {
      "1": { id: "about", label: "01 — About" },
      "2": { id: "stack", label: "02 — Stack" },
      "3": { id: "work", label: "03 — Work" },
      "4": { id: "experience", label: "04 — Experience" },
      "5": { id: "contact", label: "05 — Contact" },
    };
    const h = (e: KeyboardEvent) => {
      const tag = (e.target as HTMLElement).tagName;
      if (tag === "INPUT" || tag === "TEXTAREA") return;
      const item = map[e.key];
      if (!item) return;
      document.getElementById(item.id)?.scrollIntoView({ behavior: "smooth" });
      setKbToast(`↳ ${item.label}`);
      setKbShow(true);
      if (kbTimer.current) clearTimeout(kbTimer.current);
      kbTimer.current = setTimeout(() => setKbShow(false), 2200);
    };
    window.addEventListener("keydown", h);
    return () => window.removeEventListener("keydown", h);
  }, []);

  /* Active section tracking */
  useEffect(() => {
    const lastActive = { current: "" };

    const update = () => {
      const vh = window.innerHeight;

      const heroEl = document.querySelector(".hero-section") as HTMLElement | null;
      if (heroEl && heroEl.getBoundingClientRect().bottom > vh * 0.55) {
        if (lastActive.current !== "") { lastActive.current = ""; setActiveSection(""); }
        return;
      }

      const footerEl = document.querySelector(".site-footer") as HTMLElement | null;
      if (footerEl && footerEl.getBoundingClientRect().top < vh * 0.9) {
        if (lastActive.current !== "") { lastActive.current = ""; setActiveSection(""); }
        return;
      }

      let active = "";
      for (let i = NAV_ITEMS.length - 1; i >= 0; i--) {
        const el = document.getElementById(NAV_ITEMS[i].id);
        if (el && el.getBoundingClientRect().top < vh * 0.6) {
          active = NAV_ITEMS[i].id;
          break;
        }
      }

      if (active !== lastActive.current) {
        lastActive.current = active;
        setActiveSection(active);
      }
    };

    window.addEventListener("scroll", update, { passive: true });
    update();
    return () => window.removeEventListener("scroll", update);
  }, []);

  /* Scroll handler */
  useEffect(() => {
    const h = () => {
      const sy = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBarRef.current)
        progressBarRef.current.style.width = (max > 0 ? (sy/max)*100 : 0) + "%";
      setNavScrolled(sy > 50);

      if (stackOuterRef.current) {
        const r = stackOuterRef.current.getBoundingClientRect();
        const ht = stackOuterRef.current.offsetHeight - window.innerHeight;
        anim.current.stackT = clamp(ht > 0 ? -r.top / ht : 0, 0, 1);
      }
      if (projOuterRef.current) {
        const r = projOuterRef.current.getBoundingClientRect();
        const ht = projOuterRef.current.offsetHeight - window.innerHeight;
        anim.current.projT = clamp(ht > 0 ? -r.top / ht : 0, 0, 1);
      }
      if (contactOuterRef.current) {
        const r = contactOuterRef.current.getBoundingClientRect();
        const ht = contactOuterRef.current.offsetHeight - window.innerHeight;
        anim.current.contT = clamp(ht > 0 ? -r.top / ht : 0, 0, 1);
      }
    };
    window.addEventListener("scroll", h, { passive: true });
    return () => window.removeEventListener("scroll", h);
  }, []);

  /* Mouse */
  useEffect(() => {
    const mv = (e: MouseEvent) => {
      anim.current.mx = e.clientX;
      anim.current.my = e.clientY;
      if (cursorDotRef.current) {
        cursorDotRef.current.style.left = e.clientX + "px";
        cursorDotRef.current.style.top = e.clientY + "px";
      }
    };
    document.addEventListener("mousemove", mv);
    return () => document.removeEventListener("mousemove", mv);
  }, []);

  /* Cursor expand */
  useEffect(() => {
    const on = () => document.body.classList.add("cursor-expand");
    const off = () => document.body.classList.remove("cursor-expand");
    const attach = () => {
      document.querySelectorAll("a,button,.project-card,.skill-item,.edu-card,.diamond-nav-item")
        .forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  /* Reveal animations */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* Education bento cards */
  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => {
        if (e.isIntersecting) { e.target.classList.add("edu-visible"); obs.unobserve(e.target); }
      }),
      { threshold: 0.12, rootMargin: "0px 0px -60px 0px" }
    );
    document.querySelectorAll(".edu-card").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  /* RAF loop */
  useEffect(() => {
    let raf = 0;
    const TOTAL_CATS = TECH_CATEGORIES.length;

    const frame = () => {
      const a = anim.current;

      a.rx = lerp(a.rx, a.mx, 0.1);
      a.ry = lerp(a.ry, a.my, 0.1);
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = a.rx + "px";
        cursorRingRef.current.style.top = a.ry + "px";
      }

      /* Tech stack */
      a.stackC = lerp(a.stackC, a.stackT, 0.075);
      const stackSeg = 1 / TOTAL_CATS;
      const cat = clamp(Math.floor(a.stackC * TOTAL_CATS), 0, TOTAL_CATS - 1);
      const local = clamp((a.stackC - cat * stackSeg) / stackSeg, 0, 1);
      if (cat !== a.prevCat) { a.prevCat = cat; setActiveCat(cat); }
      if (card3dRef.current) {
        const entryY = (1 - clamp(local * 2.4, 0, 1)) * 80;
        const exitY = clamp(local * 2.4 - 1, 0, 1) * -80;
        const sc = 0.84 + clamp(local, 0, 1) * 0.16 - clamp((local - 0.5) * 0.1, 0, 0.1);
        const op = clamp(local * 12, 0, 1) * (1 - clamp((local - 0.78) * 7, 0, 1));
        const rx = (1 - local) * 20 - local * 10;
        card3dRef.current.style.transform = `translateY(${entryY + exitY}px) scale(${sc}) rotateX(${rx}deg)`;
        card3dRef.current.style.opacity = String(Math.max(0, op));
      }

      /* Projects horizontal scroll */
      a.projC = lerp(a.projC, a.projT, 0.075);
      if (projTrackRef.current) {
        const totalW = (PROJECTS.length - 1) * window.innerWidth;
        projTrackRef.current.style.transform = `translateX(${-a.projC * totalW}px)`;
      }
      if (projFillRef.current) projFillRef.current.style.width = (a.projC * 100) + "%";

      /* Contact split */
      a.contC = lerp(a.contC, a.contT, 0.065);
      const split = clamp(a.contC * 2.8, 0, 1);
      const formV = clamp((a.contC - 0.28) * 3.4, 0, 1);

      if (contactTopRef.current) contactTopRef.current.style.transform = `translateY(${-split * 100}%)`;
      if (contactBotRef.current) contactBotRef.current.style.transform = `translateY(${split * 100}%)`;

      if (contactLineRef.current) {
        const lineOpacity = 1 - clamp(split * 4, 0, 1);
        contactLineRef.current.style.opacity = String(lineOpacity);
      }

      if (contactFormRef.current) {
        contactFormRef.current.style.opacity = String(formV);
        contactFormRef.current.style.transform = `scale(${0.91 + formV * 0.09}) translateY(${(1 - formV) * 40}px)`;
        contactFormRef.current.style.pointerEvents = formV > 0.45 ? "auto" : "none";
      }

      raf = requestAnimationFrame(frame);
    };
    raf = requestAnimationFrame(frame);
    return () => cancelAnimationFrame(raf);
  }, []);

  const onCardMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    if (!techCardRef.current) return;
    const r = techCardRef.current.getBoundingClientRect();
    const cx = (e.clientX - r.left) / r.width - 0.5;
    const cy = (e.clientY - r.top) / r.height - 0.5;
    techCardRef.current.style.transform = `rotateX(${cy * -10}deg) rotateY(${cx * 10}deg)`;
  }, []);
  const onCardLeave = useCallback(() => {
    if (techCardRef.current) techCardRef.current.style.transform = "rotateX(0) rotateY(0)";
  }, []);

  const cat = TECH_CATEGORIES[activeCat];

  return (
    <>
      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} />
      <div className="scroll-progress" ref={progressBarRef} />
      <div className={`kb-nav-toast${kbShow ? " show" : ""}`}>{kbToast}</div>

      {/* Success Message Overlay */}
      {sent && (
        <div className={`success-message-overlay${isHiding ? " hiding" : ""}`}>
          <div className="success-message-content">
            <div className="success-checkmark">✓</div>
            <p className="success-message-text">Message Sent Successfully!</p>
            <p className="success-message-subtext">I'll get back to you soon.</p>
          </div>
        </div>
      )}

      {/* ══════════════════ ANIMATED VERTICAL NAV ══════════════════ */}
      <VerticalNav items={NAV_ITEMS} activeId={activeSection} onNav={scrollTo} />

      {/* ══════════════════ NAVBAR ══════════════════ */}
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
          <button className="nav-theme-btn" onClick={toggleTheme}>{theme === "dark" ? "☀" : "☾"}</button>
          <button className="nav-hire-outside" onClick={() => scrollTo("contact")}>Hire Me</button>
        </div>
      </nav>

      {/* Mobile menu */}
      <div className={`mobile-menu${menuOpen ? " open" : ""}`}>
        {NAV_ITEMS.map(item => (
          <button key={item.id} className="mobile-nav-btn" onClick={() => scrollTo(item.id)}>
            <span className="mobile-nav-num">{item.num}</span>
            {item.label}
          </button>
        ))}
        <button className="nav-theme-btn" style={{ marginTop: 20 }} onClick={toggleTheme}>
          {theme === "dark" ? "☀ Light" : "☾ Dark"}
        </button>
      </div>

      {/* ══════════════════ HERO ══════════════════ */}
      <section className="hero-section">
        <div className="hero-top-intro">
          <span className="hero-badge-dot" />
          &nbsp;&nbsp;Available for work &nbsp;·&nbsp; <strong>New Delhi, India</strong>
        </div>

        <div className="hero-title-block">
          <h1 className="hero-title-giant">
            <span className="hero-title-line">
              <span className="hero-title-inner" style={{ animationDelay: "0s" }}>Web</span>
            </span>
          </h1>
          {/* ── Cursive script overlay spanning both lines ── */}
          <div className="hero-name-script" aria-hidden="true">web developer</div>
          <h2 className="hero-title-ghost">
            <span className="hero-title-line ghost-line">
              <span className="hero-title-inner" style={{ animationDelay: "0.12s" }}>Developer</span>
            </span>
          </h2>
        </div>

        <div className="hero-tagline-block">
          <p className="hero-tagline-main">MERN Stack Engineer & AI Enthusiast — Building Tomorrow's Solutions.</p>
          <p className="hero-tagline-sub">Full-stack developer crafting intelligent applications with cutting-edge AI integration and scalable architecture.</p>
        </div>

        <div className="hero-bottom-bar">
          <div className="hero-scroll-hint-inline" />
          <div className="hero-brands">
            {[
              { name: "GitHub", url: "https://github.com/Khushipawar37" },
              { name: "LinkedIn", url: "https://www.linkedin.com/in/khushi-pawar-2823952b0/" },
              { name: "Email", url: "mailto:khushipawar987@gmail.com" },
            ].map((b, i) => (
              <span key={b.name} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {i > 0 && <span className="hero-social-sep" />}
                <a href={b.url} target={b.url.startsWith("http") ? "_blank" : undefined} rel={b.url.startsWith("http") ? "noopener noreferrer" : undefined} className="hero-brand-label">{b.name}</a>
              </span>
            ))}
          </div>
        </div>
      </section>

      {/* ══════════════════ MARQUEE ══════════════════ */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="marquee-item">{w}<span className="marquee-sep"> · </span></span>
          ))}
        </div>
      </div>

      {/* ══════════════════ ABOUT ══════════════════ */}
      <section id="about" className="about-section">
        <div className="about-intro-wrap">
          <div className="section-num-wrap">
            <span className="section-num">01</span>
            <div className="section-num-content">
              <div className="section-label">ABOUT ME</div>
              <h2 className="section-title about-intro-heading">
                What I&apos;m<br /><span style={{ opacity: 0.22 }}>About.</span>
              </h2>
            </div>
          </div>
          <p className="about-intro-para">
            I&apos;m a full-stack developer with hands-on experience building scalable and user-centric web
            applications using the MERN stack and Next.js. I enjoy transforming complex ideas into clean,
            functional digital products — combining strong problem-solving skills in Data Structures and
            Algorithms (C++) with modern frontend and backend development practices. From developing
            AI-powered platforms like <em>CareerCompass</em> and <em>Notivio</em> to building a
            Multi-access Edge Computing simulation system during my research internship at IIT Delhi, I
            focus on writing efficient code, designing intuitive interfaces, and engineering solutions
            that create real-world impact. Currently, I&apos;m expanding my expertise in Machine
            Learning while continuously sharpening my development and system design skills.
          </p>
        </div>

        <ul className="about-cards-list">
          {ABOUT_CARDS.map((card, i) => (
            <li key={card.num} className={`about-card-sticky asc-${i}`} style={{ top: `${60 + i * 20}px` }}>
              <div className="about-card-num">{card.num}</div>
              <span className="about-card-icon">{card.icon}</span>
              <div className="about-card-title">{card.title}</div>
              <p className="about-card-desc">{card.desc}</p>
              <div className="about-card-chips">
                {card.chips.map(c => <span key={c} className="tag-pill">{c}</span>)}
              </div>
            </li>
          ))}
        </ul>
      </section>

      {/* ══════════════════ TECH STACK ══════════════════ */}
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

      {/* ══════════════════ PROJECTS ══════════════════ */}
      <div id="work" className="projects-section" ref={projOuterRef} style={{ height: `${PROJECTS.length * 100}vh` }}>
        <div className="projects-sticky">
          <div className="proj-heading-wrap">
            <div className="proj-section-label">
              <span className="section-num">03</span>
              <span className="section-label">FEATURED WORK</span>
            </div>
            <h2 className="proj-main-heading">My Work</h2>
          </div>

          <div className="proj-progress-bar">
            <div className="proj-progress-fill" ref={projFillRef} style={{ width: "0%" }} />
          </div>

          <div className="proj-track" ref={projTrackRef}>
            {PROJECTS.map((p, i) => (
              <div key={p.num} className="proj-slide">
                {/* ── Background image with dark overlay ── */}
                <div className="proj-slide-bg">
                  <img
                    src={p.image}
                    alt={p.title}
                    style={{
                      position: "absolute",
                      inset: 0,
                      width: "100%",
                      height: "100%",
                      objectFit: "cover",
                      objectPosition: "center",
                      zIndex: 0,
                    }}
                  />
                  <div className="proj-slide-bg-overlay" />
                </div>

                <div className="proj-slide-num">{p.num}</div>

                <div className="proj-slide-info">
                  <div className="proj-slide-title">{p.title}</div>
                  <div className="proj-slide-desc">{p.desc}</div>
                  <div className="proj-slide-footer">
                    <div className="proj-slide-tags">
                      {p.tags.map(t => <span key={t} className="proj-slide-tag">{t}</span>)}
                    </div>
                    <a href={p.github} className="proj-slide-link">
                      <IconGitHub /> GitHub
                    </a>
                  </div>
                </div>

                <div className="proj-slide-counter">
                  {String(i + 1).padStart(2, "0")} / {String(PROJECTS.length).padStart(2, "0")}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* ══════════════════ EDUCATION ══════════════════ */}
      <div className="edu-scene-outer" style={{ height: "160vh" }}>
        <div className="edu-scene-sticky">
          <div className="edu-scene-panel" ref={eduParallaxInnerRef} style={{ opacity: 1, transform: "none" }}>
            <div className="edu-scene-header">
              <div className="section-label">ACADEMIC BACKGROUND</div>
              <h2 className="section-title">Education</h2>
            </div>
            <div className="edu-rows-wrap" style={{ marginTop: 48, paddingBottom: 0 }}>
              <div className="edu-row edu-row--primary">
                <div className="edu-row-left">
                  <span className="edu-row-badge">
                    <span className="edu-row-badge-dot" />
                    Current
                  </span>
                  <div className="edu-row-year">2023 — 2027</div>
                </div>
                <div className="edu-row-center">
                  <div className="edu-row-degree">B.Tech · Computer Science Engineering</div>
                  <div className="edu-row-school">Maharaja Surajmal Institute of Technology · Delhi, India</div>
                </div>
                <div className="edu-row-right">
                  <div className="edu-row-score">9.47</div>
                  <div className="edu-row-score-unit">CGPA</div>
                </div>
              </div>
              <div className="edu-row-divider" />
              <div className="edu-row">
                <div className="edu-row-left">
                  <div className="edu-row-tag">Class XII · CBSE</div>
                  <div className="edu-row-year">Senior Secondary</div>
                </div>
                <div className="edu-row-center">
                  <div className="edu-row-degree">Holy Child Auxilium School</div>
                  <div className="edu-row-school">New Delhi, India</div>
                </div>
                <div className="edu-row-right">
                  <div className="edu-row-score">95</div>
                  <div className="edu-row-score-unit">%</div>
                </div>
              </div>
              <div className="edu-row-divider" />
              <div className="edu-row">
                <div className="edu-row-left">
                  <div className="edu-row-tag">Class X · CBSE</div>
                  <div className="edu-row-year">Secondary</div>
                </div>
                <div className="edu-row-center">
                  <div className="edu-row-degree">Holy Child Auxilium School</div>
                  <div className="edu-row-school">New Delhi, India</div>
                </div>
                <div className="edu-row-right">
                  <div className="edu-row-score">97</div>
                  <div className="edu-row-score-unit">%</div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* ══════════════════ EXPERIENCE ══════════════════ */}
      <section id="experience" className="experience-section">
        <div className="experience-inner">
          <div className="experience-header reveal">
            <div className="section-num-wrap">
              <span className="section-num">04</span>
              <div className="section-num-content">
                <div className="section-label">WORK HISTORY</div>
                <h2 className="section-title">Experience</h2>
              </div>
            </div>
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

      {/* ══════════════════ RESUME ══════════════════ */}
      <section id="resume" className="resume-section">
        <div className="resume-inner">
          <div className="resume-layout">
            <div className="resume-left-heading reveal from-left">
              <div className="section-label">RESUME</div>
              <h2 className="section-title">Download<br />My CV</h2>
              <p>A concise overview of my experience, skills, and the projects I&apos;ve shipped — ready to share with your team.</p>
              <div className="resume-action-btns">
                <button
                  className="resume-dl-btn"
                  onClick={() => {
                    const link = document.createElement('a');
                    link.href = '/resume.pdf';
                    link.download = 'Khushi_Pawar_Resume.pdf';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                  }}
                >
                  Download PDF <IconDownload />
                </button>
                <button
                  className="resume-view-btn"
                  onClick={() => window.open('/resume.pdf', '_blank')}
                >
                  View Online <IconExternal />
                </button>
              </div>
            </div>
            <div className="resume-mock-card reveal from-right">
              <div className="resume-mock-header">
                <div>
                  <div className="resume-name">Khushi Pawar</div>
                  <div className="resume-role-sub">Full Stack Web Developer</div>
                </div>
                <div className="resume-contact-block">
                  khushipawar987@gmail.com<br />New Delhi, India
                </div>
              </div>
              <div className="rm-section-head">Experience</div>
              <div className="rm-entry">
                <div className="rm-entry-row"><span className="rm-entry-title">Research Intern · IIT Delhi</span><span className="rm-entry-date">2025</span></div>
                <div className="rm-entry-sub">Multi-access Edge Computing — scalability, low-latency processing, distributed systems.</div>
              </div>
              <div className="rm-section-head">Projects</div>
              <div className="rm-entry">
                <div className="rm-entry-row"><span className="rm-entry-title">CareerCompass — AI Career Guidance</span><span className="rm-entry-date">2024</span></div>
                <div className="rm-entry-sub">MERN + AI · 350+ career paths, personalized roadmaps, 20+ strategies.</div>
              </div>
              <div className="rm-entry">
                <div className="rm-entry-row"><span className="rm-entry-title">Notivio — AI Note-Taking App</span><span className="rm-entry-date">2024</span></div>
                <div className="rm-entry-sub">Next.js + Groq AI · YouTube to notes, 60% study time reduction.</div>
              </div>
              <div className="rm-section-head">Education</div>
              <div className="rm-entry">
                <div className="rm-entry-row"><span className="rm-entry-title">B.Tech CSE · MSIT Delhi</span><span className="rm-entry-date">2023–2027</span></div>
              </div>
              <div className="rm-section-head">Core Skills</div>
              <div className="rm-tags-row">
                {["React", "Next.js", "Node.js", "Express.js", "MongoDB", "Firebase", "TypeScript", "Groq AI", "Python", "C++"].map(s => (
                  <span key={s} className="tag-pill">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ OPEN TO WORK ══════════════════ */}
      <div className="otw-wrap reveal">
        <div className="otw-signal">
          <span className="otw-pulse" />
          <span className="otw-signal-text">Available Now</span>
        </div>
        <div className="otw-statement">
          Looking for my next<br />
          <em>challenge.</em>
        </div>
        <div className="otw-meta">
          <div className="otw-meta-item">
            <span className="otw-meta-label">Role</span>
            <span className="otw-meta-value">Full Stack Developer</span>
          </div>
          <div className="otw-meta-item">
            <span className="otw-meta-label">Open to</span>
            <div className="otw-chips">
              <span className="otw-chip">Internship</span>
              <span className="otw-chip">Freelance</span>
              <span className="otw-chip">Full-time</span>
            </div>
          </div>
          <div className="otw-meta-item">
            <span className="otw-meta-label">Location</span>
            <span className="otw-meta-value">New Delhi · Remote Worldwide</span>
          </div>
        </div>
        <button className="otw-cta" onClick={() => scrollTo('contact')}>
          Let&apos;s connect
          <span className="otw-cta-arrow">↗</span>
        </button>
      </div>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <div id="contact" className="contact-section" ref={contactOuterRef} style={{ height: "270vh" }}>
        <div className="contact-sticky-wrap">
          <div className="contact-top-half" ref={contactTopRef}>
            <div style={{ textAlign: "center" }}>
              <div className="section-num-wrap" style={{ justifyContent: "center" }}>
                <span className="section-num">05</span>
                <div className="section-num-content">
                  <div className="section-label" style={{ justifyContent: "center", marginBottom: 14 }}>GET IN TOUCH</div>
                </div>
              </div>
              <div className="contact-big-word">Let&apos;s Build</div>
            </div>
          </div>
          <div className="contact-bottom-half" ref={contactBotRef}>
            <div className="contact-big-word faded">Something Great.</div>
          </div>
          <div className="contact-center-line" ref={contactLineRef} />
          <div className="contact-form-reveal" ref={contactFormRef}
            style={{ opacity: 0, transform: "scale(0.91) translateY(40px)", pointerEvents: "none" }}>
            <div className="contact-form-box">
              <div className="contact-form-grid">
                <div>
                  <div className="contact-left-heading">Let&apos;s build<br />something<br /><span style={{ opacity: 0.22 }}>great.</span></div>
                  <div className="contact-otw-inline">
                    <span className="contact-otw-signal"><span className="contact-otw-dot" />Available Now</span>
                    <div className="contact-otw-chips">
                      <span className="otw-chip">Internship</span>
                      <span className="otw-chip">Freelance</span>
                      <span className="otw-chip">Full-time</span>
                    </div>
                  </div>
                  <div className="contact-left-desc">Always excited to collaborate on innovative projects combining web development and AI. Whether it's a startup venture, research opportunity, or exciting freelance challenge, I'm eager to make an impact.</div>
                  <div className="contact-info-links">
                    <a href="mailto:khushipawar987@gmail.com" className="contact-info-link"><IconMail /> khushipawar987@gmail.com</a>
                    <a href="https://www.linkedin.com/in/khushi-pawar-2823952b0/" target="_blank" rel="noopener noreferrer" className="contact-info-link"><IconLinkedIn /> https://www.linkedin.com/in/khushi-pawar-2823952b0/</a>
                    <a href="https://github.com/Khushipawar37" target="_blank" rel="noopener noreferrer" className="contact-info-link"><IconGitHub /> github.com/Khushipawar37</a>
                  </div>
                </div>
                <form className="contact-form-fields" onSubmit={handleSubmit}>
                  <div className="form-two-col">
                    <div className="form-field">
                      <label className="form-field-label">YOUR NAME</label>
                      <input type="text" name="name" className="form-field-input" placeholder="John Doe" required />
                    </div>
                    <div className="form-field">
                      <label className="form-field-label">EMAIL</label>
                      <input type="email" name="email" className="form-field-input" placeholder="john@company.com" required />
                    </div>
                  </div>
                  <div className="form-field">
                    <label className="form-field-label">SUBJECT</label>
                    <input type="text" name="subject" className="form-field-input" placeholder="Project Collaboration" required />
                  </div>
                  <div className="form-field">
                    <label className="form-field-label">MESSAGE</label>
                    <textarea name="message" className="form-field-textarea" placeholder="Tell me about your project..." required />
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

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-logo"><span>&lt;</span>Khushi<span>/&gt;</span></div>
          <div className="footer-tagline">Full Stack Developer · AI Enthusiast · Hackathon Participant</div>
          <div className="footer-nav-primary">
            {NAV_ITEMS.map(item => (
              <button key={item.id} className="footer-nav-primary-btn" onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="footer-socials-row">
            {[
              { icon: <IconGitHub />, label: "GitHub", url: "https://github.com/Khushipawar37" },
              { icon: <IconLinkedIn />, label: "LinkedIn", url: "https://www.linkedin.com/in/khushi-pawar-2823952b0/" },
              { icon: <IconMail />, label: "Email", url: "mailto:khushipawar987@gmail.com" },
            ].map(s => (
              <a key={s.label} href={s.url} target={s.url.startsWith("http") ? "_blank" : undefined} rel={s.url.startsWith("http") ? "noopener noreferrer" : undefined} className="footer-social-circ" title={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-end-zone">
          <div className="footer-giant-name" aria-hidden="true">
            <div className="footer-giant-name-text">Khushi</div>
          </div>
        </div>
      </footer>
    </>
  );
}