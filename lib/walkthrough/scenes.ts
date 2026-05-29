/**
 * Walkthrough scene metadata. Owns ordering + copy so the page component
 * stays focused on motion mechanics.
 */
export type SceneId = "import" | "track" | "alert" | "share" | "run";

export interface Scene {
  id: SceneId;
  step: number;
  label: string;     // word on the eyebrow after the step ("Import", "Track" …)
  title: string;
  body: string;
}

export const SCENES: Scene[] = [
  {
    id: "import",
    step: 1,
    label: "Import",
    title: "Drop a Peec CSV or connect the API.",
    body:
      "Format auto-detects — prompt-level or URL-citation. 4,000 rows take 90 seconds. Mentions are derived as BrandMention rows; sentiment is normalized to a single [-1, 1] scale at parse time so you're not staring at three different number systems.",
  },
  {
    id: "track",
    step: 2,
    label: "Track",
    title: "Every prompt your buyer might ask, scored on every platform.",
    body:
      "One row per (prompt × AI platform × date). Visibility, sentiment, position, mention count. Filter by source, AI platform, date range. Click a row for the full AI answer + every brand mentioned + every URL cited.",
  },
  {
    id: "alert",
    step: 3,
    label: "Alert",
    title: "When AI changes its mind, you know before your CMO asks.",
    body:
      "Four anomaly detectors run after every import: visibility drop, new competitor, sentiment flip, platform change. Each lands in the in-app inbox + Slack + outbound webhooks. The agency calls the client before the client notices.",
  },
  {
    id: "share",
    step: 4,
    label: "Share",
    title: "Give the CMO a link. No login. Read-only. Their brand.",
    body:
      "Generate a share token, send the URL. The page renders with the client's tracked brand, logo, accent color. They see their visibility curve, top competitors, sentiment distribution, last 30 days. They can't edit. They can't see other clients. View count tracked, so you know if they're looking.",
  },
  {
    id: "run",
    step: 5,
    label: "Run",
    title: "Eleven engines fire automatically. You see every run.",
    body:
      "Each import triggers a registry of inline/background/scheduled engines. The runs log shows what fired, when, status, duration, result summary. Failed engine? You see why and can re-run manually. No black box.",
  },
];
