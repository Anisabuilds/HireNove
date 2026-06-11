"use client";
import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/components/Hero";
import Marquee from "@/components/Marquee";
import HowWeWork from "@/components/HowWeWork";
import BentoFriction from "@/components/BentoFriction";
import WhyHireNove from "@/components/WhyHireNove";
import DiscoverySection from "@/components/DiscoverySection";
import About from "@/components/About";
import Footer from "@/components/Footer";
import HelpUsLearnModal from "@/components/HelpUsLearnModal";

export default function Home() {
  const [learnOpen, setLearnOpen] = useState(false);

  return (
    <>
      <Navbar onLearnOpen={() => setLearnOpen(true)} />
      <main>
        <Hero onLearnOpen={() => setLearnOpen(true)} />
        <Marquee />
        <HowWeWork />
        <BentoFriction />
        <WhyHireNove />
        <DiscoverySection />
        <About />
      </main>
      <Footer />
      <HelpUsLearnModal open={learnOpen} onClose={() => setLearnOpen(false)} />
    </>
  );
}
