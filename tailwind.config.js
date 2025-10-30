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
      colors: {
        primary: '#000000',
        secondary: '#979797',
        muted: '#9D9D9D',
        surface: '#F7F7F7',
        'surface-muted': '#ECECEC',
        border: '#F5F5F5',
        overlay: '#1A1A1A',
      },
      fontSize: {
        heading: ['24px', { lineHeight: '32px' }],
        body: ['16px', { lineHeight: '24px' }],
        label: ['14px', { lineHeight: '20px' }],
        caption: ['12px', { lineHeight: '18px' }],
      },
      opacity: {
        65: '0.65',
      },
    },
  },
  plugins: [],
}
