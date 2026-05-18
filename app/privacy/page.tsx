import Link from "next/link";
import type { Metadata } from "next";
import { Nav } from "@/components/nav";
import { Footer } from "@/components/footer";

export const metadata: Metadata = {
  title: "Privacy Policy | Momentus",
  description:
    "How Momentus collects, uses, and protects your data on momentus.ai and our product.",
};

export default function PrivacyPage() {
  return (
    <>
      <Nav />
      <main className="pb-24 pt-36 md:pt-44">
        <section className="container max-w-3xl">
          <span className="font-mono inline-block rounded-full border border-accent/25 bg-accent/10 px-3 py-1 text-[11px] uppercase tracking-[0.22em] text-accent">
            Privacy
          </span>
          <h1 className="font-display mt-5 text-balance text-4xl font-medium tracking-tight md:text-6xl">
            Privacy Policy
          </h1>
          <p className="mt-3 text-sm text-white/55">Last updated: May 2026</p>

          <div className="prose prose-invert mt-12 max-w-none space-y-10 text-white/80">
            <Section title="Who we are">
              <p>
                Momentus is a GEO × Paid agency operated from Bratislava, Slovakia and Budapest,
                Hungary. This policy covers the marketing site at <code>momentus.ai</code> and the
                Momentus product dashboard. Questions:{" "}
                <a className="text-accent" href="mailto:privacy@momentus.ai">privacy@momentus.ai</a>.
              </p>
            </Section>

            <Section title="What we collect on this marketing site">
              <p>
                Just aggregated, cookie-free analytics via{" "}
                <a className="text-accent" href="https://plausible.io" target="_blank" rel="noreferrer">
                  Plausible
                </a>{" "}
                — page views, referrers, country (from IP geolocation, IP not stored), and which
                buttons you clicked. No personal data, no cross-site tracking, no advertising
                cookies. If you book a call we hand off to{" "}
                <a className="text-accent" href="https://calendly.com" target="_blank" rel="noreferrer">
                  Calendly
                </a>{" "}
                which collects its own data per their policy.
              </p>
            </Section>

            <Section title="What the product collects">
              <p>
                When you become a customer, the Momentus dashboard stores: your workspace name and
                tracked brand, competitor names you configure, your team members' email addresses,
                Peec API or OAuth tokens you connect, and the AI-visibility data we observe on your
                behalf. We retain this for as long as your workspace is active. You can request
                export or deletion at any time.
              </p>
            </Section>

            <Section title="Subprocessors">
              <p>We rely on a small set of third parties to operate Momentus:</p>
              <ul className="ml-5 list-disc space-y-1">
                <li>Plausible Analytics — marketing site usage stats (EU-hosted)</li>
                <li>Calendly — booking confirmations for sales calls</li>
                <li>Railway — application hosting</li>
                <li>Anthropic (Claude API) — content + analysis</li>
                <li>Peec.ai — AI visibility data ingestion (only when you connect it)</li>
                <li>Resend or your SMTP provider — weekly report email delivery</li>
              </ul>
            </Section>

            <Section title="Your rights">
              <p>
                If you're in the EU/EEA/UK, you have the right to access, correct, port, or delete
                your data, and to lodge a complaint with your data-protection authority. Email{" "}
                <a className="text-accent" href="mailto:privacy@momentus.ai">privacy@momentus.ai</a>{" "}
                with the request; we'll respond within 30 days.
              </p>
            </Section>

            <Section title="Changes">
              <p>
                We'll post material changes here with a fresh "Last updated" date and email active
                workspace owners when they affect the product.
              </p>
            </Section>
          </div>

          <p className="mt-16 text-sm text-white/55">
            ←{" "}
            <Link className="text-accent" href="/">
              Back to momentus.ai
            </Link>
          </p>
        </section>
      </main>
      <Footer />
    </>
  );
}

function Section({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <section>
      <h2 className="font-display text-2xl font-medium tracking-tight text-white md:text-3xl">
        {title}
      </h2>
      <div className="mt-3 text-pretty text-base leading-relaxed text-white/75">{children}</div>
    </section>
  );
}
