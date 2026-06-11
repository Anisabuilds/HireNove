"use client";
import { motion } from "framer-motion";
import type { Variants } from "framer-motion";
import { ArrowRight, ChevronDown } from "lucide-react";

const fadeUp: Variants = {
  hidden: { opacity: 0, y: 30 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, delay: i * 0.12, ease: "easeOut" },
  }),
};

export default function Hero({ onLearnOpen, onDiscoveryOpen }: { onLearnOpen: () => void; onDiscoveryOpen: () => void }) {
  return (
    <section id="top" className="relative min-h-screen flex flex-col justify-center overflow-hidden">
      {/* Mesh gradient background */}
      <div className="absolute inset-0 z-0">
        <div
          className="absolute top-0 left-1/4 w-[800px] h-[800px] rounded-full opacity-10"
          style={{ background: "radial-gradient(circle, #7C3AED 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute bottom-0 right-1/4 w-[600px] h-[600px] rounded-full opacity-8"
          style={{ background: "radial-gradient(circle, #4F46E5 0%, transparent 70%)", filter: "blur(80px)" }}
        />
        <div
          className="absolute top-1/3 right-0 w-[400px] h-[400px] rounded-full opacity-6"
          style={{ background: "radial-gradient(circle, #A78BFA 0%, transparent 70%)", filter: "blur(60px)" }}
        />
      </div>

      {/* Grid overlay */}
      <div
        className="absolute inset-0 z-0 opacity-[0.025]"
        style={{
          backgroundImage: `linear-gradient(rgba(0,0,0,0.1) 1px, transparent 1px),
                            linear-gradient(90deg, rgba(0,0,0,0.1) 1px, transparent 1px)`,
          backgroundSize: "60px 60px",
        }}
      />

      <div className="relative z-10 max-w-7xl mx-auto px-6 pt-32 pb-20">
        {/* Eyebrow */}
        <motion.div
          custom={0}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="inline-flex items-center gap-2.5 mb-8 px-4 py-2 rounded-full"
          style={{ background: "rgba(124,58,237,0.08)", border: "1px solid rgba(124,58,237,0.2)" }}
        >
          <span className="w-1.5 h-1.5 rounded-full bg-violet-600" />
          <span className="text-xs font-semibold text-violet-700 tracking-widest uppercase">
            Workflow Optimisation · Recruitment Firms
          </span>
        </motion.div>

        {/* Headline */}
        <motion.h1
          custom={1}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-5xl sm:text-6xl lg:text-7xl font-display font-bold leading-[1.05] mb-6 max-w-4xl text-balance text-slate-900"
        >
          Recruiters should spend time{" "}
          <span className="gradient-text font-serif-accent">recruiting.</span>
        </motion.h1>

        {/* Sub */}
        <motion.p
          custom={2}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-lg sm:text-xl text-slate-500 leading-relaxed max-w-2xl mb-4"
        >
          Not updating systems. Not copying data. Not chasing information.
          Not fighting disconnected tools.
        </motion.p>
        <motion.p
          custom={3}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="text-base text-slate-400 max-w-xl mb-12"
        >
          HireNove works directly with recruitment agencies to identify bottlenecks,
          connect existing tools, and eliminate operational friction — custom-built around your process.
        </motion.p>

        {/* CTAs */}
        <motion.div
          custom={4}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="flex flex-col sm:flex-row gap-4"
        >
          <button
            onClick={onDiscoveryOpen}
            className="group inline-flex items-center justify-center gap-2 px-7 py-4 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl transition-all duration-200 text-sm shadow-lg hover:shadow-violet-500/30"
          >
            Book a Discovery Call
            <ArrowRight size={16} className="group-hover:translate-x-1 transition-transform duration-200" />
          </button>
          <button
            onClick={onLearnOpen}
            className="inline-flex items-center justify-center gap-2 px-7 py-4 rounded-xl text-slate-600 hover:text-slate-900 font-semibold text-sm transition-all duration-200 bg-white border border-black/10 hover:border-violet-200 shadow-sm"
          >
            Help Us Learn
            <span className="text-violet-600">→</span>
          </button>
        </motion.div>

        {/* Floating stat cards */}
        <motion.div
          custom={5}
          variants={fadeUp}
          initial="hidden"
          animate="visible"
          className="mt-20 grid grid-cols-1 sm:grid-cols-3 gap-4 max-w-3xl"
        >
          {[
            { label: "Hours/week", sub: "lost to admin that shouldn't exist" },
            { label: "Disconnected tools", sub: "creating friction across every workflow" },
            { label: "Custom-built", sub: "solutions — never a template" },
          ].map((s) => (
            <div
              key={s.label}
              className="bg-white rounded-xl p-5 border border-black/8 shadow-sm hover:border-violet-200 hover:shadow-md transition-all duration-300"
            >
              <p className="font-display font-bold text-slate-900 text-base mb-1">{s.label}</p>
              <p className="text-slate-400 text-xs">{s.sub}</p>
            </div>
          ))}
        </motion.div>
      </div>

      {/* Scroll cue */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 1.5 }}
        className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5 text-slate-300"
      >
        <span className="text-xs tracking-widest uppercase">Scroll</span>
        <ChevronDown size={16} className="animate-bounce" />
      </motion.div>
    </section>
  );
}
