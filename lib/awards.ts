/**
 * Press mentions + recognitions, in display order. When `awards` is empty the
 * AwardsStrip component hides the whole section — zero-noise default.
 *
 * Populate when you have real entries. Example:
 *
 *   export const awards: Award[] = [
 *     { kind: "press", label: "Forbes", detail: "2025 · contributor" },
 *     { kind: "award", label: "AdAge Small Agency", detail: "2025 · finalist" },
 *   ];
 */
export type Award = {
  kind: "press" | "award";
  label: string;
  /** Optional sub-line: year + role (e.g. "2025 · contributor"). */
  detail?: string;
};

export const awards: Award[] = [];
