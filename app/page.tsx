import SiteLayout from "@/components/SiteLayout";
import Hero from "@/components/Hero";
import WhyHireNove from "@/components/WhyHireNove";
import IntegrationsSection from "@/components/IntegrationsSection";
import PilotBanner from "@/components/PilotBanner";

export default function Home() {
  return (
    <SiteLayout>
      <Hero />
      <WhyHireNove />
      <IntegrationsSection />
      <PilotBanner />
    </SiteLayout>
  );
}
