"use client";

/**
 * Command palette — a Linear/Raycast-grade keyboard-first launcher mounted
 * globally in the root layout. Cmd/Ctrl+K opens it from any page. Touch users
 * get a floating ⌘K chip in the bottom-right so it's discoverable without a
 * keyboard.
 *
 * Everything in this file is hand-rolled: no `cmdk`, no `kbar`, no fuzzy
 * search library. The fuzzy matcher below is purpose-built for short labels
 * (titles + subtitles + keyword tokens) and is intentionally cheap — we score
 * the entire item index on every keystroke and that's fine because the index
 * is small (~30 entries).
 *
 * Recent searches: last 5 *query strings* (not item ids), persisted to
 * localStorage. Surfaced when the query is empty.
 */

import {
  KeyboardEvent as ReactKeyboardEvent,
  MouseEvent as ReactMouseEvent,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { useRouter } from "next/navigation";
import { cn } from "@/lib/utils";
import { CALENDLY_URL } from "@/lib/config";
import {
  CONTACT_EMAIL,
  GROUP_ORDER,
  getPaletteItems,
  type PaletteGroup,
  type PaletteIcon,
  type PaletteItem,
} from "@/lib/command-palette/items";

// -----------------------------------------------------------------------------
// Fuzzy match
// -----------------------------------------------------------------------------

/**
 * Cheap fuzzy matcher. Returns `null` when no signal is found, otherwise a
 * score where *lower is better*.
 *
 * Signals (combined additively, then normalized):
 *  - exact substring  → very strong; bonus when at start of a word
 *  - per-token presence in title/subtitle/keywords
 *  - acronym match — e.g. "csg" matches "Case studies geo"
 *
 * The caller sorts ascending by score.
 */
export function fuzzyMatch(rawQuery: string, item: PaletteItem): number | null {
  const q = rawQuery.trim().toLowerCase();
  if (!q) return 0;

  const title = item.title.toLowerCase();
  const subtitle = (item.subtitle ?? "").toLowerCase();
  const keywords = (item.keywords ?? []).join(" ").toLowerCase();
  const haystack = `${title} ${subtitle} ${keywords}`;
  const acronym = title
    .split(/\s+/)
    .map((w) => w[0])
    .filter(Boolean)
    .join("");

  let score = Number.POSITIVE_INFINITY;

  // 1) substring in title — strongest signal
  const titleIdx = title.indexOf(q);
  if (titleIdx !== -1) {
    // Earlier hits and word-boundary hits score better.
    const startsWord = titleIdx === 0 || /\s/.test(title[titleIdx - 1] ?? "");
    score = Math.min(score, titleIdx + (startsWord ? 0 : 5));
  }

  // 2) substring elsewhere (subtitle, keywords)
  if (haystack.includes(q)) {
    const idx = haystack.indexOf(q);
    score = Math.min(score, 40 + idx * 0.01);
  }

  // 3) acronym match
  if (acronym && acronym.startsWith(q)) {
    score = Math.min(score, 8);
  }

  // 4) token-by-token presence — every query token must land somewhere
  const tokens = q.split(/\s+/).filter(Boolean);
  if (tokens.length > 1) {
    const allFound = tokens.every((t) => haystack.includes(t));
    if (allFound) {
      const titleHits = tokens.filter((t) => title.includes(t)).length;
      // Reward matches that hit the title across multiple tokens.
      score = Math.min(score, 20 + (tokens.length - titleHits) * 4);
    }
  }

  return Number.isFinite(score) ? score : null;
}

// -----------------------------------------------------------------------------
// localStorage recents
// -----------------------------------------------------------------------------

const RECENTS_KEY = "momentus:palette:recents";
const MAX_RECENTS = 5;

function readRecents(): string[] {
  if (typeof window === "undefined") return [];
  try {
    const raw = window.localStorage.getItem(RECENTS_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    return Array.isArray(parsed)
      ? parsed.filter((v): v is string => typeof v === "string").slice(0, MAX_RECENTS)
      : [];
  } catch {
    return [];
  }
}

function writeRecents(list: string[]) {
  if (typeof window === "undefined") return;
  try {
    window.localStorage.setItem(RECENTS_KEY, JSON.stringify(list.slice(0, MAX_RECENTS)));
  } catch {
    // quota / privacy mode — silently ignore
  }
}

// -----------------------------------------------------------------------------
// Platform key glyph — Mac users see ⌘, everyone else sees Ctrl.
// -----------------------------------------------------------------------------
function useIsMac(): boolean {
  const [mac, setMac] = useState(false);
  useEffect(() => {
    if (typeof navigator === "undefined") return;
    setMac(/Mac|iPhone|iPad|iPod/i.test(navigator.platform || navigator.userAgent));
  }, []);
  return mac;
}

// -----------------------------------------------------------------------------
// Toast — minimal, self-dismissing pill for the "Email copied" feedback.
// -----------------------------------------------------------------------------
function Toast({ message }: { message: string | null }) {
  return (
    <div
      aria-live="polite"
      className={cn(
        "pointer-events-none fixed bottom-20 left-1/2 z-[80] -translate-x-1/2 transition-all duration-200",
        message ? "translate-y-0 opacity-100" : "translate-y-2 opacity-0",
      )}
    >
      {message && (
        <div className="glass rounded-full px-4 py-2 text-xs text-white shadow-glow">
          {message}
        </div>
      )}
    </div>
  );
}

// -----------------------------------------------------------------------------
// Icon set — small, line-based, accent-tinted. Hand-drawn so we don't pull
// lucide for what is effectively six glyphs.
// -----------------------------------------------------------------------------
function ItemIcon({ kind }: { kind: PaletteIcon | undefined }) {
  const cls = "h-4 w-4 text-accent/70";
  const stroke = {
    fill: "none",
    stroke: "currentColor",
    strokeWidth: 1.75,
    strokeLinecap: "round" as const,
    strokeLinejoin: "round" as const,
  };
  switch (kind) {
    case "tool":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M14.7 6.3a4 4 0 0 0-5.4 5.4L3 18l3 3 6.3-6.3a4 4 0 0 0 5.4-5.4l-2.3 2.3-2-2 2.3-2.3z" />
        </svg>
      );
    case "post":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M4 4h12l4 4v12H4z" />
          <path d="M16 4v4h4" />
          <path d="M8 13h8M8 17h5" />
        </svg>
      );
    case "case":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <rect x="3" y="7" width="18" height="13" rx="2" />
          <path d="M8 7V5a2 2 0 0 1 2-2h4a2 2 0 0 1 2 2v2" />
        </svg>
      );
    case "external":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M14 4h6v6" />
          <path d="M20 4L10 14" />
          <path d="M20 14v6H4V4h6" />
        </svg>
      );
    case "phone":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M22 16.9v3a2 2 0 0 1-2.2 2 19.8 19.8 0 0 1-8.6-3.1 19.5 19.5 0 0 1-6-6A19.8 19.8 0 0 1 2 4.2 2 2 0 0 1 4 2h3a2 2 0 0 1 2 1.7c.1.9.3 1.8.6 2.6a2 2 0 0 1-.5 2L7.9 9.7a16 16 0 0 0 6.4 6.4l1.4-1.4a2 2 0 0 1 2-.5c.8.3 1.7.5 2.6.6A2 2 0 0 1 22 16.9z" />
        </svg>
      );
    case "email":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <rect x="3" y="5" width="18" height="14" rx="2" />
          <path d="M3 7l9 6 9-6" />
        </svg>
      );
    case "arrow-up":
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M12 19V5" />
          <path d="M5 12l7-7 7 7" />
        </svg>
      );
    case "page":
    default:
      return (
        <svg viewBox="0 0 24 24" className={cls} {...stroke}>
          <path d="M5 3h10l4 4v14H5z" />
          <path d="M15 3v4h4" />
        </svg>
      );
  }
}

function SearchIcon() {
  return (
    <svg
      viewBox="0 0 24 24"
      className="h-4 w-4 text-accent"
      fill="none"
      stroke="currentColor"
      strokeWidth={2}
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <circle cx="11" cy="11" r="7" />
      <path d="M21 21l-4.3-4.3" />
    </svg>
  );
}

// -----------------------------------------------------------------------------
// Main component
// -----------------------------------------------------------------------------

type RankedItem = { item: PaletteItem; score: number };
type Section = { group: PaletteGroup; items: PaletteItem[] };

const ALL_ITEMS = getPaletteItems();

export function CommandPalette() {
  const router = useRouter();
  const isMac = useIsMac();
  const [open, setOpen] = useState(false);
  const [query, setQuery] = useState("");
  const [activeIndex, setActiveIndex] = useState(0);
  const [recents, setRecents] = useState<string[]>([]);
  const [toast, setToast] = useState<string | null>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const listRef = useRef<HTMLDivElement>(null);
  const itemRefs = useRef<Array<HTMLButtonElement | null>>([]);

  // Hydrate recents once on mount.
  useEffect(() => {
    setRecents(readRecents());
  }, []);

  // Global keybinding: Cmd/Ctrl+K toggles. Esc handled in the modal.
  useEffect(() => {
    const onKey = (e: KeyboardEvent) => {
      const mod = e.metaKey || e.ctrlKey;
      if (mod && (e.key === "k" || e.key === "K")) {
        e.preventDefault();
        setOpen((v) => !v);
        return;
      }
      // Cmd/Ctrl+, → clear recents. (Spec said "placeholder; just a recent-
      // clear" — so that's what it does.)
      if (mod && e.key === ",") {
        if (!open) return;
        e.preventDefault();
        setRecents([]);
        writeRecents([]);
      }
    };
    window.addEventListener("keydown", onKey);
    return () => window.removeEventListener("keydown", onKey);
  }, [open]);

  // Reset query + index whenever the modal opens, and lock body scroll.
  useEffect(() => {
    if (!open) return;
    setQuery("");
    setActiveIndex(0);
    const prev = document.body.style.overflow;
    document.body.style.overflow = "hidden";
    // Defer focus until after the modal mounts.
    const t = setTimeout(() => inputRef.current?.focus(), 0);
    return () => {
      document.body.style.overflow = prev;
      clearTimeout(t);
    };
  }, [open]);

  // Build the result sections + flat order used by keyboard nav.
  const { sections, flat, emptyState } = useMemo(() => {
    const q = query.trim();
    if (!q) {
      // Empty state: show recents (as queries that map back to top hits) +
      // a curated default set so the palette feels populated immediately.
      const recentItems: PaletteItem[] = recents
        .map((r) => {
          const best = ALL_ITEMS.map((item) => ({ item, score: fuzzyMatch(r, item) }))
            .filter((x): x is RankedItem => x.score !== null)
            .sort((a, b) => a.score - b.score)[0];
          return best?.item;
        })
        .filter((v): v is PaletteItem => Boolean(v));

      // Dedupe recents against the curated default groups.
      const recentIds = new Set(recentItems.map((i) => i.id));

      const defaults: Section[] = GROUP_ORDER.map((group) => ({
        group,
        items: ALL_ITEMS.filter((it) => it.group === group && !recentIds.has(it.id)),
      })).filter((s) => s.items.length > 0);

      const all: Section[] = [];
      if (recentItems.length) {
        all.push({ group: "Pages", items: recentItems }); // group label overridden below
      }
      const sectionsOut: Section[] = recentItems.length
        ? [{ group: "__recent" as unknown as PaletteGroup, items: recentItems }, ...defaults]
        : defaults;

      const flatOut = sectionsOut.flatMap((s) => s.items);
      return { sections: sectionsOut, flat: flatOut, emptyState: false };
    }

    const ranked: RankedItem[] = ALL_ITEMS
      .map((item) => ({ item, score: fuzzyMatch(q, item) ?? Number.POSITIVE_INFINITY }))
      .filter((x) => Number.isFinite(x.score))
      .sort((a, b) => a.score - b.score);

    if (!ranked.length) {
      return { sections: [], flat: [], emptyState: true };
    }

    // Re-group while preserving score order *within* each group.
    const byGroup = new Map<PaletteGroup, PaletteItem[]>();
    for (const { item } of ranked) {
      const list = byGroup.get(item.group) ?? [];
      list.push(item);
      byGroup.set(item.group, list);
    }
    const sectionsOut: Section[] = GROUP_ORDER.filter((g) => byGroup.has(g)).map((g) => ({
      group: g,
      items: byGroup.get(g) ?? [],
    }));
    const flatOut = sectionsOut.flatMap((s) => s.items);
    return { sections: sectionsOut, flat: flatOut, emptyState: false };
  }, [query, recents]);

  // Clamp active index whenever the filtered list shrinks/grows.
  useEffect(() => {
    setActiveIndex((i) => {
      if (flat.length === 0) return 0;
      if (i > flat.length - 1) return 0;
      return i;
    });
  }, [flat.length]);

  // Reset refs array length to match the current flat order.
  useEffect(() => {
    itemRefs.current.length = flat.length;
  }, [flat.length]);

  // Scroll the active row into view as the user arrows through.
  useEffect(() => {
    const el = itemRefs.current[activeIndex];
    if (el) {
      el.scrollIntoView({ block: "nearest" });
    }
  }, [activeIndex]);

  const close = useCallback(() => setOpen(false), []);

  const commitRecent = useCallback((q: string) => {
    const trimmed = q.trim();
    if (!trimmed) return;
    setRecents((prev) => {
      const next = [trimmed, ...prev.filter((r) => r.toLowerCase() !== trimmed.toLowerCase())].slice(
        0,
        MAX_RECENTS,
      );
      writeRecents(next);
      return next;
    });
  }, []);

  const flashToast = useCallback((msg: string) => {
    setToast(msg);
    window.setTimeout(() => setToast(null), 1800);
  }, []);

  const runItem = useCallback(
    (item: PaletteItem) => {
      // Persist the *query* (not the item) so recents feels like "things I
      // searched for", which is how recent-search lists usually behave.
      if (query.trim()) commitRecent(query);

      if (item.href) {
        const external = /^https?:\/\//i.test(item.href);
        if (external) {
          window.open(item.href, "_blank", "noopener,noreferrer");
        } else {
          router.push(item.href);
        }
        close();
        return;
      }
      if (item.action === "calendly") {
        window.open(CALENDLY_URL, "_blank", "noopener,noreferrer");
        close();
        return;
      }
      if (item.action === "scroll-top") {
        window.scrollTo({ top: 0, behavior: "smooth" });
        close();
        return;
      }
      if (item.action === "copy-email") {
        const write = async () => {
          try {
            if (navigator.clipboard?.writeText) {
              await navigator.clipboard.writeText(CONTACT_EMAIL);
            } else {
              // Old Safari / insecure context fallback.
              const ta = document.createElement("textarea");
              ta.value = CONTACT_EMAIL;
              ta.setAttribute("readonly", "");
              ta.style.position = "absolute";
              ta.style.left = "-9999px";
              document.body.appendChild(ta);
              ta.select();
              document.execCommand("copy");
              document.body.removeChild(ta);
            }
            flashToast("Email copied");
          } catch {
            flashToast("Couldn't copy — email is viktor@momentus.ai");
          }
        };
        void write();
        close();
        return;
      }
    },
    [close, commitRecent, flashToast, query, router],
  );

  const onInputKeyDown = (e: ReactKeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Escape") {
      e.preventDefault();
      close();
      return;
    }
    if (e.key === "ArrowDown") {
      e.preventDefault();
      setActiveIndex((i) => (flat.length === 0 ? 0 : (i + 1) % flat.length));
      return;
    }
    if (e.key === "ArrowUp") {
      e.preventDefault();
      setActiveIndex((i) => (flat.length === 0 ? 0 : (i - 1 + flat.length) % flat.length));
      return;
    }
    if (e.key === "Enter") {
      e.preventDefault();
      const item = flat[activeIndex];
      if (item) runItem(item);
      return;
    }
    if (e.key === "Home") {
      e.preventDefault();
      setActiveIndex(0);
      return;
    }
    if (e.key === "End") {
      e.preventDefault();
      setActiveIndex(Math.max(0, flat.length - 1));
      return;
    }
  };

  const onBackdrop = (e: ReactMouseEvent<HTMLDivElement>) => {
    if (e.target === e.currentTarget) close();
  };

  // Renders a group label. The fake "__recent" group prints "Recent".
  const groupLabel = (g: PaletteGroup): string =>
    (g as unknown as string) === "__recent" ? "Recent" : g;

  // Flat-index lookup so each row knows its own position in the keyboard nav
  // sequence without recomputing on every render.
  let flatCursor = 0;

  return (
    <>
      {/* Floating ⌘K chip — always visible (replaces keyboard-only access on touch). */}
      <button
        type="button"
        onClick={() => setOpen(true)}
        aria-label="Open command palette"
        className="glass fixed bottom-4 right-4 z-50 inline-flex items-center gap-2 rounded-full px-3 py-2 text-[11px] font-medium text-white/80 shadow-glow transition hover:text-white"
      >
        <SearchIcon />
        <span className="font-mono text-[10px] uppercase tracking-[0.18em] text-white/70">
          {isMac ? "⌘ K" : "Ctrl K"}
        </span>
      </button>

      <Toast message={toast} />

      {open && (
        <div
          className="fixed inset-0 z-[60] flex items-start justify-center bg-bg/80 px-4 pt-[12vh] backdrop-blur-sm sm:px-6"
          onMouseDown={onBackdrop}
          role="dialog"
          aria-modal="true"
          aria-label="Command palette"
        >
          <div
            className="glass relative w-full max-w-2xl overflow-hidden rounded-2xl shadow-glow"
            style={{ width: "min(620px, 100%)" }}
          >
            {/* Search row */}
            <div className="flex items-center gap-3 border-b border-white/5 px-4 py-3">
              <SearchIcon />
              <input
                ref={inputRef}
                value={query}
                onChange={(e) => {
                  setQuery(e.target.value);
                  setActiveIndex(0);
                }}
                onKeyDown={onInputKeyDown}
                placeholder="Search pages, tools, case studies, actions…"
                className="flex-1 bg-transparent text-sm text-white placeholder:text-white/35 focus:outline-none"
                autoComplete="off"
                spellCheck={false}
                aria-autocomplete="list"
                aria-controls="palette-listbox"
                aria-activedescendant={
                  flat[activeIndex] ? `palette-row-${flat[activeIndex].id}` : undefined
                }
              />
              <span className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] tracking-wide text-white/55 sm:inline">
                {isMac ? "⌘ K" : "Ctrl K"}
              </span>
            </div>

            {/* Results */}
            <div
              id="palette-listbox"
              role="listbox"
              ref={listRef}
              className="max-h-[60vh] overflow-y-auto px-2 py-2"
            >
              {emptyState && (
                <div className="px-4 py-10 text-center text-sm text-white/55">
                  Nothing matches — try a different query.
                </div>
              )}

              {!emptyState &&
                sections.map((section) => (
                  <div key={String(section.group)} className="mb-1.5 last:mb-0">
                    <div className="px-3 pt-2 pb-1 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
                      {groupLabel(section.group)}
                    </div>
                    <ul className="flex flex-col">
                      {section.items.map((item) => {
                        const myIndex = flatCursor++;
                        const isActive = myIndex === activeIndex;
                        return (
                          <li key={item.id}>
                            <button
                              ref={(el) => {
                                itemRefs.current[myIndex] = el;
                              }}
                              id={`palette-row-${item.id}`}
                              role="option"
                              aria-selected={isActive}
                              onMouseEnter={() => setActiveIndex(myIndex)}
                              onClick={() => runItem(item)}
                              className={cn(
                                "flex w-full items-center gap-3 rounded-xl border border-transparent px-3 py-2.5 text-left transition",
                                isActive
                                  ? "border-accent/30 bg-accent/10"
                                  : "hover:bg-white/5",
                              )}
                            >
                              <span
                                className={cn(
                                  "grid h-8 w-8 shrink-0 place-items-center rounded-lg border border-white/5 bg-black/30 transition",
                                  isActive && "border-accent/30 bg-accent/10",
                                )}
                              >
                                <ItemIcon kind={item.icon} />
                              </span>
                              <span className="min-w-0 flex-1">
                                <span className="block truncate text-sm text-white">
                                  {item.title}
                                </span>
                                {item.subtitle && (
                                  <span className="block truncate text-xs text-white/55">
                                    {item.subtitle}
                                  </span>
                                )}
                              </span>
                              {item.action === "calendly" && (
                                <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 sm:inline">
                                  Calendly
                                </span>
                              )}
                              {item.href && /^https?:\/\//i.test(item.href) && (
                                <span className="hidden font-mono text-[10px] uppercase tracking-[0.18em] text-white/40 sm:inline">
                                  External
                                </span>
                              )}
                              {isActive && (
                                <span className="hidden rounded-md border border-white/10 bg-white/5 px-1.5 py-0.5 font-mono text-[10px] text-white/55 sm:inline">
                                  ↵
                                </span>
                              )}
                            </button>
                          </li>
                        );
                      })}
                    </ul>
                  </div>
                ))}
            </div>

            {/* Footer hint band */}
            <div className="flex items-center justify-between border-t border-white/5 px-4 py-2 font-mono text-[10px] uppercase tracking-[0.18em] text-white/40">
              <span>↑↓ navigate · ↵ select · Esc close</span>
              <span className="hidden sm:inline">
                {isMac ? "⌘ ," : "Ctrl ,"} clear recents
              </span>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
