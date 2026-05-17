import type { Config } from 'tailwindcss'
import animate from 'tailwindcss-animate'

export default <Partial<Config>>{
  darkMode: ['class'],
  content: [
    './app.vue',
    './components/**/*.{vue,js,ts}',
    './composables/**/*.{js,ts}',
    './features/**/*.{vue,js,ts}',
    './layouts/**/*.vue',
    './pages/**/*.vue',
    './utils/**/*.{js,ts}'
  ],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: '1rem',
        sm: '1.5rem',
        lg: '2rem'
      },
      screens: {
        '2xl': '1180px'
      }
    },
    extend: {
      screens: {
        tall: { raw: '(min-height: 860px)' }
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))'
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))'
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))'
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))'
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))'
        }
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif']
      },
      boxShadow: {
        glow: '0 0 80px rgba(72, 121, 255, 0.20)',
        line: 'inset 0 1px 0 rgba(255,255,255,0.08)'
      },
      backgroundImage: {
        grid: 'linear-gradient(rgba(255,255,255,0.045) 1px, transparent 1px), linear-gradient(90deg, rgba(255,255,255,0.045) 1px, transparent 1px)',
        'hero-radial': 'radial-gradient(circle at 46% 0%, rgba(94, 154, 255, 0.24), transparent 38%), radial-gradient(circle at 86% 18%, rgba(251, 146, 60, 0.14), transparent 30%)'
      },
      keyframes: {
        'border-flow': {
          '0%, 100%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' }
        },
        'pulse-line': {
          '0%, 100%': { opacity: '0.32', transform: 'scaleX(0.72)' },
          '50%': { opacity: '0.9', transform: 'scaleX(1)' }
        }
      },
      animation: {
        'border-flow': 'border-flow 8s ease infinite',
        'pulse-line': 'pulse-line 3.8s ease-in-out infinite'
      }
    }
  },
  plugins: [animate]
}
