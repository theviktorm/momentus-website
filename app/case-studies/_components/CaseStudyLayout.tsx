"use client";

/**
 * Shared shell for case-study pages (both the index and individual studies).
 * Owns Nav + Footer + the consistent dark background gradient, so the page
 * files only have to focus on editorial content.
 */

import { ReactNode } from "react";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

interface CaseStudyLayoutProps {
  children: ReactNode;
}

export function CaseStudyLayout({ children }: CaseStudyLayoutProps) {
  return (
    <>
      <Nav />
      <main className="relative pb-24 pt-28 md:pt-36">{children}</main>
      <Footer />
    </>
  );
}
