import { OptionLabels } from '@/types';

export const BASE_DELAY = 0.1;

export const PLANET_INFORMATION_TITLES = {
  rotation: 'Rotation Time',
  revolution: 'Revolution Time',
  radius: 'Radius',
  temperature: 'Average Temp.',
};

export const SCREEN_SIZES = {
  mobile: 375,
  tablet: 768,
  desktop: 1440,
};

export const planetOptions = [
  {
    label: 'Overview',
    value: 'overview',
  },
  {
    label: 'Internal Structure',
    value: 'structure',
  },
  {
    label: 'Surface Geology',
    value: 'geology',
  },
];

export const optionLabels: OptionLabels = {
  structure: 'Structure',
  geology: 'Surface',
};
