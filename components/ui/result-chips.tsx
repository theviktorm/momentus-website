/**
 * Small rounded-full mono caps chips. Used directly under case-study headlines
 * to surface 3–4 result facts before the body paragraph is even scanned.
 * Also reused inside the hero dashboard for the `+318%` glow callout.
 */
export function ResultChips({
  items,
  className = "",
}: {
  items: readonly string[];
  className?: string;
}) {
  return (
    <ul className={`flex flex-wrap gap-1.5 ${className}`}>
      {items.map((it) => (
        <li
          key={it}
          className="font-mono inline-flex items-center rounded-full border border-white/12 bg-white/[0.03] px-2.5 py-1 text-[10px] uppercase tracking-[0.16em] text-white/70"
        >
          {it}
        </li>
      ))}
    </ul>
  );
}
