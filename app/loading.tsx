export default function Loading() {
  return (
    <div
      role="status"
      aria-live="polite"
      className="flex min-h-screen flex-col items-center justify-center gap-5"
    >
      <div className="flex items-end gap-1.5" aria-hidden>
        <span className="loading-dot block h-2 w-2 rounded-full bg-accent" style={{ animationDelay: "0ms" }} />
        <span className="loading-dot block h-2 w-2 rounded-full bg-accent" style={{ animationDelay: "180ms" }} />
        <span className="loading-dot block h-2 w-2 rounded-full bg-accent" style={{ animationDelay: "360ms" }} />
      </div>
      <span className="font-mono text-[10px] uppercase tracking-[0.22em] text-white/50">
        Loading&hellip;
      </span>
      <style>{`
        @keyframes momentus-loading-pulse {
          0%, 80%, 100% { transform: scale(0.6); opacity: 0.35; }
          40% { transform: scale(1); opacity: 1; }
        }
        .loading-dot {
          animation: momentus-loading-pulse 1.4s cubic-bezier(.4,0,.2,1) infinite both;
        }
        @media (prefers-reduced-motion: reduce) {
          .loading-dot { animation: none; opacity: 0.7; }
        }
      `}</style>
    </div>
  );
}
