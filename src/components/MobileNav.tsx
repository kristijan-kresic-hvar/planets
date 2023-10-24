import type { Planet } from '@/types';
import lowercase from '@/utils/lowercase';
import angleRightIcon from '@assets/icon-chevron.svg';
import getPlanetColor from '@/utils/getPlanetColor';

type MobileNavProps = {
  open: boolean;
  planetItems: Planet[];
  activePlanetName: string;
  onNavItemClick: (planet: Planet) => void;
};

type MobileNavItemProps = {
  planetName: string;
  onClick: () => void;
  isActive?: boolean;
};

const MobileNavItem = ({
  planetName,
  isActive,
  onClick,
}: MobileNavItemProps) => {
  return (
    <div
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
        <span className="text-[0.9375rem] font-bold leading-[1.5625rem] text-white font-leagueSpartan uppercase">
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
      className="overflow-y-auto transition-opacity duration-300 fixed z-50 top-[calc(2rem_+_2rem_+_2.75rem)] left-0 right-0 bottom-0 w-full md:hidden py-[2.75rem] px-[1.5rem]"
    >
      {planetItems.map((planet) => (
        <MobileNavItem
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
