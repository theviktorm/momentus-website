import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import PlausibleProvider from "next-plausible";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ScrollProgress } from "@/components/ui/scroll-progress";
import { Cursor } from "@/components/ui/cursor";
import { PageTransition } from "@/components/ui/page-transition";
import { organizationJsonLd, websiteJsonLd } from "@/lib/seo/org-jsonld";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

const PLAUSIBLE_DOMAIN = process.env.NEXT_PUBLIC_PLAUSIBLE_DOMAIN;

export const metadata: Metadata = {
  title: "Momentus | Take First Place in AI Citations",
  description:
    "GEO + Paid, run together. We engineer AI visibility so ChatGPT, Perplexity and Gemini quietly recommend you as the default brand. Paid harvests the trust.",
  openGraph: {
    title: "Momentus | Take First Place in AI Citations",
    description:
      "GEO + Paid, run together. We engineer AI visibility so ChatGPT, Perplexity and Gemini quietly recommend you as the default brand.",
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Momentus | Take First Place in AI Citations",
    description:
      "GEO + Paid, run together. We engineer AI visibility so ChatGPT, Perplexity and Gemini quietly recommend you as the default brand.",
    images: ["/opengraph-image"],
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} dark`}>
      <head>
        {PLAUSIBLE_DOMAIN ? (
          <PlausibleProvider
            src="https://plausible.io/js/script.js"
            // @ts-expect-error data-domain is required by Plausible's generic script but not in the typed props
            scriptProps={{ "data-domain": PLAUSIBLE_DOMAIN }}
          />
        ) : null}
      </head>
      <body className="font-sans antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(organizationJsonLd) }}
        />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(websiteJsonLd) }}
        />
        <ScrollProgress />
        <Cursor />
        <Providers>
          <PageTransition>{children}</PageTransition>
        </Providers>
      </body>
    </html>
  );
}
