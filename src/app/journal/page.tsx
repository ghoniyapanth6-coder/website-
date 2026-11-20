import React from "react";
import Link from "next/link";
import { Navbar } from "@/components/Navbar";
import { StatusMarquee } from "@/components/StatusMarquee";
import { BrutFooter } from "@/components/BrutFooter";
import { JournalFilterClient } from "@/components/JournalFilterClient";
import { JOURNAL_ARTICLES } from "@/data/journalArticles";
import { ArrowUpRight } from "lucide-react";
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
  const jsonLdBreadcrumb = {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: [
      {
        "@type": "ListItem",
        position: 1,
        name: "Home",
        item: "https://codeclovers.dev/",
      },
      {
        "@type": "ListItem",
        position: 2,
        name: "Journal",
        item: "https://codeclovers.dev/journal",
      },
    ],
  };

  const jsonLdBlog = {
    "@context": "https://schema.org",
    "@type": "Blog",
    name: "CodeClovers Engineering Journal & Technical Memos",
    url: "https://codeclovers.dev/journal",
    description: "Production-audited engineering memos, architecture teardowns, Next.js 14 performance patterns, and technical SEO blueprints.",
    publisher: {
      "@type": "Organization",
      name: "CodeClovers",
      url: "https://codeclovers.dev",
      logo: "https://codeclovers.dev/logo.png",
    },
    blogPost: JOURNAL_ARTICLES.map((article) => ({
      "@type": "BlogPosting",
      headline: article.title,
      url: `https://codeclovers.dev/journal/${article.slug}`,
      datePublished: article.date,
      author: {
        "@type": "Person",
        name: article.author.name,
      },
    })),
  };

  return (
    <div className="min-h-screen bg-paper-beige flex flex-col font-sans select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBlog) }}
      />
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
        {/* SECTION 2: INTERACTIVE FILTER & ARTICLES GRID             */}
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
