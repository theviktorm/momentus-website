/**
 * Article schema builder. Used by case study + insights detail pages.
 * Wires the publisher back to the site-wide Organization node (@id) declared
 * in lib/seo/org-jsonld.ts so search engines stitch them together.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://momentus.ai";

export function articleJsonLd(args: {
  url: string;                    // absolute URL
  headline: string;
  description: string;
  datePublished: string;          // ISO date
  dateModified?: string;
  imageUrl?: string;
  authorName?: string;
}) {
  return {
    "@context": "https://schema.org",
    "@type": "Article",
    headline: args.headline,
    description: args.description,
    image: args.imageUrl ? [args.imageUrl] : [`${BASE}/opengraph-image`],
    datePublished: args.datePublished,
    dateModified: args.dateModified || args.datePublished,
    author: {
      "@type": "Person",
      name: args.authorName || "Viktor Mozsa",
      url: `${BASE}/about`,
    },
    publisher: { "@id": `${BASE}/#organization` },
    mainEntityOfPage: { "@type": "WebPage", "@id": args.url },
  };
}
