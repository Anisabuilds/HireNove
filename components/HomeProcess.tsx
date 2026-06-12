"use client";
import { useRef } from "react";
import { motion, useScroll, useTransform, MotionValue } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Understand Your Workflow",
    desc: "We map how work actually flows — not how it's documented, but how it genuinely operates day to day. No assumptions.",
    color: "#0E7490",
  },
  {
    n: "02",
    title: "Identify Bottlenecks",
    desc: "Every friction point ranked by impact. We find exactly where time is lost before designing anything.",
    color: "#0891B2",
  },
  {
    n: "03",
    title: "Design & Implement",
    desc: "A tailored solution built around your existing tools — never a template. We stay until it's fully embedded.",
    color: "#06B6D4",
  },
  {
    n: "04",
    title: "Ongoing Maintenance & Updates",
    desc: "Processes evolve. We stay on hand for bug fixes, improvements, and new automations as your team grows.",
    color: "#0E7490",
  },
];

const N = steps.length;

function Step({
  step,
  index,
  scrollYProgress,
}: {
  step: (typeof steps)[0];
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / N;
  const end = (index + 1) / N;
  const mid = (start + end) / 2;
  const fadeEnd = end - 0.02;

  const opacity = useTransform(
    scrollYProgress,
    [start, start + 0.08, fadeEnd, end],
    [0, 1, 1, 0]
  );
  const y = useTransform(scrollYProgress, [start, start + 0.1], [50, 0]);
  const numOpacity = useTransform(
    scrollYProgress,
    [start, start + 0.06, fadeEnd, end],
    [0, 0.13, 0.13, 0]
  );
  const numScale = useTransform(scrollYProgress, [start, start + 0.1], [0.75, 1]);

  return (
    <motion.div
      style={{ opacity }}
      className="absolute inset-0 flex flex-col items-center justify-center px-6 text-center pointer-events-none"
    >
      {/* Giant background number */}
      <motion.p
        style={{ opacity: numOpacity, scale: numScale }}
        className="font-display font-bold leading-none select-none absolute"
        aria-hidden
        // inline style for fontSize since it's huge
      >
        <span
          style={{
            fontSize: "clamp(8rem, 28vw, 22rem)",
            lineHeight: 1,
            color: step.color,
            display: "block",
          }}
        >
          {step.n}
        </span>
      </motion.p>

      {/* Text content */}
      <motion.div style={{ y }} className="relative z-10 mt-8">
        <p
          className="text-xs font-semibold uppercase tracking-widest mb-4"
          style={{ color: step.color }}
        >
          Step {step.n}
        </p>
        <h3 className="text-4xl sm:text-5xl font-display font-bold text-slate-900 mb-5 max-w-2xl leading-tight">
          {step.title}
        </h3>
        <p className="text-slate-500 text-lg max-w-lg mx-auto leading-relaxed">
          {step.desc}
        </p>
      </motion.div>
    </motion.div>
  );
}

function Dot({
  index,
  scrollYProgress,
}: {
  index: number;
  scrollYProgress: MotionValue<number>;
}) {
  const start = index / N;
  const end = (index + 1) / N;

  const bg = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [
    "#CBD5E1", "#0E7490", "#0E7490", "#CBD5E1",
  ]);
  const width = useTransform(scrollYProgress, [start, start + 0.05, end - 0.05, end], [
    6, 24, 24, 6,
  ]);

  return (
    <motion.div
      style={{ width, height: 6, backgroundColor: bg, borderRadius: 999 }}
    />
  );
}

export default function HomeProcess() {
  const containerRef = useRef<HTMLDivElement>(null);
  const { scrollYProgress } = useScroll({
    target: containerRef,
    offset: ["start start", "end end"],
  });

  return (
    <section
      ref={containerRef}
      style={{ height: `${N * 100}vh` }}
      className="relative bg-white"
    >
      <div className="sticky top-0 h-screen overflow-hidden">
        {/* Label */}
        <div className="absolute top-8 left-0 right-0 flex justify-center z-10">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 select-none">
            Our Approach
          </p>
        </div>

        {/* Steps */}
        {steps.map((step, i) => (
          <Step key={step.n} step={step} index={i} scrollYProgress={scrollYProgress} />
        ))}

        {/* Dot indicators */}
        <div className="absolute bottom-10 left-0 right-0 flex justify-center items-center gap-2 z-10">
          {steps.map((_, i) => (
            <Dot key={i} index={i} scrollYProgress={scrollYProgress} />
          ))}
        </div>

        {/* Full process link */}
        <div className="absolute bottom-9 right-8 z-10">
          <Link
            href="/services"
            className="inline-flex items-center gap-1.5 text-sm font-semibold text-violet-600 hover:text-violet-500 transition-colors"
          >
            Full process <ArrowRight size={14} />
          </Link>
        </div>
      </div>
    </section>
  );
}
