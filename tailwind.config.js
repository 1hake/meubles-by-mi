// tailwind config file for typescript

module.exports = {
  purge: {
    content: [
      './src/**/*.html',
      './src/**/*.tsx',
      './src/**/*.ts',
      './src/**/*.jsx',
      './src/**/*.js'
    ],
    options: {}
  },
  darkMode: 'class',
  theme: {
    extend: {
      colors: {},
      backgroundImage: (theme) => ({
        'light-logo': "url('https://firebasestorage.googleapis.com/v0/b/meublesbymi.appspot.com/o/products%2Flightlogo.png?alt=media&token=bc4ba26b-070a-47f8-958e-d7088f08995d&_gl=1*as6whc*_ga*MzU2MjM5NjQwLjE2OTg4NzgyNDE.*_ga_CW55HF8NVT*MTY5OTMxMTA2MS41LjEuMTY5OTMxMTU0NS40LjAuMA..')",
        'dark-logo': "url('https://firebasestorage.googleapis.com/v0/b/meublesbymi.appspot.com/o/products%2Fdarklogo.png?alt=media&token=539837b9-16a9-4ca8-9f9a-09abe552dee3&_gl=1*1cjbwox*_ga*MzU2MjM5NjQwLjE2OTg4NzgyNDE.*_ga_CW55HF8NVT*MTY5OTMxMTA2MS41LjEuMTY5OTMxMTgwNS42MC4wLjA.')"
      })
    }
  },
  variants: {
    extend: {
      backgroundImage: ['dark']
    }
  }
}
