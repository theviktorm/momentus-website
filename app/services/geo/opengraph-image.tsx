import { OG_SIZE, renderServiceOg } from "../_components/og-template";

export const runtime = "nodejs";
export const alt = "Momentus GEO — Become the brand AI quietly recommends.";
export const size = OG_SIZE;
export const contentType = "image/png";

export default async function Image() {
  return renderServiceOg({
    num: "01",
    serviceLabel: "GEO",
    headline: "Become the brand AI quietly recommends.",
    pathSuffix: "/services/geo",
  });
}
