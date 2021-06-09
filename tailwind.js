module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: false, // or 'media' or 'class'
  theme: {},
  variants: {
    extend: {
      opacity: ['disabled'],
      scale: ['active'],
      backgroundColor: ['disabled'],
      cursor: ['disabled']
    },
    scrollbar: ['rounded']
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('tailwind-scrollbar')
  ]
}
