import { defineConfig } from '@tailwindcss/vite'

export default defineConfig({
  theme: {
    extend: {
      colors: {
        // Dark theme colors inspired by code editor
        background: '#0a0a0a',
        surface: '#111111',
        'surface-secondary': '#1a1a1a',
        border: '#333333',
        'text-primary': '#ffffff',
        'text-secondary': '#cccccc',
        'text-tertiary': '#888888',
        accent: '#00ff88',
        'accent-hover': '#00cc6a',
        star: '#ffd700',
        error: '#ff4444',
        success: '#00ff88',
      },
      fontFamily: {
        mono: [
          'JetBrains Mono',
          'Fira Code',
          'Monaco',
          'Consolas',
          'Liberation Mono',
          'Courier New',
          'monospace',
        ],
      },
      backgroundImage: {
        'dotted-grid': `
          radial-gradient(circle, #333333 1px, transparent 1px)
        `,
      },
      backgroundSize: {
        'grid': '20px 20px',
      },
      animation: {
        'pulse-slow': 'pulse 3s cubic-bezier(0.4, 0, 0.6, 1) infinite',
      },
    },
  },
})

