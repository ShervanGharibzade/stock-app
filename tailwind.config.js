/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "src/**/*{html,js,jsx}"
  ],
  theme: {
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic':
          'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
      keyframes: {
        wiggle: {
          '0%, 100%': { backgroundColor: 'red' },
          '50%': { backgroundColor: 'blue' },
        }
      }
    },
  },
  plugins: [],
}
