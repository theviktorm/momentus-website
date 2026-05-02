"use client";
import { cn } from "@/lib/utils";

/** Animated aurora gradient — ambient light effect for hero backgrounds. */
export function Aurora({ className }: { className?: string }) {
  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
    >
      <div className="absolute -top-1/3 left-1/2 h-[80vh] w-[140vw] -translate-x-1/2 opacity-60 mix-blend-screen blur-3xl">
        <div className="aurora-blob absolute inset-0" />
      </div>
      <style>{`
        .aurora-blob {
          background:
            radial-gradient(ellipse 70% 50% at 20% 40%, rgba(198,255,61,0.45), transparent 60%),
            radial-gradient(ellipse 50% 70% at 80% 30%, rgba(155,211,0,0.35), transparent 60%),
            radial-gradient(ellipse 80% 60% at 50% 80%, rgba(228,255,142,0.30), transparent 60%);
          animation: aurora-shift 18s ease-in-out infinite alternate;
        }
        @keyframes aurora-shift {
          0%   { transform: translate(0,0) scale(1) rotate(0deg); }
          50%  { transform: translate(2%,-3%) scale(1.08) rotate(8deg); }
          100% { transform: translate(-2%,4%) scale(0.96) rotate(-6deg); }
        }
      `}</style>
    </div>
  );
}
