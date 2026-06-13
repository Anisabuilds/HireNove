"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Loader2, ArrowRight, ArrowLeft } from "lucide-react";
import { motion } from "framer-motion";
import { cn } from "@/lib/utils";

const toolQuestions = [
  { id: "t1", label: "What ATS do you use?", placeholder: "e.g. Bullhorn, Greenhouse, Ashby, Lever..." },
  { id: "t2", label: "What CRM do you use?", placeholder: "e.g. HubSpot, Salesforce, custom spreadsheet..." },
  { id: "t3", label: "How do you manage scheduling and interviews?", placeholder: "e.g. Calendly, manual email, Outlook calendar..." },
  { id: "t4", label: "What tools do you use for outreach and sourcing?", placeholder: "e.g. LinkedIn Recruiter, Kaspr, Gem, email sequences..." },
  { id: "t5", label: "Do you use any automation tools already?", placeholder: "e.g. Zapier, Make, n8n — or none yet..." },
];

const teamQuestions = [
  { id: "s1", label: "How many recruiters are on your team?", placeholder: "e.g. 5, 12, just me..." },
  { id: "s2", label: "How many open roles are you managing at any one time?", placeholder: "e.g. 20–30 roles across 10 clients..." },
];

const painQuestions = [
  { id: "p1", label: "Have you tried to fix these problems before? What happened?", placeholder: "What did you try, and why didn't it stick?" },
];

const experienceQuestions = [
  { id: "q1",  label: "What tasks do you spend the most time on every week?" },
  { id: "q2",  label: "What feels repetitive — and shouldn't?" },
  { id: "q3",  label: "What do you wish somebody else would handle for you?" },
  { id: "q4",  label: "What tasks keep piling up no matter what you do?" },
  { id: "q5",  label: "What do recruiters on your team complain about most?" },
  { id: "q6",  label: "Where do mistakes happen most often?" },
  { id: "q7",  label: "What processes depend entirely on people remembering things?" },
  { id: "q8",  label: "What happens when your team is at full capacity?" },
  { id: "q9",  label: "What falls through the cracks when things get busy?" },
  { id: "q10", label: "What do you keep postponing because there's never time?" },
];

type FormState = "idle" | "loading" | "success" | "error";

const emptyForm = {
  email: "", company: "",
  t1: "", t2: "", t3: "", t4: "", t5: "",
  s1: "", s2: "",
  p1: "",
  q1: "", q2: "", q3: "", q4: "", q5: "",
  q6: "", q7: "", q8: "", q9: "", q10: "",
};

export default function ResearchPage() {
  const [formState, setFormState] = useState<FormState>("idle");
  const [form, setForm] = useState(emptyForm);

  const set = (k: string, v: string) => setForm((p) => ({ ...p, [k]: v }));

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!form.email || !form.company) return;
    setFormState("loading");
    try {
      const res = await fetch("/api/research", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ ...form, name: "", phone: "", size: form.s1, role: "" }),
      });
      if (!res.ok) throw new Error();
      setFormState("success");
    } catch {
      setFormState("error");
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#F9F5EF" }}>
      {/* Minimal nav */}
      <header className="border-b border-black/6 bg-white/80 backdrop-blur-md sticky top-0 z-10">
        <div className="max-w-3xl mx-auto px-6 py-4 flex items-center justify-between">
          <Link href="/" className="relative h-7 w-32 block">
            <Image src="/logo-color.png" alt="HireNove" fill className="object-contain object-left" />
          </Link>
          <Link href="/" className="flex items-center gap-1.5 text-xs font-medium text-slate-400 hover:text-slate-700 transition-colors">
            <ArrowLeft size={13} />
            Back to site
          </Link>
        </div>
      </header>

      <main className="max-w-3xl mx-auto px-6 py-16">
        {formState === "success" ? (
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-center py-24"
          >
            {/* Animated smile */}
            <motion.div
              initial={{ scale: 0.5, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: "spring", stiffness: 200, damping: 12 }}
              className="text-7xl mb-8 select-none"
            >
              😊
            </motion.div>
            <motion.h2
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="font-display font-bold text-slate-900 text-3xl mb-3"
            >
              You're amazing. Thank you.
            </motion.h2>
            <motion.p
              initial={{ opacity: 0, y: 12 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.35 }}
              className="text-slate-500 text-base max-w-sm mx-auto mb-3 leading-relaxed"
            >
              Sharing your experience takes real trust — and it genuinely helps us build something better for recruitment teams like yours.
            </motion.p>
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="text-slate-400 text-sm mb-10"
            >
              Every response is read carefully by Anisa personally.
            </motion.p>
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.6 }}
              className="flex items-center justify-center gap-4"
            >
              <button
                onClick={() => { setFormState("idle"); setForm(emptyForm); }}
                className="text-sm text-[#0E7490] hover:text-[#0891B2] font-medium transition-colors"
              >
                Submit another response
              </button>
              <span className="text-slate-200">·</span>
              <Link href="/" className="text-sm text-slate-400 hover:text-slate-600 transition-colors">
                Go back to HireNove →
              </Link>
            </motion.div>
          </motion.div>
        ) : (
          <>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="mb-10"
            >
              <p className="text-xs font-semibold uppercase tracking-widest text-[#0E7490] mb-3">Recruiter Research</p>
              <h1 className="text-3xl sm:text-4xl font-display font-bold text-slate-900 mb-4 leading-tight">
                Help us understand what slows{" "}
                <span className="gradient-text-static font-serif-accent">recruiters down.</span>
              </h1>
              <p className="text-slate-500 text-base leading-relaxed max-w-xl">
                No right or wrong answers. No sales follow-up. We're building a clearer picture of where
                operational friction actually lives inside recruitment teams — and your experience matters.
              </p>
            </motion.div>

            <motion.form
              initial={{ opacity: 0, y: 16 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5, delay: 0.1 }}
              onSubmit={handleSubmit}
              className="space-y-8"
            >
              {/* About you */}
              <FormSection label="About you">
                <div className="grid sm:grid-cols-2 gap-4">
                  <Field label="Work email *" type="email" placeholder="jane@agency.com" value={form.email} onChange={(v) => set("email", v)} required />
                  <Field label="Company name *" placeholder="Acme Recruitment" value={form.company} onChange={(v) => set("company", v)} required />
                </div>
              </FormSection>

              {/* Tools */}
              <FormSection label="Your tools & stack" sub="This helps us understand your setup before we even speak.">
                {toolQuestions.map((q) => (
                  <TextArea key={q.id} label={q.label} placeholder={q.placeholder} value={form[q.id as keyof typeof form]} onChange={(v) => set(q.id, v)} rows={1} />
                ))}
              </FormSection>

              {/* Team */}
              <FormSection label="Your team">
                <div className="grid sm:grid-cols-2 gap-4">
                  {teamQuestions.map((q) => (
                    <Field key={q.id} label={q.label} placeholder={q.placeholder} value={form[q.id as keyof typeof form]} onChange={(v) => set(q.id, v)} />
                  ))}
                </div>
              </FormSection>

              {/* Experience */}
              <FormSection label="Your experience" sub="Answer as many or as few as you'd like — every response helps.">
                {experienceQuestions.map((q, i) => (
                  <motion.div key={q.id} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.3, delay: 0.15 + i * 0.04 }}>
                    <label className="block text-sm font-medium text-slate-700 mb-2">
                      <span className="text-[#0E7490] font-mono text-xs mr-2">{String(i + 1).padStart(2, "0")}</span>
                      {q.label}
                    </label>
                    <textarea
                      rows={2}
                      value={form[q.id as keyof typeof form]}
                      onChange={(e) => set(q.id, e.target.value)}
                      placeholder="Share whatever comes to mind..."
                      className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-300 bg-slate-50 border border-black/8 focus:outline-none focus:border-[#0E7490] focus:bg-white transition-all duration-200 resize-none"
                    />
                  </motion.div>
                ))}
              </FormSection>

              {/* Past attempts */}
              <FormSection label="Previous attempts">
                {painQuestions.map((q) => (
                  <TextArea key={q.id} label={q.label} placeholder={q.placeholder} value={form[q.id as keyof typeof form]} onChange={(v) => set(q.id, v)} rows={3} />
                ))}
              </FormSection>

              {formState === "error" && (
                <p className="text-red-500 text-sm">Something went wrong. Please try again.</p>
              )}

              <div className="flex items-center justify-between">
                <p className="text-xs text-slate-400">Your answers are never shared or sold.</p>
                <button
                  type="submit"
                  disabled={formState === "loading"}
                  className={cn(
                    "inline-flex items-center gap-2 px-6 py-3 bg-[#0E7490] hover:bg-[#0891B2] text-white font-semibold rounded-xl text-sm transition-all duration-200 shadow-md",
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
            </motion.form>
          </>
        )}
      </main>
    </div>
  );
}

function FormSection({ label, sub, children }: { label: string; sub?: string; children: React.ReactNode }) {
  return (
    <div className="bg-white rounded-2xl p-6 border border-black/7 space-y-4">
      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">{label}</p>
        {sub && <p className="text-slate-400 text-xs mt-1">{sub}</p>}
      </div>
      {children}
    </div>
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
        className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-300 bg-slate-50 border border-black/8 focus:outline-none focus:border-[#0E7490] focus:bg-white transition-all duration-200"
      />
    </div>
  );
}

function TextArea({ label, placeholder, value, onChange, rows = 2 }: {
  label: string; placeholder: string;
  value: string; onChange: (v: string) => void; rows?: number;
}) {
  return (
    <div>
      <label className="block text-xs font-semibold text-slate-500 mb-1.5">{label}</label>
      <textarea
        rows={rows}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        className="w-full px-4 py-3 rounded-xl text-sm text-slate-900 placeholder-slate-300 bg-slate-50 border border-black/8 focus:outline-none focus:border-[#0E7490] focus:bg-white transition-all duration-200 resize-none"
      />
    </div>
  );
}
