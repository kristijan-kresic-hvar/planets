import { useState, useEffect, useCallback } from 'react';
import Navbar from '@/components/Navbar';
import type { Planet, PlanetOption } from '@/types';
import planets from '@/data.json';
import getPlanetColor from '@/utils/getPlanetColor';
import lowercase from '@/utils/lowercase';
import { planetOptions } from '@/constants';
import PlanetInformation from '@components/PlanetInformation.tsx';
import MobileOptions from '@components/MobileOptions.tsx';
import setLocationUrl from '@utils/setLocationUrl.ts';
import getActivePlanetFromHash from '@utils/getActivePlanetFromHash.ts';
import getActiveOptionFromParam from '@utils/getActiveOptionFromParam.ts';
import PlanetContent from '@components/PlanetContent.tsx';

const planetHash = location.hash.split('?')[0] ?? '';
const sanitizedOptionValue =
  new URLSearchParams(location.hash.split('?')[1]).get('option') ?? '';

const App = () => {
  const [activePlanet, setActivePlanet] = useState<Planet>(
    getActivePlanetFromHash(planetHash, planets) ?? planets[0]
  );
  const [activeOption, setActiveOption] = useState<PlanetOption>(
    getActiveOptionFromParam(sanitizedOptionValue, planetOptions) ??
      planetOptions[0]
  );

  const handleSetActivePlanet = useCallback((planet: Planet) => {
    setActivePlanet(planet);
    setActiveOption(planetOptions[0]);
    setLocationUrl(lowercase(planet.name), planetOptions[0].value);
  }, []);

  const handleSetActiveOption = useCallback(
    (option: PlanetOption) => {
      setActiveOption(option);
      setLocationUrl(lowercase(activePlanet.name), option.value);
    },
    [activePlanet.name]
  );

  useEffect(() => {
    if (!planetHash) {
      setLocationUrl(lowercase(activePlanet.name), activeOption.value);
    }
  }, [activeOption.value, activePlanet.name]);

  const { rotation, revolution, radius, temperature } = activePlanet;

  return (
    <div className="App">
      <Navbar
        activePlanet={activePlanet}
        setActivePlanet={handleSetActivePlanet}
      />
      <div className="block md:hidden w-full max-w-[90rem] mx-auto px-[1.5rem] border-b-[0.0625rem] border-[rgba(255,255,255,0.2)]">
        <MobileOptions
          activePlanetColor={getPlanetColor(activePlanet.name)}
          activeOption={activeOption}
          options={planetOptions}
          setActiveOption={handleSetActiveOption}
        />
      </div>
      <main className="w-full max-w-[90rem] mx-auto px-[1.5rem] md:px-[2.5rem] lg:px-0">
        <div className="content-container">
          <PlanetContent
            activePlanet={activePlanet}
            activeOption={activeOption}
            setActiveOption={handleSetActiveOption}
          />
          <div className="mt-[1.75rem] md:mt-[1.69rem] lg:mt-[5.44rem] pb-[2.94rem] md:pb-[2.25rem] lg:pb-[3.5rem]">
            <PlanetInformation
              rotation={rotation}
              revolution={revolution}
              radius={radius}
              temperature={temperature}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
