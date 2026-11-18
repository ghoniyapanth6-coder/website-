"use client";

import React, { useState, useEffect } from "react";
import { motion, AnimatePresence } from "framer-motion";
import confetti from "canvas-confetti";
import { Sparkles, Terminal, Coffee, Zap } from "lucide-react";

interface MascotProps {
  size?: "sm" | "md" | "lg";
  className?: string;
  showDialogue?: boolean;
}

const QUOTES = [
  "100/100 Lighthouse or bust!",
  "Pushing to prod on Friday? Bold.",
  "Engineered with Next.js & caffeine ⚡",
  "Zero bloated plugins allowed.",
  "Web design without rules.",
  "Semantic HTML is our love language 💛",
];

export const Mascot: React.FC<MascotProps> = ({
  size = "md",
  className = "",
  showDialogue = true,
}) => {
  const [currentMascot, setCurrentMascot] = useState<"cat" | "coffee" | "skull">("cat");
  const [quoteIndex, setQuoteIndex] = useState(0);
  const [isInteracting, setIsInteracting] = useState(false);
  const [eyeOffset, setEyeOffset] = useState({ x: 0, y: 0 });

  // Mouse tracking for eyes
  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      const { innerWidth, innerHeight } = window;
      const x = (e.clientX / innerWidth - 0.5) * 5;
      const y = (e.clientY / innerHeight - 0.5) * 5;
      setEyeOffset({ x, y });
    };

    window.addEventListener("mousemove", handleMouseMove);
    return () => window.removeEventListener("mousemove", handleMouseMove);
  }, []);

  const handleClick = () => {
    // Fire subtle confetti
    try {
      confetti({
        particleCount: 28,
        spread: 60,
        origin: { y: 0.15, x: 0.85 },
        colors: ["#FFE600", "#FF3E1D", "#0A0A0A", "#38BDF8"],
      });
    } catch {
      // fallback
    }

    // Cycle through quotes & mascot modes
    setQuoteIndex((prev) => (prev + 1) % QUOTES.length);
    setIsInteracting(true);
    setTimeout(() => setIsInteracting(false), 800);

    // Switch mascot occasionally
    const mascots: Array<"cat" | "coffee" | "skull"> = ["cat", "coffee", "skull"];
    const nextMascot = mascots[(mascots.indexOf(currentMascot) + 1) % mascots.length];
    setCurrentMascot(nextMascot);
  };

  const dimensions = {
    sm: "w-8 h-8",
    md: "w-11 h-11",
    lg: "w-16 h-16",
  }[size];

  return (
    <div className={`relative inline-flex items-center group select-none ${className}`}>
      {/* Interactive Mascot Canvas / SVG */}
      <motion.button
        type="button"
        onClick={handleClick}
        whileHover={{ scale: 1.08, rotate: [0, -3, 3, 0] }}
        whileTap={{ scale: 0.92 }}
        className={`relative ${dimensions} flex items-center justify-center bg-accent-yellow border-2 border-ink-black rounded-lg shadow-brut-sm hover:bg-white transition-colors cursor-pointer p-1`}
        title="Click to interact with the agency mascot!"
      >
        {currentMascot === "cat" && (
          /* Brutalist Black Cat Mascot inspired by Image 1 */
          <svg viewBox="0 0 100 100" className="w-full h-full fill-ink-black overflow-visible">
            {/* Cat Ears */}
            <polygon points="20,40 10,12 42,28" className="fill-ink-black" />
            <polygon points="80,40 90,12 58,28" className="fill-ink-black" />
            <polygon points="24,35 18,18 38,28" className="fill-accent-pink" />
            <polygon points="76,35 82,18 62,28" className="fill-accent-pink" />

            {/* Cat Head */}
            <circle cx="50" cy="55" r="38" className="fill-ink-black" />

            {/* Cat Big Eyes (Image 1 style) */}
            <ellipse cx="36" cy="50" rx="10" ry="12" className="fill-white" />
            <ellipse cx="64" cy="50" rx="10" ry="12" className="fill-white" />

            {/* Pupils moving with mouse */}
            <circle
              cx={36 + eyeOffset.x}
              cy={50 + eyeOffset.y}
              r="6"
              className="fill-accent-yellow"
            />
            <circle
              cx={36 + eyeOffset.x + 1}
              cy={50 + eyeOffset.y}
              r="3"
              className="fill-ink-black"
            />

            <circle
              cx={64 + eyeOffset.x}
              cy={50 + eyeOffset.y}
              r="6"
              className="fill-accent-yellow"
            />
            <circle
              cx={64 + eyeOffset.x + 1}
              cy={50 + eyeOffset.y}
              r="3"
              className="fill-ink-black"
            />

            {/* Nose & Whiskers */}
            <polygon points="50,62 47,59 53,59" className="fill-accent-pink" />
            <line x1="26" y1="62" x2="10" y2="60" stroke="#FFE600" strokeWidth="2.5" />
            <line x1="26" y1="66" x2="12" y2="70" stroke="#FFE600" strokeWidth="2.5" />
            <line x1="74" y1="62" x2="90" y2="60" stroke="#FFE600" strokeWidth="2.5" />
            <line x1="74" y1="66" x2="88" y2="70" stroke="#FFE600" strokeWidth="2.5" />
          </svg>
        )}

        {currentMascot === "coffee" && (
          /* Quirky Coffee Mug with glasses from Image 1 */
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Steam */}
            <path
              d="M40,15 Q35,8 40,2"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinecap="round"
            />
            <path
              d="M60,15 Q65,8 60,2"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinecap="round"
            />

            {/* Mug Body */}
            <rect
              x="20"
              y="25"
              width="55"
              height="58"
              rx="8"
              className="fill-accent-yellow stroke-ink-black stroke-[3.5]"
            />
            {/* Handle */}
            <path
              d="M75,36 C88,36 88,65 75,65"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="4"
              strokeLinecap="round"
            />

            {/* Glasses */}
            <circle cx="36" cy="48" r="9" className="fill-white stroke-ink-black stroke-2" />
            <circle cx="58" cy="48" r="9" className="fill-white stroke-ink-black stroke-2" />
            <line x1="45" y1="48" x2="49" y2="48" stroke="#0A0A0A" strokeWidth="3" />

            {/* Pupils */}
            <circle cx={36 + eyeOffset.x * 0.8} cy={48 + eyeOffset.y * 0.8} r="4" fill="#0A0A0A" />
            <circle cx={58 + eyeOffset.x * 0.8} cy={48 + eyeOffset.y * 0.8} r="4" fill="#0A0A0A" />

            {/* Smile */}
            <path
              d="M40,64 Q47,72 54,64"
              fill="none"
              stroke="#0A0A0A"
              strokeWidth="3"
              strokeLinecap="round"
            />
          </svg>
        )}

        {currentMascot === "skull" && (
          /* Retro Skeleton with Red Fedora from Image 1 bottom footer */
          <svg viewBox="0 0 100 100" className="w-full h-full overflow-visible">
            {/* Red Fedora Hat */}
            <ellipse cx="50" cy="30" rx="36" ry="6" className="fill-accent-red stroke-ink-black stroke-2" />
            <path d="M30,30 L32,15 L68,15 L70,30 Z" className="fill-accent-red stroke-ink-black stroke-2" />
            <rect x="32" y="24" width="36" height="4" fill="#0A0A0A" />

            {/* Skull Face */}
            <circle cx="50" cy="54" r="24" className="fill-white stroke-ink-black stroke-2" />
            <rect x="42" y="70" width="16" height="12" className="fill-white stroke-ink-black stroke-2" />

            {/* Eye sockets */}
            <ellipse cx="42" cy="52" rx="6" ry="7" fill="#0A0A0A" />
            <ellipse cx="58" cy="52" rx="6" ry="7" fill="#0A0A0A" />
            <circle cx={42 + eyeOffset.x * 0.5} cy={52 + eyeOffset.y * 0.5} r="2" fill="#FFE600" />
            <circle cx={58 + eyeOffset.x * 0.5} cy={52 + eyeOffset.y * 0.5} r="2" fill="#FFE600" />

            {/* Nose & Teeth */}
            <polygon points="50,60 48,65 52,65" fill="#0A0A0A" />
            <line x1="46" y1="76" x2="46" y2="82" stroke="#0A0A0A" strokeWidth="2" />
            <line x1="50" y1="76" x2="50" y2="82" stroke="#0A0A0A" strokeWidth="2" />
            <line x1="54" y1="76" x2="54" y2="82" stroke="#0A0A0A" strokeWidth="2" />
          </svg>
        )}

        {/* Live Pulse Indicator Dot */}
        <span className="absolute -top-1 -right-1 flex h-3 w-3">
          <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-accent-red opacity-75"></span>
          <span className="relative inline-flex rounded-full h-3 w-3 bg-accent-red border border-ink-black"></span>
        </span>
      </motion.button>

      {/* Speech Bubble / Dialogue tooltip */}
      {showDialogue && (
        <AnimatePresence mode="wait">
          <motion.div
            key={quoteIndex}
            initial={{ opacity: 0, y: -4, scale: 0.95 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 4, scale: 0.95 }}
            transition={{ duration: 0.15 }}
            className="hidden sm:flex items-center ml-2.5 bg-paper px-2.5 py-1 border-2 border-ink-black shadow-brut-sm text-[11px] font-mono font-bold text-ink-black whitespace-nowrap"
          >
            <span className="text-accent-red mr-1.5 font-black">&gt;</span>
            {QUOTES[quoteIndex]}
          </motion.div>
        </AnimatePresence>
      )}
    </div>
  );
};
