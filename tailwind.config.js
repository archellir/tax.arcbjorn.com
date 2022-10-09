/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'plex-mono': ['IBMPlexMono', 'Courier New', 'Courier', 'monospace'],
        'plex-sans': ['IBMPlexSans', 'sans-serif', 'sans'],
      },

      animation: {
        appear: 'fadeIn 1s ease-in-out',
      },

      keyframes: () => ({
        fadeIn: {
          '0%': { opacity: 0 },
          '100%': { opacity: 100 },
        },
      }),
    },
  },
  plugins: [],
};
