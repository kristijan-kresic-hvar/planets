import Button from '@components/Button';
import type { PlanetOption } from '@/types';

type PlanetOptionsProps = {
  options: PlanetOption[];
  activeOption: PlanetOption;
  activeBackground: string;
  setActiveOption: (option: PlanetOption) => void;
};

const PlanetOptions = ({
  options,
  activeOption,
  activeBackground,
  setActiveOption,
}: PlanetOptionsProps) => {
  return (
    <div className="self-center hidden md:block">
      {options?.map((option, index) => (
        <div
          key={option.value}
          className="mb-[1rem] w-full lg:max-w-full max-w-[21.875rem] last:mb-0 ml-auto"
        >
          <Button
            isActive={option.value === activeOption.value}
            activeBackground={activeBackground}
            buttonNumber={index + 1}
            onClick={() => setActiveOption(option)}
          >
            {option.label}
          </Button>
        </div>
      ))}
    </div>
  );
};

export default PlanetOptions;
