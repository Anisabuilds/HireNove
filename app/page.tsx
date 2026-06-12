import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import WhyHireNove from "@/components/WhyHireNove";
import IntegrationsSection from "@/components/IntegrationsSection";
import HomeProcess from "@/components/HomeProcess";
import PilotBanner from "@/components/PilotBanner";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <Marquee />
      <HomeProcess />
      <WhyHireNove />
      <IntegrationsSection />
      <PilotBanner />
    </SiteLayout>
  );
}
