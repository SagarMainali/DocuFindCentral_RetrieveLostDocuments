/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'primary-dark': '#5B6BA1',
        'secondary-dark': '#333A56',
        'primary-light': '#EEEFEE'
      },
      screens: {
        'xsm': '400px',
        'sm': '640px',
        'md': '768px',
        'lg': '1024px',
        'xl': '1280px',
        '2xl': '1500px'
      }
    },
    plugins: [],
  }
}