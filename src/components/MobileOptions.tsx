import {
  useRef,
  useEffect,
  useCallback,
  Dispatch,
  SetStateAction,
} from 'react';
import getOptionLabel from '@utils/getOptionLabel.ts';
import type { PlanetOption } from '@/types';

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
  const isResizing = useRef(false);
  const activeOptionRef = useRef<HTMLLIElement | null>(null);
  const indicatorRef = useRef<HTMLLIElement | null>(null);
  const indicatorAnimationTimeoutRef = useRef<number | NodeJS.Timeout | null>(
    null
  );

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
    if (indicatorAnimationTimeoutRef.current) {
      clearTimeout(indicatorAnimationTimeoutRef.current);
    }
    isResizing.current = true;
    updateIndicatorPosition();
    indicatorAnimationTimeoutRef.current = requestAnimationFrame(() => {
      isResizing.current = false;
    });
  }, [updateIndicatorPosition]);

  useEffect(() => {
    updateIndicatorPosition();
  }, [activeOption, activePlanetColor, isResizing, updateIndicatorPosition]);

  useEffect(() => {
    window.addEventListener('resize', handleResize);

    return () => {
      window.removeEventListener('resize', handleResize);
    };
  }, [handleResize]);

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
