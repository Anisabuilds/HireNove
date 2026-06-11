"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";

const links = [
  { label: "Home", href: "/" },
  { label: "Services", href: "/services" },
  { label: "About", href: "/about" },
];

export default function Navbar({
  onLearnOpen,
  onDiscoveryOpen,
}: {
  onLearnOpen: () => void;
  onDiscoveryOpen: () => void;
}) {
  const [scrolled, setScrolled] = useState(false);
  const [mobile, setMobile] = useState(false);
  const pathname = usePathname();

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 30);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (
    <header
      className={cn(
        "fixed top-0 left-0 right-0 z-50 transition-all duration-500",
        scrolled
          ? "bg-white/95 backdrop-blur-md border-b border-black/8 shadow-sm py-3"
          : "bg-transparent py-5"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between">
        {/* Logo */}
        <Link href="/" className="relative h-8 w-36 block shrink-0">
          <Image src="/logo-color.png" alt="HireNove" fill className="object-contain object-left" />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center gap-5">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              className={cn(
                "text-sm font-medium transition-colors duration-200",
                pathname === l.href ? "text-slate-900" : "text-slate-500 hover:text-slate-900"
              )}
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={onLearnOpen}
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 font-medium"
          >
            Help Us Learn
          </button>
          <button
            onClick={onDiscoveryOpen}
            className="text-sm text-slate-500 hover:text-slate-900 transition-colors duration-200 font-medium"
          >
            Contact
          </button>
        </nav>

        {/* CTA */}
        <div className="hidden md:flex items-center">
          <button
            onClick={onDiscoveryOpen}
            className="text-sm font-semibold px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-all duration-200 shadow-md hover:shadow-violet-500/25"
          >
            Book a Discovery Call
          </button>
        </div>

        {/* Hamburger */}
        <button
          className="md:hidden text-slate-600 hover:text-slate-900"
          onClick={() => setMobile(!mobile)}
          aria-label="Toggle menu"
        >
          {mobile ? <X size={22} /> : <Menu size={22} />}
        </button>
      </div>

      {/* Mobile drawer */}
      {mobile && (
        <div className="md:hidden bg-white border-t border-black/8 px-6 py-5 space-y-4 shadow-lg">
          {links.map((l) => (
            <Link
              key={l.href}
              href={l.href}
              onClick={() => setMobile(false)}
              className="block text-sm font-medium text-slate-600 hover:text-slate-900"
            >
              {l.label}
            </Link>
          ))}
          <button
            onClick={() => { setMobile(false); onLearnOpen(); }}
            className="block text-sm font-medium text-slate-600 hover:text-slate-900 w-full text-left"
          >
            Help Us Learn
          </button>
          <button
            onClick={() => { setMobile(false); onDiscoveryOpen(); }}
            className="block text-sm font-medium text-slate-600 hover:text-slate-900 w-full text-left"
          >
            Contact
          </button>
          <button
            onClick={() => { setMobile(false); onDiscoveryOpen(); }}
            className="block w-full text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-3 rounded-lg mt-2 transition-colors duration-200"
          >
            Book a Discovery Call
          </button>
        </div>
      )}
    </header>
  );
}
