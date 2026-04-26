/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        'mc-green': '#5dac39',
        'mc-dark': '#1a1a2e',
        'mc-darker': '#0f0f1a',
        'mc-panel': '#16213e',
        'mc-border': '#2d3561',
        'mc-purple': '#7c3aed',
        'mc-cyan': '#06b6d4',
      },
      fontFamily: {
        'mono': ['JetBrains Mono', 'Fira Code', 'monospace'],
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
        'glow': 'glow 2s ease-in-out infinite alternate',
      },
      keyframes: {
        glow: {
          '0%': { boxShadow: '0 0 5px #7c3aed, 0 0 10px #7c3aed' },
          '100%': { boxShadow: '0 0 10px #06b6d4, 0 0 20px #06b6d4' },
        }
      }
    },
  },
  plugins: [],
}
