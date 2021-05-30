module.exports = {
  mode: "jit",
  purge: ["./pages/**/*.{js,ts,jsx,tsx}", "./components/**/*.{js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {
      colors: {
        success: {
          light: "#ECFDF5",
          DEFAULT: "#059669",
        },
        error: {
          light: "#FEF2F2",
          DEFAULT: "#DC2626",
        },
        primary: {
          lighter: "#d2a59f",
          light: "#b66e65",
          DEFAULT: "#A44A3F",
          dark: "#73342c",
          darker: "#421e19",
        },
        secondary: {
          lighter: "#fbfae9",
          light: "#f8f6db",
          DEFAULT: "#f6f4d2",
          dark: "#acab93",
          darker: "#626254",
        },
        accent: {
          light: "#7a7d7c",
          DEFAULT: "#383d3b",
          dark: "#222725",
        },
      },
      variants: {
        extend: {},
      },
      plugins: [],
    },
  },
};
