import { useRef, useEffect, useCallback, useState } from 'react';
import type { PlanetOption } from '@/types';
import { Dispatch, SetStateAction } from 'react';

type MobileTabsProps = {
  activePlanetColor: string;
  activeOption: PlanetOption;
  options: PlanetOption[];
  setActiveOption: Dispatch<SetStateAction<PlanetOption>>;
};

const MobileOptions = ({
  activePlanetColor,
  options,
  setActiveOption,
  activeOption,
}: MobileTabsProps) => {
  const [isResizing, setIsResizing] = useState(false);

  const activeOptionRef = useRef<HTMLLIElement | null>(null);
  const indicatorRef = useRef<HTMLLIElement | null>(null);
  const indicatorAnimationTimeoutRef = useRef<number | NodeJS.Timeout | null>(
    null
  );

  const handleOptionClick = useCallback(
    (option: PlanetOption) => {
      setActiveOption(option);
    },
    [setActiveOption]
  );

  const getOptionLabel = (option: PlanetOption) => {
    if (option.value === 'structure') {
      return 'Structure';
    } else if (option.value === 'geology') {
      return 'Surface';
    } else {
      return option.label;
    }
  };

  const updateIndicatorPosition = useCallback(() => {
    if (activeOptionRef.current && indicatorRef.current) {
      const activeOptionWidth = activeOptionRef.current.offsetWidth;
      const activeOptionLeft = activeOptionRef.current.offsetLeft;
      const indicator = indicatorRef.current;

      indicator.style.width = `${activeOptionWidth}px`;
      indicator.style.left = `${activeOptionLeft}px`;
      indicator.style.backgroundColor = activePlanetColor;
      indicator.style.transition = isResizing ? 'none' : 'left 0.3s ease-out';
    }
  }, [activePlanetColor, isResizing]);

  const handleResize = useCallback(() => {
    if (indicatorAnimationTimeoutRef.current) {
      clearTimeout(indicatorAnimationTimeoutRef.current);
    }
    setIsResizing(true);
    updateIndicatorPosition();
    indicatorAnimationTimeoutRef.current = setTimeout(() => {
      setIsResizing(false);
    }, 300);
  }, [updateIndicatorPosition]);

  useEffect(() => {
    updateIndicatorPosition();
  }, [activeOption, updateIndicatorPosition]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

  return (
    <ul className="relative w-full flex justify-between gap-[2.75rem] overflow-x-hidden">
      {options.map((option) => {
        const isOptionActive = activeOption.value === option.value;
        return (
          <li
            ref={isOptionActive ? activeOptionRef : null}
            className={`transition-color py-5 font-bold duration-300 uppercase font-spartan text-[0.56rem] leading-normal tracking-[0.12rem] cursor-pointer ${
              isOptionActive ? 'text-white' : 'text-[rgba(255,255,255,0.5)]'
            } hover:text-white`}
            onClick={() => handleOptionClick(option)}
            key={option.value}
          >
            {getOptionLabel(option)}
          </li>
        );
      })}
      <li
        aria-hidden={'true'}
        ref={indicatorRef}
        className="absolute bottom-0 h-1"
      />
    </ul>
  );
};

export default MobileOptions;
