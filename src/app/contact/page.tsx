import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { StatusMarquee } from "@/components/StatusMarquee";
import { BrutFooter } from "@/components/BrutFooter";
import { SimpleContactForm } from "@/components/SimpleContactForm";
import { FullWidthGoogleMap } from "@/components/FullWidthGoogleMap";
import { ShieldCheck, Zap, Award, Clock } from "lucide-react";

export const metadata: Metadata = {
  title: "Contact & Project Dispatch // CodeClovers",
  description:
    "Direct senior architect session with guaranteed 4-hour inquiry SLA. No sales bureaucracy, no junior developers. Start your Next.js 14 web app or design system sprint.",
  alternates: {
    canonical: "/contact",
  },
};

export default function ContactPage() {
  return (
    <div className="min-h-screen bg-paper-beige flex flex-col font-sans select-none">
      {/* 1. Modular Header Navigation */}
      <Navbar />

      {/* 2. Live Status Marquee Ticker */}
      <StatusMarquee />

      <main className="flex-1 w-full bg-white">
        {/* ========================================================= */}
        {/* SECTION 1: CENTERED 3-LINE HERO SECTION                   */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-white paper-ruled-bg py-14 sm:py-20 lg:py-24 px-6 sm:px-10 lg:px-16 relative overflow-hidden select-none text-center">
          <div className="washi-tape -top-2 right-12 rotate-[2deg]" />

          <div className="max-w-6xl xl:max-w-7xl mx-auto flex flex-col items-center text-center">
            {/* Top Category Badge */}
            <span className="font-mono text-xs font-black uppercase text-accent-red tracking-widest bg-accent-yellow px-2.5 py-1 border border-ink-black shadow-brut-sm inline-block mb-6">
              [ 06 // DISPATCH DIRECTIVE ]
            </span>

            {/* Centered 3-Line Headline */}
            <h1 className="font-display font-black text-4xl sm:text-6xl md:text-7xl lg:text-8xl xl:text-[5.5rem] uppercase tracking-tight sm:tracking-tighter text-ink-black leading-[0.92] mb-8 text-center w-full">
              <span className="block whitespace-normal sm:whitespace-nowrap">
                START YOUR SPRINT.
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                <span className="bg-accent-yellow px-2.5 sm:px-3.5 py-0.5 border-2 border-ink-black shadow-brut-sm inline-block rotate-[-1deg] mx-1">
                  DIRECT ARCHITECT
                </span>
              </span>
              <span className="block whitespace-normal sm:whitespace-nowrap mt-2 sm:mt-3">
                TRANSMISSION.
              </span>
            </h1>

            {/* Subtitle */}
            <p className="font-mono text-base sm:text-lg lg:text-xl font-bold uppercase text-gray-800 max-w-3xl leading-relaxed text-center mx-auto">
              No sales bureaucracy, no junior developers. Direct senior architect session with guaranteed 4-hour inquiry SLA.
            </p>
          </div>
        </section>

        {/* ========================================================= */}
        {/* SECTION 2: SIMPLE & CLIENT-FRIENDLY CONTACT FORM          */}
        {/* ========================================================= */}
        <section className="w-full bg-white select-none">
          <SimpleContactForm />
        </section>

        {/* ========================================================= */}
        {/* SECTION 3: FULL SECTION WIDTH LIVE GOOGLE MAP             */}
        {/* ========================================================= */}
        <FullWidthGoogleMap />

        {/* ========================================================= */}
        {/* SECTION 4: CLIENT TRUST DIRECTIVES BAR                    */}
        {/* ========================================================= */}
        <section className="w-full border-b-2 border-ink-black bg-[#FAF9F5] select-none">
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 divide-y-2 sm:divide-y-0 sm:divide-x-2 divide-ink-black">
            {/* Directive 1: 100% IP Transfer */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white hover:bg-neutral-50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-none bg-accent-yellow border-2 border-ink-black flex items-center justify-center shadow-brut-xs">
                    <ShieldCheck className="w-5 h-5 text-ink-black stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[11px] font-black text-accent-red uppercase tracking-wider">
                    DIRECTIVE 01
                  </span>
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight text-ink-black mb-2">
                  100% IP &amp; CODE TRANSFER
                </h3>
                <p className="font-mono text-xs font-bold text-gray-700 leading-relaxed uppercase">
                  Complete GitHub repository transfer, clean architecture ownership, and zero proprietary agency lock-in or recurring vendor fees.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/20 flex items-center justify-between text-[10px] font-mono font-black uppercase text-gray-500">
                <span>FULL REPO OWNERSHIP</span>
                <span>✓ VERIFIED</span>
              </div>
            </div>

            {/* Directive 2: 100/100 Lighthouse SLA */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white hover:bg-neutral-50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-none bg-accent-teal border-2 border-ink-black flex items-center justify-center shadow-brut-xs">
                    <Zap className="w-5 h-5 text-ink-black stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[11px] font-black text-accent-red uppercase tracking-wider">
                    DIRECTIVE 02
                  </span>
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight text-ink-black mb-2">
                  100/100 LIGHTHOUSE SLA
                </h3>
                <p className="font-mono text-xs font-bold text-gray-700 leading-relaxed uppercase">
                  Sub-second First Contentful Paint, perfect zero Cumulative Layout Shift, and WCAG AAA compliance written into your agreement.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/20 flex items-center justify-between text-[10px] font-mono font-black uppercase text-gray-500">
                <span>CORE WEB VITALS</span>
                <span>✓ GUARANTEED</span>
              </div>
            </div>

            {/* Directive 3: 30-Day Post-Launch Warranty */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white hover:bg-neutral-50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-none bg-accent-red text-white border-2 border-ink-black flex items-center justify-center shadow-brut-xs">
                    <Award className="w-5 h-5 text-white stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[11px] font-black text-accent-red uppercase tracking-wider">
                    DIRECTIVE 03
                  </span>
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight text-ink-black mb-2">
                  30-DAY EXTENDED WARRANTY
                </h3>
                <p className="font-mono text-xs font-bold text-gray-700 leading-relaxed uppercase">
                  Comprehensive post-deployment monitoring, instant hotfixes, and dedicated senior engineering advisory for 30 full days.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/20 flex items-center justify-between text-[10px] font-mono font-black uppercase text-gray-500">
                <span>ZERO DEFECT COVERAGE</span>
                <span>✓ INCLUDED</span>
              </div>
            </div>

            {/* Directive 4: 4-Hour Response SLA */}
            <div className="p-6 sm:p-8 flex flex-col justify-between bg-white hover:bg-neutral-50 transition-colors">
              <div>
                <div className="flex items-center justify-between mb-4">
                  <div className="w-10 h-10 rounded-none bg-ink-black text-white border-2 border-ink-black flex items-center justify-center shadow-brut-xs">
                    <Clock className="w-5 h-5 text-accent-yellow stroke-[2.5]" />
                  </div>
                  <span className="font-mono text-[11px] font-black text-accent-red uppercase tracking-wider">
                    DIRECTIVE 04
                  </span>
                </div>
                <h3 className="font-display font-black text-lg uppercase tracking-tight text-ink-black mb-2">
                  4-HOUR RESPONSE SLA
                </h3>
                <p className="font-mono text-xs font-bold text-gray-700 leading-relaxed uppercase">
                  Direct evaluation by our senior engineering principals. Every brief receives an actionable architecture reply within 4 business hours.
                </p>
              </div>
              <div className="mt-4 pt-3 border-t border-ink-black/20 flex items-center justify-between text-[10px] font-mono font-black uppercase text-gray-500">
                <span>SENIOR PRINCIPAL TRIAGE</span>
                <span>✓ &lt; 4 HOURS</span>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* 5. Neo-Brutalist Footer */}
      <BrutFooter />
    </div>
  );
}
