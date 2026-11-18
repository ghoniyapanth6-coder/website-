"use client";

import React, { useState } from "react";
import Link from "next/link";
import { ArrowUpRight, CheckCircle2 } from "lucide-react";

export const BrutFooter: React.FC = () => {
  const [email, setEmail] = useState("");
  const [subscribed, setSubscribed] = useState(false);

  const handleSubscribe = (e: React.FormEvent) => {
    e.preventDefault();
    if (email) {
      setSubscribed(true);
    }
  };

  return (
    <footer className="w-full bg-white select-none">
      <div className="grid grid-cols-1 md:grid-cols-12 w-full border-b-2 border-ink-black">
        {/* Cell 1 (4 cols): Red Accent Box with CTA */}
        <Link
          href="/contact"
          className="md:col-span-4 p-8 sm:p-10 md:p-12 bg-accent-red text-ink-black border-b-2 md:border-b-0 md:border-r-2 border-ink-black flex items-center justify-between group hover:bg-ink-black hover:text-white transition-colors"
        >
          <span className="font-display font-black text-2xl sm:text-3xl uppercase tracking-tighter leading-tight max-w-xs">
            LET&apos;S CREATE SOMETHING DIFFERENT.
          </span>
          <ArrowUpRight className="w-8 h-8 stroke-[2.5] group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform shrink-0" />
        </Link>

        {/* Cell 2 (5 cols): Newsletter Subscription */}
        <div className="md:col-span-5 p-8 sm:p-10 md:p-12 border-b-2 md:border-b-0 md:border-r-2 border-ink-black flex flex-col justify-center bg-white">
          <span className="font-mono text-xs font-black uppercase text-gray-500 mb-4 tracking-wider">
            SUBSCRIBE TO OUR NEWSLETTER
          </span>

          {subscribed ? (
            <div className="flex items-center gap-2 font-mono text-xs font-black text-emerald-700">
              <CheckCircle2 className="w-4 h-4" />
              <span>THANK YOU FOR SUBSCRIBING. ZERO SPAM.</span>
            </div>
          ) : (
            <form onSubmit={handleSubscribe} className="flex items-stretch border-2 border-ink-black shadow-brut-sm">
              <input
                required
                type="email"
                placeholder="ENTER YOUR EMAIL"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="flex-1 px-4 py-3 font-mono text-xs font-bold text-ink-black bg-white focus:outline-none uppercase placeholder:text-gray-400"
              />
              <button
                type="submit"
                className="px-6 sm:px-8 bg-ink-black text-white font-mono text-xs font-black uppercase hover:bg-accent-yellow hover:text-ink-black transition-colors cursor-pointer"
              >
                SUBSCRIBE
              </button>
            </form>
          )}
        </div>

        {/* Cell 3 (3 cols): Social Handles */}
        <div className="md:col-span-3 p-8 sm:p-10 md:p-12 flex flex-col justify-center bg-white font-mono text-xs font-black">
          <span className="text-gray-400 uppercase mb-4 tracking-wider">
            FOLLOW US
          </span>
          <div className="flex items-center gap-5 text-ink-black text-sm font-extrabold">
            <span className="hover:text-accent-red cursor-pointer transition-colors">IG.</span>
            <span className="hover:text-accent-red cursor-pointer transition-colors">BE.</span>
            <span className="hover:text-accent-red cursor-pointer transition-colors">LI.</span>
            <span className="hover:text-accent-red cursor-pointer transition-colors">TW.</span>
          </div>
        </div>
      </div>
    </footer>
  );
};
