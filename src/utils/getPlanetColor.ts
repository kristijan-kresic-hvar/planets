import lowercase from '@/utils/lowercase';

const getPlanetColor = (planetName: string) => {
  let planetColor;

  switch (lowercase(planetName)) {
    case 'mercury':
      planetColor = 'var(--pacific-blue)';
      break;
    case 'venus':
      planetColor = 'var(--dark-tangerine)';
      break;
    case 'earth':
      planetColor = 'var(--deep-purple)';
      break;
    case 'mars':
      planetColor = 'var(--cinnabar)';
      break;
    case 'jupiter':
      planetColor = 'var(--alizarin-crimson)';
      break;
    case 'saturn':
      planetColor = 'var(--dark-coral)';
      break;
    case 'uranus':
      planetColor = 'var(--caribbean-green)';
      break;
    case 'neptune':
      planetColor = 'var(--sapphire-blue)';
      break;
    default:
      planetColor = '#ffffff';
      break;
  }

  return planetColor;
};

export default getPlanetColor;
