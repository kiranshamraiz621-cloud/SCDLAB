export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  darkMode: 'class',
  theme: {
    extend: {
      colors: { ink: '#05060a', pearl: '#f7f8ff', electric: '#7c3cff', cyan: '#22d3ee', aurora: '#42ffb5', rose: '#ff4ecd' },
      fontFamily: { sans: ['Inter', 'ui-sans-serif', 'system-ui'], display: ['Space Grotesk', 'Inter', 'sans-serif'] },
      boxShadow: { premium: '0 24px 100px rgba(124,60,255,.22)', glow: '0 0 60px rgba(34,211,238,.35)' },
      animation: { float: 'float 7s ease-in-out infinite', aurora: 'aurora 12s ease-in-out infinite alternate', marquee: 'marquee 25s linear infinite' },
      keyframes: {
        float: { '0%,100%': { transform: 'translateY(0)' }, '50%': { transform: 'translateY(-22px)' } },
        aurora: { '0%': { transform: 'translate3d(-5%,-2%,0) scale(1)' }, '100%': { transform: 'translate3d(5%,4%,0) scale(1.12)' } },
        marquee: { from: { transform: 'translateX(0)' }, to: { transform: 'translateX(-50%)' } }
      }
    }
  },
  plugins: []
}
