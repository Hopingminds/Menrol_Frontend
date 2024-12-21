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
        background: "var(--background)",
        foreground: "var(--foreground)",
      },
      fontFamily: {
        lexend: ['Lexend', 'sans-serif'],
        sans: ["DM Sans", "sans-serif"],
      },
      screens: {
        'xsm': { 'min': '320px', 'max': '630px' },
      },
    },

  },
  plugins: [],
} satisfies Config;
