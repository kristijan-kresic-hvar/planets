/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        'dark-midnight-blue': '#070724',
        gunmetal: '#38384F',
        mystic: '#838391',
        'pacific-blue': '#419EBB',
        'dark-tangerine': '#EDA249',
        'deep-purple': '#6f2ed6',
        cinnabar: '#D14C32',
        'alizarin-crimson': '#D83A34',
        'dark-coral': '#CD5120',
        'caribbean-green': '#1ec2a4',
        'sapphire-blue': '#2d68f0',
      },
      fontFamily: {
        antonio: 'Antonio, sans-serif',
        leagueSpartan: 'League Spartan, sans-serif',
      },
    },
  },
  plugins: [],
};
