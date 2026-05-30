import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/ui/json-ld";
import { serviceJsonLd } from "@/lib/seo/service";
import { breadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { ServiceLayout } from "../_components/ServiceLayout";
import { GeoSampleReport } from "../_components/SampleReports";
import { SHARED_CASES } from "../_components/shared";

const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://momentus.ai";

const SUB =
  "We engineer how ChatGPT, Perplexity, Gemini, Claude and Copilot interpret your category — so when a buyer asks \"who's best?\", your name is one of the first they read.";

export const metadata: Metadata = {
  title: "GEO | Momentus",
  description: SUB,
  keywords: [
    "GEO",
    "generative engine optimization",
    "AI visibility",
    "ChatGPT citations",
    "Perplexity ranking",
    "Gemini citations",
    "Claude citations",
    "AI search agency",
    "B2B GEO",
    "AI SEO",
  ],
  openGraph: {
    title: "GEO | Momentus",
    description: SUB,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GEO | Momentus",
    description: SUB,
    images: ["/opengraph-image"],
  },
};

export default function GeoPage() {
  const serviceSchema = serviceJsonLd({
    url: `${SITE_BASE}/services/geo`,
    name: "Become the brand AI quietly recommends.",
    description: SUB,
    serviceType: "Generative Engine Optimization (GEO)",
  });
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "GEO", href: "/services/geo" },
  ]);

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <Nav />
      <main>
        <ServiceLayout
          trackingLocation="services_geo"
          eyebrow="01 / Service · GEO"
          title={<>Become the brand AI quietly recommends.</>}
          sub={SUB}
          primaryCtaLabel="Book a free audit"
          secondaryCta={{ label: "See the proof", href: "#proof" }}
          audience={[
            "Brands $5M–$500M revenue with a real category to defend",
            "Inbound-heavy go-to-market with content / SEO already invested",
            "Categories where the buyer journey starts with research, not a referral",
          ]}
          deliverables={[
            {
              n: "01",
              title: "Visibility audit",
              body: "Your citation share across ChatGPT, Perplexity, Gemini, Claude and Copilot today — mapped to your top 50 buyer queries, with movement targets per query.",
              chip: "PDF report",
            },
            {
              n: "02",
              title: "Entity & schema engineering",
              body: "Making your brand legible to retrieval systems. Knowledge graph signals, schema.org coverage, Wikipedia-grade source pages and entity disambiguation.",
              chip: "Schema audit",
            },
            {
              n: "03",
              title: "Per-platform signal stacks",
              body: "ChatGPT, Perplexity, Gemini and Google AI Overview do not interpret your category the same way. We build a separate signal layer for each, with discrete proof artifacts.",
              chip: "Signal blueprint",
            },
            {
              n: "04",
              title: "Citation reverse-engineering",
              body: "For queries where competitors win, we identify why — which sources, which framings, which patterns. Then we close the gap with primary material AI prefers to cite.",
              chip: "Citation map",
            },
            {
              n: "05",
              title: "Content gap closure",
              body: "Publishing the missing primary sources — your own and earned third-party — so AI has authoritative material to quote. Editorial, technical and PR coordinated in one motion.",
              chip: "Publishing cadence",
            },
            {
              n: "06",
              title: "Weekly delta reports",
              body: "Every Monday: what moved, why, what's next. One page. No 60-slide decks. You always know what we did with the week.",
              chip: "Weekly PDF",
            },
          ]}
          timeline={[
            {
              range: "Day 0–30",
              title: "Audit + signal stack design",
              body: "Visibility audit lands week 1. Signal stacks designed per platform. First publishing batch shipped. Schema patches and entity coherence work begins.",
              curve: [4, 8, 14, 20, 28, 36, 44],
            },
            {
              range: "Day 30–60",
              title: "Citation movement begins",
              body: "First delta report ships. Citations climb on 8–12 of your top 50 queries. Second publishing batch goes live. Third-party citation outreach starts hitting.",
              curve: [44, 52, 60, 66, 70, 74, 78],
            },
            {
              range: "Day 60–90",
              title: "Default-brand status forming",
              body: "On 1–2 highest-volume query patterns, you start reading as the default name. Entity coherence locked across platforms. We hand you the plan for the next 90.",
              curve: [78, 82, 86, 88, 91, 93, 95],
            },
          ]}
          sampleReport={<GeoSampleReport />}
          cases={SHARED_CASES}
          faqs={[
            {
              q: "Will AI penalize us for trying to influence citations?",
              a: "No. The work is making authoritative source material easier for retrieval systems to find and quote. Same as good SEO and good PR, applied to a new surface. No prompt-injection, no synthetic third-party content, no tactics that get you de-listed when a model refreshes.",
            },
            {
              q: "Do you guarantee #1?",
              a: "No. We guarantee a defensible plan, weekly transparency on what moved and why, and the honest call if a query is uneconomic to chase. Agencies who guarantee placement in retrieval systems are either lying or about to be caught.",
            },
            {
              q: "What if the AI changes its model?",
              a: "Default-brand status moves with the brand, not the model. We've shipped through four major model refreshes — the brands we've built into the substrate keep their citations because the substrate is your entity graph, your primary sources and your third-party authority. That's portable.",
            },
          ]}
          finalCta="Book a free GEO audit. 30 minutes. You walk away with a clear plan — or the honest answer that this isn't your lever."
        />
      </main>
      <Footer />
    </>
  );
}
