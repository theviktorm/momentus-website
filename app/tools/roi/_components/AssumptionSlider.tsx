"use client";

/**
 * AssumptionSlider — labeled slider row used in both the inputs column
 * (for branded-share %) and the assumptions card (for the 4 deltas).
 *
 * Editorial style: heading on the left, a small mono pill on the right
 * showing the current numeric value. Help text below.
 */
export function AssumptionSlider({
  label,
  help,
  value,
  min,
  max,
  step = 1,
  format,
  onChange,
}: {
  label: string;
  help?: string;
  value: number;
  min: number;
  max: number;
  step?: number;
  /** How to render the current value in the pill. */
  format: (n: number) => string;
  onChange: (n: number) => void;
}) {
  return (
    <div>
      <div className="flex items-baseline justify-between gap-3">
        <label className="text-sm font-medium text-white/85">{label}</label>
        <span className="font-mono inline-block rounded-full border border-accent/30 bg-accent/10 px-2 py-0.5 text-[11px] tabular-nums text-accent">
          {format(value)}
        </span>
      </div>
      <input
        type="range"
        min={min}
        max={max}
        step={step}
        value={value}
        onChange={(e) => onChange(Number(e.currentTarget.value))}
        className="roi-slider mt-2.5 h-1.5 w-full cursor-pointer appearance-none rounded-full bg-white/10 accent-accent"
      />
      {help ? (
        <p className="mt-1.5 text-[11px] leading-snug text-white/45">{help}</p>
      ) : null}
      <style jsx>{`
        .roi-slider::-webkit-slider-thumb {
          -webkit-appearance: none;
          appearance: none;
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #c6ff3d;
          border: 2px solid #07070a;
          box-shadow: 0 0 0 1px rgba(198, 255, 61, 0.45), 0 4px 12px rgba(198, 255, 61, 0.25);
          cursor: pointer;
        }
        .roi-slider::-moz-range-thumb {
          height: 16px;
          width: 16px;
          border-radius: 9999px;
          background: #c6ff3d;
          border: 2px solid #07070a;
          box-shadow: 0 0 0 1px rgba(198, 255, 61, 0.45);
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}
