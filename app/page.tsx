"use client";
import { useState, useEffect } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowWeWork from "@/components/HowWeWork";
import BentoFriction from "@/components/BentoFriction";
import WhyHireNove from "@/components/WhyHireNove";
import IntegrationsSection from "@/components/IntegrationsSection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HelpUsLearnModal from "@/components/HelpUsLearnModal";
import DiscoveryModal from "@/components/DiscoveryModal";
import MouseTracker from "@/components/MouseTracker";

export default function Home() {
  const [learnOpen, setLearnOpen] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

  useEffect(() => {
    const fn = () => setDiscoveryOpen(true);
    document.addEventListener("openDiscovery", fn);
    return () => document.removeEventListener("openDiscovery", fn);
  }, []);

  return (
    <>
      <Navbar
        onLearnOpen={() => setLearnOpen(true)}
        onDiscoveryOpen={() => setDiscoveryOpen(true)}
      />
      <main>
        <Hero
          onLearnOpen={() => setLearnOpen(true)}
          onDiscoveryOpen={() => setDiscoveryOpen(true)}
        />
        <Marquee />
        <HowWeWork />
        <BentoFriction />
        <WhyHireNove />
        <IntegrationsSection />
        <About />
      </main>
      <Footer onDiscoveryOpen={() => setDiscoveryOpen(true)} />
      <HelpUsLearnModal open={learnOpen} onClose={() => setLearnOpen(false)} />
      <DiscoveryModal open={discoveryOpen} onClose={() => setDiscoveryOpen(false)} />
      <MouseTracker />
    </>
  );
}
