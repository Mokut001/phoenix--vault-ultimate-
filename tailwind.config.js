/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        phoenix: {
          light: '#ff8a5c',
          DEFAULT: '#ff4d00',
          dark: '#cc3d00',
        },
        dark: '#050505',
        card: '#0f0f0f'
      },
      backgroundImage: {
        'phoenix-gradient': 'linear-gradient(135deg, #ff4d00 0%, #ff8a5c 100%)',
      },
    },
  },
  plugins: [],
}