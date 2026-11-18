"use client";

import React, { useState } from "react";
import confetti from "canvas-confetti";
import { ArrowDown, Sparkles } from "lucide-react";

export const ServicesInteractiveAsterisk: React.FC = () => {
  const [rotated, setRotated] = useState(false);

  const handleClick = () => {
    setRotated(!rotated);
    try {
      confetti({
        particleCount: 45,
        spread: 75,
        origin: { y: 0.35, x: 0.5 },
        colors: ["#FFE600", "#FF3E1D", "#00C2CB", "#000000"],
      });
    } catch {
      // ignore
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      title="Click for celebratory confetti!"
      className="inline-flex items-center justify-center w-12 h-12 sm:w-14 sm:h-14 bg-white border-2 border-ink-black font-condensed font-black text-3xl sm:text-4xl text-ink-black shadow-brut-sm hover:bg-accent-yellow active:translate-x-0.5 active:translate-y-0.5 cursor-pointer transition-all duration-300"
      style={{
        transform: rotated ? "rotate(180deg) scale(1.08)" : "rotate(0deg)",
      }}
    >
      ✱
    </button>
  );
};

interface JumpItem {
  id: string;
  label: string;
  number: string;
}

const JUMP_ITEMS: JumpItem[] = [
  { id: "fullstack", label: "NEXT.JS 14 DEV", number: "01" },
  { id: "uiux", label: "CONVERSION UI/UX", number: "02" },
  { id: "branding", label: "BRAND IDENTITY", number: "03" },
  { id: "seo", label: "TECHNICAL SEO", number: "04" },
  { id: "consultation", label: "TALK ARCHITECT", number: "05" },
];

export const ServicesJumpBar: React.FC = () => {
  const [activeTab, setActiveTab] = useState<string>("fullstack");

  const scrollToSection = (id: string) => {
    setActiveTab(id);
    const element = document.getElementById(id);
    if (element) {
      const yOffset = -75; // Account for sticky navbar height
      const y = element.getBoundingClientRect().top + window.pageYOffset + yOffset;
      window.scrollTo({ top: y, behavior: "smooth" });
    }
  };

  return (
    <div className="w-full bg-white border-b-2 border-ink-black select-none sticky top-[64px] md:top-[72px] z-40 shadow-xs">
      <div className="w-full flex items-center overflow-x-auto divide-x-2 divide-ink-black scrollbar-none">
        <div className="px-4 py-3 bg-neutral-100 font-mono text-[11px] font-black uppercase text-gray-700 shrink-0 flex items-center gap-2">
          <span className="w-2 h-2 rounded-full bg-accent-red animate-pulse" />
          <span>JUMP TO:</span>
        </div>

        {JUMP_ITEMS.map((item) => {
          const isActive = activeTab === item.id;
          return (
            <button
              key={item.id}
              type="button"
              onClick={() => scrollToSection(item.id)}
              className={`px-4 sm:px-6 py-3 font-mono text-xs font-black uppercase tracking-wider shrink-0 transition-colors flex items-center gap-2 cursor-pointer ${
                isActive
                  ? "bg-accent-yellow text-ink-black"
                  : "bg-white text-ink-black hover:bg-neutral-100"
              }`}
            >
              <span className="text-gray-400 font-bold">{item.number}</span>
              <span>{item.label}</span>
              {isActive && <span className="text-accent-red">●</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
