"use client";
import { motion } from "framer-motion";
import { useRef } from "react";
import { useInView } from "framer-motion";
import SiteLayout from "@/components/SiteLayout";

const steps = [
  {
    n: "01",
    title: "Discovery & Workflow Mapping",
    desc: "We start with a deep-dive into how your recruitment firm actually operates — not how it's supposed to on paper. We map your full workflow, identify which tools you're using (and which ones are creating friction), and pinpoint the exact points where time, candidates, or placements are slipping through the cracks. No assumptions. No generic templates.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12h3.75M9 15h3.75M9 18h3.75m3 .75H18a2.25 2.25 0 002.25-2.25V6.108c0-1.135-.845-2.098-1.976-2.192a48.424 48.424 0 00-1.123-.08m-5.801 0c-.065.21-.1.433-.1.664 0 .414.336.75.75.75h4.5a.75.75 0 00.75-.75 2.25 2.25 0 00-.1-.664m-5.8 0A2.251 2.251 0 0113.5 2.25H15c1.012 0 1.867.668 2.15 1.586m-5.8 0c-.376.023-.75.05-1.124.08C9.095 4.01 8.25 4.973 8.25 6.108V8.25m0 0H4.875c-.621 0-1.125.504-1.125 1.125v11.25c0 .621.504 1.125 1.125 1.125h9.75c.621 0 1.125-.504 1.125-1.125V9.375c0-.621-.504-1.125-1.125-1.125H8.25zM6.75 12h.008v.008H6.75V12zm0 3h.008v.008H6.75V15zm0 3h.008v.008H6.75V18z" />
      </svg>
    ),
  },
  {
    n: "02",
    title: "Solution Design",
    desc: "Based on what we learn, we design a tailored solution — the right combination of automations, AI agents, and integrations that fits your existing stack. We don't rip out what's working. We build around it, connect what's disconnected, and design workflows that remove the manual steps your team shouldn't be doing in the first place.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9.594 3.94c.09-.542.56-.94 1.11-.94h2.593c.55 0 1.02.398 1.11.94l.213 1.281c.063.374.313.686.645.87.074.04.147.083.22.127.324.196.72.257 1.075.124l1.217-.456a1.125 1.125 0 011.37.49l1.296 2.247a1.125 1.125 0 01-.26 1.431l-1.003.827c-.293.24-.438.613-.431.992a6.759 6.759 0 010 .255c-.007.378.138.75.43.99l1.005.828c.424.35.534.954.26 1.43l-1.298 2.247a1.125 1.125 0 01-1.369.491l-1.217-.456c-.355-.133-.75-.072-1.076.124a6.57 6.57 0 01-.22.128c-.331.183-.581.495-.644.869l-.213 1.28c-.09.543-.56.941-1.11.941h-2.594c-.55 0-1.02-.398-1.11-.94l-.213-1.281c-.062-.374-.312-.686-.644-.87a6.52 6.52 0 01-.22-.127c-.325-.196-.72-.257-1.076-.124l-1.217.456a1.125 1.125 0 01-1.369-.49l-1.297-2.247a1.125 1.125 0 01.26-1.431l1.004-.827c.292-.24.437-.613.43-.992a6.932 6.932 0 010-.255c.007-.378-.138-.75-.43-.99l-1.004-.828a1.125 1.125 0 01-.26-1.43l1.297-2.247a1.125 1.125 0 011.37-.491l1.216.456c.356.133.751.072 1.076-.124.072-.044.146-.087.22-.128.332-.183.582-.495.644-.869l.214-1.281z" />
        <path strokeLinecap="round" strokeLinejoin="round" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
      </svg>
    ),
  },
  {
    n: "03",
    title: "Build & Integration",
    desc: "We build everything and connect it directly into your existing tools — your ATS, CRM, outreach platforms, calendar, whatever you're running. No disruption to your team's current setup. We handle the technical side entirely: building the automations, deploying the AI agents, and making sure everything runs reliably before the testing period begins.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M14.25 9.75L16.5 12l-2.25 2.25m-4.5 0L7.5 12l2.25-2.25M6 20.25h12A2.25 2.25 0 0020.25 18V6A2.25 2.25 0 0018 3.75H6A2.25 2.25 0 003.75 6v12A2.25 2.25 0 006 20.25z" />
      </svg>
    ),
  },
  {
    n: "04",
    title: "30-Day Free Testing Period",
    desc: "You run with the full solution for 30 days at zero cost. This is real-world testing inside your actual operations — not a demo environment. We stay close throughout: monitoring performance, making adjustments, and measuring the impact against the specific problems we identified in Step 1.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M6.75 3v2.25M17.25 3v2.25M3 18.75V7.5a2.25 2.25 0 012.25-2.25h13.5A2.25 2.25 0 0121 7.5v11.25m-18 0A2.25 2.25 0 005.25 21h13.5A2.25 2.25 0 0021 18.75m-18 0v-7.5A2.25 2.25 0 015.25 9h13.5A2.25 2.25 0 0121 11.25v7.5" />
      </svg>
    ),
  },
  {
    n: "05",
    title: "Your Decision — No Pressure, No Obligation",
    desc: "After 30 days, the choice is entirely yours. If the solution saved your team meaningful time, reduced admin overhead, or improved your pipeline quality — we continue on a monthly retainer. If it didn't deliver real value, you pay nothing. The automations and AI agents are switched off and we part on good terms. No contracts, no pressure, no risk.",
    icon: (
      <svg className="w-6 h-6" fill="none" stroke="currentColor" strokeWidth={1.5} viewBox="0 0 24 24">
        <path strokeLinecap="round" strokeLinejoin="round" d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
      </svg>
    ),
  },
];

function StepCard({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  return (
    <motion.div
      ref={ref}
      initial={{ opacity: 0, y: 32 }}
      animate={inView ? { opacity: 1, y: 0 } : {}}
      transition={{ duration: 0.55, delay: index * 0.08 }}
      className="relative grid sm:grid-cols-[auto_1fr] gap-6 items-start"
    >
      {/* Left: number + line */}
      <div className="flex flex-col items-center">
        <div className="w-12 h-12 rounded-xl flex items-center justify-center shrink-0"
          style={{ background: "rgba(14,116,144,0.12)", border: "1px solid rgba(14,116,144,0.25)" }}>
          <span style={{ color: "#06B6D4" }}>{step.icon}</span>
        </div>
        {index < steps.length - 1 && (
          <div className="w-px flex-1 mt-4" style={{ background: "rgba(14,116,144,0.15)", minHeight: 40 }} />
        )}
      </div>
      {/* Right: content */}
      <div className="pb-12">
        <span className="text-xs font-semibold uppercase tracking-widest mb-2 block" style={{ color: "#06B6D4" }}>
          Step {step.n}
        </span>
        <h3 className="text-xl sm:text-2xl font-display font-bold text-slate-900 mb-3 leading-snug">
          {step.title}
        </h3>
        <p className="text-slate-500 leading-relaxed">{step.desc}</p>
      </div>
    </motion.div>
  );
}

export default function PilotPage() {
  return (
    <SiteLayout>
      {/* Hero — dark */}
      <section className="relative overflow-hidden bg-[#071C2E] pt-40 pb-28 px-6">
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 80% 60% at 50% 0%, rgba(14,116,144,0.4) 0%, transparent 65%)" }} />
        <div className="pointer-events-none absolute bottom-0 left-0 right-0 h-32"
          style={{ background: "linear-gradient(to bottom, transparent, #071C2E)" }} />

        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.7 }}
          className="relative max-w-4xl mx-auto text-center"
        >
          <span className="inline-block mb-6 px-4 py-1.5 rounded-full text-xs font-semibold tracking-widest uppercase border"
            style={{ background: "rgba(14,116,144,0.15)", borderColor: "rgba(6,182,212,0.3)", color: "#67E8F9" }}>
            Limited Availability — Pilot Programme
          </span>
          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-white mb-6 leading-tight">
            Work with us for 30 days.{" "}
            <span className="gradient-text font-serif-accent">Pay nothing unless it works.</span>
          </h1>
          <p className="text-lg sm:text-xl text-white/60 max-w-2xl mx-auto leading-relaxed mb-10">
            HireNove is offering a small number of recruitment firms a free one-month pilot. You get a fully built, integrated workflow solution. We get real experience building it. Zero financial risk on your side.
          </p>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("openPilot"))}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 shadow-lg"
            style={{ background: "#0E7490" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#0891B2")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0E7490")}
          >
            Apply for the Pilot
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
            No commitment required. We'll follow up within 48 hours.
          </p>
        </motion.div>
      </section>

      {/* Why we're doing this */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-4xl mx-auto">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#0E7490" }}>
              Why we're doing this
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-8 leading-tight">
              Honest about where we are.{" "}
              <span className="gradient-text-static font-serif-accent">Serious about what we build.</span>
            </h2>
            <div className="grid sm:grid-cols-2 gap-8 text-slate-500 leading-relaxed">
              <div className="space-y-4">
                <p>
                  HireNove is a new consultancy. Rather than making promises based on credentials alone, I want to earn your trust the harder way — by actually solving a real problem inside your business, at my risk, not yours.
                </p>
                <p>
                  The Pilot Programme exists because I believe the best way to learn how recruitment operations work in practice is to be inside one. Every firm runs differently. Every stack is different. Every team has different pressure points.
                </p>
              </div>
              <div className="space-y-4">
                <p>
                  By working with a small number of firms at no cost, I get the hands-on experience of building solutions that run in real environments — not test scenarios. You get a functioning workflow improvement without any financial exposure.
                </p>
                <p>
                  If it works, we continue together. If it doesn't, you walk away with nothing owed. That's the deal. Simple, transparent, and fair to both sides.
                </p>
              </div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* What's included callout — dark */}
      <section className="relative overflow-hidden py-16 px-6" style={{ background: "#071C2E" }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 60% 80% at 80% 50%, rgba(14,116,144,0.2) 0%, transparent 70%)" }} />
        <div className="relative max-w-4xl mx-auto">
          <div className="grid sm:grid-cols-3 gap-6">
            {[
              { label: "Fully custom", desc: "Built for your specific workflow — not a template dropped into your stack." },
              { label: "Fully integrated", desc: "Connected into your existing ATS, CRM, and outreach tools. No new platforms to learn." },
              { label: "Zero cost to start", desc: "30 days of a live, working solution with no invoice unless you choose to continue." },
            ].map((item, i) => (
              <motion.div key={i} initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }} transition={{ duration: 0.5, delay: i * 0.1 }}
                className="rounded-2xl p-6" style={{ background: "rgba(255,255,255,0.04)", border: "1px solid rgba(255,255,255,0.08)" }}>
                <div className="w-2 h-2 rounded-full mb-4" style={{ background: "#06B6D4" }} />
                <p className="text-white font-semibold mb-2">{item.label}</p>
                <p className="text-sm leading-relaxed" style={{ color: "rgba(255,255,255,0.5)" }}>{item.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* How it works — steps */}
      <section className="bg-white py-24 px-6">
        <div className="max-w-3xl mx-auto">
          <motion.div initial={{ opacity: 0, y: 20 }} whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }} transition={{ duration: 0.6 }} className="mb-16">
            <p className="text-xs font-semibold uppercase tracking-widest mb-3" style={{ color: "#0E7490" }}>
              How it works
            </p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight">
              Five steps from first call{" "}
              <span className="gradient-text-static font-serif-accent">to working solution.</span>
            </h2>
          </motion.div>

          <div>
            {steps.map((step, i) => (
              <StepCard key={step.n} step={step} index={i} />
            ))}
          </div>
        </div>
      </section>

      {/* Final CTA — dark */}
      <section className="relative overflow-hidden py-28 px-6" style={{ background: "#071C2E" }}>
        <div className="pointer-events-none absolute inset-0"
          style={{ background: "radial-gradient(ellipse 70% 60% at 50% 50%, rgba(14,116,144,0.35) 0%, transparent 70%)" }} />
        <motion.div initial={{ opacity: 0, y: 24 }} whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }} transition={{ duration: 0.6 }}
          className="relative max-w-2xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-white mb-5 leading-tight">
            Ready to see what's possible?
          </h2>
          <p className="text-lg mb-8 leading-relaxed" style={{ color: "rgba(255,255,255,0.55)" }}>
            We're taking on a limited number of pilot firms. Fill in a short form and we'll be in touch within 48 hours to see if it's the right fit.
          </p>
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("openPilot"))}
            className="inline-flex items-center gap-2 px-8 py-4 rounded-xl text-white font-semibold text-base transition-all duration-200 shadow-lg"
            style={{ background: "#0E7490" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#0891B2")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0E7490")}
          >
            Apply for the Pilot
            <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M17 8l4 4m0 0l-4 4m4-4H3" />
            </svg>
          </button>
          <p className="mt-4 text-sm" style={{ color: "rgba(255,255,255,0.25)" }}>
            Limited spots. No commitment. Response within 48 hours.
          </p>
        </motion.div>
      </section>
    </SiteLayout>
  );
}
