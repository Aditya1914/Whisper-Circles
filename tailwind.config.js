/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      // your custom theming here
    },
  },
  plugins: [
    // e.g. require('@tailwindcss/forms')
  ],
};
