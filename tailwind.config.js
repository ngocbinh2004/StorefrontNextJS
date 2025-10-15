import { nextui } from '@nextui-org/theme'

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/common/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '0rem',
        sm: '0rem',
        md: '0rem',
        lg: '2rem',
        xl: '0rem',
      },
      screens: {
        sm: '640px',
        md: '768px',
        lg: '1024px',
        xl: '1200px',
      },
    },
  },
  darkMode: "class",
  plugins: [require('@tailwindcss/typography'), nextui({
    layout: {
      radius: {
        small: "3px",
        medium: "5px",
        large: "7px",
      },
      borderWidth: {
        small: "1px",
        medium: "1px",
        large: "2px",
      }
    },
    themes: {
      light: {
        colors: {
          primary: {
            foreground: "#FFFFFF",
            DEFAULT: "#2f80ed",
          },
        },
      },
    }
  })],
}
