/** @type {import('tailwindcss').Config} */
export default {
    content: [
      "./src/**/*.{js,jsx,ts,tsx}",
    ],
    theme: {
      extend: {
        backgroundColor: {
          'primary-color': '#F5F5F5',
          'border-color': '#F7BAF8',
          'secondary-color': '#121212',
        },
        colors: {
          'primary-color': '#F5F5F5',
          'secondary-color': '#121212',
        },
      },
    },
    plugins: [],
  }
  