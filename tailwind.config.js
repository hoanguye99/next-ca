module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      keyframes: {
        opacity: {
          '0%': { opacity: 0 },
          '100%': { opacity: 0.4 },
        },
        popup: {
          '0%': { opacity: 0, marginTop: -12 },
          '100%': { opacity: 1, marginTop: 0 },
        },
      },
      animation: {
        opacity: 'opacity 0.3s ease-in-out',
        popup: 'popup 0.3s ease-in-out',
      },
      colors: {
        blue: {
          primary: '#2c7be5',
          hover: '#1a68d1',
          focus: '#1862c6',
        },
        gray: {
          primary: '#95aac9',
          secondary: '#d2ddec',
          table: '#f9fbfd',
        },
      },
    },
    container: {
      center: true,
      padding: {
        DEFAULT: '0.5rem',
        lg: '4rem',
      },
    },
  },
  plugins: [],
}
