/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        background: '#F8F6F1',
        forest: '#1B4332',
        sage: '#95D5B2',
        'burnt-orange': '#C0582B',
        'deep-brown': '#7F1D1D',
        'text-primary': '#222222',
        nonveg: '#8B1E1E',
      },
      fontFamily: {
        heading: ['Playfair Display', 'serif'],
        body: ['Inter', 'sans-serif'],
      },
      maxWidth: {
        container: '1200px',
      },
      borderRadius: {
        card: '12px',
      },
      animation: {
        'scroll-left': 'scroll-left 20s linear infinite',
        'scroll': 'scroll 20s linear infinite',
      },
      keyframes: {
        'scroll-left': {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
        scroll: {
          '0%': { transform: 'translateX(0)' },
          '100%': { transform: 'translateX(-50%)' },
        },
      },
    },
  },
  plugins: [],
}
