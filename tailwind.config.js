/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        parchment: {
          50: '#faf6ec',
          100: '#f2e9d3',
          200: '#e6d3a8',
        },
        ink: '#241f18',
        dragon: {
          red: '#b0332a',
          green: '#1f4d43',
          gold: '#c8a24a',
        },
      },
      fontFamily: {
        display: ['Cinzel', 'serif'],
        body: ['"Crimson Pro"', 'serif'],
      },
      keyframes: {
        'dice-roll': {
          '0%': { transform: 'translateY(0) rotate(0deg)' },
          '15%': { transform: 'translateY(-22px) rotate(-25deg)' },
          '30%': { transform: 'translateY(0) rotate(10deg)' },
          '45%': { transform: 'translateY(-14px) rotate(-15deg)' },
          '60%': { transform: 'translateY(0) rotate(20deg)' },
          '75%': { transform: 'translateY(-8px) rotate(-8deg)' },
          '100%': { transform: 'translateY(0) rotate(0deg)' },
        },
      },
      animation: {
        'dice-roll': 'dice-roll 0.6s ease-in-out',
      },
    },
  },
  plugins: [],
};
