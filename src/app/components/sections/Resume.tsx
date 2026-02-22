"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

export default function Resume() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section
      id="resume"
      className="py-32 px-10 md:px-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-3xl mx-auto text-center">
        <motion.div
          ref={ref}
          initial={{ opacity: 0, y: 32 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        >
          <div
            className="section-label mb-4 justify-center"
            style={{ display: "flex" }}
          >
            RESUME
          </div>
          <h2
            className="mb-5"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2rem, 4vw, 3.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            Download My CV
          </h2>
          <p
            className="mb-12"
            style={{ color: "var(--fg2)", lineHeight: 1.75 }}
          >
            Everything you need — background, experience, education, and skills.
          </p>

          <div className="flex items-center justify-center gap-4 flex-wrap">
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm transition-all hover:opacity-80"
              style={{ background: "var(--fg)", color: "var(--bg)" }}
            >
              Download PDF ↓
            </a>
            <a
              href="#"
              className="inline-flex items-center gap-2 px-8 py-4 rounded-full text-sm transition-all"
              style={{
                border: "1px solid var(--border)",
                color: "var(--fg2)",
              }}
            >
              View Online
            </a>
          </div>
        </motion.div>

        {/* RESUME MOCK */}
        <motion.div
          className="mt-16 text-left p-10 rounded-sm"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
          }}
          initial={{ opacity: 0, scale: 0.94 }}
          animate={inView ? { opacity: 1, scale: 1 } : {}}
          transition={{
            duration: 0.9,
            delay: 0.2,
            ease: [0.16, 1, 0.3, 1],
          }}
        >
          {/* HEADER */}
          <div
            className="flex items-start justify-between pb-6 mb-6"
            style={{ borderBottom: "1px solid var(--border)" }}
          >
            <div>
              <div
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "1.8rem",
                  letterSpacing: "-0.03em",
                }}
              >
                Your Name
              </div>
              <div
                className="mt-1 text-sm"
                style={{ color: "var(--fg2)" }}
              >
                Full Stack Developer
              </div>
            </div>
            <div
              className="text-right"
              style={{
                fontFamily: "'DM Mono', monospace",
                fontSize: "0.7rem",
                color: "var(--fg3)",
                lineHeight: 2,
              }}
            >
              you@email.com
              <br />
              linkedin.com/in/yourname
              <br />
              github.com/yourname
              <br />
              +1 (555) 000-0000
            </div>
          </div>

          {/* SECTIONS */}
          <SectionTitle>Experience</SectionTitle>
          <Row title="Senior Full Stack Engineer · Veritas Tech" date="2023–Present" />
          <Sub>Led microservices migration, 60% perf improvement, CI/CD pipeline.</Sub>
          <Row title="Full Stack Developer · Axiom Labs" date="2021–2023" />
          <Sub>TypeScript adoption, component library, 40% bug reduction.</Sub>

          <SectionTitle>Education</SectionTitle>
          <Row title="B.Tech Computer Science · XYZ University" date="2016–2020" />

          <SectionTitle>Skills</SectionTitle>
          <div className="flex flex-wrap gap-2">
            {[
              "React", "Next.js", "Node.js", "TypeScript",
              "PostgreSQL", "AWS", "Docker", "GraphQL",
            ].map((s) => (
              <span key={s} className="tag">
                {s}
              </span>
            ))}
          </div>
        </motion.div>
      </div>
    </section>
  );
}

function SectionTitle({ children }: { children: React.ReactNode }) {
  return (
    <div
      className="mt-6 mb-3"
      style={{
        fontFamily: "'Syne', sans-serif",
        fontWeight: 700,
        fontSize: "0.78rem",
        letterSpacing: "0.12em",
        textTransform: "uppercase",
        color: "var(--fg3)",
      }}
    >
      {children}
    </div>
  );
}

function Row({ title, date }: { title: string; date: string }) {
  return (
    <div className="flex justify-between items-baseline mb-1">
      <span style={{ fontWeight: 500, fontSize: "0.88rem" }}>{title}</span>
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          color: "var(--fg3)",
        }}
      >
        {date}
      </span>
    </div>
  );
}

function Sub({ children }: { children: React.ReactNode }) {
  return (
    <p className="mb-2 text-sm" style={{ color: "var(--fg2)" }}>
      {children}
    </p>
  );
}
