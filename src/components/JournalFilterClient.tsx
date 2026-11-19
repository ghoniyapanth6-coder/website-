"use client";

import React, { useState, useMemo } from "react";
import Link from "next/link";
import { ArrowUpRight, Search, BookOpen } from "lucide-react";
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

      {/* 2-Column Square Cards Grid */}
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
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 lg:gap-10">
            {filteredArticles.map((article) => (
              <Link
                key={article.id}
                href={`/journal/${article.slug}`}
                className="group relative bg-white border-2 border-ink-black shadow-brut hover:shadow-brut-lg hover:-translate-y-1.5 transition-all duration-200 aspect-auto md:aspect-square flex flex-col justify-between p-6 sm:p-8 lg:p-10 cursor-pointer overflow-hidden"
              >
                {/* 1. TOP: Topic / Category Pill & Corner Arrow */}
                <div className="flex items-center justify-between gap-3">
                  <div className="flex items-center gap-2.5">
                    <span
                      className={`px-3 py-1 font-mono text-[11px] font-black uppercase border-2 border-ink-black shadow-brut-xs ${article.categoryColor}`}
                    >
                      {article.category}
                    </span>
                    <span className="font-mono text-xs font-bold text-neutral-400">
                      {article.id}
                    </span>
                  </div>

                  <div className="w-9 h-9 border-2 border-ink-black bg-paper-beige flex items-center justify-center group-hover:bg-accent-yellow group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-all shadow-brut-xs">
                    <ArrowUpRight className="w-5 h-5 stroke-[2.5] text-ink-black" />
                  </div>
                </div>

                {/* 2. MIDDLE: Topic Title & Short Description */}
                <div className="my-auto py-4">
                  <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black leading-tight mb-3 group-hover:text-accent-red transition-colors">
                    {article.title}
                  </h3>
                  <p className="font-sans text-sm sm:text-base text-neutral-600 leading-relaxed font-normal line-clamp-3 lg:line-clamp-4">
                    {article.excerpt}
                  </p>
                </div>

                {/* 3. BOTTOM: Tags */}
                <div className="pt-4 border-t-2 border-dashed border-neutral-300 flex flex-wrap gap-2 items-center">
                  {article.tags.slice(0, 4).map((tag) => (
                    <span
                      key={tag}
                      className="px-2.5 py-1 bg-paper-beige border border-ink-black font-mono text-[11px] font-bold text-gray-800 uppercase shadow-2xs group-hover:border-ink-black"
                    >
                      #{tag}
                    </span>
                  ))}
                </div>
              </Link>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};
