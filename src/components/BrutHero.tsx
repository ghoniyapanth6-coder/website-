"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, Plus, Search, X, CheckCircle2, Send } from "lucide-react";
import confetti from "canvas-confetti";

export const BrutHero: React.FC = () => {
  const [auditModalOpen, setAuditModalOpen] = useState(false);
  const [auditUrl, setAuditUrl] = useState("");
  const [auditEmail, setAuditEmail] = useState("");
  const [auditSubmitted, setAuditSubmitted] = useState(false);
  const [plusClicked, setPlusClicked] = useState(false);

  const handleAuditSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.4 },
        colors: ["#FFE600", "#FF3B1D", "#00C2CB", "#000000"],
      });
    } catch {
      // fallback
    }
    setAuditSubmitted(true);
  };

  return (
    <>
      {/* 2-Column Swiss Grid Hero Layout (Exact match to reference image) */}
      <section className="grid grid-cols-1 lg:grid-cols-12 w-full border-b-2 border-ink-black bg-white select-none">
        {/* ========================================================= */}
        {/* Left Column (7 cols): Giant Condensed Headline & CTAs    */}
        {/* ========================================================= */}
        <div className="lg:col-span-7 p-6 sm:p-10 md:p-12 lg:p-16 xl:p-18 flex flex-col justify-between border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black bg-white">
          <div>
            <h1 className="font-headline font-bold text-[58px] sm:text-[84px] md:text-[104px] lg:text-[118px] xl:text-[132px] 2xl:text-[144px] leading-[0.94] text-ink-black uppercase tracking-tight mb-8">
              WE DESIGN <br />
              WITHOUT <br />
              RULES.
            </h1>

            {/* Tagline with yellow square indicator */}
            <div className="flex items-center gap-3 font-mono text-xs sm:text-sm font-bold uppercase text-ink-black tracking-wider mb-8">
              <span className="w-3.5 h-3.5 bg-accent-yellow border border-ink-black inline-block shrink-0 shadow-xs" />
              <span>BRANDING. WEBSITES. DIGITAL EXPERIENCES.</span>
            </div>
          </div>

          {/* Action Buttons Row */}
          <div className="flex flex-wrap items-center gap-4 pt-4">
            <Link
              href="#work"
              className="px-6 sm:px-8 py-3.5 bg-white border-2 border-ink-black font-mono text-xs sm:text-sm font-black uppercase text-ink-black flex items-center gap-3 hover:bg-ink-black hover:text-white transition-colors duration-150 shadow-brut-sm group"
            >
              <span>VIEW OUR WORK</span>
              <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform duration-150" />
            </Link>

            <button
              type="button"
              onClick={() => {
                setAuditSubmitted(false);
                setAuditModalOpen(true);
              }}
              className="px-6 sm:px-8 py-3.5 bg-accent-yellow border-2 border-ink-black font-mono text-xs sm:text-sm font-black uppercase text-ink-black flex items-center gap-3 hover:bg-ink-black hover:text-accent-yellow transition-colors duration-150 shadow-brut-sm cursor-pointer"
            >
              <Search className="w-4 h-4 stroke-[2.5]" />
              <span>FREE WEBSITE AUDIT</span>
              <ArrowUpRight className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* ========================================================= */}
        {/* Right Column (5 cols): Statement, Globe & Architecture   */}
        {/* ========================================================= */}
        <div className="lg:col-span-5 flex flex-col justify-between bg-white">
          {/* Top Row: Creative Studio Statement + Plus Cell + Red Globe Cell */}
          <div className="grid grid-cols-12 border-b-2 border-ink-black">
            {/* Statement Text (7 cols) */}
            <div className="col-span-7 sm:col-span-8 p-5 sm:p-7 border-r-2 border-ink-black flex items-center">
              <p className="font-display font-extrabold text-xs sm:text-sm md:text-base uppercase tracking-tight text-ink-black leading-tight">
                A CREATIVE STUDIO BUILDING BOLD BRANDS AND DIGITAL EXPERIENCES THAT STAND OUT.
              </p>
            </div>

            {/* Interactive Plus Box (2 cols) */}
            <button
              type="button"
              onClick={() => setPlusClicked(!plusClicked)}
              className="col-span-2 border-r-2 border-ink-black bg-white flex items-center justify-center hover:bg-neutral-100 transition-colors cursor-pointer group"
              title="Toggle interactive mode"
            >
              <Plus
                className={`w-5 h-5 text-ink-black stroke-[2.5] transition-transform duration-200 ${
                  plusClicked ? "rotate-45 text-accent-red" : ""
                }`}
              />
            </button>

            {/* Red / Orange Globe Box (3 or 2 cols) */}
            <div className="col-span-3 sm:col-span-2 bg-accent-red flex items-center justify-center p-3">
              {/* Wireframe Vector Globe (Clean, Static Architectural Icon matching reference) */}
              <svg
                viewBox="0 0 100 100"
                className="w-10 h-10 sm:w-12 sm:h-12 text-ink-black stroke-current stroke-[2.4] fill-none"
              >
                {/* Outer circle */}
                <circle cx="50" cy="50" r="46" />
                {/* Horizontal equator */}
                <line x1="4" y1="50" x2="96" y2="50" />
                {/* Parallels */}
                <path d="M 12 28 Q 50 40 88 28" />
                <path d="M 12 72 Q 50 60 88 72" />
                {/* Prime meridian and longitudes */}
                <line x1="50" y1="4" x2="50" y2="96" />
                <ellipse cx="50" cy="50" rx="24" ry="46" />
              </svg>
            </div>
          </div>

          {/* Bottom Visual: Authentic Brutalist Concrete Monolith Architecture Photo */}
          <div className="relative w-full h-[340px] sm:h-[420px] lg:h-full min-h-[360px] bg-neutral-900 overflow-hidden">
            <div
              className="w-full h-full bg-cover bg-center grayscale contrast-125"
              style={{
                backgroundImage: "url('/brutalist-building.jpg')",
              }}
            />
            {/* Dark subtle vignette overlay */}
            <div className="absolute inset-0 bg-gradient-to-t from-black/30 via-transparent to-transparent pointer-events-none" />

            {/* Corner badge */}
            <div className="absolute bottom-4 right-4 px-2.5 py-1 bg-white border border-ink-black font-mono text-[10px] font-black uppercase text-ink-black shadow-xs">
              CODECLOVERS // STUDIO
            </div>
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
                  <span className="text-accent-red font-black underline">{auditUrl}</span> and email the diagnostic report to{" "}
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
                  FREE 15-PAGE PERFORMANCE &amp; SEO REPORT
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
