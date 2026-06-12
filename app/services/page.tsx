import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import HomeProcess from "@/components/HomeProcess";
import BentoFriction from "@/components/BentoFriction";

export const metadata: Metadata = {
  title: "Services — HireNove",
  description: "How HireNove works: from workflow discovery to custom automation implementation for recruitment firms.",
};

export default function ServicesPage() {
  return (
    <SiteLayout>
      {/* Page hero */}
      <section className="pt-36 pb-16 bg-white">
        <div className="max-w-7xl mx-auto px-6 text-center flex flex-col items-center">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">Our Process</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight max-w-3xl mb-5">
            How we find and fix
            <br />
            <span className="gradient-text-static font-serif-accent">operational friction.</span>
          </h1>
          <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
            Every engagement starts with understanding — not assumptions. We map how your team actually works before designing anything.
          </p>
        </div>
      </section>

      <HomeProcess hideHeader />
      <BentoFriction />
    </SiteLayout>
  );
}
