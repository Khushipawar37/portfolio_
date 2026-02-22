"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

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
    desc: "Developed and maintained 3 production SaaS products. Introduced TypeScript across the codebase, reducing bug rate by 40%. Built a reusable component library used by 8 product teams.",
    skills: ["React", "Node.js", "TypeScript", "GraphQL"],
  },
  {
    period: "2020 — 2021",
    company: "Freelance",
    role: "Frontend Developer",
    desc: "Delivered 15+ projects for clients across fintech, healthcare, and e-commerce. Specialized in React SPAs and interactive data visualizations with D3.js.",
    skills: ["React", "Vue", "D3.js", "Firebase"],
  },
];

function ExpItem({
  exp,
  index,
}: {
  exp: (typeof EXPERIENCES)[0];
  index: number;
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <motion.div
      ref={ref}
      className="relative grid md:grid-cols-[200px_1fr] gap-6 md:gap-12 py-10 pl-10 md:pl-12"
      style={{ borderBottom: "1px solid var(--border)" }}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.7, delay: index * 0.1, ease: [0.16, 1, 0.3, 1] }}
    >
      {/* TIMELINE DOT */}
      <div
        className="absolute left-0 top-12 w-2 h-2 rounded-full transition-all"
        style={{ background: "var(--fg3)" }}
      />

      {/* META */}
      <div className="pt-1">
        <div
          className="mb-2"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.72rem",
            letterSpacing: "0.08em",
            color: "var(--fg3)",
          }}
        >
          {exp.period}
        </div>
        <div style={{ fontSize: "0.85rem", color: "var(--fg2)" }}>
          {exp.company}
        </div>
      </div>

      {/* CONTENT */}
      <div>
        <h3
          className="mb-3"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 700,
            fontSize: "1.2rem",
            letterSpacing: "-0.02em",
          }}
        >
          {exp.role}
        </h3>
        <p
          className="mb-4 text-sm leading-loose"
          style={{ color: "var(--fg2)" }}
        >
          {exp.desc}
        </p>
        <div className="flex flex-wrap gap-2">
          {exp.skills.map((s) => (
            <span key={s} className="tag">
              {s}
            </span>
          ))}
        </div>
      </div>
    </motion.div>
  );
}

export default function Experience() {
  const headerRef = useRef(null);
  const inView = useInView(headerRef, { once: true });

  return (
    <section
      id="experience"
      className="py-32 px-10 md:px-16"
      style={{ background: "var(--bg2)" }}
    >
      <div className="max-w-4xl mx-auto">
        <motion.div
          ref={headerRef}
          className="mb-16"
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        >
          <div className="section-label mb-4">WORK HISTORY</div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Experience
          </h2>
        </motion.div>

        {/* TIMELINE */}
        <div className="relative">
          <div
            className="absolute left-0 top-0 bottom-0 w-px"
            style={{ background: "var(--border)" }}
          />
          {EXPERIENCES.map((exp, i) => (
            <ExpItem key={exp.role} exp={exp} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}
