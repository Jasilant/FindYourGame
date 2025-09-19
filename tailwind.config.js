/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./app/**/*.{js,ts,jsx,tsx,mdx}","./components/**/*.{js,ts,jsx,tsx,mdx}"],
  theme: {
    extend: {
      keyframes: {
        'menu-in': {
          '0%': { opacity: 0, transform: 'translateY(6px) scale(0.98)' },
          '100%': { opacity: 1, transform: 'translateY(0) scale(1)' }
        },
        'hover-glow': {
          '0%,100%': { boxShadow: '0 0 0 rgba(0,0,0,0)' },
          '50%': { boxShadow: '0 0 24px rgba(251,146,60,0.12)' }
        }
      },
      animation: {
        'menu-in': 'menu-in .18s ease-out both',
        'hover-glow': 'hover-glow 1.6s ease-in-out infinite'
      }
    },
  },
  plugins: [],
};
