"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowWeWork from "@/components/HowWeWork";
import BentoFriction from "@/components/BentoFriction";
import WhyHireNove from "@/components/WhyHireNove";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HelpUsLearnModal from "@/components/HelpUsLearnModal";
import DiscoveryModal from "@/components/DiscoveryModal";
import MouseTracker from "@/components/MouseTracker";

export default function Home() {
  const [learnOpen, setLearnOpen] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

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
        <About />
      </main>
      <Footer onDiscoveryOpen={() => setDiscoveryOpen(true)} />
      <HelpUsLearnModal open={learnOpen} onClose={() => setLearnOpen(false)} />
      <DiscoveryModal open={discoveryOpen} onClose={() => setDiscoveryOpen(false)} />
      <MouseTracker />
    </>
  );
}
