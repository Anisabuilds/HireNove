import type { Metadata } from "next";
import { Inter, Plus_Jakarta_Sans, Instrument_Serif } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  display: "swap",
});

const plusJakarta = Plus_Jakarta_Sans({
  variable: "--font-plus-jakarta",
  subsets: ["latin"],
  display: "swap",
});

const instrumentSerif = Instrument_Serif({
  variable: "--font-instrument",
  subsets: ["latin"],
  weight: "400",
  style: ["normal", "italic"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "HireNove — Workflow Optimisation for Recruitment Firms",
  description:
    "HireNove helps recruitment firms identify operational bottlenecks, streamline workflows, and reduce repetitive work through custom automation and AI-powered processes.",
  keywords: ["recruitment automation", "workflow optimisation", "recruitment operations", "ATS automation"],
  icons: {
    icon: "/logo-symbol.png",
    apple: "/logo-symbol.png",
  },
  openGraph: {
    title: "HireNove — Workflow Optimisation for Recruitment Firms",
    description: "We help recruiters spend less time on admin and more time on placements.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${plusJakarta.variable} ${instrumentSerif.variable}`}>
      <body className="min-h-screen">{children}</body>
    </html>
  );
}
