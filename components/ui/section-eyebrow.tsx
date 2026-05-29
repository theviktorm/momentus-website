import { sectionNumber, sectionLabel, type SectionId } from "@/lib/sections";

/**
 * Numbered editorial eyebrow — replaces the old solo pill on every section.
 * Reads its number from the central registry in lib/sections.ts so renumbering
 * is one edit.
 *
 *   01 / The split
 *
 * The slash and number are mono + heavier weight; the label stays as the
 * existing tracked uppercase pill text.
 */
export function SectionEyebrow({
  id,
  label,
  className = "",
}: {
  id: SectionId;
  /** Override the registry label if a section wants a custom string. */
  label?: string;
  className?: string;
}) {
  const num = sectionNumber(id);
  const text = label ?? sectionLabel(id);
  return (
    <span
      className={`font-mono inline-flex items-center gap-1.5 rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent ${className}`}
    >
      <span className="font-semibold tabular-nums text-accent">{num}</span>
      <span aria-hidden className="text-accent/55">/</span>
      <span>{text}</span>
    </span>
  );
}
