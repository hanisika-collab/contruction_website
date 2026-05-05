/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        accent:   '#00adee',
        accentDark: '#0090c8',
        primary:  '#ffffff',
        surface:  '#f8f9fa',
        surface2: '#eef9fe',
        border:   '#e5e7eb',
        text:     '#111827',
        muted:    '#6b7280',
      },
      fontFamily: {
        display: ['"Cormorant Garamond"', 'serif'],
        ui:      ['Syne', 'sans-serif'],
        body:    ['"DM Sans"', 'sans-serif'],
      },
    },
  },
  plugins: [],
};