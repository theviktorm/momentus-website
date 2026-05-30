import type { MetadataRoute } from "next";
import { CASE_STUDIES } from "@/lib/case-studies";
import { getAllInsights } from "@/lib/insights";

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://momentus.ai";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const staticPages: MetadataRoute.Sitemap = [
    { url: `${BASE}/`, lastModified: now, changeFrequency: "weekly", priority: 1.0 },
    { url: `${BASE}/services`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/geo`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/paid`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/services/geo-x-paid`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/case-studies`, lastModified: now, changeFrequency: "monthly", priority: 0.9 },
    { url: `${BASE}/insights`, lastModified: now, changeFrequency: "weekly", priority: 0.7 },
    { url: `${BASE}/product`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/walkthrough`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools/audit`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/tools/roi`, lastModified: now, changeFrequency: "monthly", priority: 0.8 },
    { url: `${BASE}/about`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/contact`, lastModified: now, changeFrequency: "monthly", priority: 0.6 },
    { url: `${BASE}/changelog`, lastModified: now, changeFrequency: "weekly", priority: 0.5 },
    { url: `${BASE}/privacy`, lastModified: now, changeFrequency: "yearly", priority: 0.3 },
  ];

  const caseStudies: MetadataRoute.Sitemap = CASE_STUDIES.map((c) => ({
    url: `${BASE}/case-studies/${c.slug}`,
    lastModified: now,
    changeFrequency: "monthly" as const,
    priority: 0.85,
  }));

  let posts: MetadataRoute.Sitemap = [];
  try {
    posts = getAllInsights().map((p) => ({
      url: `${BASE}/insights/${p.slug}`,
      lastModified: p.date ? new Date(p.date) : now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    }));
  } catch {
    /* MDX module not present at build time → skip post entries */
  }

  return [...staticPages, ...caseStudies, ...posts];
}
