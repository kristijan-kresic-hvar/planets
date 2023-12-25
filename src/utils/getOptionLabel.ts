import { PlanetOption } from '@/types';
import { optionLabels } from '@/constants';

const getOptionLabel = (option: PlanetOption) => {
  return optionLabels[option.value] || option.label;
};

export default getOptionLabel;
