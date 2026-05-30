import { Nav } from "@/components/nav";
import { Hero } from "@/components/hero";
import { Partners } from "@/components/partners";
import { Press } from "@/components/press";
import { Problem } from "@/components/problem";
import { Comparison } from "@/components/comparison";
import { Flywheel } from "@/components/flywheel";
import { Services } from "@/components/services";
import { Stats } from "@/components/stats";
import { CaseStudies } from "@/components/case-studies";
import { Process } from "@/components/process";
import { ValuesMarquee } from "@/components/values-marquee";
import { Testimonials } from "@/components/testimonials";
import { ICP } from "@/components/icp";
import { FAQ } from "@/components/faq";
import { CTAForm } from "@/components/cta-form";
import { Footer } from "@/components/footer";
import { RecentWins } from "@/components/recent-wins";
import { JsonLd } from "@/components/ui/json-ld";
import { faqJsonLd } from "@/lib/seo/faq";
import { FAQS_QA } from "@/lib/faqs";

export default function Home() {
  const faqSchema = faqJsonLd(FAQS_QA);

  return (
    <>
      <JsonLd data={faqSchema} />
      <Nav />
      <main>
        <Hero />
        <Partners />
        <Press />
        <Problem />
        <Comparison />
        <Flywheel />
        <Services />
        <Stats />
        <CaseStudies />
        <Testimonials />
        <Process />
        <ValuesMarquee />
        <ICP />
        <FAQ />
        <CTAForm />
      </main>
      <Footer />
      <RecentWins />
    </>
  );
}
