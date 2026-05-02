import { cn } from "@/lib/utils";

export function Logo({ className }: { className?: string }) {
  return (
    <svg viewBox="0 0 64 64" fill="none" className={cn("h-full w-full", className)} aria-hidden>
      {/* top cube */}
      <path
        d="M22 12 L34 6 L46 12 L46 22 L34 28 L22 22 Z"
        fill="currentColor"
      />
      <path d="M22 12 L34 18 L34 28 L22 22 Z" fill="currentColor" opacity="0.85" />
      <path d="M34 18 L46 12 L46 22 L34 28 Z" fill="currentColor" opacity="0.7" />

      {/* bottom-left cube */}
      <path
        d="M10 30 L22 24 L34 30 L34 40 L22 46 L10 40 Z"
        fill="currentColor"
      />
      <path d="M10 30 L22 36 L22 46 L10 40 Z" fill="currentColor" opacity="0.85" />
      <path d="M22 36 L34 30 L34 40 L22 46 Z" fill="currentColor" opacity="0.7" />

      {/* bottom-right cube */}
      <path
        d="M34 30 L46 24 L58 30 L58 40 L46 46 L34 40 Z"
        fill="currentColor"
      />
      <path d="M34 30 L46 36 L46 46 L34 40 Z" fill="currentColor" opacity="0.85" />
      <path d="M46 36 L58 30 L58 40 L46 46 Z" fill="currentColor" opacity="0.7" />

      {/* sparkle */}
      <g transform="translate(46 8)">
        <path d="M0 -5 L1 -1 L5 0 L1 1 L0 5 L-1 1 L-5 0 L-1 -1 Z" fill="currentColor" />
      </g>
    </svg>
  );
}
