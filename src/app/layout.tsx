import type { Metadata } from "next";
import { Space_Grotesk, Plus_Jakarta_Sans, JetBrains_Mono } from "next/font/google";
import "./globals.css";

const displayFont = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-display",
  weight: ["500", "600", "700"],
});

const sansFont = Plus_Jakarta_Sans({
  subsets: ["latin"],
  variable: "--font-sans",
  weight: ["400", "500", "600", "700", "800"],
});

const monoFont = JetBrains_Mono({
  subsets: ["latin"],
  variable: "--font-mono",
  weight: ["400", "500", "700"],
});

export const metadata: Metadata = {
  title: {
    default: "CodeClovers // High-Performance Web Development Agency",
    template: "%s | CodeClovers Agency",
  },
  description:
    "CodeClovers engineers high-speed Next.js web applications, scalable Node.js microservices, and conversion-engineered digital platforms with 100/100 Core Web Vitals.",
  keywords: [
    "CodeClovers",
    "Web Development Agency",
    "Next.js Development Agency",
    "Full Stack Node.js Developers",
    "Neo-Brutalist Web Design",
    "Technical SEO Agency",
    "High Performance Web Apps",
  ],
  authors: [{ name: "CodeClovers Engineering Team" }],
  creator: "CodeClovers Studio",
  metadataBase: new URL("https://codeclovers.dev"),
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "CodeClovers // Disruptive Web Development Studio",
    description: "Next.js 14+ • Tailwind CSS • Node.js • Technical SEO Built-in",
    url: "https://codeclovers.dev",
    siteName: "CodeClovers",
    locale: "en_US",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "CodeClovers // Web Development Agency",
    description: "Engineering digital experiences without rules.",
    creator: "@codeclovers",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${displayFont.variable} ${sansFont.variable} ${monoFont.variable}`}>
      <body className="bg-white text-ink-black min-h-screen selection:bg-accent-yellow selection:text-ink-black antialiased">
        {children}
      </body>
    </html>
  );
}
