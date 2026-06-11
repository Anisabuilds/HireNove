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

const sizes = ["1–5", "6–20", "21–50", "51–200", "200+"];
type FormState = "idle" | "loading" | "success" | "error";

const STEPS = ["Your Details", "Your Experience"];

export default function HelpUsLearnModal({
  open,
  onClose,
}: {
  open: boolean;
  onClose: () => void;
}) {
  const [step, setStep] = useState(0);
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState({
    name: "", email: "", phone: "", company: "", size: "", role: "",
    q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "", q10: "",
  });

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  // Close on Escape
  useEffect(() => {
    const fn = (e: KeyboardEvent) => { if (e.key === "Escape") onClose(); };
    if (open) window.addEventListener("keydown", fn);
    return () => window.removeEventListener("keydown", fn);
  }, [open, onClose]);

  // Lock body scroll
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.name || !form.email || !form.company) return;
    setFormState("loading");
    try {
      const res = await fetch("/api/research", {
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

  const reset = () => {
    setStep(0);
    setFormState("idle");
    setForm({ name: "", email: "", phone: "", company: "", size: "", role: "",
      q1: "", q2: "", q3: "", q4: "", q5: "", q6: "", q7: "", q8: "", q9: "", q10: "" });
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
            style={{ background: "rgba(5,13,26,0.88)", backdropFilter: "blur(8px)" }}
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
              className="relative w-full max-w-2xl max-h-[90vh] overflow-hidden rounded-3xl pointer-events-auto"
              style={{ background: "#0D1B2E", border: "1px solid rgba(167,139,250,0.15)" }}
              onClick={(e) => e.stopPropagation()}
            >
              {/* Header */}
              <div
                className="flex items-start justify-between p-8 pb-0"
              >
                <div>
                  <p className="text-xs font-semibold uppercase tracking-widest text-violet-400 mb-1">Research</p>
                  <h2 className="text-xl font-display font-bold text-white">
                    Help us understand what slows recruiters down.
                  </h2>
                  <p className="text-white/40 text-sm mt-1">
                    No right or wrong answers — we're listening.
                  </p>
                </div>
                <button
                  onClick={onClose}
                  className="ml-4 shrink-0 w-9 h-9 rounded-xl flex items-center justify-center text-white/40 hover:text-white hover:bg-white/10 transition-all duration-200"
                >
                  <X size={18} />
                </button>
              </div>

              {/* Step tabs */}
              {formState !== "success" && (
                <div className="flex gap-2 px-8 pt-5 pb-0">
                  {STEPS.map((s, i) => (
                    <button
                      key={s}
                      onClick={() => i < step && setStep(i)}
                      className={cn(
                        "flex-1 py-2 text-xs font-semibold rounded-lg transition-all duration-200",
                        step === i
                          ? "text-violet-300"
                          : i < step
                          ? "text-white/40 hover:text-white/60"
                          : "text-white/20 cursor-default"
                      )}
                      style={{
                        background: step === i ? "rgba(124,58,237,0.15)" : "rgba(255,255,255,0.03)",
                        border: step === i ? "1px solid rgba(167,139,250,0.3)" : "1px solid rgba(255,255,255,0.06)",
                      }}
                    >
                      {s}
                    </button>
                  ))}
                </div>
              )}

              {/* Scrollable body */}
              <div className="overflow-y-auto max-h-[calc(90vh-200px)] px-8 py-6">
                {formState === "success" ? (
                  <div className="text-center py-12">
                    <div
                      className="w-16 h-16 rounded-full flex items-center justify-center mx-auto mb-5"
                      style={{ background: "rgba(124,58,237,0.2)" }}
                    >
                      <svg className="w-8 h-8 text-violet-400" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                        <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                      </svg>
                    </div>
                    <h3 className="font-display font-bold text-white text-2xl mb-2">Thank you.</h3>
                    <p className="text-white/45 text-sm mb-8 max-w-sm mx-auto">
                      Your responses have been saved. We review every submission carefully.
                    </p>
                    <div className="flex gap-3 justify-center">
                      <button
                        onClick={reset}
                        className="text-violet-400 text-sm font-medium hover:text-violet-300 transition-colors"
                      >
                        Submit another response
                      </button>
                      <span className="text-white/20">·</span>
                      <button
                        onClick={onClose}
                        className="text-white/40 text-sm hover:text-white/60 transition-colors"
                      >
                        Close
                      </button>
                    </div>
                  </div>
                ) : (
                  <form onSubmit={handleSubmit}>
                    <AnimatePresence mode="wait">
                      {step === 0 && (
                        <motion.div
                          key="step0"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="grid sm:grid-cols-2 gap-4"
                        >
                          <ModalField label="Full Name *" placeholder="Jane Smith" value={form.name} onChange={(v) => set("name", v)} required />
                          <ModalField label="Email Address *" type="email" placeholder="jane@agency.com" value={form.email} onChange={(v) => set("email", v)} required />
                          <ModalField label="Phone Number" placeholder="+44 7700 000000" value={form.phone} onChange={(v) => set("phone", v)} />
                          <ModalField label="Company Name *" placeholder="Acme Recruitment" value={form.company} onChange={(v) => set("company", v)} required />
                          <ModalSelect label="Team Size" options={sizes.map(s => s + " people")} value={form.size} onChange={(v) => set("size", v)} />
                          <ModalField label="Your Role" placeholder="Managing Director, Recruiter..." value={form.role} onChange={(v) => set("role", v)} />
                        </motion.div>
                      )}

                      {step === 1 && (
                        <motion.div
                          key="step1"
                          initial={{ opacity: 0, x: 20 }}
                          animate={{ opacity: 1, x: 0 }}
                          exit={{ opacity: 0, x: -20 }}
                          transition={{ duration: 0.25 }}
                          className="space-y-4"
                        >
                          <p className="text-white/30 text-xs mb-2">Answer as many or as few as you'd like.</p>
                          {questions.map((q) => (
                            <div key={q.id}>
                              <label className="block text-xs font-semibold text-white/50 mb-1.5">{q.label}</label>
                              <textarea
                                rows={2}
                                value={form[q.id as keyof typeof form]}
                                onChange={(e) => set(q.id, e.target.value)}
                                placeholder="Share whatever comes to mind..."
                                className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all duration-200 resize-none"
                              />
                            </div>
                          ))}
                          {formState === "error" && (
                            <p className="text-red-400 text-sm">Something went wrong. Please try again.</p>
                          )}
                        </motion.div>
                      )}
                    </AnimatePresence>

                    {/* Footer buttons */}
                    <div className="flex items-center justify-between pt-6 mt-2 border-t" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
                      <button
                        type="button"
                        onClick={() => step === 0 ? onClose() : setStep(0)}
                        className="text-sm text-white/40 hover:text-white/60 transition-colors"
                      >
                        {step === 0 ? "Cancel" : "← Back"}
                      </button>

                      {step === 0 ? (
                        <button
                          type="button"
                          onClick={() => {
                            if (!form.name || !form.email || !form.company) return;
                            setStep(1);
                          }}
                          className="inline-flex items-center gap-2 px-6 py-2.5 bg-violet-600 hover:bg-violet-500 text-white font-semibold rounded-xl text-sm transition-all duration-200"
                        >
                          Continue <ArrowRight size={14} />
                        </button>
                      ) : (
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
                      )}
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
      <label className="block text-xs font-semibold text-white/50 mb-1.5">{label}</label>
      <input
        type={type}
        required={required}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-white placeholder-white/20 bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all duration-200"
      />
    </div>
  );
}

function ModalSelect({ label, options, value, onChange }: {
  label: string; options: string[]; value: string; onChange: (v: string) => void;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-white/50 mb-1.5">{label}</label>
      <select
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="w-full px-4 py-3 rounded-xl text-sm text-white/70 bg-white/5 border border-white/10 focus:outline-none focus:border-violet-500/50 transition-all duration-200"
        style={{ colorScheme: "dark" }}
      >
        <option value="" className="bg-[#0D1B2E]">Select...</option>
        {options.map((o) => <option key={o} value={o} className="bg-[#0D1B2E]">{o}</option>)}
      </select>
    </div>
  );
}
