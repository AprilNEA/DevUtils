import type { Config } from 'tailwindcss';

const config: Config = {
  content: ['./src/**/*.{js,ts,jsx,tsx,mdx}'],
  theme: {
    extend: {
      fontFamily: {
        inconsolata: ['var(--font-inconsolata)'],
      },
    },
  },
  plugins: [],
};
export default config;
