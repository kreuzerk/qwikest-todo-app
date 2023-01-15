/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      backgroundImage: {
        'mountains': 'url(mountains.avif)'
      }
    },
  },
  plugins: [],
};
