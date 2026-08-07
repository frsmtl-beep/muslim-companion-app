module.exports = {
  content: ['./app/**/*.{js,jsx,ts,tsx}', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#e8f0fb',
          100: '#c5d8f5',
          200: '#9dbdee',
          300: '#73a1e7',
          400: '#508ce2',
          500: '#2c77dd',
          600: '#1a5fba',
          700: '#1a3a5c',
          800: '#122845',
          900: '#0a1830',
        },
        accent: {
          50: '#e8f5e9',
          100: '#c8e6c9',
          200: '#a5d6a7',
          300: '#81c784',
          400: '#66bb6a',
          500: '#4caf50',
          600: '#388e3c',
          700: '#2e7d32',
          800: '#1b5e20',
          900: '#0d3010',
        },
      },
      fontFamily: {
        arabic: ['Amiri', 'serif'],
      },
    },
  },
  plugins: [],
};
