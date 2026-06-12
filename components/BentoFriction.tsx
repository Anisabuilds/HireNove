"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import {
  Unplug, PenLine, Brain, CalendarClock,
  Zap, Mail, RotateCcw, FileSearch,
} from "lucide-react";
import type { LucideIcon } from "lucide-react";

const cards: { title: string; desc: string; Icon: LucideIcon }[] = [
  { title: "Disconnected Tools",             desc: "Your ATS, CRM, email, and spreadsheets don't talk — recruiters become the integration layer.",          Icon: Unplug },
  { title: "Manual ATS Updates",             desc: "Logging every call and stage change by hand turns a 2-minute interaction into a 10-minute task.",        Icon: PenLine },
  { title: "Memory-Dependent Processes",     desc: "Follow-ups and handoffs that live in someone's head fall through the moment things get busy.",           Icon: Brain },
  { title: "Scheduling Coordination",        desc: "Hours lost to back-and-forth emails aligning candidate and client availability.",                         Icon: CalendarClock },
  { title: "Processes That Break Under Pressure", desc: "Workflows that work at normal volume collapse at full capacity — exactly when it matters most.",    Icon: Zap },
  { title: "Repetitive Outreach",            desc: "Writing near-identical messages when structured templates could handle 80% of it automatically.",         Icon: Mail },
  { title: "Feedback Chasing",               desc: "Manually chasing interview feedback from hiring managers — every time, every candidate, every role.",     Icon: RotateCcw },
  { title: "CV Screening Overhead",          desc: "Reading every application manually when clear criteria could filter the majority within seconds.",         Icon: FileSearch },
];

export default function BentoFriction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="friction" className="py-28 bg-warm-section" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-5"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">Common Friction Areas</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 max-w-2xl leading-tight">
            Where recruitment teams lose time{" "}
            <span className="gradient-text-static font-serif-accent">every day.</span>
          </h2>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 12 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-center gap-2.5 rounded-lg px-4 py-2.5 mb-12"
          style={{ background: "rgba(6,182,212,0.06)", border: "1px solid rgba(6,182,212,0.15)" }}
        >
          <span className="w-1 h-1 rounded-full bg-violet-500 shrink-0" />
          <p className="text-sm text-violet-700">
            <strong className="font-semibold text-violet-800">Examples only.</strong>{" "}
            Every solution we build is tailored to your specific process.
          </p>
        </motion.div>

        {/* Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-3">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.06 }}
              className="group relative bg-white rounded-2xl p-6 transition-all duration-300"
              style={{ border: "1px solid rgba(0,0,0,0.07)" }}
              whileHover={{
                borderColor: "rgba(6,182,212,0.22)",
                boxShadow: "0 2px 20px rgba(6,182,212,0.07)",
              }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4 transition-colors duration-300 group-hover:bg-violet-100"
                style={{ background: "rgba(6,182,212,0.08)" }}
              >
                <card.Icon size={17} className="text-violet-600" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-semibold text-slate-900 text-lg leading-snug mb-2">
                {card.title}
              </h3>
              <p className="text-slate-400 text-xs leading-relaxed group-hover:text-slate-500 transition-colors duration-300">
                {card.desc}
              </p>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.55 }}
          className="text-center text-slate-400 text-sm mt-10"
        >
          Don't see your challenge here?{" "}
          <button
            className="text-violet-600 hover:text-violet-500 transition-colors font-medium"
            onClick={() => document.dispatchEvent(new CustomEvent("openDiscovery"))}
          >
            Tell us what's slowing your team down →
          </button>
        </motion.p>
      </div>
    </section>
  );
}
