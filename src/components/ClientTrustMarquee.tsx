"use client";

import React, { useState } from "react";

interface BrandItem {
  name: string;
  symbol: string;
  metric: string;
  hoverColor: string;
}

const BRANDS: BrandItem[] = [
  {
    name: "NEXTWAVE",
    symbol: "▲",
    metric: "+340% MRR // 14-DAY REBUILD",
    hoverColor: "hover:text-accent-red",
  },
  {
    name: "GRIDFLOW",
    symbol: "◆",
    metric: "100/100 LIGHTHOUSE // NEXT.JS 14",
    hoverColor: "hover:text-accent-teal",
  },
  {
    name: "HYPERSCALE",
    symbol: "●",
    metric: "2.4M MONTHLY USERS // ZERO DOWNTIME",
    hoverColor: "hover:text-accent-yellow",
  },
  {
    name: "MONOLITH.IO",
    symbol: "✦",
    metric: "SERIES A FUNDED // FASTIFY MICROSERVICES",
    hoverColor: "hover:text-accent-magenta",
  },
  {
    name: "VECTOR.AI",
    symbol: "■",
    metric: "SUB-150MS TTFB // REDIS EDGE CACHE",
    hoverColor: "hover:text-ink-black",
  },
];

export const ClientTrustMarquee: React.FC = () => {
  const [activeBrand, setActiveBrand] = useState<BrandItem | null>(null);

  return (
    <section className="w-full border-b-2 border-ink-black bg-white py-5 px-4 sm:px-8 lg:px-14 select-none">
      <div className="w-full flex flex-col lg:flex-row items-center justify-between gap-4">
        {/* Left Label with Live Tooltip */}
        <div className="flex items-center gap-3 shrink-0">
          <span className="font-mono text-xs font-black uppercase text-gray-500 tracking-wider">
            TRUSTED BY FAST-GROWING TEAMS GLOBALLY:
          </span>
          {activeBrand && (
            <span className="px-2.5 py-0.5 bg-accent-yellow border border-ink-black font-mono text-[10px] font-black uppercase text-ink-black shadow-xs animate-in fade-in duration-150">
              {activeBrand.metric}
            </span>
          )}
        </div>

        {/* Brand Logos with Hover Micro-Interactions */}
        <div className="flex flex-wrap items-center justify-center gap-6 sm:gap-8 md:gap-10 font-display font-black text-base sm:text-lg md:text-xl text-gray-800 uppercase tracking-tighter">
          {BRANDS.map((brand) => (
            <button
              key={brand.name}
              type="button"
              onMouseEnter={() => setActiveBrand(brand)}
              onMouseLeave={() => setActiveBrand(null)}
              onClick={() => setActiveBrand(activeBrand?.name === brand.name ? null : brand)}
              className={`flex items-center gap-1.5 transition-all duration-150 cursor-pointer hover:scale-105 ${brand.hoverColor}`}
            >
              <span className="text-sm opacity-80">{brand.symbol}</span>
              <span>{brand.name}</span>
            </button>
          ))}
        </div>
      </div>
    </section>
  );
};
