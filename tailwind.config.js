/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "class",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {},

    colors: {
      white: "#ffffff",
      black: "#000000",
      gray: {
        100: "#f3f4f6",
        900: "#111827",
      },
      red: "#ef4444",
      blue: "#3b82f6",
      green: "#10b981",
    },
  },
  plugins: [],
};
