import Link from "next/link";
import { formatDate, type Insight } from "@/lib/insights";

export function PostCard({ post }: { post: Insight }) {
  return (
    <Link
      href={`/insights/${post.slug}`}
      className="group block rounded-3xl border border-white/[0.06] bg-white/[0.015] p-6 transition-all duration-300 hover:-translate-y-0.5 hover:border-accent/40 hover:bg-white/[0.025] md:p-10"
    >
      <div className="font-mono flex flex-wrap items-center gap-x-3 gap-y-2 text-[11px] uppercase tracking-[0.18em] text-white/45">
        <time dateTime={post.date}>{formatDate(post.date)}</time>
        <span className="text-white/20">/</span>
        <span className="text-white/55">{post.author}</span>
        {post.tags.length > 0 && (
          <>
            <span className="text-white/20">/</span>
            <span className="text-accent/80">{post.tags.join(" · ")}</span>
          </>
        )}
        {post.draft && (
          <span className="rounded-full border border-white/15 bg-white/5 px-2.5 py-0.5 text-[10px] tracking-[0.2em] text-white/55">
            Coming soon
          </span>
        )}
      </div>
      <h2 className="font-display mt-5 text-balance text-3xl font-medium leading-[1.05] tracking-tight transition-colors group-hover:text-accent md:text-5xl">
        {post.title}
      </h2>
      <p className="mt-4 max-w-[60ch] text-pretty text-base leading-snug text-white/70 md:text-[17px]">
        {post.dek}
      </p>
      <div className="mt-7 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <span
            aria-hidden
            className="grid h-9 w-9 place-items-center rounded-full bg-gradient-to-br from-accent/25 to-accent/5 text-[11px] font-semibold uppercase tracking-wider text-accent"
          >
            {post.author
              .split(" ")
              .map((n) => n[0])
              .join("")
              .slice(0, 2)}
          </span>
          <span className="text-sm text-white/55">{post.readMinutes} min read</span>
        </div>
        <span className="font-mono inline-flex items-center gap-1.5 text-[11px] uppercase tracking-[0.2em] text-white/55 transition-colors group-hover:text-accent">
          {post.draft ? "Read the lead" : "Read"}
          <svg
            width="14"
            height="14"
            viewBox="0 0 24 24"
            fill="none"
            stroke="currentColor"
            strokeWidth="2"
            className="transition-transform group-hover:translate-x-0.5"
          >
            <path d="M5 12h14M13 5l7 7-7 7" />
          </svg>
        </span>
      </div>
    </Link>
  );
}
