
/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        rose: {
          50: '#fff1f2',
          100: '#ffe4e6',
          200: '#fecdd3',
          300: '#fda4af',
          400: '#fb7185',
          500: '#f43f5e',
          600: '#e11d48',
          700: '#be123c',
          800: '#9f1239',
          900: '#881337',
        },
      },
      fontFamily: {
        romantic: ['Playfair Display', 'serif'],
        script: ['Dancing Script', 'cursive'],
        sans: ['Inter', 'sans-serif'],
      },
      animation: {
        'bounce-short': 'bounce 1s ease-in-out 2',
        'pop': 'pop 0.15s ease-out',
        'fadeIn': 'fadeIn 0.8s cubic-bezier(0.16, 1, 0.3, 1) forwards',
      },
    },
  },
  plugins: [],
}
