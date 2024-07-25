export const metadata = {
  title: "Home - Creative",
  description: "Page description",
};

import Hero from "@/components/landing/hero";
import Features01 from "@/components/landing/features-01";
import Features02 from "@/components/landing/features-02";
import Features03 from "@/components/landing/features-03";
import PricingTabs from "@/components/landing/pricing-tabs";
import Testimonials from "@/components/landing/testimonials";
import Cta from "@/components/landing/cta";

export default function Home() {
  return (
    <>
      <Hero />
      <Features01 />
      <Features02 />
      <Features03 />
      <PricingTabs />
      <Testimonials />
      <Cta />
    </>
  );
}
