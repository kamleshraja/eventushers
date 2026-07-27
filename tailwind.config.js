/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./data/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          gold: "#F59E0B",
          "gold-light": "#FBBF24",
          "gold-dark": "#D97706",
          navy: "#0F172A",
          "navy-dark": "#0B132B",
          "navy-light": "#1E293B",
          blue: "#3B82F6",
          amber: "#FFFBEB",
        },
      },
      fontFamily: {
        sans: ["var(--font-outfit)", "var(--font-jakarta)", "system-ui", "sans-serif"],
        display: ["var(--font-outfit)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        "gold-glow": "0 10px 30px -5px rgba(245, 158, 11, 0.3)",
        "navy-glow": "0 20px 40px -15px rgba(15, 23, 42, 0.4)",
        "glass": "0 8px 32px 0 rgba(15, 23, 42, 0.08)",
      },
      animation: {
        "pulse-slow": "pulse 4s cubic-bezier(0.4, 0, 0.6, 1) infinite",
        "float": "float 6s ease-in-out infinite",
        "shine": "shine 2s linear infinite",
      },
      keyframes: {
        float: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-10px)" },
        },
        shine: {
          "0%": { backgroundPosition: "200% 0" },
          "100%": { backgroundPosition: "-200% 0" },
        },
      },
    },
  },
  plugins: [],
};
