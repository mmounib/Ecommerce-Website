/** @type {import('tailwindcss').Config} */
export default {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    extend: {
      backgroundImage: {
        "sign-bg": "url(./src/assets/ecommerce-image.jpg)",
        "sign-in": "url(./src/assets/sign-in.jpg)",
      },
      backgroundColor: {
        "primary-color": "#FFFFFF",
        "border-color": "#F7BAF8",
        "secondary-color": "#121212",
      },
      colors: {
        "primary-color": "#FFFFFF",
        "secondary-color": "#121212",
      },
    },
  },
  plugins: [],
};
