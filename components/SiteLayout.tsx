"use client";
import { useState, useEffect } from "react";
import Navbar from "./Navbar";
import Footer from "./Footer";
import HelpUsLearnModal from "./HelpUsLearnModal";
import DiscoveryModal from "./DiscoveryModal";
import PilotModal from "./PilotModal";
import MouseTracker from "./MouseTracker";

export default function SiteLayout({ children }: { children: React.ReactNode }) {
  const [learnOpen, setLearnOpen] = useState(false);
  const [discoveryOpen, setDiscoveryOpen] = useState(false);

  useEffect(() => {
    const openD = () => setDiscoveryOpen(true);
    const openL = () => setLearnOpen(true);
    document.addEventListener("openDiscovery", openD);
    document.addEventListener("openLearn", openL);
    return () => {
      document.removeEventListener("openDiscovery", openD);
      document.removeEventListener("openLearn", openL);
    };
  }, []);

  return (
    <>
      <Navbar
        onLearnOpen={() => setLearnOpen(true)}
        onDiscoveryOpen={() => setDiscoveryOpen(true)}
      />
      <main>{children}</main>
      <Footer onDiscoveryOpen={() => setDiscoveryOpen(true)} />
      <HelpUsLearnModal open={learnOpen} onClose={() => setLearnOpen(false)} />
      <DiscoveryModal open={discoveryOpen} onClose={() => setDiscoveryOpen(false)} />
      <PilotModal />
      <MouseTracker />
    </>
  );
}
