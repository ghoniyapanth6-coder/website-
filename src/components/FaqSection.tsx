"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight, CheckCircle2 } from "lucide-react";

interface FaqItem {
  number: string;
  question: string;
  answer: string;
  highlight: string;
}

const FAQ_LIST: FaqItem[] = [
  {
    number: "01",
    question: "How fast can you deliver a custom Next.js website?",
    answer:
      "We operate in focused 2-to-4 week production sprints. From Day 5, you receive a private live staging URL on Vercel updated with every commit, allowing you to test real, functional code rather than waiting weeks for static mockups.",
    highlight: "2–4 week production sprints • Live Vercel staging on Day 5",
  },
  {
    number: "02",
    question: "Do you use templates, WordPress, or site builders like Webflow?",
    answer:
      "Never. Every line of code is hand-crafted with 100% custom, type-safe Next.js 14 and Tailwind CSS. We do not use WordPress or drag-and-drop builders, eliminating security vulnerabilities, plugin bloat, and vendor lock-in.",
    highlight: "100% bespoke TypeScript code • Zero page-builder bloat",
  },
  {
    number: "03",
    question: "How do you guarantee 100/100 Google Lighthouse and top SEO?",
    answer:
      "We achieve perfect performance through strict engineering discipline: React Server Components, zero bloat, sub-300ms global response times via edge caching, and automated Schema.org structured data built directly into your codebase.",
    highlight: "Sub-300ms global TTFB • Dynamic JSON-LD structured schemas",
  },
  {
    number: "04",
    question: "What does your pricing look like and how do we start?",
    answer:
      "We provide transparent, fixed-scope sprint pricing with zero hidden hourly overages. You can get started immediately by booking a free 30-minute technical architecture audit with our lead engineer.",
    highlight: "Clear fixed-scope sprint pricing • Free 30-minute technical audit",
  },
  {
    number: "05",
    question: "Do we own 100% of the code, intellectual property, and design files?",
    answer:
      "Yes, completely. Upon project completion and final payment, you receive 100% intellectual property ownership, Figma master design files, and a full administrative transfer of the clean GitHub repository.",
    highlight: "100% full IP transfer • Clean GitHub repository ownership",
  },
  {
    number: "06",
    question: "What happens after launch? Do you provide ongoing maintenance?",
    answer:
      "Yes. We offer dedicated monthly retainers covering 99.99% uptime monitoring, dependency and security updates, performance tuning, and continuous feature sprints as your business scales.",
    highlight: "Dedicated monthly SLA support • 99.99% uptime monitoring",
  },
];

export const FaqSection: React.FC = () => {
  // First question open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (index: number) => {
    setOpenIndex((prev) => (prev === index ? null : index));
  };

  return (
    <section id="faq" className="w-full bg-white border-b-2 border-ink-black select-none">
      {/* ========================================================= */}
      {/* 1. CLEAN SECTION HEADER                                   */}
      {/* ========================================================= */}
      <div className="py-12 sm:py-16 md:py-20 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black bg-[#FAF9F5]">
        <div className="max-w-4xl">
          <div className="font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-3">
            // FAQ & CLIENT DIRECTORY
          </div>

          <h2 className="font-headline font-bold text-5xl sm:text-6xl md:text-7xl uppercase tracking-tight text-ink-black leading-[0.92] mb-5">
            FREQUENTLY <br className="hidden sm:block" />
            ASKED QUESTIONS<span className="text-accent-red">.</span>
          </h2>

          <p className="font-sans text-base sm:text-lg text-neutral-700 leading-relaxed font-normal">
            Direct, transparent answers about our engineering process, pricing, timeline, and 100% code ownership.
          </p>
        </div>
      </div>

      {/* ========================================================= */}
      {/* 2. FULL-WIDTH HORIZONTAL ROWS (ACCORDION)                 */}
      {/* ========================================================= */}
      <div className="divide-y-2 divide-ink-black bg-white">
        {FAQ_LIST.map((faq, index) => {
          const isOpen = openIndex === index;

          return (
            <div
              key={faq.number}
              className={`transition-colors duration-150 ${
                isOpen ? "bg-[#FAF9F5]" : "bg-white hover:bg-neutral-50"
              }`}
            >
              {/* Row Header Button */}
              <button
                type="button"
                onClick={() => toggleFaq(index)}
                className="w-full py-6 sm:py-7 px-6 sm:px-10 lg:px-16 flex items-center justify-between text-left cursor-pointer group"
              >
                <div className="flex items-center gap-5 sm:gap-8 pr-4">
                  {/* Number */}
                  <span
                    className={`font-condensed font-bold text-2xl sm:text-3xl lg:text-4xl tracking-tight shrink-0 transition-colors ${
                      isOpen ? "text-accent-red" : "text-gray-400 group-hover:text-ink-black"
                    }`}
                  >
                    {faq.number}
                  </span>

                  {/* Question Title */}
                  <h3 className="font-display font-black text-lg sm:text-xl md:text-2xl uppercase tracking-tight text-ink-black group-hover:text-accent-red transition-colors leading-snug">
                    {faq.question}
                  </h3>
                </div>

                {/* Plus / Minus Brutalist Toggle Box */}
                <div
                  className={`w-9 h-9 sm:w-10 sm:h-10 border-2 border-ink-black flex items-center justify-center font-black text-base shadow-brut-xs transition-colors shrink-0 ${
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

              {/* Clean Expanded Answer Drawer */}
              {isOpen && (
                <div className="px-6 pb-8 pt-1 sm:px-10 sm:pb-9 lg:px-16 border-t border-dashed border-neutral-300">
                  <div className="pl-0 sm:pl-14 lg:pl-16 max-w-4xl">
                    {/* Readable Answer in Sans-Serif */}
                    <p className="font-sans text-base sm:text-lg text-neutral-800 leading-relaxed font-normal">
                      {faq.answer}
                    </p>

                    {/* Single Clean Key Highlight Pill */}
                    <div className="mt-4 inline-flex items-center gap-2 px-3 py-1.5 bg-white border-2 border-ink-black font-mono text-xs font-bold text-ink-black shadow-brut-xs">
                      <CheckCircle2 className="w-3.5 h-3.5 text-accent-red shrink-0" />
                      <span>{faq.highlight}</span>
                    </div>
                  </div>
                </div>
              )}
            </div>
          );
        })}
      </div>

      {/* ========================================================= */}
      {/* 3. CLEAN BOTTOM HELP BAR                                  */}
      {/* ========================================================= */}
      <div className="border-t-2 border-ink-black bg-white py-10 px-6 sm:px-10 lg:px-16 flex flex-wrap items-center justify-between gap-6">
        <div>
          <h4 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-ink-black mb-1">
            STILL HAVE A QUESTION?
          </h4>
          <p className="font-sans text-sm sm:text-base text-neutral-600 font-normal">
            Talk directly with our lead architect. No sales pitch, just honest technical guidance.
          </p>
        </div>

        <Link
          href="/contact"
          className="px-6 py-3.5 bg-accent-yellow text-ink-black border-2 border-ink-black font-mono text-xs sm:text-sm font-black uppercase hover:bg-ink-black hover:text-accent-yellow transition-all shadow-brut-sm inline-flex items-center gap-2 cursor-pointer"
        >
          <span>BOOK A FREE TECH AUDIT</span>
          <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
        </Link>
      </div>
    </section>
  );
};