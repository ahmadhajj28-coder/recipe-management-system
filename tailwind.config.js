/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      fontFamily: {
        display: ['Playfair Display', 'serif'],
        sans: ['DM Sans', 'system-ui', 'sans-serif'],
      },
      colors: {
        app: '#0c0c0c',
        card: '#111111',
        gold: '#C9A84C',
        amber: '#E8930A',
        primary: '#F5F5F5',
        secondary: '#888888',
        muted: '#444444',
      },
      borderColor: {
        card: 'rgba(255,255,255,0.06)',
        'card-hover': 'rgba(255,255,255,0.15)',
        dock: 'rgba(255,255,255,0.08)',
      },
      boxShadow: {
        dock: '0 8px 32px rgba(0,0,0,0.6)',
        'card-hover': '0 0 24px rgba(201,168,76,0.15)',
        'input-focus': '0 0 0 2px rgba(201,168,76,0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.3s ease-out',
        'slide-up': 'slideUp 0.3s ease-out',
      },
      keyframes: {
        fadeIn: { from: { opacity: '0' }, to: { opacity: '1' } },
        slideUp: { from: { opacity: '0', transform: 'translateY(10px)' }, to: { opacity: '1', transform: 'translateY(0)' } },
      },
      transitionDuration: {
        view: '300ms',
      },
    },
  },
  plugins: [],
}
