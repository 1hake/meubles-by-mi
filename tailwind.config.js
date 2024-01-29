// tailwind config file for typescript

module.exports = {
  purge: {
    content: ['./src/**/*.html', './src/**/*.tsx', './src/**/*.ts', './src/**/*.jsx', './src/**/*.js'],
    options: {}
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      backgroundImage: (theme) => ({
        'light-logo':
          "url('https://firebasestorage.googleapis.com/v0/b/meublesbymi.appspot.com/o/WHITE_LOGO.png?alt=media&token=0f7c5611-48bd-426c-b9e9-498998dfec82')",
        'dark-logo':
          "url('https://firebasestorage.googleapis.com/v0/b/meublesbymi.appspot.com/o/DARK_LOGO.png?alt=media&token=26c79fec-2c61-4948-9791-217c2d34fcb7')"
      })
    }
  },
  variants: {
    extend: {
      backgroundImage: ['dark']
    }
  }
}
