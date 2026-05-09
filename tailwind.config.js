/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        vapor: {
          bg: '#04000f',
          pink: '#ff2d78',
          cyan: '#00f0ff',
          purple: '#c400ff',
        },
      },
      fontFamily: {
        sans: ['Rajdhani', 'system-ui', 'sans-serif'],
        display: ['Orbitron', 'system-ui', 'sans-serif'],
        mono: ['Share Tech Mono', 'ui-monospace', 'monospace'],
      },
    },
  },
  plugins: [],
}
