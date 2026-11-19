"use client";

import React, { useState, useEffect } from "react";
import { useSearchParams } from "next/navigation";
import {
  Send,
  CheckCircle2,
  Clock,
  Sparkles,
  ArrowRight,
  ShieldCheck,
  Check,
  RotateCcw,
  AlertCircle,
} from "lucide-react";
import confetti from "canvas-confetti";

const AVAILABLE_SERVICES = [
  "Next.js 14 Web App",
  "UI/UX Design System",
  "Strategic Branding",
  "Technical SEO Overhaul",
  "Full-Stack Node.js",
  "Continuous Retained SLA",
] as const;

const BUDGET_TIERS = [
  "$2K - $5K",
  "$5K - $10K",
  "$10K - $25K",
  "$25K+ Custom",
] as const;

const TIMELINE_OPTIONS = [
  "Immediate < 2 Weeks",
  "Standard 3-4 Weeks",
  "Flexible",
] as const;

export const ContactForm: React.FC = () => {
  const searchParams = useSearchParams();

  const [selectedServices, setSelectedServices] = useState<string[]>([
    "Next.js 14 Web App",
  ]);
  const [selectedBudget, setSelectedBudget] = useState<string>("$5K - $10K");
  const [selectedTimeline, setSelectedTimeline] = useState<string>(
    "Standard 3-4 Weeks"
  );
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    goals: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [countdownSeconds, setCountdownSeconds] = useState(4 * 3600 - 2); // 03:59:58
  const [submissionHash, setSubmissionHash] = useState("");

  // Handle URL query parameter pre-selection (?service=... or ?plan=...)
  useEffect(() => {
    if (!searchParams) return;

    const planParam = searchParams.get("plan");
    const serviceParam = searchParams.get("service");

    if (planParam) {
      const lowerPlan = planParam.toLowerCase();
      if (lowerPlan.includes("starter") || lowerPlan.includes("mvp")) {
        setSelectedServices(["Next.js 14 Web App"]);
        setSelectedBudget("$2K - $5K");
        setSelectedTimeline("Immediate < 2 Weeks");
      } else if (lowerPlan.includes("growth")) {
        setSelectedServices(["Next.js 14 Web App", "Full-Stack Node.js"]);
        setSelectedBudget("$5K - $10K");
        setSelectedTimeline("Standard 3-4 Weeks");
      } else if (lowerPlan.includes("enterprise") || lowerPlan.includes("scale")) {
        setSelectedServices([
          "Next.js 14 Web App",
          "Full-Stack Node.js",
          "Continuous Retained SLA",
        ]);
        setSelectedBudget("$10K - $25K");
        setSelectedTimeline("Flexible");
      }
    }

    if (serviceParam) {
      const matchedService = AVAILABLE_SERVICES.find(
        (s) =>
          s.toLowerCase() === serviceParam.toLowerCase() ||
          s.toLowerCase().includes(serviceParam.toLowerCase()) ||
          serviceParam.toLowerCase().includes(s.toLowerCase())
      );
      if (matchedService && !selectedServices.includes(matchedService)) {
        setSelectedServices((prev) => Array.from(new Set([...prev, matchedService])));
      }
    }
  }, [searchParams]);

  // Live Countdown timer when submitted (4-hour SLA response clock)
  useEffect(() => {
    if (!isSubmitted) return;
    const timer = setInterval(() => {
      setCountdownSeconds((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, [isSubmitted]);

  const formatCountdown = (totalSeconds: number) => {
    const hours = Math.floor(totalSeconds / 3600);
    const minutes = Math.floor((totalSeconds % 3600) / 60);
    const seconds = totalSeconds % 60;
    return `${hours.toString().padStart(2, "0")}:${minutes
      .toString()
      .padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`;
  };

  const toggleService = (service: string) => {
    setSelectedServices((prev) => {
      if (prev.includes(service)) {
        // Keep at least one selected
        if (prev.length === 1) return prev;
        return prev.filter((s) => s !== service);
      } else {
        return [...prev, service];
      }
    });
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();

    // Trigger high-energy celebratory confetti
    try {
      confetti({
        particleCount: 85,
        spread: 90,
        origin: { y: 0.35 },
        colors: ["#FFE600", "#FF3E1D", "#00C2CB", "#000000"],
      });
    } catch {
      // safe fallback
    }

    // Generate random transmission reference hash
    const hash = `CC-${Math.floor(1000 + Math.random() * 9000)}-${
      selectedServices[0]?.slice(0, 3).toUpperCase() || "ENG"
    }`;
    setSubmissionHash(hash);
    setCountdownSeconds(4 * 3600 - 1);
    setIsSubmitted(true);
  };

  const handleReset = () => {
    setIsSubmitted(false);
    setFormData({
      name: "",
      email: "",
      company: "",
      goals: "",
    });
  };

  return (
    <div className="w-full">
      {isSubmitted ? (
        /* ========================================================= */
        /* SUCCESS STATE: TRANSMISSION RECEIVED CARD + COUNTDOWN      */
        /* ========================================================= */
        <div className="neo-card p-6 sm:p-10 lg:p-12 bg-accent-yellow border-2 border-ink-black shadow-brut text-ink-black font-mono">
          {/* Header Status Bar */}
          <div className="flex flex-wrap items-center justify-between gap-2 border-b-2 border-ink-black pb-4 mb-6">
            <span className="bg-ink-black text-white px-2.5 py-1 text-xs font-black uppercase tracking-wider flex items-center gap-1.5 shadow-brut-xs">
              <CheckCircle2 className="w-3.5 h-3.5 text-accent-yellow" />
              <span>STATUS: 200 OK // DISPATCH LOGGED</span>
            </span>
            <span className="font-mono text-xs font-black uppercase text-ink-black">
              REF: {submissionHash}
            </span>
          </div>

          <h2 className="font-display font-black text-3xl sm:text-4xl lg:text-5xl uppercase tracking-tighter text-ink-black mb-3">
            TRANSMISSION RECEIVED!
          </h2>

          <p className="font-mono text-xs sm:text-sm font-bold uppercase text-gray-900 leading-relaxed max-w-xl mb-8">
            Thank you, <span className="underline decoration-2 font-black">{formData.name}</span>. Your project brief has been encrypted and routed directly to our senior architectural triage board.
          </p>

          {/* 4-Hour Response SLA Countdown Box */}
          <div className="neo-card bg-white p-5 sm:p-6 mb-8 border-2 border-ink-black shadow-brut-sm">
            <div className="flex items-center justify-between mb-3 text-xs font-black uppercase">
              <span className="flex items-center gap-2 text-accent-red">
                <Clock className="w-4 h-4 animate-pulse text-accent-red" />
                <span>GUARANTEED ARCHITECT RESPONSE SLA</span>
              </span>
              <span className="text-gray-500 font-bold hidden sm:inline">
                SOMA // ACTIVE DISPATCH
              </span>
            </div>

            <div className="font-display font-black text-4xl sm:text-5xl text-ink-black tracking-tight mb-2">
              {formatCountdown(countdownSeconds)}
            </div>

            <p className="text-xs font-bold uppercase text-gray-600">
              A Senior Technical Principal will review your technical requirements and respond to{" "}
              <span className="text-ink-black font-black underline">{formData.email}</span> within this guaranteed 4-hour window.
            </p>
          </div>

          {/* Submission Dossier Summary */}
          <div className="bg-paper-beige p-5 border-2 border-ink-black mb-8 space-y-3 text-xs font-bold">
            <div className="text-[11px] font-black uppercase text-gray-500 border-b border-ink-black/20 pb-2">
              DISPATCH DOSSIER SUMMARY
            </div>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 text-ink-black">
              <div>
                <span className="text-gray-500 uppercase block text-[10px]">CLIENT &amp; CONTACT:</span>
                <span>{formData.name} ({formData.email})</span>
              </div>
              {formData.company && (
                <div>
                  <span className="text-gray-500 uppercase block text-[10px]">ORGANIZATION / URL:</span>
                  <span>{formData.company}</span>
                </div>
              )}
              <div>
                <span className="text-gray-500 uppercase block text-[10px]">BUDGET TIER:</span>
                <span className="bg-white px-2 py-0.5 border border-ink-black inline-block mt-0.5">{selectedBudget}</span>
              </div>
              <div>
                <span className="text-gray-500 uppercase block text-[10px]">TARGET TIMELINE:</span>
                <span className="bg-white px-2 py-0.5 border border-ink-black inline-block mt-0.5">{selectedTimeline}</span>
              </div>
            </div>
            <div className="pt-2 border-t border-ink-black/20">
              <span className="text-gray-500 uppercase block text-[10px] mb-1.5">CAPABILITIES REQUESTED:</span>
              <div className="flex flex-wrap gap-1.5">
                {selectedServices.map((svc) => (
                  <span
                    key={svc}
                    className="px-2 py-0.5 bg-white border border-ink-black text-[11px] font-black uppercase"
                  >
                    ✓ {svc}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Reset Action */}
          <button
            type="button"
            onClick={handleReset}
            className="neo-btn w-full sm:w-auto px-8 py-3.5 bg-ink-black text-white hover:bg-white hover:text-ink-black font-mono text-xs font-black uppercase tracking-wider flex items-center justify-center gap-2 cursor-pointer"
          >
            <RotateCcw className="w-4 h-4" />
            <span>DISPATCH ANOTHER BRIEF</span>
          </button>
        </div>
      ) : (
        /* ========================================================= */
        /* INTERACTIVE FORM                                          */
        /* ========================================================= */
        <form onSubmit={handleSubmit} className="space-y-8 font-mono">
          {/* ------------------------------------------------------- */}
          {/* STEP 1: SERVICES SELECTOR                               */}
          {/* ------------------------------------------------------- */}
          <div>
            <div className="flex items-center justify-between mb-3">
              <label className="text-xs font-black uppercase tracking-wider text-ink-black flex items-center gap-2">
                <span className="bg-accent-yellow px-1.5 py-0.5 border border-ink-black text-[11px]">
                  01
                </span>
                <span>SELECT ARCHITECTURAL CAPABILITY (MULTI-SELECT)</span>
              </label>
              <span className="text-[11px] text-gray-500 font-bold uppercase hidden sm:inline">
                {selectedServices.length} SELECTED
              </span>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2.5">
              {AVAILABLE_SERVICES.map((service) => {
                const isSelected = selectedServices.includes(service);
                return (
                  <button
                    key={service}
                    type="button"
                    onClick={() => toggleService(service)}
                    className={`p-3 text-left border-2 border-ink-black text-xs font-black uppercase transition-all flex items-center justify-between gap-2 cursor-pointer ${
                      isSelected
                        ? "bg-accent-yellow text-ink-black shadow-brut-sm translate-x-0.5 translate-y-0.5"
                        : "bg-paper-beige hover:bg-white text-gray-800 shadow-brut-xs"
                    }`}
                  >
                    <span className="truncate">{service}</span>
                    <span
                      className={`w-5 h-5 flex items-center justify-center border border-ink-black shrink-0 text-xs font-black ${
                        isSelected
                          ? "bg-ink-black text-accent-yellow"
                          : "bg-white text-gray-400"
                      }`}
                    >
                      {isSelected ? "✓" : "+"}
                    </span>
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* STEP 2: BUDGET TIER PILLS                               */}
          {/* ------------------------------------------------------- */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-ink-black mb-3">
              <span className="bg-accent-teal px-1.5 py-0.5 border border-ink-black text-[11px] mr-2">
                02
              </span>
              <span>ESTIMATED BUDGET ALLOCATION</span>
            </label>

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
              {BUDGET_TIERS.map((tier) => {
                const isSelected = selectedBudget === tier;
                return (
                  <button
                    key={tier}
                    type="button"
                    onClick={() => setSelectedBudget(tier)}
                    className={`py-3 px-2 border-2 border-ink-black text-center text-xs font-black uppercase transition-all cursor-pointer ${
                      isSelected
                        ? "bg-accent-teal text-ink-black shadow-brut-sm translate-x-0.5 translate-y-0.5"
                        : "bg-paper-beige hover:bg-white text-gray-700 shadow-brut-xs"
                    }`}
                  >
                    {tier}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* STEP 3: TIMELINE PILLS                                  */}
          {/* ------------------------------------------------------- */}
          <div>
            <label className="block text-xs font-black uppercase tracking-wider text-ink-black mb-3">
              <span className="bg-accent-red text-white px-1.5 py-0.5 border border-ink-black text-[11px] mr-2">
                03
              </span>
              <span>TARGET TIMELINE</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-3 gap-2.5">
              {TIMELINE_OPTIONS.map((timeline) => {
                const isSelected = selectedTimeline === timeline;
                return (
                  <button
                    key={timeline}
                    type="button"
                    onClick={() => setSelectedTimeline(timeline)}
                    className={`py-3 px-3 border-2 border-ink-black text-center text-xs font-black uppercase transition-all cursor-pointer ${
                      isSelected
                        ? "bg-ink-black text-white shadow-brut-sm translate-x-0.5 translate-y-0.5"
                        : "bg-paper-beige hover:bg-white text-gray-700 shadow-brut-xs"
                    }`}
                  >
                    {timeline}
                  </button>
                );
              })}
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* STEP 4: CONTACT INPUTS                                  */}
          {/* ------------------------------------------------------- */}
          <div className="space-y-4">
            <label className="block text-xs font-black uppercase tracking-wider text-ink-black">
              <span className="bg-white px-1.5 py-0.5 border border-ink-black text-[11px] mr-2 shadow-brut-xs">
                04
              </span>
              <span>CONTACT DOSSIER &amp; OBJECTIVES</span>
            </label>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-[11px] font-black uppercase text-gray-700 mb-1">
                  FULL NAME *
                </label>
                <input
                  required
                  type="text"
                  placeholder="E.G. ALEX REID"
                  value={formData.name}
                  onChange={(e) =>
                    setFormData({ ...formData, name: e.target.value })
                  }
                  className="w-full p-3.5 border-2 border-ink-black bg-paper-beige focus:bg-white text-xs font-bold text-ink-black focus:outline-none shadow-brut-sm transition-colors uppercase placeholder:text-gray-400"
                />
              </div>

              <div>
                <label className="block text-[11px] font-black uppercase text-gray-700 mb-1">
                  WORK EMAIL ADDRESS *
                </label>
                <input
                  required
                  type="email"
                  placeholder="ALEX@COMPANY.COM"
                  value={formData.email}
                  onChange={(e) =>
                    setFormData({ ...formData, email: e.target.value })
                  }
                  className="w-full p-3.5 border-2 border-ink-black bg-paper-beige focus:bg-white text-xs font-bold text-ink-black focus:outline-none shadow-brut-sm transition-colors uppercase placeholder:text-gray-400"
                />
              </div>
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-gray-700 mb-1">
                COMPANY / CURRENT WEBSITE URL (OPTIONAL)
              </label>
              <input
                type="text"
                placeholder="HTTPS://COMPANY.IO"
                value={formData.company}
                onChange={(e) =>
                  setFormData({ ...formData, company: e.target.value })
                }
                className="w-full p-3.5 border-2 border-ink-black bg-paper-beige focus:bg-white text-xs font-bold text-ink-black focus:outline-none shadow-brut-sm transition-colors uppercase placeholder:text-gray-400"
              />
            </div>

            <div>
              <label className="block text-[11px] font-black uppercase text-gray-700 mb-1">
                PROJECT GOALS, ARCHITECTURAL REQUIREMENTS &amp; SCOPE *
              </label>
              <textarea
                required
                rows={4}
                placeholder="DESCRIBE YOUR SYSTEM ARCHITECTURE, TARGET AUDIENCE, CORE WEB VITALS BENCHMARKS, OR DESIRED MIGRATION TIMELINE..."
                value={formData.goals}
                onChange={(e) =>
                  setFormData({ ...formData, goals: e.target.value })
                }
                className="w-full p-3.5 border-2 border-ink-black bg-paper-beige focus:bg-white text-xs font-bold text-ink-black focus:outline-none shadow-brut-sm transition-colors placeholder:text-gray-400"
              />
            </div>
          </div>

          {/* ------------------------------------------------------- */}
          {/* SUBMIT ACTION BUTTON                                    */}
          {/* ------------------------------------------------------- */}
          <div className="pt-2">
            <button
              type="submit"
              className="neo-btn w-full py-4.5 bg-ink-black text-white hover:bg-accent-yellow hover:text-ink-black font-mono font-black text-sm uppercase tracking-widest flex items-center justify-center gap-3 cursor-pointer group"
            >
              <span>TRANSMIT ARCHITECTURAL BRIEF</span>
              <Send className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
            </button>
            <div className="flex items-center justify-between text-[11px] font-bold text-gray-500 uppercase mt-2.5 px-1">
              <span>🔒 100% MUTUAL NDA ENFORCED</span>
              <span>⚡ GUARANTEED 4-HOUR TRIAGE</span>
            </div>
          </div>
        </form>
      )}
    </div>
  );
};
