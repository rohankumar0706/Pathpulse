/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  '#f0f9ff',
          100: '#e0f2fe',
          200: '#b9e6fe',
          300: '#7cd4fd',
          400: '#36bbf7',
          500: '#0ba1e2',
          600: '#0081c2',
          700: '#0168a0',
          800: '#065985',
          900: '#0b4a6f',
          950: '#082f49',
        },
        surface: {
          DEFAULT: '#0f1117',
          secondary: '#161b27',
          tertiary:  '#1e2533',
          border:    '#2a3245',
        },
        accent: {
          green:  '#00d68f',
          orange: '#ff8c42',
          purple: '#a78bfa',
          red:    '#f87171',
        },
      },
      fontFamily: {
        sans:    ['Syne', 'system-ui', 'sans-serif'],
        mono:    ['JetBrains Mono', 'monospace'],
        display: ['Cabinet Grotesk', 'Syne', 'sans-serif'],
      },
      animation: {
        'fade-in':       'fadeIn 0.4s ease-out',
        'slide-up':      'slideUp 0.5s cubic-bezier(0.16,1,0.3,1)',
        'pulse-slow':    'pulse 3s ease-in-out infinite',
        'glow':          'glow 2s ease-in-out infinite alternate',
        'spin-slow':     'spin 8s linear infinite',
      },
      keyframes: {
        fadeIn:  { from: { opacity: 0 }, to: { opacity: 1 } },
        slideUp: { from: { opacity: 0, transform: 'translateY(20px)' }, to: { opacity: 1, transform: 'translateY(0)' } },
        glow:    { from: { boxShadow: '0 0 10px #0ba1e240' }, to: { boxShadow: '0 0 25px #0ba1e280' } },
      },
      backgroundImage: {
        'grid-pattern': "linear-gradient(rgba(11,161,226,0.03) 1px, transparent 1px), linear-gradient(90deg, rgba(11,161,226,0.03) 1px, transparent 1px)",
        'hero-glow':    'radial-gradient(ellipse 80% 50% at 50% -20%, rgba(11,161,226,0.15), transparent)',
      },
      backgroundSize: {
        'grid': '40px 40px',
      },
    },
  },
  plugins: [],
}
