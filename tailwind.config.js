/** @type {import('tailwindcss').Config} */
export default {
  content: [
    './resources/**/*.edge',
    './resources/**/*.{js,ts,jsx,tsx,vue}',
    './inertia/**/*.{js,ts,jsx,tsx,vue}',
  ],
  darkMode: 'class',
  theme: {
    extend: {
      fontFamily: {
        ubuntu: ['Ubuntu', 'sans-serif'],
      },
    },
  },
  plugins: [],
}
