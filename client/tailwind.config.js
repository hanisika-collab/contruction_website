/** @type {import('tailwindcss').Config} */
export default {
  
  content: [ "./index.html","./index.html", "./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        primary: "#0B0F14",
        surface: "#111820",
        surface2: "#17212B",
        accent: "#D6A84F",
        secondary: "#F5EFE3",
        muted: "rgba(245,239,227,0.55)",
        border: "rgba(245,239,227,0.10)",
        
      },
      fontFamily: {
        display: ["Cormorant Garamond", "serif"],
        ui: ["Syne", "sans-serif"],
        body: ["DM Sans", "sans-serif"],
      },
    },
  },
  plugins: [],
};