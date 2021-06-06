module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      fontFamily: {
        sans: ['Roboto', 'sans-serif'],
      },
      colors: {
        success: {
          lightest: "#cdeae1",
          lighter: "#82cbb4",
          light: "#37ab87",
          DEFAULT: "#059669",
          dark: "#04694a",
          darker: "#023c2a",
          darkest: "#000f0a",
        },
        error: {
          lightest: "#f8d4d4",
          lighter: "#ee9393",
          light: "#e35151",
          DEFAULT: "#DC2626",
          dark: "#9a1b1b",
          darker: "#580f0f",
          darkest: "#160404",
        },
        primary: {
          lightest: "#d2e3e9",
          lighter: "#8eb9c9",
          light: "#498ea9",
          DEFAULT: "#1C7293",
          dark: "#145067",
          darker: "#0b2e3b",
          darkest: "#030b0f",
        },
        secondary: {
          lightest: "#fcd8d7",
          lighter: "#f79f9b",
          light: "#f2655e",
          DEFAULT: "#EF3E36",
          dark: "#a72b26",
          darker: "#601916",
          darkest: "#180605",
        },
        accent: {
          lightest: "#f2f1ef",
          lighter: "#dedcd8",
          light: "#c9c6c1",
          DEFAULT: "#BCB8B1",
          dark: "#84817c",
          darker: "#4b4a47",
          darkest: "#131212",
        },
      },
      variants: {
        extend: {},
      },
      plugins: [],
    },
  },
};
