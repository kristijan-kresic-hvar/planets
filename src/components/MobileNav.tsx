import { useEffect, useRef, useState } from 'react';
import type { Planet } from '@/types';
import lowercase from '@/utils/lowercase';
import angleRightIcon from '@assets/icon-chevron.svg';
import getPlanetColor from '@/utils/getPlanetColor';
import gsap from 'gsap';

type MobileNavProps = {
  open: boolean;
  planetItems: Planet[];
  activePlanetName: string;
  onNavItemClick: (planet: Planet) => void;
};

type MobileNavItemProps = {
  navOpen?: boolean;
  planetName: string;
  onClick: () => void;
  isActive?: boolean;
  animationDuration?: number;
  animation?: boolean;
  animationDelay?: number;
};

const MobileNavItem = ({
  planetName,
  isActive,
  onClick,
  navOpen = false,
  animationDuration = 0.1,
  animation = true,
  animationDelay = 0,
}: MobileNavItemProps) => {
  const [isAnimating, setIsAnimating] = useState(false);
  const mobileNavItemRef = useRef<HTMLDivElement | null>(null);
  useEffect(() => {
    let customAnimation: gsap.core.Tween | null = null;

    if (navOpen && animation && !isAnimating) {
      customAnimation = gsap.fromTo(
        mobileNavItemRef?.current,
        {
          x: 100,
        },
        {
          duration: animationDuration,
          x: 0,
          ease: 'none',
          delay: animationDelay,
          onComplete: () => {
            setIsAnimating(false);
          },
        }
      );
    }

    return () => {
      if (customAnimation) {
        customAnimation.kill();
      }
      setIsAnimating(false);
    };
  }, [animation, animationDelay, animationDuration, isAnimating, navOpen]);

  return (
    <div
      ref={mobileNavItemRef}
      onClick={onClick}
      style={{
        backgroundColor: isActive ? 'var(--button-hover-background)' : '',
      }}
      className="flex items-center transition-bg duration-300 cursor-pointer hover:bg-[var(--button-hover-background)] justify-between py-[1.25rem] border-b-[0.0625rem] border-[rgba(255,255,255,0.1)]"
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
    </div>
  );
};

const MobileNav = ({
  open,
  planetItems,
  onNavItemClick,
  activePlanetName,
}: MobileNavProps) => {
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
          animationDelay={index * 0.09}
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
