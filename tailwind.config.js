module.exports = {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    colors: {
      white: "#FFFFFF",
      red: {
        100: "#420734",
        200: "#640B37",
        300: "#85103B",
        400: "#A7143E",
        500: "#C81842",
        600: "#D34668",
        700: "#DE748E",
        800: "#E9A3B3",
        900: "#F4D1D9"
      },
      black: "#210330",
      gray: {
        100: "#371C45",
        200: "#4D3559",
        300: "#644F6E",
        400: "#908198",
        500: "#908198",
        600: "#A69AAC",
        700: "#BCB3C1",
        800: "#D3CDD6",
        900: "#E9E6EA"
      }
    },
    fontFamily: {
      sans: ['Nunito', 'sans-serif']
    },
    extend: {},
  },
  plugins: []
}
