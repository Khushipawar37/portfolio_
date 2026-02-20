"use client";
import React from "react";
import { ScrollMenu, VisibilityContext } from "react-horizontal-scrolling-menu";

const projects = [
  {
    title: "Project One",
    description: "A cool project description",
    link: "#",
  },
  {
    title: "Project Two",
    description: "Another project description",
    link: "#",
  },
  {
    title: "Project Three",
    description: "More details about this project",
    link: "#",
  },
];

export const ProjectsSection: React.FC = () => {
  return (
    <section id="projects" className="min-h-screen flex flex-col items-center">
      <h2 className="text-3xl font-semibold mb-6">Recent Projects</h2>
      <div className="w-full">
        <ScrollMenu>
          {projects.map((p, idx) => (
            <div
              key={idx}
              className="w-80 h-48 m-4 bg-gray-800/50 rounded-lg p-4 flex-shrink-0"
            >
              <h3 className="text-xl font-bold mb-2">{p.title}</h3>
              <p className="text-sm">{p.description}</p>
            </div>
          ))}
        </ScrollMenu>
      </div>
    </section>
  );
};
