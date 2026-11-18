"use client";

import React, { useState } from "react";
import { Navbar } from "@/components/Navbar";
import { StatusMarquee } from "@/components/StatusMarquee";
import { ArrowUpRight, CheckCircle2, Send, Sparkles, Mail, MapPin, Clock } from "lucide-react";
import confetti from "canvas-confetti";

export default function ContactPage() {
  const [selectedServices, setSelectedServices] = useState<string[]>(["NEXT.JS WEB APP"]);
  const [selectedBudget, setSelectedBudget] = useState<string>("$5K - $10K");
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    company: "",
    message: "",
  });
  const [isSubmitted, setIsSubmitted] = useState(false);

  const toggleService = (service: string) => {
    setSelectedServices((prev) =>
      prev.includes(service) ? prev.filter((s) => s !== service) : [...prev, service]
    );
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    try {
      confetti({
        particleCount: 50,
        spread: 80,
        origin: { y: 0.3 },
        colors: ["#FFE600", "#FF3E1D", "#00C2CB", "#000000"],
      });
    } catch {
      // fallback
    }
    setIsSubmitted(true);
  };

  return (
    <div className="min-h-screen bg-paper-beige flex flex-col font-sans select-none">
      <Navbar />
      <StatusMarquee />

      <main className="flex-1 w-full">
        {/* Header */}
        <section className="p-8 sm:p-14 md:p-16 border-b-2 border-ink-black bg-white paper-ruled-bg text-center">
          <div className="max-w-6xl mx-auto">
            <span className="font-mono text-xs font-black uppercase text-ink-black bg-accent-red text-white px-3 py-1 border-2 border-ink-black shadow-brut-sm inline-block mb-4">
              [ 05 // INITIALIZE COLLABORATION ]
            </span>
            <h1 className="font-display font-black text-5xl sm:text-6xl md:text-7xl uppercase tracking-tighter text-ink-black mb-4">
              LET&apos;S BUILD SOMETHING ICONIC.
            </h1>
            <p className="font-mono text-xs sm:text-sm md:text-base font-bold uppercase text-gray-600 max-w-xl mx-auto">
              Fill out the project estimator below. We review all technical inquiries within 4 business hours.
            </p>
          </div>
        </section>

        {/* Content Grid: Form (7 cols) + Direct Agency Coordinates (5 cols) - Full Width */}
        <section className="grid grid-cols-1 lg:grid-cols-12 w-full border-b-2 border-ink-black bg-white">
          {/* Form Column */}
          <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black bg-white">
            {isSubmitted ? (
              <div className="neo-card p-8 bg-accent-yellow text-center flex flex-col items-center">
                <CheckCircle2 className="w-16 h-16 text-ink-black stroke-[2.5] mb-4" />
                <h2 className="font-display font-black text-3xl uppercase tracking-tight text-ink-black mb-2">
                  TRANSMISSION RECEIVED!
                </h2>
                <p className="font-mono text-xs font-bold uppercase text-ink-black max-w-md mb-6">
                  Thank you, {formData.name || "partner"}. An engineering lead will review your brief and reply to {formData.email || "your inbox"} within 4 business hours.
                </p>
                <button
                  type="button"
                  onClick={() => setIsSubmitted(false)}
                  className="neo-btn px-6 py-2.5 bg-ink-black text-white font-mono text-xs font-black uppercase hover:bg-white hover:text-ink-black"
                >
                  SEND ANOTHER BRIEF
                </button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-8 font-mono">
                {/* Step 1: Select Services */}
                <div>
                  <label className="block text-xs font-black uppercase text-gray-700 mb-3">
                    01 // SELECT SERVICE(S) REQUIRED
                  </label>
                  <div className="flex flex-wrap gap-2.5">
                    {[
                      "NEXT.JS WEB APP",
                      "FULL-STACK NODE.JS",
                      "TECHNICAL SEO OVERHAUL",
                      "UI/UX DESIGN SYSTEM",
                      "HEADLESS E-COMMERCE",
                    ].map((service) => {
                      const isSelected = selectedServices.includes(service);
                      return (
                        <button
                          key={service}
                          type="button"
                          onClick={() => toggleService(service)}
                          className={`px-3.5 py-2 border-2 border-ink-black text-xs font-black uppercase shadow-brut-sm transition-all ${
                            isSelected
                              ? "bg-accent-yellow text-ink-black"
                              : "bg-paper-beige hover:bg-white text-gray-700"
                          }`}
                        >
                          {isSelected ? "✓ " : "+ "}
                          {service}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 2: Select Budget */}
                <div>
                  <label className="block text-xs font-black uppercase text-gray-700 mb-3">
                    02 // ESTIMATED BUDGET TIER
                  </label>
                  <div className="grid grid-cols-2 sm:grid-cols-4 gap-2.5">
                    {["$2K - $5K", "$5K - $10K", "$10K - $25K", "$25K+"].map((tier) => {
                      const isSelected = selectedBudget === tier;
                      return (
                        <button
                          key={tier}
                          type="button"
                          onClick={() => setSelectedBudget(tier)}
                          className={`p-2.5 border-2 border-ink-black text-center text-xs font-black uppercase shadow-brut-sm transition-all ${
                            isSelected
                              ? "bg-accent-teal text-black"
                              : "bg-paper-beige hover:bg-white text-gray-700"
                          }`}
                        >
                          {tier}
                        </button>
                      );
                    })}
                  </div>
                </div>

                {/* Step 3: Contact Inputs */}
                <div className="space-y-4">
                  <label className="block text-xs font-black uppercase text-gray-700">
                    03 // YOUR DETAILS
                  </label>
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <input
                        required
                        type="text"
                        placeholder="YOUR FULL NAME *"
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        className="w-full p-3.5 border-2 border-ink-black bg-paper-beige focus:bg-white text-xs font-bold text-ink-black focus:outline-none shadow-brut-sm"
                      />
                    </div>
                    <div>
                      <input
                        required
                        type="email"
                        placeholder="WORK EMAIL ADDRESS *"
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        className="w-full p-3.5 border-2 border-ink-black bg-paper-beige focus:bg-white text-xs font-bold text-ink-black focus:outline-none shadow-brut-sm"
                      />
                    </div>
                  </div>

                  <div>
                    <input
                      type="text"
                      placeholder="COMPANY OR CURRENT WEBSITE URL"
                      value={formData.company}
                      onChange={(e) => setFormData({ ...formData, company: e.target.value })}
                      className="w-full p-3.5 border-2 border-ink-black bg-paper-beige focus:bg-white text-xs font-bold text-ink-black focus:outline-none shadow-brut-sm"
                    />
                  </div>

                  <div>
                    <textarea
                      required
                      rows={4}
                      placeholder="TELL US ABOUT YOUR PROJECT, GOALS & TIMELINE *"
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      className="w-full p-3.5 border-2 border-ink-black bg-paper-beige focus:bg-white text-xs font-bold text-ink-black focus:outline-none shadow-brut-sm"
                    />
                  </div>
                </div>

                {/* Submit Action */}
                <button
                  type="submit"
                  className="neo-btn w-full py-4.5 bg-ink-black text-white font-mono font-black text-sm uppercase tracking-wider hover:bg-accent-yellow hover:text-ink-black flex items-center justify-center gap-3"
                >
                  <span>TRANSMIT PROJECT BRIEF</span>
                  <Send className="w-4 h-4" />
                </button>
              </form>
            )}
          </div>

          {/* Right Agency Coordinates Column */}
          <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 bg-paper-beige flex flex-col justify-between paper-grid-bg">
            <div className="space-y-8 font-mono">
              <div className="neo-card p-6 bg-white">
                <span className="font-mono text-xs font-black uppercase text-accent-red block mb-1">
                  DIRECT ACCESS
                </span>
                <h3 className="font-display font-black text-2xl uppercase tracking-tight text-ink-black mb-4">
                  AGENCY COORDINATES
                </h3>

                <div className="space-y-4 text-xs font-bold">
                  <div className="flex items-center gap-3">
                    <Mail className="w-4 h-4 text-ink-black" />
                    <span>hello@brutdev.agency</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <Clock className="w-4 h-4 text-accent-teal" />
                    <span>AVERAGE REPLY: UNDER 4 HOURS</span>
                  </div>
                  <div className="flex items-center gap-3">
                    <MapPin className="w-4 h-4 text-accent-magenta" />
                    <span>GLOBAL DIGITAL STUDIO • UTC TIMEZONE</span>
                  </div>
                </div>
              </div>

              <div className="neo-card p-6 bg-accent-yellow">
                <h4 className="font-display font-black text-lg uppercase text-ink-black mb-2">
                  CLIENT GUARANTEE
                </h4>
                <p className="font-mono text-xs font-bold uppercase text-ink-black leading-relaxed">
                  Every project is backed by our 100/100 Lighthouse speed guarantee, full clean source code handoff, and zero vendor lock-in.
                </p>
              </div>
            </div>

            <div className="pt-8 border-t-2 border-ink-black font-mono text-xs font-black uppercase text-gray-500">
              BRUT.DEV // VERSION 2.6 // ALWAYS IN PRODUCTION
            </div>
          </div>
        </section>
      </main>
    </div>
  );
}
