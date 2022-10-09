/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        'plex-mono': ['IBMPlexMono', 'Courier New', 'Courier', 'monospace'],
        'plex-sans': ['IBMPlexSans', 'sans-serif', 'sans'],
      },
    },
  },
  plugins: [],
};
