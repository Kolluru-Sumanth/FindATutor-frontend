/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'muted-blue': '#9BA4B4',
        'charcoal-blue': '#394867',
        'midnight-blue': '#14274E',
        'light-mist': '#F1F6F9',
      }
    },
  },
  plugins: [require('tailwind-scrollbar-hide')],
}
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        'primary': '#14274E',
        'secondary': '#394867',
        'tertiary': '#9BA4B4',
        'background': '#F1F6F9',
      },
    },
  },
  plugins: [],
}