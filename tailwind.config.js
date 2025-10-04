/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter', 'system-ui', 'sans-serif'],
        display: ['Space Grotesk', 'Inter', 'system-ui', 'sans-serif'],
        mono: ['JetBrains Mono', 'monospace'],
      },
      colors: {
        // Pure B&W vintage palette
        vintage: {
          black: '#000000',
          white: '#FFFFFF',
          gray: {
            50: '#FAFAFA',
            100: '#F5F5F5',
            200: '#E5E5E5',
            300: '#D4D4D4',
            400: '#A3A3A3',
            500: '#737373',
            600: '#525252',
            700: '#404040',
            800: '#262626',
            900: '#171717',
          }
        },
        // Accent colors for very subtle highlights
        accent: {
          charcoal: '#1A1A1A',
          smoke: '#F8F8F8',
          paper: '#FFFEF7',
        }
      },
      spacing: {
        '18': '4.5rem',
        '22': '5.5rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.6s ease-out',
        'slide-up': 'slideUp 0.5s ease-out',
        'slide-down': 'slideDown 0.5s ease-out',
        'scale-in': 'scaleIn 0.3s ease-out',
        'shimmer': 'shimmer 2s linear infinite',
        'vintage-pulse': 'vintagePulse 1.5s ease-in-out infinite',
        'vintage-bounce': 'vintageBounce 0.8s ease-in-out',
        'paper-fold': 'paperFold 0.4s ease-out',
        'ink-spread': 'inkSpread 0.6s ease-out',
        'draw-line': 'drawLine 1.5s ease-out forwards',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0', transform: 'translateY(8px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        slideDown: {
          '0%': { opacity: '0', transform: 'translateY(-16px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        scaleIn: {
          '0%': { opacity: '0', transform: 'scale(0.98)' },
          '100%': { opacity: '1', transform: 'scale(1)' },
        },
        shimmer: {
          '0%': { transform: 'translateX(-100%)' },
          '100%': { transform: 'translateX(100%)' },
        },
        vintagePulse: {
          '0%, 100%': { opacity: '1', transform: 'scale(1)' },
          '50%': { opacity: '0.7', transform: 'scale(1.01)' },
        },
        vintageBounce: {
          '0%, 20%, 50%, 80%, 100%': { transform: 'translateY(0)' },
          '40%': { transform: 'translateY(-6px)' },
          '60%': { transform: 'translateY(-3px)' },
        },
        paperFold: {
          '0%': { transform: 'rotateY(-90deg) scale(0.9)', opacity: '0' },
          '100%': { transform: 'rotateY(0deg) scale(1)', opacity: '1' },
        },
        inkSpread: {
          '0%': { transform: 'scale(0.9)', opacity: '0.5' },
          '50%': { transform: 'scale(1.02)', opacity: '0.8' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        drawLine: {
          '0%': { width: '0%' },
          '100%': { width: '100%' },
        },
      },
      boxShadow: {
        'vintage': '0 3px 10px rgba(0, 0, 0, 0.12)',
        'vintage-lg': '0 6px 20px rgba(0, 0, 0, 0.10)',
        'vintage-xl': '0 10px 30px rgba(0, 0, 0, 0.08)',
        'paper': '0 2px 6px rgba(0, 0, 0, 0.06)',
        'emboss': 'inset 0 1px 2px rgba(255, 255, 255, 0.9), 0 1px 2px rgba(0, 0, 0, 0.1)',
        'deboss': 'inset 0 2px 4px rgba(0, 0, 0, 0.1)',
      },
      backgroundImage: {
        'paper': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"80\" height=\"80\" viewBox=\"0 0 80 80\"%3E%3Cg fill-opacity=\"0.02\"%3E%3Cpolygon fill=\"%23000\" points=\"40 0 48 32 80 40 48 48 40 80 32 48 0 40 32 32\"/%3E%3C/g%3E%3C/svg%3E')",
        'dots': "url('data:image/svg+xml,%3Csvg width=\"16\" height=\"16\" viewBox=\"0 0 16 16\" xmlns=\"http://www.w3.org/2000/svg\"%3E%3Cg fill=\"%23000\" fill-opacity=\"0.04\"%3E%3Ccircle cx=\"2\" cy=\"2\" r=\"0.8\"/%3E%3C/g%3E%3C/svg%3E')",
        'vintage-grid': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"32\" height=\"32\" viewBox=\"0 0 32 32\"%3E%3Cg fill-opacity=\"0.015\"%3E%3Cpath d=\"M32 32H0V0h32v32zm-1-1H1V1h30v30z\" fill=\"%23000\"/%3E%3C/g%3E%3C/svg%3E')",
        'diagonal-lines': "url('data:image/svg+xml,%3Csvg xmlns=\"http://www.w3.org/2000/svg\" width=\"20\" height=\"20\" viewBox=\"0 0 20 20\"%3E%3Cg fill=\"none\" stroke=\"%23000\" stroke-opacity=\"0.03\" stroke-width=\"1\"%3E%3Cpath d=\"M0 20L20 0M-5 5L5 -5M15 25L25 15\"/%3E%3C/g%3E%3C/svg%3E')",
      },
      typography: {
        vintage: {
          css: {
            '--tw-prose-body': '#171717',
            '--tw-prose-headings': '#000000',
            '--tw-prose-lead': '#404040',
            '--tw-prose-links': '#000000',
            '--tw-prose-bold': '#000000',
            '--tw-prose-counters': '#525252',
            '--tw-prose-bullets': '#A3A3A3',
            '--tw-prose-hr': '#E5E5E5',
            '--tw-prose-quotes': '#171717',
            '--tw-prose-quote-borders': '#D4D4D4',
            '--tw-prose-captions': '#525252',
            '--tw-prose-code': '#000000',
            '--tw-prose-pre-code': '#E5E5E5',
            '--tw-prose-pre-bg': '#0A0A0A',
            '--tw-prose-th-borders': '#D4D4D4',
            '--tw-prose-td-borders': '#E5E5E5',
          },
        },
      },
      letterSpacing: {
        'vintage': '-0.02em',
        'vintage-wide': '0.08em',
        'vintage-wider': '0.15em',
      },
      backdropBlur: {
        'xs': '2px',
      },
    },
  },
  plugins: [
    require('@tailwindcss/forms'),
    require('@tailwindcss/typography'),
  ],
} 