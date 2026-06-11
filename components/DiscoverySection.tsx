"use client";
import { motion, useInView } from "framer-motion";
import { useRef, useState } from "react";
import { ArrowRight, Loader2 } from "lucide-react";
import { cn } from "@/lib/utils";

const sizes = ["1–5", "6–20", "21–50", "51–200", "200+"];
const contactMethods = ["Email", "Phone call", "Video call", "WhatsApp"];

type FormState = "idle" | "loading" | "success" | "error";

export default function DiscoverySection() {
  const ref = useRef(null);
  const inView = useInView(ref, { once: true, margin: "-80px" });
  const [state, setState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", size: "", problem: "", preferredContact: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setState("success");
    } catch {
      setState("error");
    }
  };

  return (
    <section id="discovery" className="py-28 bg-slate-50 relative overflow-hidden" ref={ref}>
      {/* BG glow */}
      <div
        className="absolute left-1/2 top-0 -translate-x-1/2 w-[800px] h-[400px] pointer-events-none"
        style={{ background: "radial-gradient(ellipse, rgba(124,58,237,0.07) 0%, transparent 70%)", filter: "blur(60px)" }}
      />

      <div className="relative max-w-7xl mx-auto px-6">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.6 }}
          className="text-center mb-16"
        >
          <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-3">Discovery Call</p>
          <h2 className="text-3xl sm:text-4xl lg:text-5xl font-display font-bold text-slate-900 mb-4 leading-tight">
            Let's find what's slowing your team down.
          </h2>
          <p className="text-slate-500 text-lg max-w-xl mx-auto leading-relaxed">
            A focused conversation about how your team operates today. No obligation. We ask questions,
            we listen, and if there's something we can help with, we'll tell you honestly.
          </p>
        </motion.div>

        <div className="grid lg:grid-cols-5 gap-10 items-start max-w-5xl mx-auto">
          {/* Left — trust signals */}
          <motion.div
            initial={{ opacity: 0, x: -24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.1 }}
            className="lg:col-span-2 space-y-6"
          >
            {[
              { t: "30–45 minutes", s: "Focused conversation, not a sales call" },
              { t: "No obligation", s: "We share honest insight regardless of outcome" },
              { t: "Your context only", s: "We never assume we know your problem before we've spoken" },
              { t: "Founder-led", s: "You speak directly with Anisa, not an account manager" },
            ].map((item) => (
              <div key={item.t} className="flex items-start gap-4">
                <div className="w-1.5 h-1.5 rounded-full mt-2 shrink-0 bg-violet-600" />
                <div>
                  <p className="text-slate-900 font-medium text-sm">{item.t}</p>
                  <p className="text-slate-400 text-xs mt-0.5">{item.s}</p>
                </div>
              </div>
            ))}
          </motion.div>

          {/* Right — form */}
          <motion.div
            initial={{ opacity: 0, x: 24 }}
            animate={inView ? { opacity: 1, x: 0 } : {}}
            transition={{ duration: 0.6, delay: 0.2 }}
            className="lg:col-span-3"
          >
            {state === "success" ? (
              <div
                className="rounded-3xl p-12 text-center bg-white"
                style={{ border: "1px solid rgba(124,58,237,0.2)" }}
              >
                <div
                  className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                  style={{ background: "rgba(124,58,237,0.1)" }}
                >
                  <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                    <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                  </svg>
                </div>
                <h3 className="font-display font-bold text-slate-900 text-xl mb-2">Request received.</h3>
                <p className="text-slate-500 text-sm">We'll be in touch within one business day.</p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                className="rounded-3xl p-8 space-y-5 bg-white"
                style={{ border: "1px solid rgba(0,0,0,0.08)", boxShadow: "0 4px 24px rgba(0,0,0,0.06)" }}
              >
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Full Name *" placeholder="Jane Smith" value={form.name} onChange={(v) => set("name", v)} required />
                  <Field label="Email *" type="email" placeholder="jane@agency.com" value={form.email} onChange={(v) => set("email", v)} required />
                  <Field label="Phone" placeholder="+44 7700 000000" value={form.phone} onChange={(v) => set("phone", v)} />
                  <Field label="Company *" placeholder="Acme Recruitment" value={form.company} onChange={(v) => set("company", v)} required />
                  <SelectField label="Team Size" options={sizes} value={form.size} onChange={(v) => set("size", v)} />
                  <SelectField label="Preferred Contact" options={contactMethods} value={form.preferredContact} onChange={(v) => set("preferredContact", v)} />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-500 mb-2">Main operational challenge</label>
                  <textarea
                    rows={4}
                    value={form.problem}
                    onChange={(e) => set("problem", e.target.value)}
                    placeholder="Describe the friction point, process gap, or inefficiency you'd like to address..."
                    className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-300 bg-slate-50 border border-black/10 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 resize-none"
                  />
                </div>
                {state === "error" && (
                  <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                )}
                <button
                  type="submit"
                  disabled={state === "loading"}
                  className={cn(
                    "w-full flex items-center justify-center gap-2 py-4 rounded-xl font-semibold text-sm transition-all duration-200",
                    "bg-violet-600 hover:bg-violet-500 text-white shadow-md hover:shadow-violet-500/30",
                    state === "loading" && "opacity-70 cursor-not-allowed"
                  )}
                >
                  {state === "loading" ? (
                    <><Loader2 size={16} className="animate-spin" /> Sending...</>
                  ) : (
                    <>Request a Discovery Call <ArrowRight size={16} /></>
                  )}
                </button>
                <p className="text-xs text-slate-400 text-center">We respond within one business day. No commitment required.</p>
              </form>
            )}
          </motion.div>
        </div>
      </div>
    </section>
  );
}

function Field({ label, type = "text", placeholder, value, onChange, required }: {
  label: string; type?: string; placeholder: string;
  value: string; onChange: (v: string) => void; required?: boolean;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-300 bg-slate-50 border border-black/10 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
      />
    </div>
  );
}

function SelectField({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-sm text-slate-600 bg-slate-50 border border-black/10 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
