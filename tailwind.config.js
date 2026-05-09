/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50: '#f7f8f4',
          100: '#e7ead9',
          200: '#cfd7ba',
          300: '#b4c496',
          400: '#95ac6f',
          500: '#7d9156',
          600: '#617143',
          700: '#485534',
          800: '#303923',
          900: '#1a2014',
        },
      },
      fontFamily: {
        sans: ['Manrope', 'system-ui', 'sans-serif'],
        display: ['Sora', 'Manrope', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        soft: '0 12px 40px -18px rgba(18, 24, 38, 0.45)',
      },
    },
  },
  plugins: [],
}
