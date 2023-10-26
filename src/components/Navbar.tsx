import { Dispatch, SetStateAction, useState } from 'react';
import planets from '@/data.json';
import lowercase from '@/utils/lowercase';
import type { Planet } from '@/types';
import getPlanetColor from '@/utils/getPlanetColor';
import hamburgerIcon from '@assets/icon-hamburger.svg';
import MobileNav from '@/components/MobileNav';

type NavbarProps = {
  activePlanet: Planet;
  setActivePlanet: Dispatch<SetStateAction<Planet>>;
};

const Navbar = ({ activePlanet, setActivePlanet }: NavbarProps) => {
  const [highlightedPlanet, setHighlightedPlanet] = useState<string | null>(
    null
  );
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const handleNavItemClick = (planet: Planet) => {
    if (isMenuOpen) {
      setIsMenuOpen(false);
    }
    setActivePlanet({
      ...planet,
      color: getPlanetColor(planet.name),
    });
  };

  return (
    <>
      <nav className="py-[2rem] md:py-0 border-b-[0.0625rem] border-[rgba(255,255,255,0.2)]">
        <div className="max-w-[90rem] mx-auto w-full px-[1.5rem] flex flex-row justify-between md:flex-col md:items-center md:justify-center lg:flex-row lg:justify-between">
          <span className="tracking-[-0.06563rem] md:pt-[2rem] lg:pt-0 text-white uppercase font-antonio text-[1.75rem] font-normal">
            The Planets
          </span>
          <ul className="h-full hidden md:inline-flex md:mt-[2.44rem] lg:mt-0 items-center justify-center gap-[2.0625rem]">
            {planets.map((planet) => {
              const isPlanetActive =
                lowercase(activePlanet.name) === lowercase(planet.name);
              const currentHighlightedPlanet =
                lowercase(highlightedPlanet ?? '') === lowercase(planet.name);

              return (
                <li
                  onMouseEnter={() =>
                    !isPlanetActive && setHighlightedPlanet(planet.name)
                  }
                  onMouseLeave={() => setHighlightedPlanet(null)}
                  onClick={() => handleNavItemClick(planet)}
                  className={`relative md:pb-[2rem] transition-color duration-300 lg:py-[2rem] uppercase font-spartan text-[0.6875rem] leading-[1.5625rem] tracking-[0.0625rem] cursor-pointer ${
                    isPlanetActive
                      ? 'text-white'
                      : 'text-[rgba(255,255,255,0.75)]'
                  } hover:text-white`}
                  key={planet.name}
                >
                  {planet.name}

                  <div
                    style={{
                      backgroundColor: getPlanetColor(planet.name),
                      opacity:
                        isPlanetActive || currentHighlightedPlanet ? '1' : '0',
                    }}
                    className="absolute bottom-0 hidden w-full h-1 transition-opacity duration-300 md:block lg:top-0"
                  />
                </li>
              );
            })}
          </ul>
          <img
            title={isMenuOpen ? 'Close menu' : 'Open menu'}
            onClick={() => setIsMenuOpen((prev) => !prev)}
            className="md:hidden cursor-pointer opacity-[0.2487] object-contain w-[1.5rem]"
            src={hamburgerIcon}
            alt="hamburger menu handler"
          />
        </div>
      </nav>
      <MobileNav
        open={isMenuOpen}
        planetItems={planets}
        activePlanetName={activePlanet.name}
        onNavItemClick={handleNavItemClick}
      />
    </>
  );
};

export default Navbar;
