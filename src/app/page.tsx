import React from "react";
import { Navbar } from "@/components/Navbar";
import { BrutHero } from "@/components/BrutHero";
import { StatusMarquee } from "@/components/StatusMarquee";
import { SelectedWorkSection } from "@/components/SelectedWorkSection";
import { BuiltToDisruptSection } from "@/components/BuiltToDisruptSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { BrutFooter } from "@/components/BrutFooter";

export default function HomePage() {
  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      {/* 1. Modular Swiss Grid Header */}
      <Navbar />

      <main className="flex-1 w-full bg-white">
        {/* ========================================================= */}
        {/* SECTION 1: SWISS GRID HERO ("WE DESIGN WITHOUT RULES.")  */}
        {/* ========================================================= */}
        <BrutHero />

        {/* ========================================================= */}
        {/* SECTION 2: EDITORIAL SUB-BAR ("WE DON'T FOLLOW TRENDS")   */}
        {/* ========================================================= */}
        <StatusMarquee />

        {/* ========================================================= */}
        {/* SECTION 3: "SELECTED WORK" SHOWCASE                       */}
        {/* ========================================================= */}
        <SelectedWorkSection />

        {/* ========================================================= */}
        {/* SECTION 4: "BUILT TO DISRUPT" & CLEAN SERVICES ACCORDION  */}
        {/* ========================================================= */}
        <BuiltToDisruptSection />

        {/* ========================================================= */}
        {/* SECTION 5: CLIENT TESTIMONIALS & VERIFIED IMPACT          */}
        {/* ========================================================= */}
        <TestimonialsSection />

        {/* ========================================================= */}
        {/* SECTION 6: CLIENT FAQ (FREQUENTLY ASKED QUESTIONS)        */}
        {/* ========================================================= */}
        <FaqSection />

        {/* ========================================================= */}
        {/* SECTION 7: BRUTALIST CONVERSION FOOTER                    */}
        {/* ========================================================= */}
        <BrutFooter />
      </main>
    </div>
  );
}