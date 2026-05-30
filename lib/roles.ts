export type Role = {
  slug: string;
  title: string;
  team: "GEO" | "Paid" | "Engineering" | "Operations";
  location: string;
  type: "Full-time" | "Contract" | "Open-application";
  oneLiner: string;
  status: "Open" | "Hiring soon" | "Always open";
};

export const ROLES: Role[] = [
  {
    slug: "head-of-geo",
    title: "Head of GEO",
    team: "GEO",
    location: "Central EU · Hybrid",
    type: "Full-time",
    oneLiner:
      "Own the GEO function end-to-end. Set the playbook, lead 2–3 strategists, deliver compounding citation share for our portfolio.",
    status: "Hiring soon",
  },
  {
    slug: "head-of-paid",
    title: "Head of Paid",
    team: "Paid",
    location: "US East · Remote",
    type: "Full-time",
    oneLiner:
      "Brand-search capture + Quality Score engineering on accounts spending $50K–$2M/mo. Coordinate tightly with the GEO side.",
    status: "Hiring soon",
  },
  {
    slug: "founding-engineer",
    title: "Founding Engineer (platform)",
    team: "Engineering",
    location: "Central EU · Hybrid",
    type: "Full-time",
    oneLiner:
      "Build the Momentus dashboard the agency runs on. TypeScript + Next.js + Python backend. Comfortable owning systems end-to-end.",
    status: "Hiring soon",
  },
  {
    slug: "client-strategist",
    title: "Client Strategist",
    team: "Operations",
    location: "Anywhere · Remote",
    type: "Contract",
    oneLiner:
      "One foot in client conversations, one foot in the analytics. Translate the dashboard into next-quarter strategy.",
    status: "Open",
  },
  {
    slug: "open-application",
    title: "Don't see your role?",
    team: "Operations",
    location: "Anywhere",
    type: "Open-application",
    oneLiner:
      "We hire opportunistically when the person is right. Send us your story.",
    status: "Always open",
  },
];
