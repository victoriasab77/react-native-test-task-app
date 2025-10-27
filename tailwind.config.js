/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./App.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  presets: [require('nativewind/preset')],
  theme: {
    extend: {
      fontFamily: {
        sfregular: ['SFProDisplay-Regular', 'System'],
        abelregular: ['Abel-Regular', 'System'],
      },
    },
  },
  plugins: [],
}
