/**
 * BreadcrumbList schema builder. Pass crumbs in display order
 * (Home → Section → Item). Absolute hrefs are kept as-is; relative ones
 * are joined to NEXT_PUBLIC_SITE_URL.
 */

const BASE = process.env.NEXT_PUBLIC_SITE_URL || "https://momentus.ai";

export function breadcrumbJsonLd(crumbs: { name: string; href: string }[]) {
  return {
    "@context": "https://schema.org",
    "@type": "BreadcrumbList",
    itemListElement: crumbs.map((c, i) => ({
      "@type": "ListItem",
      position: i + 1,
      name: c.name,
      item: c.href.startsWith("http") ? c.href : `${BASE}${c.href}`,
    })),
  };
}
