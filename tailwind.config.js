/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        dolphin: {
          sidebar: '#0f172a',
          navy:    '#1e3a5f',
          bg:      '#f8fafc',
          console: '#0d1b2a',
          muted:   '#64748b',
          border:  '#e2e8f0',
        }
      }
    }
  },
  plugins: [],
}