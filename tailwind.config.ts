// tailwind.config.js
module.exports = {
  content: [
    './src/**/*.{js,jsx,ts,tsx}',
    './src/css/**/*.css',
  ],
  theme: {
    extend: {
      transitionProperty: {
        'all': 'all',
      }
    },
  },
  plugins: [require('tailwindcss-motion')],
}