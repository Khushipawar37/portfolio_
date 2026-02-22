"use client";

import { useRef } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface Project {
  num: string;
  title: string;
  desc: string;
  icon: string;
  tags: string[];
  link: string;
  github: string;
  bg: string;
}

const PROJECTS: Project[] = [
  {
    num: "01",
    title: "EcoMart",
    desc: "Full-stack e-commerce platform with real-time inventory, Stripe payments, admin dashboard, and multi-vendor support. Handles 10k+ daily transactions.",
    icon: "🛍️",
    tags: ["Next.js", "Node.js", "PostgreSQL", "Stripe"],
    link: "#",
    github: "#",
    bg: "linear-gradient(135deg, #1a1a1a 0%, #111 100%)",
  },
  {
    num: "02",
    title: "Synapse",
    desc: "Real-time collaborative workspace with live editing, video calls, nested docs, and permission management. Built for distributed teams.",
    icon: "💬",
    tags: ["React", "Socket.io", "Redis", "AWS"],
    link: "#",
    github: "#",
    bg: "linear-gradient(135deg, #161616 0%, #0f0f0f 100%)",
  },
  {
    num: "03",
    title: "DataLens",
    desc: "Enterprise analytics platform with custom chart builder, automated reports, anomaly detection, and multi-source data connectors.",
    icon: "📊",
    tags: ["Vue.js", "Python", "FastAPI", "D3.js"],
    link: "#",
    github: "#",
    bg: "linear-gradient(135deg, #181818 0%, #101010 100%)",
  },
  {
    num: "04",
    title: "Dockie",
    desc: "RAG-based AI document assistant. Upload PDFs or links and chat with your data. Supports multi-session memory and export.",
    icon: "🤖",
    tags: ["Next.js", "OpenAI", "LangChain", "Pinecone"],
    link: "#",
    github: "#",
    bg: "linear-gradient(135deg, #141414 0%, #0d0d0d 100%)",
  },
  {
    num: "05",
    title: "NestFind",
    desc: "Cross-platform real estate app with map-based search, 3D virtual tours, mortgage calculator, and secure document signing flow.",
    icon: "🏠",
    tags: ["React Native", "NestJS", "MongoDB"],
    link: "#",
    github: "#",
    bg: "linear-gradient(135deg, #171717 0%, #0e0e0e 100%)",
  },
  {
    num: "06",
    title: "FlowBoard",
    desc: "Visual project management tool with kanban boards, timeline views, automated workflows, and team analytics dashboard.",
    icon: "📋",
    tags: ["React", "TypeScript", "Zustand", "Supabase"],
    link: "#",
    github: "#",
    bg: "linear-gradient(135deg, #151515 0%, #0c0c0c 100%)",
  },
];

const CARD_WIDTH = 420;
const GAP = 24;

function ProjectCard({ project, index }: { project: Project; index: number }) {
  const cardRef = useRef<HTMLDivElement>(null);

  return (
    <motion.div
      ref={cardRef}
      data-cursor-hover
      whileHover={{ y: -8 }}
      transition={{ duration: 0.3, ease: [0.16, 1, 0.3, 1] }}
      className="relative flex-shrink-0 overflow-hidden"
      style={{
        width: CARD_WIDTH,
        height: 520,
        border: "1px solid var(--border)",
        background: "var(--card-bg)",
        borderRadius: "2px",
      }}
    >
      {/* IMAGE AREA */}
      <div
        className="relative overflow-hidden flex items-center justify-center"
        style={{ height: 220, background: project.bg }}
      >
        <motion.span
          className="text-6xl"
          whileHover={{ scale: 1.15, rotate: 5 }}
          transition={{ duration: 0.4 }}
        >
          {project.icon}
        </motion.span>
        <span
          className="absolute top-4 right-4"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            color: "rgba(255,255,255,0.25)",
          }}
        >
          {project.num}
        </span>

        {/* Subtle overlay on hover */}
        <motion.div
          className="absolute inset-0"
          style={{ background: "rgba(255,255,255,0)" }}
          whileHover={{ background: "rgba(255,255,255,0.03)" }}
        />
      </div>

      {/* BODY */}
      <div className="flex flex-col h-[300px] p-7">
        {/* TAGS */}
        <div className="flex flex-wrap gap-2 mb-4">
          {project.tags.map((tag) => (
            <span key={tag} className="tag">
              {tag}
            </span>
          ))}
        </div>

        {/* TITLE */}
        <h3
          className="mb-3"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1.35rem",
            letterSpacing: "-0.02em",
            color: "var(--fg)",
          }}
        >
          {project.title}
        </h3>

        {/* DESC */}
        <p
          className="flex-1 text-sm leading-relaxed"
          style={{ color: "var(--fg2)" }}
        >
          {project.desc}
        </p>

        {/* LINKS */}
        <div className="flex gap-3 mt-4">
          <a
            href={project.link}
            target="_blank"
            rel="noopener noreferrer"
            className="tag transition-all hover:border-[var(--border-hover)]"
            style={{ padding: "8px 16px" }}
          >
            Live Demo ↗
          </a>
          <a
            href={project.github}
            target="_blank"
            rel="noopener noreferrer"
            className="tag transition-all hover:border-[var(--border-hover)]"
            style={{ padding: "8px 16px" }}
          >
            GitHub
          </a>
        </div>
      </div>
    </motion.div>
  );
}

export default function Projects() {
  const containerRef = useRef<HTMLDivElement>(null);

  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Total horizontal distance to translate
  const totalWidth =
    PROJECTS.length * (CARD_WIDTH + GAP) - GAP - (typeof window !== "undefined" ? window.innerWidth - 160 : 1200);

  const x = useTransform(scrollYProgress, [0, 1], ["0px", `-${totalWidth}px`]);
  const springX = useSpring(x, { stiffness: 60, damping: 20 });

  return (
    <section
      id="work"
      ref={containerRef}
      style={{ height: `${PROJECTS.length * 70 + 100}vh` }}
    >
      <div
        className="sticky top-0 h-screen flex flex-col justify-center overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        {/* HEADER */}
        <div className="px-10 md:px-16 mb-12">
          <div className="section-label mb-3">FEATURED PROJECTS</div>
          <div className="flex items-end justify-between">
            <h2
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
                letterSpacing: "-0.03em",
              }}
            >
              My Work
            </h2>
            <span
              className="hidden md:block mb-2"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.72rem",
                letterSpacing: "0.08em",
                color: "var(--fg3)",
              }}
            >
              Scroll to explore →
            </span>
          </div>
        </div>

        {/* SLIDING TRACK */}
        <div className="overflow-visible">
          <motion.div
            className="flex gap-6"
            style={{
              x: springX,
              paddingLeft: "80px",
              paddingRight: "80px",
              willChange: "transform",
            }}
          >
            {PROJECTS.map((project, i) => (
              <ProjectCard key={project.num} project={project} index={i} />
            ))}
          </motion.div>
        </div>

        {/* PROGRESS */}
        <div
          className="mx-10 md:mx-16 mt-8 h-px relative overflow-hidden rounded-full"
          style={{ background: "var(--border)" }}
        >
          <motion.div
            className="absolute left-0 top-0 bottom-0 rounded-full"
            style={{
              background: "var(--fg)",
              scaleX: scrollYProgress,
              transformOrigin: "left",
            }}
          />
        </div>

        {/* PROJECT COUNT */}
        <div
          className="px-10 md:px-16 mt-3 flex justify-between"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.1em",
            color: "var(--fg3)",
          }}
        >
          <span>01</span>
          <span>{String(PROJECTS.length).padStart(2, "0")}</span>
        </div>
      </div>
    </section>
  );
}
