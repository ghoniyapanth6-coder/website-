import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { StatusMarquee } from "@/components/StatusMarquee";
import { PlansFaqSection } from "@/components/PlansFaqSection";
import { BrutFooter } from "@/components/BrutFooter";
import {
  ArrowUpRight,
  Check,
  Zap,
  ShieldCheck,
  Award,
  Lock,
  Sparkles,
} from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Fixed-Scope Sprints & Transparent Pricing // CodeClovers",
  description:
    "Predictable flat-fee sprints, guaranteed delivery timelines, and 100% source code ownership. Starter MVP $1,999, Growth Studio $4,499, and Enterprise Scale $8,999+.",
  alternates: {
    canonical: "/plans",
  },
};

const PLANS = [
  {
    name: "STARTER MVP",
    price: "$1,999",
    timeline: "2 WEEKS",
    badge: "RAPID LAUNCH",
    badgeColor: "bg-paper-beige",
    desc: "For startups and ambitious founders who need a blazing-fast, high-converting digital storefront built from scratch.",
    features: [
      "Custom Next.js 14+ App Router (1-3 Pages)",
      "Modular Tailwind CSS Responsive Layout",
      "Essential On-Page & Technical SEO Setup",
      "Contact Form with Direct Resend / Email API",
      "100/100 Google Lighthouse Score Guarantee",
      "14 Days Post-Launch Bug Warranty",
      "100% Source Code & GitHub IP Ownership",
    ],
    cta: "SELECT STARTER MVP",
    href: "/contact?plan=Starter%20MVP",
    popular: false,
  },
  {
    name: "GROWTH STUDIO",
    price: "$4,499",
    timeline: "3-4 WEEKS",
    badge: "MOST POPULAR",
    badgeColor: "bg-accent-yellow",
    desc: "The comprehensive full-stack web application suite with custom Node.js APIs, dynamic blog CMS, and search engine dominance.",
    features: [
      "Full Multi-Page Next.js 14 App (6-10 Pages)",
      "Custom Node.js REST API & Server Actions",
      "Dynamic Headless / MDX Blog CMS Engine",
      "Complete Schema.org Dynamic JSON-LD Suite",
      "Interactive Neo-Brutalist Micro-Animations",
      "Automated XML Sitemap & Robots Engine",
      "Analytics & Conversion Funnel Tracking Setup",
      "30 Days Dedicated Senior Support & Warranty",
      "100% Source Code & GitHub IP Ownership",
    ],
    cta: "SELECT GROWTH STUDIO ★",
    href: "/contact?plan=Growth%20Studio",
    popular: true,
  },
  {
    name: "ENTERPRISE SCALE",
    price: "$8,999+",
    timeline: "6-8 WEEKS",
    badge: "BESPOKE SCALE",
    badgeColor: "bg-ink-black text-white",
    desc: "Bespoke high-volume platforms, complex microservices, relational databases, secure authentication, and enterprise SLAs.",
    features: [
      "Unlimited Application Complexity & Custom Scope",
      "High-Throughput Node.js Microservices (Fastify)",
      "PostgreSQL Database with Prisma ORM & Migrations",
      "Custom Auth, RBAC & Stripe Billing Engine",
      "Real-Time WebSockets & Distributed Redis Cache",
      "Automated E2E Testing (Playwright / Jest)",
      "Dedicated Senior Engineering Lead Assigned",
      "90 Days Extended SLA & Architecture Support",
      "100% Source Code & GitHub IP Ownership",
    ],
    cta: "TALK ENTERPRISE SCALE",
    href: "/contact?plan=Enterprise%20Scale",
    popular: false,
  },
];

export default function PlansPage() {
  return (
    <div className="min-h-screen bg-paper-beige flex flex-col font-sans select-none">
      <Navbar />
      <StatusMarquee />

      <main className="flex-1 w-full">
        {/* ========================================================= */}
        {/* SECTION 1: PLANS HERO HEADER (CENTERED SWISS GRID)        */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white paper-ruled-bg py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 relative overflow-hidden select-none text-center">
          <div className="washi-tape -top-2 right-12 rotate-[2deg]" />

          <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="font-mono text-xs font-black uppercase text-accent-red tracking-widest bg-accent-yellow px-2.5 py-1 border border-ink-black shadow-brut-sm inline-block mb-6">
              [ 04 // FIXED-SCOPE PACKAGES ]
            </span>
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] uppercase tracking-tight sm:tracking-tighter text-ink-black leading-[0.92] mb-8 text-center w-full">
              <span className="block whitespace-normal sm:whitespace-nowrap">
                TRANSPARENT PRICING.
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                <span className="bg-accent-yellow px-2.5 sm:px-3.5 py-0.5 border-2 border-ink-black shadow-brut-sm inline-block rotate-[-1deg] mx-1">
                  ZERO HOURLY
                </span>
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                SURPRISES.
              </span>
            </h1>
            <p className="font-mono text-base sm:text-lg lg:text-xl font-bold uppercase text-gray-800 max-w-3xl leading-relaxed text-center mx-auto">
              Predictable flat-fee sprints, guaranteed delivery timelines, and 100% source code ownership. No hidden retainer lock-ins or scope creep.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: CLIENT TRUST & GUARANTEES BAR                  */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-[#FAF9F5] select-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-ink-black">
            {/* Guarantee 1 */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white hover:bg-neutral-50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xs bg-accent-yellow border-2 border-ink-black flex items-center justify-center shadow-brut-xs">
                    <ShieldCheck className="w-5 h-5 text-ink-black stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[10px] font-black uppercase text-accent-red bg-accent-red/10 px-2 py-0.5 border border-accent-red">
                    100% VERIFIED
                  </span>
                </div>
                <h3 className="font-display font-black text-lg uppercase text-ink-black tracking-tight mb-2">
                  100% Code &amp; IP Ownership
                </h3>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed font-normal">
                  Full administrative transfer of your GitHub repository, Figma design master files, and cloud credentials upon final milestone. Zero proprietary vendor lock-in.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 font-mono text-[10px] font-bold text-neutral-500 uppercase">
                // FULL IP CONTRACT TRANSFER
              </div>
            </div>

            {/* Guarantee 2 */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white hover:bg-neutral-50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xs bg-accent-teal border-2 border-ink-black flex items-center justify-center shadow-brut-xs">
                    <Zap className="w-5 h-5 text-ink-black stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[10px] font-black uppercase text-emerald-800 bg-emerald-100 px-2 py-0.5 border border-emerald-800">
                    PERFECT AUDIT
                  </span>
                </div>
                <h3 className="font-display font-black text-lg uppercase text-ink-black tracking-tight mb-2">
                  100/100 Core Web Vitals SLA
                </h3>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed font-normal">
                  Strictly engineered with React Server Components and edge caching. Guaranteed sub-300ms global TTFB, 0.00 CLS, and flawless 100/100 Google Lighthouse scores.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 font-mono text-[10px] font-bold text-neutral-500 uppercase">
                // LIGHTHOUSE AUDIT GUARANTEE
              </div>
            </div>

            {/* Guarantee 3 */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white hover:bg-neutral-50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xs bg-accent-red border-2 border-ink-black flex items-center justify-center shadow-brut-xs text-white">
                    <Award className="w-5 h-5 text-ink-black stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[10px] font-black uppercase text-ink-black bg-accent-yellow px-2 py-0.5 border border-ink-black">
                    POST-LAUNCH
                  </span>
                </div>
                <h3 className="font-display font-black text-lg uppercase text-ink-black tracking-tight mb-2">
                  30-Day Post-Launch Warranty
                </h3>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed font-normal">
                  Comprehensive 30-day warranty on all delivered code. Immediate bug remediation, browser compatibility patching, and direct senior engineer support.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-200 font-mono text-[10px] font-bold text-neutral-500 uppercase">
                // ZERO-COST BUG FIXES
              </div>
            </div>

            {/* Guarantee 4 */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-[#FAF9F5] hover:bg-neutral-100 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-xs bg-ink-black border-2 border-ink-black flex items-center justify-center shadow-brut-xs text-accent-yellow">
                    <Lock className="w-5 h-5 stroke-[2.5]" />
                  </div>
                  <div className="flex items-center gap-1.5 font-mono text-[10px] font-black uppercase text-ink-black bg-white px-2 py-0.5 border border-ink-black">
                    <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                    <span>LOCKED FLAT FEE</span>
                  </div>
                </div>
                <h3 className="font-display font-black text-lg uppercase text-ink-black tracking-tight mb-2">
                  Zero Hourly Surprises
                </h3>
                <p className="font-sans text-xs text-neutral-600 leading-relaxed font-normal">
                  Fixed milestone scopes with clearly defined deliverables. What we quote on Day 1 is exactly what you pay. Zero sneaky overtime or hidden invoices.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-neutral-300 font-mono text-[10px] font-bold text-neutral-500 uppercase">
                // FIXED SCOPE CONTRACTS
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: 3 HIGH-IMPACT PRICING CARDS + RETAINED BANNER   */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-paper-beige py-12 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 select-none">
          {/* Section Sub-Header */}
          <div className="mb-10 sm:mb-12 flex flex-col md:flex-row md:items-end justify-between gap-6 border-b-2 border-ink-black pb-6">
            <div>
              <span className="font-mono text-xs font-black uppercase text-accent-red tracking-widest block mb-2">
                // FIXED-SCOPE SPRINT TIERS
              </span>
              <h2 className="font-display font-black text-3xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-ink-black leading-none">
                CHOOSE YOUR VEHICLE.
              </h2>
            </div>
            <div className="font-mono text-xs font-bold uppercase text-neutral-600 max-w-md">
              Select the development sprint matched to your immediate growth goals. Every plan includes 100% IP transfer &amp; guaranteed Core Web Vitals.
            </div>
          </div>

          {/* 3 Pricing Cards */}
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 items-stretch mb-12">
            {PLANS.map((plan) => (
              <div
                key={plan.name}
                className={`neo-card flex flex-col justify-between p-6 sm:p-8 lg:p-9 relative ${
                  plan.popular
                    ? "bg-accent-yellow border-brut-thick shadow-brut-xl scale-[1.01]"
                    : "bg-white border-2 border-ink-black shadow-brut"
                }`}
              >
                {/* Popular Badge Tag */}
                {plan.popular && (
                  <div className="absolute -top-3.5 right-6 bg-ink-black text-accent-yellow font-mono text-[11px] font-black px-3 py-1 border-2 border-ink-black shadow-brut-xs uppercase flex items-center gap-1.5">
                    <Sparkles className="w-3.5 h-3.5 text-accent-yellow" />
                    <span>RECOMMENDED BY ARCHITECTS</span>
                  </div>
                )}

                <div>
                  <div className="flex items-center justify-between mb-4">
                    <span
                      className={`px-2.5 py-1 font-mono text-[11px] font-black uppercase border border-ink-black shadow-brut-xs ${plan.badgeColor}`}
                    >
                      {plan.badge}
                    </span>
                    <span className="font-mono text-xs font-black uppercase text-gray-700 bg-white/70 px-2 py-0.5 border border-ink-black shadow-2xs">
                      ⏱ {plan.timeline}
                    </span>
                  </div>

                  <h3 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-black">
                    {plan.name}
                  </h3>

                  <div className="my-6 pb-6 border-b-2 border-ink-black">
                    <div className="flex items-baseline gap-1">
                      <span className="font-display font-black text-5xl sm:text-6xl text-ink-black tracking-tight">
                        {plan.price}
                      </span>
                      <span className="font-mono text-xs font-black uppercase text-neutral-600">
                        / SPRINT
                      </span>
                    </div>
                    <span className="font-mono text-[11px] font-black text-gray-700 block mt-1 tracking-wider">
                      ONE-TIME FLAT FEE • ZERO HIDDEN SURPRISES
                    </span>
                  </div>

                  <p className="font-sans text-xs sm:text-sm font-semibold text-gray-800 leading-relaxed mb-6">
                    {plan.desc}
                  </p>

                  {/* Feature Checklist */}
                  <div className="font-mono text-[10px] font-black uppercase text-gray-600 tracking-wider mb-3">
                    CORE DELIVERABLES INCLUDED:
                  </div>
                  <ul className="space-y-3 font-sans text-xs sm:text-sm font-medium mb-8">
                    {plan.features.map((feat) => (
                      <li key={feat} className="flex items-start gap-2.5">
                        <div
                          className={`w-4 h-4 rounded-xs border border-ink-black flex items-center justify-center shrink-0 mt-0.5 ${
                            plan.popular ? "bg-white text-ink-black" : "bg-accent-yellow text-ink-black"
                          }`}
                        >
                          <Check className="w-3 h-3 stroke-[3]" />
                        </div>
                        <span className="text-ink-black font-semibold leading-snug">{feat}</span>
                      </li>
                    ))}
                  </ul>
                </div>

                <Link
                  href={plan.href}
                  className={`neo-btn w-full py-4 text-center font-mono font-black text-xs uppercase tracking-wider block transition-all ${
                    plan.popular
                      ? "bg-ink-black text-white hover:bg-white hover:text-ink-black shadow-brut"
                      : "bg-accent-yellow text-ink-black hover:bg-ink-black hover:text-white shadow-brut-xs"
                  }`}
                >
                  {plan.cta} ↗
                </Link>
              </div>
            ))}
          </div>

          {/* Retained SLA Banner ($3,499/mo) */}
          <div className="border-2 border-ink-black bg-ink-black text-white p-6 sm:p-8 lg:p-10 shadow-brut-lg relative overflow-hidden">
            <div className="flex flex-col lg:flex-row lg:items-center justify-between gap-8 relative z-10">
              <div className="max-w-3xl">
                <div className="flex flex-wrap items-center gap-2 mb-3">
                  <span className="font-mono text-xs font-black uppercase px-2.5 py-0.5 bg-accent-teal text-ink-black border border-white/20">
                    CONTINUOUS ENGINEERING // MONTHLY SLA
                  </span>
                  <span className="font-mono text-xs font-bold text-accent-yellow">
                    ● MONTH-TO-MONTH • ZERO LONG-TERM LOCK-IN
                  </span>
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl lg:text-4xl uppercase tracking-tight text-white mb-3">
                  CONTINUOUS RETAINED SLA // $3,499<span className="text-accent-yellow">/MO</span>
                </h3>
                <p className="font-sans text-xs sm:text-sm text-neutral-300 leading-relaxed font-normal mb-5">
                  Need an ongoing senior engineering squad in your corner? Secure dedicated monthly sprint hours for feature rollouts, database scaling, technical SEO monitoring, and 24/7 uptime protection with a guaranteed 4-hour SLA response.
                </p>
                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3 font-mono text-[11px] font-bold text-neutral-300">
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent-teal shrink-0 stroke-[3]" />
                    <span>Dedicated Hours</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent-teal shrink-0 stroke-[3]" />
                    <span>4-Hour SLA Response</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent-teal shrink-0 stroke-[3]" />
                    <span>24/7 CWV Auditing</span>
                  </div>
                  <div className="flex items-center gap-1.5">
                    <Check className="w-3.5 h-3.5 text-accent-teal shrink-0 stroke-[3]" />
                    <span>Cancel Anytime</span>
                  </div>
                </div>
              </div>

              <div className="shrink-0 flex flex-col sm:flex-row lg:flex-col gap-3">
                <Link
                  href="/contact?plan=Dedicated%20Retainer"
                  className="px-8 py-4 bg-accent-yellow text-ink-black font-mono text-xs font-black uppercase border-2 border-white hover:bg-white transition-colors shadow-brut text-center flex items-center justify-center gap-2 group"
                >
                  <span>TALK RETAINED SLA</span>
                  <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                </Link>
                <span className="font-mono text-[10px] text-neutral-400 text-center">
                  LIMITED CAPACITY: 2 RETAINER SLOTS AVAILABLE
                </span>
              </div>
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: FULL-WIDTH SERVICE TIER COMPARISON TABLE       */}
        {/* ========================================================= */}
        <section
          id="matrix"
          className="w-full border-b-2 border-ink-black bg-white select-none scroll-mt-24"
        >
          {/* Table Section Header Bar */}
          <div className="p-6 sm:p-10 md:p-12 border-b-2 border-ink-black bg-neutral-900 text-white flex flex-col md:flex-row md:items-end justify-between gap-6">
            <div>
              <span className="font-mono text-xs font-black uppercase text-accent-yellow tracking-widest block mb-2">
                // 05 • ARCHITECTURAL SPECIFICATION MATRIX
              </span>
              <h2 className="font-headline font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-white leading-none">
                DEEP TIER COMPARISON MATRIX
              </h2>
              <p className="font-sans text-xs sm:text-sm text-neutral-300 mt-2 max-w-xl font-normal">
                Compare deliverables, technical depth, timelines, and guarantees across
                our fixed-scope sprint tiers and continuous retained engineering.
              </p>
            </div>

            <div className="font-mono text-xs font-black uppercase flex items-center gap-2 bg-white/10 px-3 py-1.5 border border-white/20 shrink-0">
              <span className="w-2 h-2 rounded-full bg-emerald-400" />
              <span>100% TRANSPARENT PRICING // ZERO HOURLY SURPRISES</span>
            </div>
          </div>

          {/* Full-Width Swiss Grid Table Container */}
          <div className="w-full overflow-x-auto">
            <table className="w-full text-left font-mono text-xs border-collapse min-w-[850px]">
              <thead>
                <tr className="bg-ink-black text-white border-b-2 border-ink-black font-black uppercase text-[11px] sm:text-xs">
                  <th className="p-4 sm:p-5 border-r-2 border-white/20 w-[28%]">
                    ARCHITECTURAL DIMENSION
                  </th>
                  <th className="p-4 sm:p-5 border-r-2 border-white/20 w-[18%]">
                    STARTER MVP
                    <span className="block text-[10px] text-gray-400 font-bold mt-0.5">
                      $1,999 • 2 WEEKS
                    </span>
                  </th>
                  <th className="p-4 sm:p-5 border-r-2 border-white/20 w-[20%] bg-accent-yellow text-ink-black">
                    GROWTH STUDIO ★
                    <span className="block text-[10px] text-ink-black font-extrabold mt-0.5">
                      $4,499 • 3-4 WEEKS (MOST POPULAR)
                    </span>
                  </th>
                  <th className="p-4 sm:p-5 border-r-2 border-white/20 w-[18%]">
                    ENTERPRISE SCALE
                    <span className="block text-[10px] text-gray-400 font-bold mt-0.5">
                      $8,999+ • 6-8 WEEKS
                    </span>
                  </th>
                  <th className="p-4 sm:p-5 w-[16%]">
                    RETAINED SLA
                    <span className="block text-[10px] text-gray-400 font-bold mt-0.5">
                      $3,499/MO • ONGOING
                    </span>
                  </th>
                </tr>
              </thead>

              <tbody className="divide-y-2 divide-ink-black font-sans text-xs sm:text-sm text-ink-black font-medium">
                {/* Row 1 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Next.js 14 App Router &amp; RSC
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    ✓ Core Pages (1-3)
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-semibold">
                    ✓ Full Multi-Page (6-10)
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    ✓ Unlimited App Complexity
                  </td>
                  <td className="p-4 sm:p-5">
                    ✓ Continuous Feature Deployments
                  </td>
                </tr>

                {/* Row 2 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Figma Design System &amp; Tokens
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    Basic Component Kit
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-semibold">
                    ✓ Complete Token Architecture
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    ✓ Multi-Brand Enterprise System
                  </td>
                  <td className="p-4 sm:p-5">
                    ✓ Ongoing Component Evolution
                  </td>
                </tr>

                {/* Row 3 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Brand Identity &amp; Vectors
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    Vector Logo Refresh
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-semibold">
                    ✓ Master Logo Suite &amp; Guidelines
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    ✓ Full Corporate Identity Suite
                  </td>
                  <td className="p-4 sm:p-5">
                    Marketing &amp; Social Collateral
                  </td>
                </tr>

                {/* Row 4 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Backend Node.js &amp; Database
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    Contact Form API
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-semibold">
                    ✓ REST Endpoints + PostgreSQL DB
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    ✓ Microservices + Prisma ORM
                  </td>
                  <td className="p-4 sm:p-5">
                    ✓ API Maintenance &amp; Scaling
                  </td>
                </tr>

                {/* Row 5 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Edge Caching &amp; Redis
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    Standard Vercel CDN
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-semibold">
                    ✓ Distributed Edge Cache Rules
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    ✓ Upstash Redis Memory Clusters
                  </td>
                  <td className="p-4 sm:p-5">
                    ✓ Cache Invalidation Tuning
                  </td>
                </tr>

                {/* Row 6 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Technical SEO &amp; JSON-LD
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    Essential Meta &amp; Sitemap
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-semibold">
                    ✓ Full Rich Snippet Schema Suite
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    ✓ Enterprise Multi-Locale Graph
                  </td>
                  <td className="p-4 sm:p-5">
                    ✓ Monthly Ranking Audits
                  </td>
                </tr>

                {/* Row 7 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Lighthouse Speed SLA
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono font-bold">
                    95+ Guaranteed
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-mono font-black text-accent-red">
                    100/100 Guaranteed
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono font-black text-accent-red">
                    100/100 Guaranteed
                  </td>
                  <td className="p-4 sm:p-5 font-mono font-bold">
                    99+ Continuous SLA
                  </td>
                </tr>

                {/* Row 8 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Global TTFB &amp; LCP Target
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    LCP &lt; 0.8s
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-semibold">
                    LCP &lt; 0.3s (Sub-200ms TTFB)
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    LCP &lt; 0.2s (Sub-150ms TTFB)
                  </td>
                  <td className="p-4 sm:p-5">
                    Sub-200ms Monitored 24/7
                  </td>
                </tr>

                {/* Row 9 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Code Ownership &amp; IP
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-semibold text-emerald-700">
                    ✓ 100% Transfer
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-semibold text-emerald-700">
                    ✓ 100% Transfer
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-semibold text-emerald-700">
                    ✓ 100% Transfer
                  </td>
                  <td className="p-4 sm:p-5 font-semibold text-emerald-700">
                    ✓ 100% Transfer
                  </td>
                </tr>

                {/* Row 10 */}
                <tr className="hover:bg-neutral-50 transition-colors">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                    Post-Launch Warranty
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs">
                    14 Days Warranty
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/15 font-mono text-xs font-bold">
                    30 Days Dedicated Support
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black font-mono text-xs">
                    90 Days Extended SLA
                  </td>
                  <td className="p-4 sm:p-5 font-mono text-xs">
                    Continuous 99.99% Uptime SLA
                  </td>
                </tr>

                {/* Action CTA Row */}
                <tr className="bg-neutral-100 font-mono text-xs font-black">
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black uppercase text-gray-500">
                    CHOOSE YOUR VEHICLE:
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    <Link
                      href="/contact?plan=Starter%20MVP"
                      className="inline-block w-full py-2 px-3 text-center bg-white border border-ink-black hover:bg-ink-black hover:text-white transition-colors uppercase text-[11px] shadow-2xs"
                    >
                      SELECT MVP
                    </Link>
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black bg-accent-yellow/30">
                    <Link
                      href="/contact?plan=Growth%20Studio"
                      className="inline-block w-full py-2.5 px-3 text-center bg-accent-yellow border-2 border-ink-black text-ink-black hover:bg-ink-black hover:text-accent-yellow transition-colors uppercase text-[11px] shadow-brut-xs font-black"
                    >
                      SELECT GROWTH ★
                    </Link>
                  </td>
                  <td className="p-4 sm:p-5 border-r-2 border-ink-black">
                    <Link
                      href="/contact?plan=Enterprise%20Scale"
                      className="inline-block w-full py-2 px-3 text-center bg-white border border-ink-black hover:bg-ink-black hover:text-white transition-colors uppercase text-[11px] shadow-2xs"
                    >
                      SELECT ENTERPRISE
                    </Link>
                  </td>
                  <td className="p-4 sm:p-5">
                    <Link
                      href="/contact?plan=Dedicated%20Retainer"
                      className="inline-block w-full py-2 px-3 text-center bg-white border border-ink-black hover:bg-ink-black hover:text-white transition-colors uppercase text-[11px] shadow-2xs"
                    >
                      TALK RETAINER
                    </Link>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 5: CLEAN PLAN FAQ SECTION                         */}
        {/* ========================================================= */}
        <PlansFaqSection />
      </main>

      {/* ========================================================= */}
      {/* SECTION 6: BRUTALIST FOOTER                               */}
      {/* ========================================================= */}
      <BrutFooter />
    </div>
  );
}
