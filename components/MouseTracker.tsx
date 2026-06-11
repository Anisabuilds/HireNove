"use client";
import { useEffect, useRef } from "react";

export default function MouseTracker() {
  const el = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const move = (e: MouseEvent) => {
      if (!el.current) return;
      el.current.style.left = `${e.clientX}px`;
      el.current.style.top = `${e.clientY}px`;
    };
    window.addEventListener("mousemove", move);
    return () => window.removeEventListener("mousemove", move);
  }, []);

  return (
    <div
      ref={el}
      className="pointer-events-none fixed z-[9999] -translate-x-1/2 -translate-y-1/2"
      style={{
        width: "280px",
        height: "280px",
        background: "radial-gradient(circle, rgba(124,58,237,0.10) 0%, transparent 70%)",
        transition: "left 0.08s ease, top 0.08s ease",
      }}
    />
  );
}
