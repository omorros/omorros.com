import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        accent: '#90caf9',
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'system-ui', 'sans-serif'],
      },
      animation: {
        'spin-slow': 'spin 20s linear infinite',
        'bounce-slow': 'bounce-gentle 4s ease-in-out infinite',
      },
      keyframes: {
        'bounce-gentle': {
          '0%, 20%, 100%': { transform: 'translateY(0)' },
          '10%': { transform: 'translateY(1rem)' },
        },
      },
    },
  },
  plugins: [],
}
export default config
