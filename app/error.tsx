"use client";

import Link from "next/link";
import { useEffect } from "react";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  useEffect(() => {
    // TODO: wire to error monitoring (Sentry/etc) when configured
    if (typeof console !== "undefined") {
      // eslint-disable-next-line no-console
      console.error("[app/error] caught:", error);
    }
  }, [error]);

  return (
    <main className="min-h-screen pb-24 pt-36 md:pt-44">
      <section className="container">
        <div className="relative mx-auto max-w-4xl text-center">
          <div className="relative inline-flex select-none items-end justify-center">
            <span
              aria-hidden
              className="font-display block text-[clamp(7rem,20vw,16rem)] font-medium leading-none tracking-tighter text-white/95"
            >
              500
            </span>
            <span
              aria-hidden
              className="font-display ml-2 text-[clamp(3.5rem,9vw,7rem)] font-light leading-none tracking-tight text-accent"
            >
              /
            </span>
            <span className="font-mono absolute -bottom-2 right-[-0.5rem] translate-y-full whitespace-nowrap rounded-full border border-accent/30 bg-accent/10 px-3 py-1 text-[10px] uppercase tracking-[0.22em] text-accent md:right-[-1.5rem] md:translate-y-2/3">
              Something tripped
            </span>
          </div>

          <h1 className="font-display mt-20 text-balance text-3xl font-medium tracking-tight md:mt-24 md:text-5xl">
            Something on our end broke.
          </h1>
          <p className="mx-auto mt-5 max-w-2xl text-pretty text-base text-white/65 md:text-lg">
            We&rsquo;ve been notified. Try again, or use one of these instead.
          </p>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-3">
            <button
              type="button"
              onClick={() => reset()}
              data-cursor="link"
              className="group inline-flex items-center gap-2 rounded-full bg-accent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft"
            >
              Try again
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition group-hover:rotate-180"
              >
                <path d="M3 12a9 9 0 1 0 3-6.7M3 4v5h5" />
              </svg>
            </button>
            <Link
              href="/"
              data-cursor="link"
              className="group inline-flex items-center gap-2 rounded-full border border-white/15 bg-white/5 px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-white/85 transition hover:border-accent/40 hover:text-white"
            >
              Go home
              <svg
                width="14"
                height="14"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
                className="transition group-hover:translate-x-0.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>

        {error?.digest ? (
          <p className="font-mono mt-20 text-center text-[10px] uppercase tracking-[0.22em] text-white/35">
            Ref: {error.digest}
          </p>
        ) : null}
      </section>
    </main>
  );
}
