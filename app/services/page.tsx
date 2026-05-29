import type { Metadata } from "next";
import Link from "next/link";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";
import { CALENDLY_URL } from "@/lib/config";
import { SERVICES } from "./_components/shared";
import { ServicesIndexClient } from "./_components/ServicesIndexClient";

const SUB =
  "Three disciplines. One agency. Pick the lever that moves first for your category, or run the full flywheel — but never both halves with two agencies.";

export const metadata: Metadata = {
  title: "Services | Momentus",
  description: SUB,
  keywords: [
    "Momentus services",
    "GEO agency",
    "paid agency",
    "GEO and paid",
    "AI visibility agency",
    "B2B specialist agency",
  ],
  openGraph: {
    title: "Services | Momentus",
    description: SUB,
    type: "website",
    images: ["/opengraph-image"],
  },
  twitter: {
    card: "summary_large_image",
    title: "Services | Momentus",
    description: SUB,
    images: ["/opengraph-image"],
  },
};

export default function ServicesIndex() {
  return (
    <>
      <Nav />
      <main>
        <ServicesIndexClient services={SERVICES.map((s) => ({ ...s }))} sub={SUB} calendlyUrl={CALENDLY_URL} />
      </main>
      <Footer />
    </>
  );
}
