"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
  tag: string;
}

const PLANS_FAQS: FaqItem[] = [
  {
    q: "Are there truly zero hourly surprises, hidden fees, or retainer traps?",
    a: "Yes, 100%. Every single project we undertake operates under an ironclad, fixed-scope, flat-fee agreement. You receive a complete scope of work, technical specifications, and a locked delivery date before any contract is signed. No hourly billing, no surprise invoices, and no hostage-ware retainer lock-ins.",
    tag: "FLAT-FEE GUARANTEE",
  },
  {
    q: "How do sprint payments and billing milestones work?",
    a: "For Starter MVP and Growth Studio tiers, billing is structured as 50% upfront at sprint kickoff and 50% upon final production deployment and QA verification. For Enterprise Scale engagements, we offer milestone-based disbursement aligned with major architectural deliverables (e.g., Core Schema, API Staging, Final Cutover).",
    tag: "PAYMENT STRUCTURE",
  },
  {
    q: "What happens if we need scope expansion or extra features mid-sprint?",
    a: "We protect both your budget and your launch deadline. If new features or pivots emerge during development, we immediately scope them as discrete, modular add-on sprints with transparent flat pricing. You can choose to add them instantly or queue them for Phase 2 without delaying your core production launch.",
    tag: "SCOPE MANAGEMENT",
  },
  {
    q: "Do we own 100% of the code, intellectual property, and design systems?",
    a: "Yes, absolute 100% transfer. Upon final payment, we execute a complete intellectual property transfer. You receive full administrative rights to your GitHub repository, live Vercel/AWS environments, Figma design system source files, database schemas, and credentials. You are never locked into our studio.",
    tag: "IP & ASSET OWNERSHIP",
  },
  {
    q: "What is covered under the 30-Day Post-Launch Warranty?",
    a: "Our post-launch warranty covers 100% of bug fixes, browser regressions, third-party API webhook verification, and performance monitoring. If anything breaks or fails to meet our agreed-upon 100/100 Core Web Vitals benchmark, our senior engineers resolve it immediately at zero cost.",
    tag: "POST-LAUNCH WARRANTY",
  },
  {
    q: "How does the Retained SLA ($3,499/mo) work and can it be cancelled?",
    a: "Our Retained SLA provides a dedicated engineering allocation every month for continuous feature rollouts, API scaling, security patches, technical SEO audits, and 24/7 uptime monitoring with a 4-hour SLA response time. It operates on a flexible month-to-month basis with zero long-term lock-in—cancel anytime with 14 days notice.",
    tag: "CONTINUOUS SLA",
  },
];

export const PlansFaqSection: React.FC = () => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="plans-faq" className="w-full bg-white border-b-2 border-ink-black select-none">
      {/* Full-width Section Header */}
      <div className="py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black bg-[#FAF9F5] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-3">
            <HelpCircle className="w-4 h-4 text-accent-red" />
            <span>// PRICING &amp; SPRINT FAQ</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-ink-black leading-[0.9]">
            FREQUENTLY ASKED <br />
            <span className="text-neutral-500">QUESTIONS &amp; PRICING CLAUSES.</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black uppercase px-3 py-1.5 bg-accent-yellow border-2 border-ink-black shadow-brut-xs">
            6 TRANSPARENT POLICIES
          </span>
        </div>
      </div>

      {/* Clean Full-Width Row Accordion */}
      <div className="divide-y-2 divide-ink-black bg-white">
        {PLANS_FAQS.map((faq, idx) => {
          const isOpen = openIndex === idx;

          return (
            <div
              key={faq.q}
              className={`transition-colors duration-150 ${
                isOpen ? "bg-[#FAF9F5]" : "bg-white hover:bg-neutral-50"
              }`}
            >
              {/* Accordion Row Header Button */}
              <button
                type="button"
                onClick={() => toggleFaq(idx)}
                className="w-full py-6 sm:py-7 px-6 sm:px-10 lg:px-16 flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-4 sm:gap-6 pr-4">
                  <span
                    className={`font-headline font-bold text-2xl sm:text-3xl tracking-tight leading-none ${
                      isOpen ? "text-accent-red" : "text-neutral-400 group-hover:text-ink-black transition-colors"
                    }`}
                  >
                    0{idx + 1}
                  </span>

                  <div>
                    <h3 className="font-display font-bold text-lg sm:text-xl lg:text-2xl uppercase tracking-tight text-ink-black group-hover:text-accent-red transition-colors leading-snug">
                      {faq.q}
                    </h3>
                    <span className="font-mono text-[10px] font-black uppercase tracking-wider text-neutral-500 block mt-1">
                      POLICY: {faq.tag}
                    </span>
                  </div>
                </div>

                {/* Brutalist Plus / Minus Box */}
                <div
                  className={`w-10 h-10 border-2 border-ink-black flex items-center justify-center font-black text-base shadow-brut-xs transition-colors shrink-0 ${
                    isOpen
                      ? "bg-accent-yellow text-ink-black"
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

              {/* Expanded Answer Drawer */}
              {isOpen && (
                <div className="px-6 sm:px-10 lg:px-16 pb-8 pt-2 border-t border-dashed border-neutral-300">
                  <p className="font-sans text-base sm:text-lg text-neutral-800 leading-relaxed font-normal max-w-4xl">
                    {faq.a}
                  </p>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* Full-Width Bottom Callout Banner */}
      <div className="py-8 sm:py-10 px-6 sm:px-10 lg:px-16 bg-accent-yellow border-t-2 border-ink-black flex flex-col sm:flex-row items-center justify-between gap-6">
        <div>
          <div className="font-display font-black text-xl sm:text-2xl uppercase text-ink-black">
            NEED A CUSTOM SPRINT OR DEDICATED DEV SQUAD?
          </div>
          <div className="font-sans text-sm text-ink-black/80 font-medium mt-1">
            We provide custom enterprise statements of work within 24 hours.
          </div>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-ink-black text-white font-mono text-xs font-black uppercase border-2 border-ink-black hover:bg-white hover:text-ink-black transition-colors shadow-brut-xs shrink-0 flex items-center gap-2 group"
        >
          <span>BOOK 30-MIN ARCHITECTURAL CALL</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
};
