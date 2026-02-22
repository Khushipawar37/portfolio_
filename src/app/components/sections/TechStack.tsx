"use client";

import { useRef, useEffect, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

interface TechCategory {
  label: string;
  emoji: string;
  name: string;
  color: string;
  skills: { icon: string; name: string }[];
}

const CATEGORIES: TechCategory[] = [
  {
    label: "01 / FRONTEND",
    emoji: "🖥️",
    name: "Frontend",
    color: "#f0f0f0",
    skills: [
      { icon: "⚛️", name: "React" },
      { icon: "▲", name: "Next.js" },
      { icon: "🔷", name: "TypeScript" },
      { icon: "🎨", name: "Tailwind CSS" },
      { icon: "⚡", name: "Vite" },
      { icon: "🌐", name: "Vue.js" },
      { icon: "🎭", name: "Framer Motion" },
      { icon: "📦", name: "Redux" },
    ],
  },
  {
    label: "02 / BACKEND",
    emoji: "⚙️",
    name: "Backend",
    color: "#c8c8c8",
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
    emoji: "☁️",
    name: "DevOps & Cloud",
    color: "#a0a0a0",
    skills: [
      { icon: "🐳", name: "Docker" },
      { icon: "☸", name: "Kubernetes" },
      { icon: "🟠", name: "AWS" },
      { icon: "🔵", name: "Azure" },
      { icon: "🔁", name: "GitHub CI/CD" },
      { icon: "📊", name: "Terraform" },
      { icon: "🔍", name: "Datadog" },
      { icon: "🌊", name: "Vercel" },
    ],
  },
  {
    label: "04 / DATABASES & TOOLS",
    emoji: "🗄️",
    name: "Databases & Tools",
    color: "#808080",
    skills: [
      { icon: "🐘", name: "PostgreSQL" },
      { icon: "🍃", name: "MongoDB" },
      { icon: "⚡", name: "Redis" },
      { icon: "🔷", name: "Prisma ORM" },
      { icon: "🔍", name: "Elasticsearch" },
      { icon: "📬", name: "RabbitMQ" },
      { icon: "📋", name: "Jira" },
      { icon: "🎯", name: "Figma" },
    ],
  },
];

function TechCard3D({
  category,
  index,
  total,
  containerRef,
}: {
  category: TechCategory;
  index: number;
  total: number;
  containerRef: React.RefObject<HTMLDivElement | null>;
}) {
  const cardRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  // Each card occupies 1/total of the scroll range
  const segmentSize = 1 / total;
  const segmentStart = index * segmentSize;
  const segmentEnd = segmentStart + segmentSize;
  const midPoint = segmentStart + segmentSize * 0.5;

  // Entry: from below, zoom in
  const y = useTransform(
    scrollYProgress,
    [segmentStart, midPoint, segmentEnd],
    ["80px", "0px", "-80px"]
  );
  const scale = useTransform(
    scrollYProgress,
    [segmentStart, midPoint, segmentEnd],
    [0.85, 1, 0.92]
  );
  const opacity = useTransform(
    scrollYProgress,
    [segmentStart, segmentStart + 0.05, segmentEnd - 0.05, segmentEnd],
    [0, 1, 1, 0]
  );
  const rotateX = useTransform(
    scrollYProgress,
    [segmentStart, midPoint, segmentEnd],
    [18, 0, -12]
  );
  const rotateY = useTransform(
    scrollYProgress,
    [segmentStart, midPoint, segmentEnd],
    [-6, 0, 4]
  );

  const springY = useSpring(y, { stiffness: 80, damping: 20 });
  const springScale = useSpring(scale, { stiffness: 80, damping: 20 });
  const springRotX = useSpring(rotateX, { stiffness: 80, damping: 20 });
  const springRotY = useSpring(rotateY, { stiffness: 80, damping: 20 });

  // Mouse tilt
  const [tilt, setTilt] = useState({ x: 0, y: 0 });
  const handleMouseMove = (e: React.MouseEvent<HTMLDivElement>) => {
    const rect = cardRef.current?.getBoundingClientRect();
    if (!rect) return;
    const cx = (e.clientX - rect.left) / rect.width - 0.5;
    const cy = (e.clientY - rect.top) / rect.height - 0.5;
    setTilt({ x: cy * -12, y: cx * 12 });
  };
  const handleMouseLeave = () => setTilt({ x: 0, y: 0 });

  return (
    <motion.div
      style={{
        y: springY,
        scale: springScale,
        opacity,
        perspective: 1200,
        position: "absolute",
        inset: 0,
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        pointerEvents: "none",
      }}
    >
      <motion.div
        ref={cardRef}
        onMouseMove={handleMouseMove}
        onMouseLeave={handleMouseLeave}
        style={{
          rotateX: springRotX,
          rotateY: springRotY,
          transformStyle: "preserve-3d",
          rotateX: tilt.x + (springRotX.get?.() ?? 0),
          rotateY: tilt.y + (springRotY.get?.() ?? 0),
          pointerEvents: "auto",
        }}
        className="relative w-full max-w-2xl"
      >
        <div
          className="p-10 md:p-14 rounded-sm"
          style={{
            background: "var(--card-bg)",
            border: "1px solid var(--border)",
            boxShadow: "0 40px 100px rgba(0,0,0,0.6)",
          }}
        >
          {/* CARD HEADER */}
          <div className="flex items-start justify-between mb-10">
            <div>
              <div
                className="section-label mb-3"
                style={{
                  fontFamily: "'DM Mono', monospace",
                  fontSize: "0.7rem",
                  letterSpacing: "0.15em",
                  color: "var(--fg3)",
                }}
              >
                {category.label}
              </div>
              <h3
                style={{
                  fontFamily: "'Syne', sans-serif",
                  fontWeight: 800,
                  fontSize: "clamp(2rem, 4vw, 3rem)",
                  letterSpacing: "-0.03em",
                  color: "var(--fg)",
                }}
              >
                {category.name}
              </h3>
            </div>
            <span style={{ fontSize: "3.5rem" }}>{category.emoji}</span>
          </div>

          {/* SKILLS GRID */}
          <div className="grid grid-cols-4 gap-3">
            {category.skills.map((skill) => (
              <div
                key={skill.name}
                className="flex flex-col items-center gap-2 p-4 rounded-sm transition-all"
                style={{
                  border: "1px solid var(--border)",
                  background: "var(--bg2)",
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border-hover)";
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--bg3)";
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.borderColor =
                    "var(--border)";
                  (e.currentTarget as HTMLElement).style.background =
                    "var(--bg2)";
                }}
              >
                <span style={{ fontSize: "1.6rem" }}>{skill.icon}</span>
                <span
                  style={{
                    fontFamily: "'DM Mono', monospace",
                    fontSize: "0.68rem",
                    color: "var(--fg2)",
                    textAlign: "center",
                  }}
                >
                  {skill.name}
                </span>
              </div>
            ))}
          </div>

          {/* CARD INDEX */}
          <div
            className="absolute top-8 right-10"
            style={{
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.7rem",
              color: "var(--fg3)",
              letterSpacing: "0.1em",
            }}
          >
            {String(index + 1).padStart(2, "0")} / {String(total).padStart(2, "0")}
          </div>
        </div>
      </motion.div>
    </motion.div>
  );
}

export default function TechStack() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  const [active, setActive] = useState(0);

  useEffect(() => {
    return scrollYProgress.on("change", (v) => {
      const idx = Math.min(
        CATEGORIES.length - 1,
        Math.floor(v * CATEGORIES.length)
      );
      setActive(idx);
    });
  }, [scrollYProgress]);

  return (
    <section
      id="stack"
      ref={containerRef}
      style={{ height: `${CATEGORIES.length * 120}vh` }}
    >
      {/* STICKY VIEWPORT */}
      <div
        className="sticky top-0 h-screen flex flex-col items-center justify-center overflow-hidden px-10 md:px-16"
        style={{ background: "var(--bg2)" }}
      >
        {/* SECTION HEADER */}
        <div className="absolute top-10 md:top-14 left-10 md:left-16">
          <div className="section-label mb-3">TECHNOLOGIES</div>
          <h2
            style={{
              fontFamily: "'Syne', sans-serif",
              fontWeight: 800,
              fontSize: "clamp(1.8rem, 3vw, 2.5rem)",
              letterSpacing: "-0.03em",
            }}
          >
            My Tech Stack
          </h2>
        </div>

        {/* PROGRESS DOTS */}
        <div className="absolute right-10 md:right-16 top-1/2 -translate-y-1/2 flex flex-col gap-3">
          {CATEGORIES.map((_, i) => (
            <div
              key={i}
              className="transition-all duration-300"
              style={{
                width: i === active ? "24px" : "8px",
                height: "8px",
                borderRadius: "100px",
                background:
                  i === active ? "var(--fg)" : "var(--fg3)",
              }}
            />
          ))}
        </div>

        {/* CARD STAGE */}
        <div
          className="relative w-full max-w-2xl"
          style={{
            height: "min(520px, 80vh)",
            perspective: "1200px",
          }}
        >
          {CATEGORIES.map((cat, i) => (
            <TechCard3D
              key={cat.name}
              category={cat}
              index={i}
              total={CATEGORIES.length}
              containerRef={containerRef}
            />
          ))}
        </div>

        {/* SCROLL HINT */}
        <div
          className="absolute bottom-10 left-1/2 -translate-x-1/2 text-center"
          style={{
            fontFamily: "'DM Mono', monospace",
            fontSize: "0.68rem",
            letterSpacing: "0.12em",
            color: "var(--fg3)",
          }}
        >
          SCROLL TO EXPLORE
        </div>
      </div>
    </section>
  );
}
