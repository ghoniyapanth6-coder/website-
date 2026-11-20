"use client";

import React, { useState } from "react";
import { Send, CheckCircle2, Mail, Phone, MapPin, Clock, ShieldCheck, ArrowUpRight } from "lucide-react";
import confetti from "canvas-confetti";

export const SimpleContactForm: React.FC = () => {
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    subject: "Next.js Web Development",
    message: "",
  });

  const [isSubmitting, setIsSubmitting] = useState(false);
  const [errorMessage, setErrorMessage] = useState<string | null>(null);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [copiedEmail, setCopiedEmail] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setIsSubmitting(true);
    setErrorMessage(null);

    try {
      const res = await fetch("/api/inquiries", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          name: formData.name.trim(),
          email: formData.email.trim(),
          phone: formData.phone.trim() || undefined,
          company: "Direct Web Inquiry",
          service: formData.subject,
          message: formData.message.trim(),
          budget: "$10K - $25K",
          timeline: "Standard 3-4 Weeks",
        }),
      });

      if (!res.ok) {
        const errorData = await res.json().catch(() => null);
        throw new Error(
          errorData?.detail ||
          errorData?.title ||
          "Failed to transmit inquiry to server. Please check your connection and try again."
        );
      }

      try {
        confetti({
          particleCount: 50,
          spread: 80,
          origin: { y: 0.4 },
          colors: ["#FFE600", "#FF3E1D", "#00C2CB", "#000000"],
        });
      } catch {
        // fallback
      }
      setIsSubmitted(true);
    } catch (err: unknown) {
      const msg = err instanceof Error ? err.message : "Network error. Please try again.";
      setErrorMessage(msg);
    } finally {
      setIsSubmitting(false);
    }
  };

  const copyEmail = () => {
    if (navigator?.clipboard) {
      navigator.clipboard.writeText("hello@codeclovers.dev");
      setCopiedEmail(true);
      setTimeout(() => setCopiedEmail(false), 2500);
    }
  };

  return (
    <div className="grid grid-cols-1 lg:grid-cols-12 w-full border-b-2 border-ink-black bg-white">
      {/* ========================================================= */}
      {/* Left Column (7 cols): Clean Standard Contact Form         */}
      {/* ========================================================= */}
      <div className="lg:col-span-7 p-6 sm:p-10 md:p-14 lg:p-16 border-b-2 lg:border-b-0 lg:border-r-2 border-ink-black bg-white flex flex-col justify-between">
        <div>
          <div className="mb-8">
            <span className="font-mono text-xs font-black uppercase text-accent-red bg-accent-yellow px-2.5 py-1 border border-ink-black shadow-brut-xs inline-block mb-3">
              // SEND US A MESSAGE
            </span>
            <h2 className="font-display font-black text-3xl sm:text-4xl uppercase tracking-tight text-ink-black">
              LET&apos;S TALK ABOUT YOUR PROJECT
            </h2>
            <p className="font-sans text-sm sm:text-base text-neutral-600 mt-2 font-normal leading-relaxed max-w-xl">
              Fill out the form below with your project details. We review all technical and design inquiries and reply within 4 business hours.
            </p>
          </div>

          {isSubmitted ? (
            <div className="p-8 sm:p-10 bg-accent-yellow border-2 border-ink-black shadow-brut text-center flex flex-col items-center my-6">
              <CheckCircle2 className="w-16 h-16 text-ink-black stroke-[2.5] mb-4" />
              <h3 className="font-display font-black text-3xl uppercase tracking-tight text-ink-black mb-2">
                MESSAGE RECEIVED!
              </h3>
              <p className="font-sans text-sm font-semibold text-neutral-900 max-w-md mb-6 leading-relaxed">
                Thank you, <strong className="text-ink-black font-black">{formData.name || "friend"}</strong>. Your inquiry has been sent to our lead engineering team. We will review it and reply to <strong className="text-ink-black font-black">{formData.email}</strong> within 4 business hours.
              </p>
              <button
                type="button"
                onClick={() => {
                  setIsSubmitted(false);
                  setFormData({ name: "", email: "", phone: "", subject: "Next.js Web Development", message: "" });
                }}
                className="px-8 py-3.5 bg-ink-black text-white font-mono text-xs font-black uppercase hover:bg-white hover:text-ink-black border-2 border-ink-black transition-colors shadow-brut-xs cursor-pointer"
              >
                SEND ANOTHER MESSAGE
              </button>
            </div>
          ) : (
            <form onSubmit={handleSubmit} className="space-y-5 font-sans">
              {/* Row 1: Name and Email */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs font-black uppercase text-ink-black mb-2">
                    YOUR NAME <span className="text-accent-red">*</span>
                  </label>
                  <input
                    required
                    type="text"
                    placeholder="e.g. John Doe"
                    value={formData.name}
                    onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                    className="w-full p-3.5 border-2 border-ink-black bg-white focus:bg-accent-yellow/10 text-sm font-medium text-ink-black focus:outline-none shadow-brut-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-black uppercase text-ink-black mb-2">
                    EMAIL ADDRESS <span className="text-accent-red">*</span>
                  </label>
                  <input
                    required
                    type="email"
                    placeholder="e.g. john@company.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    className="w-full p-3.5 border-2 border-ink-black bg-white focus:bg-accent-yellow/10 text-sm font-medium text-ink-black focus:outline-none shadow-brut-xs transition-colors"
                  />
                </div>
              </div>

              {/* Row 2: Phone and Subject */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                <div>
                  <label className="block font-mono text-xs font-black uppercase text-ink-black mb-2">
                    PHONE NUMBER <span className="text-gray-400 font-normal">(OPTIONAL)</span>
                  </label>
                  <input
                    type="tel"
                    placeholder="e.g. +1 (555) 000-0000"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                    className="w-full p-3.5 border-2 border-ink-black bg-white focus:bg-accent-yellow/10 text-sm font-medium text-ink-black focus:outline-none shadow-brut-xs transition-colors"
                  />
                </div>

                <div>
                  <label className="block font-mono text-xs font-black uppercase text-ink-black mb-2">
                    SERVICE / INQUIRY TYPE
                  </label>
                  <select
                    value={formData.subject}
                    onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                    className="w-full p-3.5 border-2 border-ink-black bg-white focus:bg-accent-yellow/10 text-sm font-bold text-ink-black focus:outline-none shadow-brut-xs cursor-pointer uppercase font-mono"
                  >
                    <option value="Next.js Web Development">01 // NEXT.JS WEB DEVELOPMENT</option>
                    <option value="UI/UX Design Systems">02 // UI/UX DESIGN SYSTEMS</option>
                    <option value="Strategic Branding & Identity">03 // BRANDING &amp; IDENTITY</option>
                    <option value="Technical SEO & Speed">04 // TECHNICAL SEO &amp; SPEED</option>
                    <option value="Full-Stack Node.js Architecture">05 // FULL-STACK BACKEND</option>
                    <option value="Continuous Retained SLA">06 // CONTINUOUS RETAINED SLA</option>
                    <option value="General Technical Inquiry">07 // GENERAL INQUIRY</option>
                  </select>
                </div>
              </div>

              {/* Row 3: Message */}
              <div>
                <label className="block font-mono text-xs font-black uppercase text-ink-black mb-2">
                  YOUR MESSAGE <span className="text-accent-red">*</span>
                </label>
                <textarea
                  required
                  rows={5}
                  placeholder="Tell us about your project, goals, estimated timeline, and any specific requirements..."
                  value={formData.message}
                  onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                  className="w-full p-3.5 border-2 border-ink-black bg-white focus:bg-accent-yellow/10 text-sm font-medium text-ink-black focus:outline-none shadow-brut-xs transition-colors"
                />
              </div>

              {/* Error Alert */}
              {errorMessage && (
                <div className="p-3 bg-red-50 border-2 border-accent-red text-ink-black text-xs font-mono font-bold flex items-start gap-2 shadow-brut-xs">
                  <span className="text-accent-red font-black">✕</span>
                  <span>{errorMessage}</span>
                </div>
              )}

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className="w-full py-4.5 px-8 bg-ink-black text-white hover:bg-accent-yellow hover:text-ink-black disabled:bg-neutral-600 border-2 border-ink-black font-mono font-black text-sm uppercase tracking-wider transition-all duration-150 shadow-brut flex items-center justify-center gap-3 cursor-pointer group disabled:cursor-not-allowed"
                >
                  {isSubmitting ? (
                    <>
                      <span className="w-4 h-4 border-2 border-white border-t-transparent rounded-full animate-spin" />
                      <span>TRANSMITTING INQUIRY...</span>
                    </>
                  ) : (
                    <>
                      <span>SEND MESSAGE</span>
                      <Send className="w-4 h-4 text-accent-yellow group-hover:text-ink-black group-hover:translate-x-1 transition-transform" />
                    </>
                  )}
                </button>
                <div className="flex items-center justify-between text-[11px] font-mono text-gray-500 uppercase mt-2.5">
                  <span>🔒 100% PRIVATE &amp; SECURE</span>
                  <span>⚡ 4-HOUR INQUIRY RESPONSE SLA</span>
                </div>
              </div>
            </form>
          )}
        </div>
      </div>

      {/* ========================================================= */}
      {/* Right Column (5 cols): Direct Contact Coordinates         */}
      {/* ========================================================= */}
      <div className="lg:col-span-5 p-6 sm:p-10 md:p-12 lg:p-14 bg-paper-beige flex flex-col justify-between paper-ruled-bg">
        <div className="space-y-6">
          {/* Header */}
          <div>
            <span className="font-mono text-xs font-black uppercase text-accent-red tracking-wider block mb-2">
              // DIRECT REACH
            </span>
            <h3 className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tight text-ink-black leading-tight">
              STUDIO CONTACT INFO
            </h3>
            <p className="font-sans text-xs sm:text-sm text-neutral-600 mt-1 font-normal">
              Reach out directly via email, phone, or schedule a technical call with our engineering leads.
            </p>
          </div>

          {/* Info Cards */}
          <div className="space-y-3 font-mono text-xs">
            {/* Email Card */}
            <div className="p-4 bg-white border-2 border-ink-black shadow-brut-xs flex items-center justify-between">
              <div className="flex items-center gap-3.5">
                <div className="w-9 h-9 rounded-none bg-accent-yellow border border-ink-black flex items-center justify-center shrink-0">
                  <Mail className="w-4 h-4 text-ink-black stroke-[2.5]" />
                </div>
                <div>
                  <span className="text-[10px] font-bold text-gray-500 uppercase block">DIRECT EMAIL</span>
                  <a
                    href="mailto:hello@codeclovers.dev"
                    className="font-bold text-ink-black hover:text-accent-red transition-colors text-xs sm:text-sm"
                  >
                    hello@codeclovers.dev
                  </a>
                </div>
              </div>
              <button
                type="button"
                onClick={copyEmail}
                className="px-2.5 py-1 bg-paper-beige border border-ink-black font-mono text-[10px] font-black uppercase hover:bg-ink-black hover:text-white transition-colors"
              >
                {copiedEmail ? "COPIED!" : "COPY"}
              </button>
            </div>

            {/* Phone Card */}
            <div className="p-4 bg-white border-2 border-ink-black shadow-brut-xs flex items-center gap-3.5">
              <div className="w-9 h-9 rounded-none bg-accent-teal border border-ink-black flex items-center justify-center shrink-0">
                <Phone className="w-4 h-4 text-ink-black stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase block">STUDIO HOTLINE</span>
                <a
                  href="tel:+14158904221"
                  className="font-bold text-ink-black hover:text-accent-red transition-colors text-xs sm:text-sm"
                >
                  +1 (415) 890-4221
                </a>
              </div>
            </div>

            {/* Location Card */}
            <div className="p-4 bg-white border-2 border-ink-black shadow-brut-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-none bg-accent-red text-white border border-ink-black flex items-center justify-center shrink-0 mt-0.5">
                <MapPin className="w-4 h-4 text-white stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase block">PHYSICAL LOCATION</span>
                <span className="font-bold text-ink-black block leading-snug">
                  Market Street, SoMa District
                </span>
                <span className="text-neutral-600 text-[11px] block">
                  San Francisco, CA 94103 • USA
                </span>
              </div>
            </div>

            {/* Hours Card */}
            <div className="p-4 bg-white border-2 border-ink-black shadow-brut-xs flex items-start gap-3.5">
              <div className="w-9 h-9 rounded-none bg-neutral-950 text-accent-yellow border border-ink-black flex items-center justify-center shrink-0 mt-0.5">
                <Clock className="w-4 h-4 stroke-[2.5]" />
              </div>
              <div>
                <span className="text-[10px] font-bold text-gray-500 uppercase block">STUDIO OPERATING HOURS</span>
                <span className="font-bold text-ink-black block">
                  Monday – Friday: 9:00 AM – 6:00 PM PST
                </span>
                <span className="text-emerald-700 text-[11px] font-bold flex items-center gap-1.5 mt-0.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  Engineering dispatch active worldwide
                </span>
              </div>
            </div>
          </div>

          {/* Quick Consultation Highlight */}
          <div className="p-5 bg-white border-2 border-ink-black shadow-brut-xs">
            <div className="flex items-center justify-between mb-2">
              <span className="font-mono text-[10px] font-black uppercase text-accent-red bg-accent-red/10 px-2 py-0.5 border border-accent-red">
                NEED IMMEDIATE SCOPING?
              </span>
              <span className="font-mono text-[10px] text-gray-500 font-bold">30-MIN SESSION</span>
            </div>
            <h4 className="font-display font-black text-base uppercase text-ink-black">
              SCHEDULE A DIRECT ARCHITECT CALL
            </h4>
            <p className="font-sans text-xs text-neutral-600 mt-1 mb-3 leading-relaxed">
              Skip the email back-and-forth. Book a 30-minute technical session directly with our Lead Architect to review your codebase or product specifications.
            </p>
            <a
              href="mailto:hello@codeclovers.dev?subject=Schedule%2030-Min%20Technical%20Architecture%20Call"
              className="inline-flex items-center gap-1.5 font-mono text-xs font-black uppercase text-ink-black hover:text-accent-red transition-colors"
            >
              <span>REQUEST ARCHITECT CALENDAR LINK</span>
              <ArrowUpRight className="w-4 h-4 stroke-[2.5]" />
            </a>
          </div>
        </div>

        {/* Bottom Studio Signature */}
        <div className="pt-6 border-t-2 border-ink-black font-mono text-xs font-bold text-neutral-600 flex items-center justify-between mt-6">
          <span>CODECLOVERS STUDIO</span>
          <span className="text-ink-black font-black">SAN FRANCISCO • EST. 2026</span>
        </div>
      </div>
    </div>
  );
};
