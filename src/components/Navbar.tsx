import { useEffect, useState, memo } from 'react';
import planets from '@/data.json';
import lowercase from '@/utils/lowercase';
import type { Planet } from '@/types';
import getPlanetColor from '@/utils/getPlanetColor';
import hamburgerIcon from '@assets/icon-hamburger.svg';
import MobileNav from '@/components/MobileNav';

type NavbarProps = {
  activePlanet: Planet;
  setActivePlanet: (planet: Planet) => void;
};

type NavbarItemProps = {
  planet: Planet;
  isActive: boolean;
  handleNavItemClick: (planet: Planet) => void;
};

const NavbarItem = ({
  planet,
  isActive,
  handleNavItemClick,
}: NavbarItemProps) => {
  const [isHighlighted, setIsHighlighted] = useState(false);
  return (
    <li className={`relative cursor-pointer`} key={planet.name}>
      <button
        className={`${
          isActive ? 'text-white' : 'text-[rgba(255,255,255,0.75)]'
        } hover:text-white w-full font-bold transition-color duration-300 md:pb-[2rem] lg:py-[2rem] uppercase font-spartan text-[0.6875rem] leading-[1.5625rem] tracking-[0.0625rem]`}
        onMouseEnter={() => !isActive && setIsHighlighted(true)}
        onMouseLeave={() => setIsHighlighted(false)}
        onClick={() => handleNavItemClick(planet)}
      >
        {planet.name}
      </button>

      <div
        style={{
          backgroundColor: getPlanetColor(planet.name),
          opacity: isActive || isHighlighted ? '1' : '0',
        }}
        className="absolute bottom-0 hidden w-full h-1 transition-opacity duration-300 md:block lg:top-0"
      />
    </li>
  );
};

const Navbar = ({ activePlanet, setActivePlanet }: NavbarProps) => {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavItemClick = (planet: Planet) => {
    if (planet.name === activePlanet.name) return;
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setActivePlanet({
      ...planet,
      color: getPlanetColor(planet.name),
    });
  };

  const handleHamburgerMenu = () => {
    setIsMenuOpen((prev) => !prev);
  };

  useEffect(() => {
    if (isMenuOpen) {
      window.scrollTo(0, 0);
      document.body.classList.add('disable-scroll-y');
    } else {
      document.body.classList.remove('disable-scroll-y');
    }
  }, [isMenuOpen]);

  return (
    <>
      <nav className="py-[2rem] md:py-0 border-b-[0.0625rem] border-[rgba(255,255,255,0.2)]">
        <div className="max-w-[90rem] mx-auto w-full px-[1.5rem] flex flex-row justify-between md:flex-col md:items-center md:justify-center lg:flex-row lg:justify-between">
          <span className="tracking-[-0.06563rem] md:pt-[2rem] lg:pt-0 text-white uppercase font-antonio text-[1.75rem] font-normal">
            The Planets
          </span>
          <ul className="h-full md:max-w-[90rem] hidden md:inline-flex md:mt-[2.44rem] lg:mt-0 items-center justify-center gap-[2.0625rem]">
            {planets.map((planet) => {
              const isPlanetActive =
                lowercase(activePlanet.name) === lowercase(planet.name);

              return (
                <NavbarItem
                  key={planet.name}
                  handleNavItemClick={handleNavItemClick}
                  isActive={isPlanetActive}
                  planet={planet}
                />
              );
            })}
          </ul>
          <button
            className={`md:hidden cursor-pointer ${
              isMenuOpen ? 'opacity-[0.2487]' : 'opacity-1'
            } w-[1.5rem]`}
            onClick={handleHamburgerMenu}
          >
            <img
              className="w-full object-contain"
              title={isMenuOpen ? 'Close menu' : 'Open menu'}
              src={hamburgerIcon}
              alt="hamburger menu handler"
            />
          </button>
        </div>
      </nav>
      <MobileNav
        open={isMenuOpen}
        setIsMenuOpen={setIsMenuOpen}
        planetItems={planets}
        activePlanetName={activePlanet.name}
        onNavItemClick={handleNavItemClick}
      />
    </>
  );
};

export default memo(Navbar);
