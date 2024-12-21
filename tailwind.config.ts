import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#ffffff",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        sans: ["DM Sans", "sans-serif"],
      },
      screens: {
        'xsm': { 'min': '320px', 'max': '480px' },
      },
    },

  },
  plugins: [],
} satisfies Config;
