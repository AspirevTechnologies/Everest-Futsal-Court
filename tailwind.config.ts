import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/modules/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/shared/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        heading: ["var(--font-heading)", "Impact", "sans-serif"],
        sans: ["var(--font-sans)", "system-ui", "sans-serif"],
      },
      colors: {
        pitch: {
          950: "#022c22",
          900: "#064e3b",
          800: "#065f46",
          700: "#047857",
          600: "#059669",
          500: "#10b981",
          400: "#34d399",
          100: "#d1fae5",
          50: "#ecfdf5",
        },
        turf: {
          DEFAULT: "#059669",
          dark: "#064E3B",
          light: "#D1FAE5",
          neon: "#BEF264",
          gold: "#F59E0B",
        },
        surface: {
          canvas: "#F8F9FA",
          card: "#FFFFFF",
          subtle: "#F1F5F9",
          dark: "#0F172A",
        },
        ink: {
          primary: "#0F172A",
          secondary: "#475569",
          muted: "#64748B",
          subtle: "#94A3B8",
        },
      },
      boxShadow: {
        card: "0 2px 8px -2px rgba(15, 23, 42, 0.05), 0 8px 16px -4px rgba(15, 23, 42, 0.04)",
        "card-hover": "0 14px 28px -6px rgba(15, 23, 42, 0.10), 0 6px 12px -3px rgba(15, 23, 42, 0.05)",
        floating: "0 20px 40px -12px rgba(0, 0, 0, 0.35)",
      },
      borderRadius: {
        "3xl": "1.5rem",
        "4xl": "2rem",
        "5xl": "2.5rem",
      },
    },
  },
  plugins: [],
};

export default config;
