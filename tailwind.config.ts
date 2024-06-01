import type { Config } from 'tailwindcss'

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    fontFamily: {
      'plus-jakarta-sans': ['Plus Jakarta Sans', 'sans-serif'],
    },
    extend: {
      backgroundImage: {
        'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))',
        'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))',
      },
    },
    keyframes: {
      'fade-up': {
        from: {
          opacity: '0',
          transform: 'translateY(25%)',
        },
        to: {
          opacity: '1',
          transform: 'translateY(0)',
        },
      },
    },
    animation: {
      'fade-up': 'fade-up 0.5s ease-out',
    },
  },
  plugins: [],
}
export default config
