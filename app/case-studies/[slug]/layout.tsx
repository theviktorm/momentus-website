import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getCaseStudy, CASE_STUDIES } from "@/lib/case-studies";

interface LayoutProps {
  children: React.ReactNode;
  params: { slug: string };
}

/**
 * Per-study metadata. Sets the OG/Twitter card to the case study's metric
 * headline so the link preview reads like a result, not a generic page.
 */
export async function generateMetadata({
  params,
}: {
  params: { slug: string };
}): Promise<Metadata> {
  const study = getCaseStudy(params.slug);
  if (!study) return { title: "Case study | Momentus" };

  const title = `${study.brand} — ${study.headline.metric} ${study.headline.label} | Momentus`;
  const description = study.thesis;

  return {
    title,
    description,
    openGraph: {
      title,
      description,
      type: "article",
      images: ["/opengraph-image"],
    },
    twitter: {
      card: "summary_large_image",
      title,
      description,
      images: ["/opengraph-image"],
    },
  };
}

/** Pre-render every known case study at build time. */
export async function generateStaticParams() {
  return CASE_STUDIES.map((c) => ({ slug: c.slug }));
}

export default function CaseStudyDetailLayout({ children, params }: LayoutProps) {
  if (!getCaseStudy(params.slug)) notFound();
  return <>{children}</>;
}
