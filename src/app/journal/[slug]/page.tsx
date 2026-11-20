import React from "react";
import Link from "next/link";
import { notFound } from "next/navigation";
import { Navbar } from "@/components/Navbar";
import { StatusMarquee } from "@/components/StatusMarquee";
import { BrutFooter } from "@/components/BrutFooter";
import { JOURNAL_ARTICLES, type JournalArticle } from "@/data/journalArticles";
import {
  ArrowLeft,
  ArrowUpRight,
  Clock,
  Calendar,
  Share2,
  CheckCircle2,
  AlertTriangle,
  Lightbulb,
  Check,
  ShieldCheck,
  Code2,
} from "lucide-react";
import type { Metadata } from "next";

interface PageProps {
  params: {
    slug: string;
  };
}

export function generateStaticParams() {
  return JOURNAL_ARTICLES.map((article) => ({
    slug: article.slug,
  }));
}

export function generateMetadata({ params }: PageProps): Metadata {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === params.slug);
  if (!article) {
    return {
      title: "Memo Not Found // CodeClovers",
    };
  }

  const seoTitle = article.metaTitle || `${article.title} // CodeClovers Journal`;
  const seoDesc = article.metaDescription || article.subtitle || article.excerpt;
  const canonical = article.canonicalUrl || `/journal/${article.slug}`;

  return {
    title: seoTitle,
    description: seoDesc,
    keywords: article.focusKeywords?.length ? article.focusKeywords : article.tags,
    alternates: {
      canonical: canonical,
    },
    openGraph: {
      title: seoTitle,
      description: seoDesc,
      type: "article",
      url: `https://codeclovers.dev/journal/${article.slug}`,
      publishedTime: article.date,
      authors: [article.author.name],
      images: article.ogImage ? [{ url: article.ogImage }] : undefined,
    },
    twitter: {
      card: "summary_large_image",
      title: seoTitle,
      description: seoDesc,
      creator: article.author.handle,
    },
  };
}

export default function JournalDetailPage({ params }: PageProps) {
  const article = JOURNAL_ARTICLES.find((a) => a.slug === params.slug);

  if (!article) {
    notFound();
  }

  const relatedArticles = JOURNAL_ARTICLES.filter((a) => a.slug !== article.slug).slice(0, 3);

  const jsonLdArticle = {
    "@context": "https://schema.org",
    "@type": "TechArticle",
    headline: article.title,
    description: article.subtitle || article.excerpt,
    datePublished: article.date,
    dateModified: article.date,
    author: {
      "@type": "Person",
      name: article.author.name,
      jobTitle: article.author.role,
      url: `https://twitter.com/${article.author.handle.replace("@", "")}`,
    },
    publisher: {
      "@type": "Organization",
      name: "CodeClovers",
      url: "https://codeclovers.dev",
      logo: "https://codeclovers.dev/logo.png",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://codeclovers.dev/journal/${article.slug}`,
    },
    keywords: article.tags.join(", "),
    proficiencyLevel: "Expert",
    articleSection: article.category,
    inLanguage: "en-US",
    isAccessibleForFree: true,
    speakable: {
      "@type": "SpeakableSpecification",
      cssSelector: ["#article-headline", "#executive-summary", ".article-takeaways"],
    },
    about: {
      "@type": "Thing",
      name: article.category,
    },
  };

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
      {
        "@type": "ListItem",
        position: 3,
        name: article.title,
        item: `https://codeclovers.dev/journal/${article.slug}`,
      },
    ],
  };

  return (
    <div className="min-h-screen bg-paper-beige flex flex-col font-sans select-none">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdArticle) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdBreadcrumb) }}
      />
      <Navbar />
      <StatusMarquee />

      <main className="flex-1 w-full bg-white">
        {/* ========================================================= */}
        {/* BREADCRUMB & BACK NAVIGATION BAR                          */}
        {/* ========================================================= */}
        <div className="w-full border-b-2 border-ink-black bg-[#FAF9F5] py-3.5 px-6 sm:px-10 lg:px-16">
          <div className="max-w-7xl mx-auto flex items-center justify-between font-mono text-xs font-black">
            <Link
              href="/journal"
              className="inline-flex items-center gap-2 text-ink-black hover:text-accent-red transition-colors uppercase group"
            >
              <ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
              <span>← BACK TO ALL JOURNAL MEMOS</span>
            </Link>

            <div className="hidden sm:flex items-center gap-2 text-gray-500 uppercase text-[11px]">
              <span>CODECLOVERS ARCHIVE</span>
              <span>//</span>
              <span className="text-accent-red font-bold">{article.id}</span>
            </div>
          </div>
        </div>

        {/* ========================================================= */}
        {/* ARTICLE HERO HEADER                                       */}
        {/* ========================================================= */}
        <header className="w-full border-b-2 border-ink-black bg-white paper-ruled-bg py-10 sm:py-16 lg:py-20 px-6 sm:px-10 lg:px-16 relative">
          <div className="washi-tape -top-2 right-12 rotate-[2deg]" />

          <div className="max-w-5xl mx-auto">
            {/* Meta Tags Row */}
            <div className="flex flex-wrap items-center gap-3 mb-6">
              <span
                className={`px-3 py-1 font-mono text-xs font-black uppercase border-2 border-ink-black shadow-brut-xs ${article.categoryColor}`}
              >
                {article.category}
              </span>
              <span className="font-mono text-xs font-bold text-gray-600 uppercase flex items-center gap-1.5 bg-white px-2.5 py-1 border border-ink-black shadow-2xs">
                <Calendar className="w-3.5 h-3.5" />
                {article.date}
              </span>
              <span className="font-mono text-xs font-bold text-gray-600 uppercase flex items-center gap-1.5 bg-white px-2.5 py-1 border border-ink-black shadow-2xs">
                <Clock className="w-3.5 h-3.5" />
                {article.readTime}
              </span>
            </div>

            {/* Headline */}
            <h1 id="article-headline" className="font-display font-black text-3xl sm:text-5xl md:text-6xl lg:text-7xl uppercase tracking-tighter text-ink-black leading-[0.94] mb-6">
              {article.title}
            </h1>

            {/* Subtitle */}
            <p className="font-sans text-base sm:text-xl lg:text-2xl text-neutral-800 font-semibold leading-relaxed mb-8">
              {article.subtitle}
            </p>

            {/* Author Byline Card */}
            <div className="p-4 sm:p-5 bg-white border-2 border-ink-black shadow-brut-xs flex flex-col sm:flex-row sm:items-center justify-between gap-4">
              <div className="flex items-center gap-3.5">
                <div className="w-11 h-11 rounded-xs bg-ink-black text-accent-yellow flex items-center justify-center font-display font-black text-lg border border-ink-black shadow-2xs">
                  MV
                </div>
                <div>
                  <div className="font-mono text-xs font-black uppercase text-ink-black">
                    {article.author.name}
                  </div>
                  <div className="font-sans text-xs text-neutral-600 font-medium">
                    {article.author.role} •{" "}
                    <span className="font-mono text-accent-red font-bold">
                      {article.author.handle}
                    </span>
                  </div>
                </div>
              </div>

              <div className="flex items-center gap-2 font-mono text-xs font-black">
                <span className="px-3 py-1 bg-accent-teal/20 text-emerald-800 border border-emerald-700 text-[11px]">
                  VERIFIED PRODUCTION AUDIT
                </span>
              </div>
            </div>
          </div>
        </header>

        {/* ========================================================= */}
        {/* EXECUTIVE SUMMARY & KEY TAKEAWAYS CALLOUT BOX             */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-[#FAF9F5] py-8 sm:py-12 px-6 sm:px-10 lg:px-16">
          <div className="max-w-5xl mx-auto space-y-6">
            {/* Executive Summary */}
            <div id="executive-summary" className="p-6 sm:p-8 bg-white border-2 border-ink-black shadow-brut relative">
              <div className="w-4 h-4 bg-accent-yellow border border-ink-black absolute -top-2 -left-2" />
              <span className="font-mono text-xs font-black uppercase text-accent-red tracking-wider block mb-2">
                // EXECUTIVE SUMMARY // TL;DR FOR FOUNDERS &amp; CTOS
              </span>
              <p className="font-sans text-sm sm:text-base text-neutral-900 leading-relaxed font-semibold">
                {article.executiveSummary}
              </p>
            </div>

            {/* Key Takeaways */}
            <div className="p-6 sm:p-8 bg-accent-yellow/15 border-2 border-ink-black shadow-brut-xs article-takeaways">
              <span className="font-mono text-xs font-black uppercase text-ink-black tracking-wider block mb-3">
                3 CRITICAL ARCHITECTURAL TAKEAWAYS:
              </span>
              <div className="space-y-2.5">
                {article.keyTakeaways.map((takeaway, idx) => (
                  <div key={idx} className="flex items-start gap-3">
                    <div className="w-5 h-5 rounded-xs bg-ink-black text-accent-yellow flex items-center justify-center shrink-0 mt-0.5">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <span className="font-sans text-xs sm:text-sm text-ink-black font-semibold leading-snug">
                      {takeaway}
                    </span>
                  </div>
                ))}
              </div>
            </div>

            {/* 4 Metric Badges Grid */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
              {article.metrics.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 bg-white border-2 border-ink-black shadow-2xs text-center"
                >
                  <div className="font-display font-black text-2xl sm:text-3xl text-ink-black">
                    {m.value}
                  </div>
                  <div className="font-mono text-[10px] font-bold text-gray-500 uppercase mt-0.5">
                    {m.label}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* ========================================================= */}
        {/* MAIN ARTICLE BODY (SWISS 2-COLUMN GRID)                   */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white py-12 sm:py-16 px-6 sm:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-12 gap-10 lg:gap-14">
            {/* Left / Main Content Column (8 cols) */}
            <div className="lg:col-span-8 space-y-12">
              {article.sections.map((section) => (
                <section
                  key={section.id}
                  id={section.id}
                  className="scroll-mt-28 space-y-5"
                >
                  <h2 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black border-b-2 border-ink-black pb-3">
                    {section.heading}
                  </h2>

                  <div className="space-y-4 font-sans text-sm sm:text-base text-neutral-800 leading-relaxed font-normal">
                    {section.content.map((p, idx) => (
                      <p key={idx}>{p}</p>
                    ))}
                  </div>

                  {/* Callout Box */}
                  {section.callout && (
                    <div
                      className={`p-5 sm:p-6 border-2 border-ink-black shadow-brut-xs my-6 ${
                        section.callout.type === "warning"
                          ? "bg-accent-red/10 border-accent-red"
                          : section.callout.type === "pro-tip"
                          ? "bg-accent-teal/15 border-accent-teal"
                          : "bg-accent-yellow/20 border-accent-yellow"
                      }`}
                    >
                      <div className="flex items-center gap-2 mb-2 font-mono text-xs font-black uppercase text-ink-black">
                        {section.callout.type === "warning" ? (
                          <AlertTriangle className="w-4 h-4 text-accent-red" />
                        ) : section.callout.type === "pro-tip" ? (
                          <Lightbulb className="w-4 h-4 text-emerald-700" />
                        ) : (
                          <ShieldCheck className="w-4 h-4 text-ink-black" />
                        )}
                        <span>{section.callout.title}</span>
                      </div>
                      <p className="font-sans text-xs sm:text-sm text-neutral-800 font-medium leading-relaxed">
                        {section.callout.body}
                      </p>
                    </div>
                  )}

                  {/* Comparison Table */}
                  {section.comparisonTable && (
                    <div className="my-6 overflow-x-auto border-2 border-ink-black shadow-brut-xs">
                      <table className="w-full text-left font-mono text-xs border-collapse min-w-[550px]">
                        <thead>
                          <tr className="bg-ink-black text-white border-b-2 border-ink-black font-black uppercase text-[11px]">
                            <th className="p-3 sm:p-4 border-r-2 border-white/20 w-[35%]">
                              DIMENSION
                            </th>
                            <th className="p-3 sm:p-4 border-r-2 border-white/20 w-[30%]">
                              LEGACY CMS
                            </th>
                            <th className="p-3 sm:p-4 bg-accent-yellow text-ink-black w-[35%]">
                              CODECLOVERS NEXT.JS 14
                            </th>
                          </tr>
                        </thead>
                        <tbody className="divide-y-2 divide-ink-black font-sans text-xs sm:text-sm">
                          {section.comparisonTable.map((row, idx) => (
                            <tr key={idx} className="hover:bg-neutral-50">
                              <td className="p-3 sm:p-4 border-r-2 border-ink-black font-mono text-xs font-bold text-ink-black bg-neutral-50/50">
                                {row.dimension}
                              </td>
                              <td className="p-3 sm:p-4 border-r-2 border-ink-black text-neutral-600 font-medium">
                                {row.legacy}
                              </td>
                              <td className="p-3 sm:p-4 bg-accent-yellow/15 font-bold text-ink-black">
                                {row.codeclovers}
                                <span className="block font-mono text-[10px] text-accent-red font-black mt-0.5">
                                  ✓ {row.impact}
                                </span>
                              </td>
                            </tr>
                          ))}
                        </tbody>
                      </table>
                    </div>
                  )}

                  {/* Code Block */}
                  {section.codeBlock && (
                    <div className="my-6 border-2 border-ink-black shadow-brut bg-neutral-950 text-neutral-100 overflow-hidden">
                      <div className="px-4 py-2.5 bg-neutral-900 border-b-2 border-ink-black flex items-center justify-between font-mono text-xs">
                        <div className="flex items-center gap-2">
                          <Code2 className="w-4 h-4 text-accent-yellow" />
                          <span className="text-white font-bold">
                            {section.codeBlock.filename}
                          </span>
                        </div>
                        <span className="px-2 py-0.5 bg-neutral-800 text-neutral-300 text-[10px] uppercase font-bold">
                          {section.codeBlock.language}
                        </span>
                      </div>
                      <pre className="p-4 sm:p-5 text-xs sm:text-sm font-mono overflow-x-auto leading-relaxed text-neutral-200">
                        <code>{section.codeBlock.code}</code>
                      </pre>
                    </div>
                  )}

                  {/* Checklist */}
                  {section.checklist && (
                    <div className="p-5 sm:p-6 bg-white border-2 border-ink-black shadow-brut-xs space-y-3 my-6">
                      <span className="font-mono text-xs font-black uppercase text-ink-black tracking-wider block mb-2">
                        ACTIONABLE VERIFICATION STEPS:
                      </span>
                      {section.checklist.map((item, idx) => (
                        <div key={idx} className="flex items-start gap-3">
                          <div className="w-5 h-5 rounded-xs bg-emerald-500 text-white flex items-center justify-center shrink-0 mt-0.5 shadow-2xs">
                            <Check className="w-3.5 h-3.5 stroke-[3]" />
                          </div>
                          <span className="font-sans text-xs sm:text-sm font-medium text-neutral-800 leading-snug">
                            {item}
                          </span>
                        </div>
                      ))}
                    </div>
                  )}
                </section>
              ))}

              {/* Tags Row */}
              <div className="pt-8 border-t-2 border-ink-black">
                <span className="font-mono text-xs font-bold uppercase text-gray-500 block mb-3">
                  CATEGORIZATION TAGS:
                </span>
                <div className="flex flex-wrap gap-2">
                  {article.tags.map((tag) => (
                    <span
                      key={tag}
                      className="px-3 py-1 bg-paper-beige border-2 border-ink-black font-mono text-xs font-bold text-ink-black shadow-2xs"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>

            {/* Right Sticky Sidebar (4 cols) */}
            <aside className="lg:col-span-4 space-y-6">
              {/* Sticky Container */}
              <div className="lg:sticky lg:top-24 space-y-6">
                {/* Table of Contents Box */}
                <div className="p-5 sm:p-6 bg-white border-2 border-ink-black shadow-brut">
                  <span className="font-mono text-xs font-black uppercase text-ink-black tracking-wider block border-b-2 border-ink-black pb-3 mb-4">
                    TABLE OF CONTENTS
                  </span>
                  <nav className="space-y-2 font-mono text-xs font-bold">
                    {article.tableOfContents.map((toc) => (
                      <a
                        key={toc.id}
                        href={`#${toc.id}`}
                        className="block py-1 text-neutral-700 hover:text-accent-red hover:translate-x-1 transition-all"
                      >
                        {toc.label}
                      </a>
                    ))}
                  </nav>
                </div>

                {/* Author Card Box */}
                <div className="p-5 sm:p-6 bg-[#FAF9F5] border-2 border-ink-black shadow-brut-xs">
                  <span className="font-mono text-[10px] font-black uppercase text-gray-500 tracking-wider block mb-3">
                    MEMO AUTHOR
                  </span>
                  <div className="font-display font-black text-xl text-ink-black uppercase">
                    {article.author.name}
                  </div>
                  <div className="font-sans text-xs text-neutral-600 font-medium mt-1 mb-4">
                    {article.author.role}
                  </div>
                  <p className="font-sans text-xs text-neutral-700 leading-relaxed font-normal mb-4">
                    Specializing in high-concurrency Next.js 14 applications, headless architecture migrations, and Core Web Vitals remediation.
                  </p>
                  <Link
                    href="/contact"
                    className="w-full py-2.5 px-3 bg-white border border-ink-black font-mono text-xs font-black uppercase text-center block hover:bg-ink-black hover:text-white transition-colors shadow-2xs"
                  >
                    BOOK ARCHITECTURE CONSULT
                  </Link>
                </div>

                {/* Direct CTA Sprint Box */}
                <div className="p-5 sm:p-6 bg-accent-yellow border-2 border-ink-black shadow-brut">
                  <span className="font-mono text-[10px] font-black uppercase text-accent-red bg-white px-2 py-0.5 border border-ink-black shadow-2xs inline-block mb-3">
                    NEED THIS ARCHITECTURE?
                  </span>
                  <h3 className="font-display font-black text-xl uppercase tracking-tight text-ink-black leading-tight mb-2">
                    WE BUILD FAST. GUARANTEED.
                  </h3>
                  <p className="font-sans text-xs text-neutral-900 font-medium leading-relaxed mb-4">
                    Get a fixed-price 2 to 4 week sprint. 100% IP transfer &amp; 100/100 Lighthouse SLA.
                  </p>
                  <Link
                    href="/plans"
                    className="w-full py-3 bg-ink-black text-white font-mono text-xs font-black uppercase text-center block hover:bg-white hover:text-ink-black transition-colors shadow-2xs"
                  >
                    VIEW SPRINT PLANS ↗
                  </Link>
                </div>
              </div>
            </aside>
          </div>
        </section>

        {/* ========================================================= */}
        {/* RELATED ARTICLES ROW                                      */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-[#FAF9F5] py-12 sm:py-16 px-6 sm:px-10 lg:px-16">
          <div className="max-w-6xl mx-auto">
            <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 border-b-2 border-ink-black pb-4 mb-8">
              <div>
                <span className="font-mono text-xs font-black uppercase text-accent-red tracking-wider block mb-1">
                  // CONTINUE READING
                </span>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black">
                  RELATED ENGINEERING MEMOS
                </h3>
              </div>
              <Link
                href="/journal"
                className="font-mono text-xs font-black uppercase text-ink-black hover:text-accent-red transition-colors flex items-center gap-1"
              >
                <span>VIEW ALL {JOURNAL_ARTICLES.length} MEMOS</span>
                <ArrowUpRight className="w-4 h-4" />
              </Link>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
              {relatedArticles.map((rel) => (
                <article
                  key={rel.id}
                  className="neo-card bg-white p-6 border-2 border-ink-black flex flex-col justify-between hover:shadow-brut-lg transition-all group"
                >
                  <div>
                    <div className="flex items-center justify-between mb-3">
                      <span
                        className={`px-2 py-0.5 font-mono text-[10px] font-black uppercase border border-ink-black ${rel.categoryColor}`}
                      >
                        {rel.category}
                      </span>
                      <span className="font-mono text-[10px] font-bold text-gray-500">
                        {rel.readTime}
                      </span>
                    </div>

                    <h4 className="font-display font-black text-lg uppercase tracking-tight text-ink-black mb-2 group-hover:text-accent-red transition-colors leading-snug">
                      <Link href={`/journal/${rel.slug}`}>{rel.title}</Link>
                    </h4>

                    <p className="font-sans text-xs text-neutral-600 line-clamp-3 leading-relaxed mb-4">
                      {rel.excerpt}
                    </p>
                  </div>

                  <div className="pt-3 border-t border-neutral-200 flex items-center justify-between font-mono text-[11px] font-black">
                    <span className="text-gray-400">{rel.id}</span>
                    <Link
                      href={`/journal/${rel.slug}`}
                      className="text-ink-black hover:text-accent-red transition-colors inline-flex items-center gap-1"
                    >
                      READ MEMO <ArrowUpRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </article>
              ))}
            </div>
          </div>
        </section>
      </main>

      {/* ========================================================= */}
      {/* BRUTALIST CONVERSION FOOTER                               */}
      {/* ========================================================= */}
      <BrutFooter />
    </div>
  );
}
