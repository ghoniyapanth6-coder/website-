/**
 * =============================================================================
 * CODECLOVERS FRONTEND ADMIN PANEL - CORE DATA ARCHITECTURE & MOCK STATE
 * =============================================================================
 * Comprehensive TypeScript types, status badges, UI color maps, and initial
 * mock data for the CodeClovers Engineering Studio admin control interface.
 * Extended with full Journal parity, Client Testimonial CRUD, and FAQ Manager.
 * =============================================================================
 */

import { JOURNAL_ARTICLES, type JournalArticle } from "./journalArticles";

// -----------------------------------------------------------------------------
// 1. INQUIRIES & LEADS TYPES & DATA
// -----------------------------------------------------------------------------

export type InquiryStatus = "NEW" | "REVIEW" | "SCHEDULED" | "WON" | "ARCHIVED";

export interface AdminInquiry {
  id: string;
  name: string;
  email: string;
  phone?: string;
  company: string;
  service: string;
  budget: string;
  timeline: string;
  message: string;
  date: string;
  status: InquiryStatus;
  priority: "HIGH" | "MEDIUM" | "LOW";
  unread?: boolean;
}

export const INITIAL_INQUIRIES: AdminInquiry[] = [
  {
    id: "INQ-2026-094",
    name: "Alexander Reed",
    email: "alex@hyperionpay.io",
    phone: "+1 (415) 555-0192",
    company: "Hyperion Payments",
    service: "Next.js 14 Web App",
    budget: "$10K - $25K",
    timeline: "Immediate < 2 Weeks",
    message:
      "We need a complete ground-up rebuild of our merchant dashboard and marketing funnel. Current WordPress stack is suffering from 2.8s TTFB and 42 failing Core Web Vitals audits. We want 100/100 Lighthouse and high-concurrency Node.js endpoints with zero hydration tax.",
    date: "2026-11-19T08:42:00Z",
    status: "NEW",
    priority: "HIGH",
    unread: true,
  },
  {
    id: "INQ-2026-093",
    name: "Sophia Zhang",
    email: "sophia@synapseai.com",
    phone: "+1 (650) 899-2311",
    company: "Synapse AI Lab",
    service: "Full-Stack Node.js",
    budget: "$25K+ Custom",
    timeline: "Standard 3-4 Weeks",
    message:
      "Launching a self-serve compute cluster dashboard for GPU orchestrations. Need React 19 RSC, Prisma ORM with connection pooling, and Upstash Redis edge caching. Target concurrency is 10,000 req/s.",
    date: "2026-11-18T16:15:00Z",
    status: "REVIEW",
    priority: "HIGH",
    unread: true,
  },
  {
    id: "INQ-2026-092",
    name: "Marcus Vance",
    email: "marcus@vancecapital.co",
    company: "Vance Capital Partners",
    service: "UI/UX Design System",
    budget: "$10K - $25K",
    timeline: "Standard 3-4 Weeks",
    message:
      "Looking for a tactile Neo-Brutalist design system for our institutional investor portal. Must adhere to WCAG AAA contrast guidelines and include a synchronized Figma-to-Tailwind token library.",
    date: "2026-11-17T11:20:00Z",
    status: "SCHEDULED",
    priority: "MEDIUM",
    unread: false,
  },
  {
    id: "INQ-2026-091",
    name: "Dr. Alistair Finch",
    email: "a.finch@biomedgrid.org",
    phone: "+44 20 7946 0991",
    company: "BioMed Grid Labs",
    service: "Technical SEO Overhaul",
    budget: "$5K - $10K",
    timeline: "Standard 3-4 Weeks",
    message:
      "We publish thousands of clinical genetics papers that are getting dropped by Googlebot due to client-side hydration delays. Need automated dynamic Schema.org JSON-LD graphs, automated edge XML sitemaps, and sub-400ms LCP.",
    date: "2026-11-16T14:05:00Z",
    status: "SCHEDULED",
    priority: "MEDIUM",
    unread: false,
  },
  {
    id: "INQ-2026-090",
    name: "Elena Rostova",
    email: "elena@gridflow.systems",
    phone: "+41 44 211 4400",
    company: "GridFlow Systems AG",
    service: "Next.js 14 Web App",
    budget: "$25K+ Custom",
    timeline: "Immediate < 2 Weeks",
    message:
      "Contract finalized for Sprint 4 cutover. Scope: Complete migration of core developer documentation into Next.js 14 with sub-200ms edge routing, custom search indexing, and 100% IP repository handover.",
    date: "2026-11-14T09:12:00Z",
    status: "WON",
    priority: "HIGH",
    unread: false,
  },
  {
    id: "INQ-2026-089",
    name: "Julian Thorne",
    email: "julian@kroma-apparel.co.uk",
    company: "Kroma Apparel Ltd",
    service: "Strategic Branding",
    budget: "$5K - $10K",
    timeline: "Standard 3-4 Weeks",
    message:
      "Contract won for Fall 2026 brand identity sprint. Bespoke vector logo system, responsive typographic scale, and 40-page master design manual delivered with 100% intellectual property rights.",
    date: "2026-11-10T17:30:00Z",
    status: "WON",
    priority: "LOW",
    unread: false,
  },
  {
    id: "INQ-2026-088",
    name: "David Sterling",
    email: "dsterling@orbitallabs.space",
    company: "Orbital Labs Aerospace",
    service: "Continuous Retained SLA",
    budget: "$10K - $25K",
    timeline: "Flexible",
    message:
      "General inquiry regarding monthly retainer allocations for satellite telemetry dashboards. Lead requested postponement to Q1 2027 fiscal budgeting cycle. Archived after follow-up.",
    date: "2026-11-04T12:00:00Z",
    status: "ARCHIVED",
    priority: "LOW",
    unread: false,
  },
  {
    id: "INQ-2026-087",
    name: "Maya Patel",
    email: "mpatel@nexuslogistics.io",
    company: "Nexus Freight Hub",
    service: "UI/UX Design System",
    budget: "$2K - $5K",
    timeline: "Flexible",
    message:
      "Initial scoping request for a delivery route planning tool. Budget mismatch against our minimum sprint threshold. Provided recommendation for starter design kits and archived.",
    date: "2026-10-29T10:18:00Z",
    status: "ARCHIVED",
    priority: "LOW",
    unread: false,
  },
];

// -----------------------------------------------------------------------------
// 2. JOURNAL MEMOS TYPES & DATA (FULL /JOURNAL PARITY)
// -----------------------------------------------------------------------------

export type MemoStatus = "PUBLISHED" | "DRAFT";

export interface JournalArticleCallout {
  type: "note" | "warning" | "pro-tip";
  title: string;
  body: string;
}

export interface JournalArticleCodeBlock {
  filename: string;
  language: string;
  code: string;
}

export interface JournalArticleComparisonTable {
  dimension: string;
  legacy: string;
  codeclovers: string;
  impact: string;
}

export interface JournalArticleSection {
  id: string;
  heading: string;
  content: string[];
  callout?: JournalArticleCallout;
  codeBlock?: JournalArticleCodeBlock;
  comparisonTable?: JournalArticleComparisonTable[];
  checklist?: string[];
}

export interface JournalArticleAuthor {
  name: string;
  role: string;
  handle: string;
}

export interface JournalArticleMetric {
  label: string;
  value: string;
}

export interface AdminJournalMemo {
  id: string;
  slug: string;
  title: string;
  subtitle?: string;
  category: string;
  categoryColor?: string;
  readTime: string;
  date: string;
  excerpt: string;
  tags: string[];
  status: MemoStatus;
  views?: number;
  featured?: boolean;
  author?: JournalArticleAuthor;
  authorName?: string; // backwards compatibility convenience
  metrics?: JournalArticleMetric[];
  executiveSummary?: string;
  keyTakeaways?: string[];
  tableOfContents?: { id: string; label: string }[];
  sections?: JournalArticleSection[];
  metaTitle?: string;
  metaDescription?: string;
  canonicalUrl?: string;
  focusKeywords?: string[];
  ogImage?: string;
}

// Convert existing 6 verified articles from journalArticles.ts into full AdminJournalMemo format
const PUBLISHED_MEMO_VIEWS = [14280, 9840, 8120, 11450, 16730, 6490];

const PUBLISHED_MEMOS: AdminJournalMemo[] = JOURNAL_ARTICLES.map((art, idx) => ({
  ...art,
  status: "PUBLISHED" as MemoStatus,
  views: PUBLISHED_MEMO_VIEWS[idx] || 5000,
  authorName: art.author.name,
}));

// Additional rich DRAFT articles for studio staging
const DRAFT_MEMOS: AdminJournalMemo[] = [
  {
    id: "MEMO-007",
    slug: "edge-database-sharding-prisma-flyio",
    title: "EDGE DATABASE SHARDING WITH PRISMA & FLY.IO",
    subtitle:
      "Architecture patterns for multi-region read replicas, connection multiplexing with PgBouncer, and keeping latency under 15ms globally across 12 distributed edge data centers.",
    category: "BACKEND",
    categoryColor: "bg-accent-magenta text-white",
    readTime: "10 MIN READ",
    date: "NOV 22, 2026",
    excerpt:
      "Deep dive into multi-region read replicas, connection pooling with PgBouncer, and keeping latency under 15ms globally across 12 distributed edge data centers.",
    tags: ["Prisma", "PostgreSQL", "Fly.io", "Edge Computing", "Database Sharding"],
    status: "DRAFT",
    views: 0,
    featured: false,
    author: {
      name: "Alex Vance",
      role: "Lead Distributed Systems Engineer // CodeClovers",
      handle: "@alex_vance",
    },
    authorName: "Alex Vance",
    metrics: [
      { label: "GLOBAL READ LATENCY", value: "14ms" },
      { label: "EDGE REGIONS DEPLOYED", value: "12 NODES" },
      { label: "FAILOVER TIME", value: "< 500MS" },
      { label: "MAX CONCURRENCY", value: "25,000 req/s" },
    ],
    executiveSummary:
      "High-traffic distributed SaaS platforms often degrade when cross-continental TCP latency delays simple user authentication lookups. By deploying read replicas across Fly.io edge regions and synchronizing state with Litestream and Prisma Accelerate, query responses remain instantaneous worldwide.",
    keyTakeaways: [
      "Route read queries to the geographically closest PostgreSQL replica using Cloudflare geolocation headers.",
      "Buffer write transactions through external message queues to maintain atomic consistency during regional network partitions.",
      "Enforce sub-10ms query budgets at the CI level to prevent accidental cross-region database joins.",
    ],
    tableOfContents: [
      { id: "geo-latency", label: "01. The Global Edge Latency Penalty" },
      { id: "read-replicas", label: "02. Multi-Region Read Replica Topologies" },
      { id: "connection-pooling", label: "03. PgBouncer & Prisma Accelerate" },
    ],
    sections: [
      {
        id: "geo-latency",
        heading: "01. THE GLOBAL EDGE LATENCY PENALTY // SPEED OF LIGHT CONSTRAINTS",
        content: [
          "No matter how optimized your SQL indexes are, sending a TCP packet from Singapore to a database hosted in us-east-1 takes at least 180ms due to the physical speed of light through optical fiber.",
          "When an application performs three sequential queries during page rendering, latency immediately exceeds 500ms before HTML generation even begins. The solution is moving read data to the edge.",
        ],
        callout: {
          type: "warning",
          title: "TRANSACTIONAL INTEGRITY NOTICE",
          body: "Read replicas can experience replication lag between 5ms and 50ms. Never read immediately after write without reading from the primary node or enforcing read-your-writes session tokens.",
        },
      },
      {
        id: "read-replicas",
        heading: "02. MULTI-REGION READ REPLICA TOPOLOGIES",
        content: [
          "We configure Fly.io PostgreSQL clusters with automated streaming replication across Frankfurt, Tokyo, London, and Silicon Valley.",
        ],
        codeBlock: {
          filename: "src/lib/edge-db.ts",
          language: "typescript",
          code: `import { PrismaClient } from '@prisma/client';

export function getEdgePrismaClient(region: string) {
  const replicaUrl = process.env[\`DATABASE_URL_\${region.toUpperCase()}\`] 
    || process.env.DATABASE_URL_PRIMARY;

  return new PrismaClient({
    datasources: { db: { url: replicaUrl } },
  });
}`,
        },
      },
    ],
  },
  {
    id: "MEMO-008",
    slug: "dark-mode-swiss-grids-accessibility",
    title: "DARK-MODE SWISS GRIDS: ACCESSIBILITY BEYOND PURE BLACK",
    subtitle:
      "Building ergonomic high-contrast dark themes without visual vibration. How to tune 2px borders, paper beige undertones, and tactile focus rings for extended reading.",
    category: "DESIGN SYSTEM",
    categoryColor: "bg-paper-beige text-ink-black",
    readTime: "7 MIN READ",
    date: "NOV 25, 2026",
    excerpt:
      "Building ergonomic high-contrast dark themes without visual vibration. How to tune 2px borders, paper beige undertones, and tactile focus rings for extended reading.",
    tags: ["Dark Mode", "Swiss Grid", "Tailwind CSS", "UI/UX", "Accessibility"],
    status: "DRAFT",
    views: 0,
    featured: false,
    author: {
      name: "Mia Thorne",
      role: "Design Systems Principal // CodeClovers",
      handle: "@mia_thorne",
    },
    authorName: "Mia Thorne",
    metrics: [
      { label: "CONTRAST RATIO", value: "18.5:1" },
      { label: "EYE FATIGUE INDEX", value: "-48%" },
      { label: "WCAG AAA COMPLIANCE", value: "100% PASS" },
      { label: "TOKEN REUSABILITY", value: "100%" },
    ],
    executiveSummary:
      "Many dark mode implementations simply invert hex colors to pure #000000 backgrounds and pure #FFFFFF text, producing harsh halation and severe eye fatigue. Our Swiss Grid dark mode system uses subtle warm zinc undertones (#0C0C0E) paired with tactile 2px borders (#27272A) and vibrant yellow highlights.",
    keyTakeaways: [
      "Avoid 100% stark white text on 100% black backgrounds to eliminate optical halation and astigmatism strain.",
      "Maintain tactile 2px borders even in dark themes using carefully calibrated mid-tone zinc outlines.",
      "Reserve bold primary accents (such as #FFE600) strictly for interactive buttons and callout indicators.",
    ],
    sections: [
      {
        id: "halation-problem",
        heading: "01. THE OPTICAL HALATION PROBLEM",
        content: [
          "When users with astigmatism read pure white text on pitch-black displays, light spills into adjacent photoreceptors, creating blurry halos around letters. Softening text to #E4E4E7 retains 18:1 contrast while preventing optical vibration.",
        ],
        callout: {
          type: "pro-tip",
          title: "COLOR TUNING SECRET",
          body: "Always infuse a 2% tint of warm yellow or paper beige into your dark mode background palette to match natural eye sensitivity in low-light environments.",
        },
      },
    ],
  },
];

export const INITIAL_JOURNAL_MEMOS: AdminJournalMemo[] = [
  ...PUBLISHED_MEMOS,
  ...DRAFT_MEMOS,
];

// -----------------------------------------------------------------------------
// 3. SERVICES TYPES & DATA
// -----------------------------------------------------------------------------

export type ServiceStatus = "ACTIVE" | "PAUSED";

export interface AdminService {
  id: string;
  title: string;
  tagline: string;
  price: string;
  turnaround: string;
  deliverables: string[];
  techStack: string[];
  status: ServiceStatus;
  category?: string;
  metricsHighlight?: {
    value: string;
    label: string;
  };
}

export const INITIAL_SERVICES: AdminService[] = [
  {
    id: "SRV-01",
    title: "Full-Stack Next.js 14 Development",
    tagline: "Zero-bloat React 19, Server Components & high-concurrency Node.js APIs.",
    price: "$4,499 - $8,999+",
    turnaround: "2 - 4 Weeks",
    deliverables: [
      "Next.js 14+ App Router & Streaming Server Components (RSC)",
      "High-Frequency Node.js REST & GraphQL APIs",
      "PostgreSQL Relational Database Schema & Prisma ORM",
      "Redis Edge Caching for Sub-Millisecond TTFB",
      "Stripe / LemonSqueezy Checkout & Webhook Handlers",
      "100/100 Google Lighthouse Core Web Vitals SLA",
    ],
    techStack: ["Next.js 14", "React 19", "TypeScript", "Node.js", "PostgreSQL", "Prisma", "Redis"],
    status: "ACTIVE",
    category: "ENGINEERING",
    metricsHighlight: {
      value: "100/100",
      label: "Guaranteed Lighthouse Score",
    },
  },
  {
    id: "SRV-02",
    title: "Web Design & UI/UX Systems",
    tagline: "Conversion-focused user flows, wireframes & interactive prototypes.",
    price: "$3,499 - $6,999",
    turnaround: "2 - 3 Weeks",
    deliverables: [
      "Interactive High-Fidelity Desktop & Mobile Prototypes",
      "Micro-Interactions & Physics-Based Motion Specs",
      "Conversion Rate Optimization (CRO) Layout Hierarchy",
      "Production-Ready Component Handoff with Zero Ambiguity",
      "WCAG AAA Strict Accessibility Compliance Audits",
    ],
    techStack: ["Figma", "Design Tokens", "Radix UI", "Tailwind CSS", "Framer Motion"],
    status: "ACTIVE",
    category: "DESIGN",
    metricsHighlight: {
      value: "+62%",
      label: "Avg Session Duration",
    },
  },
  {
    id: "SRV-03",
    title: "Strategic Branding & Identity",
    tagline: "Modern design systems, vector logo suites & token architectures.",
    price: "$2,999 - $5,499",
    turnaround: "1 - 2 Weeks",
    deliverables: [
      "Complete Vector Logo Suite (Dark, Light & Monochrome)",
      "Design Token Architecture synced to Figma & Tailwind",
      "Custom Typographic Scale & Color Palettes",
      "Brand Guidelines & Component Library Specifications",
      "Full Vector SVG Export & Infinite Scalability",
    ],
    techStack: ["Figma", "Vector Marks", "Design Tokens", "Tailwind CSS", "SVG Animation"],
    status: "ACTIVE",
    category: "BRANDING",
    metricsHighlight: {
      value: "4.6x",
      label: "Higher Brand Recall",
    },
  },
  {
    id: "SRV-04",
    title: "Technical SEO & Speed Optimization",
    tagline: "Core Web Vitals optimization, dynamic JSON-LD schemas & rank engines.",
    price: "$2,499 - $4,999",
    turnaround: "1 - 2 Weeks",
    deliverables: [
      "Dynamic JSON-LD Structured Data for Rich Search Results",
      "Core Web Vitals Optimization (LCP < 800ms, CLS = 0.00)",
      "Automated XML Sitemaps, Robots.txt & Canonical Logic",
      "Edge Caching, Asset Minification & Dynamic OG Images",
      "Search Console Indexing Diagnostics & Penalty Cleanup",
    ],
    techStack: ["Schema.org", "JSON-LD", "Core Web Vitals", "Edge CDN", "Google Search Console"],
    status: "ACTIVE",
    category: "OPTIMIZATION",
    metricsHighlight: {
      value: "+280%",
      label: "90-Day Organic Traffic",
    },
  },
  {
    id: "SRV-05",
    title: "Continuous Retained Engineering SLA",
    tagline: "Dedicated monthly senior engineering squad, 4-hour SLA & feature rollouts.",
    price: "$3,499 / Month",
    turnaround: "Ongoing Monthly",
    deliverables: [
      "Dedicated Monthly Senior Engineering Sprint Hours",
      "Guaranteed 4-Hour Emergency Triage SLA",
      "Continuous Core Web Vitals Auditing & Security Patches",
      "Staging Environment & Automated CI/CD Deployments",
      "Flexible Month-to-Month Retainer with Zero Lock-In",
    ],
    techStack: ["Next.js 14", "GitHub Actions", "Vercel Enterprise", "AWS", "Datadog"],
    status: "PAUSED",
    category: "RETAINER",
    metricsHighlight: {
      value: "4-Hour",
      label: "Guaranteed SLA Response",
    },
  },
];

// -----------------------------------------------------------------------------
// 4. PLANS & RETAINERS TYPES & DATA
// -----------------------------------------------------------------------------

export type PlanStatus = "ACTIVE" | "FULL";

export interface AdminPlan {
  id: string;
  name: string;
  price: string;
  period: string;
  slotsAvailable: number;
  turnaround: string;
  features: string[];
  status: PlanStatus;
  popular?: boolean;
  badge?: string;
  targetAudience?: string;
}

export const INITIAL_PLANS: AdminPlan[] = [
  {
    id: "PLAN-STARTER",
    name: "STARTER MVP",
    price: "$1,999",
    period: "one-time",
    slotsAvailable: 3,
    turnaround: "2 WEEKS",
    features: [
      "Custom Next.js 14+ App Router (1-3 Pages)",
      "Modular Tailwind CSS Responsive Layout",
      "Essential On-Page & Technical SEO Setup",
      "Contact Form with Direct Resend / Email API",
      "100/100 Google Lighthouse Score Guarantee",
      "14 Days Post-Launch Bug Warranty",
      "100% Source Code & GitHub IP Ownership",
    ],
    status: "ACTIVE",
    popular: false,
    badge: "RAPID LAUNCH",
    targetAudience: "Early-stage founders & rapid product validation sprints",
  },
  {
    id: "PLAN-GROWTH",
    name: "GROWTH STUDIO",
    price: "$4,499",
    period: "one-time",
    slotsAvailable: 2,
    turnaround: "3-4 WEEKS",
    features: [
      "Full Multi-Page Next.js 14 App (6-10 Pages)",
      "Custom Node.js REST API & Server Actions",
      "Dynamic Headless / MDX Blog CMS Engine",
      "Complete Schema.org Dynamic JSON-LD Suite",
      "Interactive Neo-Brutalist Micro-Animations",
      "Automated XML Sitemap & Robots Engine",
      "Analytics & Conversion Funnel Tracking Setup",
      "30 Days Dedicated Senior Support & Warranty",
      "100% Source Code & GitHub IP Ownership",
    ],
    status: "ACTIVE",
    popular: true,
    badge: "MOST POPULAR",
    targetAudience: "Funded scaleups & revenue-generating modern brands",
  },
  {
    id: "PLAN-ENTERPRISE",
    name: "ENTERPRISE SCALE",
    price: "$8,999+",
    period: "one-time",
    slotsAvailable: 1,
    turnaround: "6-8 WEEKS",
    features: [
      "Unlimited Application Complexity & Custom Scope",
      "High-Throughput Node.js Microservices (Fastify)",
      "PostgreSQL Database with Prisma ORM & Migrations",
      "Custom Auth, RBAC & Stripe Billing Engine",
      "Real-Time WebSockets & Distributed Redis Cache",
      "Automated E2E Testing (Playwright / Jest)",
      "Dedicated Senior Engineering Lead Assigned",
      "90 Days Extended SLA & Architecture Support",
      "100% Source Code & GitHub IP Ownership",
    ],
    status: "ACTIVE",
    popular: false,
    badge: "BESPOKE SCALE",
    targetAudience: "High-volume transactional platforms & enterprise platforms",
  },
  {
    id: "PLAN-RETAINER",
    name: "CONTINUOUS RETAINED SLA",
    price: "$3,499",
    period: "month",
    slotsAvailable: 0,
    turnaround: "ONGOING",
    features: [
      "Dedicated Monthly Senior Engineering Sprint Allocation",
      "Guaranteed 4-Hour Response SLA for Critical Tickets",
      "Continuous Core Web Vitals 100/100 Auditing",
      "Weekly Security Patches & Dependency Audits",
      "Direct Discord / Slack Senior Dev Bridge",
      "Month-to-Month Flexibility (Zero Lock-In)",
      "Priority Access to New Architecture Features",
    ],
    status: "FULL",
    popular: false,
    badge: "SOLD OUT // WAITLIST",
    targetAudience: "Teams requiring dedicated monthly engineering allocations",
  },
];

// -----------------------------------------------------------------------------
// 5. PORTFOLIO PROJECTS TYPES & DATA
// -----------------------------------------------------------------------------

export interface AdminPortfolioProject {
  id: string;
  title: string;
  client: string;
  category: string;
  year: string;
  metricHighlight: string;
  techStack: string[];
  liveUrl: string;
  description?: string;
  status: "COMPLETED" | "IN_PROGRESS" | "MAINTENANCE";
}

export const INITIAL_PROJECTS: AdminPortfolioProject[] = [
  {
    id: "PRJ-01",
    title: "Wayline",
    client: "Wayline Systems AG",
    category: "TRANSIT ARCHITECTURE",
    year: "2026",
    metricHighlight: "< 8ms Telemetry Latency",
    techStack: ["Next.js 14", "WebSockets", "Mapbox GL", "Tailwind CSS"],
    liveUrl: "https://wayline.dev",
    description: "Making a whole city's transit telemetry feel less like decoding a puzzle with sub-second live map sync.",
    status: "COMPLETED",
  },
  {
    id: "PRJ-02",
    title: "Tandem Finance",
    client: "Tandem Labs Inc",
    category: "FINTECH & PAYMENTS",
    year: "2026",
    metricHighlight: "$2.4M ARR Scaled",
    techStack: ["TypeScript", "Fastify", "PostgreSQL", "Tailwind CSS"],
    liveUrl: "https://tandempay.io",
    description: "Peer-to-peer and corporate settlement engine with zero layout shifts and instant ledger updates.",
    status: "COMPLETED",
  },
  {
    id: "PRJ-03",
    title: "HyperScale Analytics",
    client: "HyperScale Corp",
    category: "DEVELOPER TOOLS",
    year: "2026",
    metricHighlight: "100/100 Google Lighthouse",
    techStack: ["Next.js 14 App Router", "Prisma", "Edge Cache", "Tailwind CSS"],
    liveUrl: "https://hyperscale.so",
    description: "Ultra-fast developer analytics platform resulting in +280% organic traffic and 0.19s LCP.",
    status: "COMPLETED",
  },
  {
    id: "PRJ-04",
    title: "Aura Living",
    client: "Aura Goods International",
    category: "HEADLESS COMMERCE",
    year: "2026",
    metricHighlight: "4.2x Conversion Jump",
    techStack: ["Next.js App Router", "Shopify Storefront API", "Tailwind CSS"],
    liveUrl: "https://auraliving.co",
    description: "Neo-brutalist tactile storefront slashing checkout abandonments and driving 62% bounce reduction.",
    status: "COMPLETED",
  },
  {
    id: "PRJ-05",
    title: "GridFlow Cloud Platform",
    client: "GridFlow Systems",
    category: "CLOUD INFRASTRUCTURE",
    year: "2026",
    metricHighlight: "+340% Conversion Uplift",
    techStack: ["Next.js 14", "React Server Components", "Vercel Edge", "Tailwind CSS"],
    liveUrl: "https://gridflow.io",
    description: "Global cloud dashboard and documentation engine delivering 100/100 Lighthouse audits.",
    status: "COMPLETED",
  },
  {
    id: "PRJ-06",
    title: "Vantage Health Systems",
    client: "Vantage Health Inc",
    category: "HEALTHCARE SAAS",
    year: "2025",
    metricHighlight: "+290% Demo Pipeline",
    techStack: ["Next.js SSR", "Dynamic JSON-LD", "Cloudflare", "Tailwind CSS"],
    liveUrl: "https://vantagehealth.com",
    description: "HIPAA-compliant enterprise landing experience locking in #1 Google organic rankings.",
    status: "COMPLETED",
  },
  {
    id: "PRJ-07",
    title: "Polarity Robotics Telemetry",
    client: "Polarity Robotics Ltd",
    category: "HARDWARE & ROBOTICS",
    year: "2026",
    metricHighlight: "60 FPS Interactive Canvas",
    techStack: ["React 19", "WebGL Canvas", "Rust Edge", "Zustand"],
    liveUrl: "https://polarityrobotics.com",
    description: "Real-time robotics mission control with zero frame drops during multi-node streaming.",
    status: "IN_PROGRESS",
  },
];

// -----------------------------------------------------------------------------
// 6. CLIENT REVIEWS TYPES & DATA (FULL TESTIMONIAL CRUD PARITY)
// -----------------------------------------------------------------------------

export interface AdminClientReview {
  id: string;
  clientName: string;
  role: string;
  company: string;
  rating: number;
  quote: string;
  date: string;
  verified: boolean;
  avatarInitials: string;
  avatarBg?: string;
  contractId: string;
  metricBadge: string;
  metricDetail?: string;
  location?: string;
  category?: string;
  techStack?: string[];
}

export const INITIAL_CLIENT_REVIEWS: AdminClientReview[] = [
  {
    id: "REV-01",
    clientName: "Sarah Jenkins",
    role: "VP of Engineering",
    company: "GridFlow Systems",
    rating: 5,
    quote:
      "CodeClovers rebuilt our developer documentation and self-serve onboarding in Next.js 14. Our global Largest Contentful Paint dropped from 1.84s to 0.19s, and developer signup conversions jumped by 340% within 45 days. They write clean, uncompromising, production-grade code.",
    date: "NOV 14, 2026",
    verified: true,
    avatarInitials: "SJ",
    avatarBg: "bg-accent-yellow text-ink-black",
    contractId: "DEPL-4091",
    metricBadge: "+340% CONVERSION RATE",
    metricDetail: "0.19s LCP Load Time • 100/100 Core Web Vitals",
    location: "San Francisco, CA",
    category: "CLOUD ARCHITECTURE",
    techStack: ["Next.js 14", "RSC", "Vercel Edge", "Tailwind CSS"],
  },
  {
    id: "REV-02",
    clientName: "Marcus Vance",
    role: "Co-Founder & CTO",
    company: "NexusPay Global",
    rating: 5,
    quote:
      "Most agencies deliver flashy Figma files that break down the moment your engineers try to implement real-time financial tables. CodeClovers handed over strictly typed TypeScript with zero layout shifts and flawless WCAG AAA accessibility. We scaled to $2.4M ARR effortlessly.",
    date: "NOV 08, 2026",
    verified: true,
    avatarInitials: "MV",
    avatarBg: "bg-accent-red text-white",
    contractId: "FIN-8820",
    metricBadge: "$2.4M ARR SCALED",
    metricDetail: "+410% Inbound Pipeline • Sub-150ms TTFB",
    location: "New York, NY",
    category: "B2B FINTECH & PAYMENTS",
    techStack: ["TypeScript", "Fastify", "PostgreSQL", "Tailwind CSS"],
  },
  {
    id: "REV-03",
    clientName: "Dr. Elena Rostova",
    role: "Head of Product",
    company: "Synapse Intelligence",
    rating: 5,
    quote:
      "We needed a neo-brutalist interface that communicated raw computational power while remaining effortlessly intuitive for enterprise buyers. CodeClovers engineered custom canvas visualizers and dynamic telemetry monitors that directly helped close two Fortune 500 contracts.",
    date: "OCT 24, 2026",
    verified: true,
    avatarInitials: "ER",
    avatarBg: "bg-ink-black text-accent-yellow",
    contractId: "AI-1049",
    metricBadge: "2.8M MONTHLY QUERIES",
    metricDetail: "60 FPS Interactive Canvas • 0 Frame Drops",
    location: "Zurich, Switzerland",
    category: "AI & DEEP LEARNING",
    techStack: ["React 19", "WebGL Canvas", "Tailwind CSS", "Zustand"],
  },
  {
    id: "REV-04",
    clientName: "Julian Thorne",
    role: "Founder & CEO",
    company: "Kroma Apparel",
    rating: 5,
    quote:
      "Migrating from a bloated Shopify theme to a bespoke CodeClovers Next.js headless storefront was the single highest-ROI decision we made this year. Mobile bounce rate dropped by 62%, catalog search responds instantaneously, and checkout completions surged by nearly 50%.",
    date: "OCT 12, 2026",
    verified: true,
    avatarInitials: "JT",
    avatarBg: "bg-accent-yellow text-ink-black",
    contractId: "COMM-7103",
    metricBadge: "+46.8% CHECKOUT RATE",
    metricDetail: "62% Bounce Rate Reduction • 2.1x AOV",
    location: "London, UK",
    category: "HEADLESS COMMERCE",
    techStack: ["Next.js App Router", "Shopify API", "Edge Cache", "Tailwind"],
  },
  {
    id: "REV-05",
    clientName: "Aris Thorne",
    role: "Chief Architect",
    company: "Polarity Robotics",
    rating: 5,
    quote:
      "CodeClovers is the only studio we have partnered with that truly respects engineering rigor. Their Swiss Grid design system brought clarity to our complex telemetry feeds, and their strict component isolation allowed our internal engineering team to extend the dashboard seamlessly.",
    date: "SEP 29, 2026",
    verified: true,
    avatarInitials: "AT",
    avatarBg: "bg-ink-black text-white",
    contractId: "ROB-3312",
    metricBadge: "< 8MS TELEMETRY LATENCY",
    metricDetail: "100% Type-Safe • Full GitHub Transfer",
    location: "Austin, TX",
    category: "HARDWARE & ROBOTICS",
    techStack: ["WebSockets", "Rust Edge", "Tailwind CSS", "Next.js 14"],
  },
  {
    id: "REV-06",
    clientName: "Danielle Chen",
    role: "CMO & Growth Lead",
    company: "Vantage Health Systems",
    rating: 5,
    quote:
      "Their technical SEO and server rendering setup delivered immediate organic dominance. Within eight weeks of launch, our organic search impressions tripled and high-intent inbound enterprise demo requests increased by 290%. They don't make excuses; they deliver mathematical results.",
    date: "SEP 15, 2026",
    verified: true,
    avatarInitials: "DC",
    avatarBg: "bg-accent-red text-white",
    contractId: "MED-9024",
    metricBadge: "+290% DEMO LEADS",
    metricDetail: "#1 Organic Search Ranking • 100/100 CWV",
    location: "Boston, MA",
    category: "HEALTHCARE SAAS",
    techStack: ["Next.js SSR", "Dynamic JSON-LD", "Cloudflare", "Lighthouse 100"],
  },
];

// -----------------------------------------------------------------------------
// 7. FAQ MANAGER TYPES & DATA (FROM HOME, ABOUT, PLANS)
// -----------------------------------------------------------------------------

export type FaqCategory = "GENERAL" | "PRICING" | "ENGINEERING" | "OWNERSHIP";
export type FaqTargetPage = "HOME" | "ABOUT" | "PLANS" | "ALL";
export type FaqStatus = "ACTIVE" | "HIDDEN";

export interface AdminFaqItem {
  id: string;
  question: string;
  answer: string;
  category: FaqCategory;
  targetPage: FaqTargetPage;
  highlightBadge: string;
  status: FaqStatus;
  order: number;
}

export const INITIAL_FAQS: AdminFaqItem[] = [
  // --- HOME PAGE FAQS (From FaqSection.tsx) ---
  {
    id: "FAQ-HOM-01",
    question: "How fast can you deliver a custom Next.js website?",
    answer:
      "We operate in focused 2-to-4 week production sprints. From Day 5, you receive a private live staging URL on Vercel updated with every commit, allowing you to test real, functional code rather than waiting weeks for static mockups.",
    category: "GENERAL",
    targetPage: "HOME",
    highlightBadge: "2-4 WEEK SPRINTS",
    status: "ACTIVE",
    order: 1,
  },
  {
    id: "FAQ-HOM-02",
    question: "Do you use templates, WordPress, or site builders like Webflow?",
    answer:
      "Never. Every line of code is hand-crafted with 100% custom, type-safe Next.js 14 and Tailwind CSS. We do not use WordPress or drag-and-drop builders, eliminating security vulnerabilities, plugin bloat, and vendor lock-in.",
    category: "ENGINEERING",
    targetPage: "HOME",
    highlightBadge: "100% BESPOKE CODE",
    status: "ACTIVE",
    order: 2,
  },
  {
    id: "FAQ-HOM-03",
    question: "How do you guarantee 100/100 Google Lighthouse and top SEO?",
    answer:
      "We achieve perfect performance through strict engineering discipline: React Server Components, zero bloat, sub-300ms global response times via edge caching, and automated Schema.org structured data built directly into your codebase.",
    category: "ENGINEERING",
    targetPage: "HOME",
    highlightBadge: "100/100 LIGHTHOUSE",
    status: "ACTIVE",
    order: 3,
  },
  {
    id: "FAQ-HOM-04",
    question: "What does your pricing look like and how do we start?",
    answer:
      "We provide transparent, fixed-scope sprint pricing with zero hidden hourly overages. You can get started immediately by booking a free 30-minute technical architecture audit with our lead engineer.",
    category: "PRICING",
    targetPage: "HOME",
    highlightBadge: "FIXED-SCOPE SPRINT",
    status: "ACTIVE",
    order: 4,
  },
  {
    id: "FAQ-HOM-05",
    question: "Do we own 100% of the code, intellectual property, and design files?",
    answer:
      "Yes, completely. Upon project completion and final payment, you receive 100% intellectual property ownership, Figma master design files, and a full administrative transfer of the clean GitHub repository.",
    category: "OWNERSHIP",
    targetPage: "HOME",
    highlightBadge: "100% IP TRANSFER",
    status: "ACTIVE",
    order: 5,
  },
  {
    id: "FAQ-HOM-06",
    question: "What happens after launch? Do you provide ongoing maintenance?",
    answer:
      "Yes. We offer dedicated monthly retainers covering 99.99% uptime monitoring, dependency and security updates, performance tuning, and continuous feature sprints as your business scales.",
    category: "GENERAL",
    targetPage: "HOME",
    highlightBadge: "MONTHLY SLA SUPPORT",
    status: "ACTIVE",
    order: 6,
  },

  // --- ABOUT PAGE FAQS (From AboutFaqSection.tsx) ---
  {
    id: "FAQ-ABT-01",
    question: "How do your development sprints work, and when do we see working code?",
    answer:
      "We operate in disciplined 2-week sprint cycles. During Week 1, we finalize database contracts, API schemas, and interactive Figma systems. By the end of Week 2, we deliver a functional Next.js staging build hosted on a private preview URL. You test and verify real, working code every single week.",
    category: "GENERAL",
    targetPage: "ABOUT",
    highlightBadge: "SPRINT PROCESS",
    status: "ACTIVE",
    order: 7,
  },
  {
    id: "FAQ-ABT-02",
    question: "Do we get 100% full ownership of the source code and design files?",
    answer:
      "Yes, 100%. Upon final sprint milestone completion, full intellectual property, complete GitHub repositories, production Figma source files, database migrations, and deployment credentials are permanently transferred to your team. Zero vendor lock-in, zero monthly licensing fees.",
    category: "OWNERSHIP",
    targetPage: "ABOUT",
    highlightBadge: "IP OWNERSHIP",
    status: "ACTIVE",
    order: 8,
  },
  {
    id: "FAQ-ABT-03",
    question: "Why do you engineer custom Next.js applications instead of using WordPress or Webflow?",
    answer:
      "Generic CMS templates rely on dozens of unoptimized plugins that introduce security vulnerabilities, sluggish 3+ second load times, and rigid layout limits. We build on Next.js 14 App Router to deliver sub-300ms page loads, enterprise security, guaranteed 100/100 Core Web Vitals, and infinite scalability.",
    category: "ENGINEERING",
    targetPage: "ABOUT",
    highlightBadge: "ARCHITECTURE",
    status: "ACTIVE",
    order: 9,
  },
  {
    id: "FAQ-ABT-04",
    question: "How do you guarantee a 100/100 Google Core Web Vitals score?",
    answer:
      "We engineer speed directly into your codebase. By leveraging React Server Components, zero runtime CSS bloat via Tailwind, automated AVIF image compression, font subset preloading, and edge caching on Vercel and Cloudflare, your pages render instantly with zero layout shifts (CLS 0.00).",
    category: "ENGINEERING",
    targetPage: "ABOUT",
    highlightBadge: "PERFORMANCE",
    status: "ACTIVE",
    order: 10,
  },
  {
    id: "FAQ-ABT-05",
    question: "What happens after product launch? Do you provide ongoing maintenance and engineering?",
    answer:
      "Every project includes a 30-day comprehensive post-launch warranty covering any bug fixes, browser updates, and real-time monitoring. Afterward, we offer flexible dedicated retainer sprints for continuous feature expansion, database scaling, and technical SEO monitoring.",
    category: "GENERAL",
    targetPage: "ABOUT",
    highlightBadge: "SUPPORT & SLA",
    status: "ACTIVE",
    order: 11,
  },
  {
    id: "FAQ-ABT-06",
    question: "How do we kick off a project, and what is your onboarding timeline?",
    answer:
      "You can book a technical audit or reach out through our contact portal. We review your requirements within 24 hours, deliver a fixed-scope milestone proposal, and typically launch sprint kickoff within 3 to 5 business days.",
    category: "GENERAL",
    targetPage: "ABOUT",
    highlightBadge: "ONBOARDING",
    status: "ACTIVE",
    order: 12,
  },

  // --- PLANS PAGE FAQS (From PlansFaqSection.tsx) ---
  {
    id: "FAQ-PLN-01",
    question: "Are there truly zero hourly surprises, hidden fees, or retainer traps?",
    answer:
      "Yes, 100%. Every single project we undertake operates under an ironclad, fixed-scope, flat-fee agreement. You receive a complete scope of work, technical specifications, and a locked delivery date before any contract is signed. No hourly billing, no surprise invoices, and no hostage-ware retainer lock-ins.",
    category: "PRICING",
    targetPage: "PLANS",
    highlightBadge: "FLAT-FEE GUARANTEE",
    status: "ACTIVE",
    order: 13,
  },
  {
    id: "FAQ-PLN-02",
    question: "How do sprint payments and billing milestones work?",
    answer:
      "For Starter MVP and Growth Studio tiers, billing is structured as 50% upfront at sprint kickoff and 50% upon final production deployment and QA verification. For Enterprise Scale engagements, we offer milestone-based disbursement aligned with major architectural deliverables.",
    category: "PRICING",
    targetPage: "PLANS",
    highlightBadge: "PAYMENT STRUCTURE",
    status: "ACTIVE",
    order: 14,
  },
  {
    id: "FAQ-PLN-03",
    question: "What happens if we need scope expansion or extra features mid-sprint?",
    answer:
      "We protect both your budget and your launch deadline. If new features or pivots emerge during development, we immediately scope them as discrete, modular add-on sprints with transparent flat pricing. You can choose to add them instantly or queue them for Phase 2 without delaying your core production launch.",
    category: "PRICING",
    targetPage: "PLANS",
    highlightBadge: "SCOPE MANAGEMENT",
    status: "ACTIVE",
    order: 15,
  },
  {
    id: "FAQ-PLN-04",
    question: "Do we own 100% of the code, intellectual property, and design systems?",
    answer:
      "Yes, absolute 100% transfer. Upon final payment, we execute a complete intellectual property transfer. You receive full administrative rights to your GitHub repository, live Vercel/AWS environments, Figma design system source files, database schemas, and credentials. You are never locked into our studio.",
    category: "OWNERSHIP",
    targetPage: "PLANS",
    highlightBadge: "IP & ASSET OWNERSHIP",
    status: "ACTIVE",
    order: 16,
  },
  {
    id: "FAQ-PLN-05",
    question: "What is covered under the 30-Day Post-Launch Warranty?",
    answer:
      "Our post-launch warranty covers 100% of bug fixes, browser regressions, third-party API webhook verification, and performance monitoring. If anything breaks or fails to meet our agreed-upon 100/100 Core Web Vitals benchmark, our senior engineers resolve it immediately at zero cost.",
    category: "ENGINEERING",
    targetPage: "PLANS",
    highlightBadge: "POST-LAUNCH WARRANTY",
    status: "ACTIVE",
    order: 17,
  },
  {
    id: "FAQ-PLN-06",
    question: "How does the Retained SLA ($3,499/mo) work and can it be cancelled?",
    answer:
      "Our Retained SLA provides a dedicated engineering allocation every month for continuous feature rollouts, API scaling, security patches, technical SEO audits, and 24/7 uptime monitoring with a 4-hour SLA response time. It operates on a flexible month-to-month basis with zero long-term lock-in—cancel anytime with 14 days notice.",
    category: "PRICING",
    targetPage: "PLANS",
    highlightBadge: "CONTINUOUS SLA",
    status: "ACTIVE",
    order: 18,
  },
];

// -----------------------------------------------------------------------------
// 8. AGENCY SETTINGS TYPES & DATA
// -----------------------------------------------------------------------------

export interface AdminAgencySettings {
  agencyName: string;
  email: string;
  phone: string;
  address: {
    street: string;
    city: string;
    state: string;
    zip: string;
    country: string;
    coordinates: string;
  };
  siteTagline: string;
  socialLinks: {
    github: string;
    twitter: string;
    linkedin: string;
    discord: string;
  };
  lighthouseTarget: number;
  slaResponseTimeHours: number;
  defaultCurrency: string;
  activeSprintSlots: number;
}

export const INITIAL_AGENCY_SETTINGS: AdminAgencySettings = {
  agencyName: "CodeClovers Studio",
  email: "hello@codeclovers.dev",
  phone: "+1 (415) 890-4221",
  address: {
    street: "Market Street, SoMa District",
    city: "San Francisco",
    state: "CA",
    zip: "94103",
    country: "United States",
    coordinates: "37.7749° N, 122.4194° W",
  },
  siteTagline: "High-Speed Web Engineering, Modern Design Systems & Zero-Bloat Next.js Architecture",
  socialLinks: {
    github: "https://github.com/codeclovers",
    twitter: "https://twitter.com/codeclovers",
    linkedin: "https://linkedin.com/company/codeclovers",
    discord: "https://discord.gg/codeclovers",
  },
  lighthouseTarget: 100,
  slaResponseTimeHours: 4,
  defaultCurrency: "USD",
  activeSprintSlots: 2,
};

// -----------------------------------------------------------------------------
// 9. KPI STATS TYPES & DATA
// -----------------------------------------------------------------------------

export interface AdminKpiStats {
  totalInquiries: number;
  activeSprints: number;
  publishedMemos: number;
  revenueMtd: string;
  avgLighthouseScore: number;
  inquiriesDelta?: string;
  sprintsCapacity?: string;
  totalMemoViews?: string;
  revenueDelta?: string;
  avgSlaResponseTime?: string;
}

export const INITIAL_KPI_STATS: AdminKpiStats = {
  totalInquiries: 48,
  activeSprints: 6,
  publishedMemos: 6,
  revenueMtd: "$48,990",
  avgLighthouseScore: 100,
  inquiriesDelta: "+18% this month",
  sprintsCapacity: "6 of 8 sprint slots booked",
  totalMemoViews: "66.6k readers",
  revenueDelta: "+24.5% vs previous period",
  avgSlaResponseTime: "2.4 hours (SLA: <4h)",
};

// -----------------------------------------------------------------------------
// UNIFIED AGGREGATE STATE & HELPER COLOR MAPS
// -----------------------------------------------------------------------------

export interface AdminFullState {
  inquiries: AdminInquiry[];
  memos: AdminJournalMemo[];
  services: AdminService[];
  plans: AdminPlan[];
  projects: AdminPortfolioProject[];
  reviews: AdminClientReview[];
  faqs: AdminFaqItem[];
  settings: AdminAgencySettings;
  kpis: AdminKpiStats;
}

export const INITIAL_ADMIN_FULL_STATE: AdminFullState = {
  inquiries: INITIAL_INQUIRIES,
  memos: INITIAL_JOURNAL_MEMOS,
  services: INITIAL_SERVICES,
  plans: INITIAL_PLANS,
  projects: INITIAL_PROJECTS,
  reviews: INITIAL_CLIENT_REVIEWS,
  faqs: INITIAL_FAQS,
  settings: INITIAL_AGENCY_SETTINGS,
  kpis: INITIAL_KPI_STATS,
};

/**
 * Neo-Brutalist Swiss color tokens for Inquiry Status pills
 */
export const INQUIRY_STATUS_CONFIG: Record<
  InquiryStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  NEW: {
    label: "NEW DISPATCH",
    bg: "bg-accent-yellow",
    text: "text-ink-black",
    border: "border-ink-black",
  },
  REVIEW: {
    label: "IN TRIAGE",
    bg: "bg-accent-teal",
    text: "text-ink-black",
    border: "border-ink-black",
  },
  SCHEDULED: {
    label: "CALL BOOKED",
    bg: "bg-sky-100",
    text: "text-sky-900",
    border: "border-sky-900",
  },
  WON: {
    label: "WON SPRINT",
    bg: "bg-emerald-300",
    text: "text-emerald-950",
    border: "border-emerald-950",
  },
  ARCHIVED: {
    label: "ARCHIVED",
    bg: "bg-neutral-200",
    text: "text-neutral-700",
    border: "border-neutral-700",
  },
};

/**
 * Neo-Brutalist Swiss color tokens for Journal Memo Status
 */
export const MEMO_STATUS_CONFIG: Record<
  MemoStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  PUBLISHED: {
    label: "LIVE / PUBLISHED",
    bg: "bg-emerald-300",
    text: "text-emerald-950",
    border: "border-ink-black",
  },
  DRAFT: {
    label: "DRAFT / UNPUBLISHED",
    bg: "bg-accent-yellow",
    text: "text-ink-black",
    border: "border-ink-black",
  },
};

/**
 * Neo-Brutalist Swiss color tokens for Plan Status
 */
export const PLAN_STATUS_CONFIG: Record<
  PlanStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  ACTIVE: {
    label: "ACCEPTING CLIENTS",
    bg: "bg-emerald-300",
    text: "text-emerald-950",
    border: "border-ink-black",
  },
  FULL: {
    label: "SLOTS FILLED / WAITLIST",
    bg: "bg-accent-red",
    text: "text-white",
    border: "border-ink-black",
  },
};

/**
 * Neo-Brutalist Swiss color tokens for Service Status
 */
export const SERVICE_STATUS_CONFIG: Record<
  ServiceStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  ACTIVE: {
    label: "ACTIVE CAPABILITY",
    bg: "bg-accent-teal",
    text: "text-ink-black",
    border: "border-ink-black",
  },
  PAUSED: {
    label: "CURRENTLY PAUSED",
    bg: "bg-neutral-300",
    text: "text-neutral-800",
    border: "border-neutral-800",
  },
};

/**
 * Neo-Brutalist Swiss color tokens for FAQ Categories
 */
export const FAQ_CATEGORY_CONFIG: Record<
  FaqCategory,
  { label: string; bg: string; text: string; border: string }
> = {
  GENERAL: {
    label: "GENERAL PROCESS",
    bg: "bg-paper-beige",
    text: "text-ink-black",
    border: "border-ink-black",
  },
  PRICING: {
    label: "PRICING & SPRINT",
    bg: "bg-accent-yellow",
    text: "text-ink-black",
    border: "border-ink-black",
  },
  ENGINEERING: {
    label: "ENGINEERING & SPEED",
    bg: "bg-accent-teal",
    text: "text-ink-black",
    border: "border-ink-black",
  },
  OWNERSHIP: {
    label: "100% IP OWNERSHIP",
    bg: "bg-accent-red",
    text: "text-white",
    border: "border-ink-black",
  },
};

/**
 * Neo-Brutalist Swiss color tokens for FAQ Target Pages
 */
export const FAQ_PAGE_CONFIG: Record<
  FaqTargetPage,
  { label: string; bg: string; text: string; border: string }
> = {
  HOME: {
    label: "HOME PAGE",
    bg: "bg-white",
    text: "text-ink-black",
    border: "border-ink-black",
  },
  ABOUT: {
    label: "ABOUT PAGE",
    bg: "bg-sky-100",
    text: "text-sky-950",
    border: "border-sky-950",
  },
  PLANS: {
    label: "PLANS PAGE",
    bg: "bg-amber-100",
    text: "text-amber-950",
    border: "border-amber-950",
  },
  ALL: {
    label: "GLOBAL / ALL",
    bg: "bg-purple-100",
    text: "text-purple-950",
    border: "border-purple-950",
  },
};

/**
 * Neo-Brutalist Swiss color tokens for FAQ Status
 */
export const FAQ_STATUS_CONFIG: Record<
  FaqStatus,
  { label: string; bg: string; text: string; border: string }
> = {
  ACTIVE: {
    label: "ACTIVE // DISPLAYED",
    bg: "bg-emerald-300",
    text: "text-emerald-950",
    border: "border-ink-black",
  },
  HIDDEN: {
    label: "HIDDEN // DRAFT",
    bg: "bg-neutral-200",
    text: "text-neutral-700",
    border: "border-neutral-700",
  },
};
