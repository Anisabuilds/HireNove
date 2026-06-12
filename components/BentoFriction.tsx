"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { Unplug, PenLine, Brain, CalendarClock, Zap, Mail, RotateCcw, FileSearch } from "lucide-react";
import type { LucideIcon } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t, tr } from "@/lib/translations";

const icons: LucideIcon[] = [Unplug, PenLine, Brain, CalendarClock, Zap, Mail, RotateCcw, FileSearch];

export default function BentoFriction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const { lang } = useLang();
  const cards = t.bento.cards[lang].map((c, i) => ({ ...c, Icon: icons[i] }));

  return (
    <section id="friction" className="py-28 bg-warm-section" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div initial={{ opacity: 0, y: 24 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }} className="mb-5">
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">{tr(t.bento.label, lang)}</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 max-w-2xl leading-tight">
            {tr(t.bento.headline, lang)}{" "}
            <span className="gradient-text-static font-serif-accent">{tr(t.bento.accent, lang)}</span>
          </h2>
        </motion.div>

        <motion.div initial={{ opacity: 0, y: 12 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 mb-12" style={{ background: "#0E7490" }}>
          <span className="w-1 h-1 rounded-full bg-white/60 shrink-0" />
          <p className="text-sm text-white">{tr(t.bento.disclaimer, lang)}</p>
        </motion.div>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card, i) => (
            <motion.div key={i} initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative bg-white rounded-2xl p-6 transition-all duration-300"
              style={{ border: "1px solid rgba(0,0,0,0.07)" }}
              whileHover={{ borderColor: "rgba(6,182,212,0.22)", boxShadow: "0 2px 20px rgba(6,182,212,0.07)" }}>
              <div className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-violet-100" style={{ background: "rgba(6,182,212,0.08)" }}>
                <card.Icon size={17} className="text-violet-600" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-semibold text-slate-900 text-lg leading-snug mb-2">{card.title}</h3>
              <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-500 transition-colors duration-300">{card.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.p initial={{ opacity: 0 }} animate={inView ? { opacity: 1 } : {}} transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center text-slate-400 text-sm mt-10">
          <button className="text-violet-600 hover:text-violet-500 transition-colors font-medium"
            onClick={() => document.dispatchEvent(new CustomEvent("openDiscovery"))}>
            {tr(t.bento.cta, lang)}
          </button>
        </motion.p>
      </div>
    </section>
  );
}
