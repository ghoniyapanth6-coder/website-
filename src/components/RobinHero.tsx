"use client";

import React, { useState } from "react";
import Link from "next/link";
import {
  ArrowUpRight,
  CheckCircle2,
  Calendar,
  Search,
  ShieldCheck,
  Zap,
  Clock,
  X,
  Send,
} from "lucide-react";
import confetti from "canvas-confetti";

export const RobinHero: React.FC = () => {
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [auditUrl, setAuditUrl] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [auditSubmitted, setAuditSubmitted] = useState(false);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.4 },
        colors: ["#FFE600", "#FF5722", "#00C2CB", "#000000"],
      });
    } catch {
      // fallback
    }
    setAuditSubmitted(true);
  };

  const openAuditModal = () => {
    setAuditSubmitted(false);
    setAuditModalOpen(true);
  };

  return (
    <>
      {/* Hero Section Container: Perfectly sized to fit inside any viewport without vertical scroll */}
      <section className="relative w-full min-h-[calc(100vh-95px)] bg-white white-paper-ruled border-b-2 border-ink-black px-4 sm:px-6 lg:px-8 py-4 sm:py-6 md:py-7 flex flex-col justify-center items-center text-center overflow-hidden">
        {/* Decorative background washi tape */}
        <div className="washi-tape top-3 left-8 rotate-[-4deg] opacity-70 hidden md:block" />
        <div className="washi-tape top-4 right-10 rotate-[3deg] opacity-70 hidden md:block" />

        {/* Unified Wide Container (Standardized to max-w-6xl container width) */}
        <div className="relative w-full max-w-6xl mx-auto flex flex-col items-center justify-center my-auto">
          {/* Top Handwritten Intro Note */}
          <div className="mb-1 sm:mb-1.5 flex flex-col items-center">
            <span className="font-handwritten text-lg sm:text-xl text-gray-700 tracking-wide font-bold">
              hey, we are
            </span>
            <div className="w-10 h-0.5 bg-gray-400 mt-0.5 rounded-full" />
          </div>

          {/* ======================================================== */}
          {/* Center Pixel Box with 4 Annotation Sticky Tags          */}
          {/* ======================================================== */}
          <div className="relative my-3 sm:my-3.5 inline-block">
            {/* Tag 1: Top-Left (Mint Green Tag with Arrow ↘) */}
            <div className="absolute -top-5 sm:-top-6 -left-6 sm:-left-16 md:-left-20 rotate-[-4deg] z-10 flex items-center gap-1">
              <span className="px-2.5 py-1 bg-[#D1FAE5] border border-ink-black rounded text-[10px] sm:text-xs font-mono font-black text-[#065F46] shadow-xs uppercase">
                MAKE THINGS
              </span>
              <svg className="w-4 h-4 text-gray-500 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 7l10 10M17 7v10H7" />
              </svg>
            </div>

            {/* Tag 2: Top-Right (Soft Yellow Tag with Arrow ↙) */}
            <div className="absolute -top-5 sm:-top-6 -right-6 sm:-right-16 md:-right-20 rotate-[3deg] z-10 flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 7L7 17M7 7v10h10" />
              </svg>
              <span className="px-2.5 py-1 bg-[#FEF3C7] border border-ink-black rounded text-[10px] sm:text-xs font-mono font-black text-[#92400E] shadow-xs uppercase">
                SWEAT THE DETAILS
              </span>
            </div>

            {/* The Main Name Box: CODECLOVERS (Wide & Prominent Pixel Font inside Sketch Orange Outline) */}
            <div className="sketch-border-orange bg-white px-8 sm:px-14 md:px-20 py-3 sm:py-4 shadow-[4px_4px_0px_0px_#ff5722] hover:scale-[1.01] transition-transform">
              <span className="font-pixel text-4xl sm:text-5xl md:text-6xl lg:text-7xl tracking-wider text-ink-black uppercase font-black">
                CODECLOVERS
              </span>
            </div>

            {/* Tag 3: Bottom-Left (Soft Orange Tag with Arrow ↗) */}
            <div className="absolute -bottom-5 sm:-bottom-6 -left-6 sm:-left-14 md:-left-18 rotate-[2deg] z-10 flex items-center gap-1">
              <span className="px-2.5 py-1 bg-[#FFEDD5] border border-ink-black rounded text-[10px] sm:text-xs font-mono font-black text-[#9A3412] shadow-xs uppercase">
                Web Dev Agency
              </span>
              <svg className="w-4 h-4 text-gray-500 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M7 17L17 7M17 17V7H7" />
              </svg>
            </div>

            {/* Tag 4: Bottom-Right (Soft Cyan/Mint Tag with Arrow ↖) */}
            <div className="absolute -bottom-5 sm:-bottom-6 -right-6 sm:-right-14 md:-right-18 rotate-[-2deg] z-10 flex items-center gap-1">
              <svg className="w-4 h-4 text-gray-500 hidden sm:block" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M17 17L7 7M7 17V7h10" />
              </svg>
              <span className="px-2.5 py-1 bg-[#CFFAFE] border border-ink-black rounded text-[10px] sm:text-xs font-mono font-black text-[#155E75] shadow-xs uppercase">
                Next.js &bull; Node.js
              </span>
            </div>
          </div>

          {/* Pill under CODECLOVERS (Robin Design Reference) */}
          <div className="mt-1 mb-2 sm:mb-2.5 inline-flex items-center gap-2 px-3.5 py-1 rounded-full border border-ink-black bg-white font-mono text-[11px] sm:text-xs font-bold text-ink-black shadow-xs">
            <span className="w-2 h-2 rounded-full bg-blue-600 animate-pulse" />
            <span>OPEN TO NEW CLIENTS &amp; GOOD PROBLEMS</span>
          </div>

          {/* ======================================================== */}
          {/* Main Statement with Target & Flower Icons + Side Avatars */}
          {/* ======================================================== */}
          <div className="relative w-full max-w-4xl my-2 sm:my-2.5">
            {/* Left Floating Circular Avatar Sticker (Robin style) */}
            <div className="hidden lg:flex absolute -left-12 xl:-left-20 top-1/2 -translate-y-1/2 flex-col items-center pointer-events-none">
              <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full border-2 border-ink-black p-0.5 bg-[#FF5722] shadow-brut-xs">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center grayscale border border-ink-black"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=200&q=80')",
                  }}
                />
              </div>
              <span className="font-mono text-[9px] font-black uppercase text-gray-500 mt-1">
                LEAD ARCHITECT
              </span>
            </div>

            {/* Headline */}
            <h1 className="w-full font-display font-extrabold text-2xl sm:text-4xl md:text-5xl text-ink-black tracking-tight leading-[1.18]">
              We engineer high-speed software that{" "}
              <span className="inline-flex items-center align-middle mx-1">
                <span className="inline-block w-7 h-7 sm:w-8 sm:h-8 rounded-full border-2 border-ink-black bg-[#10B981] p-1.5 shadow-xs">
                  <span className="block w-full h-full rounded-full border-2 border-white bg-[#10B981]" />
                </span>
              </span>{" "}
              gets out of your way{" "}
              <span className="inline-block text-pink-500 text-2xl sm:text-3xl align-middle">
                🌸
              </span>
            </h1>

            {/* Right Floating Circular Avatar Sticker (Robin style) */}
            <div className="hidden lg:flex absolute -right-12 xl:-right-20 top-1/2 -translate-y-1/2 flex-col items-center pointer-events-none">
              <div className="w-14 h-14 xl:w-16 xl:h-16 rounded-full border-2 border-ink-black p-0.5 bg-[#FF5722] shadow-brut-xs">
                <div
                  className="w-full h-full rounded-full bg-cover bg-center contrast-125 border border-ink-black"
                  style={{
                    backgroundImage:
                      "url('https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=200&q=80')",
                  }}
                />
              </div>
              <span className="font-mono text-[9px] font-black uppercase text-gray-500 mt-1">
                THE LAB &bull; 2026
              </span>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Client Trust Maximizer Bar (Wide & Perfectly Compact)    */}
          {/* ======================================================== */}
          <div className="w-full max-w-4xl bg-white border-2 border-ink-black p-3 sm:p-3.5 shadow-brut-sm mb-3 sm:mb-3.5 text-left">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2 pb-2 border-b border-gray-200">
              {/* Overlapping Founders Avatars & Rating */}
              <div className="flex items-center gap-2.5">
                <div className="flex -space-x-2 overflow-hidden">
                  {[
                    "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=100&q=80",
                    "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=100&q=80",
                    "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=100&q=80",
                    "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=100&q=80",
                  ].map((src, i) => (
                    <div
                      key={i}
                      className="inline-block h-6 w-6 sm:h-7 sm:w-7 rounded-full ring-2 ring-black bg-cover bg-center grayscale shadow-xs"
                      style={{ backgroundImage: `url('${src}')` }}
                    />
                  ))}
                </div>
                <div className="font-mono text-xs font-black text-ink-black flex items-center gap-1.5">
                  <div className="flex text-amber-500 text-xs">★★★★★</div>
                  <span className="text-[10px] sm:text-[11px] text-gray-800 font-extrabold">4.9/5 RATING (50+ CLIENTS)</span>
                </div>
              </div>

              {/* Verified Trust Pill */}
              <span className="px-2 py-0.5 bg-[#D1FAE5] border border-ink-black font-mono text-[10px] font-black text-[#065F46] uppercase">
                ✓ 100% VERIFIED RESULTS
              </span>
            </div>

            {/* 4 Guarantees in 1 clean horizontal row */}
            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-2 font-mono text-[10px] sm:text-[11px] font-bold text-gray-900">
              <div className="flex items-center gap-1.5">
                <Zap className="w-3.5 h-3.5 text-amber-500 shrink-0" />
                <span>100/100 SPEED</span>
              </div>
              <div className="flex items-center gap-1.5">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                <span>CLEAN CODE</span>
              </div>
              <div className="flex items-center gap-1.5">
                <Clock className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                <span>14-DAY SPRINTS</span>
              </div>
              <div className="flex items-center gap-1.5">
                <CheckCircle2 className="w-3.5 h-3.5 text-accent-red shrink-0" />
                <span>ZERO LOCK-IN</span>
              </div>
            </div>
          </div>

          {/* ======================================================== */}
          {/* Action CTAs: Free Website Audit + Free Demo              */}
          {/* ======================================================== */}
          <div className="w-full max-w-4xl flex flex-col sm:flex-row items-stretch sm:items-center justify-center gap-3">
            {/* CTA 1: Book Free Website Audit */}
            <button
              type="button"
              onClick={openAuditModal}
              className="neo-btn flex-1 flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-accent-yellow text-ink-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-ink-black hover:text-accent-yellow cursor-pointer shadow-brut-sm"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>BOOK YOUR FREE WEBSITE AUDIT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>

            {/* CTA 2: Book Free Demo Call */}
            <Link
              href="/contact"
              className="neo-btn flex-1 flex items-center justify-center gap-2 px-6 py-3 sm:py-3.5 bg-white text-ink-black font-mono font-black text-xs sm:text-sm uppercase tracking-wider hover:bg-neutral-100 shadow-brut-sm"
            >
              <Calendar className="w-4 h-4 text-accent-red" />
              <span>BOOK A FREE DEMO CALL</span>
            </Link>
          </div>

          {/* Client Trust Ribbon (Requested in visual prompt) */}
          <div className="mt-2.5 font-mono text-[10px] sm:text-[11px] font-bold text-gray-700 tracking-wider flex flex-wrap items-center justify-center gap-2">
            <span className="flex items-center gap-1 text-ink-black font-black">
              <span className="text-amber-500 font-normal">⚡</span> WORTH $500
            </span>
            <span className="text-gray-400">&bull;</span>
            <span className="text-ink-black font-black">100% FREE</span>
            <span className="text-gray-400">&bull;</span>
            <span className="text-ink-black font-black">ZERO SALES PRESSURE</span>
            <span className="text-gray-400">&bull;</span>
            <span className="text-ink-black font-black">DELIVERED IN 24 HOURS</span>
          </div>
        </div>
      </section>

      {/* ======================================================== */}
      {/* Free Website Audit Modal Popup                           */}
      {/* ======================================================== */}
      {auditModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/60 p-4 backdrop-blur-xs">
          <div className="w-full max-w-lg bg-white border-brut-thick shadow-brut-2 p-6 sm:p-8 relative animate-in fade-in zoom-in-95 duration-150">
            {/* Close Button */}
            <button
              type="button"
              onClick={() => setAuditModalOpen(false)}
              className="absolute top-4 right-4 p-1.5 border-2 border-ink-black bg-white hover:bg-accent-red hover:text-white transition-colors"
            >
              <X className="w-5 h-5" />
            </button>

            {auditSubmitted ? (
              <div className="text-center py-6">
                <div className="w-16 h-16 rounded-full bg-accent-yellow border-2 border-ink-black flex items-center justify-center mx-auto mb-4 shadow-brut-sm">
                  <CheckCircle2 className="w-10 h-10 text-ink-black stroke-[2.5]" />
                </div>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black mb-2">
                  AUDIT REQUEST QUEUED!
                </h3>
                <p className="font-mono text-xs font-bold uppercase text-gray-700 max-w-sm mx-auto mb-6">
                  Our engineering team will run a complete Core Web Vitals, Technical SEO, and conversion audit on{" "}
                  <span className="text-accent-red font-black underline">{auditUrl}</span> and email the 15-page diagnostic report to{" "}
                  <span className="text-ink-black font-black">{auditEmail}</span> within 24 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setAuditModalOpen(false)}
                  className="neo-btn px-6 py-2.5 bg-ink-black text-white font-mono text-xs font-black uppercase"
                >
                  GOT IT, THANKS!
                </button>
              </div>
            ) : (
              <div>
                <div className="inline-block px-2.5 py-0.5 bg-accent-yellow border border-ink-black font-mono text-[10px] font-black uppercase mb-3 shadow-brut-sm">
                  FREE 15-PAGE PERFORMANCE & SEO REPORT
                </div>
                <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black mb-2">
                  GET YOUR FREE WEBSITE AUDIT
                </h3>
                <p className="font-mono text-xs font-bold text-gray-600 mb-6">
                  We analyze your LCP speed, render-blocking scripts, mobile responsiveness, and SEO ranking leaks with zero fluff.
                </p>

                <form onSubmit={handleAuditSubmit} className="space-y-4 font-mono text-xs">
                  <div>
                    <label className="block font-black uppercase text-gray-700 mb-1">
                      YOUR WEBSITE URL *
                    </label>
                    <input
                      required
                      type="url"
                      placeholder="https://yourcompany.com"
                      value={auditUrl}
                      onChange={(e) => setAuditUrl(e.target.value)}
                      className="w-full p-3 border-2 border-ink-black bg-neutral-50 focus:bg-white font-bold text-ink-black focus:outline-none shadow-brut-sm"
                    />
                  </div>

                  <div>
                    <label className="block font-black uppercase text-gray-700 mb-1">
                      WORK EMAIL (WHERE WE SEND THE REPORT) *
                    </label>
                    <input
                      required
                      type="email"
                      placeholder="founder@yourcompany.com"
                      value={auditEmail}
                      onChange={(e) => setAuditEmail(e.target.value)}
                      className="w-full p-3 border-2 border-ink-black bg-neutral-50 focus:bg-white font-bold text-ink-black focus:outline-none shadow-brut-sm"
                    />
                  </div>

                  <button
                    type="submit"
                    className="neo-btn w-full py-4 bg-accent-yellow text-ink-black font-mono font-black text-xs uppercase tracking-wider hover:bg-ink-black hover:text-accent-yellow flex items-center justify-center gap-2 mt-4 shadow-brut-sm"
                  >
                    <span>CLAIM MY FREE 15-PAGE AUDIT</span>
                    <Send className="w-4 h-4" />
                  </button>

                  <p className="text-[10px] text-gray-500 text-center font-bold uppercase mt-2">
                    🔒 100% Privacy. Zero spam. We never share your data.
                  </p>
                </form>
              </div>
            )}
          </div>
        </div>
      )}
    </>
  );
};
