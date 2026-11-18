"use client";

import React, { useState } from "react";
import Link from "next/link";

export interface ProjectItem {
  id: string;
  title: string;
  date: string;
  description: string;
  image: string;
  link: string;
  folderColor: "light" | "dark";
}

// =========================================================================
// EASILY UPDATE OR ADD NEW PROJECTS HERE!
// (Title, Date, Description, Image, Link, Folder Color)
// =========================================================================
export const INITIAL_PROJECTS: ProjectItem[] = [
  {
    id: "01",
    title: "Wayline",
    date: "MAR 19, 2026",
    description:
      "Making a whole city's transit app feel less like decoding a puzzle.",
    image:
      "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?auto=format&fit=crop&w=900&q=80",
    link: "/contact",
    folderColor: "light",
  },
  {
    id: "02",
    title: "Tandem",
    date: "MAR 2, 2026",
    description:
      "From 'who owes who' to money that finally feels relaxed.",
    image:
      "https://images.unsplash.com/photo-1551288049-bebda4e38f71?auto=format&fit=crop&w=900&q=80",
    link: "/contact",
    folderColor: "dark",
  },
  {
    id: "03",
    title: "HyperScale",
    date: "FEB 14, 2026",
    description:
      "Achieved a verified 100/100 Google Lighthouse score and +280% organic traffic.",
    image:
      "https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=900&q=80",
    link: "/contact",
    folderColor: "light",
  },
  {
    id: "04",
    title: "Aura",
    date: "JAN 28, 2026",
    description:
      "A bold, high-converting digital storefront delivering a 4.2x conversion jump.",
    image:
      "https://images.unsplash.com/photo-1507238691740-187a5b1d37b8?auto=format&fit=crop&w=900&q=80",
    link: "/contact",
    folderColor: "dark",
  },
];

export const FeaturedWorksSection: React.FC = () => {
  const [projects] = useState<ProjectItem[]>(INITIAL_PROJECTS);

  return (
    <section id="work" className="relative w-full bg-white white-paper-ruled border-b-2 border-ink-black py-16 sm:py-20 md:py-24 px-4 sm:px-8 overflow-hidden select-none">
      {/* Container - Expansive Full-Width Layout */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* Top Handwritten Intro Note */}
        <div className="mb-2 text-left">
          <span className="font-handwritten text-xl sm:text-2xl text-gray-600 font-bold tracking-wide">
            explore my work!
          </span>
        </div>

        {/* Big Pixel Headline (Exact Match: FEATURED WORKS) */}
        <div className="mb-10 sm:mb-14 text-left">
          <h2 className="font-pixel text-4xl sm:text-6xl md:text-7xl lg:text-8xl tracking-wider text-ink-black uppercase font-black">
            FEATURED WORKS
          </h2>
        </div>

        {/* 2-Column Tabbed Folder Grid (Exact Robin UI from Reference Image) */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10 md:gap-12">
          {projects.map((project) => {
            const isDark = project.folderColor === "dark";
            const folderBg = isDark ? "#18181B" : "#E8E3D9";

            return (
              <div
                key={project.id}
                className="flex flex-col group cursor-pointer"
              >
                {/* ======================================================= */}
                {/* Authentic File Folder with Diagonal Bevel Tab           */}
                {/* ======================================================= */}
                <div className="relative w-full">
                  {/* Top Folder Tab Row */}
                  <div className="flex items-end h-9 sm:h-10 w-full select-none">
                    {/* Tab Left Body */}
                    <div
                      className={`h-full px-4 sm:px-5 flex items-center gap-2.5 border-t-2 border-l-2 border-ink-black rounded-tl-[2px] ${
                        isDark ? "bg-[#18181B] text-white" : "bg-[#E8E3D9] text-ink-black"
                      }`}
                    >
                      <span
                        className={`w-2 h-2 rounded-full ${
                          isDark ? "bg-white" : "bg-ink-black"
                        }`}
                      />
                      <span className="font-mono text-[11px] sm:text-xs font-bold tracking-wider uppercase whitespace-nowrap">
                        {project.date}
                      </span>
                    </div>

                    {/* Tab Diagonal Slope (SVG Bevel) */}
                    <div className="relative w-8 h-full shrink-0 -ml-[1px]">
                      <svg
                        className="w-full h-full block"
                        viewBox="0 0 32 40"
                        preserveAspectRatio="none"
                        fill="none"
                      >
                        <polygon
                          points="0,0 2,0 32,40 0,40"
                          fill={folderBg}
                        />
                        <line
                          x1="0"
                          y1="1"
                          x2="32"
                          y2="39"
                          stroke="#000000"
                          strokeWidth="2.5"
                        />
                      </svg>
                    </div>

                    {/* Remaining flat folder top edge */}
                    <div
                      className={`flex-1 h-0 border-b-2 border-ink-black ${
                        isDark ? "bg-[#18181B]" : "bg-[#E8E3D9]"
                      }`}
                    />
                  </div>

                  {/* Folder Main Body */}
                  <div
                    className={`-mt-[1px] border-x-2 border-b-2 border-ink-black p-3.5 sm:p-5 ${
                      isDark ? "bg-[#18181B]" : "bg-[#E8E3D9]"
                    }`}
                  >
                    {/* Inner Framed Photo Window */}
                    <div className="relative w-full h-56 sm:h-64 md:h-72 lg:h-80 bg-neutral-900 border-2 border-ink-black overflow-hidden">
                      <div
                        className="w-full h-full bg-cover bg-center transition-transform duration-300 group-hover:scale-105"
                        style={{ backgroundImage: `url('${project.image}')` }}
                      />
                    </div>
                  </div>
                </div>

                {/* ======================================================= */}
                {/* Card Bottom Meta (Exact Match: Centered Title + Subtitle)*/}
                {/* ======================================================= */}
                <div className="pt-4 sm:pt-5 text-center px-4">
                  <h3 className="font-sans font-bold text-xl sm:text-2xl text-ink-black tracking-tight group-hover:text-accent-red transition-colors">
                    {project.title}
                  </h3>
                  <p className="font-sans text-xs sm:text-sm text-gray-500 max-w-sm mx-auto mt-1 leading-relaxed">
                    {project.description}
                  </p>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
};
