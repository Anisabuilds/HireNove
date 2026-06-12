"use client";
import { useState, useEffect } from "react";
import { X } from "lucide-react";

const defaultForm = { name: "", company: "", email: "", role: "", bottleneck: "" };

export default function PilotModal() {
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState(defaultForm);
  const [status, setStatus] = useState<"idle" | "sending" | "sent" | "error">("idle");

  useEffect(() => {
    const on = () => setOpen(true);
    document.addEventListener("openPilot", on);
    return () => document.removeEventListener("openPilot", on);
  }, []);

  const close = () => { setOpen(false); setForm(defaultForm); setStatus("idle"); };

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    setStatus("sending");
    try {
      const res = await fetch("/api/pilot", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(form),
      });
      setStatus(res.ok ? "sent" : "error");
    } catch {
      setStatus("error");
    }
  };

  if (!open) return null;

  return (
    <div className="fixed inset-0 z-[200] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" onClick={close} />
      <div className="relative w-full max-w-lg bg-white rounded-2xl shadow-2xl overflow-hidden">
        {/* header */}
        <div className="bg-[#071C2E] px-8 py-6">
          <button onClick={close} className="absolute top-4 right-4 text-white/50 hover:text-white" aria-label="Close">
            <X size={20} />
          </button>
          <span className="text-xs font-semibold tracking-widest uppercase text-violet-400">1-month free · limited spots</span>
          <h2 className="mt-1 text-2xl font-display font-bold text-white">Apply for the Pilot Programme</h2>
          <p className="mt-1 text-sm text-white/50">Anisa reviews every application personally.</p>
        </div>

        {/* body */}
        <div className="px-8 py-7">
          {status === "sent" ? (
            <div className="text-center py-6">
              <div className="w-12 h-12 rounded-full bg-violet-100 flex items-center justify-center mx-auto mb-4">
                <svg className="w-6 h-6 text-violet-600" fill="none" stroke="currentColor" strokeWidth={2.5} viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <h3 className="text-lg font-semibold text-slate-900 mb-1">Application received!</h3>
              <p className="text-sm text-slate-500">Anisa will be in touch within 48 hours.</p>
              <button onClick={close} className="mt-6 px-6 py-2.5 rounded-lg bg-violet-600 text-white text-sm font-semibold hover:bg-violet-500 transition-colors">
                Close
              </button>
            </div>
          ) : (
            <form onSubmit={submit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your name *</label>
                  <input required value={form.name} onChange={e => setForm(f => ({ ...f, name: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400" placeholder="Jane Smith" />
                </div>
                <div>
                  <label className="block text-xs font-semibold text-slate-600 mb-1.5">Company *</label>
                  <input required value={form.company} onChange={e => setForm(f => ({ ...f, company: e.target.value }))}
                    className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400" placeholder="Acme Recruitment" />
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Work email *</label>
                <input required type="email" value={form.email} onChange={e => setForm(f => ({ ...f, email: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400" placeholder="jane@company.com" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Your role</label>
                <input value={form.role} onChange={e => setForm(f => ({ ...f, role: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400" placeholder="e.g. Director, Operations Manager" />
              </div>
              <div>
                <label className="block text-xs font-semibold text-slate-600 mb-1.5">Biggest operational bottleneck</label>
                <textarea rows={3} value={form.bottleneck} onChange={e => setForm(f => ({ ...f, bottleneck: e.target.value }))}
                  className="w-full px-3.5 py-2.5 rounded-lg border border-black/10 text-sm text-slate-900 bg-slate-50 focus:outline-none focus:ring-2 focus:ring-violet-500/30 focus:border-violet-400 resize-none" placeholder="What's eating the most time in your team right now?" />
              </div>

              {status === "error" && (
                <p className="text-sm text-red-500">Something went wrong — please email <a href="mailto:anisa@hirenove.com" className="underline">anisa@hirenove.com</a> directly.</p>
              )}

              <button type="submit" disabled={status === "sending"}
                className="w-full py-3 rounded-lg bg-violet-600 hover:bg-violet-500 text-white font-semibold text-sm transition-colors disabled:opacity-60">
                {status === "sending" ? "Sending…" : "Submit Application"}
              </button>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
