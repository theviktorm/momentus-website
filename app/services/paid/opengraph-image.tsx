import { OG_SIZE, renderServiceOg } from "../_components/og-template";

export const runtime = "nodejs";
export const alt = "Momentus Paid — Paid that compounds, not paid that taxes.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderServiceOg({
    num: "02",
    serviceLabel: "PAID",
    headline: "Paid that compounds, not paid that taxes.",
    pathSuffix: "/services/paid",
  });
}
