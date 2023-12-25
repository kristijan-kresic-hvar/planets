import { useRef, useEffect, useCallback } from 'react';
import useOnResize from '@/hooks/useOnResize.ts';
import getOptionLabel from '@utils/getOptionLabel.ts';
import type { PlanetOption } from '@/types';

type MobileOptionsProps = {
  activePlanetColor: string;
  activeOption: PlanetOption;
  options: PlanetOption[];
  setActiveOption: (option: PlanetOption) => void;
};

const MobileOptions = ({
  activePlanetColor,
  options,
  setActiveOption,
  activeOption,
}: MobileOptionsProps) => {
  const isResizing = useRef(false);
  const activeOptionRef = useRef<HTMLLIElement | null>(null);
  const indicatorRef = useRef<HTMLLIElement | null>(null);

  const updateIndicatorPosition = useCallback(() => {
    if (activeOptionRef.current && indicatorRef.current) {
      const activeOptionWidth = activeOptionRef.current.offsetWidth;
      const activeOptionLeft = activeOptionRef.current.offsetLeft;
      const indicator = indicatorRef.current;

      indicator.style.width = `${activeOptionWidth}px`;
      indicator.style.left = `${activeOptionLeft}px`;
      indicator.style.backgroundColor = activePlanetColor;
      indicator.style.transition = isResizing.current
        ? 'none'
        : 'left 0.3s ease-out';
    }
  }, [activePlanetColor]);

  const handleResize = useCallback(() => {
    isResizing.current = true;
    updateIndicatorPosition();
    isResizing.current = false;
  }, [updateIndicatorPosition]);

  useEffect(() => {
    updateIndicatorPosition();
  }, [activeOption, activePlanetColor, isResizing, updateIndicatorPosition]);

  useOnResize(handleResize);

  return (
    <ul className="relative w-full flex justify-between gap-[2.75rem] overflow-x-auto no-scrollbar">
      {options.map((option) => {
        const isOptionActive = activeOption.value === option.value;
        return (
          <li key={option.value} ref={isOptionActive ? activeOptionRef : null}>
            <button
              className={`transition-color py-5 font-bold duration-300 uppercase font-spartan text-[0.56rem] leading-normal tracking-[0.12rem] cursor-pointer ${
                isOptionActive ? 'text-white' : 'text-[rgba(255,255,255,0.5)]'
              } hover:text-white`}
              onClick={() => setActiveOption(option)}
            >
              {getOptionLabel(option)}
            </button>
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
