/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./src/**/*.{html,js,ts,tsx,jsx}'],
  theme: {
    extend: {
      backgroundImage: {
        background: "url('./src/assets/images/background.png')",
      },
    },
  },
  plugins: [],
};
