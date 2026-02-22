"use client";
import { useEffect, useRef, useState, useCallback } from "react";

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
  "React", "Next.js", "TypeScript", "Node.js", "PostgreSQL",
  "Docker", "AWS", "GraphQL", "TailwindCSS", "Redis", "Kubernetes", "Prisma", "Figma", "CI/CD", "MongoDB", "Terraform",
];

/* ── ABOUT STACKING CARDS ── */
const ABOUT_CARDS = [
  {
    num: "01 / IDENTITY",
    icon: "🧠",
    title: "DSA Practitioner",
    desc: "I think in algorithms. From dynamic programming to graph traversal, I approach every engineering problem with a strong foundation in data structures and algorithmic thinking, ensuring solutions are not just correct but optimal.",
    chips: ["LeetCode", "Competitive Prog.", "Algorithms", "Complexity Analysis"],
  },
  {
    num: "02 / MINDSET",
    icon: "💡",
    title: "Analytical Thinker & Problem Solver",
    desc: "Complex problems are just puzzles waiting to be decomposed. I break down ambiguous challenges into structured solutions, drawing on systems thinking and first-principles reasoning to build things that actually scale.",
    chips: ["Systems Design", "First Principles", "Architecture", "Debugging"],
  },
  {
    num: "03 / CRAFT",
    icon: "⚡",
    title: "Full Stack Web Developer",
    desc: "From pixel-perfect React interfaces to resilient Node.js APIs and cloud infrastructure — I own the full vertical. I care about performance, developer experience, and shipping products that users genuinely love.",
    chips: ["React", "Next.js", "Node.js", "PostgreSQL", "AWS", "Docker"],
  },
  {
    num: "04 / FRONTIER",
    icon: "🤖",
    title: "AI / ML Enthusiast",
    desc: "The intersection of intelligence and software is where I want to build. From LLM integrations and RAG pipelines to fine-tuning models — I actively explore how AI transforms what's possible in product engineering.",
    chips: ["LangChain", "OpenAI API", "RAG", "Python", "ML Fundamentals"],
  },
];

const TECH_CATEGORIES = [
  {
    label: "01 / FRONTEND", name: "Frontend", emoji: "🖥️",
    skills: [
      { icon: "⚛️", name: "React" }, { icon: "▲", name: "Next.js" },
      { icon: "🔷", name: "TypeScript" }, { icon: "🎨", name: "Tailwind" },
      { icon: "⚡", name: "Vite" }, { icon: "🌐", name: "Vue.js" },
      { icon: "🎭", name: "Framer" }, { icon: "📦", name: "Redux" },
    ],
  },
  {
    label: "02 / BACKEND", name: "Backend", emoji: "⚙️",
    skills: [
      { icon: "🟢", name: "Node.js" }, { icon: "🚂", name: "Express" },
      { icon: "🐍", name: "Python" }, { icon: "🦅", name: "NestJS" },
      { icon: "🐘", name: "PostgreSQL" }, { icon: "🍃", name: "MongoDB" },
      { icon: "⚡", name: "Redis" }, { icon: "📡", name: "GraphQL" },
    ],
  },
  {
    label: "03 / DEVOPS & CLOUD", name: "DevOps & Cloud", emoji: "☁️",
    skills: [
      { icon: "🐳", name: "Docker" }, { icon: "☸", name: "Kubernetes" },
      { icon: "🟠", name: "AWS" }, { icon: "🔵", name: "Azure" },
      { icon: "🔁", name: "CI/CD" }, { icon: "📊", name: "Terraform" },
      { icon: "🔍", name: "Datadog" }, { icon: "🌊", name: "Vercel" },
    ],
  },
  {
    label: "04 / DATABASES", name: "Databases & Tools", emoji: "🗄️",
    skills: [
      { icon: "🐘", name: "PostgreSQL" }, { icon: "🍃", name: "MongoDB" },
      { icon: "⚡", name: "Redis" }, { icon: "🔷", name: "Prisma" },
      { icon: "🔍", name: "Elastic" }, { icon: "📬", name: "RabbitMQ" },
      { icon: "📋", name: "Jira" }, { icon: "🎯", name: "Figma" },
    ],
  },
];

const PROJECTS = [
  {
    num: "01", emoji: "🛍️", title: "EcoMart",
    desc: "Full-stack e-commerce platform with real-time inventory, Stripe payments, admin dashboard, and multi-vendor support. Handles 10k+ daily transactions.",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"], github: "#",
  },
  {
    num: "02", emoji: "💬", title: "Synapse",
    desc: "Real-time collaborative workspace with live document editing, video calls, nested docs, and granular permission management for distributed remote teams.",
    tags: ["React", "Socket.io", "Redis", "AWS"], github: "#",
  },
  {
    num: "03", emoji: "📊", title: "DataLens",
    desc: "Enterprise analytics platform with custom chart builder, automated reports, anomaly detection, and multi-source data connectors for business intelligence.",
    tags: ["Vue.js", "Python", "FastAPI", "D3.js"], github: "#",
  },
  {
    num: "04", emoji: "🤖", title: "Dockie",
    desc: "RAG-based AI document assistant. Upload PDFs or links and chat with your data. Supports multi-session memory, document export, and team sharing.",
    tags: ["Next.js", "OpenAI", "LangChain", "Pinecone"], github: "#",
  },
  {
    num: "05", emoji: "🏠", title: "NestFind",
    desc: "Cross-platform real estate app with map-based search, 3D virtual tours, mortgage calculator, and secure document signing flow for buyers and agents.",
    tags: ["React Native", "NestJS", "MongoDB"], github: "#",
  },
  {
    num: "06", emoji: "📋", title: "FlowBoard",
    desc: "Visual project management tool with kanban boards, timeline views, automated workflow triggers, team analytics dashboard, and Slack integrations.",
    tags: ["React", "TypeScript", "Zustand", "Supabase"], github: "#",
  },
];

const EXPERIENCES = [
  {
    period: "2023 — Present", company: "Veritas Tech",
    role: "Senior Full Stack Engineer",
    desc: "Led a team of 5 engineers to rebuild a legacy monolith into microservices. Improved system performance by 60% and reduced deployment time from 4 hours to 15 minutes with a new CI/CD pipeline.",
    skills: ["Next.js", "NestJS", "AWS", "Docker", "PostgreSQL"],
  },
  {
    period: "2021 — 2023", company: "Axiom Labs",
    role: "Full Stack Developer",
    desc: "Developed and maintained 3 production SaaS products. Introduced TypeScript across the codebase, reducing the bug rate by 40%. Built a reusable component library adopted by 8 product teams.",
    skills: ["React", "Node.js", "TypeScript", "GraphQL"],
  },
  {
    period: "2020 — 2021", company: "Freelance",
    role: "Frontend Developer",
    desc: "Delivered 15+ projects for clients across fintech, healthcare, and e-commerce. Specialized in React SPAs and interactive data visualizations built with D3.js.",
    skills: ["React", "Vue", "D3.js", "Firebase"],
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

/* Sketch-style SVG person — replace with your actual photo */
function SketchPerson() {
  return (
    <svg viewBox="0 0 200 400" fill="none" xmlns="http://www.w3.org/2000/svg" className="hero-sketch-svg">
      <ellipse cx="100" cy="52" rx="36" ry="40" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.75" />
      <path d="M 68 36 Q 70 16 100 14 Q 130 16 132 36" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.5" />
      <ellipse cx="87" cy="50" rx="4.5" ry="3.5" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
      <ellipse cx="113" cy="50" rx="4.5" ry="3.5" stroke="currentColor" strokeWidth="1.1" opacity="0.5" />
      <path d="M 90 68 Q 100 76 110 68" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.45" />
      <path d="M 82 42 Q 87 38 92 42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <path d="M 108 42 Q 113 38 118 42" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.35" />
      <line x1="92" y1="90" x2="88" y2="115" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <line x1="108" y1="90" x2="112" y2="115" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.6" />
      <path d="M 70 115 Q 48 120 34 140 Q 24 156 22 180" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.68" />
      <path d="M 130 115 Q 152 120 166 140 Q 176 156 178 180" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.68" />
      <path d="M 70 115 Q 62 150 60 185 Q 58 215 62 245" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.62" />
      <path d="M 130 115 Q 138 150 140 185 Q 142 215 138 245" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.62" />
      <path d="M 62 245 Q 82 252 100 252 Q 118 252 138 245" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.62" />
      <path d="M 88 115 Q 100 130 112 115" stroke="currentColor" strokeWidth="1" strokeLinecap="round" opacity="0.3" />
      <line x1="100" y1="128" x2="100" y2="200" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.22" />
      <path d="M 70 132 Q 44 162 36 196 Q 30 214 36 228" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.58" />
      <ellipse cx="35" cy="234" rx="6" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <path d="M 130 132 Q 156 162 164 196 Q 170 214 164 228" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" opacity="0.58" />
      <ellipse cx="165" cy="234" rx="6" ry="8" stroke="currentColor" strokeWidth="1" opacity="0.45" />
      <path d="M 78 245 Q 72 282 70 318 Q 68 340 66 362" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.62" />
      <path d="M 122 245 Q 128 282 130 318 Q 132 340 134 362" stroke="currentColor" strokeWidth="1.6" strokeLinecap="round" opacity="0.62" />
      <path d="M 66 362 Q 58 368 52 370 Q 46 372 44 368" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M 134 362 Q 142 368 148 370 Q 154 372 156 368" stroke="currentColor" strokeWidth="1.2" strokeLinecap="round" opacity="0.5" />
      <path d="M 76 160 Q 80 168 76 176" stroke="currentColor" strokeWidth="0.9" strokeLinecap="round" opacity="0.25" />
      <rect x="72" y="162" width="12" height="10" rx="2" stroke="currentColor" strokeWidth="0.8" opacity="0.2" />
    </svg>
  );
}

/* ================================================================
   MAIN PAGE
   ================================================================ */
export default function PortfolioPage() {
  const [theme, setTheme] = useState<"dark" | "light">("dark");
  const [menuOpen, setMenuOpen] = useState(false);
  const [navScrolled, setNavScrolled] = useState(false);
  const [activeCat, setActiveCat] = useState(0);
  const [activeCard, setActiveCard] = useState(0);
  const [sent, setSent] = useState(false);
  const [kbToast, setKbToast] = useState("");
  const [kbShow, setKbShow] = useState(false);

  /* refs */
  const cursorDotRef = useRef<HTMLDivElement>(null);
  const cursorRingRef = useRef<HTMLDivElement>(null);
  const progressBarRef = useRef<HTMLDivElement>(null);
  const aboutOuterRef = useRef<HTMLDivElement>(null);
  const cardRefs = useRef<(HTMLDivElement | null)[]>([]);
  const stackOuterRef = useRef<HTMLDivElement>(null);
  const card3dRef = useRef<HTMLDivElement>(null);
  const techCardRef = useRef<HTMLDivElement>(null);
  const projOuterRef = useRef<HTMLDivElement>(null);
  const projTrackRef = useRef<HTMLDivElement>(null);
  const projFillRef = useRef<HTMLDivElement>(null);
  const contactOuterRef = useRef<HTMLDivElement>(null);
  const contactTopRef = useRef<HTMLDivElement>(null);
  const contactBotRef = useRef<HTMLDivElement>(null);
  const contactFormRef = useRef<HTMLDivElement>(null);
  const kbTimer = useRef<ReturnType<typeof setTimeout> | null>(null);

  const anim = useRef({
    mx: 0, my: 0, rx: 0, ry: 0,
    stackT: 0, stackC: 0,
    projT: 0, projC: 0,
    contT: 0, contC: 0,
    aboutT: 0, aboutC: 0,
    prevCat: -1,
    prevCard: -1,
  });

  const toggleTheme = useCallback(() => {
    setTheme(p => {
      const n = p === "dark" ? "light" : "dark";
      document.documentElement.classList.toggle("light", n === "light");
      return n;
    });
  }, []);

  const scrollTo = useCallback((id: string) => {
    setMenuOpen(false);
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  }, []);

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

  useEffect(() => {
    const h = () => {
      const sy = window.scrollY;
      const max = document.documentElement.scrollHeight - window.innerHeight;
      if (progressBarRef.current)
        progressBarRef.current.style.width = (max > 0 ? (sy / max) * 100 : 0) + "%";
      setNavScrolled(sy > 50);

      if (aboutOuterRef.current) {
        const r = aboutOuterRef.current.getBoundingClientRect();
        const ht = aboutOuterRef.current.offsetHeight - window.innerHeight;
        anim.current.aboutT = clamp(ht > 0 ? -r.top / ht : 0, 0, 1);
      }
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

  useEffect(() => {
    const on = () => document.body.classList.add("cursor-expand");
    const off = () => document.body.classList.remove("cursor-expand");
    const attach = () => {
      document.querySelectorAll("a,button,.project-card,.skill-item,.about-stacking-card")
        .forEach(el => { el.addEventListener("mouseenter", on); el.addEventListener("mouseleave", off); });
    };
    attach();
    const mo = new MutationObserver(attach);
    mo.observe(document.body, { childList: true, subtree: true });
    return () => mo.disconnect();
  }, []);

  useEffect(() => {
    const obs = new IntersectionObserver(
      entries => entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add("visible"); obs.unobserve(e.target); } }),
      { threshold: 0.08 }
    );
    document.querySelectorAll(".reveal").forEach(el => obs.observe(el));
    return () => obs.disconnect();
  }, []);

  useEffect(() => {
    let raf = 0;
    const TOTAL_CATS = TECH_CATEGORIES.length;
    const TOTAL_CARDS = ABOUT_CARDS.length;
    const CARD_W = 420 + 22;
    const SCALE_STEP = 0.04;
    const Y_STEP = 18;

    const frame = () => {
      const a = anim.current;

      a.rx = lerp(a.rx, a.mx, 0.1);
      a.ry = lerp(a.ry, a.my, 0.1);
      if (cursorRingRef.current) {
        cursorRingRef.current.style.left = a.rx + "px";
        cursorRingRef.current.style.top = a.ry + "px";
      }

      a.aboutC = lerp(a.aboutC, a.aboutT, 0.08);
      const cardSeg = 1 / TOTAL_CARDS;
      const curCard = clamp(Math.floor(a.aboutC * TOTAL_CARDS), 0, TOTAL_CARDS - 1);
      const cardLocal = clamp((a.aboutC - curCard * cardSeg) / cardSeg, 0, 1);

      if (curCard !== a.prevCard) {
        a.prevCard = curCard;
        setActiveCard(curCard);
      }

      cardRefs.current.forEach((el, i) => {
        if (!el) return;
        const distance = i - curCard;
        if (distance < 0) {
          const pinScale = 1 - Math.abs(distance) * SCALE_STEP;
          const pinY = -Math.abs(distance) * (Y_STEP * 0.5);
          el.style.transform = `translateY(calc(-50% + ${pinY}px)) scale(${pinScale})`;
          el.style.opacity = String(Math.max(0, 0.3 - Math.abs(distance) * 0.15));
          el.style.zIndex = String(10 + distance);
        } else if (distance === 0) {
          const entryY = (1 - clamp(cardLocal * 3, 0, 1)) * 60;
          el.style.transform = `translateY(calc(-50% + ${entryY}px)) scale(1)`;
          el.style.opacity = String(Math.min(1, cardLocal * 6));
          el.style.zIndex = "15";
        } else {
          const waitScale = 1 - distance * SCALE_STEP;
          const waitY = distance * Y_STEP;
          el.style.transform = `translateY(calc(-50% + ${waitY}px)) scale(${waitScale})`;
          el.style.opacity = String(Math.max(0, 0.6 - distance * 0.18));
          el.style.zIndex = String(10 - distance);
        }
      });

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

      a.projC = lerp(a.projC, a.projT, 0.075);
      if (projTrackRef.current) {
        const totalW = PROJECTS.length * CARD_W - 22 - (window.innerWidth - 160);
        projTrackRef.current.style.transform = `translateX(${-a.projC * Math.max(0, totalW)}px)`;
      }
      if (projFillRef.current) projFillRef.current.style.width = (a.projC * 100) + "%";

      a.contC = lerp(a.contC, a.contT, 0.065);
      const split = clamp(a.contC * 2.8, 0, 1);
      const formV = clamp((a.contC - 0.28) * 3.4, 0, 1);
      if (contactTopRef.current) contactTopRef.current.style.transform = `translateY(${-split * 100}%)`;
      if (contactBotRef.current) contactBotRef.current.style.transform = `translateY(${split * 100}%)`;
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

  const handleSubmit = useCallback((e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3200);
  }, []);

  const cat = TECH_CATEGORIES[activeCat];

  return (
    <>
      <div className="cursor-dot" ref={cursorDotRef} />
      <div className="cursor-ring" ref={cursorRingRef} />
      <div className="scroll-progress" ref={progressBarRef} />
      <div className={`kb-nav-toast${kbShow ? " show" : ""}`}>{kbToast}</div>

      {/* ══════════════════ NAVBAR ══════════════════ */}
      <nav className="navbar">
        <button className="nav-logo-outside" onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}>
          <span className="nav-logo-dim">&lt;</span>YourName<span className="nav-logo-dim">/&gt;</span>
        </button>
        <div className={`navbar-pill${navScrolled ? " scrolled" : ""}`}>
          {NAV_ITEMS.map(item => (
            <button key={item.id} className="nav-btn" onClick={() => scrollTo(item.id)}>
              <span className="nav-btn-num">{item.num}</span>
              {item.label}
            </button>
          ))}
          <button className="hamburger" onClick={() => setMenuOpen(o => !o)} aria-label="Menu">
            <span className="ham-line" style={{ transform: menuOpen ? "rotate(45deg) translateY(6.5px)" : undefined }} />
            <span className="ham-line" style={{ opacity: menuOpen ? 0 : 1 }} />
            <span className="ham-line" style={{ transform: menuOpen ? "rotate(-45deg) translateY(-6.5px)" : undefined }} />
          </button>
        </div>
        <div className="nav-right-outside">
          <button className="nav-theme-btn" onClick={toggleTheme}>
            {theme === "dark" ? "☀" : "☾"}
          </button>
          <button className="nav-hire-outside" onClick={() => scrollTo("contact")}>Hire Me</button>
        </div>
      </nav>
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
        <div className="hero-grid-bg" />

        {/* ── top intro line ── */}
        <div className="hero-top-intro">
          <span className="hero-badge-dot" />
          &nbsp;&nbsp;my name is YourName and I am a&nbsp;<strong>Full Stack Developer</strong>
        </div>

        {/* ── title block with Khushi Pawar name overlay ── */}
        <div className="hero-title-block">
          <h1 className="hero-title-giant">
            <span className="hero-title-line">
              <span className="hero-title-inner" style={{ animationDelay: "0s" }}>Full Stack</span>
            </span>
          </h1>

          {/* ── Khushi Pawar italic name — sits between the two lines ── */}
          <div className="hero-name-script" aria-hidden="false">
            Khushi Pawar
          </div>

          <h2 className="hero-title-ghost">
            <span className="hero-title-line">
              <span className="hero-title-inner" style={{ animationDelay: "0.12s" }}>Developer</span>
            </span>
          </h2>
        </div>

        {/* ── Tagline + descriptor text ── */}
        <div className="hero-tagline-block">
          <p className="hero-tagline-main">Engineering Digital Products — From Logic to Launch.</p>
          <p className="hero-tagline-sub">Full-stack developer building scalable systems with precision and purpose.</p>
        </div>

        {/* ── CTA Buttons — overlay on sketch ── */}
        <div className="hero-cta-row">
          <button className="hero-btn-primary" onClick={() => scrollTo("contact")}>
            Hire Me <IconArrow />
          </button>
          <button className="hero-btn-ghost" onClick={() => scrollTo("about")}>
            Read About Me
          </button>
        </div>

        {/* ── person — absolute, centred ── */}
        <div className="hero-person-center">
          <img src="./img.png" alt="Khushi Pawar" className="hero-profile-pic" />
        </div>

        {/* ── bottom bar ── */}
        <div className="hero-bottom-bar">
          <div className="hero-location">based in New Delhi, India.</div>
          <div className="hero-scroll-hint-inline">
            <div className="scroll-hint-line" />
            SCROLL
          </div>
          <div className="hero-brands">
            {["GitHub", "LinkedIn", "Twitter"].map((b, i) => (
              <span key={b} style={{ display: "flex", alignItems: "center", gap: 14 }}>
                {i > 0 && <span className="hero-social-sep" />}
                <a href="#" className="hero-brand-label">{b}</a>
              </span>
            ))}
          </div>
        </div>

        <div className="hero-year">© 2025</div>
      </section>

      {/* ══════════════════ MARQUEE ══════════════════ */}
      <div className="marquee-section">
        <div className="marquee-track">
          {[...MARQUEE_WORDS, ...MARQUEE_WORDS].map((w, i) => (
            <span key={i} className="marquee-item">
              {w}<span className="marquee-sep"> · </span>
            </span>
          ))}
        </div>
      </div>

      {/* ══════════════════ ABOUT — STACKING CARDS ══════════════════ */}
      <section id="about" className="about-section">
        <div className="about-intro-wrap">
          <div className="section-label">ABOUT ME</div>
          <h2 className="section-title about-intro-heading">
            What I&apos;m<br /><span style={{ opacity: 0.22 }}>About.</span>
          </h2>
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
            <li
              key={card.num}
              className={`about-card-sticky asc-${i}`}
              style={{ top: `${60 + i * 20}px` }}
            >
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

        <div className="education-wrap">
          <div className="edu-section-header">
            <div className="section-label">EDUCATION</div>
          </div>
          <div className="edu-grid">
            <div className="edu-card edu-card--featured">
              <div className="edu-card-year">2023 – 2027</div>
              <div className="edu-card-degree">B.Tech · Computer Science Engineering</div>
              <div className="edu-card-school">Maharaja Surajmal Institute of Technology</div>
              <div className="edu-card-location">Delhi, India</div>
              <div className="edu-card-score-badge">CGPA 9.49</div>
            </div>
            <div className="edu-card">
              <div className="edu-card-year">Class XII · CBSE</div>
              <div className="edu-card-degree">Senior Secondary</div>
              <div className="edu-card-school">Holy Child Auxilium School</div>
              <div className="edu-card-location">New Delhi</div>
              <div className="edu-card-score-badge">95%</div>
            </div>
            <div className="edu-card">
              <div className="edu-card-year">Class X · CBSE</div>
              <div className="edu-card-degree">Secondary</div>
              <div className="edu-card-school">Holy Child Auxilium School</div>
              <div className="edu-card-location">New Delhi</div>
              <div className="edu-card-score-badge">96.6%</div>
            </div>
          </div>
        </div>

        <div className="about-info-strip">
          <div className="info-strip-item">
            <span className="info-strip-icon">📍</span>
            <div>
              <div className="info-strip-label">LOCATION</div>
              <div className="info-strip-value">New Delhi, India</div>
            </div>
          </div>
          <div className="info-strip-divider" />
          <div className="info-strip-item">
            <span className="info-strip-icon">🟢</span>
            <div>
              <div className="info-strip-label">AVAILABILITY</div>
              <div className="info-strip-value">Open to Work</div>
            </div>
          </div>
          <div className="info-strip-divider" />
          <div className="info-strip-item">
            <span className="info-strip-icon">🕐</span>
            <div>
              <div className="info-strip-label">HOURS</div>
              <div className="info-strip-value">Flexible · Full-time & Freelance</div>
            </div>
          </div>
          <div className="info-strip-divider" />
          <div className="info-strip-item">
            <span className="info-strip-icon">🌐</span>
            <div>
              <div className="info-strip-label">REMOTE</div>
              <div className="info-strip-value">Yes, worldwide</div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ TECH STACK ══════════════════ */}
      <div
        id="stack"
        className="stack-section"
        ref={stackOuterRef}
        style={{ height: `${TECH_CATEGORIES.length * 140}vh` }}
      >
        <div className="stack-sticky">
          <div className="stack-bg-label" aria-hidden><span>STACK</span></div>
          <div className="stack-top-left">
            <div className="section-label">TECHNOLOGIES</div>
            <h2 className="section-title" style={{ fontSize: "clamp(2rem,3.5vw,3rem)" }}>My Tech Stack</h2>
          </div>
          <div className="stack-top-right">
            {TECH_CATEGORIES.map((_, i) => (
              <div key={i} className={`stack-dot${i === activeCat ? " active" : ""}`}
                style={{ width: i === activeCat ? 28 : 8 }} />
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
      <div
        id="work"
        className="projects-section"
        ref={projOuterRef}
        style={{ height: `${PROJECTS.length * 88 + 100}vh` }}
      >
        <div className="projects-sticky">
          <div className="projects-header">
            <div>
              <div className="section-label">FEATURED PROJECTS</div>
              <h2 className="section-title">My Work</h2>
            </div>
            <span className="projects-count-badge">
              {String(PROJECTS.length).padStart(2, "0")} Projects &nbsp;·&nbsp; Scroll to explore →
            </span>
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
                    <a href={p.github} className="project-link">
                      <span style={{ display: "flex", alignItems: "center", gap: 6 }}>
                        <IconGitHub /> View on GitHub
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
          <div className="projects-progress-wrap">
            <div className="projects-progress-fill" ref={projFillRef} style={{ width: "0%" }} />
          </div>
          <div className="projects-count-row">
            <span>01</span><span>06</span>
          </div>
        </div>
      </div>

      {/* ══════════════════ EXPERIENCE ══════════════════ */}
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

      {/* ══════════════════ RESUME ══════════════════ */}
      <section id="resume" className="resume-section">
        <div className="resume-inner">
          <div className="resume-layout">
            <div className="resume-left-heading reveal from-left">
              <div className="section-label">RESUME</div>
              <h2 className="section-title">Download<br />My CV</h2>
              <p>A concise overview of my experience, skills, and the projects I&apos;ve shipped — ready to share with your team.</p>
              <div className="resume-action-btns">
                <button className="resume-dl-btn">Download PDF <IconDownload /></button>
                <button className="resume-view-btn">View Online <IconExternal /></button>
              </div>
              <div className="resume-highlights reveal d1">
                {[
                  { icon: "🎓", title: "B.Tech Computer Science", sub: "XYZ University · 2016–2020" },
                  { icon: "🏆", title: "AWS Certified Developer", sub: "Amazon Web Services · 2022" },
                  { icon: "📘", title: "Meta Frontend Certificate", sub: "Coursera · 2021" },
                  { icon: "✍️", title: "Tech Blog Author", sub: "3,000+ monthly readers" },
                ].map(h => (
                  <div key={h.title} className="resume-highlight-item">
                    <div className="rh-icon">{h.icon}</div>
                    <div>
                      <div className="rh-title">{h.title}</div>
                      <div className="rh-sub">{h.sub}</div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
            <div className="resume-mock-card reveal from-right">
              <div className="resume-mock-header">
                <div>
                  <div className="resume-name">Your Name</div>
                  <div className="resume-role-sub">Full Stack Developer</div>
                </div>
                <div className="resume-contact-block">
                  you@email.com<br />linkedin.com/in/yourname<br />github.com/yourname<br />+1 (555) 000-0000
                </div>
              </div>
              <div className="rm-section-head">Experience</div>
              <div className="rm-entry">
                <div className="rm-entry-row"><span className="rm-entry-title">Senior Full Stack Engineer · Veritas Tech</span><span className="rm-entry-date">2023–Now</span></div>
                <div className="rm-entry-sub">Led microservices migration, 60% performance improvement, CI/CD pipeline from scratch.</div>
              </div>
              <div className="rm-entry">
                <div className="rm-entry-row"><span className="rm-entry-title">Full Stack Developer · Axiom Labs</span><span className="rm-entry-date">2021–2023</span></div>
                <div className="rm-entry-sub">TypeScript adoption across 3 SaaS products, reusable component library, 40% bug rate reduction.</div>
              </div>
              <div className="rm-entry">
                <div className="rm-entry-row"><span className="rm-entry-title">Frontend Developer · Freelance</span><span className="rm-entry-date">2020–2021</span></div>
                <div className="rm-entry-sub">15+ client projects across fintech, healthcare, e-commerce.</div>
              </div>
              <div className="rm-section-head">Education</div>
              <div className="rm-entry">
                <div className="rm-entry-row"><span className="rm-entry-title">B.Tech Computer Science · XYZ University</span><span className="rm-entry-date">2016–2020</span></div>
              </div>
              <div className="rm-section-head">Core Skills</div>
              <div className="rm-tags-row">
                {["React", "Next.js", "Node.js", "TypeScript", "PostgreSQL", "AWS", "Docker", "GraphQL", "Python", "Redis"].map(s => (
                  <span key={s} className="tag-pill">{s}</span>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ══════════════════ CONTACT ══════════════════ */}
      <div id="contact" className="contact-section" ref={contactOuterRef} style={{ height: "270vh" }}>
        <div className="contact-sticky-wrap">
          <div className="contact-top-half" ref={contactTopRef}>
            <div style={{ textAlign: "center" }}>
              <div className="section-label" style={{ justifyContent: "center", marginBottom: 14 }}>GET IN TOUCH</div>
              <div className="contact-big-word">Let&apos;s Build</div>
            </div>
          </div>
          <div className="contact-bottom-half" ref={contactBotRef}>
            <div className="contact-big-word faded">Something Great.</div>
          </div>
          <div className="contact-center-line" />
          <div className="contact-form-reveal" ref={contactFormRef}
            style={{ opacity: 0, transform: "scale(0.91) translateY(40px)", pointerEvents: "none" }}>
            <div className="contact-form-box">
              <div className="contact-form-grid">
                <div>
                  <div className="contact-left-heading">Let&apos;s build<br />something<br /><span style={{ opacity: 0.22 }}>great.</span></div>
                  <div className="contact-left-desc">Open to full-time roles, freelance projects, and interesting collaborations. If you have something in mind, I&apos;d love to hear it.</div>
                  <div className="contact-info-links">
                    <a href="mailto:you@email.com" className="contact-info-link"><IconMail /> you@email.com</a>
                    <a href="#" className="contact-info-link"><IconLinkedIn /> linkedin.com/in/yourname</a>
                    <a href="#" className="contact-info-link"><IconGitHub /> github.com/yourname</a>
                  </div>
                </div>
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

      {/* ══════════════════ FOOTER ══════════════════ */}
      <footer className="site-footer">
        <div className="footer-main">
          <div className="footer-logo">
            <span>&lt;</span>YourName<span>/&gt;</span>
          </div>
          <div className="footer-tagline">Engineering Digital Products · From Logic to Launch</div>
          <div className="footer-nav-primary">
            {NAV_ITEMS.map(item => (
              <button key={item.id} className="footer-nav-primary-btn" onClick={() => scrollTo(item.id)}>
                {item.label}
              </button>
            ))}
          </div>
          <div className="footer-nav-secondary">
            {["Brand Directory", "Case Studies", "Blog", "Resume", "Open Source", "About"].map(l => (
              <button key={l} className="footer-nav-sec-btn">{l}</button>
            ))}
          </div>
          <div className="footer-socials-row">
            {[
              { icon: <IconGitHub />, label: "GitHub" },
              { icon: <IconTwitter />, label: "Twitter" },
              { icon: <IconLinkedIn />, label: "LinkedIn" },
              { icon: <IconMail />, label: "Email" },
            ].map(s => (
              <a key={s.label} href="#" className="footer-social-circ" title={s.label}>{s.icon}</a>
            ))}
          </div>
        </div>
        <div className="footer-bottom">
          <span className="footer-copy">© {new Date().getFullYear()} YourName. Built with Next.js & TypeScript.</span>
          <div className="footer-bottom-links">
            <button className="footer-bl-btn">Terms & Conditions</button>
            <button className="footer-bl-btn">Privacy Policy</button>
          </div>
          <div className="footer-status-row">
            <span className="footer-status-dot" />
            Open to work · UTC+5:30
          </div>
        </div>
      </footer>
    </>
  );
}
