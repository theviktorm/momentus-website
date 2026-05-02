import type { Metadata } from "next";
import { Inter, Space_Grotesk } from "next/font/google";
import "./globals.css";
import { Providers } from "@/components/providers";
import { ScrollProgress } from "@/components/ui/scroll-progress";

const inter = Inter({ subsets: ["latin"], variable: "--font-inter", display: "swap" });
const display = Space_Grotesk({ subsets: ["latin"], variable: "--font-display", display: "swap" });

export const metadata: Metadata = {
  title: "Momentus | Take First Place in AI Citations",
  description:
    "GEO + Paid, run together. We engineer AI visibility so ChatGPT, Perplexity and Gemini quietly recommend you as the default brand. Paid harvests the trust.",
  openGraph: {
    title: "Momentus | Take First Place in AI Citations",
    description:
      "GEO + Paid, run together. We engineer AI visibility so ChatGPT, Perplexity and Gemini quietly recommend you as the default brand.",
    type: "website",
  },
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en" className={`${inter.variable} ${display.variable} dark`}>
      <body className="font-sans antialiased">
        <ScrollProgress />
        <Providers>{children}</Providers>
      </body>
    </html>
  );
}
