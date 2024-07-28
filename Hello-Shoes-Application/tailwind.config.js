/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./public/**/*.{html,js}","**.{html,js}"],
  theme: {
    boxShadow: {
      custom:"rgba(0, 0, 0, 0.24) 0px 3px 8px;"
    },
    extend: {
      fontFamily: {
        "Roboto": ["Roboto", "sans-serif"],
      },
    },
  },
  plugins: [],
}