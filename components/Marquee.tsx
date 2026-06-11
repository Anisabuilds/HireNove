"use client";

const items = [
  "Manual ATS updates",
  "Fragmented candidate data",
  "Repetitive outreach",
  "CV screening overhead",
  "Scheduling coordination",
  "Feedback chasing",
  "Administrative documentation",
  "Data entry",
  "Copying between tools",
  "Memory-dependent follow-ups",
  "Reporting bottlenecks",
  "Disconnected systems",
];

const Separator = () => (
  <span className="mx-6 text-violet-600/50 select-none">✦</span>
);

export default function Marquee() {
  return (
    <div className="relative py-8 overflow-hidden border-y" style={{ borderColor: "rgba(255,255,255,0.06)" }}>
      {/* Fade edges */}
      <div className="absolute left-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
           style={{ background: "linear-gradient(90deg, #050D1A, transparent)" }} />
      <div className="absolute right-0 top-0 bottom-0 w-32 z-10 pointer-events-none"
           style={{ background: "linear-gradient(-90deg, #050D1A, transparent)" }} />

      <div className="marquee-container">
        <div className="marquee-track whitespace-nowrap">
          {items.map((item) => (
            <span key={item} className="inline-flex items-center">
              <span className="text-sm font-medium text-white/40 px-3">{item}</span>
              <Separator />
            </span>
          ))}
        </div>
        <div className="marquee-track whitespace-nowrap" aria-hidden>
          {items.map((item) => (
            <span key={item + "_2"} className="inline-flex items-center">
              <span className="text-sm font-medium text-white/40 px-3">{item}</span>
              <Separator />
            </span>
          ))}
        </div>
      </div>
    </div>
  );
}
