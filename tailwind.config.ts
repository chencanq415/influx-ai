import tailwindcssAnimate from "tailwindcss-animate";
import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./app/**/*.{ts,tsx}", "./components/**/*.{ts,tsx}", "./lib/**/*.{ts,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        sans: [
          "Inter",
          "ui-sans-serif",
          "system-ui",
          "-apple-system",
          "BlinkMacSystemFont",
          "SF Pro Text",
          "Helvetica Neue",
          "PingFang SC",
          "Microsoft YaHei",
          "sans-serif",
        ],
        mono: ["ui-monospace", "SFMono-Regular", "Menlo", "monospace"],
      },
      colors: {
        page: "#FCFCFD",
        surface: "#FFFFFF",
        "surface-warm": "#F8F8FA",
        brand: "#5B36F5",
        "brand-hover": "#4928D9",
        "soft-pink": "#F5F2FF",
        ink: "#16181D",
        navy: "#16181D",
        slate: "#5E6472",
        muted: "#7B8190",
        border: "#E7E8EC",
        "border-strong": "#D8DAE0",
        "border-row": "#F2F3F5",

        // Signals
        teal: "#1F8A4C",
        "soft-teal": "#EEF9F2",
        "teal-text": "#1F8A4C",
        blue: "#3B6FD8",
        "soft-blue": "#EFF5FF",
        "blue-text": "#3B6FD8",
        amber: "#B56A00",
        "soft-amber": "#FFF7E8",
        "amber-text": "#B56A00",
        lavender: "#6C47FF",
        "soft-lavender": "#F5F2FF",
        "lavender-text": "#5B36F5",

        // Legacy aliases (kept to avoid mass rewrites — point to new scheme)
        "brand-strong": "#5B36F5",
        "brand-soft": "#BCAEFF",
        olive: "#1F8A4C",
        "soft-olive": "#EEF9F2",
        "olive-text": "#1F8A4C",
        "emerald-soft": "#EEF9F2",
        "emerald-text": "#1F8A4C",

        // Heatmap (employee work) — use teal scale
        "heat-0": "#F2F3F5",
        "heat-1": "#ECE7FF",
        "heat-2": "#D9D0FF",
        "heat-3": "#BCAEFF",
        "heat-4": "#6C47FF",
      },
      borderRadius: {
        control: "8px",
        card: "12px",
        panel: "16px",
        md: "10px",
        lg: "12px",
        xl: "16px",
        "2xl": "16px",
        "3xl": "16px",
      },
      boxShadow: {
        panel: "none",
        floating: "0 4px 12px rgba(0, 0, 0, 0.06)",
        cta: "none",
        card: "none",
        elev: "0 4px 12px rgba(0, 0, 0, 0.06)",
        float: "0 8px 24px rgba(0, 0, 0, 0.10)",
        soft: "none",
        drawer: "-8px 0 24px rgba(0, 0, 0, 0.10)",
      },
      keyframes: {
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        "fade-in": {
          "0%": { opacity: "0", transform: "translateY(4px)" },
          "100%": { opacity: "1", transform: "translateY(0)" },
        },
      },
      animation: {
        shimmer: "shimmer 2s linear infinite",
        "fade-in": "fade-in 0.3s ease-out",
      },
    },
  },
  plugins: [tailwindcssAnimate],
};

export default config;
