import Button from '@components/Button';
import { Dispatch, SetStateAction } from 'react';
import lowercase from '@/utils/lowercase';
import type { PlanetOption } from '@/types';

type PlanetOptionsProps = {
  options: PlanetOption[];
  activeOption: PlanetOption;
  activeBackground: string;
  setActiveOption: Dispatch<SetStateAction<PlanetOption>>;
};

const PlanetOptions = ({
  options,
  activeOption,
  activeBackground,
  setActiveOption,
}: PlanetOptionsProps) => {
  const handleOptionClick = (option: PlanetOption) => {
    setActiveOption(option);
  };

  return (
    <div className="self-center hidden md:block">
      {options?.map((option, index) => (
        <div key={option.value} className="mb-[1rem] last:mb-0">
          <Button
            isActive={lowercase(option.label) === lowercase(activeOption.label)}
            activeBackground={activeBackground}
            buttonNumber={index + 1}
            onClick={() => handleOptionClick(option)}
          >
            {option.label}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlanetOptions;
