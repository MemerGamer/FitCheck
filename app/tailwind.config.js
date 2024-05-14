/** @type {import('tailwindcss').Config} */
module.exports = {
  // NOTE: Update this to include the paths to all of your component files.
  content: [
    "./App.{js,jsx,ts,tsx}",
    "./components/**/*.{js,jsx,ts,tsx}",
    "./contexts/**/*.{js,jsx,ts,tsx}",
    "./screens/**/*.{js,jsx,ts,tsx}",
    "./partials/**/*.{js,jsx,ts,tsx}"
  ],
  presets: [require("nativewind/preset")],
  theme: {
    extend: {
      height: {
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '10': '2.5rem',
        '12': '3rem',
      },
      width: {
        '3': '0.75rem',
        '4': '1rem',
        '5': '1.25rem',
        '10': '2.5rem',
      },
    }, 
  },
  plugins: [],
}