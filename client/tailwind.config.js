/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        customGreen: {
          light: "#D2FF72", // Light Green
          lighter: "#73EC8B", // Lighter Green
          DEFAULT: "#54C392", // Default Green
          dark: "#15B392", // Dark Green
        },
      },
    },
  },
  plugins: [],
};
