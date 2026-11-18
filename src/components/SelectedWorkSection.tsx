"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowDown, ArrowUpRight } from "lucide-react";

interface ProjectItem {
  id: string;
  number: string;
  title: string;
  category: string;
  screenshot: string;
  url: string;
  stack: string;
  metrics: {
    label: string;
    value: string;
  };
  mockupContent: {
    headline: string;
    sub: string;
    tag: string;
    badge: string;
  };
}

const PROJECTS: ProjectItem[] = [
  {
    id: "01",
    number: "01",
    title: "CONCRETE VISION",
    category: "BRANDING & EDITORIAL",
    screenshot: "/mockups/project-01.png",
    url: "concretevision.design",
    stack: "FIGMA • SWISS GRID • IDENTITY",
    metrics: { label: "BRAND VALUE", value: "+280%" },
    mockupContent: {
      headline: "CONCRETE VISION",
      sub: "Brutalist architectural brand identity and corporate design system for luxury concrete studio.",
      tag: "EST. 2026 // IDENTITY",
      badge: "AWWWARDS SOTD",
    },
  },
  {
    id: "02",
    number: "02",
    title: "GRIDLINE STUDIO",
    category: "WEB DESIGN / DEV",
    screenshot: "/mockups/project-02.png",
    url: "gridline.agency.dev",
    stack: "NEXT.JS 14 • TAILWIND • NODE.JS",
    metrics: { label: "PERFORMANCE", value: "100/100 CWV" },
    mockupContent: {
      headline: "GRIDLINE STUDIO",
      sub: "High-frequency digital studio web app with instant SSR page loads and dynamic work showcases.",
      tag: "NEXT.JS 14 • 100/100 CWV",
      badge: "CORE WEB VITALS EXCELLENCE",
    },
  },
  {
    id: "03",
    number: "03",
    title: "FORMA SYSTEMS",
    category: "HARDWARE & CLOUD",
    screenshot: "/mockups/project-03.png",
    url: "forma.cloud.systems",
    stack: "REACT • RUST • GO MICROSERVICES",
    metrics: { label: "THROUGHPUT", value: "1.2M REQ/S" },
    mockupContent: {
      headline: "FORMA SYSTEMS",
      sub: "Telemetry control dashboard and edge cloud infrastructure for high-scale robotics.",
      tag: "RUST EDGE • < 8MS PING",
      badge: "ENTERPRISE CLOUD",
    },
  },
  {
    id: "04",
    number: "04",
    title: "HYPERSCALE DATA",
    category: "FULL-STACK / SAAS",
    screenshot: "/mockups/project-04.png",
    url: "hyperscale.data.io",
    stack: "PYTHON • FASTAPI • CLICKHOUSE",
    metrics: { label: "QUERY TIME", value: "4.2MS" },
    mockupContent: {
      headline: "HYPERSCALE DATA",
      sub: "Real-time multi-tenant telemetry and AI pipeline dashboard handling billions of rows daily.",
      tag: "BIG DATA • REAL-TIME PIPELINE",
      badge: "HIGH FREQUENCY ENGINE",
    },
  },
  {
    id: "05",
    number: "05",
    title: "NEO-SYNTH APPAREL",
    category: "HEADLESS COMMERCE",
    screenshot: "/mockups/project-05.png",
    url: "neosynth.store",
    stack: "SHOPIFY STOREFRONT • NEXT.JS",
    metrics: { label: "CONVERSION", value: "+46.8%" },
    mockupContent: {
      headline: "NEO-SYNTH APPAREL",
      sub: "Cyber-brutalist fashion commerce platform with instant filtering, 3D clothing spin and 1-click checkout.",
      tag: "HEADLESS COMMERCE • EDGE SSR",
      badge: "CONVERSION LEADER",
    },
  },
  {
    id: "06",
    number: "06",
    title: "KINETIC AUDIO",
    category: "3D WEB & WEBGL",
    screenshot: "/mockups/project-06.png",
    url: "kinetic.audiolab.cc",
    stack: "THREE.JS • WEB AUDIO • GLSL",
    metrics: { label: "FRAME RATE", value: "60 FPS" },
    mockupContent: {
      headline: "KINETIC AUDIO",
      sub: "Interactive real-time audio visualizer synthesizer and generative sound landscape on the web.",
      tag: "WEBGL • HARDWARE ACCELERATED",
      badge: "FWA OF THE DAY",
    },
  },
];

export const SelectedWorkSection: React.FC = () => {
  // Default to 02 (Gridline Studio) as shown in the reference image (red highlight)
  const [activeProject, setActiveProject] = useState<ProjectItem>(PROJECTS[1]);

  return (
    <section id="work" className="grid grid-cols-1 lg:grid-cols-12 w-full lg:h-[calc(100vh-60px)] lg:min-h-[720px] lg:max-h-[920px] border-b-2 border-ink-black bg-white select-none">
      {/* ========================================================= */}
      {/* Column 1 (1 col): Rotated 180° Vertical "SELECTED WORK"   */}
      {/* ========================================================= */}
      <div className="lg:col-span-1 p-4 lg:p-5 flex flex-col justify-between items-center border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black bg-white h-full py-5">
        {/* Top Index Badge */}
        <div className="font-mono text-[10px] font-black uppercase text-ink-black tracking-widest border border-ink-black px-2 py-1 bg-accent-yellow shadow-xs">
          01—06
        </div>

        {/* Center Rotated 180° Title Strip */}
        <div className="my-auto py-6 flex flex-col items-center">
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-xs sm:text-sm font-black uppercase tracking-[0.22em] text-ink-black flex items-center gap-3 select-none">
            <span className="w-2 h-2 bg-accent-red inline-block" />
            <span>SELECTED WORK</span>
            <span className="text-gray-400 font-bold">// 2026</span>
          </div>
        </div>

        {/* Bottom Arrow Indicator & Link */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <ArrowDown className="w-4 h-4 text-ink-black stroke-[2.5]" />
          <Link
            href="/contact"
            className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] font-black uppercase text-ink-black hover:text-accent-red transition-colors tracking-widest pt-2"
            title="See all projects"
          >
            SEE ALL ↗
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Column 2 (5 cols): Numbered Project Rows (01 to 06)       */}
      {/* ========================================================= */}
      <div className="lg:col-span-5 flex flex-col divide-y-2 divide-ink-black border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black bg-white h-full overflow-hidden">
        {PROJECTS.map((project) => {
          const isActive = activeProject.id === project.id;

          return (
            <button
              key={project.id}
              type="button"
              onMouseEnter={() => setActiveProject(project)}
              onClick={() => setActiveProject(project)}
              className={`flex-1 px-5 sm:px-6 lg:px-7 py-2.5 sm:py-3 flex items-center gap-5 sm:gap-6 text-left transition-colors duration-150 cursor-pointer ${
                isActive
                  ? "bg-accent-red text-white"
                  : "bg-white text-ink-black hover:bg-neutral-50"
              }`}
            >
              {/* Condensed Oswald Number (01 to 06) */}
              <span
                className={`font-condensed font-bold text-4xl sm:text-5xl lg:text-6xl tracking-tighter leading-none shrink-0 ${
                  isActive ? "text-ink-black" : "text-ink-black"
                }`}
              >
                {project.number}
              </span>

              {/* Title & Category */}
              <div className="min-w-0">
                <h3
                  className={`font-display font-black text-sm sm:text-base lg:text-lg xl:text-xl uppercase tracking-tight leading-tight truncate ${
                    isActive ? "text-ink-black" : "text-ink-black"
                  }`}
                >
                  {project.title}
                </h3>
                <span
                  className={`font-mono text-[10px] sm:text-xs font-bold uppercase tracking-wider block mt-0.5 truncate ${
                    isActive ? "text-black/80" : "text-gray-500"
                  }`}
                >
                  {project.category}
                </span>
              </div>
            </button>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* Column 3 (6 cols): Full Section Website Homepage Screenshot */}
      {/* ========================================================= */}
      <div className="lg:col-span-6 relative w-full h-[400px] sm:h-[480px] lg:h-full min-h-[420px] bg-neutral-900 overflow-hidden group">
        {/* Full Bleed Real Website Homepage Screenshot */}
        <img
          src={activeProject.screenshot}
          alt={`${activeProject.title} Homepage Screenshot`}
          className="w-full h-full object-cover object-top transition-transform duration-700 ease-out group-hover:scale-[1.02]"
        />

        {/* Live Status Badge in Bottom-Left */}
        <div className="absolute bottom-5 left-5 z-10 flex items-center gap-2 bg-ink-black/90 backdrop-blur-xs text-white px-3.5 py-2 border-2 border-white/20 font-mono text-xs font-bold shadow-brut-sm">
          <span className="w-2 h-2 rounded-full bg-emerald-400" />
          <span className="uppercase tracking-wider">{activeProject.title} // LIVE</span>
        </div>

        {/* Case Study Action Button in Bottom-Right */}
        <Link
          href="/contact"
          className="absolute bottom-5 right-5 z-10 px-4 py-2 bg-accent-yellow text-ink-black border-2 border-ink-black font-mono text-xs font-black uppercase flex items-center gap-2 hover:bg-ink-black hover:text-accent-yellow transition-colors shadow-brut-sm cursor-pointer"
        >
          <span>VIEW CASE STUDY</span>
          <ArrowUpRight className="w-4 h-4" />
        </Link>
      </div>
    </section>
  );
};
