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
          light: "#43B0DB",
          DEFAULT: "#1C7293",
          dark: "#0D3545",
        },
        secondary: {
          light: "#F7A5A1",
          DEFAULT: "#EF3E36",
          dark: "#BD180F",
        },
        accent: {
          light: "#F4F3EE",
          DEFAULT: "#BCB8B1",
          dark: "#2E282A",
        },
      },
      variants: {
        extend: {},
      },
      plugins: [],
    },
  },
};
