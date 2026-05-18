/**
 * Tiny analytics helper. Wraps Plausible's window-bound API so call sites
 * stay safe in SSR + when Plausible isn't loaded (local dev, no env var).
 */
export function track(event: string, props?: Record<string, string | number>) {
  if (typeof window === "undefined") return;
  const fn = (window as unknown as { plausible?: (e: string, opts?: { props?: Record<string, string | number> }) => void }).plausible;
  if (!fn) return;
  fn(event, props ? { props } : undefined);
}
