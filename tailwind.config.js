/** @type {import('tailwindcss').Config} */
module.exports = {
  darkMode: 'class',
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'plex-mono': ['IBMPlexMono', 'Courier New', 'Courier', 'monospace'],
        'plex-sans': ['IBMPlexSans', 'sans-serif', 'sans'],
      },

      animation: {
        appear: 'fadeIn 1s ease-in-out',
        'theme-fade': 'themeFade 1.5s ease-in-out',
      },

      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
        themeFade: {
          '0%': { opacity: 0.5 },
          '100%': { opacity: 1 },
        },
      }),
    },
  },
  plugins: [],
};
