/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        "primary-color":"#003399",
        "secondary-color":"#EAF0F1"
      }
    },
  },
  plugins: [],
}