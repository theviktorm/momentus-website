import type { Components } from "react-markdown";
import { Children, isValidElement, type ReactNode } from "react";

/**
 * Editorial markdown renderers.
 * - h2 gets a faint mono number prefix (counted at render time via context).
 * - blockquote becomes an accent-bordered pullquote with display font.
 * - external links get a small arrow glyph.
 * - <aside> in raw HTML becomes an accent callout (handled via rehype-raw).
 */

let h2Counter = { n: 0 };

export function resetH2Counter() {
  h2Counter.n = 0;
}

function extractText(node: ReactNode): string {
  if (typeof node === "string" || typeof node === "number") return String(node);
  if (Array.isArray(node)) return node.map(extractText).join("");
  if (isValidElement(node)) {
    const props = node.props as { children?: ReactNode };
    return extractText(props.children);
  }
  return "";
}

export const insightsMdxComponents: Components = {
  h2({ children, ...props }) {
    h2Counter.n += 1;
    const idx = String(h2Counter.n).padStart(2, "0");
    return (
      <h2
        {...props}
        className="font-display mt-16 scroll-mt-32 text-balance text-3xl font-medium leading-tight tracking-tight md:text-4xl"
      >
        <span className="font-mono mr-3 align-[0.18em] text-[12px] uppercase tracking-[0.22em] text-white/35 md:text-[13px]">
          {idx} /
        </span>
        {children}
      </h2>
    );
  },
  h3({ children, ...props }) {
    return (
      <h3
        {...props}
        className="font-display mt-10 text-balance text-xl font-medium tracking-tight text-white md:text-2xl"
      >
        {children}
      </h3>
    );
  },
  p({ children, ...props }) {
    return (
      <p
        {...props}
        className="mt-5 text-pretty text-[17px] leading-[1.75] text-white/80 md:text-[18px]"
      >
        {children}
      </p>
    );
  },
  ul({ children, ...props }) {
    return (
      <ul
        {...props}
        className="mt-5 ml-5 list-disc space-y-2 text-[17px] leading-[1.7] text-white/80 marker:text-accent/70"
      >
        {children}
      </ul>
    );
  },
  ol({ children, ...props }) {
    return (
      <ol
        {...props}
        className="mt-5 ml-5 list-decimal space-y-2 text-[17px] leading-[1.7] text-white/80 marker:text-accent/70"
      >
        {children}
      </ol>
    );
  },
  li({ children, ...props }) {
    return (
      <li {...props} className="pl-1">
        {children}
      </li>
    );
  },
  strong({ children, ...props }) {
    return (
      <strong {...props} className="font-semibold text-white">
        {children}
      </strong>
    );
  },
  em({ children, ...props }) {
    return (
      <em {...props} className="italic text-white/85">
        {children}
      </em>
    );
  },
  blockquote({ children, ...props }) {
    return (
      <blockquote
        {...props}
        className="font-display my-10 border-l-2 border-accent pl-6 text-2xl leading-snug tracking-tight text-white/90 md:text-3xl"
      >
        {children}
      </blockquote>
    );
  },
  hr() {
    return <hr className="my-12 border-0 border-t border-white/10" />;
  },
  a({ href, children, ...props }) {
    const isExternal = typeof href === "string" && /^https?:\/\//.test(href);
    return (
      <a
        href={href}
        {...(isExternal ? { target: "_blank", rel: "noreferrer" } : {})}
        {...props}
        className="text-accent underline decoration-accent/30 underline-offset-4 transition hover:decoration-accent"
      >
        {children}
        {isExternal && (
          <span aria-hidden className="ml-0.5 inline-block align-[0.05em] text-[0.85em]">
            ↗
          </span>
        )}
      </a>
    );
  },
  code({ children, ...props }) {
    return (
      <code
        {...props}
        className="rounded bg-white/[0.06] px-1.5 py-0.5 font-mono text-[0.88em] text-accent"
      >
        {children}
      </code>
    );
  },
  pre({ children, ...props }) {
    return (
      <pre
        {...props}
        className="mt-6 overflow-x-auto rounded-2xl border border-white/10 bg-black/40 p-5 text-[14px] leading-relaxed text-white/85"
      >
        {children}
      </pre>
    );
  },
  // Raw <aside> via rehype-raw — used for callouts.
  aside({ children, ...props }) {
    return (
      <aside
        {...props}
        className="my-10 rounded-2xl border border-accent/30 bg-accent/[0.06] p-6 text-[16px] leading-relaxed text-white/85"
      >
        <div className="font-mono mb-3 text-[10px] uppercase tracking-[0.22em] text-accent">
          Callout
        </div>
        {children}
      </aside>
    );
  },
};
