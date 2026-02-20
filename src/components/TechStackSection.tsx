"use client";
import React from "react";

const techs = [
  "Next.js",
  "TypeScript",
  "React",
  "Tailwind CSS",
  "Node.js",
  "Express",
  "Prisma",
  "PostgreSQL",
];

export const TechStackSection: React.FC = () => {
  return (
    <section id="tech" className="min-h-screen flex items-center justify-center">
      <div className="max-w-3xl mx-auto">
        <h2 className="text-3xl font-semibold mb-6">Tech Stack</h2>
        <div className="flex flex-wrap justify-center gap-4">
          {techs.map((t) => (
            <span
              key={t}
              className="px-4 py-2 border border-gray-600 rounded-full text-sm"
            >
              {t}
            </span>
          ))}
        </div>
      </div>
    </section>
  );
};
