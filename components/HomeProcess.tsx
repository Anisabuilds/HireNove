"use client";
import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import Link from "next/link";
import { ArrowRight } from "lucide-react";

const steps = [
  {
    n: "01",
    title: "Understand Your Workflow",
    desc: "Every recruitment firm operates differently. We start with a discovery call to understand how your team works, which systems and tools you use, and where operational challenges exist within the recruitment process. By speaking directly with the people involved, we gain insight into the workflows, bottlenecks, and repetitive tasks that affect productivity and performance. This ensures that any recommendations are based on the realities of your business — not assumptions.",
    color: "#0E7490",
    align: "left",
  },
  {
    n: "02",
    title: "Identify Bottlenecks",
    desc: "We analyse your workflows to identify the bottlenecks, repetitive tasks, and process inefficiencies that have the greatest impact on your team. By understanding where time is lost and where operational friction occurs, we can prioritise the areas that matter most — before designing anything.",
    color: "#0891B2",
    align: "right",
  },
  {
    n: "03",
    title: "Design & Implement",
    desc: "Based on what we learn during the discovery process, we put together a plan for improving the way work flows through your business. We then present our recommendations and provide a proposal outlining the work involved and the next steps. Once approved, we begin implementing the agreed improvements — whether that involves workflow changes, system integrations, automation, or process improvements.",
    color: "#06B6D4",
    align: "left",
  },
  {
    n: "04",
    title: "Ongoing Maintenance & Updates",
    desc: "Our work doesn't end after implementation. We continue to support your team by resolving issues, making adjustments where needed, and identifying further opportunities for improvement as your business evolves. This ensures the solution remains effective and continues to support your team's day-to-day operations over time.",
    color: "#0E7490",
    align: "right",
  },
];

function StepRow({ step, index }: { step: typeof steps[0]; index: number }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-100px" });
  const isRight = step.align === "right";

  return (
    <div ref={ref} className="relative min-h-[55vh] flex items-center overflow-hidden">
      {/* Giant background number */}
      <motion.p
        initial={{ opacity: 0, x: isRight ? 80 : -80 }}
        animate={inView ? { opacity: 0.06, x: isRight ? 40 : -40 } : {}}
        transition={{ duration: 0.9, ease: "easeOut" }}
        aria-hidden
        className="pointer-events-none select-none absolute font-display font-bold leading-none"
        style={{
          fontSize: "clamp(10rem, 30vw, 26rem)",
          color: step.color,
          right: isRight ? "-2vw" : "auto",
          left: isRight ? "auto" : "-2vw",
          top: "50%",
          transform: "translateY(-50%)",
          lineHeight: 0.85,
        }}
      >
        {step.n}
      </motion.p>

      {/* Vertical connector line */}
      {index < steps.length - 1 && (
        <motion.div
          initial={{ scaleY: 0 }}
          animate={inView ? { scaleY: 1 } : {}}
          transition={{ duration: 0.6, delay: 0.3 }}
          className="absolute left-1/2 -translate-x-1/2 bottom-0 origin-top"
          style={{ width: 1, height: "40%", background: "rgba(14,116,144,0.15)" }}
        />
      )}

      {/* Content */}
      <div className="w-full py-16 px-8">
        <div className={`max-w-2xl ${isRight ? "ml-auto text-right pr-4 lg:pr-16" : "text-left pl-4 lg:pl-16"}`}>
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
          >
            <span
              className="inline-block text-xs font-semibold uppercase tracking-widest mb-3"
              style={{ color: step.color }}
            >
              Step {step.n}
            </span>
            <h3 className="text-4xl sm:text-5xl lg:text-6xl font-display font-bold text-slate-900 leading-tight mb-5">
              {step.title}
            </h3>
            <p className="text-slate-500 text-lg leading-relaxed">
              {step.desc}
            </p>

            {/* Active dot accent */}
            <motion.div
              initial={{ scaleX: 0 }}
              animate={inView ? { scaleX: 1 } : {}}
              transition={{ duration: 0.5, delay: 0.35 }}
              className={`mt-8 h-0.5 w-16 rounded-full origin-left ${isRight ? "ml-auto origin-right" : ""}`}
              style={{ background: step.color }}
            />
          </motion.div>
        </div>
      </div>
    </div>
  );
}

export default function HomeProcess({ hideHeader = false }: { hideHeader?: boolean }) {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-60px" });

  return (
    <section className="bg-white py-16 overflow-hidden">
      {/* Header */}
      {!hideHeader && (
        <div className="max-w-7xl mx-auto px-6 mb-4" ref={ref}>
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.6 }}
            className="flex flex-col sm:flex-row sm:items-end justify-between gap-4"
          >
            <div>
              <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">
                Our Approach
              </p>
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
        </div>
      )}

      {/* Steps */}
      {steps.map((step, i) => (
        <StepRow key={step.n} step={step} index={i} />
      ))}
    </section>
  );
}
