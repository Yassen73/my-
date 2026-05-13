import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      // ===== الألوان المخصصة للموقع =====
      colors: {
        // اللون الأساسي (أصفر ذهبي حاد)
        brand: {
          DEFAULT: "#F5C518",
          dark: "#D4A800",
          light: "#FFD740",
        },
        // خلفية الـ Dark Mode
        dark: {
          900: "#080808",
          800: "#0F0F0F",
          700: "#161616",
          600: "#1E1E1E",
          500: "#2A2A2A",
        },
      },
      // ===== الخطوط =====
      fontFamily: {
        display: ["'Syne'", "sans-serif"],       // خط العناوين الكبيرة
        body: ["'DM Sans'", "sans-serif"],        // خط النصوص العادية
        mono: ["'JetBrains Mono'", "monospace"],  // خط الأرقام والكود
      },
      // ===== الأنيميشن =====
      animation: {
        "float": "float 6s ease-in-out infinite",
        "glow-pulse": "glow-pulse 3s ease-in-out infinite",
        "scan-line": "scan-line 8s linear infinite",
        "gradient-shift": "gradient-shift 8s ease infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-20px)" },
        },
        "glow-pulse": {
          "0%, 100%": { opacity: "0.4", transform: "scale(1)" },
          "50%": { opacity: "0.8", transform: "scale(1.05)" },
        },
        "scan-line": {
          "0%": { transform: "translateY(-100%)" },
          "100%": { transform: "translateY(100vh)" },
        },
        "gradient-shift": {
          "0%, 100%": { backgroundPosition: "0% 50%" },
          "50%": { backgroundPosition: "100% 50%" },
        },
      },
    },
  },
  plugins: [],
};

export default config;
