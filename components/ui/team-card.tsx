"use client";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";
import type { Member } from "@/lib/team";
import { PendingPill } from "./pending-pill";

/**
 * TeamCard — square-portrait card for the /about team grid.
 *
 * Members with `pending: ["full"]` render the whole card faded + stamped as an
 * open seat, with a mailto link to apply. Otherwise the photo (or a gradient
 * placeholder with a PendingPill overlay) sits above name, role eyebrow,
 * location, and an expertise chip row.
 */
export function TeamCard({ member }: { member: Member }) {
  const isOpenSeat = member.pending.includes("full");
  const nameIsPending = member.name.startsWith("[Pending");

  return (
    <motion.article
      initial={{ opacity: 0, y: 16, filter: "blur(6px)" }}
      whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
      viewport={{ once: true, margin: "-60px" }}
      transition={{ duration: 0.6, ease: [0.22, 0.65, 0.2, 1] }}
      className={cn(
        "glass relative flex flex-col overflow-hidden rounded-2xl p-3",
        isOpenSeat && "opacity-50",
      )}
    >
      <Portrait member={member} />

      <div className="mt-4 flex flex-1 flex-col px-2 pb-3">
        <span className="font-mono text-[10px] uppercase tracking-[0.2em] text-white/45">
          {member.role}
        </span>
        <h3
          className={cn(
            "font-display mt-1 text-lg font-medium leading-tight tracking-tight",
            nameIsPending ? "italic text-white/55" : "text-white",
          )}
        >
          {member.name}
        </h3>
        <p className="mt-1 text-xs text-white/45">{member.location}</p>

        <ul className="mt-3 flex flex-wrap gap-1.5">
          {member.expertise.map((tag) => (
            <li
              key={tag}
              className="rounded-full border border-white/10 bg-white/[0.03] px-2 py-0.5 text-[10px] text-white/65"
            >
              {tag}
            </li>
          ))}
        </ul>

        {isOpenSeat ? (
          <div className="mt-4 border-t border-white/8 pt-3">
            <p className="text-[11px] text-white/55">
              Pending — we're hiring or this seat is filling.
            </p>
            <a
              href={`mailto:viktor@momentus.ai?subject=Momentus%20role%20-%20${encodeURIComponent(
                member.role,
              )}`}
              className="mt-1 inline-flex items-center gap-1 text-xs text-accent transition hover:text-accent-soft"
            >
              Open roles
              <svg
                width="12"
                height="12"
                viewBox="0 0 24 24"
                fill="none"
                stroke="currentColor"
                strokeWidth="2.5"
              >
                <path d="M5 12h14M13 5l7 7-7 7" />
              </svg>
            </a>
          </div>
        ) : null}
      </div>
    </motion.article>
  );
}

function Portrait({ member }: { member: Member }) {
  const showPhotoPending = member.pending.includes("photo");
  const isOpenSeat = member.pending.includes("full");

  return (
    <div className="relative aspect-square overflow-hidden rounded-xl ring-line">
      {member.photo ? (
        // eslint-disable-next-line @next/next/no-img-element
        <img
          src={member.photo}
          alt={member.name}
          className="h-full w-full object-cover"
        />
      ) : (
        <GradientPlaceholder seed={member.name} />
      )}
      {(showPhotoPending || isOpenSeat) && !member.photo ? (
        <PendingPill
          label={isOpenSeat ? "open seat" : "photo"}
          className="absolute left-2 top-2"
        />
      ) : null}
    </div>
  );
}

/** Cheap deterministic gradient — same name always renders the same swatch. */
function GradientPlaceholder({ seed }: { seed: string }) {
  let h = 0;
  for (let i = 0; i < seed.length; i++) h = (h * 31 + seed.charCodeAt(i)) >>> 0;
  const hue1 = h % 360;
  const hue2 = (hue1 + 40) % 360;
  return (
    <div
      aria-hidden
      className="h-full w-full"
      style={{
        background: `
          radial-gradient(ellipse at 30% 30%, hsla(${hue1}, 35%, 28%, 0.85), transparent 60%),
          radial-gradient(ellipse at 70% 70%, hsla(${hue2}, 30%, 22%, 0.9), transparent 60%),
          linear-gradient(160deg, #15151c, #0b0b10)
        `,
      }}
    />
  );
}
