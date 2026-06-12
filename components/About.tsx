"use client";
import { motion, useInView } from "framer-motion";
import Image from "next/image";
import { useRef } from "react";

export default function About() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });

  return (
    <section id="about" className="py-28 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        <div className="grid lg:grid-cols-2 gap-16 items-center">
          {/* Photo */}
          <motion.div
            initial={{ opacity: 0, scale: 0.92 }}
            animate={inView ? { opacity: 1, scale: 1 } : {}}
            transition={{ duration: 0.7 }}
            className="flex justify-center lg:justify-start"
          >
            <div className="relative">
              {/* Glow ring */}
              <div
                className="absolute inset-0 rounded-full pointer-events-none"
                style={{
                  background: "radial-gradient(circle, rgba(6,182,212,0.15) 0%, transparent 70%)",
                  filter: "blur(30px)",
                  transform: "scale(1.2)",
                }}
              />
              {/* Photo */}
              <div
                className="relative w-56 h-56 sm:w-64 sm:h-64 rounded-full overflow-hidden float-anim"
                style={{ border: "2px solid rgba(6,182,212,0.15)" }}
              >
                <Image
                  src="/founder.png"
                  alt="Anisa Leci, Founder of HireNove"
                  fill
                  className="object-cover"
                />
              </div>
              {/* Name badge */}
              <motion.div
                initial={{ opacity: 0, y: 12 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5, delay: 0.4 }}
                className="absolute -bottom-4 left-1/2 -translate-x-1/2 bg-white rounded-2xl px-5 py-3 text-center whitespace-nowrap shadow-md"
                style={{ border: "1px solid rgba(0,0,0,0.08)" }}
              >
                <p className="font-display font-semibold text-slate-900 text-sm">Anisa Leci</p>
                <p className="text-violet-600 text-xs font-medium">Founder, HireNove</p>
              </motion.div>
            </div>
          </motion.div>

          {/* Copy */}
          <motion.div
            initial={{ opacity: 0, x: 32 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.7, delay: 0.15 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">About</p>
            <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-6 leading-tight">
              Built on curiosity about how work actually gets done.
            </h2>
            <div className="space-y-4 text-slate-500 leading-relaxed">
              <p>
                I founded HireNove because I kept seeing the same pattern: recruitment teams investing in tools, training, and
                people — while still losing hours every week to processes that shouldn't require human attention.
              </p>
              <p>
                The bottlenecks were rarely obvious. They were embedded in the daily rhythm — the manual copy-paste between
                systems, the follow-up that depended on someone remembering, the report that took 45 minutes to compile every
                Friday morning. Individually small. Collectively, significant.
              </p>
              <p>
                My focus is understanding how recruitment teams actually operate — not how their processes are documented,
                but how work genuinely flows through their day. From that understanding, I design and implement practical
                improvements that reduce friction and give recruiters more time for the work that drives real outcomes.
              </p>
              <p className="text-slate-700 font-medium">
                HireNove is deliberately founder-led. I work directly with each client, and every solution is built around
                their specific context — not adapted from a template.
              </p>
            </div>
            <div className="flex flex-col sm:flex-row gap-4 mt-8">
              <button
                onClick={() => document.dispatchEvent(new CustomEvent("openDiscovery"))}
                className="inline-flex items-center justify-center px-6 py-3.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md"
              >
                Work with HireNove
              </button>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-2 px-6 py-3.5 rounded-xl text-slate-600 hover:text-slate-900 text-sm font-medium transition-all duration-200 bg-slate-50 border border-black/10 hover:border-violet-200"
              >
                <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                Connect on LinkedIn
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </section>
  );
}
