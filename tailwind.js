module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js}'],
  darkMode: 'class', // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        wheel: {
          0: '#6A6180',
          25: '#b6b4bb',
          50: '#F0F0F7',
          100: '#DBCDFF',
          150: '#D4C2FF',
          200: '#bba1ff',
          300: '#a988ff',
          400: '#8e4af8',
          450: '#7246c8',
          500: '#5b4292',
          600: '#32264D',
          700: '#202024',
          800: '#18181B'
        }
      }
    }
  },
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
