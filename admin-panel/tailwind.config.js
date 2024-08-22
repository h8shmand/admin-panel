/** @type {import('tailwindcss').Config} */
export default {
  darkMode: "selector",
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      boxShadow: {
        light: "0px 0px 4px 0px rgba(0, 0, 0, 0.6)",
      },
      colors: {
        mainBlue: "#006078",
        darkBody: "#161b22",
        darkHead: "#0d1117",
      },
    },
  },

  plugins: [],
};
