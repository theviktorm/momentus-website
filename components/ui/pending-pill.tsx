import { cn } from "@/lib/utils";

/**
 * PendingPill — small inline marker for content the founder hasn't supplied yet
 * (real photos, real bios, real signatures, specific city names, etc.). Visible
 * in the UI in production so the team can spot what still needs filling in.
 *
 * Usage:
 *   <PendingPill label="founder photo" />
 *   <PendingPill label="bio" className="absolute right-2 top-2" />
 */
export function PendingPill({
  label,
  className,
}: {
  label: string;
  className?: string;
}) {
  return (
    <span
      className={cn(
        "font-mono inline-flex items-center gap-1.5 rounded-full border border-white/15 bg-white/[0.06] px-2 py-0.5 text-[9px] uppercase tracking-[0.18em] text-white/55 backdrop-blur",
        className,
      )}
    >
      <span aria-hidden className="h-1 w-1 rounded-full bg-white/40" />
      Pending · {label}
    </span>
  );
}
