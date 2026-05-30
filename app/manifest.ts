import type { MetadataRoute } from "next";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Momentus",
    short_name: "Momentus",
    description: "Specialist GEO × Paid agency. Take first place in AI citations.",
    start_url: "/",
    display: "standalone",
    background_color: "#07070A",
    theme_color: "#C6FF3D",
    icons: [],
  };
}
