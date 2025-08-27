/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        'inter-tight': ['InterTight', 'Inter', 'system-ui', 'sans-serif'],
        'sans': ['InterTight', 'Inter', 'system-ui', 'sans-serif'],
      },
      colors: {
        'primary-green': '#379751',
        'bright-green': '#3EFF71', 
        'whatsapp-green': '#25D366',
        'dark-green': '#020E05',
        'light-gray': '#F5F5F5',
        'pure-white': '#FFFFFF',
        'pure-black': '#000000',
      },
    },
  },
  plugins: [],
}

