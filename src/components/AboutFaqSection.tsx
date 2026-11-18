"use client";

import React, { useState } from "react";
import Link from "next/link";
import { Plus, Minus, ArrowUpRight, HelpCircle } from "lucide-react";

interface FaqItem {
  q: string;
  a: string;
  tag: string;
}

const ABOUT_FAQS: FaqItem[] = [
  {
    q: "How do your development sprints work, and when do we see working code?",
    a: "We operate in disciplined 2-week sprint cycles. During Week 1, we finalize database contracts, API schemas, and interactive Figma systems. By the end of Week 2, we deliver a functional Next.js staging build hosted on a private preview URL. You test and verify real, working code every single week.",
    tag: "SPRINT PROCESS",
  },
  {
    q: "Do we get 100% full ownership of the source code and design files?",
    a: "Yes, 100%. Upon final sprint milestone completion, full intellectual property, complete GitHub repositories, production Figma source files, database migrations, and deployment credentials are permanently transferred to your team. Zero vendor lock-in, zero monthly licensing fees.",
    tag: "IP OWNERSHIP",
  },
  {
    q: "Why do you engineer custom Next.js applications instead of using WordPress or Webflow?",
    a: "Generic CMS templates rely on dozens of unoptimized plugins that introduce security vulnerabilities, sluggish 3+ second load times, and rigid layout limits. We build on Next.js 14 App Router to deliver sub-300ms page loads, enterprise security, guaranteed 100/100 Core Web Vitals, and infinite scalability.",
    tag: "ARCHITECTURE",
  },
  {
    q: "How do you guarantee a 100/100 Google Core Web Vitals score?",
    a: "We engineer speed directly into your codebase. By leveraging React Server Components, zero runtime CSS bloat via Tailwind, automated AVIF image compression, font subset preloading, and edge caching on Vercel and Cloudflare, your pages render instantly with zero layout shifts (CLS 0.00).",
    tag: "PERFORMANCE",
  },
  {
    q: "What happens after product launch? Do you provide ongoing maintenance and engineering?",
    a: "Every project includes a 30-day comprehensive post-launch warranty covering any bug fixes, browser updates, and real-time monitoring. Afterward, we offer flexible dedicated retainer sprints for continuous feature expansion, database scaling, and technical SEO monitoring.",
    tag: "SUPPORT & SLA",
  },
  {
    q: "How do we kick off a project, and what is your onboarding timeline?",
    a: "You can book a technical audit or reach out through our contact portal. We review your requirements within 24 hours, deliver a fixed-scope milestone proposal, and typically launch sprint kickoff within 3 to 5 business days.",
    tag: "ONBOARDING",
  },
];

export const AboutFaqSection: React.FC = () => {
  // First item open by default
  const [openIndex, setOpenIndex] = useState<number | null>(0);

  const toggleFaq = (idx: number) => {
    setOpenIndex((prev) => (prev === idx ? null : idx));
  };

  return (
    <section id="about-faq" className="w-full bg-white border-b-2 border-ink-black select-none">
      {/* Full-width Section Header */}
      <div className="py-10 sm:py-14 lg:py-16 px-6 sm:px-10 lg:px-16 border-b-2 border-ink-black bg-[#FAF9F5] flex flex-col md:flex-row md:items-end justify-between gap-6">
        <div>
          <div className="flex items-center gap-2 font-mono text-xs font-black uppercase tracking-widest text-accent-red mb-3">
            <HelpCircle className="w-4 h-4 text-accent-red" />
            <span>FREQUENTLY ASKED QUESTIONS // ABOUT CODECLOVERS</span>
          </div>
          <h2 className="font-display font-black text-4xl sm:text-5xl lg:text-6xl uppercase tracking-tighter text-ink-black leading-[0.9]">
            EVERYTHING YOU NEED <br />
            <span className="text-neutral-500">TO KNOW BEFORE HIRING US.</span>
          </h2>
        </div>

        <div className="flex items-center gap-3">
          <span className="font-mono text-xs font-black uppercase px-3 py-1.5 bg-accent-yellow border-2 border-ink-black shadow-brut-xs">
            6 CORE CLIENT QUESTIONS
          </span>
        </div>
      </div>

      {/* Clean Full-Width Row Accordion */}
      <div className="divide-y-2 divide-ink-black bg-white">
        {ABOUT_FAQS.map((faq, idx) => {
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
                      TAG: {faq.tag}
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
            HAVE A CUSTOM TECHNICAL REQUIREMENT?
          </div>
          <div className="font-sans text-sm text-ink-black/80 font-medium mt-1">
            We review enterprise RFPs and custom architectures within 24 hours.
          </div>
        </div>
        <Link
          href="/contact"
          className="px-6 py-3 bg-ink-black text-white font-mono text-xs font-black uppercase border-2 border-ink-black hover:bg-white hover:text-ink-black transition-colors shadow-brut-xs shrink-0 flex items-center gap-2 group"
        >
          <span>DISCUSS WITH LEAD ARCHITECT</span>
          <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
        </Link>
      </div>
    </section>
  );
};
