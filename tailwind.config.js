const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  purge: [
    './src/*.ts',
    './public/**/*.html',
  ],
  darkMode: false,
  theme: {
    fontFamily: {
      sans: ['SF Pro Text', ...defaultTheme.fontFamily.sans],
    },
    extend: {},
  },
  variants: {
    extend: {},
  },
  plugins: [],
}
