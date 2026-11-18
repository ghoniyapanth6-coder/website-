"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowLeft, ArrowRight, ArrowUpRight, Star, ShieldCheck, CheckCircle2 } from "lucide-react";

interface Testimonial {
  number: string;
  author: string;
  title: string;
  company: string;
  location: string;
  category: string;
  avatarInitials: string;
  avatarBg: string;
  metricBadge: string;
  metricDetail: string;
  quote: string;
  rating: number;
  contractId: string;
  techStack: string[];
}

const TESTIMONIALS_DATA: Testimonial[] = [
  {
    number: "01",
    author: "Sarah Jenkins",
    title: "VP of Engineering",
    company: "GridFlow Systems",
    location: "San Francisco, CA",
    category: "CLOUD ARCHITECTURE",
    avatarInitials: "SJ",
    avatarBg: "bg-accent-yellow text-ink-black",
    metricBadge: "+340% CONVERSION RATE",
    metricDetail: "0.19s LCP Load Time • 100/100 Core Web Vitals",
    quote:
      "CodeClovers rebuilt our developer documentation and self-serve onboarding in Next.js 14. Our global Largest Contentful Paint dropped from 1.84s to 0.19s, and developer signup conversions jumped by 340% within 45 days. They write clean, uncompromising, production-grade code.",
    rating: 5,
    contractId: "DEPL-4091",
    techStack: ["Next.js 14", "RSC", "Vercel Edge", "Tailwind CSS"],
  },
  {
    number: "02",
    author: "Marcus Vance",
    title: "Co-Founder & CTO",
    company: "NexusPay Global",
    location: "New York, NY",
    category: "B2B FINTECH & PAYMENTS",
    avatarInitials: "MV",
    avatarBg: "bg-accent-red text-white",
    metricBadge: "$2.4M ARR SCALED",
    metricDetail: "+410% Inbound Pipeline • Sub-150ms TTFB",
    quote:
      "Most agencies deliver flashy Figma files that break down the moment your engineers try to implement real-time financial tables. CodeClovers handed over strictly typed TypeScript with zero layout shifts and flawless WCAG AAA accessibility. We scaled to $2.4M ARR effortlessly.",
    rating: 5,
    contractId: "FIN-8820",
    techStack: ["TypeScript", "Fastify", "PostgreSQL", "Tailwind CSS"],
  },
  {
    number: "03",
    author: "Dr. Elena Rostova",
    title: "Head of Product",
    company: "Synapse Intelligence",
    location: "Zurich, Switzerland",
    category: "AI & DEEP LEARNING",
    avatarInitials: "ER",
    avatarBg: "bg-ink-black text-accent-yellow",
    metricBadge: "2.8M MONTHLY QUERIES",
    metricDetail: "60 FPS Interactive Canvas • 0 Frame Drops",
    quote:
      "We needed a neo-brutalist interface that communicated raw computational power while remaining effortlessly intuitive for enterprise buyers. CodeClovers engineered custom canvas visualizers and dynamic telemetry monitors that directly helped close two Fortune 500 contracts.",
    rating: 5,
    contractId: "AI-1049",
    techStack: ["React 19", "WebGL / Canvas", "Tailwind CSS", "Zustand"],
  },
  {
    number: "04",
    author: "Julian Thorne",
    title: "Founder & CEO",
    company: "Kroma Apparel",
    location: "London, UK",
    category: "HEADLESS COMMERCE",
    avatarInitials: "JT",
    avatarBg: "bg-accent-yellow text-ink-black",
    metricBadge: "+46.8% CHECKOUT RATE",
    metricDetail: "62% Bounce Rate Reduction • 2.1x AOV",
    quote:
      "Migrating from a bloated Shopify theme to a bespoke CodeClovers Next.js headless storefront was the single highest-ROI decision we made this year. Mobile bounce rate dropped by 62%, catalog search responds instantaneously, and checkout completions surged by nearly 50%.",
    rating: 5,
    contractId: "COMM-7103",
    techStack: ["Next.js App Router", "Shopify API", "Edge Cache", "Tailwind"],
  },
  {
    number: "05",
    author: "Aris Thorne",
    title: "Chief Architect",
    company: "Polarity Robotics",
    location: "Austin, TX",
    category: "HARDWARE & ROBOTICS",
    avatarInitials: "AT",
    avatarBg: "bg-ink-black text-white",
    metricBadge: "< 8MS TELEMETRY LATENCY",
    metricDetail: "100% Type-Safe • Full GitHub Transfer",
    quote:
      "CodeClovers is the only studio we have partnered with that truly respects engineering rigor. Their Swiss Grid design system brought clarity to our complex telemetry feeds, and their strict component isolation allowed our internal engineering team to extend the dashboard seamlessly.",
    rating: 5,
    contractId: "ROB-3312",
    techStack: ["WebSockets", "Rust Edge", "Tailwind CSS", "Next.js 14"],
  },
  {
    number: "06",
    author: "Danielle Chen",
    title: "CMO & Growth Lead",
    company: "Vantage Health Systems",
    location: "Boston, MA",
    category: "HEALTHCARE SAAS",
    avatarInitials: "DC",
    avatarBg: "bg-accent-red text-white",
    metricBadge: "+290% DEMO LEADS",
    metricDetail: "#1 Organic Search Ranking • 100/100 CWV",
    quote:
      "Their technical SEO and server rendering setup delivered immediate organic dominance. Within eight weeks of launch, our organic search impressions tripled and high-intent inbound enterprise demo requests increased by 290%. They don't make excuses; they deliver mathematical results.",
    rating: 5,
    contractId: "MED-9024",
    techStack: ["Next.js SSR", "Dynamic JSON-LD", "Cloudflare", "Lighthouse 100"],
  },
];

export const TestimonialsSection: React.FC = () => {
  // Start index for the 3 cards in the single row on desktop (0 to 3)
  const [startIndex, setStartIndex] = useState<number>(0);

  const totalCards = TESTIMONIALS_DATA.length;
  const cardsPerPage = 3;
  const maxStartIndex = totalCards - cardsPerPage;

  const handlePrev = () => {
    setStartIndex((prev) => (prev > 0 ? prev - 1 : maxStartIndex));
  };

  const handleNext = () => {
    setStartIndex((prev) => (prev < maxStartIndex ? prev + 1 : 0));
  };

  // 3 cards currently visible in the row
  const visibleCards = TESTIMONIALS_DATA.slice(startIndex, startIndex + cardsPerPage);

  return (
    <section id="testimonials" className="w-full bg-white border-b-2 border-ink-black select-none">
      {/* ========================================================= */}
      {/* 1. SECTION HEADER WITH NAVIGATION CONTROLS                */}
      {/* ========================================================= */}
      <div className="py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black bg-[#FAF9F5] flex flex-col md:flex-row md:items-end justify-between gap-8">
        <div className="max-w-3xl">
          <div className="font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-3">
            // 05 • CLIENT REVIEWS & VERIFIED IMPACT
          </div>

          <h2 className="font-headline font-bold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink-black leading-[0.92] mb-4">
            PROVEN BY CLIENTS<span className="text-accent-red">.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
            Real-world performance metrics, conversion gains, and architectural feedback from engineering leaders.
          </p>
        </div>

        {/* Carousel Navigation Controls in Header */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center gap-4 shrink-0">
          {/* Card counter */}
          <div className="font-mono text-xs font-black uppercase text-ink-black bg-white px-3.5 py-2 border-2 border-ink-black shadow-brut-xs">
            CARDS {String(startIndex + 1).padStart(2, "0")}—{String(startIndex + cardsPerPage).padStart(2, "0")} / {String(totalCards).padStart(2, "0")}
          </div>

          {/* Navigation Arrows */}
          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrev}
              title="Previous reviews"
              className="w-11 h-11 border-2 border-ink-black bg-white hover:bg-accent-yellow active:scale-95 flex items-center justify-center font-black transition-all shadow-brut-xs cursor-pointer"
            >
              <ArrowLeft className="w-5 h-5 stroke-[2.5]" />
            </button>
            <button
              type="button"
              onClick={handleNext}
              title="Next reviews"
              className="w-11 h-11 border-2 border-ink-black bg-accent-yellow hover:bg-ink-black hover:text-accent-yellow active:scale-95 flex items-center justify-center font-black transition-all shadow-brut-xs cursor-pointer"
            >
              <ArrowRight className="w-5 h-5 stroke-[2.5]" />
            </button>
          </div>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. SINGLE ROW OF TESTIMONIAL CARDS (3 Cards in One Row)  */}
      {/* ========================================================= */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 divide-y-2 md:divide-y-0 md:divide-x-2 divide-ink-black bg-white">
        {visibleCards.map((t) => (
          <div
            key={t.number}
            className="p-6 sm:p-8 lg:p-9 flex flex-col justify-between bg-white hover:bg-[#FAF9F5] transition-colors group"
          >
            <div>
              {/* Card Top Row: Number, Category Tag & Star Rating */}
              <div className="flex items-center justify-between pb-4 border-b-2 border-ink-black/20 mb-5">
                <div className="flex items-center gap-2.5">
                  <span className="font-condensed font-bold text-xl sm:text-2xl text-accent-red leading-none">
                    {t.number}
                  </span>
                  <span className="font-mono text-[10px] font-black uppercase tracking-wider px-2 py-0.5 bg-neutral-100 border border-ink-black text-ink-black">
                    {t.category}
                  </span>
                </div>

                {/* 5 Stars */}
                <div className="flex items-center gap-0.5 text-accent-red">
                  {[...Array(t.rating)].map((_, i) => (
                    <Star key={i} className="w-3.5 h-3.5 fill-accent-red stroke-accent-red" />
                  ))}
                  <span className="font-mono text-[11px] font-black text-ink-black ml-1">
                    5.0
                  </span>
                </div>
              </div>

              {/* Bold ROI Metric Banner */}
              <div className="p-3 bg-accent-yellow border-2 border-ink-black shadow-brut-xs mb-6">
                <div className="font-mono text-xs sm:text-sm font-black uppercase text-ink-black tracking-tight">
                  {t.metricBadge}
                </div>
                <div className="font-mono text-[10px] font-bold text-ink-black/80 uppercase mt-0.5">
                  {t.metricDetail}
                </div>
              </div>

              {/* Client Quote in Clean, Readable Typography */}
              <p className="font-sans text-sm sm:text-base text-neutral-800 leading-relaxed font-normal mb-8 italic">
                "{t.quote}"
              </p>
            </div>

            {/* Author Credentials & Tech Stack Footer */}
            <div className="pt-5 border-t-2 border-ink-black/20 mt-auto">
              {/* Author Row */}
              <div className="flex items-center gap-3.5 mb-4">
                {/* Initials Avatar Square */}
                <div
                  className={`w-11 h-11 border-2 border-ink-black flex items-center justify-center font-display font-black text-sm uppercase shrink-0 shadow-xs ${t.avatarBg}`}
                >
                  {t.avatarInitials}
                </div>

                <div className="min-w-0">
                  <div className="font-display font-black text-base uppercase tracking-tight text-ink-black leading-tight truncate">
                    {t.author}
                  </div>
                  <div className="font-sans text-xs font-semibold text-neutral-600 truncate mt-0.5">
                    {t.title} • {t.company}
                  </div>
                  <div className="font-mono text-[10px] text-emerald-700 font-bold uppercase tracking-wider flex items-center gap-1 mt-0.5">
                    <CheckCircle2 className="w-3 h-3 text-emerald-600 shrink-0" />
                    <span>CONTRACT #{t.contractId}</span>
                  </div>
                </div>
              </div>

              {/* Tech Stack Pills */}
              <div className="flex flex-wrap gap-1.5 pt-1">
                {t.techStack.map((tech) => (
                  <span
                    key={tech}
                    className="px-2 py-0.5 bg-white border border-ink-black font-mono text-[10px] font-bold text-ink-black uppercase shadow-2xs"
                  >
                    {tech}
                  </span>
                ))}
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* ========================================================= */}
      {/* 3. CARD PAGINATION INDICATORS & DIRECT JUMP ROW           */}
      {/* ========================================================= */}
      <div className="border-t-2 border-ink-black bg-white py-4 px-6 sm:px-10 lg:px-16 flex flex-wrap items-center justify-between gap-4">
        {/* Clickable Card Step Pills */}
        <div className="flex items-center gap-2">
          <span className="font-mono text-xs font-black uppercase text-gray-500 mr-2 hidden sm:inline">
            SELECT CLIENT:
          </span>
          {TESTIMONIALS_DATA.map((item, idx) => {
            const isCardActive = idx >= startIndex && idx < startIndex + cardsPerPage;

            return (
              <button
                key={item.number}
                type="button"
                onClick={() => {
                  const newStart = Math.min(idx, maxStartIndex);
                  setStartIndex(newStart);
                }}
                className={`px-3 py-1 font-mono text-xs font-black border-2 border-ink-black transition-all cursor-pointer ${
                  isCardActive
                    ? "bg-accent-yellow text-ink-black shadow-brut-xs translate-y-[-1px]"
                    : "bg-white text-gray-500 hover:text-ink-black hover:bg-neutral-100"
                }`}
              >
                {item.number}
              </button>
            );
          })}
        </div>

        {/* Overall Rating & Direct CTA Link */}
        <div className="flex items-center gap-4">
          <div className="hidden lg:flex items-center gap-2 font-mono text-xs font-bold text-neutral-600">
            <span className="w-2 h-2 rounded-full bg-emerald-500" />
            <span>4.98 / 5.0 RATING ACROSS 42+ AUDITED DEPLOYMENTS</span>
          </div>

          <Link
            href="/contact"
            className="inline-flex items-center gap-1.5 px-4 py-2 bg-ink-black text-white hover:bg-accent-yellow hover:text-ink-black border-2 border-ink-black font-mono text-xs font-black uppercase transition-colors shadow-brut-xs cursor-pointer"
          >
            <span>START A PROJECT</span>
            <ArrowUpRight className="w-3.5 h-3.5" />
          </Link>
        </div>
      </div>
    </section>
  );
};