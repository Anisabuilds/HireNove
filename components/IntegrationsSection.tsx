"use client";
import { motion, useInView, AnimatePresence } from "framer-motion";
import { useRef, useState } from "react";
import Image from "next/image";
import { Info } from "lucide-react";

const DISCLAIMER = `Disclaimer: HireNove is an independent workflow optimization and automation service provider. All product names, logos, brands, and trademarks displayed on this website (including OpenAI, Claude, n8n, Zapier, Make, Airtable, Notion, Slack, LinkedIn, Calendly, Greenhouse, Bullhorn, Ashby, Lever, Loxo, Gem, Juicebox, and Kaspr) are property of their respective owners. Their use on this site is for identification and compatibility purposes only and does not imply any official affiliation, endorsement, or sponsorship by the trademark holders.`;

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

type Tool = { name: string; icon?: string };

const automationTools: Tool[] = [
  { name: "Claude",   icon: "https://cdn.simpleicons.org/anthropic" },
  { name: "n8n",      icon: "https://cdn.simpleicons.org/n8n" },
  { name: "Zapier",   icon: "https://cdn.simpleicons.org/zapier" },
  { name: "Make",     icon: "https://cdn.simpleicons.org/make" },
  { name: "Airtable", icon: "https://cdn.simpleicons.org/airtable" },
];

const recruitmentTools: Tool[] = [
  { name: "LinkedIn",   icon: "https://cdn.simpleicons.org/linkedin" },
  { name: "Calendly",   icon: "https://cdn.simpleicons.org/calendly" },
  { name: "Greenhouse" },
  { name: "Bullhorn" },
  { name: "Ashby" },
  { name: "Lever" },
  { name: "Loxo" },
  { name: "Gem" },
  { name: "Juicebox" },
  { name: "Kaspr" },
];

function ToolPill({ tool }: { tool: Tool }) {
  return (
    <div className="flex items-center gap-2.5 px-4 py-2.5 bg-white rounded-xl border border-black/8 shadow-sm mx-2 shrink-0">
      {tool.icon && (
        <Image
          src={tool.icon}
          alt={tool.name}
          width={16}
          height={16}
          className="shrink-0"
          unoptimized
        />
      )}
      <span className="text-sm font-medium text-slate-600 whitespace-nowrap">{tool.name}</span>
    </div>
  );
}

function MarqueeRow({ tools, reverse = false }: { tools: Tool[]; reverse?: boolean }) {
  const repeated = [...tools, ...tools, ...tools];
  return (
    <div className="overflow-hidden w-full">
      <div
        className="flex"
        style={{
          animation: `marquee${reverse ? "Reverse" : ""} 30s linear infinite`,
          width: "max-content",
        }}
      >
        {repeated.map((tool, i) => (
          <ToolPill key={`${tool.name}-${i}`} tool={tool} />
        ))}
      </div>
    </div>
  );
}

export default function IntegrationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white overflow-hidden" ref={ref}>
      <style>{`
        @keyframes marquee {
          0% { transform: translateX(0); }
          100% { transform: translateX(-33.333%); }
        }
        @keyframes marqueeReverse {
          0% { transform: translateX(-33.333%); }
          100% { transform: translateX(0); }
        }
      `}</style>

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
      </div>

      {/* Marquee bands */}
      <motion.div
        initial={{ opacity: 0, y: 16 }}
        animate={inView ? { opacity: 1, y: 0 } : {}}
        transition={{ duration: 0.5, delay: 0.2 }}
        className="space-y-4"
      >
        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 px-6 max-w-7xl mx-auto">
            Automation & AI stack
          </p>
          <MarqueeRow tools={automationTools} />
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4 px-6 max-w-7xl mx-auto">
            Recruitment platforms
          </p>
          <MarqueeRow tools={recruitmentTools} reverse />
        </div>
      </motion.div>

      {/* Note */}
      <div className="max-w-7xl mx-auto px-6">
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-slate-400 text-xs mt-10"
        >
          Don't see your platform?{" "}
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("openDiscovery"))}
            className="text-[#0E7490] hover:text-[#0891B2] transition-colors font-medium"
          >
            Tell us what you're working with →
          </button>
        </motion.p>
      </div>
    </section>
  );
}
