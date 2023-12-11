import sanitizeUrlValue from '@utils/sanitizeUrlValue.ts';
import lowercase from '@utils/lowercase.ts';
import { Planet } from '@/types';

const getActivePlanetFromHash = (
  hash: string,
  planets: Planet[]
): Planet | null => {
  const sanitizedHash = sanitizeUrlValue(hash);
  const currentPlanet =
    sanitizedHash &&
    planets.find(
      (planet: Planet) => lowercase(planet.name) === sanitizedHash.slice(1)
    );
  return currentPlanet || null;
};

export default getActivePlanetFromHash;
