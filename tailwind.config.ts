import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          950: "#050D1A",
          900: "#0B1628",
          800: "#112040",
          700: "#1A3160",
          600: "#1E3A8A",
        },
        violet: {
          600: "#06B6D4",
          500: "#8B5CF6",
          400: "#A78BFA",
          200: "#DDD6FE",
          100: "#CFFAFE",
        },
      },
      fontFamily: {
        sans: ["var(--font-inter)"],
        display: ["var(--font-plus-jakarta)"],
      },
      animation: {
        "marquee": "marquee 30s linear infinite",
        "marquee2": "marquee2 30s linear infinite",
        "float": "float 6s ease-in-out infinite",
        "pulse-slow": "pulse 4s cubic-bezier(0.4,0,0.6,1) infinite",
        "spin-slow": "spin 20s linear infinite",
        "gradient": "gradient 8s ease infinite",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0%)" },
          "100%": { transform: "translateX(-100%)" },
        },
        marquee2: {
          "0%": { transform: "translateX(100%)" },
          "100%": { transform: "translateX(0%)" },
        },
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-12px)" },
        },
        gradient: {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
      backgroundSize: {
        "300%": "300%",
      },
    },
  },
  plugins: [],
};

export default config;
