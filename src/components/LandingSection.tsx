"use client";
import React from "react";

export const LandingSection: React.FC = () => {
  return (
    <section id="home" className="min-h-screen flex items-center justify-center">
      <div className="text-center space-y-4">
        <h1 className="text-4xl font-bold">I'm a Full Stack Developer</h1>
        <p className="text-lg max-w-xl mx-auto">
          Crafting modern, performant web experiences with Next.js and TypeScript.
        </p>
      </div>
    </section>
  );
};
