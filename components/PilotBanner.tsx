"use client";
import { motion } from "framer-motion";
import { useLang } from "@/lib/LanguageContext";
import { t, tr } from "@/lib/translations";

export default function PilotBanner() {
  const open = () => document.dispatchEvent(new CustomEvent("openPilot"));
  const { lang } = useLang();

  return (
    <section className="relative overflow-hidden bg-[#071C2E] py-24 px-6">
      <div className="pointer-events-none absolute inset-0"
        style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(14,116,144,0.35) 0%, transparent 70%)" }} />

      <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }} viewport={{ once: true }}
        transition={{ duration: 0.6 }} className="relative max-w-3xl mx-auto text-center">
        <span className="inline-block mb-5 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase bg-violet-600/20 text-violet-300 border border-violet-500/30">
          {tr(t.pilot.badge, lang)}
        </span>
        <h2 className="text-4xl sm:text-5xl font-display font-bold text-white mb-5 leading-tight">
          {tr(t.pilot.headline1, lang)}{" "}
          <span className="gradient-text font-serif-accent">{tr(t.pilot.headline2, lang)}</span>
        </h2>
        <p className="text-lg text-white/60 max-w-xl mx-auto mb-8 leading-relaxed">
          {tr(t.pilot.desc, lang)}
        </p>
        <button onClick={open}
          className="inline-flex items-center gap-2 px-8 py-4 rounded-xl bg-violet-600 hover:bg-violet-500 text-white font-semibold text-base transition-all duration-200 shadow-lg hover:shadow-violet-500/30">
          {tr(t.pilot.cta, lang)}
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
          </svg>
        </button>
        <p className="mt-4 text-sm text-white/30">{tr(t.pilot.footnote, lang)}</p>
      </motion.div>
    </section>
  );
}
