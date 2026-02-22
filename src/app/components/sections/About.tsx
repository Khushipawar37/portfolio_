"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";

const stats = [
  { num: "4+", label: "Years of Experience" },
  { num: "30+", label: "Projects Shipped" },
  { num: "12+", label: "Clients Worldwide" },
  { num: "99%", label: "Client Satisfaction" },
];

function FadeIn({
  children,
  delay = 0,
  direction = "up",
}: {
  children: React.ReactNode;
  delay?: number;
  direction?: "up" | "left" | "right";
}) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  const variants = {
    hidden: {
      opacity: 0,
      y: direction === "up" ? 32 : 0,
      x: direction === "left" ? -32 : direction === "right" ? 32 : 0,
    },
    visible: { opacity: 1, y: 0, x: 0 },
  };

  return (
    <motion.div
      ref={ref}
      variants={variants}
      initial="hidden"
      animate={inView ? "visible" : "hidden"}
      transition={{
        duration: 0.8,
        delay,
        ease: [0.16, 1, 0.3, 1],
      }}
    >
      {children}
    </motion.div>
  );
}

export default function About() {
  return (
    <section
      id="about"
      className="py-32 px-10 md:px-16"
      style={{ background: "var(--bg)" }}
    >
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-20 items-center">
        {/* LEFT TEXT */}
        <FadeIn direction="left">
          <div className="section-label mb-4">ABOUT ME</div>
          <h2
            className="mb-7"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(2.2rem, 5vw, 3.8rem)",
              letterSpacing: "-0.03em",
              lineHeight: 1.05,
            }}
          >
            Code is my<br />
            <span style={{ opacity: 0.28 }}>craft</span>
          </h2>
          <p
            className="mb-4"
            style={{ color: "var(--fg2)", lineHeight: 1.8, fontSize: "0.98rem" }}
          >
            I&apos;m a full-stack developer with a passion for building products
            that live at the intersection of engineering and design. I care
            deeply about performance, accessibility, and developer experience.
          </p>
          <p
            style={{ color: "var(--fg2)", lineHeight: 1.8, fontSize: "0.98rem" }}
          >
            With 4+ years of experience, I&apos;ve worked across the entire
            stack — from pixel-perfect UIs to robust backend systems, CI/CD
            pipelines, and cloud infrastructure.
          </p>
        </FadeIn>

        {/* RIGHT STATS */}
        <div className="grid grid-cols-2 gap-[2px]">
          {stats.map((s, i) => (
            <FadeIn key={s.label} direction="right" delay={i * 0.1}>
              <div
                className="p-8 transition-all cursor-default"
                style={{
                  background: "var(--card-bg)",
                  border: "1px solid var(--border)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border-hover)";
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--card-hover)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--card-bg)";
                }}
              >
                <div
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(2.2rem, 4vw, 3rem)",
                    letterSpacing: "-0.04em",
                    lineHeight: 1,
                  }}
                >
                  {s.num}
                </div>
                <div
                  className="mt-2 text-sm"
                  style={{ color: "var(--fg2)" }}
                >
                  {s.label}
                </div>
              </div>
            </FadeIn>
          ))}
        </div>
      </div>
    </section>
  );
}
