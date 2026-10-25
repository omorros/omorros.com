import type { Config } from 'tailwindcss'

// Type scale and grays follow samselikoff.com. Letter spacing per size comes
// from his formula: -0.0223 + 0.185 * exp(-0.1745 * px), in rem.
const config: Config = {
  darkMode: 'class',
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    screens: {
      xs: '375px',
      smm: '425px',
      sm: '640px',
      md: '768px',
      lg: '1024px',
      xl: '1280px',
    },
    fontSize: {
      xxs: ['0.625rem', { letterSpacing: '0.01rem' }],
      xs: ['0.75rem', { letterSpacing: '0.0005rem' }],
      sm: ['0.875rem', { letterSpacing: '-0.0063rem' }],
      base: ['1rem', { letterSpacing: '-0.011rem' }],
      lg: ['1.125rem', { letterSpacing: '-0.0143rem' }],
      xl: ['1.25rem', { letterSpacing: '-0.0167rem' }],
      '2xl': ['1.5rem', { letterSpacing: '-0.0195rem' }],
      '2-5xl': ['1.6875rem', { letterSpacing: '-0.0206rem' }],
      '3xl': ['1.875rem', { letterSpacing: '-0.0213rem' }],
      '4xl': ['2.25rem', { letterSpacing: '-0.022rem' }],
      '5xl': ['3rem', { letterSpacing: '-0.0223rem' }],
      '6xl': ['4rem', { letterSpacing: '-0.0223rem' }],
      '7xl': ['5rem', { letterSpacing: '-0.0223rem' }],
      '8xl': ['6rem', { letterSpacing: '-0.0223rem' }],
    },
    extend: {
      colors: {
        'black-85': 'rgba(0,0,0,0.85)',
        // Grays and surfaces live in CSS variables (globals.css) so night
        // mode can flip them in one place.
        gray: Object.fromEntries(
          [50, 100, 200, 300, 400, 500, 600, 700, 800, 900].map((n) => [
            n,
            `rgb(var(--gray-${n}) / <alpha-value>)`,
          ]),
        ),
        surface: 'rgb(var(--surface) / <alpha-value>)',
        background: {
          DEFAULT: 'rgb(var(--background) / <alpha-value>)',
          soft: 'rgb(var(--background-soft) / <alpha-value>)',
        },
        foreground: {
          DEFAULT: 'rgb(var(--foreground) / <alpha-value>)',
          muted: 'rgb(var(--foreground-muted) / <alpha-value>)',
          faint: 'rgb(var(--foreground-faint) / <alpha-value>)',
        },
        border: {
          DEFAULT: 'rgb(var(--border) / <alpha-value>)',
          soft: 'rgb(var(--border-soft) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'rgb(var(--accent) / <alpha-value>)',
        },
      },
      fontFamily: {
        sans: ['var(--font-inter)', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      lineHeight: {
        tighter: '1.15',
      },
      maxWidth: {
        measure: '34em',
      },
      borderWidth: {
        3: '3px',
      },
      // The prize ticker: the list is rendered twice, so -50% loops seamlessly.
      keyframes: {
        ticker: { to: { transform: 'translateX(-50%)' } },
      },
      animation: {
        ticker: 'ticker 38s linear infinite',
      },
    },
  },
  plugins: [],
}
export default config
