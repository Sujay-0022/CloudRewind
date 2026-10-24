/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#09090b', // zinc-950
        surface: '#121214',    // slightly lighter than background
        'surface-hover': '#27272a', // zinc-800
        border: '#27272a',     // zinc-800
        primary: '#fafafa',    // zinc-50
        muted: '#a1a1aa',      // zinc-400
        accent: '#3b82f6',     // professional blue
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      boxShadow: {
        'surface': '0 1px 2px 0 rgba(0, 0, 0, 0.05), inset 0 1px 0 0 rgba(255, 255, 255, 0.05)',
      }
    },
  },
  plugins: [],
}
