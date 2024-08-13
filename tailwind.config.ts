import type { Config } from 'tailwindcss';

const config: Config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    container: {
      center: true,
      padding: '14px',
      screens: {
        lg: '1300px',
      },
    },
    extend: {
      fontFamily: {
        inter: ['var(--font-inter)'],
        montserrat: ['var(--font-montserrat)'],
        roboto_mono: ['var(--font-roboto-mono)'],
      },
      animation: {
        marquee: 'marquee 25s linear infinite',
        marquee2: 'marquee2 25s linear infinite',
      },
      keyframes: {
        marquee: {
          '0%': { transform: 'translateX(0%)' },
          '100%': { transform: 'translateX(-100%)' },
        },
        marquee2: {
          '0%': { transform: 'translateX(100%)' },
          '100%': { transform: 'translateX(0%)' },
        },
      },
      colors: {
        primary: '#E18E26',
        altPrimary: '#F2E8D2',
        secondary: '#5B741A',
        accent: '#33373E',
        altBlack: '#1D1D1F',
        milk: '#EEEEEE',
        altGray: '#F2F3F0',
        yellow: '#FAE341',
      },
      screens: {
        lg: '960px',
      },
    },
  },
  plugins: [],
};
export default config;
