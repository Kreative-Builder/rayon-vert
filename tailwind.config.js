/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        teal: {
          DEFAULT: '#2DBFA6',
          light: '#3ED4BA',
          dark: '#1A9E8A',
        },
        caramel: {
          DEFAULT: '#6B5640',
          light: '#8A7057',
          dark: '#4E3D2C',
        },
        cream: {
          DEFAULT: '#F0EAD6',
          light: '#FAF7F0',
          dark: '#D8CEBC',
        },
        obsidian: {
          DEFAULT: '#0C0B09',
          100: '#141210',
          200: '#1C1A17',
          300: '#262320',
          400: '#332F2A',
        },
      },
      fontFamily: {
        elsie: ['Elsie', 'Georgia', 'serif'],
        cormorant: ['Cormorant Garamond', 'Georgia', 'serif'],
        jost: ['Jost', 'system-ui', 'sans-serif'],
      },
      letterSpacing: {
        'widest-xl': '0.3em',
        'widest-2xl': '0.45em',
      },
      animation: {
        'fade-up': 'fadeUp 0.8s ease-out forwards',
        'fade-in': 'fadeIn 1.2s ease-out forwards',
        'line-grow': 'lineGrow 1s ease-out forwards',
        'shimmer': 'shimmer 3s ease-in-out infinite',
      },
      keyframes: {
        fadeUp: {
          '0%': { opacity: '0', transform: 'translateY(30px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        lineGrow: {
          '0%': { transform: 'scaleX(0)', transformOrigin: 'left' },
          '100%': { transform: 'scaleX(1)', transformOrigin: 'left' },
        },
        shimmer: {
          '0%, 100%': { opacity: '0.4' },
          '50%': { opacity: '0.8' },
        },
      },
    },
  },
  plugins: [],
}
