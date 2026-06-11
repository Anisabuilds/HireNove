import type { Metadata } from "next";
import SiteLayout from "@/components/SiteLayout";
import About from "@/components/About";

export const metadata: Metadata = {
  title: "About — HireNove",
  description: "HireNove is a boutique workflow optimisation consultancy founded by Anisa Leci, working directly with recruitment firms.",
};

export default function AboutPage() {
  return (
    <SiteLayout>
      {/* Page hero */}
      <section className="pt-36 pb-4 bg-white">
        <div className="max-w-7xl mx-auto px-6">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">About</p>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight max-w-3xl mb-5">
            Built on curiosity about how{" "}
            <span className="gradient-text-static font-serif-accent">work actually gets done.</span>
          </h1>
        </div>
      </section>

      <About />
    </SiteLayout>
  );
}
