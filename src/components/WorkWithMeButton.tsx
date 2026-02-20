"use client";
import React from "react";

export const WorkWithMeButton: React.FC = () => {
  return (
    <div className="fixed top-6 left-1/2 transform -translate-x-1/2 z-50">
      <a
        href="#contact"
        className="relative inline-block px-6 py-3 font-semibold text-white group
          before:absolute before:inset-0 before:scale-x-0 before:bg-white before:origin-left
          before:transition-transform before:duration-300
          hover:before:scale-x-100 hover:text-black"
      >
        Work with me
      </a>
    </div>
  );
};
