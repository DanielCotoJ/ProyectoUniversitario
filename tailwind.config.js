/** @type {import('tailwindcss').Config} */
export default {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          DEFAULT: "#8984D6",
          dark: "#6B5CA7",
          light: "#D9D9E8",
        },
      },
    },
  },
  plugins: [],
};
