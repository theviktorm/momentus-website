import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ServiceLayout } from "../_components/ServiceLayout";
import { PaidSampleReport } from "../_components/SampleReports";
import { SHARED_CASES } from "../_components/shared";

const SUB =
  "When AI pre-sells your category, ads stop fighting cold attention. We run search, social and brand-search capture engineered to harvest the trust GEO creates — higher CTR, lower CPC, faster conversions.";

export const metadata: Metadata = {
  title: "Paid | Momentus",
  description: SUB,
  keywords: [
    "paid media agency",
    "B2B paid",
    "Google Ads agency",
    "Quality Score engineering",
    "brand-search capture",
    "LTV CAC",
    "AI-warmed paid",
    "performance marketing B2B",
  ],
  openGraph: {
    title: "Paid | Momentus",
    description: SUB,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Paid | Momentus",
    description: SUB,
    images: ["/opengraph-image"],
  },
};

export default function PaidPage() {
  return (
    <>
      <Nav />
      <main>
        <ServiceLayout
          trackingLocation="services_paid"
          eyebrow="02 / Service · Paid"
          title={<>Paid that compounds, not paid that taxes.</>}
          sub={SUB}
          primaryCtaLabel="Book a free audit"
          secondaryCta={{ label: "See the proof", href: "#proof" }}
          audience={[
            "Currently spending $50K+/month on paid acquisition",
            "CAC trending up; AI visibility share trending down",
            "Brand search underperforming relative to category demand",
          ]}
          deliverables={[
            {
              n: "01",
              title: "Brand-search capture",
              body: "Search and social campaigns engineered around the queries AI sends to Google. Branded, comparison and category queries treated as three distinct economics, not one bucket.",
              chip: "Campaign blueprint",
            },
            {
              n: "02",
              title: "Quality Score engineering",
              body: "The relevance signals that drop CPC: keyword-to-ad-to-LP coherence, expected CTR, landing experience. We rebuild what existing accounts let drift, one ad group at a time.",
              chip: "QS rebuild",
            },
            {
              n: "03",
              title: "AI-warmed audience layering",
              body: "Audiences built off citation themes and intent signals, layered into Performance Max, Demand Gen and Meta Advantage+. Warmer cohorts, lower frequency, cleaner spend.",
              chip: "Audience stack",
            },
            {
              n: "04",
              title: "Creative testing pipeline",
              body: "A continuous test cadence tied to the citation themes GEO surfaces. Creative that mirrors how AI describes your category outperforms creative invented in a vacuum.",
              chip: "Test calendar",
            },
            {
              n: "05",
              title: "LTV : CAC reconstruction",
              body: "Cohort analysis on first-touch, blended and incremental CAC. You see what ad money actually returns, not just last-click ROAS that flatters the budget.",
              chip: "Cohort model",
            },
            {
              n: "06",
              title: "Weekly spend optimization",
              body: "Spend, CPC, Quality Score, ROAS by channel — every Monday. Cost transparency baked in. No agency margin hidden in media markups.",
              chip: "Weekly PDF",
            },
          ]}
          timeline={[
            {
              range: "Day 0–30",
              title: "Audit, attribution, warm-up",
              body: "Full audit of existing spend. Attribution rebuilt to handle blended + incremental view. New creative warmed up. Brand-search account restructured. Nothing risky touched yet.",
              curve: [10, 12, 16, 22, 28, 36, 44],
            },
            {
              range: "Day 30–60",
              title: "CPC drop starts compounding",
              body: "Quality Score climbs as relevance signals fire correctly. CPC drops on branded + comparison queries first. Creative tests start producing winners. Spend reallocates.",
              curve: [44, 50, 55, 62, 68, 72, 76],
            },
            {
              range: "Day 60–90",
              title: "Brand-search lift, LTV : CAC restructured",
              body: "Branded search volume climbing in tandem with citations. LTV : CAC reconstructed with cohort data. ROAS narrative moves from last-click to incremental. Board-ready.",
              curve: [76, 80, 84, 87, 90, 92, 95],
            },
          ]}
          sampleReport={<PaidSampleReport />}
          cases={SHARED_CASES}
          faqs={[
            {
              q: "Do we keep our existing ad accounts?",
              a: "Yes. We don't migrate or hostage anything. Accounts stay yours, billing stays yours, history stays yours. If we part ways, you keep everything intact — including the structural work we did.",
            },
            {
              q: "Is there a minimum spend?",
              a: "We work above $50K/month because that's where Quality Score engineering, cohort modeling and the brand-search capture layer compound. Below that, the math on a specialist team doesn't beat a strong generalist freelancer.",
            },
            {
              q: "Can we keep our current paid agency too?",
              a: "No. Two paid teams in one account creates coordination overhead that eats the lift we're paid to produce. The flywheel only closes when one team owns the spend, the creative and the citation themes it's harvesting.",
            },
          ]}
          finalCta="Book a free paid audit. We'll show you exactly where your CPC, Quality Score and brand search are leaking — and what the lift looks like once we fix it."
        />
      </main>
      <Footer />
    </>
  );
}
