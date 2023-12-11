/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-midnight-blue': 'var(--dark-midnight-blue)',
        gunmetal: 'var(--gunmetal)',
        mystic: 'var(--mystic)',
        'pacific-blue': 'var(--pacific-blue)',
        'dark-tangerine': 'var(--dark-tangerine)',
        'deep-purple': 'var(--deep-purple)',
        cinnabar: 'var(--cinnabar)',
        'alizarin-crimson': 'var(--alizarin-crimson)',
        'dark-coral': 'var(--dark-coral)',
        'caribbean-green': 'var(--caribbean-green)',
        'sapphire-blue': 'var(--sapphire-blue)',
      },
      fontFamily: {
        antonio: 'Antonio, sans-serif',
        spartan: 'Spartan, sans-serif',
      },
    },
  },
  plugins: [],
};
