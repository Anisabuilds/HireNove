import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import WhyHireNove from "@/components/WhyHireNove";
import IntegrationsSection from "@/components/IntegrationsSection";
import HomeProcess from "@/components/HomeProcess";
import PilotBanner from "@/components/PilotBanner";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <HomeProcess />
      <WhyHireNove />
      <IntegrationsSection />
      <PilotBanner />
    </SiteLayout>
  );
}
