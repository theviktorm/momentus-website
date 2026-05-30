import { cn } from "@/lib/utils";

/**
 * Small <kbd>-style pill for hotkeys / shell-style commands / file names.
 * Used inside dashboard mocks (e.g. `peec-export-2026-05.csv`, `Cmd K`).
 */
export function Keystroke({
  children,
  className,
  tone = "neutral",
}: {
  children: React.ReactNode;
  className?: string;
  tone?: "neutral" | "accent";
}) {
  return (
    <kbd
      className={cn(
        "inline-flex items-center gap-1 rounded-md border px-1.5 py-0.5 font-mono text-[10.5px] tabular-nums leading-none",
        tone === "accent"
          ? "border-accent/30 bg-accent/10 text-accent"
          : "border-white/10 bg-white/[0.04] text-white/75",
        className,
      )}
    >
      {children}
    </kbd>
  );
}
