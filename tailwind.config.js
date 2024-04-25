/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    fontFamily: {
      sans: 'Roboto Mono, monospace',
    },
    extend: {
      height: {
        screen: '100dvh',
      },
      colors: {
        tahiti: {
          100: '#cdf0f6',
          200: '#9be2ee',
          300: '#6ad3e5',
          400: '#38c5dd',
          500: '#06b6d4',
          600: '#0592aa',
          700: '#046d7f',
          800: '#024955',
          900: '#01242a',
        },
        lilac: {
          100: '#f4ecf4',
          200: '#e9dae9',
          300: '#dec7de',
          400: '#d3b5d3',
          500: '#c8a2c8',
          600: '#a082a0',
          700: '#786178',
          800: '#504150',
          900: '#282028',
        },
      },
    },
  },
  plugins: [],
};
