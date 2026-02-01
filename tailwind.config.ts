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
        foreground: {
          DEFAULT: 'rgba(242, 242, 242, 0.95)',
          muted: 'rgba(242, 242, 242, 0.8)',
          dim: 'rgba(242, 242, 242, 0.6)',
          faint: 'rgba(242, 242, 242, 0.5)',
        },
        glass: {
          DEFAULT: 'rgba(255, 255, 255, 0.05)',
          border: 'rgba(255, 255, 255, 0.1)',
          hover: 'rgba(255, 255, 255, 0.08)',
          'hover-border': 'rgba(255, 255, 255, 0.2)',
          highlight: 'rgba(255, 255, 255, 0.03)',
        },
        'accent-glass': {
          DEFAULT: 'rgba(144, 202, 249, 0.08)',
          border: 'rgba(144, 202, 249, 0.2)', // fixed from 0.3 based on context usage
          strong: 'rgba(144, 202, 249, 0.3)',
        }
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
