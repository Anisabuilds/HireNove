"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { useLang } from "@/lib/LanguageContext";
import { t, tr } from "@/lib/translations";

export default function WhyHireNove() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const { lang } = useLang();
  const outcomes = t.why.outcomes[lang];

  return (
    <section id="why" className="py-28 bg-white relative overflow-hidden" ref={ref}>
      <div className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(6,182,212,0.06) 0%, transparent 70%)", filter: "blur(60px)" }} />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div initial={{ opacity: 0, x: -32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7 }}>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">{tr(t.why.label, lang)}</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-6 leading-tight">
              {tr(t.why.headline1, lang)}{" "}
              <span className="gradient-text-static font-serif-accent">{tr(t.why.headline2, lang)}</span>
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed mb-8">
              <p>{tr(t.why.p1, lang)}</p>
              <p>{tr(t.why.p2, lang)}</p>
              <p>{tr(t.why.p3, lang)}</p>
              <p className="text-slate-700 font-medium">{tr(t.why.p4, lang)}</p>
            </div>
            <button onClick={() => document.dispatchEvent(new CustomEvent("openDiscovery"))}
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md hover:shadow-violet-500/30">
              {tr(t.why.cta, lang)}
            </button>
          </motion.div>

          {/* Right — outcomes */}
          <motion.div initial={{ opacity: 0, x: 32 }} animate={inView ? { opacity: 1, x: 0 } : {}} transition={{ duration: 0.7, delay: 0.15 }}>
            <div className="rounded-3xl p-8 bg-white" style={{ border: "1px solid rgba(0,0,0,0.07)" }}>
              <p className="text-xs font-semibold text-violet-600 uppercase tracking-widest mb-7">{tr(t.why.outcomesLabel, lang)}</p>
              <div className="space-y-5">
                {outcomes.map((o, i) => (
                  <motion.div key={i} initial={{ opacity: 0, x: 16 }} animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }} className="flex items-start gap-4">
                    <div className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(6,182,212,0.12)", border: "1px solid rgba(6,182,212,0.25)" }}>
                      <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#06B6D4" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-slate-900 font-medium text-sm">{o.label}</p>
                      <p className="text-slate-400 text-xs mt-0.5">{o.sub}</p>
                    </div>
                  </motion.div>
                ))}
              </div>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
