/** @type {import('tailwindcss').Config} */
export default {
  darkMode: 'class',
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#F0F4F8',
          100: '#D9E2EC',
          200: '#BCCCDC',
          300: '#9FB3C8',
          400: '#627D98',
          500: '#334E68',
          600: '#243B53',
          700: '#182F48',
          800: '#122439',
          900: '#0B1F3A', // Primary Deep Navy Blue
          950: '#061224', // Deepest Navy Canvas
        },
        gold: {
          50: '#FCF9F2',
          100: '#F8F2E2',
          200: '#EFE2C2',
          300: '#E5CF9E',
          400: '#DCBF7F',
          500: '#D6B56D', // Muted Gold Highlight
          600: '#BD9B4D',
          700: '#997C37',
          800: '#735C26',
          900: '#4D3C18',
          950: '#2D230C',
        },
        champagne: {
          50: '#FDFCF7',
          100: '#FAF6EB',
          200: '#F3EACD',
          300: '#EBDBAB',
          400: '#E0C782',
          500: '#D4AF37', // Burnished Metallic Gold
          600: '#BA9225',
          700: '#95711A',
          800: '#755618',
          900: '#5F4618',
          950: '#38260A',
        },
        obsidian: {
          50: '#F8FAFC',
          100: '#F1F5F9',
          200: '#E2E8F0',
          300: '#CBD5E1',
          400: '#94A3B8',
          500: '#64748B',
          600: '#475569',
          700: '#334155',
          800: '#1E293B',
          900: '#0F172A',
          950: '#060B17', // Velvety Ink Canvas
        },
        brand: {
          navy: '#0B1F3A',
          slate: '#64748B',
          gold: '#D6B56D',
          'gold-light': '#F8F2E2',
          'gold-dark': '#997C37',
        }
      },
      fontFamily: {
        sans: ['"Plus Jakarta Sans"', 'Inter', 'system-ui', 'sans-serif'],
        serif: ['"Cinzel"', 'Georgia', 'serif'],
        mono: ['"JetBrains Mono"', 'Fira Code', 'monospace'],
      },
      boxShadow: {
        'subtle': '0 1px 3px rgba(11, 31, 58, 0.05), 0 1px 2px rgba(11, 31, 58, 0.03)',
        'premium': '0 4px 20px -2px rgba(11, 31, 58, 0.08), 0 2px 6px -1px rgba(11, 31, 58, 0.04)',
        'card': '0 2px 8px -1px rgba(11, 31, 58, 0.04), 0 1px 3px -1px rgba(11, 31, 58, 0.02)',
        'elevated': '0 14px 34px -4px rgba(11, 31, 58, 0.12), 0 4px 12px -2px rgba(11, 31, 58, 0.06)',
        'gold-glow': '0 0 20px rgba(214, 181, 109, 0.25)',
        'gold-subtle': '0 0 12px rgba(212, 175, 55, 0.15)',
        'glass': '0 8px 32px 0 rgba(8, 14, 26, 0.15)',
      }
    },
  },
  plugins: [],
}
