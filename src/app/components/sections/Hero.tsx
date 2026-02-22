"use client";

import { motion } from "framer-motion";

export default function Hero() {
  const scrollTo = (id: string) => {
    document.querySelector(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <section
      id="hero"
      className="relative min-h-screen flex items-center px-10 md:px-16 overflow-hidden"
    >
      {/* GRID BG */}
      <div
        className="absolute inset-0 pointer-events-none"
        style={{
          backgroundImage: `linear-gradient(var(--border) 1px, transparent 1px),
            linear-gradient(90deg, var(--border) 1px, transparent 1px)`,
          backgroundSize: "80px 80px",
          maskImage:
            "radial-gradient(ellipse 70% 70% at 50% 50%, black 20%, transparent 100%)",
        }}
      />

      {/* MAIN CONTENT */}
      <div className="relative z-10 max-w-4xl pt-24">
        {/* BADGE */}
        <motion.div
          className="inline-flex items-center gap-2 mb-10 px-4 py-2 rounded-full border"
          style={{
            border: "1px solid var(--border)",
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.74rem",
            letterSpacing: "0.1em",
            color: "var(--fg2)",
          }}
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2 }}
        >
          <span
            className="w-2 h-2 rounded-full pulse-dot"
            style={{ background: "#22c55e" }}
          />
          Available for work &nbsp;·&nbsp; Full Stack Developer
        </motion.div>

        {/* NAME LINES */}
        <h1
          className="mb-7"
          style={{
            fontFamily: "'Syne', sans-serif",
            fontWeight: 800,
            fontSize: "clamp(3.2rem, 8vw, 6.5rem)",
            lineHeight: 0.95,
            letterSpacing: "-0.04em",
          }}
        >
          {["Building", "Digital Experiences", "From Scratch."].map((line, i) => (
            <span key={i} className="block overflow-hidden">
              <span
                className="hero-line-inner"
                style={{
                  animationDelay: `${i * 0.12}s`,
                  opacity: i === 2 ? 0.28 : 1,
                }}
              >
                {line}
              </span>
            </span>
          ))}
        </h1>

        {/* DESC */}
        <motion.p
          className="mb-10 max-w-md"
          style={{
            fontSize: "1rem",
            color: "var(--fg2)",
            lineHeight: 1.75,
          }}
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.7 }}
        >
          Full-stack developer crafting scalable web apps with clean code,
          thoughtful architecture, and pixel-perfect interfaces.
        </motion.p>

        {/* CTA */}
        <motion.div
          className="flex items-center gap-6"
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.7, delay: 0.9 }}
        >
          <button
            onClick={() => scrollTo("#work")}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-full font-medium text-sm transition-all hover:opacity-85"
            style={{
              background: "var(--fg)",
              color: "var(--bg)",
            }}
          >
            View My Work →
          </button>
          <button
            onClick={() => scrollTo("#contact")}
            className="text-sm transition-all"
            style={{ color: "var(--fg2)" }}
          >
            Get in touch
          </button>
        </motion.div>
      </div>

      {/* SOCIALS — RIGHT */}
      <motion.div
        className="absolute right-16 top-1/2 -translate-y-1/2 hidden lg:flex flex-col items-center gap-5"
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.2, duration: 0.6 }}
      >
        <div
          className="w-px h-14"
          style={{ background: "var(--border)" }}
        />
        {["GitHub", "LinkedIn", "Twitter"].map((s) => (
          <a
            key={s}
            href="#"
            className="nav-link"
            style={{
              writingMode: "vertical-rl",
              transform: "rotate(180deg)",
              color: "var(--fg3)",
              fontSize: "0.68rem",
              letterSpacing: "0.12em",
            }}
          >
            {s}
          </a>
        ))}
        <div
          className="w-px h-14"
          style={{ background: "var(--border)" }}
        />
      </motion.div>

      {/* SCROLL HINT */}
      <motion.div
        className="absolute bottom-10 left-10 md:left-16 flex items-center gap-3"
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.7rem",
          letterSpacing: "0.12em",
          color: "var(--fg3)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        <div
          className="scan-line relative overflow-hidden"
          style={{ width: 40, height: 1, background: "var(--fg3)" }}
        />
        SCROLL
      </motion.div>

      {/* YEAR */}
      <motion.div
        className="absolute bottom-10 right-10 md:right-16"
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.1em",
          color: "var(--fg3)",
        }}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.4, duration: 0.6 }}
      >
        © 2025
      </motion.div>
    </section>
  );
}
