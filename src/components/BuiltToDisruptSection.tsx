"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Minus, ArrowDown, CheckCircle2 } from "lucide-react";
import confetti from "canvas-confetti";

interface ServiceItem {
  number: string;
  title: string;
  tagline: string;
  desc: string;
  outcome: string;
  timeline: string;
  deliverables: string[];
  techStack: string[];
  ctaText: string;
}

const SERVICES_LIST: ServiceItem[] = [
  {
    number: "01",
    title: "WEB DEVELOPMENT",
    tagline: "Full-Stack Next.js 14+ • Server Components • High-Speed APIs",
    desc: "Production-grade web apps engineered for speed, conversion, and scale. Built on Next.js 14 App Router with guaranteed 100/100 Core Web Vitals.",
    outcome: "100/100 Core Web Vitals • Sub-300ms Loads",
    timeline: "2–4 WEEKS",
    deliverables: [
      "Next.js 14 App Router & Server Components",
      "100% Type-Safe TypeScript & Node.js APIs",
      "Scalable PostgreSQL & Redis Edge Caching",
      "Headless Commerce & Stripe Checkout",
    ],
    techStack: ["Next.js 14", "TypeScript", "React 19", "PostgreSQL", "Tailwind CSS", "Vercel Edge"],
    ctaText: "START A DEV SPRINT",
  },
  {
    number: "02",
    title: "WEB DESIGN & UI/UX",
    tagline: "Conversion Design Systems • Interactive Prototypes",
    desc: "Bold digital interfaces designed to command authority and drive user action. Complete modular Figma token systems and physics-based interactions.",
    outcome: "+45% Conversion Lift • Modular Figma System",
    timeline: "2–3 WEEKS",
    deliverables: [
      "Modular Figma Design Systems & Token Libraries",
      "Interactive High-Fidelity Clickable Prototypes",
      "Conversion-Engineered UX Flow Architecture",
      "WCAG AAA Accessible Typographic Grids",
    ],
    techStack: ["Figma", "Design Tokens", "Tailwind CSS", "Framer Motion", "Prototyping"],
    ctaText: "COMMISSION A DESIGN SYSTEM",
  },
  {
    number: "03",
    title: "BRANDING & IDENTITY",
    tagline: "Bespoke Logomarks • Editorial Swiss Typography",
    desc: "Uncompromising visual identities for tech leaders. Distinct vector logomarks, typography scales, and comprehensive brand guideline books.",
    outcome: "Complete Brand Suite • Full IP Ownership",
    timeline: "2 WEEKS",
    deliverables: [
      "Scalable Vector Logo Suite, Monograms & Favicons",
      "Editorial Swiss Typography & Licensing System",
      "Digital Brand Guidelines Book & Visual Rules",
      "Production-Ready Asset Export & Social Toolkits",
    ],
    techStack: ["Vector SVG", "Custom Type", "Brand Books", "Design Tokens"],
    ctaText: "BUILD YOUR BRAND IDENTITY",
  },
  {
    number: "04",
    title: "TECHNICAL SEO & SPEED",
    tagline: "Search Dominance • Dynamic Schema.org • Sub-Second TTFB",
    desc: "Search engine infrastructure engineered into your codebase. Automated JSON-LD schemas, edge-cached server rendering, and top Google rankings.",
    outcome: "Top Google Indexing • Sub-200ms TTFB",
    timeline: "1–2 WEEKS",
    deliverables: [
      "Dynamic Automated JSON-LD Schema.org Markup",
      "Search Console Indexing & Canonical Routing",
      "Automated XML Sitemaps & Robots Configuration",
      "Cloudflare Edge Caching & Security Hardening",
    ],
    techStack: ["Schema.org", "Search Console", "Cloudflare Edge", "Lighthouse"],
    ctaText: "GET A TECHNICAL SEO AUDIT",
  },
];

export const BuiltToDisruptSection: React.FC = () => {
  // Web Development is open by default
  const [activeService, setActiveService] = useState<string | null>("01");
  const [asteriskRotated, setAsteriskRotated] = useState(false);

  const toggleService = (num: string) => {
    setActiveService((prev) => (prev === num ? null : num));
  };

  const handleAsteriskClick = () => {
    setAsteriskRotated(!asteriskRotated);
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.8, x: 0.3 },
        colors: ["#FFE600", "#FF3B1D", "#00C2CB", "#000000"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <section
      id="services"
      className="grid grid-cols-1 lg:grid-cols-12 w-full lg:h-[calc(100vh-60px)] lg:min-h-[720px] lg:max-h-[920px] border-b-2 border-ink-black bg-white select-none overflow-hidden"
    >
      {/* ========================================================= */}
      {/* Col 1 (1 col): Rotated 180° Vertical "CAPABILITIES" Spine */}
      {/* ========================================================= */}
      <div className="lg:col-span-1 p-4 lg:p-5 flex flex-col justify-between items-center border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black bg-white h-full py-5 shrink-0">
        {/* Top Index Badge */}
        <div className="font-mono text-[10px] font-black uppercase text-ink-black tracking-widest border border-ink-black px-2 py-1 bg-accent-yellow shadow-xs">
          01—04
        </div>

        {/* Center Rotated 180° Title Strip */}
        <div className="my-auto py-6 flex flex-col items-center">
          <div className="[writing-mode:vertical-rl] rotate-180 font-mono text-xs sm:text-sm font-black uppercase tracking-[0.25em] text-ink-black flex items-center gap-3 select-none">
            <span className="w-2.5 h-2.5 bg-accent-red inline-block shrink-0" />
            <span>CAPABILITIES</span>
            <span className="text-gray-400 font-bold">// 2026</span>
          </div>
        </div>

        {/* Bottom Arrow Indicator & Label */}
        <div className="flex flex-col items-center gap-2 pt-2">
          <ArrowDown className="w-4 h-4 text-ink-black stroke-[2.5]" />
          <span className="[writing-mode:vertical-rl] rotate-180 font-mono text-[10px] font-black uppercase text-gray-500 tracking-widest pt-2">
            SERVICES
          </span>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Col 2 (5 cols): BUILT TO DISRUPT & Bottom Asterisk Bar    */}
      {/* ========================================================= */}
      <div className="lg:col-span-5 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black bg-white h-full">
        {/* Top / Middle Main Content */}
        <div className="p-6 sm:p-8 lg:p-10 xl:p-12 flex flex-col justify-center flex-1">
          <div className="font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-3">
            // 04 • STUDIO PHILOSOPHY
          </div>

          <h2 className="font-headline font-black text-5xl sm:text-6xl lg:text-7xl xl:text-8xl uppercase tracking-tight text-ink-black leading-[0.88] mb-5">
            BUILT TO <br />
            DISRUPT<span className="text-accent-red">.</span>
          </h2>

          {/* Clean, Human-Readable Mission Statement */}
          <p className="font-sans text-base sm:text-lg text-neutral-800 leading-relaxed font-normal mb-6 max-w-md">
            At <strong className="font-bold text-ink-black">CodeClovers</strong>, we combine bold strategy, architectural design, and Next.js engineering to create digital experiences that challenge the ordinary and deliver measurable commercial results.
          </p>

          <div className="flex flex-wrap items-center gap-4">
            <Link
              href="/about"
              className="inline-flex items-center gap-2 font-mono text-xs sm:text-sm font-black uppercase text-ink-black underline hover:text-accent-red transition-colors group"
            >
              <span>READ OUR STORY</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
            </Link>

            <Link
              href="/contact"
              className="px-5 py-2.5 bg-ink-black text-white font-mono text-xs font-black uppercase border-2 border-ink-black hover:bg-accent-yellow hover:text-ink-black transition-colors shadow-brut-xs cursor-pointer"
            >
              START A PROJECT ↗
            </Link>
          </div>
        </div>

        {/* Bottom Yellow Asterisk Feature Bar */}
        <div className="border-t-2 border-ink-black bg-accent-yellow p-4 sm:p-5 lg:p-6 flex items-center justify-between shrink-0">
          <div className="flex items-center gap-4 sm:gap-5">
            <button
              type="button"
              onClick={handleAsteriskClick}
              title="Click to spin & celebrate!"
              className="text-ink-black hover:scale-110 active:scale-95 transition-transform duration-300 cursor-pointer shrink-0"
              style={{
                transform: asteriskRotated ? "rotate(180deg)" : "rotate(0deg)",
              }}
            >
              <span className="font-condensed text-4xl sm:text-5xl lg:text-6xl leading-none block select-none">
                ✱
              </span>
            </button>
            <div>
              <div className="font-display font-black text-base sm:text-lg uppercase tracking-tight text-ink-black leading-tight">
                CODECLOVERS®
              </div>
              <div className="font-mono text-[11px] font-bold uppercase tracking-wider text-ink-black/80">
                DISRUPTIVE ENGINEERING // 2026
              </div>
            </div>
          </div>

          <div className="hidden sm:block font-mono text-[11px] font-black uppercase border-2 border-ink-black bg-white px-3 py-1 shadow-brut-xs shrink-0">
            EST. 2026
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* Col 3 (6 cols): 4 Clean Services Rows (01, 02, 03, 04)     */}
      {/* ========================================================= */}
      <div className="lg:col-span-6 flex flex-col divide-y-2 divide-ink-black bg-white h-full overflow-hidden">
        {SERVICES_LIST.map((srv) => {
          const isOpen = activeService === srv.number;

          if (!isOpen) {
            return (
              <button
                key={srv.number}
                type="button"
                onClick={() => toggleService(srv.number)}
                className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between text-left cursor-pointer group bg-white hover:bg-neutral-50 shrink-0 transition-colors"
              >
                <div className="flex items-center gap-4 sm:gap-6 pr-4">
                  <span className="font-headline font-bold text-3xl sm:text-4xl tracking-tight leading-none text-neutral-400 group-hover:text-ink-black transition-colors">
                    {srv.number}
                  </span>
                  <div>
                    <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-ink-black group-hover:text-accent-red transition-colors block leading-tight">
                      {srv.title}
                    </h3>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-neutral-500 block mt-0.5">
                      {srv.tagline}
                    </span>
                  </div>
                </div>

                <div className="w-9 h-9 border-2 border-ink-black flex items-center justify-center font-black text-base bg-white text-ink-black group-hover:bg-accent-yellow shadow-brut-xs transition-colors shrink-0">
                  <Plus className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>
            );
          }

          // Active / Open Service - clean proportional layout with NO blank gaps
          return (
            <div
              key={srv.number}
              className="bg-[#FAF9F5] flex-1 flex flex-col justify-between overflow-hidden"
            >
              {/* Accordion Row Header */}
              <button
                type="button"
                onClick={() => toggleService(srv.number)}
                className="w-full px-6 py-4 sm:px-8 sm:py-5 flex items-center justify-between text-left cursor-pointer group shrink-0 border-b border-dashed border-neutral-300"
              >
                <div className="flex items-center gap-4 sm:gap-6 pr-4">
                  <span className="font-headline font-bold text-3xl sm:text-4xl tracking-tight leading-none text-accent-red">
                    {srv.number}
                  </span>
                  <div>
                    <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-ink-black group-hover:text-accent-red transition-colors block leading-tight">
                      {srv.title}
                    </h3>
                    <span className="font-sans text-xs sm:text-sm font-semibold text-neutral-500 block mt-0.5">
                      {srv.tagline}
                    </span>
                  </div>
                </div>

                <div className="w-9 h-9 border-2 border-ink-black flex items-center justify-center font-black text-base bg-accent-yellow text-ink-black shadow-brut-xs transition-colors shrink-0">
                  <Minus className="w-4 h-4 stroke-[2.5]" />
                </div>
              </button>

              {/* Clean Content Drawer - Distributed evenly, NO awkward gaps */}
              <div className="px-6 py-4 sm:px-8 sm:py-5 flex-1 flex flex-col justify-between overflow-hidden">
                {/* 1. Description */}
                <p className="font-sans text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                  {srv.desc}
                </p>

                {/* 2. Commercial Outcome Banner */}
                <div className="bg-white border-2 border-ink-black px-4 py-2 shadow-2xs flex items-center justify-between gap-3 shrink-0">
                  <div className="flex items-center gap-2">
                    <span className="font-mono text-[10px] font-black uppercase text-accent-red tracking-wider">
                      OUTCOME:
                    </span>
                    <span className="font-sans text-xs sm:text-sm font-bold text-ink-black">
                      {srv.outcome}
                    </span>
                  </div>
                  <span className="font-mono text-[10px] font-black uppercase px-2.5 py-0.5 bg-accent-yellow border border-ink-black text-ink-black shrink-0 font-bold">
                    {srv.timeline}
                  </span>
                </div>

                {/* 3. Deliverables Grid */}
                <div className="grid grid-cols-1 sm:grid-cols-2 gap-2 shrink-0">
                  {srv.deliverables.map((item) => (
                    <div
                      key={item}
                      className="flex items-center gap-2 px-3 py-2 bg-white border border-ink-black text-ink-black shadow-2xs font-sans text-xs font-semibold"
                    >
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-red shrink-0" />
                      <span className="truncate">{item}</span>
                    </div>
                  ))}
                </div>

                {/* 4. Client Guarantee Pills */}
                <div className="grid grid-cols-3 gap-2 shrink-0">
                  <div className="px-2 py-1.5 bg-white border border-ink-black text-center font-mono text-[10px] font-bold uppercase text-ink-black shadow-2xs">
                    ✓ 100% IP OWNERSHIP
                  </div>
                  <div className="px-2 py-1.5 bg-white border border-ink-black text-center font-mono text-[10px] font-bold uppercase text-ink-black shadow-2xs">
                    ✓ ZERO LOCK-IN
                  </div>
                  <div className="px-2 py-1.5 bg-white border border-ink-black text-center font-mono text-[10px] font-bold uppercase text-ink-black shadow-2xs">
                    ✓ DIRECT SENIOR DEV
                  </div>
                </div>

                {/* 5. Tech Stack */}
                <div className="flex flex-wrap items-center gap-1.5 shrink-0">
                  <span className="font-mono text-[10px] font-black uppercase text-gray-500 mr-1">
                    STACK:
                  </span>
                  {srv.techStack.map((tech) => (
                    <span
                      key={tech}
                      className="px-2.5 py-0.5 bg-white border border-ink-black font-mono text-[10px] font-bold text-ink-black uppercase shadow-2xs"
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                {/* 6. High-Impact Yellow Action CTA */}
                <Link
                  href="/contact"
                  className="w-full p-3 bg-accent-yellow border-2 border-ink-black flex items-center justify-between text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-ink-black hover:text-accent-yellow transition-all shadow-brut-xs cursor-pointer group shrink-0"
                >
                  <span>{srv.ctaText}</span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
};
