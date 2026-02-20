"use client";
import React from "react";

export const EducationSection: React.FC = () => {
  return (
    <section id="education" className="min-h-screen flex flex-col items-center justify-center">
      <h2 className="text-3xl font-semibold mb-6">Education</h2>
      <p className="max-w-xl text-center">
        Bachelor of Science in Computer Science, University X
      </p>
      <a
        href="/resume.pdf"
        target="_blank"
        rel="noopener noreferrer"
        className="mt-4 px-4 py-2 border border-gray-500 rounded hover:bg-gray-200 dark:hover:bg-gray-700"
      >
        Download / Preview Resume
      </a>
    </section>
  );
};
