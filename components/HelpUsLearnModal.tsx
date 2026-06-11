"use client";
import { useState, useEffect } from "react";
import { X, Loader2, ArrowRight } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { cn } from "@/lib/utils";

const questions = [
  { id: "q1", label: "What tasks do you spend the most time on every week?" },
  { id: "q2", label: "What feels repetitive — and shouldn't?" },
  { id: "q3", label: "What do you wish somebody else would handle for you?" },
  { id: "q4", label: "What tasks keep piling up no matter what you do?" },
  { id: "q5", label: "What do recruiters on your team complain about most?" },
  { id: "q6", label: "Where do mistakes happen most often?" },
  { id: "q7", label: "What processes depend entirely on people remembering things?" },
  { id: "q8", label: "What happens when your team is at full capacity?" },
  { id: "q9", label: "What falls through the cracks when things get busy?" },
  { id: "q10", label: "What do you keep postponing because there's never time?" },
];

type FormState = "idle" | "loading" | "success" | "error";

export default function HelpUsLearnModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    email: "", company: "",
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "", q10: "",
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
    if (!form.email || !form.company) return;
    setFormState("loading");
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: "", phone: "", size: "", role: "" }),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  const reset = () => {
    setFormState("idle");
    setForm({ email: "", company: "", q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "", q10: "" });
  };

  return (
    <AnimatePresence>
      {open && (
        <>
          {/* Backdrop */}
          <motion.div
            key="backdrop"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: 0.25 }}
            className="fixed inset-0 z-50"
            style={{ background: "rgba(15,23,42,0.5)", backdropFilter: "blur(6px)" }}
            onClick={onClose}
          />

          {/* Modal */}
          <motion.div
            key="modal"
            initial={{ opacity: 0, scale: 0.96, y: 24 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.96, y: 24 }}
            transition={{ duration: 0.3, ease: [0.25, 0.46, 0.45, 0.94] }}
            className="fixed inset-0 z-50 flex items-center justify-center p-4 pointer-events-none"
          >
            <div
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl pointer-events-auto bg-white"
              style={{ border: "1px solid rgba(0,0,0,0.1)", boxShadow: "0 24px 80px rgba(0,0,0,0.15)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div className="flex items-start justify-between p-8 pb-0">
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-600 mb-1">Research</p>
                  <h2 className="text-xl font-display font-bold text-slate-900">
                    Help us understand what slows recruiters down.
                  </h2>
                  <p className="text-slate-400 text-sm mt-1">
                    No right or wrong answers — we're listening.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-slate-400 hover:text-slate-900 hover:bg-slate-100 transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Scrollable body */}
              <div className="overflow-y-auto max-h-[calc(90vh-160px)] px-8 py-6">
                {formState === "success" ? (
                  <div className="text-center py-12">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "rgba(124,58,237,0.1)" }}
                    >
                      <svg className="w-8 h-8 text-violet-600" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display font-bold text-slate-900 text-2xl mb-2">Thank you.</h3>
                    <p className="text-slate-400 text-sm mb-8 max-w-sm mx-auto">
                      Your responses have been saved. We review every submission carefully.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button onClick={reset} className="text-violet-600 text-sm font-medium hover:text-violet-500 transition-colors">
                        Submit another response
                      </button>
                      <span className="text-slate-200">·</span>
                      <button onClick={onClose} className="text-slate-400 text-sm hover:text-slate-600 transition-colors">
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit} className="space-y-5">
                    {/* Minimal required fields */}
                    <div className="grid sm:grid-cols-2 gap-4">
                      <ModalField label="Email Address *" type="email" placeholder="jane@agency.com" value={form.email} onChange={(v) => set("email", v)} required />
                      <ModalField label="Company Name *" placeholder="Acme Recruitment" value={form.company} onChange={(v) => set("company", v)} required />
                    </div>

                    <div className="border-t border-black/6 pt-5">
                      <p className="text-slate-400 text-xs mb-4">Answer as many or as few as you'd like.</p>
                      <div className="space-y-4">
                        {questions.map((q) => (
                          <div key={q.id}>
                            <label className="block text-xs font-semibold text-slate-500 mb-1.5">{q.label}</label>
                            <textarea
                              rows={2}
                              value={form[q.id as keyof typeof form]}
                              onChange={(e) => set(q.id, e.target.value)}
                              placeholder="Share whatever comes to mind..."
                              className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-300 bg-slate-50 border border-black/10 focus:outline-none focus:border-violet-400 focus:bg-white transition-all duration-200 resize-none"
                            />
                          </div>
                        ))}
                      </div>
                    </div>

                    {formState === "error" && (
                      <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
                    )}

                    {/* Footer */}
                    <div className="flex items-center justify-between pt-4 mt-2 border-t border-black/6">
                      <button type="button" onClick={onClose} className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                        Cancel
                      </button>
                      <button
                        type="submit"
                        disabled={formState === "loading"}
                        className={cn(
                          "inline-flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all duration-200",
                          formState === "loading" && "opacity-60 cursor-not-allowed"
                        )}
                      >
                        {formState === "loading" ? (
                          <><Loader2 size={14} className="animate-spin" /> Submitting...</>
                        ) : (
                          <>Submit Response <ArrowRight size={14} /></>
                        )}
                      </button>
                    </div>
                  </form>
                )}
              </div>
            </div>
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}

function ModalField({ label, type = "text", placeholder, value, onChange, required }: {
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
