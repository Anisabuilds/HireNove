"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  { n: "01", title: "Understand Your Workflow", desc: "We map how work actually flows — not how it's documented, but how it genuinely operates day to day." },
  { n: "02", title: "Identify Bottlenecks",     desc: "Every point of friction ranked by impact. We find where time is lost before designing anything." },
  { n: "03", title: "Design & Implement",        desc: "A tailored solution built around your existing tools — never a template. We stay until it's embedded." },
];

export default function HomeProcess() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="flex flex-col sm:flex-row sm:items-end justify-between gap-6 mb-12"
        >
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">Our Approach</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 leading-tight max-w-xl">
              We start with the problem.{" "}
              <span className="gradient-text-static font-serif-accent">Not the software.</span>
            </h2>
          </div>
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-500 transition-colors shrink-0"
          >
            Full process <ArrowRight size={14} />
          </Link>
        </motion.div>

        <div className="grid sm:grid-cols-3 gap-4">
          {steps.map((step, i) => (
            <motion.div
              key={step.n}
              initial={{ opacity: 0, y: 20 }}
              animate={inView ? { opacity: 1, y: 0 } : {}}
              transition={{ duration: 0.5, delay: i * 0.1 }}
              className="rounded-2xl p-6 border border-black/7 bg-white hover:border-violet-200 hover:shadow-sm transition-all duration-300"
            >
              <span className="text-4xl font-display font-bold text-black/8 block mb-4 leading-none">{step.n}</span>
              <h3 className="font-display font-semibold text-slate-900 mb-2 text-[15px]">{step.title}</h3>
              <p className="text-slate-400 text-sm leading-relaxed">{step.desc}</p>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
