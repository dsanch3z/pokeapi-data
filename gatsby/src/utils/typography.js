import Typography from "typography"

const typography = new Typography({
  baseFontSize: "14px",
  bodyFontFamily: [
    "-apple-system",
    "BlinkMacSystemFont",
    "Segoe UI",
    "Roboto",
    "Helvetica",
    "Arial",
    "sans-serif",
    "Apple Color Emoji",
    "Segoe UI Emoji",
    "Segoe UI Symbol",
  ],
  overrideStyles: () => ({
    h1: {
      fontWeight: 400,
      fontSize: "32px",
      lineHeight: "42px",
    },
    h2: {
      fontWeight: 400,
      fontSize: "24px",
    },
    h3: {
      fontWeight: "bold",
      fontSize: "24px",
    },
    h4: {
      fontWeight: "bold",
      fontSize: "16px",
    },
    p: {
      fontWeight: 400,
      fontSize: "14px",
      lineHeight: "24px",
    },
  }),
})

export default typography
