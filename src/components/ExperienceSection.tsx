"use client";
import React from "react";

const experiences = [
  {
    role: "Senior Developer",
    company: "Tech Company",
    period: "2023 - Present",
    details: "Worked on various full stack features.",
  },
  {
    role: "Developer",
    company: "Another Co",
    period: "2021 - 2023",
    details: "Built web applications and APIs.",
  },
];

export const ExperienceSection: React.FC = () => {
  return (
    <section id="experience" className="min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-6">Experience</h2>
      <div className="relative w-full max-w-2xl">
        <div className="absolute left-1/2 w-1 bg-gray-600 h-full" />
        <div className="flex flex-col items-start space-y-8 pl-8">
          {experiences.map((exp, idx) => (
            <div key={idx} className="relative">
              <div className="absolute -left-5 top-0 w-4 h-4 bg-white rounded-full border border-gray-600" />
              <div className="bg-gray-800/40 p-4 rounded-lg">
                <h3 className="font-bold">{exp.role}</h3>
                <span className="text-sm">{exp.company}</span>
                <p className="text-xs">{exp.period}</p>
                <p className="mt-2 text-sm">{exp.details}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};
