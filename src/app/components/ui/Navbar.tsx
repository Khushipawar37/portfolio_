"use client";

import { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { useTheme } from "./ThemeProvider";

const NAV_LINKS = [
  { label: "About", href: "#about" },
  { label: "Stack", href: "#stack" },
  { label: "Work", href: "#work" },
  { label: "Experience", href: "#experience" },
  { label: "Contact", href: "#contact" },
];

export default function Navbar() {
  const { theme, toggle } = useTheme();
  const [scrolled, setScrolled] = useState(false);
  const [scrollPct, setScrollPct] = useState(0);
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    const onScroll = () => {
      setScrolled(window.scrollY > 50);
      const max =
        document.documentElement.scrollHeight - window.innerHeight;
      setScrollPct(max > 0 ? (window.scrollY / max) * 100 : 0);
    };
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  const scrollTo = (href: string) => {
    setMenuOpen(false);
    const target = document.querySelector(href);
    if (target) target.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* SCROLL PROGRESS */}
      <div
        className="fixed top-0 left-0 z-[200] h-[2px] bg-[var(--fg)] transition-all"
        style={{ width: `${scrollPct}%` }}
      />

      {/* NAV */}
      <motion.nav
        className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between px-10 md:px-16"
        initial={{ y: -80, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        transition={{ duration: 0.7, ease: [0.16, 1, 0.3, 1] }}
        style={{
          paddingTop: scrolled ? "14px" : "22px",
          paddingBottom: scrolled ? "14px" : "22px",
          background: scrolled ? "var(--nav-blur-bg)" : "transparent",
          backdropFilter: scrolled ? "blur(16px)" : "none",
          borderBottom: scrolled ? "1px solid var(--border)" : "none",
          transition: "padding 0.3s, background 0.3s, border 0.3s",
        }}
      >
        {/* LOGO */}
        <button
          onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
          className="font-syne font-extrabold text-xl tracking-tight"
          style={{ fontFamily: "'Syne', sans-serif", letterSpacing: "-0.04em" }}
        >
          <span style={{ opacity: 0.35 }}>&lt;</span>
          YourName
          <span style={{ opacity: 0.35 }}>/&gt;</span>
        </button>

        {/* DESKTOP LINKS */}
        <div className="hidden md:flex items-center gap-9">
          {NAV_LINKS.map((link) => (
            <button
              key={link.label}
              onClick={() => scrollTo(link.href)}
              className="nav-link"
            >
              {link.label}
            </button>
          ))}
        </div>

        {/* RIGHT ACTIONS */}
        <div className="flex items-center gap-3">
          <button
            onClick={toggle}
            className="hidden md:flex items-center gap-2 px-4 py-2 rounded-full text-xs font-mono border transition-all"
            style={{
              border: "1px solid var(--border)",
              color: "var(--fg2)",
              background: "transparent",
              fontFamily: "'DM Mono', monospace",
              letterSpacing: "0.06em",
            }}
          >
            {theme === "dark" ? (
              <>
                <span>☀</span> Light
              </>
            ) : (
              <>
                <span>☾</span> Dark
              </>
            )}
          </button>

          <button
            onClick={() => scrollTo("#contact")}
            className="hidden md:block px-6 py-2 rounded-full text-sm font-medium transition-all hover:opacity-80"
            style={{
              background: "var(--fg)",
              color: "var(--bg)",
              fontFamily: "'DM Mono', monospace",
              fontSize: "0.78rem",
              letterSpacing: "0.04em",
            }}
          >
            Hire Me
          </button>

          {/* HAMBURGER */}
          <button
            className="md:hidden flex flex-col gap-1.5 p-2"
            onClick={() => setMenuOpen((o) => !o)}
            aria-label="Menu"
          >
            <motion.span
              className="block h-[1px] w-6 origin-center"
              style={{ background: "var(--fg)" }}
              animate={menuOpen ? { rotate: 45, y: 5 } : { rotate: 0, y: 0 }}
            />
            <motion.span
              className="block h-[1px] w-6"
              style={{ background: "var(--fg)" }}
              animate={menuOpen ? { opacity: 0 } : { opacity: 1 }}
            />
            <motion.span
              className="block h-[1px] w-6 origin-center"
              style={{ background: "var(--fg)" }}
              animate={menuOpen ? { rotate: -45, y: -5 } : { rotate: 0, y: 0 }}
            />
          </button>
        </div>
      </motion.nav>

      {/* MOBILE MENU */}
      <AnimatePresence>
        {menuOpen && (
          <motion.div
            className="fixed inset-0 z-[90] flex flex-col items-center justify-center"
            style={{ background: "var(--bg)" }}
            initial={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            animate={{ opacity: 1, clipPath: "inset(0 0 0% 0)" }}
            exit={{ opacity: 0, clipPath: "inset(0 0 100% 0)" }}
            transition={{ duration: 0.5, ease: [0.16, 1, 0.3, 1] }}
          >
            <div className="flex flex-col items-center gap-8">
              {NAV_LINKS.map((link, i) => (
                <motion.button
                  key={link.label}
                  onClick={() => scrollTo(link.href)}
                  className="text-4xl font-extrabold tracking-tight"
                  style={{ fontFamily: "'Syne', sans-serif", color: "var(--fg)" }}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: i * 0.07, duration: 0.4 }}
                >
                  {link.label}
                </motion.button>
              ))}
              <motion.button
                onClick={toggle}
                className="mt-4 text-sm font-mono"
                style={{ color: "var(--fg3)", fontFamily: "'DM Mono', monospace" }}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: 0.4 }}
              >
                {theme === "dark" ? "Switch to Light" : "Switch to Dark"}
              </motion.button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      <style jsx>{`
        nav {
          --nav-blur-bg: rgba(8, 8, 8, 0.85);
        }
        :global(.light) nav {
          --nav-blur-bg: rgba(248, 248, 248, 0.85);
        }
      `}</style>
    </>
  );
}
