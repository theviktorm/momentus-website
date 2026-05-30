import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { JsonLd } from "@/components/ui/json-ld";
import { serviceJsonLd } from "@/lib/seo/service";
import { breadcrumbJsonLd } from "@/lib/seo/breadcrumb";
import { ServiceLayout } from "../_components/ServiceLayout";
import { GeoXPaidSampleReport } from "../_components/SampleReports";
import { SHARED_CASES } from "../_components/shared";

const SITE_BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://momentus.ai";

const SUB =
  "GEO creates trust. Paid multiplies it. AI reinforces the winner. The compounding loop only closes when both halves are run by the same team — not two agencies trading blame.";

export const metadata: Metadata = {
  title: "GEO × Paid | Momentus",
  description: SUB,
  keywords: [
    "GEO and paid agency",
    "AI visibility paid combined",
    "GEO Paid flywheel",
    "B2B specialist agency",
    "CMO agency",
    "compounding paid",
    "AI SEO and paid",
    "Momentus flywheel",
  ],
  openGraph: {
    title: "GEO × Paid | Momentus",
    description: SUB,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "GEO × Paid | Momentus",
    description: SUB,
    images: ["/opengraph-image"],
  },
};

export default function GeoXPaidPage() {
  const serviceSchema = serviceJsonLd({
    url: `${SITE_BASE}/services/geo-x-paid`,
    name: "The full flywheel. Both halves, run together.",
    description: SUB,
    serviceType: "GEO and Paid Media (Integrated Flywheel)",
  });
  const breadcrumbSchema = breadcrumbJsonLd([
    { name: "Home", href: "/" },
    { name: "Services", href: "/services" },
    { name: "GEO × Paid", href: "/services/geo-x-paid" },
  ]);

  return (
    <>
      <JsonLd data={[serviceSchema, breadcrumbSchema]} />
      <Nav />
      <main>
        <ServiceLayout
          trackingLocation="services_geo_x_paid"
          eyebrow="03 / Service · GEO × Paid"
          title={<>The full flywheel. Both halves, run together.</>}
          sub={SUB}
          primaryCtaLabel="Book a full audit"
          secondaryCta={{ label: "See the math", href: "#roi-math" }}
          audience={[
            "Revenue $10M+ with category leadership in reach",
            "Already running paid; understand the compounding case for trust",
            "Ready to commit a 90-day initial sprint, not a 30-day pilot",
          ]}
          deliverables={[
            {
              n: "01",
              title: "Joint audit (GEO + Paid + signal coherence)",
              body: "One audit, three lenses: citation share, paid efficiency and the coherence between them. We surface where the two halves are silently undercutting each other.",
              chip: "PDF report",
            },
            {
              n: "02",
              title: "Per-platform signal stacks tied to paid testing",
              body: "GEO signal stacks per platform, designed so the citation themes we engineer feed directly into paid creative tests. Two motions, one taxonomy.",
              chip: "Joint blueprint",
            },
            {
              n: "03",
              title: "Brand-search capture with citation-aware creative",
              body: "Paid funnels engineered around the language AI uses to describe your category. The buyer reads it in ChatGPT, then sees it again in your ad. Same words. Same trust.",
              chip: "Funnel system",
            },
            {
              n: "04",
              title: "Unified weekly report",
              body: "Citation movement and paid efficiency in one place. One number to grade the agency by, not two reports trading credit. CMO-ready.",
              chip: "Weekly PDF",
            },
            {
              n: "05",
              title: "Cost reduction targets per quarter",
              body: "Modeled trajectory: −22% CPC by month 4, ROAS +30–60% on primary campaigns by month 3. Targets you can hold us to, with the assumptions written down.",
              chip: "Quarterly model",
            },
            {
              n: "06",
              title: "Dedicated strategist",
              body: "Single point of contact across GEO and Paid — not a pod, not three account managers. The person you call also runs the meeting and ships the deliverables.",
              chip: "Single owner",
            },
          ]}
          timeline={[
            {
              range: "Day 0–30",
              title: "Joint audit + signal design + paid restructure",
              body: "Audit lands week 1. Signal stacks designed. Paid accounts restructured for Quality Score recovery. No risky changes; baselines locked.",
              curve: [6, 10, 16, 24, 32, 40, 48],
            },
            {
              range: "Day 30–60",
              title: "Citations climbing + CPC dropping in tandem",
              body: "First compounding evidence: citations rising on 10–15 queries, CPC dropping 12–18% on branded + comparison campaigns. Creative tests winning on citation themes.",
              curve: [48, 56, 62, 68, 74, 78, 82],
            },
            {
              range: "Day 60–90",
              title: "Default-brand status + ROAS lift",
              body: "Default-brand status forming in 2–3 query clusters. ROAS up 30–60% on primary campaigns. Branded search volume climbing structurally. Plan for next 90 in hand.",
              curve: [82, 86, 89, 91, 93, 95, 97],
            },
          ]}
          extraAfterTimeline={<RoiMath />}
          sampleReport={<GeoXPaidSampleReport />}
          cases={SHARED_CASES}
          faqs={[
            {
              q: "Why not run GEO and paid with two specialist agencies?",
              a: "Because the lift comes from coherence — the same language in citations, ads, landing pages and proof. Two agencies optimize against two scoreboards. We've watched that pattern destroy compounding for three years. One owner, one scoreboard, one report.",
            },
            {
              q: "Can you take over from our current paid agency mid-flight?",
              a: "Yes. We do a 21-day overlap on account access only — no spend disruption — then a clean handoff with full documentation of every change we make. Your team and your finance org see every line.",
            },
            {
              q: "What if GEO moves but paid doesn't, or vice versa?",
              a: "The model is published with assumptions. If month-3 citation movement misses, we're transparent about what's lagging and why, and we'll re-baseline rather than coast. Same on the paid side. The agency does not get to point at the other half.",
            },
          ]}
          finalCta="Book a 30-minute audit covering both halves. We tell you which lever moves first, the realistic timeline, and whether we're a fit."
        />
      </main>
      <Footer />
    </>
  );
}

function RoiMath() {
  const rows = [
    { stage: "AI warms the market", metric: "Citation share +52%", note: "weeks 4–8" },
    { stage: "Branded search rises", metric: "+22% intent volume", note: "month 2" },
    { stage: "Quality Score lifts", metric: "CPC −18%", note: "month 3" },
    { stage: "Warmer traffic converts", metric: "CVR +14%", note: "month 3" },
    { stage: "Net blended improvement", metric: "LTV : CAC 1.7×", note: "month 4" },
  ];
  return (
    <section id="roi-math" className="relative scroll-mt-28 py-16 md:py-24">
      <div className="container">
        <div className="glass relative overflow-hidden rounded-3xl p-6 md:p-10">
          <div className="grid gap-8 md:grid-cols-[1.1fr_1fr]">
            <div>
              <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
                The math
              </span>
              <h2 className="font-display mt-4 text-balance text-3xl font-medium tracking-tight md:text-4xl">
                Why the combined motion compounds.
              </h2>
              <p className="mt-4 max-w-md text-white/65">
                Each half makes the other cheaper. Modeled trajectory using observed
                ranges from existing clients — your starting baseline shifts the numbers
                but the directionality holds across categories.
              </p>
            </div>
            <ol className="space-y-3">
              {rows.map((r, i) => (
                <li
                  key={r.stage}
                  className="flex items-center gap-4 rounded-xl border border-white/10 bg-black/30 p-4"
                >
                  <span className="font-mono text-xs text-accent">0{i + 1}</span>
                  <div className="min-w-0 flex-1">
                    <div className="text-sm text-white/85">{r.stage}</div>
                    <div className="font-mono text-[11px] uppercase tracking-widest text-white/40">
                      {r.note}
                    </div>
                  </div>
                  <span className="font-mono whitespace-nowrap text-sm text-accent">
                    {r.metric}
                  </span>
                </li>
              ))}
            </ol>
          </div>
        </div>
      </div>
    </section>
  );
}
