import React from "react";
import Link from "next/link";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { StatusMarquee } from "@/components/StatusMarquee";
import { BrutFooter } from "@/components/BrutFooter";
import {
  ServicesJumpBar,
  ServicesInteractiveAsterisk,
} from "@/components/ServicesInteractions";
import {
  ArrowUpRight,
  CheckCircle2,
  Zap,
  ShieldCheck,
  TrendingUp,
  Layers,
  Sparkles,
  Award,
  Globe,
  Search,
} from "lucide-react";

export const metadata: Metadata = {
  title: "Architectural Services // Next.js 14, UI/UX, Branding & Technical SEO",
  description:
    "Explore CodeClovers' 4 core architectural capabilities: Full-Stack Next.js 14 development, Conversion UI/UX systems, Strategic Branding & Identity, and Technical SEO & Speed. 100/100 Core Web Vitals guaranteed.",
  alternates: {
    canonical: "/services",
  },
};

export default function ServicesPage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none w-full">
      {/* 1. Modular Swiss Grid Header */}
      <Navbar />

      {/* 2. Live Status Ticker */}
      <StatusMarquee />

      {/* 3. Sticky Quick-Jump Bar */}
      <ServicesJumpBar />

      <main className="flex-1 w-full bg-white">
        {/* ========================================================= */}
        {/* SECTION 1: SERVICES HERO (CENTERED SWISS GRID)            */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white paper-ruled-bg py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 relative overflow-hidden select-none text-center">
          <div className="washi-tape -top-2 right-12 rotate-[-2deg]" />

          <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="font-mono text-xs font-black uppercase text-accent-red tracking-widest bg-accent-yellow px-2.5 py-1 border border-ink-black shadow-brut-sm inline-block mb-6">
              [ 03 // ARCHITECTURAL CAPABILITIES ]
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] uppercase tracking-tight sm:tracking-tighter text-ink-black leading-[0.92] mb-8 text-center w-full">
              <span className="block whitespace-normal sm:whitespace-nowrap">
                WE DON&apos;T DO GENERIC.
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                WE ENGINEER{" "}
                <span className="bg-accent-yellow px-2.5 sm:px-3.5 py-0.5 border-2 border-ink-black shadow-brut-sm inline-block rotate-[-1deg] mx-1">
                  HIGH-CONVERSION
                </span>
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                DIGITAL ASSETS.
              </span>
            </h1>
            <p className="font-mono text-base sm:text-lg lg:text-xl font-bold uppercase text-gray-800 max-w-3xl leading-relaxed mb-8 text-center mx-auto">
              From full-stack Next.js applications to bespoke design systems and technical SEO dominance. Every line of code is engineered to scale your revenue.
            </p>

            <div className="flex flex-wrap items-center justify-center gap-4">
              <Link
                href="/contact"
                className="px-6 py-3.5 bg-ink-black text-white font-mono text-xs sm:text-sm font-black uppercase border-2 border-ink-black hover:bg-accent-yellow hover:text-ink-black transition-colors shadow-brut-sm inline-flex items-center gap-2 cursor-pointer"
              >
                <span>START A PROJECT</span>
                <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
              </Link>
              <Link
                href="/plans"
                className="px-6 py-3.5 bg-white text-ink-black font-mono text-xs sm:text-sm font-black uppercase border-2 border-ink-black hover:bg-neutral-100 transition-colors shadow-brut-sm cursor-pointer"
              >
                VIEW SPRINT PRICING
              </Link>
              <div className="flex items-center gap-3 pt-2 sm:pt-0">
                <ServicesInteractiveAsterisk />
                <span className="font-mono text-[11px] font-bold uppercase text-gray-600 hidden md:inline-block">
                  4 CORE ARCHITECTURAL DISCIPLINES • ZERO OUTSOURCING
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SERVICE 01: WEB DEVELOPMENT (FULL-STACK NEXT.JS 14)       */}
        {/* ========================================================= */}
        <section
          id="fullstack"
          className="w-full border-b-2 border-ink-black bg-white scroll-mt-20 sm:scroll-mt-24 min-h-[calc(100vh-64px)] flex flex-col justify-between"
        >
          {/* Section Spine Header */}
          <div className="w-full px-6 py-4 sm:px-10 sm:py-4 bg-neutral-950 text-white flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink-black shrink-0">
            <div className="flex items-center gap-4">
              <span className="font-display font-black text-3xl sm:text-4xl text-accent-yellow">
                01
              </span>
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  ARCHITECTURAL DISCIPLINE // ENGINEERING
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white leading-none">
                  01 WEB DEVELOPMENT // FULL-STACK NEXT.JS 14
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs font-black uppercase">
              <span className="px-3 py-1 bg-accent-yellow text-ink-black border border-white/20">
                2–4 WEEKS SPRINT
              </span>
              <span className="text-neutral-400 hidden sm:inline-block">
                // 100/100 LIGHTHOUSE • ZERO BLOAT
              </span>
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full flex-1 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-ink-black">
            {/* Left Column (7 cols): Business Problem & Solution + 3 Core Client Benefits */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Business Problem & Solution */}
                <div className="mb-6">
                  <span className="font-mono text-xs font-black uppercase text-accent-red tracking-wider block mb-2">
                    // THE BUSINESS CHALLENGE &amp; ARCHITECTURAL SOLUTION
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black mb-3">
                    Slow, Fragile Websites Drain Revenue. We Build Speed Machines.
                  </h3>
                  <div className="space-y-3 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed">
                    <p>
                      <strong className="text-ink-black font-bold">The Problem:</strong> Generic WordPress themes, bloated page builders, and sluggish code kill conversions, spike bounce rates, and accumulate crippling technical debt.
                    </p>
                    <p>
                      <strong className="text-ink-black font-bold">Our Solution:</strong> We engineer bespoke, ultra-fast Next.js 14 web applications with React Server Components and high-concurrency Node.js backends—delivering sub-second load speeds, ironclad security, and a digital asset engineered to scale your revenue.
                    </p>
                  </div>
                </div>

                {/* 3 Core Client Benefits */}
                <div>
                  <span className="font-mono text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-3">
                    3 CORE CLIENT BENEFITS:
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-yellow flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          Sub-Second Speed &amp; 100/100 Core Web Vitals
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Instant page loads under 200ms that keep buyers engaged, cut bounce rates by up to 40%, and supercharge your conversion rates.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-teal flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          Rock-Solid Reliability &amp; Zero Maintenance
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          End-to-end TypeScript contracts from the database to UI components eliminate runtime errors, broken plugins, and vulnerability exploits.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-red flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          Built to Scale Revenue &amp; Valuation
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Enterprise-grade relational database schemas and edge caching capable of handling millions of visitors without slowing down.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Deliverables Checklist + Tech Stack + Trust Badges */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-paper-beige">
              <div>
                {/* Deliverables Checklist Card */}
                <div className="p-5 sm:p-6 bg-white border-2 border-ink-black shadow-brut mb-5">
                  <div className="flex items-center justify-between border-b-2 border-ink-black pb-3 mb-4">
                    <span className="font-mono text-xs font-black uppercase text-ink-black">
                      WHAT YOU RECEIVE // DELIVERABLES
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-accent-yellow border border-ink-black text-ink-black">
                      100% PRODUCTION READY
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      "Custom Next.js 14 App Router application with Server Components",
                      "High-throughput Node.js REST API & PostgreSQL database schemas",
                      "Secure Stripe checkout, subscriptions & authentication flows",
                      "Responsive Neo-Brutalist & Swiss Grid UI components",
                      "Global edge caching with Cloudflare & Vercel automated CI/CD pipeline",
                      "100% source code ownership & clean GitHub repository handoff",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="font-sans text-xs sm:text-sm font-semibold text-ink-black leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] font-black uppercase text-gray-600 tracking-wider block mb-2">
                    TECHNOLOGY STACK:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Next.js 14",
                      "React 19",
                      "TypeScript",
                      "Tailwind CSS",
                      "Node.js",
                      "PostgreSQL",
                      "Prisma ORM",
                      "Redis",
                      "Vercel Edge",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white border border-ink-black font-mono text-[11px] font-black uppercase text-ink-black shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-accent-red uppercase">
                      100% IP OWNERSHIP
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Zero Lock-In
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-emerald-600 uppercase">
                      ZERO LOCK-IN
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Open Standards
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-ink-black uppercase">
                      DIRECT SENIOR DEV
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Zero Juniors
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Bold Yellow Action CTA Button */}
          <div className="w-full p-4 sm:p-5 bg-white border-t-2 border-ink-black shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/contact?service=Full-Stack%20Next.js%2014%20Development"
                className="w-full sm:w-auto flex-1 p-4 bg-accent-yellow border-2 border-ink-black flex items-center justify-between text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-ink-black hover:text-accent-yellow transition-all shadow-brut-sm cursor-pointer group"
              >
                <span>COMMISSION WEB DEVELOPMENT SPRINT ↗</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto px-6 py-4 bg-white border-2 border-ink-black text-center text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-neutral-100 transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                VIEW SPRINT PRICING PLANS
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SERVICE 02: UI/UX SYSTEMS (CONVERSION DESIGN)             */}
        {/* ========================================================= */}
        <section
          id="uiux"
          className="w-full border-b-2 border-ink-black bg-white scroll-mt-20 sm:scroll-mt-24 min-h-[calc(100vh-64px)] flex flex-col justify-between"
        >
          {/* Section Spine Header */}
          <div className="w-full px-6 py-4 sm:px-10 sm:py-4 bg-neutral-950 text-white flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink-black shrink-0">
            <div className="flex items-center gap-4">
              <span className="font-display font-black text-3xl sm:text-4xl text-accent-teal">
                02
              </span>
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  ARCHITECTURAL DISCIPLINE // DESIGN SYSTEMS
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white leading-none">
                  02 UI/UX SYSTEMS // CONVERSION DESIGN
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs font-black uppercase">
              <span className="px-3 py-1 bg-accent-teal text-ink-black border border-white/20">
                2–3 WEEKS SPRINT
              </span>
              <span className="text-neutral-400 hidden sm:inline-block">
                // MATHEMATICAL SWISS GRID • WCAG AAA
              </span>
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full flex-1 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-ink-black">
            {/* Left Column (7 cols): Business Problem & Solution + 3 Core Client Benefits */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Business Problem & Solution */}
                <div className="mb-6">
                  <span className="font-mono text-xs font-black uppercase text-accent-teal tracking-wider block mb-2">
                    // THE BUSINESS CHALLENGE &amp; ARCHITECTURAL SOLUTION
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black mb-3">
                    Confusing Interfaces Kill Conversions. We Build Frictionless Flows.
                  </h3>
                  <div className="space-y-3 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed">
                    <p>
                      <strong className="text-ink-black font-bold">The Problem:</strong> Cluttered layouts, confusing user flows, and generic templates confuse buyers, cause massive drop-offs, and ruin your brand&apos;s credibility.
                    </p>
                    <p>
                      <strong className="text-ink-black font-bold">Our Solution:</strong> We design mathematically balanced, conversion-focused UI/UX systems grounded in Swiss design principles and cognitive psychology—stripping away friction and guiding users straight to decisive action.
                    </p>
                  </div>
                </div>

                {/* 3 Core Client Benefits */}
                <div>
                  <span className="font-mono text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-3">
                    3 CORE CLIENT BENEFITS:
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-yellow flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          +340% Higher Conversion Velocity
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Strategically structured user journeys and high-contrast call-to-actions that turn passive traffic into paying customers.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-teal flex items-center justify-center shrink-0">
                        <Layers className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          Modular Design System That Scales Fast
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Tokenized Figma component libraries that let your team launch new pages and features 3x faster with 1:1 code parity.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-red flex items-center justify-center shrink-0">
                        <ShieldCheck className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          WCAG AAA Accessibility &amp; Multi-Device Polish
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          High-contrast typography, ergonomic layouts, and tactile feedback tested across all modern mobile and desktop screens.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Deliverables Checklist + Tech Stack + Trust Badges */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-paper-beige">
              <div>
                {/* Deliverables Checklist Card */}
                <div className="p-5 sm:p-6 bg-white border-2 border-ink-black shadow-brut mb-5">
                  <div className="flex items-center justify-between border-b-2 border-ink-black pb-3 mb-4">
                    <span className="font-mono text-xs font-black uppercase text-ink-black">
                      WHAT YOU RECEIVE // DELIVERABLES
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-accent-teal text-ink-black border border-ink-black">
                      CRO VALIDATED
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      "Master Figma design system with semantic token variables & auto-layout",
                      "High-fidelity clickable desktop & mobile interactive prototypes",
                      "Conversion-optimized wireframes for onboarding & checkout flows",
                      "Neo-Brutalist & Swiss UI component library (forms, modals, cards)",
                      "Full design specification & 1:1 Tailwind CSS developer handoff",
                      "Unlimited design iterations during the active sprint window",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="font-sans text-xs sm:text-sm font-semibold text-ink-black leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] font-black uppercase text-gray-600 tracking-wider block mb-2">
                    DESIGN STACK &amp; TOOLS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Figma Master",
                      "Design Tokens",
                      "Tailwind CSS",
                      "Radix UI",
                      "Framer Motion",
                      "WCAG AAA",
                      "Auto-Layout 5",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white border border-ink-black font-mono text-[11px] font-black uppercase text-ink-black shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-accent-teal uppercase">
                      100% IP OWNERSHIP
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Master Files Included
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-emerald-600 uppercase">
                      ZERO LOCK-IN
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Tailwind Token Parity
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-ink-black uppercase">
                      DIRECT SENIOR DEV
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Lead UX Architects
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Bold Yellow Action CTA Button */}
          <div className="w-full p-4 sm:p-5 bg-white border-t-2 border-ink-black shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/contact?service=Conversion%20Design%20%26%20UI%2FUX"
                className="w-full sm:w-auto flex-1 p-4 bg-accent-yellow border-2 border-ink-black flex items-center justify-between text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-ink-black hover:text-accent-yellow transition-all shadow-brut-sm cursor-pointer group"
              >
                <span>COMMISSION UI/UX DESIGN SYSTEM ↗</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                href="/#work"
                className="w-full sm:w-auto px-6 py-4 bg-white border-2 border-ink-black text-center text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-neutral-100 transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                VIEW CLIENT CASE STUDIES
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SERVICE 03: BRANDING (STRATEGIC IDENTITY & ASSETS)        */}
        {/* ========================================================= */}
        <section
          id="branding"
          className="w-full border-b-2 border-ink-black bg-white scroll-mt-20 sm:scroll-mt-24 min-h-[calc(100vh-64px)] flex flex-col justify-between"
        >
          {/* Section Spine Header */}
          <div className="w-full px-6 py-4 sm:px-10 sm:py-4 bg-neutral-950 text-white flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink-black shrink-0">
            <div className="flex items-center gap-4">
              <span className="font-display font-black text-3xl sm:text-4xl text-accent-red">
                03
              </span>
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  ARCHITECTURAL DISCIPLINE // BRAND MOAT
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white leading-none">
                  03 BRANDING // STRATEGIC IDENTITY &amp; ASSETS
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs font-black uppercase">
              <span className="px-3 py-1 bg-accent-red text-white border border-white/20">
                2 WEEKS SPRINT
              </span>
              <span className="text-neutral-400 hidden sm:inline-block">
                // BESPOKE LOGOMARKS • EDITORIAL TYPE
              </span>
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full flex-1 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-ink-black">
            {/* Left Column (7 cols): Business Problem & Solution + 3 Core Client Benefits */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Business Problem & Solution */}
                <div className="mb-6">
                  <span className="font-mono text-xs font-black uppercase text-accent-red tracking-wider block mb-2">
                    // THE BUSINESS CHALLENGE &amp; ARCHITECTURAL SOLUTION
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black mb-3">
                    Generic Brands Get Ignored. We Forge Defensible Market Moats.
                  </h3>
                  <div className="space-y-3 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed">
                    <p>
                      <strong className="text-ink-black font-bold">The Problem:</strong> In a market flooded with generic AI logos and clone templates, looking like everyone else commoditizes your offer and destroys your pricing power.
                    </p>
                    <p>
                      <strong className="text-ink-black font-bold">Our Solution:</strong> We engineer bold, authoritative visual brand identities rooted in Swiss modernism, architectural geometry, and editorial precision—building an uncopyable visual moat that commands premium market valuation.
                    </p>
                  </div>
                </div>

                {/* 3 Core Client Benefits */}
                <div>
                  <span className="font-mono text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-3">
                    3 CORE CLIENT BENEFITS:
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-yellow flex items-center justify-center shrink-0">
                        <Sparkles className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          4.6x Stronger Brand Recall &amp; Recognition
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Iconic vector logomarks and distinct typographic signatures that make your brand immediately recognizable and unforgettable.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-red flex items-center justify-center shrink-0">
                        <Award className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          Command Premium Market Pricing Power
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          High-end architectural visual positioning that elevates perceived product value and sets you apart from discount competitors.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-teal flex items-center justify-center shrink-0">
                        <Globe className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          Flawless Scalability Across All Touchpoints
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Precision-crafted vector assets that look razor-sharp everywhere—from a 16px favicon to giant billboards and conference displays.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Deliverables Checklist + Tech Stack + Trust Badges */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-paper-beige">
              <div>
                {/* Deliverables Checklist Card */}
                <div className="p-5 sm:p-6 bg-white border-2 border-ink-black shadow-brut mb-5">
                  <div className="flex items-center justify-between border-b-2 border-ink-black pb-3 mb-4">
                    <span className="font-mono text-xs font-black uppercase text-ink-black">
                      WHAT YOU RECEIVE // DELIVERABLES
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-accent-red text-white border border-ink-black">
                      IP PROTECTED
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      "Master Vector Logo Suite (Primary, horizontal, badge & favicon marks)",
                      "Chromatic Color Matrix (Light mode, dark mode & monochrome ink-black)",
                      "Typographic hierarchy guide with licensed font pairings & scale tokens",
                      "40+ page living digital brand guidelines manual (PDF & Figma)",
                      "Complete social media kit (OpenGraph preview cards, banners & avatars)",
                      "100% intellectual property assignment & commercial copyright transfer",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="font-sans text-xs sm:text-sm font-semibold text-ink-black leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] font-black uppercase text-gray-600 tracking-wider block mb-2">
                    BRAND DESIGN TOOLS:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Adobe Illustrator",
                      "Figma",
                      "Vector SVG",
                      "Pantone Matching",
                      "Font Licensing",
                      "OpenGraph Protocol",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white border border-ink-black font-mono text-[11px] font-black uppercase text-ink-black shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-accent-red uppercase">
                      100% IP OWNERSHIP
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Zero Royalties
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-emerald-600 uppercase">
                      ZERO LOCK-IN
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Clean Vector Formats
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-ink-black uppercase">
                      DIRECT SENIOR DEV
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Brand Architects
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Bold Yellow Action CTA Button */}
          <div className="w-full p-4 sm:p-5 bg-white border-t-2 border-ink-black shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/contact?service=Strategic%20Branding%20%26%20Identity"
                className="w-full sm:w-auto flex-1 p-4 bg-accent-yellow border-2 border-ink-black flex items-center justify-between text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-ink-black hover:text-accent-yellow transition-all shadow-brut-sm cursor-pointer group"
              >
                <span>BUILD YOUR BRAND IDENTITY ↗</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                href="/contact"
                className="w-full sm:w-auto px-6 py-4 bg-white border-2 border-ink-black text-center text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-neutral-100 transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                SCHEDULE BRAND DISCOVERY CALL
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SERVICE 04: TECHNICAL SEO (SPEED & SEARCH DOMINANCE)       */}
        {/* ========================================================= */}
        <section
          id="seo"
          className="w-full border-b-2 border-ink-black bg-white scroll-mt-20 sm:scroll-mt-24 min-h-[calc(100vh-64px)] flex flex-col justify-between"
        >
          {/* Section Spine Header */}
          <div className="w-full px-6 py-4 sm:px-10 sm:py-4 bg-neutral-950 text-white flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink-black shrink-0">
            <div className="flex items-center gap-4">
              <span className="font-display font-black text-3xl sm:text-4xl text-accent-yellow">
                04
              </span>
              <div>
                <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400 block">
                  ARCHITECTURAL DISCIPLINE // SEARCH INFRASTRUCTURE
                </span>
                <h2 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-white leading-none">
                  04 TECHNICAL SEO // SPEED &amp; SEARCH DOMINANCE
                </h2>
              </div>
            </div>

            <div className="flex items-center gap-3 font-mono text-xs font-black uppercase">
              <span className="px-3 py-1 bg-accent-yellow text-ink-black border border-white/20">
                1–2 WEEKS SPRINT
              </span>
              <span className="text-neutral-400 hidden sm:inline-block">
                // DYNAMIC SCHEMA.ORG • SUB-200MS TTFB
              </span>
            </div>
          </div>

          {/* 2-Column Content Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 w-full flex-1 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-ink-black">
            {/* Left Column (7 cols): Business Problem & Solution + 3 Core Client Benefits */}
            <div className="lg:col-span-7 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-white">
              <div>
                {/* Business Problem & Solution */}
                <div className="mb-6">
                  <span className="font-mono text-xs font-black uppercase text-accent-red tracking-wider block mb-2">
                    // THE BUSINESS CHALLENGE &amp; ARCHITECTURAL SOLUTION
                  </span>
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black mb-3">
                    Invisible Websites Win Zero Customers. We Dominate Search.
                  </h3>
                  <div className="space-y-3 font-sans text-sm sm:text-base text-neutral-700 leading-relaxed">
                    <p>
                      <strong className="text-ink-black font-bold">The Problem:</strong> Slower load times, layout shifts, and missing semantic metadata trigger harsh search engine ranking penalties, hiding your business from high-intent organic buyers.
                    </p>
                    <p>
                      <strong className="text-ink-black font-bold">Our Solution:</strong> We engineer technical SEO directly into your codebase—achieving guaranteed 100/100 Core Web Vitals, automated JSON-LD Schema.org entities, and edge caching to dominate Google search results.
                    </p>
                  </div>
                </div>

                {/* 3 Core Client Benefits */}
                <div>
                  <span className="font-mono text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-3">
                    3 CORE CLIENT BENEFITS:
                  </span>
                  <div className="grid grid-cols-1 gap-3">
                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-yellow flex items-center justify-center shrink-0">
                        <TrendingUp className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          +280% Average Organic Traffic Growth
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Climb Google rankings faster with instant-loading pages and rich snippet real estate on your highest-value keywords.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-teal flex items-center justify-center shrink-0">
                        <Zap className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          Sub-200ms Global Edge Response (TTFB)
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Global CDN edge caching delivers your content instantaneously to search engine crawlers and users worldwide.
                        </p>
                      </div>
                    </div>

                    <div className="p-3.5 sm:p-4 bg-neutral-50 border-2 border-ink-black shadow-2xs flex items-start gap-3.5">
                      <div className="w-9 h-9 rounded-xs bg-ink-black text-accent-red flex items-center justify-center shrink-0">
                        <Search className="w-5 h-5 stroke-[2.5]" />
                      </div>
                      <div>
                        <h4 className="font-display font-black text-sm sm:text-base uppercase text-ink-black">
                          Rich Snippet SERP Real Estate Domination
                        </h4>
                        <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-snug mt-1">
                          Automated JSON-LD structured data that powers Google star ratings, FAQ accordions, and rich high-CTR search cards.
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column (5 cols): Deliverables Checklist + Tech Stack + Trust Badges */}
            <div className="lg:col-span-5 p-6 sm:p-8 lg:p-10 flex flex-col justify-between bg-paper-beige">
              <div>
                {/* Deliverables Checklist Card */}
                <div className="p-5 sm:p-6 bg-white border-2 border-ink-black shadow-brut mb-5">
                  <div className="flex items-center justify-between border-b-2 border-ink-black pb-3 mb-4">
                    <span className="font-mono text-xs font-black uppercase text-ink-black">
                      WHAT YOU RECEIVE // DELIVERABLES
                    </span>
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-accent-yellow border border-ink-black text-ink-black">
                      TOP INDEXED
                    </span>
                  </div>

                  <div className="space-y-2.5">
                    {[
                      "Core Web Vitals remediation guaranteeing 100/100 Lighthouse score",
                      "Custom dynamic JSON-LD structured data engine for Google Rich Snippets",
                      "Automated XML sitemap generator, robots.txt & clean canonical routing",
                      "Dynamic Social OpenGraph (OG) image generation via @vercel/og",
                      "Edge caching rules, Cloudflare / Vercel CDN headers & AVIF compression",
                      "Google Search Console indexing pipeline verification & 301 redirect map",
                    ].map((item, idx) => (
                      <div key={idx} className="flex items-start gap-2.5">
                        <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5 stroke-[2.5]" />
                        <span className="font-sans text-xs sm:text-sm font-semibold text-ink-black leading-tight">
                          {item}
                        </span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Tech Stack */}
                <div className="mb-5">
                  <span className="font-mono text-[10px] font-black uppercase text-gray-600 tracking-wider block mb-2">
                    SEO &amp; PERFORMANCE STACK:
                  </span>
                  <div className="flex flex-wrap gap-1.5">
                    {[
                      "Schema.org",
                      "JSON-LD",
                      "Lighthouse",
                      "Core Web Vitals",
                      "Search Console",
                      "Vercel CDN",
                      "Cloudflare Edge",
                    ].map((tech) => (
                      <span
                        key={tech}
                        className="px-2.5 py-1 bg-white border border-ink-black font-mono text-[11px] font-black uppercase text-ink-black shadow-2xs"
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </div>

                {/* Trust Badges */}
                <div className="grid grid-cols-3 gap-2">
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-accent-red uppercase">
                      100% IP OWNERSHIP
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Custom Scripts
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-emerald-600 uppercase">
                      ZERO LOCK-IN
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Open Web Protocols
                    </div>
                  </div>
                  <div className="p-2.5 bg-white border-2 border-ink-black text-center shadow-2xs">
                    <div className="font-mono text-[10px] font-black text-ink-black uppercase">
                      DIRECT SENIOR DEV
                    </div>
                    <div className="font-sans text-[10px] text-gray-600 mt-0.5 font-medium">
                      Technical SEO Leads
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Bottom: Bold Yellow Action CTA Button */}
          <div className="w-full p-4 sm:p-5 bg-white border-t-2 border-ink-black shrink-0">
            <div className="flex flex-col sm:flex-row items-center justify-between gap-3">
              <Link
                href="/contact?service=Technical%20SEO%20%26%20Speed"
                className="w-full sm:w-auto flex-1 p-4 bg-accent-yellow border-2 border-ink-black flex items-center justify-between text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-ink-black hover:text-accent-yellow transition-all shadow-brut-sm cursor-pointer group"
              >
                <span>COMMISSION TECHNICAL SEO AUDIT ↗</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform" />
              </Link>
              <Link
                href="/plans"
                className="w-full sm:w-auto px-6 py-4 bg-white border-2 border-ink-black text-center text-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-neutral-100 transition-colors shadow-2xs shrink-0 cursor-pointer"
              >
                CHECK OUR SPEED GUARANTEE
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: CONSULTATION CTA (FULL-WIDTH SWISS GRID)       */}
        {/* ========================================================= */}
        <section
          id="consultation"
          className="grid grid-cols-1 lg:grid-cols-12 w-full border-b-2 border-ink-black bg-white select-none scroll-mt-24"
        >
          {/* Left Column (7 cols): Consultation Scope & Guarantees */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black flex flex-col justify-between bg-white">
            <div>
              <div className="font-mono text-xs font-black uppercase text-accent-red tracking-widest mb-3">
                // 05 • DIRECT TECHNICAL CONSULTATION
              </div>

              <h2 className="font-headline font-black text-4xl sm:text-5xl md:text-6xl uppercase tracking-tight text-ink-black leading-[0.9] mb-5">
                NO JUNIOR DEVS<span className="text-accent-red">.</span> <br />
                NO SLOW AGENCIES<span className="text-accent-red">.</span> <br />
                TALK DIRECTLY WITH OUR LEAD ARCHITECT.
              </h2>

              <p className="font-sans text-base sm:text-lg text-neutral-800 leading-relaxed font-normal mb-8 max-w-xl">
                Skip the sales pitch and account management bureaucracy. Book a
                complimentary 30-minute technical session. We review your current
                codebase, assess performance bottlenecks, and map out a fixed-cost sprint
                roadmap tailored to your commercial milestones.
              </p>

              {/* 4 Trust Directives */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-8">
                <div className="flex items-center gap-2.5 p-3.5 bg-neutral-50 border border-ink-black font-mono text-xs font-bold text-ink-black shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 shrink-0" />
                  <span>4-HOUR INQUIRY RESPONSE SLA</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 bg-neutral-50 border border-ink-black font-mono text-xs font-bold text-ink-black shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-accent-yellow shrink-0" />
                  <span>MUTUAL NDA SIGNED UPON REQUEST</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 bg-neutral-50 border border-ink-black font-mono text-xs font-bold text-ink-black shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-accent-teal shrink-0" />
                  <span>DIRECT SLACK / DISCORD ACCESS</span>
                </div>

                <div className="flex items-center gap-2.5 p-3.5 bg-neutral-50 border border-ink-black font-mono text-xs font-bold text-ink-black shadow-2xs">
                  <span className="w-2 h-2 rounded-full bg-accent-red shrink-0" />
                  <span>100% CODE &amp; REPO HANDOFF</span>
                </div>
              </div>
            </div>

            {/* Direct Email Dispatch */}
            <div className="pt-6 border-t border-dashed border-neutral-300 font-mono text-xs font-bold text-neutral-600 flex flex-wrap items-center justify-between gap-3">
              <span>DIRECT DISPATCH: HELLO@CODECLOVERS.DEV</span>
              <span className="text-ink-black font-black">SAN FRANCISCO • EST. 2026</span>
            </div>
          </div>

          {/* Right Column (5 cols): High-Impact Yellow Consultation Box */}
          <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 lg:p-14 bg-accent-yellow flex flex-col justify-between">
            <div>
              {/* Capacity Status Pill */}
              <div className="inline-flex items-center gap-2 px-3 py-1 bg-white border-2 border-ink-black font-mono text-[11px] font-black uppercase text-ink-black shadow-xs mb-6">
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>ACCEPTING 2 CLIENTS FOR Q1/Q2 SPRINT</span>
              </div>

              <h3 className="font-headline font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-black leading-tight mb-4">
                READY TO RE-ENGINEER YOUR DIGITAL PLATFORM?
              </h3>

              <p className="font-sans text-sm sm:text-base text-neutral-900 leading-relaxed font-medium mb-8">
                Whether you need a full-scale Next.js 14 rebuild, an authoritative brand
                identity, or a Core Web Vitals remediation sprint, our senior engineers
                are ready to deploy.
              </p>

              {/* Rating Pill */}
              <div className="p-4 bg-white border-2 border-ink-black shadow-brut-xs mb-8">
                <div className="flex items-center gap-1 text-accent-red font-mono text-sm font-black mb-1">
                  ★★★★★
                </div>
                <div className="font-mono text-xs font-black uppercase text-ink-black">
                  4.98 / 5.0 RATING ACROSS 42+ ENTERPRISE RELEASES
                </div>
                <div className="font-sans text-xs text-neutral-600 mt-1">
                  Verified CTO &amp; Founder reviews across Fintech, AI, SaaS &amp; Commerce.
                </div>
              </div>
            </div>

            {/* Consultation Action Buttons */}
            <div className="space-y-3">
              <Link
                href="/contact"
                className="w-full p-4 bg-ink-black text-white border-2 border-ink-black flex items-center justify-between font-mono text-xs sm:text-sm font-black uppercase hover:bg-accent-red hover:text-white transition-all shadow-brut-sm cursor-pointer group"
              >
                <span>SCHEDULE 30-MIN TECHNICAL CALL</span>
                <ArrowUpRight className="w-5 h-5 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform text-accent-yellow" />
              </Link>

              <Link
                href="/plans"
                className="w-full p-3 bg-white text-ink-black border-2 border-ink-black flex items-center justify-between font-mono text-xs font-black uppercase hover:bg-neutral-100 transition-colors shadow-2xs cursor-pointer"
              >
                <span>VIEW FIXED-PRICE SPRINT PLANS</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 6: BRUTALIST CONVERSION FOOTER                    */}
        {/* ========================================================= */}
        <BrutFooter />
      </main>
    </div>
  );
}
