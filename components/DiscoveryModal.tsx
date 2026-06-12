"use client";
import { useState, useEffect } from "react";
import { X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const sizes = ["1–5", "6–20", "21–50", "51–200", "200+"];
const contactMethods = ["Email", "Phone call", "Video call", "WhatsApp"];

type FormState = "idle" | "loading" | "success" | "error";

export default function DiscoveryModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", size: "", problem: "", preferredContact: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setFormState("loading");
    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  return (
    <AnimatePresence>
      {open && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.2 }}
          className="fixed inset-0 z-[9998] flex items-center justify-center p-4"
          style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(6px)" }}
          onClick={(e) => { if (e.target === e.currentTarget) onClose(); }}
        >
          <motion.div
            initial={{ opacity: 0, scale: 0.96, y: 16 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 16 }}
            transition={{ duration: 0.25, ease: "easeOut" }}
            className="relative w-full max-w-xl bg-white rounded-2xl shadow-2xl overflow-hidden"
            style={{ border: "1px solid rgba(0,0,0,0.08)", maxHeight: "90vh", overflowY: "auto" }}
          >
            {/* Header */}
            <div className="flex items-start justify-between p-7 pb-0">
              <div>
                <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-1">Discovery Call</p>
                <h2 className="text-xl font-display font-bold text-slate-900">Let's find what's slowing your team down.</h2>
                <p className="text-slate-400 text-sm mt-1.5 leading-relaxed">30–45 min. Founder-led. No obligation.</p>
              </div>
              <button
                onClick={onClose}
                aria-label="Close"
                className="ml-4 mt-0.5 p-2 rounded-lg text-slate-400 hover:text-slate-700 hover:bg-slate-100 transition-colors duration-150 shrink-0"
              >
                <X size={18} />
              </button>
            </div>

            <div className="p-7 pt-6">
              {formState === "success" ? (
                <div className="py-10 text-center">
                  <div
                    className="w-14 h-14 rounded-full flex items-center justify-center mx-auto mb-4"
                    style={{ background: "rgba(6,182,212,0.1)" }}
                  >
                    <svg className="w-7 h-7 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={2}>
                      <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                    </svg>
                  </div>
                  <h3 className="font-display font-bold text-slate-900 text-xl mb-2">Request received.</h3>
                  <p className="text-slate-500 text-sm">We'll be in touch within one business day.</p>
                  <button
                    onClick={onClose}
                    className="mt-6 text-sm text-violet-600 hover:text-violet-500 font-medium transition-colors"
                  >
                    Close
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid sm:grid-cols-2 gap-3">
                    <Field label="Full Name *" placeholder="Jane Smith" value={form.name} onChange={(v) => set("name", v)} required />
                    <Field label="Email *" type="email" placeholder="jane@agency.com" value={form.email} onChange={(v) => set("email", v)} required />
                    <Field label="Company *" placeholder="Acme Recruitment" value={form.company} onChange={(v) => set("company", v)} required />
                    <Field label="Phone" placeholder="+44 7700 000000" value={form.phone} onChange={(v) => set("phone", v)} />
                    <SelectField label="Team Size" options={sizes} value={form.size} onChange={(v) => set("size", v)} />
                    <SelectField label="Preferred Contact" options={contactMethods} value={form.preferredContact} onChange={(v) => set("preferredContact", v)} />
                  </div>
                  <div>
                    <label className="block text-xs font-semibold text-slate-500 mb-1.5">Main operational challenge</label>
                    <textarea
                      rows={3}
                      value={form.problem}
                      onChange={(e) => set("problem", e.target.value)}
                      placeholder="Describe the friction point, process gap, or inefficiency you'd like to address..."
                      className="w-full px-3.5 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-300 bg-slate-50 border border-black/10 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 resize-none"
                    />
                  </div>
                  {formState === "error" && (
                    <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                  )}
                  <button
                    type="submit"
                    disabled={formState === "loading"}
                    className={cn(
                      "w-full flex items-center justify-center gap-2 py-3.5 rounded-xl font-semibold text-sm transition-all duration-200",
                      "bg-violet-600 hover:bg-violet-500 text-white shadow-md hover:shadow-violet-500/30",
                      formState === "loading" && "opacity-70 cursor-not-allowed"
                    )}
                  >
                    {formState === "loading" ? (
                      <><Loader2 size={15} className="animate-spin" /> Sending...</>
                    ) : (
                      <>Request a Discovery Call <ArrowRight size={15} /></>
                    )}
                  </button>
                  <p className="text-xs text-slate-400 text-center">We respond within one business day. No commitment required.</p>
                  <p className="text-xs text-slate-400 text-center">
                    Or contact directly:{" "}
                    <a href="mailto:anisa@hirenove.com" className="text-violet-600 hover:text-violet-500 transition-colors font-medium">
                      anisa@hirenove.com
                    </a>
                  </p>
                </form>
              )}
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
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
        className="w-full px-3.5 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-300 bg-slate-50 border border-black/10 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
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
        className="w-full px-3.5 py-3 rounded-xl text-sm text-slate-600 bg-slate-50 border border-black/10 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200"
      >
        <option value="">Select...</option>
        {options.map((o) => <option key={o} value={o}>{o}</option>)}
      </select>
    </div>
  );
}
