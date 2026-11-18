/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        canvas: "#FFFFFF",
        "paper-beige": "#F7F5EE",
        "paper-ruled": "#EAE5D8",
        "ink-black": "#000000",
        "accent-teal": "#00C2CB",
        "accent-magenta": "#FF00FF",
        "accent-yellow": "#FFE600",
        "accent-red": "#FF3E1D",
        "accent-green": "#10B981",
        "accent-purple": "#8B5CF6",
      },
      boxShadow: {
        "brut-sm": "2px 2px 0px 0px #000000",
        "brut": "4px 4px 0px 0px #000000",
        "brut-lg": "8px 8px 0px 0px #000000",
        "brut-xl": "12px 12px 0px 0px #000000",
        "brut-teal": "4px 4px 0px 0px #00C2CB",
        "brut-yellow": "4px 4px 0px 0px #FFE600",
        "brut-magenta": "4px 4px 0px 0px #FF00FF",
      },
      fontFamily: {
        mono: ["var(--font-mono)", "JetBrains Mono", "monospace"],
        sans: ["var(--font-sans)", "Plus Jakarta Sans", "sans-serif"],
        display: ["var(--font-display)", "Space Grotesk", "sans-serif"],
      },
    },
  },
  plugins: [],
};
