/**
 * Central section registry. Renumbering happens here — every eyebrow on the
 * homepage reads its number + label from this list so the order can shift in
 * a single edit. Order must mirror app/page.tsx top-to-bottom.
 */
export const SECTIONS = [
  { id: "split", label: "The split" },
  { id: "flywheel", label: "The flywheel" },
  { id: "services", label: "Services" },
  { id: "why-now", label: "Why now" },
  { id: "proof", label: "Proof" },
  { id: "operators", label: "Operators" },
  { id: "process", label: "Process" },
  { id: "fit", label: "Fit" },
  { id: "questions", label: "Questions" },
  { id: "window", label: "Window" },
] as const;

export type SectionId = (typeof SECTIONS)[number]["id"];

/** Returns the zero-padded numeric prefix for a given section id, e.g. "03". */
export function sectionNumber(id: SectionId): string {
  const i = SECTIONS.findIndex((s) => s.id === id);
  return String(i + 1).padStart(2, "0");
}

/** Returns the human label for a given section id. */
export function sectionLabel(id: SectionId): string {
  return SECTIONS.find((s) => s.id === id)?.label ?? "";
}
