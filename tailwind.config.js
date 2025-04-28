/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
        serif: ['Merriweather', 'serif'],
      },
      typography: {
        DEFAULT: {
          css: {
            maxWidth: '100%',
            color: '#334155',
            h1: {
              fontFamily: 'Merriweather, serif',
            },
            h2: {
              fontFamily: 'Merriweather, serif',
            },
            h3: {
              fontFamily: 'Merriweather, serif',
            },
          },
        },
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
  plugins: [],
};