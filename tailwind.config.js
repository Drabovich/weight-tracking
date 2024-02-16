/** @type {import('tailwindcss').Config} */

export default {
  content: [
    "./index.html",
    "./src/**/*.{vue,js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'custom-dark': '#262626',
        'custom-grey': '#404040',
        'custom-blue': '#4cc4d1',
      },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
    },
  }
}