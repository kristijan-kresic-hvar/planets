const getActivePlanetImageString = (activeOption: string): string => {
  switch (activeOption) {
    case 'overview':
    case 'geology':
      return 'planet';
    case 'structure':
      return 'internal';
    default:
      return 'planet';
  }
};

export default getActivePlanetImageString;
