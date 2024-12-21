/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors:{
        primary: '#143458',
        secondary: '#0AACA4',
        myBlue: '#001E40',
        offWhite: '#FAF8F7',
      },
      fontFamily: {
        'aleo': ['Aleo', 'sans-serif'],
        'poppins': ['Poppins', 'sans-serif'],
      },
    },
  },
  plugins: [],
}

