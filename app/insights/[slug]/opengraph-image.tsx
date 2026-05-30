import { ImageResponse } from "next/og";
import { formatDate, getAllInsights, getInsightBySlug } from "@/lib/insights";

export const runtime = "nodejs";
export const alt = "Momentus — Insight";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

/**
 * Pre-render one OG image per published insight at build time.
 * Mirrors `generateStaticParams` on the page.
 */
export function generateStaticParams() {
  return getAllInsights().map((p) => ({ slug: p.slug }));
}

function initialsFrom(name: string): string {
  return name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0]?.toUpperCase() ?? "")
    .join("");
}

export default async function Image({
  params,
}: {
  params: { slug: string };
}) {
  const post = getInsightBySlug(params.slug);

  const data = post ?? {
    title: "Momentus Insight",
    dek: "Notes on GEO, paid, and where AI search is going.",
    tags: ["Insights"],
    readMinutes: 5,
    date: new Date().toISOString().slice(0, 10),
    author: "Momentus",
  };

  const FONT_STACK =
    "system-ui, -apple-system, 'Segoe UI', Roboto, Helvetica, Arial, sans-serif";
  const initials = initialsFrom(data.author) || "M";
  const tagLine = (data.tags || []).join(" · ");

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          padding: 72,
          background: "#07070A",
          backgroundImage:
            "radial-gradient(circle at top left, rgba(198,255,61,0.20), transparent 55%), radial-gradient(circle at bottom right, rgba(198,255,61,0.08), transparent 55%)",
          color: "#fff",
          fontFamily: FONT_STACK,
          position: "relative",
        }}
      >
        {/* Top bar */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
              maxWidth: 760,
              overflow: "hidden",
              whiteSpace: "nowrap",
              textOverflow: "ellipsis",
            }}
          >
            <span style={{ color: "#C6FF3D" }}>MOMENTUS</span>
            <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.35)" }}>
              ·
            </span>
            <span>INSIGHTS</span>
            {tagLine ? (
              <>
                <span
                  style={{ margin: "0 10px", color: "rgba(255,255,255,0.35)" }}
                >
                  ·
                </span>
                <span style={{ textTransform: "uppercase" }}>{tagLine}</span>
              </>
            ) : null}
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 18,
              letterSpacing: 4,
              textTransform: "uppercase",
              color: "rgba(255,255,255,0.65)",
            }}
          >
            <span>{data.readMinutes} MIN READ</span>
            <span style={{ margin: "0 10px", color: "rgba(255,255,255,0.35)" }}>
              ·
            </span>
            <span>{formatDate(data.date).toUpperCase()}</span>
          </div>
        </div>

        {/* Center: title + dek */}
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            flex: 1,
            justifyContent: "center",
            marginTop: 24,
            maxWidth: 1060,
          }}
        >
          <div
            style={{
              display: "-webkit-box" as unknown as "flex",
              fontSize: 64,
              lineHeight: 1.08,
              letterSpacing: -2,
              fontWeight: 600,
              color: "#fff",
              WebkitLineClamp: 3,
              WebkitBoxOrient: "vertical" as unknown as undefined,
              overflow: "hidden",
            }}
          >
            {data.title}
          </div>
          {data.dek ? (
            <div
              style={{
                display: "-webkit-box" as unknown as "flex",
                marginTop: 28,
                fontSize: 28,
                lineHeight: 1.35,
                color: "rgba(255,255,255,0.65)",
                WebkitLineClamp: 2,
                WebkitBoxOrient: "vertical" as unknown as undefined,
                overflow: "hidden",
              }}
            >
              {data.dek}
            </div>
          ) : null}
        </div>

        {/* Bottom: avatar + author (left) / url (right) */}
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            width: "100%",
          }}
        >
          <div style={{ display: "flex", alignItems: "center" }}>
            <div
              style={{
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                width: 64,
                height: 64,
                borderRadius: 999,
                border: "2px solid #C6FF3D",
                backgroundColor: "rgba(198,255,61,0.10)",
                color: "#C6FF3D",
                fontSize: 24,
                fontWeight: 700,
                letterSpacing: 1,
              }}
            >
              {initials}
            </div>
            <div
              style={{
                display: "flex",
                flexDirection: "column",
                marginLeft: 18,
              }}
            >
              <div
                style={{
                  display: "flex",
                  fontSize: 20,
                  color: "#fff",
                  fontWeight: 600,
                }}
              >
                {data.author}
              </div>
              <div
                style={{
                  display: "flex",
                  fontFamily:
                    "ui-monospace, SFMono-Regular, Menlo, monospace",
                  fontSize: 14,
                  letterSpacing: 2,
                  textTransform: "uppercase",
                  color: "rgba(255,255,255,0.45)",
                  marginTop: 4,
                }}
              >
                Author
              </div>
            </div>
          </div>
          <div
            style={{
              display: "flex",
              fontFamily: "ui-monospace, SFMono-Regular, Menlo, monospace",
              fontSize: 20,
              letterSpacing: 2,
              color: "rgba(255,255,255,0.55)",
            }}
          >
            momentus.ai/insights
          </div>
        </div>
      </div>
    ),
    { ...size }
  );
}
