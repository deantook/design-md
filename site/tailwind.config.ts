import type { Config } from 'tailwindcss'

export default {
  content: ['./app/**/*.{ts,tsx}', './components/**/*.{ts,tsx}', './lib/**/*.{ts,tsx}'],
  theme: {
    extend: {
      colors: {
        background: '#000000',
        foreground: '#ededed',
        border: '#1c1c1c',
        'nav-link': '#a1a1aa',
        'muted-fg': '#8a8a8a',
        'muted-soft': '#787878',
      },
      fontFamily: {
        sans: ['var(--font-geist)', 'system-ui', 'sans-serif'],
        mono: ['var(--font-geist-mono)', 'ui-monospace', 'monospace'],
        ascii: ['"Fira Mono"', 'ui-monospace', 'monospace'],
      },
      spacing: {
        'header-h': '56px',
        'row-h': '45px',
        'search-h': '45px',
        'container-max': '1152px',
        'container-px': '32px',
      },
      maxWidth: { container: '1152px' },
    },
  },
  plugins: [],
} satisfies Config
