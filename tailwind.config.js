module.exports = {
  mode: "jit",
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      width: {
        mb: "1.625rem",
        "500px": "31.25rem",
      },
      height: {
        mb: "1.625rem",
      },
      transitionProperty: {
        height: "height",
      },
      keyframes: {
        searchBoxShrink: {
          "0%": {
            width: "848px",
            height: "64px",
          },
          "100%": {
            width: "300px",
            height: "48px",
          },
        },
        searchBoxGrow: {
          "0%": {
            width: "300px",
            height: "48px",
          },
          "100%": {
            width: "848px",
            height: "64px",
          },
        },
        mainTabShrink: {
          "0%": {
            width: "100%",
          },
          "100%": {
            width: "0%",
            height: "0%",
          },
        },
      },
      animation: {
        searchBoxShrink: "searchBoxShrink 0.5s ease-out",
        searchBoxGrow: "searchBoxGrow 0.5s ease-out",
        mainTabShrink: "mainTabShrink 0.5s ease-out",
      },
    },
    screens: {
      sm: "640px",
      // => @media (min-width: 640px) { ... }

      md: "740px",
      // => @media (min-width: 768px) { ... }

      lg: "1024px",
      // => @media (min-width: 1024px) { ... }

      bp: "1130px",
      //for airbnb detail page breakpoint

      xl: "1280px",
      // => @media (min-width: 1280px) { ... }
    },
  },
  plugins: [],
};
