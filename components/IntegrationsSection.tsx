"use client";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Image from "next/image";

type Tool = { name: string; icon?: string };

const automationTools: Tool[] = [
  { name: "OpenAI",   icon: "https://cdn.simpleicons.org/openai/5B21B6" },
  { name: "Claude",   icon: "https://cdn.simpleicons.org/anthropic/5B21B6" },
  { name: "n8n",      icon: "https://cdn.simpleicons.org/n8n/5B21B6" },
  { name: "Zapier",   icon: "https://cdn.simpleicons.org/zapier/5B21B6" },
  { name: "Make",     icon: "https://cdn.simpleicons.org/make/5B21B6" },
  { name: "Airtable", icon: "https://cdn.simpleicons.org/airtable/5B21B6" },
  { name: "Notion",   icon: "https://cdn.simpleicons.org/notion/5B21B6" },
  { name: "Slack",    icon: "https://cdn.simpleicons.org/slack/5B21B6" },
];

const recruitmentTools: Tool[] = [
  { name: "LinkedIn",   icon: "https://cdn.simpleicons.org/linkedin/5B21B6" },
  { name: "Calendly",  icon: "https://cdn.simpleicons.org/calendly/5B21B6" },
  { name: "Greenhouse" },
  { name: "Bullhorn" },
  { name: "Ashby" },
  { name: "Lever" },
  { name: "Loxo" },
  { name: "Gem" },
  { name: "Juicebox" },
  { name: "Kaspr" },
];

function ToolPill({ tool, delay }: { tool: Tool; delay: number }) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true }}
      transition={{ duration: 0.3, delay }}
      className="flex items-center gap-2 px-3.5 py-2 bg-white rounded-lg border border-black/8 shadow-sm hover:border-violet-200 hover:shadow-md transition-all duration-200 cursor-default"
    >
      {tool.icon && (
        <Image
          src={tool.icon}
          alt={tool.name}
          width={14}
          height={14}
          className="shrink-0 opacity-80"
          unoptimized
        />
      )}
      <span className="text-xs font-medium text-slate-600 whitespace-nowrap">{tool.name}</span>
    </motion.div>
  );
}

export default function IntegrationsSection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });

  return (
    <section className="py-24 bg-white" ref={ref}>
      <div className="max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="mb-14"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">Integrations</p>
          <h2 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 max-w-2xl leading-tight">
            Built on tools you already know.{" "}
            <span className="gradient-text-static font-serif-accent">Connected around you.</span>
          </h2>
          <p className="text-slate-500 text-base max-w-xl leading-relaxed">
            We work inside your existing stack — connecting the platforms your team already uses, not replacing them.
          </p>
        </motion.div>

        <div className="space-y-10">
          {/* Automation stack */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.1 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Automation & AI stack
            </p>
            <div className="flex flex-wrap gap-2">
              {automationTools.map((tool, i) => (
                <ToolPill key={tool.name} tool={tool} delay={0.15 + i * 0.04} />
              ))}
            </div>
          </motion.div>

          {/* Divider */}
          <div className="border-t border-black/6" />

          {/* Recruitment platforms */}
          <motion.div
            initial={{ opacity: 0, y: 16 }}
            animate={inView ? { opacity: 1, y: 0 } : {}}
            transition={{ duration: 0.5, delay: 0.25 }}
          >
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-400 mb-4">
              Recruitment platforms
            </p>
            <div className="flex flex-wrap gap-2">
              {recruitmentTools.map((tool, i) => (
                <ToolPill key={tool.name} tool={tool} delay={0.3 + i * 0.04} />
              ))}
            </div>
          </motion.div>
        </div>

        {/* Note */}
        <motion.p
          initial={{ opacity: 0 }}
          animate={inView ? { opacity: 1 } : {}}
          transition={{ duration: 0.5, delay: 0.6 }}
          className="text-slate-400 text-xs mt-10"
        >
          Don't see your platform?{" "}
          <button
            onClick={() => document.dispatchEvent(new CustomEvent("openDiscovery"))}
            className="text-violet-600 hover:text-violet-500 transition-colors font-medium"
          >
            Tell us what you're working with →
          </button>
        </motion.p>
      </div>
    </section>
  );
}
