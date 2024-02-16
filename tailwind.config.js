/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        texgyreheros_regular: ["texgyreheros-regular", "sans-serif"],
        mono_lite: ["mono-lite-regular", "monospace"],
      },
      animation: {
        "infinite-scroll": "infinite-scroll 200s linear infinite",
      },
      keyframes: {
        "infinite-scroll": {
          from: { transform: "translateX(0)" },
          to: { transform: "translateX(-100%)" },
        },
      },
    },
  },
  plugins: [],
};
