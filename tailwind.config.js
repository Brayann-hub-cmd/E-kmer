/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      keyframes: {
        slideInUp: {
          '0%': { transform: 'translateY(100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideInDown: {
          '0%': { transform: 'translateY(-100%)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0)' },
          '50%': { transform: 'translateY(-5%)' },
        },
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        wiggle: {
          '0%, 100%': { transform: 'rotate(-3deg)' },
          '50%': { transform: 'rotate(3deg)' },
        },
        pulseGlow: {
          '0%, 100%': { boxShadow: '0 0 0 rgba(249, 115, 22, 0.3)' },
          '50%': { boxShadow: '0 0 20px rgba(249, 115, 22, 0.5)' },
        },
        gradient: {
          '0%': { backgroundPosition: '0% 50%' },
          '50%': { backgroundPosition: '100% 50%' },
          '100%': { backgroundPosition: '0% 50%' },
        },
      },
      animation: {
        'slide-in': 'slideInUp 0.8s ease-out forwards',
        'slide-in-down': 'slideInDown 0.8s ease-out forwards',
        float: 'float 3s ease-in-out infinite',
        'fade-in': 'fadeIn 0.5s ease-out forwards',
        wiggle: 'wiggle 0.5s ease-in-out',
        'pulse-glow': 'pulseGlow 2s ease-in-out infinite',
        gradient: 'gradient 5s ease infinite',
        'spin-slow': 'spin 3s linear infinite',
      },
    },
  },
  plugins: [require("daisyui")],
}

