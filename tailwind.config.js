/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#f4f0fe',
          100: '#e9e0fd',
          200: '#d3c2fb',
          300: '#b89df7',
          400: '#9d78f2',
          500: '#7811f7',
          600: '#6f0fe0',
          700: '#5d0ebb',
          800: '#4b0c96',
          900: '#3e0a7a',
        },
        secondary: {
          50: '#f8fafc',
          100: '#f1f5f9',
          200: '#e2e8f0',
          300: '#cbd5e1',
          400: '#94a3b8',
          500: '#64748b',
          600: '#475569',
          700: '#334155',
          800: '#1e293b',
          900: '#0f172a',
        },
        success: {
          500: '#22c55e',
        },
        warning: {
          500: '#f59e0b',
        },
        error: {
          500: '#ef4444',
        },
        info: {
          500: '#3b82f6',
        },
      },
    },
  },
  plugins: [],
} 

