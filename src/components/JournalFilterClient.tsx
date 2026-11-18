"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, Clock, Tag, CheckCircle2, BookOpen } from "lucide-react";
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

  return (
    <div className="w-full">
      {/* Search & Category Filter Bar (Swiss Grid Table Style) */}
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
                <strong className="text-ink-black">{articles.length}</strong> PUBLISHED MEMOS
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

      {/* Articles Grid */}
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
              className="px-6 py-2.5 bg-accent-yellow border-2 border-ink-black font-mono text-xs font-black uppercase text-ink-black hover:bg-ink-black hover:text-white transition-colors shadow-brut-xs"
            >
              RESET ALL FILTERS
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8 items-stretch">
            {filteredArticles.map((article) => (
              <article
                key={article.id}
                className="neo-card bg-white border-2 border-ink-black p-6 sm:p-7 flex flex-col justify-between hover:shadow-brut-lg transition-all group relative"
              >
                <div>
                  {/* Top Header Row */}
                  <div className="flex items-center justify-between gap-2 mb-4">
                    <span
                      className={`px-2.5 py-1 font-mono text-[10px] sm:text-[11px] font-black uppercase border border-ink-black shadow-2xs ${article.categoryColor}`}
                    >
                      {article.category}
                    </span>
                    <span className="font-mono text-[11px] font-bold text-gray-500 uppercase flex items-center gap-1.5">
                      <Clock className="w-3 h-3" />
                      {article.readTime}
                    </span>
                  </div>

                  {/* Title */}
                  <h3 className="font-display font-black text-xl sm:text-2xl uppercase tracking-tight text-ink-black leading-tight mb-3 group-hover:text-accent-red transition-colors">
                    <Link href={`/journal/${article.slug}`}>
                      {article.title}
                    </Link>
                  </h3>

                  {/* Excerpt */}
                  <p className="font-sans text-xs sm:text-sm text-neutral-700 leading-relaxed mb-6 font-medium line-clamp-3">
                    {article.excerpt}
                  </p>

                  {/* Primary Highlight Metric Pill */}
                  {article.metrics.length > 0 && (
                    <div className="p-3 bg-neutral-50 border border-ink-black mb-5 shadow-2xs">
                      <span className="font-mono text-[10px] font-bold uppercase text-gray-500 block">
                        KEY PRODUCTION RESULT:
                      </span>
                      <div className="font-display font-black text-lg text-ink-black flex items-center justify-between mt-0.5">
                        <span>{article.metrics[0].value}</span>
                        <span className="font-mono text-[10px] font-black text-accent-red uppercase">
                          {article.metrics[0].label}
                        </span>
                      </div>
                    </div>
                  )}

                  {/* Tags */}
                  <div className="flex flex-wrap gap-1.5 mb-6">
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

                {/* Card Footer Bar */}
                <div className="pt-4 border-t-2 border-ink-black flex items-center justify-between font-mono text-xs font-black">
                  <span className="text-gray-400 text-[10px]">{article.id}</span>
                  <Link
                    href={`/journal/${article.slug}`}
                    className="inline-flex items-center gap-1.5 text-ink-black group-hover:text-accent-red transition-colors uppercase font-mono text-xs font-black"
                  >
                    <span>READ MEMO</span>
                    <ArrowUpRight className="w-4 h-4 stroke-[2.5] group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
                  </Link>
                </div>
              </article>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
