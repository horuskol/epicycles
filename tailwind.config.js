module.exports = {
  purge: [
    '.src/**/*.vue'
  ],
  darkMode: false, // or 'media' or 'class'
  theme: {
    gridTemplateAreas: {
      'layout': [
        '. .      .',
        '. center controls',
        '. .      controls'
      ],
    },
    gridTemplateColumns: {
      'layout': '1fr 500px 1fr',
    },
    gridTemplateRows: {
      'layout': '1fr 500px 1fr',
    }
  },
  variants: {
    extend: {},
  },
  plugins: [
    require('@savvywombat/tailwindcss-grid-areas')
  ],
}
