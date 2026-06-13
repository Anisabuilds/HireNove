"use client";
import { useState, useEffect } from "react";
import Link from "next/link";

export default function CookieBanner() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    if (!localStorage.getItem("hn-cookie-consent")) {
      setVisible(true);
    }
  }, []);

  const accept = () => {
    localStorage.setItem("hn-cookie-consent", "accepted");
    setVisible(false);
  };

  const decline = () => {
    localStorage.setItem("hn-cookie-consent", "declined");
    setVisible(false);
  };

  if (!visible) return null;

  return (
    <div className="fixed bottom-0 left-0 right-0 z-[9999] px-4 pb-4 pointer-events-none">
      <div
        className="max-w-3xl mx-auto rounded-2xl px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center gap-4 pointer-events-auto shadow-xl"
        style={{ background: "#0F172A", border: "1px solid rgba(255,255,255,0.08)" }}
      >
        <p className="text-sm text-white/70 leading-relaxed flex-1">
          We use cookies to remember your preferences and improve your experience.{" "}
          <Link href="/privacy" className="underline underline-offset-2 text-white/50 hover:text-white transition-colors">
            Privacy Policy
          </Link>
        </p>
        <div className="flex items-center gap-2 shrink-0">
          <button
            onClick={decline}
            className="text-sm font-medium px-4 py-2 rounded-lg text-white/50 hover:text-white transition-colors"
          >
            Decline
          </button>
          <button
            onClick={accept}
            className="text-sm font-semibold px-5 py-2 rounded-lg text-white transition-colors"
            style={{ background: "#0E7490" }}
            onMouseEnter={e => (e.currentTarget.style.background = "#0891B2")}
            onMouseLeave={e => (e.currentTarget.style.background = "#0E7490")}
          >
            Accept
          </button>
        </div>
      </div>
    </div>
  );
}
