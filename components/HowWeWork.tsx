"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";

const steps = [
  {
    n: "01",
    title: "Understand Your Workflow",
    desc: "We learn how your recruitment process actually works today — not how it's documented, but how work genuinely flows. We map tasks, handoffs, tool usage, and the steps that depend on people remembering things.",
    tags: ["Discovery conversations", "Workflow mapping", "Tool audit"],
    color: "#06B6D4",
  },
  {
    n: "02",
    title: "Identify Bottlenecks",
    desc: "We find where time is lost, work is duplicated, and tools disconnect. Every point of friction that silently erodes recruiter productivity — ranked by impact and feasibility before we design anything.",
    tags: ["Process analysis", "Friction mapping", "Priority ranking"],
    color: "#6366F1",
  },
  {
    n: "03",
    title: "Design the Solution",
    desc: "We design a tailored improvement around your existing tools — never a generic template. Every solution is specific to your team's structure, volume, and operational constraints.",
    tags: ["Solution design", "Integration planning", "Scope definition"],
    color: "#818CF8",
  },
  {
    n: "04",
    title: "Implement and Optimise",
    desc: "We build, test, and refine alongside your team. Automation is only valuable when it works reliably in real conditions. We stay involved until the improvement is genuinely embedded.",
    tags: ["Build", "Test", "Iterate", "Embed"],
    color: "#A78BFA",
  },
];

export default function HowWeWork() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const [active, setActive] = useState(0);

  return (
    <section id="how-we-work" className="py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">Our Approach</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 max-w-2xl leading-tight">
            We start with the problem.{" "}
            <span className="gradient-text-static">Not the software.</span>
          </h2>
          <p className="text-slate-500 text-lg max-w-xl leading-relaxed">
            Most firms already have tools. The challenge is how work moves through them.
          </p>
        </motion.div>

        {/* Interactive step layout */}
        <div className="grid lg:grid-cols-2 gap-8 items-start">
          {/* Left — step selector */}
          <div className="space-y-3">
            {steps.map((step, i) => (
              <motion.button
                key={step.n}
                initial={{ opacity: 0, x: -24 }}
                animate={inView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.5, delay: i * 0.1 }}
                onClick={() => setActive(i)}
                className="w-full text-left rounded-2xl p-6 transition-all duration-300 group"
                style={{
                  background: active === i ? `rgba(6,182,212,0.06)` : "rgba(0,0,0,0.02)",
                  border: active === i ? `1px solid rgba(6,182,212,0.25)` : "1px solid rgba(0,0,0,0.07)",
                }}
              >
                <div className="flex items-center gap-4">
                  <span
                    className="text-3xl font-display font-bold leading-none shrink-0 transition-colors duration-300"
                    style={{ color: active === i ? step.color : "rgba(0,0,0,0.12)" }}
                  >
                    {step.n}
                  </span>
                  <div>
                    <p className={`font-display font-semibold transition-colors duration-300 ${active === i ? "text-slate-900" : "text-slate-400"}`}>
                      {step.title}
                    </p>
                    {active === i && (
                      <div className="flex flex-wrap gap-1.5 mt-2">
                        {step.tags.map((t) => (
                          <span key={t} className="text-xs px-2 py-0.5 rounded-full" style={{ background: "rgba(6,182,212,0.1)", color: "#06B6D4" }}>
                            {t}
                          </span>
                        ))}
                      </div>
                    )}
                  </div>
                </div>
              </motion.button>
            ))}
          </div>

          {/* Right — detail panel */}
          <motion.div
            key={active}
            initial={{ opacity: 0, y: 16 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.4 }}
            className="lg:sticky lg:top-28 rounded-3xl p-10 bg-white"
            style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
          >
            <div
              className="text-7xl font-display font-bold mb-4 leading-none"
              style={{ color: `${steps[active].color}20` }}
            >
              {steps[active].n}
            </div>
            <h3 className="text-2xl font-display font-bold text-slate-900 mb-4">{steps[active].title}</h3>
            <p className="text-slate-500 leading-relaxed text-base">{steps[active].desc}</p>

            <div className="mt-8 flex flex-wrap gap-2">
              {steps[active].tags.map((t) => (
                <span
                  key={t}
                  className="text-xs font-medium px-3 py-1.5 rounded-full"
                  style={{ background: "rgba(6,182,212,0.08)", color: "#06B6D4", border: "1px solid rgba(6,182,212,0.18)" }}
                >
                  {t}
                </span>
              ))}
            </div>

            {/* Progress dots */}
            <div className="flex gap-2 mt-8">
              {steps.map((_, i) => (
                <button
                  key={i}
                  onClick={() => setActive(i)}
                  className="h-1 rounded-full transition-all duration-300"
                  style={{
                    width: active === i ? "24px" : "8px",
                    background: active === i ? steps[active].color : "rgba(0,0,0,0.12)",
                  }}
                />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
