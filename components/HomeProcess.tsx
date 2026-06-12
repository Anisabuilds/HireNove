"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t, tr } from "@/lib/translations";

const colors = ["#0E7490", "#0891B2", "#06B6D4", "#0E7490"];
const aligns = ["left", "right", "left", "right"];

function StepRow({ step, index, isRight }: { step: { n: string; title: string; desc: string }; index: number; isRight: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const color = colors[index];

  return (
    <div ref={ref} className="relative min-h-[55vh] flex items-center overflow-hidden">
      <motion.p
        initial={{ opacity: 0, x: isRight ? 80 : -80 }}
        animate={inView ? { opacity: 0.06, x: isRight ? 40 : -40 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        aria-hidden
        className="pointer-events-none select-none absolute font-display font-bold leading-none"
        style={{
          fontSize: "clamp(10rem, 30vw, 26rem)",
          color,
          right: isRight ? "-2vw" : "auto",
          left: isRight ? "auto" : "-2vw",
          top: "50%",
          transform: "translateY(-50%)",
          lineHeight: 0.85,
        }}
      >
        {step.n}
      </motion.p>

      {index < 3 && (
        <motion.div initial={{ scaleY: 0 }} animate={inView ? { scaleY: 1 } : {}} transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 origin-top"
          style={{ width: 1, height: "40%", background: "rgba(14,116,144,0.15)" }} />
      )}

      <div className="w-full py-16 px-8">
        <div className={`max-w-[75vw] ${isRight ? "ml-auto text-right pr-6 lg:pr-24" : "text-left pl-6 lg:pl-24"}`}>
          <motion.div initial={{ opacity: 0, y: 30 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6, delay: 0.1 }}>
            <span className="inline-block text-xs font-semibold uppercase tracking-widest mb-3" style={{ color }}>
              Step {step.n}
            </span>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight mb-5">
              {step.title}
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed">{step.desc}</p>
            <motion.div initial={{ scaleX: 0 }} animate={inView ? { scaleX: 1 } : {}} transition={{ duration: 0.5, delay: 0.35 }}
              className={`mt-8 h-0.5 w-16 rounded-full origin-left ${isRight ? "ml-auto origin-right" : ""}`}
              style={{ background: color }} />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function HomeProcess({ hideHeader = false }: { hideHeader?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });
  const { lang } = useLang();
  const steps = t.process.steps[lang];

  return (
    <section className="bg-white py-16 overflow-hidden">
      {!hideHeader && (
        <div className="max-w-7xl mx-auto px-6 mb-4" ref={ref}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={inView ? { opacity: 1, y: 0 } : {}} transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4">
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">{tr(t.process.label, lang)}</p>
              <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight max-w-xl">
                {tr(t.process.headline1, lang)}{" "}
                <span className="gradient-text-static font-serif-accent">{tr(t.process.headline2, lang)}</span>
              </h2>
            </div>
            <Link href="/services" className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-500 transition-colors shrink-0">
              {tr(t.process.fullProcess, lang)} <ArrowRight size={14} />
            </Link>
          </motion.div>
        </div>
      )}

      {steps.map((step, i) => (
        <StepRow key={step.n} step={step} index={i} isRight={aligns[i] === "right"} />
      ))}
    </section>
  );
}
