import type { Config } from 'tailwindcss';

export default {
  content: [
    './src/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          orange: '#ff7a00',
          black: '#0b0b0f'
        }
      }
    }
  },
  plugins: [],
} satisfies Config;
