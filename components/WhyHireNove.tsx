"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const outcomes = [
  { label: "Less manual work", sub: "Automate the repeatable, standardise the consistent." },
  { label: "Fewer bottlenecks", sub: "Remove steps that slow the entire process down." },
  { label: "Better recruiter productivity", sub: "More capacity for the work that drives revenue." },
  { label: "Fewer process errors", sub: "Replace memory-dependent steps with reliable systems." },
  { label: "More time for candidates", sub: "Relationship work instead of administrative overhead." },
  { label: "More focus on placements", sub: "The output that actually matters." },
];

export default function WhyHireNove() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="why" className="py-28 relative overflow-hidden" ref={ref}>
      {/* BG accent */}
      <div
        className="absolute right-0 top-1/2 -translate-y-1/2 w-[600px] h-[600px] rounded-full pointer-events-none"
        style={{ background: "radial-gradient(circle, rgba(124,58,237,0.1) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Left */}
          <motion.div
            initial={{ opacity: 0, x: -32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Why HireNove</p>
            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-6 leading-tight">
              Most firms already have tools.{" "}
              <span className="gradient-text-static">The problem is between them.</span>
            </h2>
            <div className="space-y-4 text-white/50 leading-relaxed mb-8">
              <p>Recruitment firms invest in ATS platforms, CRM systems, sourcing tools, and communication software. The challenge is rarely a missing product.</p>
              <p>The challenge is that daily workflows still generate manual work, duplicated effort, and admin friction — because tools don't connect, processes weren't designed for actual volume, or the operating rhythm has evolved beyond what was originally configured.</p>
              <p className="text-white/80 font-medium">We focus on improving how work moves through your existing systems — before recommending any new technology.</p>
            </div>
            <a
              href="#discovery"
              className="inline-flex items-center gap-2 px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-lg hover:shadow-violet-500/30"
            >
              Start a Conversation
            </a>
          </motion.div>

          {/* Right — outcomes */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <div
              className="rounded-3xl p-8"
              style={{ background: "rgba(255,255,255,0.03)", border: "1px solid rgba(255,255,255,0.07)" }}
            >
              <p className="text-xs font-semibold text-violet-300 uppercase tracking-widest mb-7">What changes for your team</p>
              <div className="space-y-5">
                {outcomes.map((o, i) => (
                  <motion.div
                    key={o.label}
                    initial={{ opacity: 0, x: 16 }}
                    animate={inView ? { opacity: 1, x: 0 } : {}}
                    transition={{ duration: 0.4, delay: 0.3 + i * 0.07 }}
                    className="flex items-start gap-4"
                  >
                    <div
                      className="w-5 h-5 rounded-full flex items-center justify-center shrink-0 mt-0.5"
                      style={{ background: "rgba(124,58,237,0.2)", border: "1px solid rgba(167,139,250,0.35)" }}
                    >
                      <svg className="w-2.5 h-2.5" viewBox="0 0 12 12" fill="none">
                        <path d="M2 6l3 3 5-5" stroke="#A78BFA" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
                      </svg>
                    </div>
                    <div>
                      <p className="text-white font-medium text-sm">{o.label}</p>
                      <p className="text-white/40 text-xs mt-0.5">{o.sub}</p>
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
