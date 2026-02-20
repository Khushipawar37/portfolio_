"use client";
import React from "react";
import { useInView } from "react-intersection-observer";

export const ContactSection: React.FC = () => {
  const { ref, inView } = useInView({ triggerOnce: true });

  return (
    <section
      id="contact"
      ref={ref}
      className="min-h-screen flex flex-col items-center justify-center"
    >
      <h2
        className={`text-3xl font-semibold mb-6 transition-transform duration-500 
          ${inView ? "translate-y-0" : "translate-y-10 opacity-0"}`}
      >
        Contact <span className="text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-400">Us</span>
      </h2>
      <p className="max-w-md text-center">
        I'm always open to collaborating. Reach out via email or connect on LinkedIn.
      </p>
      <div className="mt-4 space-x-4">
        <a
          href="mailto:example@example.com"
          className="underline hover:text-gray-400"
        >
          example@example.com
        </a>
        <a
          href="https://linkedin.com"
          target="_blank"
          rel="noopener noreferrer"
          className="underline hover:text-gray-400"
        >
          LinkedIn
        </a>
      </div>
    </section>
  );
};
