"use client";
import { useState, type FormEvent } from "react";
import { cn } from "@/lib/utils";

type Variant = "default" | "careers" | "compact";
type Status = "idle" | "submitting" | "success" | "error";

const EMAIL_RE = /^[^@\s]+@[^@\s]+\.[^@\s]+$/;

interface NewsletterSignupProps {
  variant?: Variant;
  /** Free-form source tag forwarded to the API so we can attribute signups. */
  source?: string;
  className?: string;
}

/**
 * Drop-in newsletter primitive. Posts { email, source } to /api/subscribe and
 * swaps the form for a success line on a 2xx response. Three visual variants:
 *
 *   - default  full-width band with eyebrow + headline, used on /insights
 *   - careers  callout strip, no headline, used inside the careers page
 *   - compact  bare input + button, used in the footer column
 *
 * Email validation is intentionally lenient (single regex) — the server
 * re-validates with the same shape before doing anything real.
 */
export function NewsletterSignup({
  variant = "default",
  source,
  className,
}: NewsletterSignupProps) {
  const [email, setEmail] = useState("");
  const [status, setStatus] = useState<Status>("idle");
  const [errorMsg, setErrorMsg] = useState<string | null>(null);

  const submit = async (e: FormEvent) => {
    e.preventDefault();
    setErrorMsg(null);

    const trimmed = email.trim();
    if (!EMAIL_RE.test(trimmed)) {
      setStatus("error");
      setErrorMsg("That email looks off. Try again.");
      return;
    }

    setStatus("submitting");
    try {
      const res = await fetch("/api/subscribe", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email: trimmed, source: source ?? "" }),
      });
      if (!res.ok) {
        const j = await res.json().catch(() => null);
        throw new Error(j?.error || "Subscribe failed");
      }
      setStatus("success");
    } catch (err) {
      setStatus("error");
      setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
    }
  };

  if (status === "success") {
    return (
      <div
        className={cn(
          "text-sm text-white/80",
          variant === "default" && "rounded-2xl border border-accent/25 bg-accent/[0.06] px-5 py-4",
          variant === "careers" && "rounded-xl border border-accent/25 bg-accent/[0.06] px-4 py-3",
          variant === "compact" && "rounded-lg border border-accent/25 bg-accent/[0.05] px-3 py-2",
          className,
        )}
        role="status"
      >
        <span className="font-mono mr-2 text-[10px] uppercase tracking-[0.2em] text-accent">
          Subscribed
        </span>
        Got it. We&apos;ll be in touch when there&apos;s something good.
      </div>
    );
  }

  if (variant === "compact") {
    return (
      <form onSubmit={submit} className={cn("w-full", className)} noValidate>
        <div className="flex flex-col gap-2 sm:flex-row">
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
            placeholder="you@company.com"
            aria-label="Email address"
            className="flex-1 rounded-lg border border-white/10 bg-white/[0.03] px-3 py-2 text-sm text-white placeholder:text-white/35 transition focus:border-accent/60"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-lg bg-accent px-4 py-2 text-[11px] font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft disabled:opacity-60"
          >
            {status === "submitting" ? "..." : "Subscribe"}
          </button>
        </div>
        {status === "error" && errorMsg && (
          <p className="mt-2 text-xs text-red-300/90">{errorMsg}</p>
        )}
      </form>
    );
  }

  if (variant === "careers") {
    return (
      <div
        className={cn(
          "glass relative overflow-hidden rounded-2xl p-6 md:p-7",
          className,
        )}
      >
        <div className="pointer-events-none absolute -right-20 -top-20 h-56 w-56 rounded-full bg-accent/10 blur-3xl" />
        <div className="relative grid gap-4 md:grid-cols-[1fr_auto] md:items-center">
          <div>
            <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
              Roles list
            </p>
            <p className="mt-2 text-pretty text-base text-white/80 md:text-lg">
              Get a heads-up when a role opens that fits you. Roughly one email
              every quarter — no recruiting spam.
            </p>
          </div>
          <form onSubmit={submit} className="w-full md:w-auto" noValidate>
            <div className="flex flex-col gap-2 sm:flex-row md:min-w-[360px]">
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={status === "submitting"}
                placeholder="you@company.com"
                aria-label="Email address"
                className="flex-1 rounded-full border border-white/10 bg-white/[0.04] px-4 py-2.5 text-sm text-white placeholder:text-white/40 transition focus:border-accent/60"
              />
              <button
                type="submit"
                disabled={status === "submitting"}
                className="rounded-full bg-accent px-5 py-2.5 text-[11px] font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft disabled:opacity-60"
              >
                {status === "submitting" ? "Subscribing..." : "Notify me"}
              </button>
            </div>
            {status === "error" && errorMsg && (
              <p className="mt-2 text-xs text-red-300/90">{errorMsg}</p>
            )}
          </form>
        </div>
      </div>
    );
  }

  // default
  return (
    <div
      className={cn(
        "glass relative overflow-hidden rounded-3xl p-8 md:p-12",
        className,
      )}
    >
      <div className="pointer-events-none absolute -right-32 -top-32 h-72 w-72 rounded-full bg-accent/15 blur-3xl" />
      <div className="pointer-events-none absolute -bottom-24 -left-24 h-64 w-64 rounded-full bg-accent/10 blur-3xl" />
      <div className="relative">
        <p className="font-mono text-[10px] uppercase tracking-[0.22em] text-accent">
          Quarterly notes
        </p>
        <h3 className="font-display mt-3 text-balance text-2xl font-medium tracking-tight md:text-3xl">
          The thinking, before it ships as a deck.
        </h3>
        <p className="mt-3 max-w-xl text-pretty text-sm text-white/65 md:text-base">
          One email a quarter. New essays, fresh data on AI citation share,
          things we&apos;ve changed our minds about. Unsubscribe in one click.
        </p>
        <form
          onSubmit={submit}
          className="mt-6 flex flex-col gap-3 md:flex-row md:items-center"
          noValidate
        >
          <input
            type="email"
            required
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            disabled={status === "submitting"}
            placeholder="you@company.com"
            aria-label="Email address"
            className="flex-1 rounded-full border border-white/10 bg-black/30 px-5 py-3 text-sm text-white placeholder:text-white/35 transition focus:border-accent/60 md:max-w-md"
          />
          <button
            type="submit"
            disabled={status === "submitting"}
            className="rounded-full bg-accent px-6 py-3 text-[11px] font-semibold uppercase tracking-[0.14em] text-bg transition hover:bg-accent-soft disabled:opacity-60"
          >
            {status === "submitting" ? "Subscribing..." : "Subscribe"}
          </button>
        </form>
        {status === "error" && errorMsg && (
          <p className="mt-3 text-xs text-red-300/90">{errorMsg}</p>
        )}
      </div>
    </div>
  );
}
