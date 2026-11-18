"use client";

import React from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

export const StatusMarquee: React.FC = () => {
  return (
    <div className="w-full bg-white border-b-2 border-ink-black flex flex-col md:flex-row items-stretch select-none text-[12px] md:text-[13px] font-mono uppercase tracking-wider font-bold">
      {/* Box 1: (2026) */}
      <div className="flex items-center px-6 py-3 border-b-2 md:border-b-0 md:border-r-2 border-ink-black bg-white shrink-0">
        <span className="text-ink-black font-extrabold tracking-tight">(2026)</span>
      </div>

      {/* Box 2: Statement + Arrow (From Image 3) */}
      <div className="flex-1 flex items-center justify-between px-6 py-3 bg-white border-b-2 md:border-b-0 md:border-r-2 border-ink-black">
        <span className="text-ink-black font-black tracking-wide">
          WE DON&apos;T FOLLOW TRENDS. WE SET DIRECTIONS.
        </span>
        <ArrowRight className="w-4 h-4 text-ink-black shrink-0 ml-4 hidden sm:block" />
      </div>

      {/* Box 3: Available for new projects pill (Exactly as in Image 3) */}
      <Link
        href="/contact"
        className="flex items-center justify-between md:justify-center gap-3 px-6 py-3 bg-accent-yellow hover:bg-ink-black hover:text-accent-yellow text-ink-black transition-colors shrink-0 group"
      >
        <span className="font-mono font-black text-xs md:text-[13px] tracking-tight">
          AVAILABLE FOR NEW PROJECTS
        </span>
        <span className="w-2.5 h-2.5 rounded-full bg-ink-black group-hover:bg-accent-yellow shrink-0"></span>
      </Link>
    </div>
  );
};
