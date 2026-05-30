import { OG_SIZE, renderServiceOg } from "../_components/og-template";

export const runtime = "nodejs";
export const alt = "Momentus GEO × Paid — The full flywheel. Both halves, run together.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderServiceOg({
    num: "03",
    serviceLabel: "GEO × PAID",
    headline: "The full flywheel. Both halves, run together.",
    pathSuffix: "/services/geo-x-paid",
  });
}
