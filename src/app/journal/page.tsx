import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { StatusMarquee } from "@/components/StatusMarquee";
import { BrutFooter } from "@/components/BrutFooter";
import { JournalFilterClient } from "@/components/JournalFilterClient";
import { JOURNAL_ARTICLES } from "@/data/journalArticles";
import { ArrowUpRight, Sparkles, Clock, CheckCircle2, ShieldCheck, Zap } from "lucide-react";
import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Engineering Journal & Technical Memos // CodeClovers",
  description:
    "Production-audited engineering memos, architecture teardowns, Next.js 14 performance patterns, and technical SEO blueprints from CodeClovers senior architects.",
  alternates: {
    canonical: "/journal",
  },
};

export default function JournalPage() {
  const featuredArticle = JOURNAL_ARTICLES.find((a) => a.featured) || JOURNAL_ARTICLES[0];

  return (
    <div className="min-h-screen bg-paper-beige flex flex-col font-sans select-none">
      <Navbar />
      <StatusMarquee />

      <main className="flex-1 w-full">
        {/* ========================================================= */}
        {/* SECTION 1: JOURNAL HERO HEADER (CENTERED 3-LINE SWISS)    */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white paper-ruled-bg py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 relative overflow-hidden select-none text-center">
          <div className="washi-tape -top-2 right-12 rotate-[-2deg]" />

          <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center">
            <span className="font-mono text-xs font-black uppercase text-accent-red tracking-widest bg-accent-yellow px-2.5 py-1 border border-ink-black shadow-brut-sm inline-block mb-6">
              [ 05 // ENGINEERING JOURNAL &amp; FIELD NOTES ]
            </span>

            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] uppercase tracking-tight sm:tracking-tighter text-ink-black leading-[0.92] mb-8 text-center w-full">
              <span className="block whitespace-normal sm:whitespace-nowrap">
                ARCHITECTURAL MEMOS.
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                PRODUCTION{" "}
                <span className="bg-accent-yellow px-2.5 sm:px-3.5 py-0.5 border-2 border-ink-black shadow-brut-sm inline-block rotate-[-1deg] mx-1">
                  TEARDOWNS
                </span>
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                &amp; BENCHMARKS.
              </span>
            </h1>

            <p className="font-mono text-base sm:text-lg lg:text-xl font-bold uppercase text-gray-800 max-w-3xl leading-relaxed text-center mx-auto">
              No marketing fluff or generic tutorials. Real-world engineering field notes on Next.js 14 App Router, Node.js scalability, WCAG AAA design systems, and technical SEO dominance.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: FEATURED SPOTLIGHT ARTICLE BANNER              */}
        {/* ========================================================= */}
        {featuredArticle && (
          <section className="w-full border-b-2 border-ink-black bg-white select-none">
            <div className="max-w-7xl mx-auto p-6 sm:p-10 lg:p-12">
              <div className="neo-card bg-neutral-950 text-white border-2 border-ink-black shadow-brut-lg overflow-hidden relative">
                <div className="grid grid-cols-1 lg:grid-cols-12">
                  {/* Left Column (7 cols): Article Info & Narrative */}
                  <div className="lg:col-span-7 p-6 sm:p-10 lg:p-12 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-neutral-800">
                    <div>
                      {/* Tag badges row */}
                      <div className="flex flex-wrap items-center gap-3 mb-6">
                        <span className="px-3 py-1 bg-accent-yellow text-ink-black font-mono text-xs font-black uppercase border border-ink-black shadow-brut-xs flex items-center gap-1.5">
                          <Sparkles className="w-3.5 h-3.5" />
                          FEATURED LEAD MEMO
                        </span>
                        <span className="px-2.5 py-1 bg-white/10 text-neutral-300 font-mono text-xs font-bold uppercase border border-white/20">
                          {featuredArticle.category}
                        </span>
                        <span className="font-mono text-xs font-bold text-neutral-400">
                          {featuredArticle.date} • {featuredArticle.readTime}
                        </span>
                      </div>

                      {/* Main Title */}
                      <h2 className="font-display font-black text-2xl sm:text-4xl lg:text-5xl uppercase tracking-tight text-white leading-tight mb-4">
                        <Link
                          href={`/journal/${featuredArticle.slug}`}
                          className="hover:text-accent-yellow transition-colors"
                        >
                          {featuredArticle.title}
                        </Link>
                      </h2>

                      {/* Subtitle / Excerpt */}
                      <p className="font-sans text-sm sm:text-base text-neutral-300 leading-relaxed font-normal mb-8">
                        {featuredArticle.subtitle}
                      </p>
                    </div>

                    {/* Author & CTA Button */}
                    <div className="pt-6 border-t border-neutral-800 flex flex-col sm:flex-row sm:items-center justify-between gap-4">
                      <div className="font-mono text-xs text-neutral-400">
                        <span className="text-white font-bold block">{featuredArticle.author.name}</span>
                        <span>{featuredArticle.author.role}</span>
                      </div>

                      <Link
                        href={`/journal/${featuredArticle.slug}`}
                        className="px-6 py-3.5 bg-accent-yellow text-ink-black font-mono text-xs sm:text-sm font-black uppercase border-2 border-white hover:bg-white hover:text-ink-black transition-all shadow-brut-xs inline-flex items-center justify-center gap-2 group cursor-pointer"
                      >
                        <span>READ FULL ARCHITECTURAL MEMO</span>
                        <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                      </Link>
                    </div>
                  </div>

                  {/* Right Column (5 cols): 4 Verified Production Metrics */}
                  <div className="lg:col-span-5 p-6 sm:p-10 lg:p-12 bg-neutral-900 flex flex-col justify-between">
                    <div>
                      <span className="font-mono text-xs font-black uppercase text-accent-yellow tracking-widest block mb-4">
                        // VERIFIED PRODUCTION OUTCOMES
                      </span>

                      <div className="grid grid-cols-2 gap-3 mb-6">
                        {featuredArticle.metrics.map((m, idx) => (
                          <div
                            key={idx}
                            className="p-4 bg-neutral-950 border border-neutral-700 shadow-2xs"
                          >
                            <span className="font-display font-black text-2xl sm:text-3xl text-accent-yellow block leading-none mb-1">
                              {m.value}
                            </span>
                            <span className="font-mono text-[10px] font-bold text-neutral-400 uppercase leading-tight block">
                              {m.label}
                            </span>
                          </div>
                        ))}
                      </div>

                      <div className="p-4 bg-neutral-950 border border-neutral-700 font-mono text-xs text-neutral-300">
                        <div className="flex items-center gap-2 text-accent-teal font-black mb-1">
                          <CheckCircle2 className="w-4 h-4 stroke-[2.5]" />
                          <span>ZERO-COMPROMISE SPRINT AUDIT</span>
                        </div>
                        <p className="font-sans text-[11px] text-neutral-400 leading-normal">
                          Tested across 18 enterprise client migrations. Data verified with Google Search Console &amp; PageSpeed Insights.
                        </p>
                      </div>
                    </div>

                    <div className="mt-6 pt-4 border-t border-neutral-800 font-mono text-[10px] font-bold text-neutral-500 uppercase flex items-center justify-between">
                      <span>DOCUMENT #{featuredArticle.id}</span>
                      <span>CODECLOVERS ARCHIVE</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ========================================================= */}
        {/* SECTION 3: INTERACTIVE FILTER & ARTICLES GRID             */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white select-none">
          <JournalFilterClient articles={JOURNAL_ARTICLES} />
        </section>

        {/* ========================================================= */}
        {/* SECTION 4: DIRECT ARCHITECT CONSULTATION CTA              */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-accent-yellow py-12 sm:py-16 px-6 sm:px-10 lg:px-16 select-none">
          <div className="max-w-5xl mx-auto flex flex-col md:flex-row md:items-center justify-between gap-8">
            <div>
              <span className="font-mono text-xs font-black uppercase text-accent-red tracking-widest bg-white px-2.5 py-0.5 border border-ink-black shadow-2xs inline-block mb-3">
                // TECHNICAL ARCHITECTURE CONSULTATION
              </span>
              <h2 className="font-display font-black text-3xl sm:text-4xl md:text-5xl uppercase tracking-tight text-ink-black leading-tight">
                HAVE A QUESTION ABOUT YOUR CODEBASE?
              </h2>
              <p className="font-sans text-sm sm:text-base text-neutral-900 font-medium max-w-xl mt-2">
                Skip the sales deck. Book a complimentary 30-minute technical roadmap call directly with our Lead Systems Architect.
              </p>
            </div>

            <div className="shrink-0 flex flex-col sm:flex-row gap-3">
              <Link
                href="/contact"
                className="px-8 py-4 bg-ink-black text-white font-mono text-xs sm:text-sm font-black uppercase border-2 border-ink-black hover:bg-white hover:text-ink-black transition-colors shadow-brut text-center flex items-center justify-center gap-2 group cursor-pointer"
              >
                <span>BOOK 30-MIN TECHNICAL CALL</span>
                <ArrowUpRight className="w-4 h-4 text-accent-yellow group-hover:text-ink-black group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
              </Link>
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* SECTION 5: BRUTALIST CONVERSION FOOTER                    */}
      {/* ========================================================= */}
      <BrutFooter />
    </div>
  );
}
