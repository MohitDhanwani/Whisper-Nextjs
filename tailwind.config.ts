import type { Config } from "tailwindcss";
const { fontFamily } = require("tailwindcss/defaultTheme");

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        jetbrains: ["var(--font-jetbrains)", ...fontFamily.mono],
        inter: ["var(--font-inter)", ...fontFamily.sans],
        spaceGrotesk: ["var(--font-space-grotesk)", ...fontFamily.sans],
      },
      animation: {
        moveUp : "moveUp 3s ease-in-out infinite",
        moveDown : "moveDown 2s ease-in-out infinite"
      },
      keyframes: {
        moveUp: {
          "0% , 100%": {transform: "translateY(0px)"},
          "50%": {transform: "translateY(15px)"},
        },
      }
    },
  },
  plugins: [],
} satisfies Config;