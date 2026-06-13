"use client";
import { motion, AnimatePresence, useInView } from "framer-motion";
import { useRef, useState, useEffect } from "react";
import Image from "next/image";
import { Info } from "lucide-react";

const DISCLAIMER = `Disclaimer: HireNove is an independent workflow optimization and automation service provider. All product names, logos, brands, and trademarks displayed on this website (including Claude, n8n, Zapier, and Make) are property of their respective owners. Their use on this site is for identification and compatibility purposes only and does not imply any official affiliation, endorsement, or sponsorship by the trademark holders.`;

const tools = [
  { name: "Claude",      icon: "https://cdn.simpleicons.org/anthropic" },
  { name: "Claude Code", icon: "https://cdn.simpleicons.org/anthropic" },
  { name: "n8n",         icon: "https://cdn.simpleicons.org/n8n" },
  { name: "Zapier",      icon: "https://cdn.simpleicons.org/zapier" },
  { name: "Make",        icon: "https://cdn.simpleicons.org/make" },
];

function DisclaimerIcon() {
  const [open, setOpen] = useState(false);
  return (
    <span className="relative inline-flex items-center ml-2">
      <button
        onClick={() => setOpen((v) => !v)}
        className="text-slate-400 hover:text-slate-600 transition-colors"
        aria-label="Trademark disclaimer"
      >
        <Info size={13} />
      </button>
      <AnimatePresence>
        {open && (
          <>
            <div className="fixed inset-0 z-40" onClick={() => setOpen(false)} />
            <motion.div
              initial={{ opacity: 0, y: 6 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: 6 }}
              transition={{ duration: 0.15 }}
              className="absolute left-0 top-6 z-50 w-80 bg-white border border-black/10 rounded-xl shadow-lg p-4 text-[11px] font-light text-slate-400 leading-relaxed tracking-wide"
            >
              {DISCLAIMER}
            </motion.div>
          </>
        )}
      </AnimatePresence>
    </span>
  );
}

function mod(n: number, m: number) {
  return ((n % m) + m) % m;
}

export default function IntegrationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [active, setActive] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setActive((prev) => mod(prev + 1, tools.length));
    }, 2000);
    return () => clearInterval(interval);
  }, []);

  const positions = [-2, -1, 0, 1, 2];

  return (
    <section className="py-24 bg-white overflow-hidden" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3 flex items-center">
            Integrations<DisclaimerIcon />
          </p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 max-w-2xl leading-tight">
            Built on tools you already know.{" "}
            <span className="gradient-text-static font-serif-accent">Connected around you.</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl leading-relaxed">
            We work inside your existing stack — connecting the platforms your team already uses, not replacing them.
          </p>
        </motion.div>

        {/* Spotlight carousel */}
        <motion.div
          initial={{ opacity: 0, y: 16 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 0.2 }}
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-6">
            Automation & AI stack
          </p>

          <div
            className="relative rounded-2xl overflow-hidden flex items-center justify-center"
            style={{ background: "#F3EDE5", height: 160 }}
          >
            {/* edge fades */}
            <div className="absolute inset-y-0 left-0 w-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to right, #F3EDE5, transparent)" }} />
            <div className="absolute inset-y-0 right-0 w-32 z-10 pointer-events-none"
              style={{ background: "linear-gradient(to left, #F3EDE5, transparent)" }} />

            <div className="relative flex items-center justify-center w-full" style={{ height: 160 }}>
              {positions.map((offset) => {
                const index = mod(active + offset, tools.length);
                const tool = tools[index];
                const isCenter = offset === 0;
                const absOffset = Math.abs(offset);
                const scale = isCenter ? 1 : absOffset === 1 ? 0.65 : 0.4;
                const opacity = isCenter ? 1 : absOffset === 1 ? 0.5 : 0.2;
                const xPercent = offset * 140;

                return (
                  <motion.div
                    key={`${index}-${offset}`}
                    animate={{ x: `${xPercent}px`, scale, opacity }}
                    transition={{ duration: 0.5, ease: "easeInOut" }}
                    className="absolute flex flex-col items-center gap-3"
                  >
                    <div
                      className="rounded-xl flex items-center justify-center"
                      style={{
                        width: isCenter ? 56 : absOffset === 1 ? 36 : 24,
                        height: isCenter ? 56 : absOffset === 1 ? 36 : 24,
                        background: "rgba(0,0,0,0.06)",
                      }}
                    >
                      <Image
                        src={tool.icon}
                        alt={tool.name}
                        width={isCenter ? 30 : absOffset === 1 ? 20 : 14}
                        height={isCenter ? 30 : absOffset === 1 ? 20 : 14}
                        unoptimized
                      />
                    </div>
                    {isCenter && (
                      <span className="text-slate-700 text-sm font-medium tracking-wide">
                        {tool.name}
                      </span>
                    )}
                  </motion.div>
                );
              })}
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
