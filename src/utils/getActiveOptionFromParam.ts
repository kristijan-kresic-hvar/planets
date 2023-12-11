import { PlanetOption } from '@/types';
import sanitizeUrlValue from '@utils/sanitizeUrlValue.ts';

const getActiveOptionFromParam = (
  param: string,
  options: PlanetOption[]
): PlanetOption | null => {
  const sanitizedOptionValue = sanitizeUrlValue(param);
  const currentOption =
    sanitizedOptionValue &&
    options.find((option) => option.value === sanitizedOptionValue);
  return currentOption || null;
};

export default getActiveOptionFromParam;
