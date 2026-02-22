"use client";

import { useRef, useState } from "react";
import { motion, useScroll, useTransform, useSpring } from "framer-motion";

export default function Contact() {
  const sectionRef = useRef<HTMLDivElement>(null);
  const [formState, setFormState] = useState({
    name: "", email: "", subject: "", message: "",
  });
  const [sent, setSent] = useState(false);

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start end", "start start"],
  });

  // Split: top half moves up, bottom half moves down
  const topY = useTransform(scrollYProgress, [0, 1], ["0%", "-100%"]);
  const bottomY = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  // Form reveals as halves open
  const formOpacity = useTransform(scrollYProgress, [0.3, 0.7], [0, 1]);
  const formScale = useTransform(scrollYProgress, [0.3, 0.75], [0.9, 1]);
  const formY = useTransform(scrollYProgress, [0.3, 0.75], [40, 0]);

  const springTopY = useSpring(topY, { stiffness: 60, damping: 18 });
  const springBottomY = useSpring(bottomY, { stiffness: 60, damping: 18 });

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setFormState((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setTimeout(() => setSent(false), 3000);
  };

  return (
    // This section has extra height so scroll can drive animation
    <section
      id="contact"
      ref={sectionRef}
      style={{ height: "250vh", position: "relative" }}
    >
      {/* STICKY CONTAINER */}
      <div
        className="sticky top-0 h-screen overflow-hidden"
        style={{ background: "var(--bg)" }}
      >
        {/* ============== TOP HALF ============== */}
        <motion.div
          style={{ y: springTopY }}
          className="absolute top-0 left-0 right-0 h-1/2 flex items-end justify-center pb-1 z-20 overflow-hidden"
        >
          <div
            className="w-full h-full absolute inset-0"
            style={{ background: "var(--bg2)" }}
          />
          <div className="relative z-10 text-center pb-6 px-10">
            <div
              className="section-label mb-3 justify-center"
              style={{ display: "flex" }}
            >
              GET IN TOUCH
            </div>
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
                color: "var(--fg)",
                whiteSpace: "nowrap",
              }}
            >
              Let&apos;s Build
            </div>
          </div>
        </motion.div>

        {/* ============== BOTTOM HALF ============== */}
        <motion.div
          style={{ y: springBottomY }}
          className="absolute bottom-0 left-0 right-0 h-1/2 flex items-start justify-center pt-1 z-20 overflow-hidden"
        >
          <div
            className="w-full h-full absolute inset-0"
            style={{ background: "var(--bg2)" }}
          />
          <div className="relative z-10 text-center pt-6 px-10">
            <div
              style={{
                fontFamily: "'Syne', sans-serif",
                fontWeight: 800,
                fontSize: "clamp(3rem, 8vw, 7rem)",
                letterSpacing: "-0.05em",
                lineHeight: 0.9,
                color: "var(--fg)",
                opacity: 0.3,
                whiteSpace: "nowrap",
              }}
            >
              Something Great.
            </div>
          </div>
        </motion.div>

        {/* ============== FORM (REVEALED BETWEEN HALVES) ============== */}
        <motion.div
          className="absolute inset-0 flex items-center justify-center z-10 px-8 md:px-16 pointer-events-none"
          style={{
            opacity: formOpacity,
            scale: formScale,
            y: formY,
          }}
        >
          <div
            className="w-full max-w-6xl pointer-events-auto"
            style={{
              background: "var(--bg)",
              border: "1px solid var(--border)",
              borderRadius: "2px",
              boxShadow: "0 60px 120px rgba(0,0,0,0.7)",
              padding: "clamp(32px, 5vw, 64px)",
            }}
          >
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-16">
              {/* LEFT */}
              <div>
                <h2
                  className="mb-5"
                  style={{
                    fontFamily: "'Syne', sans-serif",
                    fontWeight: 800,
                    fontSize: "clamp(1.8rem, 3.5vw, 2.8rem)",
                    letterSpacing: "-0.03em",
                    lineHeight: 1.1,
                  }}
                >
                  Let&apos;s build
                  <br />
                  something
                  <br />
                  <span style={{ opacity: 0.28 }}>great.</span>
                </h2>
                <p
                  className="mb-8 text-sm leading-loose"
                  style={{ color: "var(--fg2)" }}
                >
                  Open to full-time roles, freelance projects, and interesting
                  collaborations. If you have something in mind, I&apos;d love
                  to hear it.
                </p>
                <div className="flex flex-col gap-4">
                  <ContactLink
                    icon={<EmailIcon />}
                    href="mailto:you@email.com"
                  >
                    you@email.com
                  </ContactLink>
                  <ContactLink icon={<LinkedInIcon />} href="#">
                    linkedin.com/in/yourname
                  </ContactLink>
                  <ContactLink icon={<GitHubIcon />} href="#">
                    github.com/yourname
                  </ContactLink>
                </div>
              </div>

              {/* FORM */}
              <form onSubmit={handleSubmit} className="flex flex-col gap-4">
                <div className="grid grid-cols-2 gap-4">
                  <Field
                    label="YOUR NAME"
                    name="name"
                    type="text"
                    placeholder="John Doe"
                    value={formState.name}
                    onChange={handleChange}
                  />
                  <Field
                    label="EMAIL"
                    name="email"
                    type="email"
                    placeholder="john@co.com"
                    value={formState.email}
                    onChange={handleChange}
                  />
                </div>
                <Field
                  label="SUBJECT"
                  name="subject"
                  type="text"
                  placeholder="Project Collaboration"
                  value={formState.subject}
                  onChange={handleChange}
                />
                <div className="flex flex-col gap-2">
                  <label
                    style={{
                      fontFamily: "'DM Mono', monospace",
                      fontSize: "0.68rem",
                      letterSpacing: "0.1em",
                      color: "var(--fg3)",
                    }}
                  >
                    MESSAGE
                  </label>
                  <textarea
                    name="message"
                    placeholder="Tell me about your project..."
                    className="form-textarea"
                    value={formState.message}
                    onChange={handleChange}
                  />
                </div>
                <motion.button
                  type="submit"
                  className="flex items-center justify-between px-6 py-4 rounded-sm font-medium text-sm transition-all"
                  style={{
                    background: "var(--fg)",
                    color: "var(--bg)",
                    border: "none",
                    cursor: "pointer",
                  }}
                  whileHover={{ opacity: 0.85 }}
                  whileTap={{ scale: 0.98 }}
                >
                  {sent ? "Message Sent ✓" : "Send Message"}
                  {!sent && (
                    <svg
                      width="18"
                      height="18"
                      viewBox="0 0 24 24"
                      fill="none"
                      stroke="currentColor"
                      strokeWidth={2}
                    >
                      <path d="M22 2 11 13" />
                      <path d="M22 2 15 22 11 13 2 9l20-7z" />
                    </svg>
                  )}
                </motion.button>
              </form>
            </div>
          </div>
        </motion.div>

        {/* DIVIDER LINE (gap between halves) */}
        <div
          className="absolute left-0 right-0 z-30 pointer-events-none"
          style={{
            top: "50%",
            height: "1px",
            background: "var(--border)",
          }}
        />
      </div>
    </section>
  );
}

function Field({
  label, name, type, placeholder, value, onChange,
}: {
  label: string;
  name: string;
  type: string;
  placeholder: string;
  value: string;
  onChange: (e: React.ChangeEvent<HTMLInputElement>) => void;
}) {
  return (
    <div className="flex flex-col gap-2">
      <label
        style={{
          fontFamily: "'DM Mono', monospace",
          fontSize: "0.68rem",
          letterSpacing: "0.1em",
          color: "var(--fg3)",
        }}
      >
        {label}
      </label>
      <input
        type={type}
        name={name}
        placeholder={placeholder}
        className="form-input"
        value={value}
        onChange={onChange}
      />
    </div>
  );
}

function ContactLink({
  children,
  icon,
  href,
}: {
  children: React.ReactNode;
  icon: React.ReactNode;
  href: string;
}) {
  return (
    <a
      href={href}
      className="flex items-center gap-3 text-sm transition-all nav-link"
      style={{ color: "var(--fg2)", fontFamily: "'DM Mono', monospace", fontSize: "0.82rem" }}
    >
      <span style={{ opacity: 0.45 }}>{icon}</span>
      {children}
    </a>
  );
}

function EmailIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2}>
      <rect x="2" y="4" width="20" height="16" rx="2" />
      <path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" />
    </svg>
  );
}

function LinkedInIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M19 0h-14c-2.761 0-5 2.239-5 5v14c0 2.761 2.239 5 5 5h14c2.762 0 5-2.239 5-5v-14c0-2.761-2.238-5-5-5zm-11 19h-3v-11h3v11zm-1.5-12.268c-.966 0-1.75-.79-1.75-1.764s.784-1.764 1.75-1.764 1.75.79 1.75 1.764-.783 1.764-1.75 1.764zm13.5 12.268h-3v-5.604c0-3.368-4-3.113-4 0v5.604h-3v-11h3v1.765c1.396-2.586 7-2.777 7 2.476v6.759z" />
    </svg>
  );
}

function GitHubIcon() {
  return (
    <svg width="16" height="16" viewBox="0 0 24 24" fill="currentColor">
      <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
    </svg>
  );
}
