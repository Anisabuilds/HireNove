"use client";
import { useState, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { cn } from "@/lib/utils";
import { Menu, X } from "lucide-react";
import { useLang } from "@/lib/LanguageContext";
import { t, tr } from "@/lib/translations";

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
  const { lang } = useLang();

  const links = [
    { label: tr(t.nav.home,     lang), href: "/" },
    { label: tr(t.nav.services, lang), href: "/services" },
    { label: tr(t.nav.about,    lang), href: "/about" },
    { label: "Pilot Program",        href: "/pilot" },
  ];

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
          ? "bg-white/95 backdrop-blur-md border-b border-black/8 shadow-sm py-4"
          : "bg-transparent py-7"
      )}
    >
      <div className="max-w-7xl mx-auto px-6 flex items-center justify-between gap-4">
        {/* Logo */}
        <Link href="/" className="relative h-8 w-32 block shrink-0">
          <Image src="/logo-color.png" alt="HireNove" fill className="object-contain object-left" />
        </Link>

        {/* Desktop links */}
        <nav className="hidden md:flex items-center flex-1 justify-center">
          {links.map((l, i) => (
            <div key={l.href} className="flex items-center">
              {i !== 0 && <span className="w-px h-3.5 bg-slate-300 mx-3" />}
              <Link
                href={l.href}
                className={cn(
                  "text-base font-medium transition-colors duration-200 whitespace-nowrap",
                  pathname === l.href ? "text-slate-900" : "text-slate-500 hover:text-slate-400"
                )}
              >
                {l.label}
              </Link>
            </div>
          ))}
          <span className="w-px h-3.5 bg-slate-300 mx-3" />
          <button onClick={onLearnOpen} className="text-base text-slate-500 hover:text-slate-400 transition-colors duration-200 font-medium whitespace-nowrap">
            {tr(t.nav.helpLearn, lang)}
          </button>
          <span className="w-px h-3.5 bg-slate-300 mx-3" />
          <button onClick={onDiscoveryOpen} className="text-base text-slate-500 hover:text-slate-400 transition-colors duration-200 font-medium whitespace-nowrap">
            {tr(t.nav.contact, lang)}
          </button>
        </nav>

        {/* Right side: CTA */}
        <div className="hidden md:flex items-center gap-3 shrink-0">
          <button
            onClick={onDiscoveryOpen}
            className="text-base font-semibold px-5 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-all duration-200 shadow-md hover:shadow-violet-500/25 whitespace-nowrap"
          >
            {tr(t.nav.bookCall, lang)}
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
            <Link key={l.href} href={l.href} onClick={() => setMobile(false)} className="block text-sm font-medium text-slate-600 hover:text-slate-900">
              {l.label}
            </Link>
          ))}
          <button onClick={() => { setMobile(false); onLearnOpen(); }} className="block text-sm font-medium text-slate-600 hover:text-slate-900 w-full text-left">
            {tr(t.nav.helpLearn, lang)}
          </button>
          <button onClick={() => { setMobile(false); onDiscoveryOpen(); }} className="block text-sm font-medium text-slate-600 hover:text-slate-900 w-full text-left">
            {tr(t.nav.contact, lang)}
          </button>
          <div className="flex gap-3 pt-1">
            <button onClick={() => { setMobile(false); onDiscoveryOpen(); }} className="flex-1 text-center bg-violet-600 hover:bg-violet-500 text-white text-sm font-semibold py-2 rounded-lg transition-colors duration-200">
              {tr(t.nav.bookCall, lang)}
            </button>
          </div>
        </div>
      )}
    </header>
  );
}
