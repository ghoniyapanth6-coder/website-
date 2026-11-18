"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  Sparkles,
  Zap,
  Code2,
  Cpu,
  Layers,
  ArrowUpRight,
  ShieldCheck,
  CheckCircle2,
  Terminal,
  Heart,
} from "lucide-react";

export const AboutNotebookSection: React.FC = () => {
  const [activeTab, setActiveTab] = useState<number>(0);

  const capabilities = [
    {
      title: "Next.js 14+ Architecture",
      icon: "⚡",
      badge: "FRONTEND",
      color: "bg-[#FBBF24]",
      accent: "bg-[#F59E0B]",
      desc: "Zero-bloat React 19 Server Components, dynamic streaming SSR, and micro-animations designed for sub-second page transitions.",
    },
    {
      title: "Scalable Node.js APIs",
      icon: "🛠",
      badge: "BACKEND",
      color: "bg-[#34D399]",
      accent: "bg-[#10B981]",
      desc: "Robust Express/Fastify microservices, PostgreSQL with Prisma ORM, Redis edge caching, and bulletproof Zod payload validation.",
    },
    {
      title: "Technical SEO & CWV",
      icon: "🌸",
      badge: "SEARCH",
      color: "bg-[#F472B6]",
      accent: "bg-[#EC4899]",
      desc: "Dynamic JSON-LD schemas, automated XML sitemaps, semantic HTML5 hierarchy, and a guaranteed 100/100 Google Lighthouse score.",
    },
    {
      title: "Microservices & Database",
      icon: "⌘",
      badge: "SCALE",
      color: "bg-[#60A5FA]",
      accent: "bg-[#3B82F6]",
      desc: "Relational database schema modeling, connection pooling, webhook orchestrations, and real-time WebSocket integrations.",
    },
  ];

  return (
    <section className="relative w-full bg-white white-paper-ruled border-b-2 border-ink-black py-16 sm:py-20 md:py-24 px-4 sm:px-8 overflow-hidden select-none">
      {/* Decorative Washi Tape Strips on Canvas */}
      <div className="washi-tape top-4 left-10 rotate-[-5deg] opacity-75 hidden md:block" />
      <div className="washi-tape top-5 right-14 rotate-[4deg] opacity-75 hidden md:block" />

      {/* Main Container - Expansive Full-Width Grid */}
      <div className="max-w-7xl mx-auto px-2 sm:px-4">
        {/* ========================================================= */}
        {/* Top Header Bar: "about us!" in Robin handwritten style   */}
        {/* ========================================================= */}
        <div className="flex items-center justify-between mb-8 sm:mb-12">
          <div className="flex items-center gap-2">
            <span className="font-handwritten text-2xl sm:text-3xl text-gray-800 font-bold tracking-wide">
              about us!
            </span>
          </div>

          <div className="hidden sm:inline-block px-3 py-1 bg-white border-2 border-ink-black font-mono text-[11px] font-black uppercase text-ink-black shadow-brut-xs rotate-[1deg]">
            <span>EST. 2026 // CODECLOVERS</span>
          </div>
        </div>

        {/* ========================================================= */}
        {/* 3-Column Studio Layout: Left Polaroid | Center | Right   */}
        {/* ========================================================= */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-8 items-center">
          {/* ------------------------------------------------------- */}
          {/* Left Column (3 cols): Polaroid 1 (Tilted Left)          */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center">
            {/* Polaroid 1: Lead Architect */}
            <div className="polaroid-card w-full max-w-[260px] bg-white p-3.5 pb-7 border-2 border-ink-black shadow-[6px_6px_0px_0px_#000] rotate-[-3.5deg] hover:rotate-0 transition-all duration-300 relative group">
              {/* Corner washi tape strips */}
              <div className="absolute -top-3.5 -left-3.5 w-16 h-6 bg-[#93C5FD]/90 border-l border-r border-dashed border-gray-400 rotate-[-15deg] shadow-xs z-10 pointer-events-none" />
              <div className="absolute -top-3.5 -right-3.5 w-16 h-6 bg-[#FEF08A]/90 border-l border-r border-dashed border-gray-400 rotate-[15deg] shadow-xs z-10 pointer-events-none" />

              {/* Photo Frame */}
              <div className="w-full h-64 sm:h-72 bg-neutral-900 border-2 border-ink-black overflow-hidden relative">
                <div
                  className="w-full h-full bg-cover bg-center grayscale contrast-125 group-hover:grayscale-0 group-hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=600&q=80')",
                  }}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-accent-yellow border border-ink-black font-mono text-[9px] font-black uppercase text-ink-black shadow-xs">
                  LEAD ARCHITECT
                </div>
              </div>

              {/* Handwritten Caption */}
              <div className="text-center font-handwritten text-xl text-gray-800 font-bold mt-3">
                codeclovers team &bull; 2026
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* Center Column (6 cols): "what's up" + Handwritten Note  */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-6 flex flex-col items-center text-center px-2 sm:px-4">
            {/* Centered "what's up" Pill Box (Exactly from Robin reference) */}
            <div className="inline-block px-5 py-1 border-2 border-ink-black bg-white shadow-brut-xs mb-6">
              <span className="font-mono text-xs sm:text-sm font-black uppercase tracking-wider text-ink-black">
                what&apos;s up
              </span>
            </div>

            {/* Authentic Handwritten Paragraph (Robin Reference Style) */}
            <p className="font-handwritten text-2xl sm:text-3xl text-gray-900 leading-snug sm:leading-relaxed max-w-xl mx-auto mb-8 font-bold">
              We&apos;re a software engineering studio who gets a little too excited about making complicated things feel simple.{" "}
              <span className="inline-block text-amber-500 font-normal">✨</span> We care about the small details, the edge cases everyone forgets, and shipping work that genuinely makes your business grow.{" "}
              <span className="inline-block">🥪</span>
            </p>

            {/* Tactile Colorful Tags (Matching Robin Reference Image exactly) */}
            <div className="w-full max-w-lg flex flex-col gap-3 my-2">
              {/* Row 1: Yellow & Green Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs font-black">
                {/* Yellow Tag */}
                <div className="flex items-stretch rounded-lg border-2 border-ink-black shadow-brut-xs bg-white overflow-hidden hover:translate-x-[1px] hover:translate-y-[1px] transition-transform">
                  <div className="flex-1 p-2.5 bg-[#FEF08A] text-ink-black text-left uppercase tracking-wide flex items-center justify-between font-black">
                    <span>Next.js Architecture</span>
                  </div>
                  <div className="w-10 bg-[#FACC15] border-l-2 border-ink-black flex items-center justify-center text-ink-black text-sm">
                    ⚡
                  </div>
                </div>

                {/* Green Tag */}
                <div className="flex items-stretch rounded-lg border-2 border-ink-black shadow-brut-xs bg-white overflow-hidden hover:translate-x-[1px] hover:translate-y-[1px] transition-transform">
                  <div className="flex-1 p-2.5 bg-[#BBF7D0] text-ink-black text-left uppercase tracking-wide flex items-center justify-between font-black">
                    <span>Node.js APIs</span>
                  </div>
                  <div className="w-10 bg-[#4ADE80] border-l-2 border-ink-black flex items-center justify-center text-ink-black text-sm">
                    🛠
                  </div>
                </div>
              </div>

              {/* Row 2: Pink & Blue Tags */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 font-mono text-xs font-black">
                {/* Pink Tag */}
                <div className="flex items-stretch rounded-lg border-2 border-ink-black shadow-brut-xs bg-white overflow-hidden hover:translate-x-[1px] hover:translate-y-[1px] transition-transform">
                  <div className="flex-1 p-2.5 bg-[#FBCFE8] text-ink-black text-left uppercase tracking-wide flex items-center justify-between font-black">
                    <span>Technical SEO &amp; CWV</span>
                  </div>
                  <div className="w-10 bg-[#F472B6] border-l-2 border-ink-black flex items-center justify-center text-ink-black text-sm">
                    🌸
                  </div>
                </div>

                {/* Blue Tag */}
                <div className="flex items-stretch rounded-lg border-2 border-ink-black shadow-brut-xs bg-white overflow-hidden hover:translate-x-[1px] hover:translate-y-[1px] transition-transform">
                  <div className="flex-1 p-2.5 bg-[#BAE6FD] text-ink-black text-left uppercase tracking-wide flex items-center justify-between font-black">
                    <span>Database &amp; Scale</span>
                  </div>
                  <div className="w-10 bg-[#38BDF8] border-l-2 border-ink-black flex items-center justify-center text-ink-black text-sm">
                    ⌘
                  </div>
                </div>
              </div>
            </div>

            {/* Bottom Proof Strip */}
            <div className="w-full max-w-lg mt-6 pt-5 border-t-2 border-ink-black flex items-center justify-around font-mono text-center">
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-ink-black block">50+</span>
                <span className="text-[10px] font-bold uppercase text-gray-500">PROJECTS SHIPPED</span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-accent-red block">100%</span>
                <span className="text-[10px] font-bold uppercase text-gray-500">SPEED TARGET</span>
              </div>
              <div className="w-px h-8 bg-gray-300" />
              <div>
                <span className="font-display font-black text-2xl sm:text-3xl text-emerald-600 block">14D</span>
                <span className="text-[10px] font-bold uppercase text-gray-500">SPRINT CYCLE</span>
              </div>
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* Right Column (3 cols): Polaroid 2 (Tilted Right)        */}
          {/* ------------------------------------------------------- */}
          <div className="lg:col-span-3 flex flex-col items-center justify-center">
            {/* Polaroid 2: Workspace / Studio */}
            <div className="polaroid-card w-full max-w-[260px] bg-white p-3.5 pb-7 border-2 border-ink-black shadow-[6px_6px_0px_0px_#000] rotate-[3.5deg] hover:rotate-0 transition-all duration-300 relative group">
              {/* Corner washi tape strips */}
              <div className="absolute -top-3.5 -left-3.5 w-16 h-6 bg-[#A7F3D0]/90 border-l border-r border-dashed border-gray-400 rotate-[-12deg] shadow-xs z-10 pointer-events-none" />
              <div className="absolute -top-3.5 -right-3.5 w-16 h-6 bg-[#FED7AA]/90 border-l border-r border-dashed border-gray-400 rotate-[12deg] shadow-xs z-10 pointer-events-none" />

              {/* Photo Frame */}
              <div className="w-full h-64 sm:h-72 bg-neutral-900 border-2 border-ink-black overflow-hidden relative">
                <div
                  className="w-full h-full bg-cover bg-center contrast-115 group-hover:scale-105 transition-all duration-300"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1522071820081-009f0129c71c?auto=format&fit=crop&w=600&q=80')",
                  }}
                />
                <div className="absolute top-2 left-2 px-2 py-0.5 bg-accent-teal border border-ink-black font-mono text-[9px] font-black uppercase text-black shadow-xs">
                  THE LAB &bull; HQ
                </div>
              </div>

              {/* Handwritten Caption */}
              <div className="text-center font-handwritten text-xl text-gray-800 font-bold mt-3">
                codeclovers lab &bull; workspace
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};
