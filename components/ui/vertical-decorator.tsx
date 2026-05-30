/**
 * Floor-to-ceiling vertical marquee column for the Flywheel section's left
 * edge. Mirrors a magazine sidebar — repeated category phrase, very low
 * opacity, slow 60s loop, behind content, desktop only.
 *
 * Respects prefers-reduced-motion via the .vd-track class (see globals.css).
 */
const PHRASE =
  "AI decides who deserves attention · Paid decides who profits from it · ";

export function VerticalDecorator() {
  // Repeat enough that one half of the doubled track exceeds a viewport.
  // We render the block twice and translate the wrapper by -50% per loop.
  const block = PHRASE.repeat(6);
  return (
    <div
      aria-hidden
      className="pointer-events-none absolute inset-y-0 left-0 -z-10 hidden w-10 overflow-hidden lg:block"
    >
      <div className="vd-track flex flex-col">
        {[0, 1].map((k) => (
          <span
            key={k}
            className="font-mono block whitespace-nowrap py-4 text-[10px] uppercase tracking-[0.42em] text-white/[0.08]"
            style={{ writingMode: "vertical-rl", transform: "rotate(180deg)" }}
          >
            {block}
          </span>
        ))}
      </div>
    </div>
  );
}
