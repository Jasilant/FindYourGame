/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      keyframes: {
        'fade-in': { '0%': {opacity:0}, '100%': {opacity:1} },
        'slide-up': { '0%': {opacity:0, transform:'translateY(8px)'}, '100%': {opacity:1, transform:'translateY(0)'} },
        'pop': { '0%': {transform:'scale(.96)'}, '100%': {transform:'scale(1)'} }
      },
      animation: {
        'fade-in': 'fade-in .35s ease-out both',
        'slide-up': 'slide-up .45s ease-out both',
        'pop': 'pop .18s ease-out both'
      }
    }
  },
  plugins: [],
};
