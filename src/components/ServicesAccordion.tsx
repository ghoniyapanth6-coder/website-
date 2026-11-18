"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Check,
  Zap,
  Sparkles,
  TrendingUp,
  Cpu,
  Layers,
  ShieldCheck,
  Plus,
  Minus,
  X,
} from "lucide-react";
import confetti from "canvas-confetti";

export interface ServiceItem {
  id: string;
  number: string;
  title: string;
  tagline: string;
  fullDesc: string;
  deliverables: string[];
  techStack: string[];
  metricNumber: string;
  metricLabel: string;
  accentBg: string;
}

export const SERVICES: ServiceItem[] = [
  {
    id: "branding",
    number: "01",
    title: "BRANDING & IDENTITY",
    tagline: "Modern design systems, vector logo suites & token architectures.",
    fullDesc:
      "We craft high-contrast, unforgettable visual identities for digital-first companies. From bespoke vector logo systems to component design tokens and typographic rules that scale across all screen densities.",
    deliverables: [
      "Complete Vector Logo Suite (Dark, Light & Monochrome)",
      "Design Token Architecture synced to Figma & Tailwind",
      "Custom Typographic Scale & Color Palettes",
      "Brand Guidelines & Component Library Specifications",
    ],
    techStack: ["Figma", "Design Tokens", "Tailwind CSS", "SVG Animation"],
    metricNumber: "4.6x",
    metricLabel: "Higher Brand Recall & Memorability",
    accentBg: "bg-accent-yellow",
  },
  {
    id: "uiux",
    number: "02",
    title: "WEB DESIGN & UI/UX SYSTEMS",
    tagline: "Conversion-focused user flows, wireframes & interactive prototypes.",
    fullDesc:
      "We design digital experiences that remove friction and maximize conversion rates. Every screen is engineered with strict typographic grids, tactile micro-interactions, and neo-brutalist clarity.",
    deliverables: [
      "Interactive High-Fidelity Desktop & Mobile Prototypes",
      "Micro-Interactions & Physics-Based Motion Specs",
      "Conversion Rate Optimization (CRO) Layout Hierarchy",
      "Production-Ready Component Handoff with Zero Ambiguity",
    ],
    techStack: ["Figma", "Radix UI", "Framer Motion", "WCAG AAA Accessibility"],
    metricNumber: "+62%",
    metricLabel: "Average User Session Duration",
    accentBg: "bg-accent-teal",
  },
  {
    id: "fullstack",
    number: "03",
    title: "FULL-STACK DEVELOPMENT (NEXT.JS & NODE.JS)",
    tagline: "Zero-bloat React 19, Server Components & high-concurrency Node.js APIs.",
    fullDesc:
      "Production-grade engineering from database to UI. We build with Next.js 14+ App Router, React Server Components, TypeScript, and high-concurrency Node.js microservices with PostgreSQL and Redis edge caching.",
    deliverables: [
      "Next.js 14+ App Router & Streaming Server Components (RSC)",
      "High-Frequency Node.js REST & GraphQL APIs",
      "PostgreSQL Relational Database Schema & Prisma ORM",
      "Redis Edge Caching for Sub-Millisecond TTFB",
      "Stripe / LemonSqueezy Checkout & Webhook Handlers",
    ],
    techStack: ["Next.js 14", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    metricNumber: "100/100",
    metricLabel: "Guaranteed Google Lighthouse Score",
    accentBg: "bg-accent-yellow",
  },
  {
    id: "seo",
    number: "04",
    title: "TECHNICAL SEO & PERFORMANCE TUNING",
    tagline: "Core Web Vitals optimization, dynamic JSON-LD schemas & rank engines.",
    fullDesc:
      "We turn clean code into organic search dominance. Automated XML sitemaps, semantic HTML5 hierarchy, schema.org rich snippets, and sub-800ms Largest Contentful Paint (LCP) to rank #1.",
    deliverables: [
      "Dynamic JSON-LD Structured Data for Rich Search Results",
      "Core Web Vitals Optimization (LCP < 800ms, CLS = 0)",
      "Automated XML Sitemaps, Robots.txt & Canonical Logic",
      "Edge Caching, Asset Minification & Dynamic OG Images",
    ],
    techStack: ["Schema.org", "JSON-LD", "Core Web Vitals", "Edge CDN", "Search Console"],
    metricNumber: "+280%",
    metricLabel: "Average 90-Day Organic Traffic Jump",
    accentBg: "bg-[#FF5722]",
  },
];

export const ServicesAccordion: React.FC = () => {
  // Default open to Service 03 (Full-Stack Next.js) as shown in user screenshot
  const [activeId, setActiveId] = useState<string | null>("fullstack");
  const [asteriskRotated, setAsteriskRotated] = useState(false);

  const toggleService = (id: string) => {
    setActiveId((prev) => (prev === id ? null : id));
  };

  const handleAsteriskClick = () => {
    setAsteriskRotated(!asteriskRotated);
    try {
      confetti({
        particleCount: 40,
        spread: 70,
        origin: { y: 0.6, x: 0.2 },
        colors: ["#FFE600", "#FF5722", "#00C2CB", "#000000"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section id="services" className="grid grid-cols-1 lg:grid-cols-12 w-full border-b-2 border-ink-black bg-white select-none">
      {/* ========================================================= */}
      {/* Left Column: Yellow Box (BUILT TO DISRUPT)                */}
      {/* ========================================================= */}
      <div className="lg:col-span-5 p-8 sm:p-12 md:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black bg-accent-yellow flex flex-col justify-between relative overflow-hidden group">
        {/* Decorative corner tape */}
        <div className="absolute top-2 right-4 w-12 h-4 bg-white/60 border-l border-r border-dashed border-gray-400 rotate-[-4deg] pointer-events-none" />

        <div>
          {/* Interactive Clickable Spinning Asterisk */}
          <button
            type="button"
            onClick={handleAsteriskClick}
            title="Click to spin & celebration!"
            className="w-14 h-14 sm:w-16 sm:h-16 border-2 border-ink-black bg-white flex items-center justify-center font-black text-3xl sm:text-4xl shadow-brut-sm mb-8 hover:bg-ink-black hover:text-accent-yellow cursor-pointer transition-all duration-300"
            style={{
              transform: asteriskRotated ? "rotate(180deg) scale(1.05)" : "rotate(0deg)",
            }}
          >
            ✱
          </button>

          {/* Headline */}
          <h2 className="font-display font-black text-5xl sm:text-6xl md:text-7xl lg:text-8xl uppercase tracking-tighter text-ink-black leading-[0.88] mb-6">
            BUILT TO <br />
            DISRUPT.
          </h2>

          <p className="font-mono text-xs sm:text-sm font-bold uppercase text-ink-black leading-relaxed max-w-md mb-8">
            At <strong className="underline decoration-2">CodeClovers</strong>, we combine architecture strategy, modern design systems, and Next.js technology to create digital experiences that challenge the ordinary and deliver real revenue impact.
          </p>

          {/* Interactive Live Status Pill */}
          <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border border-ink-black font-mono text-[11px] font-black uppercase text-ink-black shadow-xs">
            <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
            <span>ACCEPTING 2 CLIENTS FOR NEXT SPRINT</span>
          </div>
        </div>

        {/* Read Our Story Link */}
        <div className="pt-10">
          <Link
            href="/about"
            className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-black uppercase underline decoration-2 hover:text-accent-red transition-colors group/link"
          >
            <span>READ OUR ARCHITECTURE STORY</span>
            <ArrowUpRight className="w-4 h-4 group-hover/link:translate-x-1 group-hover/link:-translate-y-1 transition-transform" />
          </Link>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Right Column: Interactive Accordion Capabilities List    */}
      {/* ========================================================= */}
      <div className="lg:col-span-7 flex flex-col justify-between bg-white divide-y-2 divide-ink-black">
        {/* Header Bar */}
        <div className="p-4 sm:p-6 bg-white flex items-center justify-between border-b-2 border-ink-black">
          <span className="font-mono text-xs font-black uppercase tracking-widest text-gray-700 flex items-center gap-2">
            <span>⚡</span>
            <span>OUR SERVICES &amp; CAPABILITIES</span>
          </span>
          <span className="font-mono text-[10px] font-black uppercase text-gray-500 hidden sm:inline-block">
            [ CLICK TO EXPLORE DELIVERABLES ]
          </span>
        </div>

        {/* Accordion Rows */}
        {SERVICES.map((service) => {
          const isOpen = activeId === service.id;

          return (
            <div
              key={service.id}
              className={`transition-colors duration-200 ${
                isOpen ? "bg-[#FAF9F5]" : "bg-white hover:bg-neutral-50"
              }`}
            >
              {/* Accordion Trigger Row */}
              <button
                type="button"
                onClick={() => toggleService(service.id)}
                className="w-full p-6 sm:p-8 flex items-center justify-between text-left cursor-pointer group focus:outline-none"
                aria-expanded={isOpen}
              >
                <div className="flex items-center gap-4 sm:gap-6 flex-1 pr-4">
                  {/* Number Badge */}
                  <span
                    className={`font-mono text-xs font-black transition-colors ${
                      isOpen ? "text-accent-red font-black" : "text-gray-400 group-hover:text-ink-black"
                    }`}
                  >
                    {service.number}
                  </span>

                  {/* Service Title */}
                  <div>
                    <h3
                      className={`font-display font-black text-xl sm:text-2xl md:text-3xl uppercase tracking-tight transition-colors ${
                        isOpen ? "text-ink-black" : "text-ink-black group-hover:text-accent-red"
                      }`}
                    >
                      {service.title}
                    </h3>
                    {!isOpen && (
                      <p className="font-mono text-[11px] font-bold text-gray-500 mt-1 line-clamp-1">
                        {service.tagline}
                      </p>
                    )}
                  </div>
                </div>

                {/* Neo-Brutalist +/- Toggle Button */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 border-2 border-ink-black flex items-center justify-center font-black text-base shadow-brut-sm transition-all duration-200 shrink-0 ${
                    isOpen
                      ? "bg-accent-yellow text-ink-black rotate-90"
                      : "bg-white text-ink-black group-hover:bg-accent-yellow"
                  }`}
                >
                  {isOpen ? (
                    <Minus className="w-5 h-5 stroke-[2.5]" />
                  ) : (
                    <Plus className="w-5 h-5 stroke-[2.5]" />
                  )}
                </div>
              </button>

              {/* Accordion Expandable Content Panel */}
              <div
                className={`overflow-hidden transition-all duration-300 ease-in-out ${
                  isOpen ? "max-h-[600px] opacity-100" : "max-h-0 opacity-0"
                }`}
              >
                <div className="px-6 pb-8 sm:px-8 sm:pb-10 pt-2 border-t border-dashed border-gray-300">
                  <div className="grid grid-cols-1 md:grid-cols-12 gap-6 items-start">
                    {/* Left Details (7 cols) */}
                    <div className="md:col-span-7">
                      <p className="font-mono text-xs sm:text-sm font-bold text-gray-800 leading-relaxed mb-5">
                        {service.fullDesc}
                      </p>

                      <span className="font-mono text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-3">
                        KEY DELIVERABLES INCLUDED:
                      </span>

                      {/* Checklist */}
                      <ul className="space-y-2 font-mono text-xs font-bold text-ink-black">
                        {service.deliverables.map((item, idx) => (
                          <li key={idx} className="flex items-start gap-2">
                            <span className="w-4 h-4 rounded-xs bg-[#D1FAE5] border border-ink-black flex items-center justify-center shrink-0 mt-0.5 text-[#065F46] font-black text-[10px]">
                              ✓
                            </span>
                            <span>{item}</span>
                          </li>
                        ))}
                      </ul>

                      {/* Tech Stack Pills */}
                      <div className="mt-5 pt-4 border-t border-gray-200">
                        <span className="font-mono text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-2">
                          TECHNOLOGIES &amp; TOOLS:
                        </span>
                        <div className="flex flex-wrap gap-1.5">
                          {service.techStack.map((tech) => (
                            <span
                              key={tech}
                              className="px-2.5 py-1 bg-white border border-ink-black font-mono text-[10px] font-black uppercase text-gray-800 shadow-xs hover:bg-accent-yellow hover:-translate-y-0.5 transition-transform"
                            >
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>

                    {/* Right Outcome Card & CTA (5 cols) */}
                    <div className="md:col-span-5 flex flex-col gap-4">
                      {/* Metric Card */}
                      <div className="border-2 border-ink-black bg-white p-4 shadow-brut-sm text-center">
                        <div className="font-mono text-[10px] font-black uppercase text-gray-500 mb-1">
                          PROVEN METRIC
                        </div>
                        <div className="font-display font-black text-4xl sm:text-5xl text-accent-red tracking-tight my-1">
                          {service.metricNumber}
                        </div>
                        <div className="font-mono text-xs font-bold text-ink-black uppercase">
                          {service.metricLabel}
                        </div>
                      </div>

                      {/* Book Button */}
                      <Link
                        href={`/contact?service=${encodeURIComponent(service.title)}`}
                        className="neo-btn w-full py-3 bg-accent-yellow text-ink-black font-mono font-black text-xs uppercase tracking-wider hover:bg-ink-black hover:text-accent-yellow flex items-center justify-center gap-2 text-center"
                      >
                        <span>BOOK THIS SERVICE</span>
                        <ArrowUpRight className="w-4 h-4" />
                      </Link>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
