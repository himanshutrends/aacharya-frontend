import "@/css/style.css"
export const metadata = {
  title: "Home - Aacharya",
  description: "Created by the students for the students",
};

import Header from "@/components/landing/ui/header"
import Footer from "@/components/landing/ui/footer"
import Hero from "@/components/landing/hero";
import Features01 from "@/components/landing/features-01";
import Features02 from "@/components/landing/features-02";
import Features03 from "@/components/landing/features-03";
import PricingTabs from "@/components/landing/pricing-tabs";
import Testimonials from "@/components/landing/testimonials";
import Cta from "@/components/landing/cta";

export default function Home() {
  return (
    <div className="flex flex-col min-h-screen overflow-hidden supports-[overflow:clip]:overflow-clip">
      <main className="grow">
        <Header />
        <Hero />
        <Features01 />
        <Features02 />
        <Features03 />
        <PricingTabs />
        <Testimonials />
        <Cta />
      </main>
      <Footer />
    </div>

  );
}
