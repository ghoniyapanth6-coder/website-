import React from "react";
import type { Metadata } from "next";
import { Navbar } from "@/components/Navbar";
import { BrutHero } from "@/components/BrutHero";
import { StatusMarquee } from "@/components/StatusMarquee";
import { SelectedWorkSection } from "@/components/SelectedWorkSection";
import { BuiltToDisruptSection } from "@/components/BuiltToDisruptSection";
import { TestimonialsSection } from "@/components/TestimonialsSection";
import { FaqSection } from "@/components/FaqSection";
import { BrutFooter } from "@/components/BrutFooter";

export const metadata: Metadata = {
  title: "CodeClovers // High-Performance Web Development Agency",
  description:
    "We engineer high-speed Next.js web applications, scalable Node.js microservices, and conversion-engineered digital platforms with guaranteed 100/100 Core Web Vitals.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CodeClovers // Disruptive Web Development Studio",
    description: "Engineering digital experiences without rules. Next.js 14, Node.js, and Technical SEO built-in.",
    url: "https://codeclovers.dev",
    siteName: "CodeClovers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeClovers // High-Performance Web Agency",
    description: "Next.js 14+ • Tailwind CSS • Node.js • Technical SEO Built-in",
    creator: "@codeclovers",
  },
};

export default function HomePage() {
  const jsonLdOrganization = {
    "@context": "https://schema.org",
    "@type": "Organization",
    "@id": "https://codeclovers.dev/#organization",
    name: "CodeClovers",
    alternateName: "CodeClovers Engineering Studio",
    url: "https://codeclovers.dev",
    logo: "https://codeclovers.dev/logo.png",
    email: "hello@codeclovers.dev",
    telephone: "+1-415-555-0199",
    sameAs: [
      "https://twitter.com/codeclovers",
      "https://github.com/ghoniyapanth6-coder/website-",
      "https://linkedin.com/company/codeclovers",
    ],
    address: {
      "@type": "PostalAddress",
      streetAddress: "580 Howard Street, Suite 400",
      addressLocality: "San Francisco",
      addressRegion: "CA",
      postalCode: "94105",
      addressCountry: "US",
    },
    contactPoint: {
      "@type": "ContactPoint",
      telephone: "+1-415-555-0199",
      contactType: "customer service",
      email: "hello@codeclovers.dev",
      availableLanguage: ["English", "Hindi", "Gujarati"],
    },
  };

  const jsonLdWebSite = {
    "@context": "https://schema.org",
    "@type": "WebSite",
    "@id": "https://codeclovers.dev/#website",
    url: "https://codeclovers.dev",
    name: "CodeClovers",
    publisher: {
      "@id": "https://codeclovers.dev/#organization",
    },
    potentialAction: {
      "@type": "SearchAction",
      target: {
        "@type": "EntryPoint",
        urlTemplate: "https://codeclovers.dev/journal?search={search_term_string}",
      },
      "query-input": "required name=search_term_string",
    },
  };

  const jsonLdFaq = {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: [
      {
        "@type": "Question",
        name: "How fast can you deliver a custom Next.js website?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We operate in focused 2-to-4 week production sprints. From Day 5, you receive a private live staging URL on Vercel updated with every commit, allowing you to test real, functional code.",
        },
      },
      {
        "@type": "Question",
        name: "Do you use templates, WordPress, or site builders like Webflow?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Never. Every line of code is hand-crafted with 100% custom, type-safe Next.js 14 and Tailwind CSS. We do not use WordPress or drag-and-drop builders, eliminating security vulnerabilities and plugin bloat.",
        },
      },
      {
        "@type": "Question",
        name: "How do you guarantee 100/100 Google Lighthouse and top SEO?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We achieve perfect performance through strict engineering discipline: React Server Components, zero bloat, sub-300ms global response times via edge caching, and automated Schema.org structured data built directly into your codebase.",
        },
      },
      {
        "@type": "Question",
        name: "What does your pricing look like and how do we start?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "We provide transparent, fixed-scope sprint pricing with zero hidden hourly overages. You can get started immediately by booking a free 30-minute technical architecture audit with our lead engineer.",
        },
      },
      {
        "@type": "Question",
        name: "Do we own 100% of the code, intellectual property, and design files?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes, completely. Upon project completion and final payment, you receive 100% intellectual property ownership, Figma master design files, and a full administrative transfer of the clean GitHub repository.",
        },
      },
      {
        "@type": "Question",
        name: "What happens after launch? Do you provide ongoing maintenance?",
        acceptedAnswer: {
          "@type": "Answer",
          text: "Yes. We offer dedicated monthly retainers covering 99.99% uptime monitoring, dependency and security updates, performance tuning, and continuous feature sprints as your business scales.",
        },
      },
    ],
  };

  return (
    <div className="min-h-screen bg-white flex flex-col font-sans select-none">
      {/* Schema.org Structured Data */}
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdOrganization) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdWebSite) }}
      />
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLdFaq) }}
      />

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
