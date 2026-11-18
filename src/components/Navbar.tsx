"use client";

import React, { useState } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { ArrowUpRight, Menu, X } from "lucide-react";
import confetti from "canvas-confetti";

interface NavItem {
  label: string;
  href: string;
}

const NAV_ITEMS: NavItem[] = [
  { label: "WORK", href: "/#work" },
  { label: "ABOUT", href: "/about" },
  { label: "SERVICES", href: "/services" },
  { label: "PLANS", href: "/plans" },
  { label: "JOURNAL", href: "/journal" },
  { label: "CONTACT", href: "/contact" },
];

export const Navbar: React.FC = () => {
  const pathname = usePathname();
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleCtaClick = () => {
    try {
      confetti({
        particleCount: 35,
        spread: 60,
        origin: { y: 0.1, x: 0.92 },
        colors: ["#FFE600", "#FF3E1D", "#00C2CB", "#0A0A0A"],
      });
    } catch {
      // fallback
    }
  };

  return (
    <header className="sticky top-0 z-50 w-full bg-white border-b-2 border-ink-black select-none">
      {/* Swiss Grid Modular Table Layout - Full Bleed Width */}
      <div className="w-full flex items-stretch h-[64px] md:h-[72px]">
        {/* Cell 1: Brand Logo - CodeClovers */}
        <Link
          href="/"
          className="flex items-center px-6 md:px-8 border-r-2 border-ink-black bg-white hover:bg-neutral-50 transition-colors shrink-0 group"
        >
          <span className="font-display font-black text-2xl md:text-3xl tracking-tighter uppercase text-ink-black group-hover:opacity-90">
            CODECLOVERS<span className="text-accent-red">.</span>
          </span>
        </Link>

        {/* Cell 2: Studio Role Descriptor */}
        <div className="hidden md:flex flex-col justify-center px-5 lg:px-6 border-r-2 border-ink-black bg-white shrink-0">
          <span className="font-mono text-[11px] font-extrabold uppercase leading-tight text-ink-black tracking-wider">
            WEB DEV
          </span>
          <span className="font-mono text-[11px] font-extrabold uppercase leading-tight text-gray-500 tracking-wider">
            AGENCY
          </span>
        </div>

        {/* Cell 3: Desktop Navigation Links (Pure Swiss Grid Cells) */}
        <nav className="hidden lg:flex items-stretch flex-1">
          {NAV_ITEMS.map((item) => {
            const isActive =
              pathname === item.href ||
              (item.href !== "/" && pathname?.startsWith(item.href + "/"));
            return (
              <Link
                key={item.label}
                href={item.href}
                className={`relative flex items-center justify-center flex-1 px-4 xl:px-6 border-r-2 border-ink-black font-display font-black text-[13px] xl:text-[14px] uppercase tracking-wider transition-all duration-150 ${
                  isActive
                    ? "bg-ink-black text-white"
                    : "bg-white text-ink-black hover:bg-ink-black hover:text-white"
                }`}
              >
                {item.label}
              </Link>
            );
          })}
        </nav>

        {/* Cell 4: "START A PROJECT" Accent Cell */}
        <Link
          href="/contact"
          onClick={handleCtaClick}
          className="flex items-center justify-center px-6 md:px-8 bg-accent-yellow border-l-2 lg:border-l-0 border-ink-black font-display font-black text-xs md:text-sm tracking-wider uppercase text-ink-black hover:bg-ink-black hover:text-accent-yellow transition-all duration-150 group shrink-0"
        >
          <span className="flex items-center gap-2 whitespace-nowrap">
            START A PROJECT
            <ArrowUpRight className="w-4 h-4 group-hover:translate-x-0.5 group-hover:-translate-y-0.5 transition-transform" />
          </span>
        </Link>

        {/* Mobile Hamburger Toggle */}
        <button
          type="button"
          onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
          className="flex lg:hidden items-center justify-center px-4 md:px-5 bg-white border-l-2 border-ink-black hover:bg-neutral-100 transition-colors"
          aria-label="Toggle navigation menu"
        >
          {mobileMenuOpen ? (
            <X className="w-6 h-6 text-ink-black" />
          ) : (
            <Menu className="w-6 h-6 text-ink-black" />
          )}
        </button>
      </div>

      {/* Mobile Drawer Menu */}
      {mobileMenuOpen && (
        <div className="lg:hidden w-full bg-white border-t-2 border-ink-black shadow-brut-lg animate-in slide-in-from-top-2 duration-150">
          <div className="flex flex-col">
            {NAV_ITEMS.map((item) => {
              const isActive =
                pathname === item.href ||
                (item.href !== "/" && pathname?.startsWith(item.href + "/"));
              return (
                <Link
                  key={item.label}
                  href={item.href}
                  onClick={() => setMobileMenuOpen(false)}
                  className={`flex items-center justify-between px-6 py-4 border-b-2 border-ink-black font-display font-black text-lg uppercase tracking-wider transition-colors ${
                    isActive
                      ? "bg-accent-yellow text-ink-black"
                      : "bg-white text-ink-black hover:bg-neutral-100"
                  }`}
                >
                  <span>{item.label}</span>
                  <ArrowUpRight className="w-4 h-4 text-ink-black" />
                </Link>
              );
            })}
            <Link
              href="/contact"
              onClick={() => setMobileMenuOpen(false)}
              className="flex items-center justify-center p-5 bg-accent-yellow text-ink-black font-display font-black text-base uppercase tracking-wider border-b-2 border-ink-black hover:bg-ink-black hover:text-accent-yellow transition-colors"
            >
              START A PROJECT ↗
            </Link>
          </div>
        </div>
      )}
    </header>
  );
};
