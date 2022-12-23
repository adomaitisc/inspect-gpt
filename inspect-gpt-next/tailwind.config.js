/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        gpt: {
          100: "#F9F9F9",
          200: "#1A8975",
          300: "#296254",
          400: "#33524D",
          500: "#1D3531",
          600: "#183929",
        },
      },
    },
  },
  plugins: [],
};
