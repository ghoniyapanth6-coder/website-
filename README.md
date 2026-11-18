# CodeClovers — High-Performance Web Engineering Agency

A production-grade, Neo-Brutalist & Swiss Grid digital studio platform built with **Next.js 14 (App Router)**, **TypeScript**, and **Tailwind CSS**.

---

## ⚡ Architecture & Performance SLA

- **Framework**: Next.js 14+ with React Server Components (RSC) and streaming SSR.
- **Language**: TypeScript (100% strict type safety).
- **Styling**: Tailwind CSS with custom Neo-Brutalist design tokens (2px/4px ink-black borders, `#FFE600` accent yellow, `#FF3E1D` accent red, `#00C2CB` accent teal, washi-tape accents, and paper-ruled backgrounds).
- **Typography**: Space Grotesk (display), Plus Jakarta Sans (body), JetBrains Mono (monospaced code & data).
- **Core Web Vitals SLA**: Guaranteed 100/100 Google Lighthouse scores, sub-200ms TTFB edge responses, and 0.000 CLS.
- **Accessibility**: Built to exceed WCAG AAA high-contrast standards (21:1 contrast ratios).

---

## 🚀 Key Platform Routes

| Route | Discipline | Description |
|---|---|---|
| `/` | **Home** | Swiss Grid modular hero, interactive speed audit trigger, featured works, testimonials, and client FAQ. |
| `/about` | **Studio** | Centered 3-line headline (`WE DON'T BUILD WEBSITES. / WE ENGINEER [HIGH-SPEED] / MACHINES.`), full-stack tech stack matrix, values, and senior team. |
| `/services` | **Engineering** | 4 full-screen 100vh core modules: Web Development, UI/UX Design Systems, Strategic Branding, and Technical SEO. |
| `/plans` | **Sprint Pricing** | Fixed-scope sprint cards ($1,999 Starter MVP, $4,499 Growth Studio, $8,999+ Enterprise), Retained SLA banner ($3,499/mo), and Deep Architectural Comparison Matrix. |
| `/journal` | **Memos** | Interactive search & category filter, featured lead story, and production architecture teardowns. |
| `/journal/[slug]` | **Deep Memos** | Dynamic engineering post-mortems with before-after benchmark tables, syntax-highlighted code blocks, checklists, and executive summaries. |
| `/contact` | **Dispatch** | Direct technical inquiry dispatch with interactive budget selectors, service pills, and 4-hour SLA promise. |

---

## 🛠️ Getting Started

### Prerequisites

- Node.js 18.17+ or 20+
- npm or pnpm

### Installation

```bash
# Clone the repository
git clone https://github.com/ghoniyapanth6-coder/codeclovers-agency.git
cd codeclovers-agency

# Install dependencies
npm install

# Run the development server
npm run dev

# Build for production
npm run build

# Start production server on port 3005
npm run start
```

Visit [http://localhost:3005](http://localhost:3005) in your browser.

---

## 📦 Project Structure

```
├── public/                 # Static assets & brand vectors
├── src/
│   ├── app/                # Next.js 14 App Router routes
│   │   ├── about/          # Studio philosophy & tech matrix
│   │   ├── blog/           # Redirects to /journal
│   │   ├── contact/        # Technical call & dispatch form
│   │   ├── journal/        # Engineering journal & memos
│   │   │   └── [slug]/     # Dynamic detailed memo teardowns
│   │   ├── plans/          # Fixed-scope pricing & deep comparison matrix
│   │   ├── services/       # 4 full-screen architectural disciplines
│   │   ├── layout.tsx      # Root layout with fonts & global providers
│   │   └── page.tsx        # Agency landing page
│   ├── components/         # Modular Neo-Brutalist Swiss UI components
│   │   ├── BrutFooter.tsx
│   │   ├── BrutHero.tsx
│   │   ├── JournalFilterClient.tsx
│   │   ├── Navbar.tsx
│   │   ├── PlansFaqSection.tsx
│   │   ├── StatusMarquee.tsx
│   │   └── TestimonialsSection.tsx
│   └── data/               # Type-safe static datasets
│       └── journalArticles.ts
├── tailwind.config.js      # Neo-Brutalist color tokens & shadows
└── tsconfig.json           # Strict TypeScript configuration
```

---

## 📄 License & IP

100% Intellectual Property Ownership transfer. Licensed under the MIT License.
