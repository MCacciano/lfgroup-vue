module.exports = {
  purge: ['./index.html', './src/**/*.{vue,js,ts,jsx,tsx}', './public/**/*.html', './src/**/*.vue'],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        roboto: ['Roboto', 'sans-serif']
      }
    }
  },
  variants: {
    extend: {}
  },
  plugins: []
};
