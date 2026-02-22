"use client";

const items = [
  "React", "Next.js", "TypeScript", "Node.js",
  "PostgreSQL", "Docker", "AWS", "GraphQL",
  "TailwindCSS", "Redis", "Kubernetes", "Prisma",
];

export default function Marquee() {
  const doubled = [...items, ...items];

  return (
    <div
      className="py-5 overflow-hidden whitespace-nowrap"
      style={{
        borderTop: "1px solid var(--border)",
        borderBottom: "1px solid var(--border)",
        background: "var(--bg)",
      }}
    >
      <div className="marquee-track inline-flex gap-0">
        {doubled.map((item, i) => (
          <span
            key={i}
            className="inline-flex items-center gap-5 px-8"
            style={{
              fontFamily: "'Syne', sans-serif",
              fontSize: "0.88rem",
              fontWeight: 700,
              letterSpacing: "0.06em",
              textTransform: "uppercase",
              color: "var(--fg3)",
            }}
          >
            {item}
            <span style={{ color: "var(--fg3)", fontSize: "1.1rem" }}>·</span>
          </span>
        ))}
      </div>
    </div>
  );
}
