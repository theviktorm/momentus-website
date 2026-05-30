import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import rehypeRaw from "rehype-raw";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { ReadingProgress } from "@/components/ui/reading-progress";
import { PostCard } from "@/components/ui/post-card";
import { CALENDLY_URL } from "@/lib/config";
import {
  formatDate,
  getAllInsights,
  getInsightBySlug,
  getRelatedInsights,
} from "@/lib/insights";
import { insightsMdxComponents, resetH2Counter } from "./mdx-components";

export const dynamicParams = false;

export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

export function generateMetadata({ params }: { params: { slug: string } }): Metadata {
  const post = getInsightBySlug(params.slug);
  if (!post) return { title: "Insights | Momentus" };
  return {
    title: `${post.title} | Momentus Insights`,
    description: post.dek,
    openGraph: {
      title: post.title,
      description: post.dek,
      type: "article",
      publishedTime: post.date,
      authors: [post.author],
    },
  };
}

export default function InsightDetail({ params }: { params: { slug: string } }) {
  const post = getInsightBySlug(params.slug);
  if (!post) notFound();

  const related = getRelatedInsights(post.slug, 3);

  // Reset the h2 counter per-render so SSR ordering is deterministic.
  resetH2Counter();

  return (
    <>
      <Nav />
      <ReadingProgress />
      <main className="pb-24 pt-32 md:pt-40">
        {/* Hero */}
        <header className="container max-w-3xl">
          <div className="font-mono flex flex-wrap items-center gap-2 text-[11px] uppercase tracking-[0.22em]">
            {post.tags.map((t) => (
              <span
                key={t}
                className="rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-accent"
              >
                {t}
              </span>
            ))}
            <Link
              href="/insights"
              className="ml-auto text-white/55 transition hover:text-accent"
            >
              ← All insights
            </Link>
          </div>
          <h1 className="font-display mt-7 text-balance text-4xl font-medium leading-[1.05] tracking-tight md:text-6xl">
            {post.title}
          </h1>
          <p className="mt-6 max-w-[60ch] text-pretty text-xl leading-snug text-white/75 md:text-2xl">
            {post.dek}
          </p>
          <div className="font-mono mt-8 flex flex-wrap items-center gap-x-3 gap-y-1 text-[11px] uppercase tracking-[0.22em] text-white/45">
            <time dateTime={post.date}>{formatDate(post.date)}</time>
            <span className="text-white/20">·</span>
            <span className="text-white/65">{post.author}</span>
            <span className="text-white/20">·</span>
            <span>{post.readMinutes} min read</span>
          </div>
        </header>

        {/* Body */}
        <article className="container mt-14 max-w-[68ch] md:mt-20">
          {post.draft && (
            <div className="font-mono mb-10 inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/[0.04] px-3 py-1 text-[10px] uppercase tracking-[0.24em] text-white/70">
              <span className="h-1.5 w-1.5 animate-pulse rounded-full bg-accent" />
              Draft in progress
            </div>
          )}
          <div className="insights-body">
            <ReactMarkdown
              remarkPlugins={[remarkGfm]}
              rehypePlugins={[rehypeRaw]}
              components={insightsMdxComponents}
            >
              {post.content}
            </ReactMarkdown>
          </div>
          {post.draft && (
            <div className="mt-16 rounded-2xl border border-white/10 bg-white/[0.02] p-6 text-sm leading-relaxed text-white/65">
              <div className="font-mono mb-3 text-[10px] uppercase tracking-[0.22em] text-white/45">
                More in this series soon
              </div>
              <p>
                This piece is part of an active series. We&apos;re publishing the full essay
                once the underlying data and client approvals are in. In the meantime,{" "}
                <a
                  href={CALENDLY_URL}
                  target="_blank"
                  rel="noreferrer"
                  className="text-accent underline decoration-accent/30 underline-offset-4 hover:decoration-accent"
                >
                  book a 30-minute audit
                </a>{" "}
                — we&apos;ll walk you through the same thinking against your category, live.
              </p>
            </div>
          )}
        </article>

        {/* Related */}
        {related.length > 0 && (
          <section className="container mt-28 max-w-4xl">
            <div className="font-mono mb-8 text-[11px] uppercase tracking-[0.22em] text-white/45">
              Three more from us
            </div>
            <div className="space-y-5">
              {related.map((p) => (
                <PostCard key={p.slug} post={p} />
              ))}
            </div>
          </section>
        )}

        {/* Final CTA */}
        <section className="container mt-24 max-w-3xl">
          <div className="glass rounded-3xl p-8 text-center md:p-12">
            <div className="font-mono text-[11px] uppercase tracking-[0.22em] text-accent">
              The actual playbook
            </div>
            <h3 className="font-display mt-3 text-balance text-3xl font-medium tracking-tight md:text-4xl">
              Get the actual playbook in your audit call.
            </h3>
            <p className="mx-auto mt-4 max-w-xl text-white/70">
              30 minutes. We run the audit live against your category, walk you through the
              gap map, and leave you with the three highest-leverage moves to make first.
            </p>
            <a
              href={CALENDLY_URL}
              target="_blank"
              rel="noreferrer"
              className="mt-7 inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.18em] text-bg transition hover:bg-accent-soft"
            >
              Book a free call
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        </section>
      </main>
      <Footer />
    </>
  );
}
