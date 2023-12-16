import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      colors: {
        slate: {
          250: '#e3e6eb',
        },
      },
      fontFamily: {
        inconsolata: ['var(--font-inconsolata)'],
      },
    },
  },
  plugins: [],
};
export default config;
