import { Dispatch, SetStateAction, useState } from 'react';
import planets from '@/data.json';
import lowercase from '@/utils/lowercase';
import type { Planet } from '@/types';
import getPlanetColor from '@/utils/getPlanetColor';

type NavbarProps = {
  activePlanet: Planet;
  setActivePlanet: Dispatch<SetStateAction<Planet>>;
};

const Navbar = ({ activePlanet, setActivePlanet }: NavbarProps) => {
  const [highlightedPlanet, setHighlightedPlanet] = useState<Planet | null>(
    null
  );

  const handleNavItemClick = (planet: Planet) => {
    setActivePlanet({
      ...planet,
      color: getPlanetColor(planet.name),
    });
  };

  return (
    <nav className="py-[2rem] md:py-0 border-b-[0.0625rem] border-[rgba(255,255,255,0.2)]">
      <div className="w-full px-[1.5rem] flex flex-row justify-between md:flex-col md:items-center md:justify-center lg:flex-row lg:justify-between">
        <span className="tracking-[-0.06563rem] md:pt-[2rem] lg:pt-0 text-white uppercase font-antonio text-[1.75rem] font-normal">
          The Planets
        </span>
        <ul className="h-full hidden md:inline-flex md:mt-[2.44rem] lg:mt-0 items-center justify-center gap-[2.0625rem]">
          {planets.map((planet) => {
            const isPlanetActive =
              lowercase(activePlanet.name) === lowercase(planet.name);
            const currentHighlightedPlanet =
              lowercase(highlightedPlanet?.name ?? '') ===
              lowercase(planet.name);

            return (
              <li
                onMouseEnter={() =>
                  !isPlanetActive && setHighlightedPlanet(planet)
                }
                onMouseLeave={() => setHighlightedPlanet(null)}
                onClick={() => handleNavItemClick(planet)}
                className={`relative md:pb-[2rem] lg:py-[2rem] uppercase font-leagueSpartan text-[0.6875rem] leading-[1.5625rem] tracking-[0.0625rem] cursor-pointer ${
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
      </div>
    </nav>
  );
};

export default Navbar;
