"use client";
import Image from "next/image";
import Link from "next/link";
import { useLang } from "@/lib/LanguageContext";
import { t, tr } from "@/lib/translations";

export default function Footer({ onDiscoveryOpen }: { onDiscoveryOpen: () => void }) {
  const { lang } = useLang();
  const navLinks = [
    { label: tr(t.footer.services, lang), href: "/services" },
    { label: tr(t.footer.about,    lang), href: "/about" },
    { label: tr(t.footer.research, lang), href: "/research" },
  ];
  return (
    <footer className="relative border-t border-black/8 bg-white">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-2">
            <div className="relative h-8 w-36 mb-5">
              <Image src="/logo-color.png" alt="HireNove" fill className="object-contain object-left" />
            </div>
            <p className="text-slate-400 text-sm leading-relaxed max-w-xs mb-5">
              {tr(t.footer.tagline, lang)}
            </p>
            <div className="flex flex-col items-start gap-4">
              <a
                href="mailto:anisa@hirenove.com"
                className="text-violet-600 text-sm font-medium hover:text-violet-500 transition-colors duration-200"
              >
                anisa@hirenove.com
              </a>
              <button
                onClick={onDiscoveryOpen}
                className="inline-flex items-center gap-2 text-sm font-semibold px-4 py-2.5 rounded-lg bg-violet-600 hover:bg-violet-500 text-white transition-all duration-200 shadow-md hover:shadow-violet-500/25"
              >
                Book a Discovery Call
              </button>
            </div>
          </div>

          {/* Navigation */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-5">{tr(t.footer.nav, lang)}</p>
            <nav className="space-y-3">
              {navLinks.map((l) => (
                <Link
                  key={l.href}
                  href={l.href}
                  className="block text-sm text-slate-400 hover:text-slate-900 transition-colors duration-200"
                >
                  {l.label}
                </Link>
              ))}
            </nav>
          </div>

          {/* Contact */}
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-slate-300 mb-5">{tr(t.footer.connect, lang)}</p>
            <div className="space-y-3">
              <a
                href="mailto:anisa@hirenove.com"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-slate-900 transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-violet-500 shrink-0" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
                  <path strokeLinecap="round" strokeLinejoin="round" d="M21.75 6.75v10.5a2.25 2.25 0 01-2.25 2.25h-15a2.25 2.25 0 01-2.25-2.25V6.75m19.5 0A2.25 2.25 0 0019.5 4.5h-15a2.25 2.25 0 00-2.25 2.25m19.5 0v.243a2.25 2.25 0 01-1.07 1.916l-7.5 4.615a2.25 2.25 0 01-2.36 0L3.32 8.91a2.25 2.25 0 01-1.07-1.916V6.75" />
                </svg>
                Email
              </a>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-2.5 text-sm text-slate-400 hover:text-slate-900 transition-colors duration-200"
              >
                <svg className="w-4 h-4 text-violet-500 shrink-0" fill="currentColor" viewBox="0 0 24 24">
                  <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                </svg>
                LinkedIn
              </a>
            </div>
          </div>
        </div>
      </div>

      {/* Data security note */}
      <div className="border-t border-black/6 bg-slate-50/60">
        <div className="max-w-7xl mx-auto px-6 py-4 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-400 text-xs leading-relaxed">
            🔒 Your data stays yours — every workflow runs inside your own environment. No candidate or client data ever touches our systems.{" "}
            <Link href="/data-security" className="text-[#0E7490] hover:text-[#0891B2] transition-colors font-medium">
              Learn more →
            </Link>
          </p>
        </div>
      </div>

      <div className="border-t border-black/6">
        <div className="max-w-7xl mx-auto px-6 py-5 flex flex-col sm:flex-row items-center justify-between gap-2">
          <p className="text-slate-300 text-xs">
            © {new Date().getFullYear()} HireNove. {tr(t.footer.rights, lang)}
          </p>
          <Link href="/privacy" className="text-slate-300 text-xs hover:text-slate-600 transition-colors duration-200">
            {tr(t.footer.privacy, lang)}
          </Link>
        </div>
      </div>
    </footer>
  );
}
