"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const cards = [
  {
    size: "lg", // col-span-2
    title: "Disconnected Tools",
    desc: "Your ATS, CRM, email, LinkedIn, and spreadsheets don't talk to each other — so recruiters become the integration layer, manually moving data between systems all day.",
    icon: "⊗",
    accent: "#7C3AED",
  },
  {
    size: "sm",
    title: "Manual ATS Updates",
    desc: "Logging every call, stage change, and note by hand — turning a 2-minute interaction into a 10-minute admin task.",
    icon: "⟳",
    accent: "#6366F1",
  },
  {
    size: "sm",
    title: "Memory-Dependent Processes",
    desc: "Follow-ups, reminders, and handoffs that exist only in someone's head. When things get busy, they fall through.",
    icon: "🧠",
    accent: "#818CF8",
  },
  {
    size: "sm",
    title: "Scheduling Coordination",
    desc: "Hours lost to back-and-forth emails aligning candidate and client availability across multiple open roles.",
    icon: "📅",
    accent: "#A78BFA",
  },
  {
    size: "lg",
    title: "Processes That Break Under Pressure",
    desc: "Workflows that function adequately at normal volume but collapse when the team is at full capacity — exactly when reliability matters most. The busier you are, the worse it gets.",
    icon: "⚡",
    accent: "#7C3AED",
  },
  {
    size: "sm",
    title: "Repetitive Outreach",
    desc: "Writing near-identical messages repeatedly when structured templates could handle 80% of it automatically.",
    icon: "✉",
    accent: "#6366F1",
  },
  {
    size: "sm",
    title: "Feedback Chasing",
    desc: "Manually chasing interview feedback from hiring managers — every time, for every candidate, for every role.",
    icon: "↻",
    accent: "#818CF8",
  },
  {
    size: "sm",
    title: "CV Screening Overhead",
    desc: "Reading every application manually when clear criteria could filter the majority within seconds.",
    icon: "⏱",
    accent: "#A78BFA",
  },
];

export default function BentoFriction() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section id="friction" className="py-28" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-6"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-3">Common Friction Areas</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-white mb-4 max-w-2xl leading-tight">
            Where recruitment teams lose time every day.
          </h2>
        </motion.div>

        {/* Disclaimer */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="inline-flex items-start gap-3 rounded-xl px-5 py-3 mb-12"
          style={{ background: "rgba(124,58,237,0.1)", border: "1px solid rgba(167,139,250,0.2)" }}
        >
          <span className="text-violet-400 text-sm">ⓘ</span>
          <p className="text-sm text-violet-300/80">
            <strong className="text-violet-300">Examples only.</strong> Every agency is different — every solution we build is tailored to what we find in your specific process.
          </p>
        </motion.div>

        {/* Bento grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
          {cards.map((card, i) => (
            <motion.div
              key={card.title}
              initial={{ opacity: 0, y: 24 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.07 }}
              className={`group rounded-2xl p-7 cursor-default transition-all duration-300 hover:scale-[1.02] ${
                card.size === "lg" ? "lg:col-span-2" : ""
              }`}
              style={{
                background: "rgba(255,255,255,0.025)",
                border: "1px solid rgba(255,255,255,0.07)",
              }}
              whileHover={{
                background: `rgba(124,58,237,0.08)`,
                borderColor: "rgba(167,139,250,0.25)",
              }}
            >
              <div className="flex items-start gap-4">
                <span
                  className="text-3xl shrink-0 opacity-80 group-hover:opacity-100 transition-opacity duration-300"
                >
                  {card.icon}
                </span>
                <div>
                  <h3 className="font-display font-semibold text-white mb-2 text-sm group-hover:text-white transition-colors">
                    {card.title}
                  </h3>
                  <p className="text-white/40 text-xs leading-relaxed group-hover:text-white/60 transition-colors duration-300">
                    {card.desc}
                  </p>
                </div>
              </div>
            </motion.div>
          ))}
        </div>

        {/* Bottom note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-center text-white/25 text-sm mt-10"
        >
          Don't see your challenge here?{" "}
          <a href="#discovery" className="text-violet-400 hover:text-violet-300 transition-colors">
            Tell us what's slowing your team down →
          </a>
        </motion.p>
      </div>
    </section>
  );
}
