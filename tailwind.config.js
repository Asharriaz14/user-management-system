/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mainBlue': '#2c3e50',
        'Content': '#1D1D1D',
        'hoverBlue': '#4b5d6f',
        'White': '#FFFFFF',
      }
    },
  },
  plugins: [],
}