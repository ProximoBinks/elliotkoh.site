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
        'xs': '0px',
        'sm': '640px',     // Small screens (default)
        'md': '768px',     // Medium screens (default)
        'lg': '1024px',    // Large screens (default)
        'xl': '1280px',    // Extra large screens (default)
        '2xl': '1400px',   // Custom breakpoint for larger screens
        '3xl': '1920px',   // Custom breakpoint for larger screens
      },
      fontSize: {
        'h1': '2.5rem',     // Customize the 'h1' font size
        'h2': '2rem',       // Customize the 'h2' font size
        'h3': '1.75rem',    // Customize the 'h3' font size
        'h4': '1.5rem',     // Customize the 'h4' font size
        'h5': '1.25rem',    // Customize the 'h5' font size
        'h6': '1.3rem',       // Customize the 'h6' font size
        'display-3': '4rem', // Customize the 'text-display-3' font size
      },
      colors: {
        'secondary-50': '#000000', // Add your custom color code
        'secondary-100': '#6b645c', // Add your custom color code
      },
    },
  },
  variants: {},
  plugins: [],
}
