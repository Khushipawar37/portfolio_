"use client";

export default function Footer() {
  return (
    <footer
      className="flex items-center justify-between px-10 md:px-16 py-8"
      style={{ borderTop: "1px solid var(--border)", background: "var(--bg)" }}
    >
      <span
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.72rem",
          letterSpacing: "0.06em",
          color: "var(--fg3)",
        }}
      >
        © 2025 YourName. All rights reserved.
      </span>
      <span
        style={{
          fontSize: "0.82rem",
          color: "var(--fg3)",
        }}
      >
        Designed & Built with ♥
      </span>
    </footer>
  );
}
