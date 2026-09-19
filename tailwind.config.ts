import type { Config } from "tailwindcss";

const config: Config = {
  content: ["./src/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      colors: {
        // Pulled straight from the Balık Shop logo
        navy: {
          50: "#EAF2F9",
          100: "#CBDFEF",
          200: "#9CC1DE",
          300: "#6A9CC6",
          400: "#3F72A4",
          500: "#1E5183",
          600: "#134066",
          700: "#0F3557", // logo lettering
          800: "#0A2740",
          900: "#061A2B",
        },
        sky: {
          50: "#EFF9FE",
          100: "#D6F0FC",
          200: "#AFE2F9",
          300: "#7FCFF4",
          400: "#4FB6F0", // the fish
          500: "#2A9CE0",
          600: "#187BBA",
          700: "#136095",
        },
        butter: {
          50: "#FFFDF4",
          100: "#FEF9DF",
          200: "#FDF3BE",
          300: "#FBEB9C", // logo circle
          400: "#F7DE6B",
          500: "#EFC93C",
        },
        coral: {
          300: "#FFB0A2",
          400: "#FF8A75",
          500: "#FF6F59",
          600: "#E9503A",
        },
        mint: {
          300: "#A9EDD8",
          400: "#6FDCBC",
          500: "#37C39D",
        },
        cream: "#FFFBF0",
        sand: "#F6EEDC",
      },
      fontFamily: {
        display: ["var(--font-display)", "Fredoka", "system-ui", "sans-serif"],
        sans: ["var(--font-body)", "Plus Jakarta Sans", "system-ui", "sans-serif"],
      },
      spacing: {
        "4.5": "1.125rem",
        "18": "4.5rem",
      },
      borderRadius: {
        blob: "42% 58% 55% 45% / 48% 40% 60% 52%",
        "4xl": "2rem",
        "5xl": "2.75rem",
      },
      boxShadow: {
        pop: "0 4px 0 0 #0F3557",
        "pop-sm": "0 3px 0 0 #0F3557",
        "pop-lg": "0 7px 0 0 #0F3557",
        float: "0 18px 40px -18px rgba(15, 53, 87, 0.45)",
        card: "0 2px 0 0 #0F3557",
      },
      keyframes: {
        swim: {
          "0%,100%": { transform: "translateX(0) rotate(0deg)" },
          "50%": { transform: "translateX(10px) rotate(-6deg)" },
        },
        bob: {
          "0%,100%": { transform: "translateY(0)" },
          "50%": { transform: "translateY(-10px)" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        wiggle: {
          "0%,100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        "spin-slow": {
          from: { transform: "rotate(0deg)" },
          to: { transform: "rotate(360deg)" },
        },
        "fade-up": {
          from: { opacity: "0", transform: "translateY(14px)" },
          to: { opacity: "1", transform: "translateY(0)" },
        },
        "drawer-in": {
          from: { transform: "translateX(100%)" },
          to: { transform: "translateX(0)" },
        },
        "drawer-out": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(100%)" },
        },
        "scrim-in": { from: { opacity: "0" }, to: { opacity: "1" } },
        "scrim-out": { from: { opacity: "1" }, to: { opacity: "0" } },
      },
      animation: {
        swim: "swim 4s ease-in-out infinite",
        bob: "bob 5s ease-in-out infinite",
        marquee: "marquee 28s linear infinite",
        "marquee-fast": "marquee 16s linear infinite",
        wiggle: "wiggle 2.5s ease-in-out infinite",
        "spin-slow": "spin-slow 22s linear infinite",
        "fade-up": "fade-up 0.5s ease-out both",
        "drawer-in": "drawer-in 0.28s cubic-bezier(0.32, 0.72, 0, 1) both",
        "drawer-out": "drawer-out 0.22s cubic-bezier(0.32, 0.72, 0, 1) both",
        "scrim-in": "scrim-in 0.28s ease-out both",
        "scrim-out": "scrim-out 0.22s ease-in both",
      },
    },
  },
  plugins: [],
};

export default config;
