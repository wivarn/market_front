module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  plugins: [
    require("@tailwindcss/typography"),
    require("@tailwindcss/line-clamp"),
  ],
  theme: {
    extend: {
      backgroundImage: {
        bloghead: "url('/assets/blog-banner.png')",
      },
      fontFamily: {
        sans: ["Nunito", "sans-serif"],
      },
      width: {
        600: "600px",
      },
      height: {
        600: "600px",
        800: "800px",
      },
      colors: {
        success: {
          lightest: "#E6F1ED",
          lighter: "#9BC7B8",
          light: "#4F9C82",
          DEFAULT: "#04724D",
          dark: "#035036",
          darker: "#022E1F",
          darkest: "#000B08",
        },
        error: {
          lightest: "#F8E8E8",
          lighter: "#E3A4A5",
          light: "#CF5F61",
          DEFAULT: "#BA1B1D",
          dark: "#821314",
          darker: "#4A0B0C",
          darkest: "#130303",
        },
        warning: {
          lightest: "#FEF6E7",
          lighter: "#FADCA0",
          light: "#F7C159",
          DEFAULT: "#F3A712",
          dark: "#AA750D",
          darker: "#614307",
          darkest: "#181102",
        },
        info: {
          lightest: "#E6F0F4",
          lighter: "#9BC2D1",
          light: "#5094AF",
          DEFAULT: "#05668D",
          dark: "#044763",
          darker: "#022938",
          darkest: "#000A0E",
        },
        primary: {
          lightest: "#FBEDE9",
          lighter: "#EEB6A9",
          light: "#E18068",
          DEFAULT: "#D44927",
          dark: "#94331B",
          darker: "#551D10",
          darkest: "#150704",
        },
        secondary: {
          lightest: "#FFFDFA",
          lighter: "#FEF8EC",
          light: "#FEF2DE",
          DEFAULT: "#FDEDD0",
          dark: "#B1A692",
          darker: "#655F53",
          darkest: "#191815",
        },
        accent: {
          lightest: "#F7F8F6",
          lighter: "#DFE1DD",
          light: "#C6CBC3",
          DEFAULT: "#AEB4A9",
          dark: "#7A7E76",
          darker: "#464844",
          darkest: "#111211",
        },
      },
    },
  },
};
