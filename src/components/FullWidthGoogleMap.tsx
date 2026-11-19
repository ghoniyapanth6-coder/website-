import React from "react";
import { MapPin, Navigation, ArrowUpRight } from "lucide-react";

export const FullWidthGoogleMap: React.FC = () => {
  return (
    <section className="w-full border-b-2 border-ink-black bg-white select-none">
      {/* Swiss Grid Map Spine Header Bar */}
      <div className="w-full px-6 py-4 sm:px-10 bg-neutral-950 text-white flex flex-wrap items-center justify-between gap-4 border-b-2 border-ink-black">
        <div className="flex items-center gap-3">
          <div className="w-8 h-8 rounded-none bg-accent-yellow text-ink-black flex items-center justify-center font-mono font-black text-xs border border-white/20">
            <MapPin className="w-4 h-4 stroke-[2.5]" />
          </div>
          <div>
            <div className="flex items-center gap-2">
              <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
              <span className="font-mono text-[10px] font-bold uppercase tracking-widest text-neutral-400">
                LIVE HEADQUARTERS LOCATION // SAN FRANCISCO, CA
              </span>
            </div>
            <h3 className="font-display font-black text-lg sm:text-xl uppercase tracking-tight text-white leading-none mt-0.5">
              CODECLOVERS STUDIO HEADQUARTERS
            </h3>
          </div>
        </div>

        <div className="flex items-center gap-3 sm:gap-4 font-mono text-xs font-black uppercase">
          <span className="text-neutral-400 text-[11px] hidden md:inline-block">
            COORDINATES: 37.7749° N, 122.4194° W
          </span>
          <a
            href="https://maps.google.com/?q=Market+Street+San+Francisco+CA"
            target="_blank"
            rel="noopener noreferrer"
            className="px-3.5 py-1.5 bg-accent-yellow text-ink-black border border-white/20 hover:bg-white transition-colors flex items-center gap-1.5 text-xs shadow-2xs"
          >
            <span>OPEN IN GOOGLE MAPS</span>
            <ArrowUpRight className="w-3.5 h-3.5 stroke-[2.5]" />
          </a>
        </div>
      </div>

      {/* Full-Width Live Interactive Google Maps Iframe */}
      <div className="w-full h-[400px] sm:h-[480px] lg:h-[520px] relative bg-neutral-100">
        <iframe
          title="CodeClovers Studio San Francisco Headquarters Map"
          src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3153.086438838384!2d-122.40316492348398!3d37.78802297198276!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x8085806287c2b3e5%3A0xb35a0980c65365e8!2sMarket%20St%2C%20San%20Francisco%2C%20CA!5e0!3m2!1sen!2sus!4v1716300000000!5m2!1sen!2sus"
          width="100%"
          height="100%"
          style={{ border: 0 }}
          allowFullScreen
          loading="lazy"
          referrerPolicy="no-referrer-when-downgrade"
          className="w-full h-full block"
        />

        {/* Tactile Brutalist Floating Location Badge on bottom-left */}
        <div className="absolute bottom-5 left-5 z-10 p-3.5 sm:p-4 bg-white border-2 border-ink-black shadow-brut-sm max-w-xs pointer-events-none hidden sm:block">
          <div className="font-mono text-[10px] font-black uppercase text-accent-red mb-1">
            PHYSICAL DISPATCH
          </div>
          <div className="font-display font-black text-sm uppercase text-ink-black">
            Market St &bull; SoMa District
          </div>
          <div className="font-sans text-xs text-neutral-600 mt-0.5">
            San Francisco, CA 94103
          </div>
        </div>
      </div>
    </section>
  );
};
