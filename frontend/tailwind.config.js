/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    colors:{
      'lb':'#b79c7d',
      'blue': '#1fb6ff',
      db:'#a27745'
    },
    fontFamily: {
      sans: ['Graphik', 'sans-serif'],
      serif: ['Merriweather', 'serif'],
    },
    fontSize:{
      'normal':'14px',
      'mid': '24px',
      'xl':'62px'
    },
    extend: {},
  },
  plugins: [],
}

