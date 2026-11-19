"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  Search,
  Clock,
  Tag,
  CheckCircle2,
  BookOpen,
  Zap,
  TrendingUp,
  Cpu,
  Layers,
  Sparkles,
  Calendar,
} from "lucide-react";
import type { JournalArticle } from "@/data/journalArticles";

interface JournalFilterProps {
  articles: JournalArticle[];
}

const CATEGORIES = [
  "ALL MEMOS",
  "ARCHITECTURE",
  "SEO ENGINE",
  "BACKEND",
  "DESIGN SYSTEM",
  "PERFORMANCE SLA",
  "AGILE STRATEGY",
];

export const JournalFilterClient: React.FC<JournalFilterProps> = ({ articles }) => {
  const [activeCategory, setActiveCategory] = useState("ALL MEMOS");
  const [searchQuery, setSearchQuery] = useState("");

  const filteredArticles = useMemo(() => {
    return articles.filter((article) => {
      const matchesCategory =
        activeCategory === "ALL MEMOS" ||
        article.category.toUpperCase() === activeCategory.toUpperCase();

      const query = searchQuery.trim().toLowerCase();
      const matchesSearch =
        query === "" ||
        article.title.toLowerCase().includes(query) ||
        article.subtitle.toLowerCase().includes(query) ||
        article.excerpt.toLowerCase().includes(query) ||
        article.tags.some((t) => t.toLowerCase().includes(query));

      return matchesCategory && matchesSearch;
    });
  }, [articles, activeCategory, searchQuery]);

  // Visual header illustration generator for each technical memo
  const renderCardGraphic = (slug: string, category: string) => {
    switch (slug) {
      case "why-we-ditched-wordpress-for-nextjs-14":
        return (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FFE600_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] font-black uppercase text-accent-yellow bg-white/10 px-2 py-0.5 border border-white/20">
                RSC EDGE COMPILE
              </span>
              <span className="font-mono text-[10px] font-bold text-neutral-400">
                NEXT.JS 14
              </span>
            </div>
            <div className="z-10 my-auto py-2">
              <div className="flex items-center justify-between font-mono text-[11px] font-bold">
                <span className="text-neutral-400 line-through">PHP MONOLITH (3.2s)</span>
                <span className="text-emerald-400 font-black">EDGE RSC (0.2s)</span>
              </div>
              <div className="w-full bg-neutral-800 h-2 mt-2 border border-neutral-700 overflow-hidden relative">
                <div className="bg-accent-yellow h-full w-[88%] animate-pulse" />
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 z-10">
              <span className="flex items-center gap-1.5 text-accent-teal">
                <span className="w-1.5 h-1.5 rounded-full bg-accent-teal animate-ping" />
                Zero Hydration Tax
              </span>
              <span>100/100 CWV</span>
            </div>
          </div>
        );

      case "technical-seo-nextjs-google-dominance":
        return (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#00C2CB_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] font-black uppercase text-accent-teal bg-white/10 px-2 py-0.5 border border-white/20">
                SCHEMA.ORG GRAPH
              </span>
              <span className="font-mono text-[10px] font-bold text-accent-yellow">
                RANK #1 SERP
              </span>
            </div>
            <div className="z-10 my-auto p-2.5 bg-neutral-900 border border-neutral-700 shadow-2xs">
              <div className="font-mono text-[10px] text-neutral-400">google.com/search?q=high-speed-agency</div>
              <div className="font-display font-black text-xs text-white truncate mt-0.5">
                CodeClovers ★★★★★ (4.98) &bull; Verified Entity
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 z-10">
              <span className="text-emerald-400 font-bold">&bull; Sub-200ms TTFB</span>
              <span>Rich Snippet Stars</span>
            </div>
          </div>
        );

      case "scaling-nodejs-microservices-prisma-redis":
        return (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF00FF_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] font-black uppercase text-accent-magenta bg-white/10 px-2 py-0.5 border border-white/20">
                REDIS CLUSTERS
              </span>
              <span className="font-mono text-[10px] font-bold text-neutral-300">
                PRISMA POOL
              </span>
            </div>
            <div className="z-10 my-auto flex items-center justify-between gap-2 text-center font-mono">
              <div className="p-1.5 bg-neutral-900 border border-neutral-700 flex-1">
                <div className="text-[9px] text-neutral-400">CACHE HIT</div>
                <div className="text-xs font-black text-accent-magenta">94.2%</div>
              </div>
              <div className="text-neutral-500 font-black">&rarr;</div>
              <div className="p-1.5 bg-neutral-900 border border-neutral-700 flex-1">
                <div className="text-[9px] text-neutral-400">LATENCY</div>
                <div className="text-xs font-black text-accent-teal">8.4ms</div>
              </div>
              <div className="text-neutral-500 font-black">&rarr;</div>
              <div className="p-1.5 bg-neutral-900 border border-neutral-700 flex-1">
                <div className="text-[9px] text-neutral-400">FAILURES</div>
                <div className="text-xs font-black text-emerald-400">0.00%</div>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 z-10">
              <span>15,000 req/sec</span>
              <span className="text-accent-yellow font-bold">&bull; PgBouncer Active</span>
            </div>
          </div>
        );

      case "neo-brutalist-design-systems-wcag-aaa":
        return (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-paper-beige border-b-2 border-ink-black text-ink-black relative overflow-hidden paper-ruled-bg">
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] font-black uppercase bg-accent-yellow px-2 py-0.5 border border-ink-black shadow-2xs">
                WCAG AAA SPEC
              </span>
              <span className="font-mono text-[10px] font-bold text-gray-700">
                SWISS GRID
              </span>
            </div>
            <div className="z-10 my-auto flex items-center gap-2">
              <div className="p-2 bg-white border-2 border-ink-black shadow-brut-xs font-display font-black text-xs uppercase flex-1 text-center">
                21:1 CONTRAST
              </div>
              <div className="p-2 bg-accent-red text-white border-2 border-ink-black shadow-brut-xs font-display font-black text-xs uppercase flex-1 text-center">
                TACTILE UI
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-gray-700 font-bold z-10">
              <span>2px Ink Borders</span>
              <span>100% Accessible</span>
            </div>
          </div>
        );

      case "core-web-vitals-zero-javascript-tax":
        return (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#10B981_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] font-black uppercase text-emerald-400 bg-white/10 px-2 py-0.5 border border-white/20">
                LIGHTHOUSE 100/100
              </span>
              <span className="font-mono text-[10px] font-bold text-accent-yellow">
                0.000 CLS
              </span>
            </div>
            <div className="z-10 my-auto flex items-center justify-center gap-4 py-1">
              <div className="w-12 h-12 rounded-full border-4 border-emerald-400 flex items-center justify-center font-display font-black text-base text-emerald-400 shadow-[0_0_12px_rgba(52,211,153,0.4)]">
                100
              </div>
              <div className="font-mono text-[11px] leading-tight">
                <div className="text-white font-black">PERFECT AUDIT</div>
                <div className="text-neutral-400 text-[10px]">34 KB Initial JS</div>
                <div className="text-emerald-400 text-[10px] font-bold">LCP &lt; 0.3s</div>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 z-10">
              <span>Zero JS Tax</span>
              <span className="text-emerald-400">&bull; Pass All Vitals</span>
            </div>
          </div>
        );

      case "saas-mvp-sprint-roadmap":
        return (
          <div className="w-full h-full flex flex-col justify-between p-4 bg-gradient-to-br from-neutral-950 via-neutral-900 to-neutral-950 text-white relative overflow-hidden">
            <div className="absolute inset-0 opacity-20 bg-[radial-gradient(#FF3E1D_1px,transparent_1px)] [background-size:12px_12px]" />
            <div className="flex items-center justify-between z-10">
              <span className="font-mono text-[10px] font-black uppercase text-accent-red bg-white/10 px-2 py-0.5 border border-white/20">
                21-DAY SPRINT
              </span>
              <span className="font-mono text-[10px] font-bold text-neutral-300">
                PROD DEPLOY
              </span>
            </div>
            <div className="z-10 my-auto grid grid-cols-3 gap-1.5 font-mono text-[9px] text-center">
              <div className="p-1.5 bg-neutral-900 border border-neutral-700">
                <div className="text-accent-yellow font-black">W1 FIGMA</div>
                <div className="text-neutral-400 text-[8px]">Tokens &amp; DB</div>
              </div>
              <div className="p-1.5 bg-neutral-900 border border-neutral-700">
                <div className="text-accent-teal font-black">W2 NEXT.JS</div>
                <div className="text-neutral-400 text-[8px]">CRUD &amp; Auth</div>
              </div>
              <div className="p-1.5 bg-neutral-900 border border-neutral-700">
                <div className="text-emerald-400 font-black">W3 STRIPE</div>
                <div className="text-neutral-400 text-[8px]">100% Launch</div>
              </div>
            </div>
            <div className="flex items-center justify-between font-mono text-[10px] text-neutral-400 z-10">
              <span>Full IP Handover</span>
              <span className="text-accent-yellow">&bull; Fixed Fee</span>
            </div>
          </div>
        );

      default:
        return (
          <div className="w-full h-full flex items-center justify-center p-4 bg-neutral-950 text-white font-mono text-xs font-black uppercase">
            <span>CODECLOVERS MEMO</span>
          </div>
        );
    }
  };

  return (
    <div className="w-full">
      {/* Search & Category Filter Bar */}
      <div className="w-full border-b-2 border-ink-black bg-[#FAF9F5]">
        <div className="max-w-7xl mx-auto px-6 sm:px-10 py-6">
          <div className="flex flex-col lg:flex-row items-stretch lg:items-center justify-between gap-4">
            {/* Search Input Box */}
            <div className="relative flex-1 max-w-md">
              <Search className="w-4 h-4 text-gray-500 absolute left-3.5 top-1/2 -translate-y-1/2" />
              <input
                type="text"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                placeholder="SEARCH MEMOS BY KEYWORD OR TECH..."
                className="w-full pl-10 pr-4 py-2.5 bg-white border-2 border-ink-black font-mono text-xs font-bold uppercase text-ink-black focus:outline-none focus:bg-accent-yellow/10 placeholder:text-gray-400 shadow-brut-xs"
              />
              {searchQuery && (
                <button
                  type="button"
                  onClick={() => setSearchQuery("")}
                  className="absolute right-3 top-1/2 -translate-y-1/2 font-mono text-[10px] font-black text-gray-500 hover:text-ink-black"
                >
                  CLEAR
                </button>
              )}
            </div>

            {/* Live Count Pill */}
            <div className="flex items-center gap-2 font-mono text-xs font-bold text-neutral-600">
              <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span>
                SHOWING <strong className="text-ink-black">{filteredArticles.length}</strong> OF{" "}
                <strong className="text-ink-black">{articles.length}</strong> ARCHITECTURAL MEMOS
              </span>
            </div>
          </div>

          {/* Category Filter Pills */}
          <div className="flex flex-wrap items-center gap-2 mt-5 pt-5 border-t border-dashed border-neutral-300 font-mono text-xs font-black">
            <span className="text-gray-500 text-[11px] uppercase mr-2 tracking-wider">
              FILTER BY DISCIPLINE:
            </span>
            {CATEGORIES.map((cat) => {
              const isSelected = activeCategory === cat;
              return (
                <button
                  key={cat}
                  type="button"
                  onClick={() => setActiveCategory(cat)}
                  className={`px-3 py-1.5 border-2 border-ink-black uppercase text-[11px] transition-all cursor-pointer shadow-brut-xs ${
                    isSelected
                      ? "bg-ink-black text-white scale-[1.02]"
                      : "bg-white text-ink-black hover:bg-accent-yellow"
                  }`}
                >
                  {cat}
                </button>
              );
            })}
          </div>
        </div>
      </div>

      {/* Articles Grid with Upgraded Rich Card UI */}
      <div className="max-w-7xl mx-auto px-6 sm:px-10 py-12 lg:py-16">
        {filteredArticles.length === 0 ? (
          <div className="p-12 sm:p-16 bg-white border-2 border-ink-black shadow-brut text-center max-w-xl mx-auto my-8">
            <BookOpen className="w-10 h-10 mx-auto mb-4 text-accent-red" />
            <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black mb-2">
              NO ENGINEERING MEMOS FOUND
            </h3>
            <p className="font-sans text-sm text-neutral-600 mb-6">
              No articles matched your search query &ldquo;{searchQuery}&rdquo; under {activeCategory}.
            </p>
            <button
              type="button"
              onClick={() => {
                setActiveCategory("ALL MEMOS");
                setSearchQuery("");
              }}
              className="px-6 py-2.5 bg-accent-yellow border-2 border-ink-black font-mono text-xs font-black uppercase text-ink-black hover:bg-ink-black hover:text-white transition-colors shadow-brut-xs cursor-pointer"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 items-stretch">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="bg-white border-2 border-ink-black shadow-brut hover:shadow-brut-lg hover:-translate-y-1.5 transition-all duration-200 flex flex-col justify-between group overflow-hidden"
              >
                <div>
                  {/* 1. Technical Blueprint Graphic Cover Header */}
                  <div className="h-40 sm:h-44 w-full border-b-2 border-ink-black">
                    {renderCardGraphic(article.slug, article.category)}
                  </div>

                  {/* 2. Card Content Body */}
                  <div className="p-6 sm:p-7">
                    {/* Category & Meta Row */}
                    <div className="flex items-center justify-between gap-2 mb-3.5">
                      <span
                        className={`px-2.5 py-0.5 font-mono text-[10px] font-black uppercase border border-ink-black shadow-2xs ${article.categoryColor}`}
                      >
                        {article.category}
                      </span>
                      <div className="flex items-center gap-2 font-mono text-[11px] font-bold text-gray-500 uppercase">
                        <Clock className="w-3 h-3 text-gray-400" />
                        <span>{article.readTime}</span>
                      </div>
                    </div>

                    {/* Title */}
                    <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-ink-black leading-tight mb-3 group-hover:text-accent-red transition-colors">
                      <Link href={`/journal/${article.slug}`}>
                        {article.title}
                      </Link>
                    </h3>

                    {/* Excerpt */}
                    <p className="font-sans text-xs sm:text-sm text-neutral-600 leading-relaxed font-normal mb-5 line-clamp-3">
                      {article.excerpt}
                    </p>

                    {/* High-Impact Production Outcome Metric Strip */}
                    {article.metrics.length > 0 && (
                      <div className="p-3 bg-neutral-950 border-2 border-ink-black text-white shadow-2xs mb-5 flex items-center justify-between">
                        <div>
                          <span className="font-mono text-[9px] font-bold uppercase tracking-wider text-neutral-400 block">
                            KEY OUTCOME
                          </span>
                          <span className="font-display font-black text-2xl text-accent-yellow leading-none block mt-0.5">
                            {article.metrics[0].value}
                          </span>
                        </div>
                        <span className="font-mono text-[10px] font-black uppercase text-accent-red bg-accent-red/20 px-2 py-1 border border-accent-red">
                          {article.metrics[0].label}
                        </span>
                      </div>
                    )}

                    {/* Categorization Tags */}
                    <div className="flex flex-wrap gap-1.5">
                      {article.tags.slice(0, 3).map((tag) => (
                        <span
                          key={tag}
                          className="px-2 py-0.5 bg-paper-beige border border-ink-black font-mono text-[10px] font-bold text-gray-700 uppercase"
                        >
                          #{tag}
                        </span>
                      ))}
                    </div>
                  </div>
                </div>

                {/* 3. Full-Width Tactile Action CTA Button */}
                <Link
                  href={`/journal/${article.slug}`}
                  className="w-full py-3.5 px-6 bg-white hover:bg-accent-yellow border-t-2 border-ink-black font-mono text-xs font-black uppercase text-ink-black flex items-center justify-between transition-colors group/btn cursor-pointer"
                >
                  <span className="group-hover/btn:translate-x-0.5 transition-transform">
                    READ ARCHITECTURAL MEMO
                  </span>
                  <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover/btn:translate-x-1 group-hover/btn:-translate-y-1 transition-transform" />
                </Link>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
