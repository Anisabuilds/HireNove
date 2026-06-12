"use client";
import { createContext, useContext, useState, useEffect } from "react";
import type { Lang } from "./translations";

const LanguageContext = createContext<{ lang: Lang; toggle: () => void }>({
  lang: "en",
  toggle: () => {},
});

export function LanguageProvider({ children }: { children: React.ReactNode }) {
  const [lang, setLang] = useState<Lang>("en");

  useEffect(() => {
    const stored = localStorage.getItem("hn-lang") as Lang | null;
    if (stored === "en" || stored === "de") setLang(stored);
  }, []);

  const toggle = () => {
    setLang((l) => {
      const next = l === "en" ? "de" : "en";
      localStorage.setItem("hn-lang", next);
      return next;
    });
  };

  return (
    <LanguageContext.Provider value={{ lang, toggle }}>
      {children}
    </LanguageContext.Provider>
  );
}

export const useLang = () => useContext(LanguageContext);
