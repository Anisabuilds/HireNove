"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import { ShieldCheck, Server, Lock, FileKey } from "lucide-react";

const points = [
  {
    icon: Server,
    title: "Everything runs inside your environment",
    desc: "Automation tools are installed directly in your cloud, server, or OneDrive. No workflow, candidate record, or client data ever passes through our systems — or any external server we control.",
  },
  {
    icon: Lock,
    title: "Candidate data never leaves your infrastructure",
    desc: "Your ATS, CRM, and sourcing data stay exactly where they are. We connect your existing tools — we don't move data to platforms you don't own or control.",
  },
  {
    icon: ShieldCheck,
    title: "GDPR-compatible by design",
    desc: "Because everything is self-hosted inside your environment, you remain the data controller at all times. No third-party processors are introduced without your knowledge or consent.",
  },
  {
    icon: FileKey,
    title: "You own everything — always",
    desc: "When an engagement ends, every workflow, integration, and automation stays with you. Nothing is locked to us. You have full access and full ownership from day one.",
  },
];

export default function DataSecurity() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-12"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">Data & Security</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 max-w-2xl leading-tight">
            Your data stays{" "}
            <span className="gradient-text-static font-serif-accent">yours.</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl leading-relaxed">
            Recruitment firms handle sensitive candidate and client information every day. We take that seriously — which is why our entire model is built around working inside your existing environment, not ours.
          </p>
        </motion.div>

        <div className="grid sm:grid-cols-2 gap-4">
          {points.map((p, i) => (
            <motion.div
              key={i}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.45, delay: i * 0.08 }}
              className="rounded-2xl p-6 border border-black/7 bg-white hover:border-[#0E7490]/20 transition-all duration-300"
              style={{ boxShadow: "0 1px 4px rgba(0,0,0,0.04)" }}
            >
              <div
                className="w-9 h-9 rounded-lg flex items-center justify-center mb-4"
                style={{ background: "rgba(14,116,144,0.08)" }}
              >
                <p.icon size={17} className="text-[#0E7490]" strokeWidth={1.75} />
              </div>
              <h3 className="font-display font-semibold text-slate-900 text-base mb-2 leading-snug">{p.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{p.desc}</p>
            </motion.div>
          ))}
        </div>

        <motion.div
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.4 }}
          className="mt-8 rounded-2xl px-6 py-4 flex items-start gap-3"
          style={{ background: "rgba(14,116,144,0.05)", border: "1px solid rgba(14,116,144,0.12)" }}
        >
          <ShieldCheck size={15} className="text-[#0E7490] shrink-0 mt-0.5" />
          <p className="text-sm text-slate-500 leading-relaxed">
            We use self-hosted automation tools (primarily n8n) installed directly inside your cloud environment. This means no candidate CVs, client contacts, or internal communications ever touch an external server. If you have a compliance team or IT policy, we work within it.
          </p>
        </motion.div>
      </div>
    </section>
  );
}
