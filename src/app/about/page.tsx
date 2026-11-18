import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { StatusMarquee } from "@/components/StatusMarquee";
import { AboutFaqSection } from "@/components/AboutFaqSection";
import { BrutFooter } from "@/components/BrutFooter";
import {
  ArrowUpRight,
  CheckCircle2,
  XCircle,
  Zap,
  ShieldCheck,
  Layers,
  Cpu,
  Code2,
  Check,
  X,
  Users,
  Award,
  Sparkles,
  Server,
  Lock,
  GitBranch,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "About Us // Engineering Without Rules",
  description:
    "We are a digital web development studio engineering high-performance Next.js and full-stack Node.js architectures for forward-thinking brands.",
  alternates: {
    canonical: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-paper-beige flex flex-col font-sans select-none">
      <Navbar />
      <StatusMarquee />

      <main className="flex-1 w-full">
        {/* ========================================================= */}
        {/* SECTION 1: ABOUT HERO HEADER (CENTERED)                   */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white paper-ruled-bg py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 relative overflow-hidden select-none text-center">
          <div className="washi-tape -top-2 right-12 rotate-[2deg]" />

          <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="font-mono text-xs font-black uppercase text-accent-red tracking-widest bg-accent-yellow px-2.5 py-1 border border-ink-black shadow-brut-sm inline-block mb-6">
              [ 02 // STUDIO PHILOSOPHY ]
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] uppercase tracking-tight sm:tracking-tighter text-ink-black leading-[0.92] mb-8 text-center w-full">
              <span className="block whitespace-normal sm:whitespace-nowrap">
                WE DON&apos;T BUILD WEBSITES.
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                WE ENGINEER{" "}
                <span className="bg-accent-yellow px-2.5 sm:px-3.5 py-0.5 border-2 border-ink-black shadow-brut-sm inline-block rotate-[-1deg] mx-1">
                  HIGH-SPEED
                </span>
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                MACHINES.
              </span>
            </h1>
            <p className="font-mono text-base sm:text-lg lg:text-xl font-bold uppercase text-gray-800 max-w-3xl leading-relaxed text-center mx-auto">
              We reject bloated WordPress templates, heavy page builders, and unoptimized code. We build with modern Next.js 14, TypeScript, and high-performance Node.js backends.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: TECH STACK MATRIX (PRESERVED & FULL-WIDTH)     */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white select-none">
          {/* Section Header */}
          <div className="py-10 sm:py-12 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black flex flex-col sm:flex-row sm:items-end justify-between gap-4 bg-[#FAF9F5]">
            <div>
              <span className="font-mono text-xs font-black uppercase tracking-widest text-gray-500">
                OUR CORE WEAPONS // ZERO COMPROMISE
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-ink-black mt-1">
                FULL-STACK TECH STACK
              </h2>
            </div>
            <span className="px-4 py-1.5 bg-accent-teal border-2 border-ink-black font-mono text-xs font-black shadow-brut-sm text-black shrink-0">
              100% PRODUCTION PROVEN
            </span>
          </div>

          {/* Full-Width Swiss Grid - Row 1 (Items 01-04) */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink-black border-b-2 border-ink-black font-mono">
            <div className="p-6 sm:p-8 bg-white hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between min-h-[160px] group">
              <div>
                <div className="text-xs text-gray-400 font-black">01 / FRONTEND</div>
                <div className="font-display font-black text-2xl lg:text-3xl text-ink-black mt-2 group-hover:text-accent-red transition-colors">
                  NEXT.JS 14+
                </div>
              </div>
              <div className="text-xs font-bold text-accent-red mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent-red inline-block" />
                <span>App Router &amp; RSC</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-accent-yellow hover:bg-[#ffe000] transition-colors flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="text-xs text-ink-black font-black">02 / STYLING</div>
                <div className="font-display font-black text-2xl lg:text-3xl text-ink-black mt-2">
                  TAILWIND CSS
                </div>
              </div>
              <div className="text-xs font-bold text-ink-black mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-ink-black inline-block" />
                <span>Zero CSS Runtime Bloat</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-white hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between min-h-[160px] group">
              <div>
                <div className="text-xs text-gray-400 font-black">03 / BACKEND</div>
                <div className="font-display font-black text-2xl lg:text-3xl text-ink-black mt-2 group-hover:text-accent-teal transition-colors">
                  NODE.JS
                </div>
              </div>
              <div className="text-xs font-bold text-accent-teal mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent-teal inline-block" />
                <span>REST / GraphQL Microservices</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-white hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between min-h-[160px] group">
              <div>
                <div className="text-xs text-gray-400 font-black">04 / DATABASE</div>
                <div className="font-display font-black text-2xl lg:text-3xl text-ink-black mt-2 group-hover:text-accent-magenta transition-colors">
                  POSTGRESQL
                </div>
              </div>
              <div className="text-xs font-bold text-accent-magenta mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent-magenta inline-block" />
                <span>Prisma ORM &amp; Pool</span>
              </div>
            </div>
          </div>

          {/* Full-Width Swiss Grid - Row 2 (Items 05-08) */}
          <div className="grid grid-cols-2 md:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink-black font-mono">
            <div className="p-6 sm:p-8 bg-white hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between min-h-[160px] group">
              <div>
                <div className="text-xs text-gray-400 font-black">05 / CACHE</div>
                <div className="font-display font-black text-2xl lg:text-3xl text-ink-black mt-2 group-hover:text-accent-red transition-colors">
                  REDIS / UPSTASH
                </div>
              </div>
              <div className="text-xs font-bold text-gray-600 mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-600 inline-block" />
                <span>Sub-ms Edge Latency</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-accent-teal text-black hover:bg-[#00b0b8] transition-colors flex flex-col justify-between min-h-[160px]">
              <div>
                <div className="text-xs font-black">06 / SEO ENGINE</div>
                <div className="font-display font-black text-2xl lg:text-3xl mt-2">
                  JSON-LD &amp; CWV
                </div>
              </div>
              <div className="text-xs font-bold mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-ink-black inline-block" />
                <span>Rank #1 Organic Signals</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-white hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between min-h-[160px] group">
              <div>
                <div className="text-xs text-gray-400 font-black">07 / TYPE SAFETY</div>
                <div className="font-display font-black text-2xl lg:text-3xl text-ink-black mt-2 group-hover:text-accent-red transition-colors">
                  TYPESCRIPT
                </div>
              </div>
              <div className="text-xs font-bold text-gray-600 mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-gray-600 inline-block" />
                <span>Strict Null Checks &amp; Zod</span>
              </div>
            </div>

            <div className="p-6 sm:p-8 bg-white hover:bg-[#FAF9F5] transition-colors flex flex-col justify-between min-h-[160px] group">
              <div>
                <div className="text-xs text-gray-400 font-black">08 / CLOUD</div>
                <div className="font-display font-black text-2xl lg:text-3xl text-ink-black mt-2 group-hover:text-accent-red transition-colors">
                  VERCEL &amp; AWS
                </div>
              </div>
              <div className="text-xs font-bold text-accent-red mt-4 flex items-center gap-1.5">
                <span className="w-1.5 h-1.5 bg-accent-red inline-block" />
                <span>Global Edge CDN</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: 5-STEP PROCESS TIMELINE (PRESERVED & FULL-WIDTH)*/}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-paper-beige paper-grid-bg select-none">
          {/* Header Bar */}
          <div className="py-10 sm:py-14 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black flex flex-col md:flex-row md:items-end justify-between gap-6 bg-white">
            <div>
              <div className="font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-2">
                // SYSTEMATIC SPRINT METHODOLOGY // ZERO BLOAT
              </div>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-ink-black">
                OUR 5-STEP DELIVERY SPRINT
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="px-3 py-1.5 bg-paper-beige border border-ink-black font-mono text-xs font-bold uppercase text-neutral-700">
                TOTAL VELOCITY: 2–4 WEEKS
              </span>
            </div>
          </div>

          {/* 5 Full-Width Sequential Rows */}
          <div className="divide-y-2 divide-ink-black bg-white">
            {[
              {
                step: "01",
                phase: "PHASE 01 // ARCHITECTURE",
                timeframe: "WEEK 1 (DAYS 1–3)",
                title: "SYSTEM ARCHITECTURE & ROADMAP",
                desc: "We define database schema, API contracts, site structure, and SEO keyword targets.",
                deliverable: "Technical Blueprint, Prisma Schema & Sitemap Spec",
              },
              {
                step: "02",
                phase: "PHASE 02 // DESIGN SYSTEM",
                timeframe: "WEEK 1 (DAYS 4–7)",
                title: "NEO-BRUTALIST UI/UX DESIGN",
                desc: "High-contrast, bold, conversion-focused wireframes tailored to your brand personality.",
                deliverable: "Clickable Figma Prototype & Auto-Layout Component Tokens",
              },
              {
                step: "03",
                phase: "PHASE 03 // ENGINEERING",
                timeframe: "WEEK 2–3",
                title: "NEXT.JS & NODE.JS ENGINEERING",
                desc: "Component modularity, server-rendered views, blazing-fast route handlers, and type safety.",
                deliverable: "Live Vercel Staging URL & Private GitHub Commit Access",
              },
              {
                step: "04",
                phase: "PHASE 04 // SPEED AUDIT",
                timeframe: "WEEK 3",
                title: "TECHNICAL SEO & SPEED AUDIT",
                desc: "Robots.txt, XML sitemaps, JSON-LD rich schemas, LCP/CLS optimization for 100/100 Lighthouse.",
                deliverable: "100/100 Core Web Vitals Pass & Structured Data Verification",
              },
              {
                step: "05",
                phase: "PHASE 05 // LAUNCH & HANDOFF",
                timeframe: "WEEK 4",
                title: "LAUNCH & CLIENT CODE HANDOFF",
                desc: "Continuous deployment pipeline, staging verification, DNS cutover, and full code ownership.",
                deliverable: "100% IP Transfer, Production DNS Live & 30-Day SLA",
              },
            ].map((item) => (
              <div
                key={item.step}
                className="py-7 sm:py-8 px-6 sm:px-10 lg:px-16 flex flex-col md:flex-row md:items-center justify-between gap-6 hover:bg-[#FAF9F5] transition-colors group"
              >
                <div className="flex items-start sm:items-center gap-6">
                  <span className="font-display font-black text-4xl sm:text-5xl text-accent-red group-hover:text-ink-black transition-colors shrink-0">
                    {item.step}
                  </span>
                  <div>
                    <div className="flex flex-wrap items-center gap-2 mb-1.5">
                      <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-paper-beige border border-ink-black text-ink-black">
                        {item.phase}
                      </span>
                      <span className="font-mono text-[10px] font-bold uppercase text-neutral-500">
                        {item.timeframe}
                      </span>
                    </div>
                    <h3 className="font-display font-black text-xl sm:text-2xl uppercase text-ink-black group-hover:text-accent-red transition-colors">
                      {item.title}
                    </h3>
                    <p className="font-sans text-sm text-neutral-700 font-medium mt-1 max-w-2xl">
                      {item.desc}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-4 shrink-0 self-end md:self-center">
                  <div className="text-right hidden sm:block">
                    <span className="font-mono text-[10px] font-black uppercase text-neutral-400 block">KEY DELIVERABLE</span>
                    <span className="font-mono text-xs font-bold text-ink-black">{item.deliverable}</span>
                  </div>
                  <span className="px-3 py-1 bg-accent-yellow border-2 border-ink-black font-mono text-xs font-black shadow-brut-xs shrink-0">
                    STAGE {item.step}
                  </span>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================================= */}
        {/* NEW SECTION 4: FULL-WIDTH AGENCY VALUES / CODE OF STANDARDS               */}
        {/* ========================================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white select-none">
          {/* Header */}
          <div className="py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black bg-[#FAF9F5] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-3">
                // AGENCY CODE OF STANDARDS • THE 4 LAWS
              </div>
              <h2 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-ink-black leading-[0.92]">
                NON-NEGOTIABLE <br />
                <span className="text-accent-red">ENGINEERING VALUES.</span>
              </h2>
            </div>
            <div className="max-w-md">
              <p className="font-sans text-sm sm:text-base text-neutral-700 leading-relaxed font-normal">
                Most agencies sell billable hours and bloated frameworks. We hold our studio to four mathematical principles that prioritize client revenue and technical longevity.
              </p>
            </div>
          </div>

          {/* 4 Full-Width Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink-black bg-white">
            {/* Value 1: Speed as a Feature */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-accent-yellow border-2 border-ink-black shadow-brut-xs flex items-center justify-center">
                    <Zap className="w-6 h-6 text-ink-black" />
                  </div>
                  <span className="font-mono text-xs font-black uppercase text-neutral-400">
                    LAW // 01
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black mb-3 group-hover:text-accent-red transition-colors">
                  SPEED AS A FEATURE
                </h3>
                <p className="font-sans text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  Sub-300ms global LCP isn&apos;t a vanity metric; it directly drives Google search rankings, lower bounce rates, and higher customer checkout completions.
                </p>
                <div className="space-y-2 font-mono text-xs text-neutral-800 border-t border-dashed border-neutral-300 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Sub-200ms global TTFB edge cache</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>0.00 Cumulative Layout Shift (CLS)</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>React Server Components by default</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-ink-black">
                <span className="font-mono text-[11px] font-black uppercase px-2.5 py-1 bg-accent-yellow border border-ink-black text-ink-black inline-block">
                  100/100 CWV GUARANTEED
                </span>
              </div>
            </div>

            {/* Value 2: 100% IP Ownership */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-accent-teal border-2 border-ink-black shadow-brut-xs flex items-center justify-center">
                    <ShieldCheck className="w-6 h-6 text-black" />
                  </div>
                  <span className="font-mono text-xs font-black uppercase text-neutral-400">
                    LAW // 02
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black mb-3 group-hover:text-accent-teal transition-colors">
                  100% IP OWNERSHIP
                </h3>
                <p className="font-sans text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  You own every line of code, master Figma file, and database schema from day one. Full copyright assignment with zero vendor lock-in or recurring fees.
                </p>
                <div className="space-y-2 font-mono text-xs text-neutral-800 border-t border-dashed border-neutral-300 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Complete GitHub repository transfer</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Master Figma editable design systems</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Zero agency licenses or hostage code</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-ink-black">
                <span className="font-mono text-[11px] font-black uppercase px-2.5 py-1 bg-accent-teal border border-ink-black text-black inline-block">
                  0% VENDOR LOCK-IN
                </span>
              </div>
            </div>

            {/* Value 3: Zero Bloat */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-ink-black border-2 border-ink-black shadow-brut-xs flex items-center justify-center">
                    <Layers className="w-6 h-6 text-accent-yellow" />
                  </div>
                  <span className="font-mono text-xs font-black uppercase text-neutral-400">
                    LAW // 03
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black mb-3 group-hover:text-accent-red transition-colors">
                  ZERO BLOAT
                </h3>
                <p className="font-sans text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  No drag-and-drop page builders, no unvetted WordPress plugins, and no redundant third-party scripts that create security vulnerabilities.
                </p>
                <div className="space-y-2 font-mono text-xs text-neutral-800 border-t border-dashed border-neutral-300 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Pure Next.js 14 &amp; Tailwind CSS</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Strict TypeScript &amp; Zod runtime schemas</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Lightweight bundles (&lt; 85KB client hydrate)</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-ink-black">
                <span className="font-mono text-[11px] font-black uppercase px-2.5 py-1 bg-neutral-100 border border-ink-black text-ink-black inline-block">
                  &lt; 85KB JS PAYLOAD
                </span>
              </div>
            </div>

            {/* Value 4: Direct Senior Access */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group">
              <div>
                <div className="flex items-center justify-between mb-6">
                  <div className="w-12 h-12 bg-accent-red border-2 border-ink-black shadow-brut-xs flex items-center justify-center">
                    <Cpu className="w-6 h-6 text-white" />
                  </div>
                  <span className="font-mono text-xs font-black uppercase text-neutral-400">
                    LAW // 04
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black mb-3 group-hover:text-accent-red transition-colors">
                  DIRECT SENIOR ACCESS
                </h3>
                <p className="font-sans text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  You collaborate directly with principal architects and lead engineers. Never pawned off to junior developers or non-technical account managers.
                </p>
                <div className="space-y-2 font-mono text-xs text-neutral-800 border-t border-dashed border-neutral-300 pt-4">
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Direct Slack/Discord engineer access</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Weekly staged Vercel video walkthroughs</span>
                  </div>
                  <div className="flex items-center gap-2">
                    <Check className="w-3.5 h-3.5 text-accent-red shrink-0" />
                    <span>Same-day asynchronous PR feedback</span>
                  </div>
                </div>
              </div>

              <div className="mt-8 pt-4 border-t-2 border-ink-black">
                <span className="font-mono text-[11px] font-black uppercase px-2.5 py-1 bg-accent-red border border-ink-black text-white inline-block">
                  100% PRINCIPAL TALENT
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* NEW SECTION 5: FULL-WIDTH SENIOR ARCHITECTS & LEADERSHIP MATRIX           */}
        {/* ========================================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white select-none">
          {/* Header */}
          <div className="py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black bg-white flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-3">
                // ARCHITECTURAL LEADERSHIP • NO JUNIOR SURPRISES
              </div>
              <h2 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-ink-black leading-[0.92]">
                MEET OUR PRINCIPAL <br />
                <span className="text-neutral-500">ENGINEERING ARCHITECTS.</span>
              </h2>
            </div>
            <div className="flex items-center gap-3">
              <span className="font-mono text-xs font-black uppercase px-3 py-1.5 bg-accent-yellow border-2 border-ink-black shadow-brut-xs">
                100% SENIOR-ONLY ROSTER
              </span>
            </div>
          </div>

          {/* 4 Full-Width Architect Columns */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink-black bg-white">
            {/* Architect 1: Alex Vance */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-ink-black">
                  <div className="w-14 h-14 bg-accent-yellow border-2 border-ink-black shadow-brut-xs flex items-center justify-center font-display font-black text-xl text-ink-black">
                    AV
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-accent-green/20 text-accent-green border border-accent-green inline-block">
                      ACTIVE SPRINT LEAD
                    </span>
                    <span className="font-mono text-xs font-black text-neutral-400 block mt-1">
                      EXP // 12+ YRS
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black group-hover:text-accent-red transition-colors">
                    Alex Vance
                  </h3>
                  <div className="font-mono text-xs font-black uppercase text-accent-red mt-1">
                    FOUNDER &amp; PRINCIPAL ARCHITECT
                  </div>
                </div>

                <p className="font-sans text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  Ex-staff systems engineer specializing in high-throughput Next.js React Server Components, microservices, and distributed cloud edge networks.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Next.js 14 RSC", "TypeScript", "Edge Compute", "System Architecture"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] border border-ink-black font-mono text-[11px] font-bold text-neutral-700 flex items-center justify-between">
                <span>VERIFIED RECORD:</span>
                <span className="text-ink-black font-black">1,400+ PROD COMMITS</span>
              </div>
            </div>

            {/* Architect 2: Mia Thorne */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-ink-black">
                  <div className="w-14 h-14 bg-accent-teal border-2 border-ink-black shadow-brut-xs flex items-center justify-center font-display font-black text-xl text-black">
                    MT
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-accent-teal/20 text-accent-teal border border-accent-teal inline-block">
                      DESIGN SYSTEM LEAD
                    </span>
                    <span className="font-mono text-xs font-black text-neutral-400 block mt-1">
                      EXP // 9+ YRS
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black group-hover:text-accent-teal transition-colors">
                    Mia Thorne
                  </h3>
                  <div className="font-mono text-xs font-black uppercase text-accent-teal mt-1">
                    HEAD OF DESIGN &amp; UI SYSTEMS
                  </div>
                </div>

                <p className="font-sans text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  Pioneer in conversion-focused Neo-Brutalist design systems. Crafts mathematically aligned Swiss grids, Figma token architectures, and WCAG AAA accessibility.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Swiss Grid", "Design Tokens", "Figma Master", "WCAG AAA Systems"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] border border-ink-black font-mono text-[11px] font-bold text-neutral-700 flex items-center justify-between">
                <span>VERIFIED RECORD:</span>
                <span className="text-ink-black font-black">40+ SYSTEMS SHIPPED</span>
              </div>
            </div>

            {/* Architect 3: David Chen */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-ink-black">
                  <div className="w-14 h-14 bg-accent-magenta border-2 border-ink-black shadow-brut-xs flex items-center justify-center font-display font-black text-xl text-white">
                    DC
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-accent-magenta/20 text-accent-magenta border border-accent-magenta inline-block">
                      INFRASTRUCTURE LEAD
                    </span>
                    <span className="font-mono text-xs font-black text-neutral-400 block mt-1">
                      EXP // 11+ YRS
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black group-hover:text-accent-magenta transition-colors">
                    David Chen
                  </h3>
                  <div className="font-mono text-xs font-black uppercase text-accent-magenta mt-1">
                    LEAD BACKEND &amp; DB ARCHITECT
                  </div>
                </div>

                <p className="font-sans text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  Database performance specialist. Architects resilient PostgreSQL connection pools, sub-millisecond Upstash Redis caching, and Stripe payment pipelines.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["PostgreSQL", "Redis Edge", "Prisma ORM", "Stripe Infrastructure"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] border border-ink-black font-mono text-[11px] font-bold text-neutral-700 flex items-center justify-between">
                <span>VERIFIED RECORD:</span>
                <span className="text-ink-black font-black">99.999% PROD UPTIME</span>
              </div>
            </div>

            {/* Architect 4: Sophia Patel */}
            <div className="p-8 sm:p-10 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group">
              <div>
                <div className="flex items-center justify-between pb-6 mb-6 border-b-2 border-ink-black">
                  <div className="w-14 h-14 bg-accent-red border-2 border-ink-black shadow-brut-xs flex items-center justify-center font-display font-black text-xl text-white">
                    SP
                  </div>
                  <div className="text-right">
                    <span className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-accent-red/20 text-accent-red border border-accent-red inline-block">
                      PERFORMANCE LEAD
                    </span>
                    <span className="font-mono text-xs font-black text-neutral-400 block mt-1">
                      EXP // 8+ YRS
                    </span>
                  </div>
                </div>

                <div className="mb-4">
                  <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black group-hover:text-accent-red transition-colors">
                    Sophia Patel
                  </h3>
                  <div className="font-mono text-xs font-black uppercase text-accent-red mt-1">
                    DIRECTOR OF SEO &amp; PERFORMANCE
                  </div>
                </div>

                <p className="font-sans text-sm text-neutral-700 leading-relaxed font-normal mb-6">
                  Core Web Vitals master. Engineers dynamic Schema.org JSON-LD structured data and edge caching to propel Next.js client platforms to Google #1 organic rankings.
                </p>

                <div className="flex flex-wrap gap-1.5 mb-6">
                  {["Core Web Vitals", "Schema.org", "Cloudflare Edge", "Search Console"].map((tag) => (
                    <span
                      key={tag}
                      className="font-mono text-[10px] font-black uppercase px-2 py-0.5 bg-neutral-100 border border-neutral-300 text-neutral-800"
                    >
                      {tag}
                    </span>
                  ))}
                </div>
              </div>

              <div className="p-3 bg-[#FAF9F5] border border-ink-black font-mono text-[11px] font-bold text-neutral-700 flex items-center justify-between">
                <span>VERIFIED RECORD:</span>
                <span className="text-ink-black font-black">100/100 AUDIT RATE</span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================================= */}
        {/* NEW SECTION 6: FULL-WIDTH AGENCY COMPARISON MATRIX                        */}
        {/* ========================================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white select-none">
          {/* Header */}
          <div className="py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black bg-[#FAF9F5] flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <div className="font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-3">
                // HEAD-TO-HEAD MATRIX // OBJECTIVE BREAKDOWN
              </div>
              <h2 className="font-headline font-bold text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tight text-ink-black leading-[0.92]">
                TRADITIONAL SLOW AGENCIES <br />
                <span className="text-accent-red">VS. CODECLOVERS.</span>
              </h2>
            </div>
            <div className="font-mono text-xs font-bold uppercase text-neutral-600 bg-white border border-ink-black p-3 shadow-xs max-w-sm">
              COMPARE OUR PRODUCTION ARCHITECTURE AND DELIVERY DISCIPLINE AGAINST LEGACY AGENCIES.
            </div>
          </div>

          {/* Table Header Bar */}
          <div className="hidden lg:grid grid-cols-12 divide-x-2 divide-ink-black border-b-2 border-ink-black bg-ink-black text-white font-mono text-xs font-black uppercase tracking-wider">
            <div className="col-span-4 px-6 sm:px-10 py-4">ARCHITECTURAL CRITERIA</div>
            <div className="col-span-4 px-6 sm:px-10 py-4 bg-neutral-900 text-neutral-400">
              TRADITIONAL SLOW AGENCIES
            </div>
            <div className="col-span-4 px-6 sm:px-10 py-4 bg-accent-yellow text-ink-black">
              CODECLOVERS HIGH-SPEED MACHINES
            </div>
          </div>

          {/* Table Rows */}
          <div className="divide-y-2 divide-ink-black bg-white">
            {[
              {
                feature: "Development Stack & Tech",
                metric: "CORE INFRASTRUCTURE",
                legacy: "WordPress, Webflow, Shopify templates, bloated PHP plugins, and drag-and-drop page builders.",
                legacyStatus: "BLOCKED BY PLUGINS",
                codec: "100% Bespoke Next.js 14 App Router, strict TypeScript, React Server Components, and Tailwind CSS.",
                codecStatus: "BESPOKE NEXT.JS 14",
              },
              {
                feature: "Page Speed & Core Web Vitals",
                metric: "USER EXPERIENCE",
                legacy: "3.5s to 7.0s sluggish load times, 30–60 Lighthouse scores, and heavy layout shift that tanks conversions.",
                legacyStatus: "FAIL (3.5S+ LCP)",
                codec: "Guaranteed sub-300ms global LCP, 0.00 CLS, and certified 100/100 Core Web Vitals across all viewports.",
                codecStatus: "100/100 CWV GUARANTEED",
              },
              {
                feature: "Sprint Velocity & Staging",
                metric: "DELIVERY TIMELINE",
                legacy: "6 to 12 months with endless status meetings, bureaucratic change orders, and zero staging previews.",
                legacyStatus: "6–12 MONTH DELAYS",
                codec: "High-velocity 2 to 4 week agile sprints. Live staging URL on Vercel from Day 5 with weekly staged reviews.",
                codecStatus: "2–4 WEEK SPRINTS",
              },
              {
                feature: "Code & IP Ownership",
                metric: "LEGAL RIGHTS",
                legacy: "Hostage codebases, recurring proprietary CMS licenses, locked hosting accounts, and messy unversioned files.",
                legacyStatus: "VENDOR LOCK-IN",
                codec: "100% Intellectual Property transfer. Clean GitHub repository ownership, master Figma files, and zero recurring fees.",
                codecStatus: "100% COMPLETE IP TRANSFER",
              },
              {
                feature: "Engineering Team & Access",
                metric: "COMMUNICATION",
                legacy: "Junior interns writing code, hidden behind non-technical account managers who slow down every question.",
                legacyStatus: "NON-TECHNICAL MIDDLEMEN",
                codec: "Direct private Slack/Discord channel access to senior principal architects and engineers. Zero middlemen.",
                codecStatus: "DIRECT SENIOR ACCESS",
              },
              {
                feature: "Technical SEO & Schemas",
                metric: "SEARCH DOMINANCE",
                legacy: "Basic Yoast SEO plugin with generic meta tags, unmaintained sitemaps, and zero dynamic Schema.org markup.",
                legacyStatus: "BASIC YOAST METAS",
                codec: "Dynamic JSON-LD Schema.org rich snippets, edge-cached server rendering, canonical routing, and Google API indexing.",
                codecStatus: "AUTOMATED SCHEMA.ORG",
              },
              {
                feature: "Post-Launch Warranty & Support",
                metric: "ONGOING SLA",
                legacy: "Abandoned at launch or billed $250/hr for routine security patches, broken plugins, and emergency bug fixes.",
                legacyStatus: "$250/HR EXTRA CHARGES",
                codec: "30-day comprehensive launch warranty included in writing + dedicated monthly SLA maintenance retainers.",
                codecStatus: "30-DAY WARRANTY + SLA",
              },
            ].map((row, idx) => (
              <div
                key={row.feature}
                className="grid grid-cols-1 lg:grid-cols-12 divide-y-2 lg:divide-y-0 lg:divide-x-2 divide-ink-black hover:bg-[#FAF9F5] transition-colors"
              >
                {/* Feature Name */}
                <div className="lg:col-span-4 p-6 sm:p-8 flex flex-col justify-center">
                  <span className="font-mono text-[10px] font-black uppercase text-accent-red tracking-wider">
                    CRITERIA 0{idx + 1} // {row.metric}
                  </span>
                  <div className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-ink-black mt-1">
                    {row.feature}
                  </div>
                </div>

                {/* Legacy Agencies */}
                <div className="lg:col-span-4 p-6 sm:p-8 bg-neutral-50/60 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 lg:hidden">
                      <span className="font-mono text-[10px] font-black uppercase text-neutral-500">TRADITIONAL SLOW AGENCIES:</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 bg-neutral-200 border border-neutral-400 flex items-center justify-center shrink-0">
                        <X className="w-3.5 h-3.5 text-neutral-600 stroke-[3]" />
                      </div>
                      <span className="font-mono text-[11px] font-black uppercase text-neutral-500">
                        {row.legacyStatus}
                      </span>
                    </div>
                    <p className="font-sans text-sm text-neutral-600 leading-relaxed font-normal">
                      {row.legacy}
                    </p>
                  </div>
                </div>

                {/* CodeClovers */}
                <div className="lg:col-span-4 p-6 sm:p-8 bg-accent-yellow/10 flex flex-col justify-between">
                  <div>
                    <div className="flex items-center gap-2 mb-2 lg:hidden">
                      <span className="font-mono text-[10px] font-black uppercase text-accent-red">CODECLOVERS MACHINES:</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="w-5 h-5 bg-accent-yellow border border-ink-black flex items-center justify-center shrink-0 shadow-2xs">
                        <Check className="w-3.5 h-3.5 text-ink-black stroke-[3]" />
                      </div>
                      <span className="font-mono text-[11px] font-black uppercase text-ink-black">
                        {row.codecStatus}
                      </span>
                    </div>
                    <p className="font-sans text-sm font-semibold text-neutral-900 leading-relaxed">
                      {row.codec}
                    </p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 7: ABOUT PAGE CLIENT FAQ ACCORDION                */}
        {/* ========================================================= */}
        <AboutFaqSection />

        {/* ========================================================= */}
        {/* SECTION 8: CTA BANNER (PRESERVED & FULL-WIDTH)            */}
        {/* ========================================================= */}
        <section className="w-full py-16 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 text-center bg-accent-yellow border-b-2 border-ink-black flex flex-col items-center select-none">
          <div className="max-w-3xl flex flex-col items-center">
            <div className="font-mono text-xs font-black uppercase tracking-widest text-ink-black bg-white px-3 py-1 border-2 border-ink-black shadow-brut-xs mb-6">
              // SPRINT ONBOARDING • ACCEPTING NEW CLIENTS
            </div>
            <h2 className="font-display font-black text-4xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-ink-black mb-6 leading-[0.9]">
              READY TO BUILD <br />
              SOMETHING ICONIC?
            </h2>
            <p className="font-mono text-sm sm:text-base font-bold uppercase text-ink-black mb-8 max-w-lg leading-relaxed">
              Check out our fixed development packages or get in touch for custom architecture.
            </p>
            <div className="flex flex-wrap items-center gap-4 justify-center">
              <Link
                href="/plans"
                className="neo-btn px-8 py-4 bg-ink-black text-white font-mono font-black text-xs sm:text-sm uppercase hover:bg-white hover:text-ink-black transition-colors"
              >
                EXPLORE PLANS ↗
              </Link>
              <Link
                href="/contact"
                className="neo-btn px-8 py-4 bg-white text-ink-black font-mono font-black text-xs sm:text-sm uppercase hover:bg-accent-red hover:text-white transition-colors"
              >
                TALK TO AN ENGINEER ↗
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* Complete Footer */}
      <BrutFooter />
    </div>
  );
}
