/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      colors: {
        gallery: "#eeeeee",
        silver_chalice: "#afafaf",
        sushi: "#7FAD39",
        mercury: "#E2E2E2",
        wild_sand: "#F5F5F5",
        cod_gray: "#1C1C1C",
        dark_charcoal: "#3330305d",
        buttercup: "#EDBB0E",
        catskill_white: "#F3F6FA",
        raisin_black: "#2422228A",
        iron: "#D0D2D6",
        malibu: "#6699FF",
        dune: "#38303033",
      },
    },
    screens: {
      xl: { max: "1200px" },
      lg: { max: "1080px" },
      "md-lg": { max: "991px" },
      md: { max: "768px" },
      sm: { max: "576px" },
      xs: { max: "480px" },
      "2xs": { max: "340px" },
    },
  },
  plugins: [],
};
