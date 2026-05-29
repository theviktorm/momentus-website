"use client";
import { cn } from "@/lib/utils";
import { Keystroke } from "@/components/ui/keystroke";

/**
 * Reusable dashboard chrome. Wraps any "screen" so the surrounding window
 * frame (traffic lights, URL bar, sidebar nav) stays consistent between
 * the marketing hero and every walkthrough scene.
 */
export function DashboardMock({
  children,
  path = "app.momentus.ai / overview",
  activeNav = "overview",
  className,
  workspace = "Acme Health",
}: {
  children: React.ReactNode;
  path?: string;
  activeNav?: NavKey;
  className?: string;
  workspace?: string;
}) {
  return (
    <div
      className={cn(
        "glass relative w-full overflow-hidden rounded-2xl p-3 md:p-4",
        "shadow-[0_30px_120px_-30px_rgba(198,255,61,0.25)]",
        className,
      )}
    >
      {/* Window chrome */}
      <div className="mb-3 flex items-center justify-between gap-3">
        <div className="flex items-center gap-2">
          <span className="h-2.5 w-2.5 rounded-full bg-red-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-yellow-400/80" />
          <span className="h-2.5 w-2.5 rounded-full bg-green-400/80" />
        </div>
        <div className="flex flex-1 items-center justify-center">
          <div className="flex items-center gap-2 rounded-md border border-white/8 bg-black/40 px-3 py-1 text-[10.5px] text-white/55">
            <LockIcon />
            <span className="font-mono tabular-nums">{path}</span>
          </div>
        </div>
        <Keystroke tone="accent" className="hidden sm:inline-flex">
          ⌘K
        </Keystroke>
      </div>

      {/* App body — sidebar + screen */}
      <div className="grid gap-3 rounded-xl bg-black/40 p-3 ring-line md:grid-cols-[148px_1fr]">
        <Sidebar workspace={workspace} active={activeNav} />
        <div className="min-h-[420px] rounded-lg bg-bg/70 p-4 ring-line md:p-5">
          {children}
        </div>
      </div>
    </div>
  );
}

type NavKey = "overview" | "observations" | "alerts" | "share" | "runs";

const NAV: { key: NavKey; label: string; icon: React.ReactNode }[] = [
  { key: "overview", label: "Overview", icon: <GridIcon /> },
  { key: "observations", label: "Observations", icon: <RowsIcon /> },
  { key: "alerts", label: "Alerts", icon: <BellIcon /> },
  { key: "share", label: "Share links", icon: <LinkIcon /> },
  { key: "runs", label: "Engine runs", icon: <BoltIcon /> },
];

function Sidebar({ workspace, active }: { workspace: string; active: NavKey }) {
  return (
    <aside className="hidden flex-col gap-3 rounded-md bg-bg/40 p-3 ring-line md:flex">
      <div>
        <div className="text-[9px] uppercase tracking-[0.18em] text-white/35">Workspace</div>
        <div className="mt-1 flex items-center gap-1.5">
          <span className="grid h-5 w-5 place-items-center rounded bg-accent/90 text-[10px] font-semibold text-bg">
            {workspace.slice(0, 1)}
          </span>
          <span className="truncate text-[11.5px] font-medium text-white/85">{workspace}</span>
        </div>
      </div>
      <div className="h-px w-full bg-white/5" />
      <nav className="flex flex-col gap-0.5">
        {NAV.map((n) => {
          const isActive = n.key === active;
          return (
            <div
              key={n.key}
              className={cn(
                "flex items-center gap-2 rounded-md px-2 py-1.5 text-[11.5px]",
                isActive
                  ? "bg-accent/15 text-accent"
                  : "text-white/55 hover:bg-white/[0.03]",
              )}
            >
              <span className={cn("grid h-3.5 w-3.5 place-items-center", isActive ? "text-accent" : "text-white/40")}>
                {n.icon}
              </span>
              <span>{n.label}</span>
            </div>
          );
        })}
      </nav>
      <div className="mt-auto rounded-md border border-white/5 bg-bg/60 p-2">
        <div className="text-[9px] uppercase tracking-[0.18em] text-white/35">Status</div>
        <div className="mt-1 flex items-center gap-1.5 text-[11px] text-white/75">
          <span className="relative flex h-1.5 w-1.5">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-accent/70 opacity-75" />
            <span className="relative inline-flex h-1.5 w-1.5 rounded-full bg-accent" />
          </span>
          All systems normal
        </div>
      </div>
    </aside>
  );
}

/* — — — Tiny inline icons (line-art, currentColor) — — — */

function LockIcon() {
  return (
    <svg width="9" height="9" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="4" y="11" width="16" height="10" rx="2" />
      <path d="M8 11V8a4 4 0 0 1 8 0v3" />
    </svg>
  );
}
function GridIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="3" width="7" height="7" />
      <rect x="14" y="3" width="7" height="7" />
      <rect x="3" y="14" width="7" height="7" />
      <rect x="14" y="14" width="7" height="7" />
    </svg>
  );
}
function RowsIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <rect x="3" y="4" width="18" height="5" />
      <rect x="3" y="14" width="18" height="5" />
    </svg>
  );
}
function BellIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M6 16V11a6 6 0 1 1 12 0v5l1.5 2H4.5L6 16Z" />
      <path d="M10 21a2 2 0 0 0 4 0" />
    </svg>
  );
}
function LinkIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M10 14a5 5 0 0 0 7 0l3-3a5 5 0 0 0-7-7l-1 1" />
      <path d="M14 10a5 5 0 0 0-7 0l-3 3a5 5 0 0 0 7 7l1-1" />
    </svg>
  );
}
function BoltIcon() {
  return (
    <svg width="11" height="11" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
      <path d="M13 2 4 14h7l-1 8 9-12h-7l1-8Z" />
    </svg>
  );
}
