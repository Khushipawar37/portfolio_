"use client";

import React, { useEffect, useRef, useState } from "react";

const sections = [
  { id: "home", label: "Home" },
  { id: "tech", label: "Tech" },
  { id: "projects", label: "Projects" },
  { id: "experience", label: "Experience" },
  { id: "education", label: "Education" },
  { id: "contact", label: "Contact" },
];

export const Navbar: React.FC = () => {
  const [active, setActive] = useState<string>("home");

  useEffect(() => {
    const handler = () => {
      const scrollPos = window.scrollY + window.innerHeight / 2;
      for (const sec of sections) {
        const el = document.getElementById(sec.id);
        if (el) {
          const rect = el.getBoundingClientRect();
          const top = rect.top + window.scrollY;
          if (scrollPos >= top) {
            setActive(sec.id);
          }
        }
      }
    };
    window.addEventListener("scroll", handler);
    return () => window.removeEventListener("scroll", handler);
  }, []);

  const handleKeyDown = (e: KeyboardEvent) => {
    if (e.key === "ArrowDown" || e.key === "ArrowUp") {
      e.preventDefault();
      const idx = sections.findIndex((s) => s.id === active);
      if (idx !== -1) {
        const next =
          e.key === "ArrowDown"
            ? sections[Math.min(sections.length - 1, idx + 1)]
            : sections[Math.max(0, idx - 1)];
        document.getElementById(next.id)?.scrollIntoView({ behavior: "smooth" });
      }
    }
  };

  useEffect(() => {
    window.addEventListener("keydown", handleKeyDown);
    return () => window.removeEventListener("keydown", handleKeyDown);
  }, [active]);

  return (
    <nav className="fixed bottom-4 right-4 z-50 flex flex-col space-y-2 text-xs font-mono text-gray-500 dark:text-gray-400">
      {sections.map((sec, idx) => (
        <button
          key={sec.id}
          className={`flex items-center space-x-1 focus:outline-none 
            ${active === sec.id ? "text-white" : "opacity-60"}`}
          onClick={() => {
            document
              .getElementById(sec.id)
              ?.scrollIntoView({ behavior: "smooth" });
          }}
        >
          <span className="font-bold">0{idx + 1}</span>
          <span>{sec.label}</span>
        </button>
      ))}
    </nav>
  );
};
