/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        ownBlue1: "#0A0C32",
        ownOrange: "#FB6D3A",
        ownGreen1: "#53FF83",
        ownGreen2: "#00B929",
        ownGreen3: "#128807",
        ownRed1: "#FF4E28",
        ownPurple1: "#B15FE8",
      },

      fontFamily: {
        poppins: ["Poppins", "sans-serif"],
        montserrat: ["Montserrat", "sans-serif"],
        codyStar: ["Codystar", "cursive"],
        wallpoet: ["Wallpoet"],
        bigShoulders: ["Big Shoulders Stencil Display"],
        bungee: ["Bungee Spice"],
        aldrich: ["Aldrich"],
      },
    },
  },
  plugins: [require("@tailwindcss/forms")],
};
