/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      maxWidth: {
        '1366': '1366px'  // Add custom width for 1366px
      },
      spacing: {
        '1366': '1366px'  // Optional, if you want to use the same dimension for other spacing utilities
      }
    },
  },
  plugins: [],
}