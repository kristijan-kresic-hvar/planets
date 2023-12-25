import { Dispatch, SetStateAction, useEffect, useRef } from 'react';
import type { Planet, AnimationProps } from '@/types';
import lowercase from '@/utils/lowercase';
import angleRightIcon from '@assets/icon-chevron.svg';
import getPlanetColor from '@/utils/getPlanetColor';
import { BASE_DELAY, SCREEN_SIZES } from '@/constants';
import { slideFromRight } from '@/animations';
import useClientWidth from '@/hooks/useClientWidth.ts';

type MobileNavProps = {
  open: boolean;
  planetItems: Planet[];
  activePlanetName: string;
  onNavItemClick: (planet: Planet) => void;
  setIsMenuOpen: Dispatch<SetStateAction<boolean>>;
};

type MobileNavItemProps = {
  planetName: string;
  onClick: () => void;
  navOpen?: boolean;
  isActive?: boolean;
} & AnimationProps;

const MobileNavItem = ({
  planetName,
  isActive,
  onClick,
  navOpen = false,
  animationDuration = 0.1,
  animation = true,
  animationDelay = 0,
}: MobileNavItemProps) => {
  const mobileNavItemRef = useRef<HTMLButtonElement | null>(null);
  useEffect(() => {
    let animationFrame: number | null = null;
    let gsapTimeline: gsap.core.Tween | null = null;

    if (navOpen && animation) {
      animationFrame = requestAnimationFrame(() => {
        gsapTimeline = slideFromRight({
          element: mobileNavItemRef,
          duration: animationDuration,
          delay: animationDelay,
        });
      });
    }

    return () => {
      if (animationFrame) {
        cancelAnimationFrame(animationFrame);
      }
      if (gsapTimeline) {
        gsapTimeline.kill();
      }
    };
  }, [animation, animationDelay, animationDuration, navOpen]);

  return (
    <button
      ref={mobileNavItemRef}
      onClick={onClick}
      style={{
        backgroundColor: isActive ? 'var(--button-hover-background)' : '',
      }}
      className="w-full flex items-center transition-bg duration-300 cursor-pointer hover:bg-[var(--button-hover-background)] justify-between py-[1.25rem] border-b-[0.0625rem] border-[rgba(255,255,255,0.1)]"
    >
      <div className="flex items-center gap-[1.5rem]">
        <div
          style={{ backgroundColor: getPlanetColor(planetName) }}
          className="w-[1.25rem] h-[1.25rem] rounded-full"
        />
        <span className="text-[0.9375rem] font-bold leading-[1.5625rem] text-white font-spartan uppercase">
          {planetName}
        </span>
      </div>
      <img
        className="w-[0.25rem] object-contain mr-[0.5rem]"
        src={angleRightIcon}
        alt="select planet handler"
      />
    </button>
  );
};

const MobileNav = ({
  open,
  planetItems,
  onNavItemClick,
  setIsMenuOpen,
  activePlanetName,
}: MobileNavProps) => {
  const clientWidth = useClientWidth();

  useEffect(() => {
    if (clientWidth >= SCREEN_SIZES.tablet) {
      setIsMenuOpen(false);
    }
  }, [clientWidth, setIsMenuOpen]);

  return (
    <div
      style={{
        opacity: open ? '1' : '0',
        pointerEvents: open ? 'all' : 'none',
      }}
      className="overflow-y-auto overflow-x-hidden bg-dark-midnight-blue transition-opacity duration-300 fixed top-[calc(2rem_+_2rem_+_2.75rem)] z-50 left-0 right-0 bottom-0 w-full md:hidden py-[2.75rem] px-[1.5rem]"
    >
      {planetItems.map((planet, index) => (
        <MobileNavItem
          animationDelay={index * BASE_DELAY}
          navOpen={open}
          key={planet.name}
          planetName={planet.name}
          isActive={lowercase(activePlanetName) === lowercase(planet.name)}
          onClick={() => onNavItemClick(planet)}
        />
      ))}
    </div>
  );
};

export default MobileNav;
