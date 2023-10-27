import { useState, useEffect } from 'react';
import Navbar from '@/components/Navbar';
import type { Planet } from '@/types';
import planets from '@/data.json';
import getPlanetColor from '@/utils/getPlanetColor';
import sourceIcon from '@assets/icon-source.svg';
import lowercase from '@/utils/lowercase';
import { planetOptions } from '@/constants';
import PlanetOptions from './components/PlanetOptions';
import getActivePlanetImageString from './utils/getActivePlanetImageString';

const defaultPlanet: Planet = {
  ...planets[0],
  color: getPlanetColor(planets[0].name),
};

const App = () => {
  const [activePlanet, setActivePlanet] = useState(defaultPlanet);
  const [activeOption, setActiveOption] = useState(planetOptions[0]);

  useEffect(() => {
    setActiveOption(planetOptions[0]);
  }, [activePlanet]);

  return (
    <div className="App">
      <Navbar activePlanet={activePlanet} setActivePlanet={setActivePlanet} />
      <main className="w-[85%] max-w-[90rem] mx-auto">
        <div className="mt-[2.44rem] md:mt-[3.38rem] lg:mt-[7.88rem] mb-[5.44rem] lg:grid lg:grid-cols-2 lg:gap-[9.56rem] place-items-center">
          <div className="flex items-center justify-center shrink-1 min-h-[16rem] md:min-h-[26.375rem] lg:min-h-auto lg:min-w-[27rem]">
            <img
              className={`block object-contain h-auto max-w-full mx-auto lg:mx-0 planet-image ${lowercase(
                activePlanet.name
              )}`}
              src={
                activePlanet.images[
                  getActivePlanetImageString(activeOption.value)
                ]
              }
              alt="planet graphic handler"
            />
          </div>
          <div className="flex flex-col md:flex-row self-start justify-between lg:shrink-0 lg:block mt-[2.31rem]">
            <div className="text-center md:text-left">
              <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[5rem] text-white font-antonio font-bold uppercase">
                {activePlanet.name}
              </h1>
              <p className="max-w-[21.875rem] mx-auto text-white text-[0.6875rem] lg:text-[0.875rem] py-[1.5rem] font-spartan leading-[1.5625rem] font-normal">
                {activePlanet[activeOption.value].content}
              </p>
              <div className="h-max mb-[2.44rem] justify-center md:justify-start flex items-center gap-[0.5rem]">
                <small className="text-white opacity-50 font-spartan text-[0.75rem] lg:text-[0.875rem]">
                  Source {''} :
                  <a
                    className="font-bold underline capitalize"
                    href={activePlanet[activeOption.value].source}
                    rel="noreferrer"
                    target="_blank"
                  >
                    {''} Wikipedia
                  </a>
                </small>
                <img src={sourceIcon} alt="open in new tab handler" />
              </div>
            </div>
            <PlanetOptions
              activeOption={activeOption}
              activeBackground={activePlanet.color ?? ''}
              options={planetOptions}
              setActiveOption={setActiveOption}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
