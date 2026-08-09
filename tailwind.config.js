/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/helpers/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/hooks/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#050505",
        surface: "#0d0d0d",
        "surface-raised": "#141414",
        "surface-highlight": "#1e1e1e",
        border: "#1f1f1f",
        "border-subtle": "#141414",
        "border-active": "#333333",
        foreground: "#f5f5f5",
        muted: "#888888",
        "muted-dark": "#444444",
        accent: "#DFFF00", // Acid Lime / High Voltage Yellow
        "accent-dark": "#b0c900",
        "accent-glow": "rgba(223, 255, 0, 0.15)",
      },
      fontFamily: {
        sans: ["var(--font-space-grotesk)", "system-ui", "sans-serif"],
        display: ["var(--font-syne)", "sans-serif"],
        mono: ["var(--font-space-mono)", "monospace"],
      },
      borderRadius: {
        none: "0px",
        sm: "0px",
        DEFAULT: "0px",
        md: "0px",
        lg: "0px",
        xl: "0px",
        "2xl": "0px",
        "3xl": "0px",
        full: "0px",
      },
      letterSpacing: {
        tighter: "-0.05em",
        tight: "-0.025em",
        normal: "0em",
        wide: "0.05em",
        wider: "0.1em",
        widest: "0.2em",
        editorial: "0.25em",
      },
    },
  },
  plugins: [],
};
