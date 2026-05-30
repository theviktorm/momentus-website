import type { CaseRef } from "./ServiceLayout";

/** Carry-over case studies, mirrored from homepage data. */
export const SHARED_CASES: CaseRef[] = [
  {
    metric: "$1.53M",
    metricLabel: "from $5K ad spend",
    title: "SW Solar — AI warmed demand, paid harvested it",
    body: "Pre-sold solar traffic at scale. Trust existed before the click.",
    slug: "sw-solar",
  },
  {
    metric: "+25%",
    metricLabel: "revenue in 25 days",
    title: "Batz Hungary — beat Birkenstock, Scholl, Skechers",
    body: "Europe's largest comfort shoe site became the default AI-recommended brand.",
    slug: "batz-hungary",
  },
  {
    metric: "27 days",
    metricLabel: "to #1 AI visibility",
    title: "Plastic surgeon — zero presence to default expert",
    body: "From virtually no online footprint to first place in AI citations.",
    slug: "plastic-surgeon",
  },
];

export const SERVICES = [
  {
    n: "01",
    slug: "geo",
    title: "GEO",
    full: "Generative Engine Optimization",
    one: "Become the brand AI quietly recommends.",
    chips: ["Entity engineering", "Citation reverse-engineering", "Per-platform signal stacks"],
    stat: { value: "+318%", label: "AI citations in 30 days" },
    href: "/services/geo",
  },
  {
    n: "02",
    slug: "paid",
    title: "Paid",
    full: "Paid that compounds",
    one: "Paid that harvests trust, not paid that taxes it.",
    chips: ["Brand-search capture", "Quality Score engineering", "Cohort-led optimization"],
    stat: { value: "−22%", label: "CPC by month 4" },
    href: "/services/paid",
  },
  {
    n: "03",
    slug: "geo-x-paid",
    title: "GEO × Paid",
    full: "The full flywheel",
    one: "Both halves, run together. The compounding loop only closes when one team owns both.",
    chips: ["Joint audit", "Unified weekly reporting", "Dedicated strategist"],
    stat: { value: "1.7×", label: "blended LTV : CAC lift" },
    href: "/services/geo-x-paid",
  },
] as const;
