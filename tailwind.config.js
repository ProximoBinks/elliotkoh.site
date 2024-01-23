/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx}",
    "./components/**/*.{js,ts,jsx,tsx}",
    // Add other directories and file types as needed
  ],
  theme: {
    extend: {
      screens: {
        'xs': '639px',
        'sm': '640px',     // Small screens (default)
        'md': '768px',     // Medium screens (default)
        'lg': '1024px',    // Large screens (default)
        'xl': '1280px',    // Extra large screens (default)
        '2xl': '1536px',   // Custom breakpoint for larger screens
      },
    },
  },
  variants: {},
  plugins: [],
}