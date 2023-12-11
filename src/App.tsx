import { useState, useRef, useEffect, useLayoutEffect } from 'react';
import Navbar from '@/components/Navbar';
import type { Planet, PlanetOption } from '@/types';
import planets from '@/data.json';
import getPlanetColor from '@/utils/getPlanetColor';
import sourceIcon from '@assets/icon-source.svg';
import lowercase from '@/utils/lowercase';
import { planetOptions } from '@/constants';
import PlanetOptions from './components/PlanetOptions';
import getActivePlanetImageString from './utils/getActivePlanetImageString';
import PlanetInformation from '@components/PlanetInformation.tsx';
import MobileOptions from '@components/MobileOptions.tsx';
import setLocationUrl from '@utils/setLocationUrl.ts';
import { fadeIn } from '@/animations';
import getActivePlanetFromHash from '@utils/getActivePlanetFromHash.ts';
import getActiveOptionFromParam from '@utils/getActiveOptionFromParam.ts';
import Spinner from '@components/Spinner.tsx';

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
  const [planetImageLoading, setPlanetImageLoading] = useState(true);

  const geologyImageRef = useRef<HTMLDivElement | null>(null);
  const planetInfoTextRef = useRef<HTMLParagraphElement | null>(null);

  const showGeologyImage = activeOption.value === 'geology';

  const handleSetActivePlanet = (planet: Planet) => {
    setActivePlanet(planet);
    setActiveOption(planetOptions[0]);
    setLocationUrl(lowercase(planet.name), planetOptions[0].value);
  };

  const handleSetActiveOption = (option: PlanetOption) => {
    setActiveOption(option);
    setLocationUrl(lowercase(activePlanet.name), option.value);
  };

  useLayoutEffect(() => {
    fadeIn({
      element: planetInfoTextRef,
      duration: 0.5,
    });
  }, [activePlanet, activeOption]);

  useLayoutEffect(() => {
    if (showGeologyImage) {
      fadeIn({
        element: geologyImageRef,
      });
    }
  }, [showGeologyImage]);

  useEffect(() => {
    if (!planetHash) {
      setLocationUrl(lowercase(activePlanet.name), activeOption.value);
    }
  }, [activeOption.value, activePlanet.name]);

  useEffect(() => {
    setPlanetImageLoading(true);
  }, [activePlanet]);

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
          <div className="mt-[2.44rem] md:mt-[3.38rem] lg:mt-[7.88rem] lg:grid lg:grid-cols-[2fr,1fr] lg:gap-[9.56rem] mx-auto place-items-center">
            <div className="w-full flex items-center justify-center min-h-[16rem] md:min-h-[26.375rem] lg:min-h-auto">
              <div className="relative select-none pointer-events-none">
                <div className={`${planetImageLoading ? 'block' : 'hidden'}`}>
                  <Spinner fillColor={getPlanetColor(activePlanet.name)} />
                </div>
                <div className={`${planetImageLoading ? 'hidden' : 'block'}`}>
                  <img
                    className={`block object-contain h-auto max-w-full mx-auto lg:mx-0 planet-image ${lowercase(
                      activePlanet.name
                    )}`}
                    src={
                      activePlanet.images[
                        getActivePlanetImageString(activeOption.value)
                      ]
                    }
                    onLoad={() => setPlanetImageLoading(false)}
                    alt="graphic representation of a planet"
                  />
                  <div
                    ref={geologyImageRef}
                    className={`${
                      showGeologyImage ? 'block' : 'hidden'
                    } absolute left-1/2 -translate-x-1/2 top-[63%] opacity-0`}
                  >
                    <img
                      className="object-contain h-auto max-w-[4.2rem] md:max-w-[6.8rem] lg:max-w-[10.1875rem]"
                      src={activePlanet.images.geology}
                      alt="planet geology"
                    />
                  </div>
                </div>
              </div>
            </div>
            <div className="w-full flex flex-col md:flex-row self-start md:gap-[4.31rem] justify-between lg:block mt-[2.31rem]">
              <div className="text-center md:text-left">
                <h1 className="text-[2.5rem] md:text-[3rem] lg:text-[5rem] text-white font-antonio font-bold uppercase">
                  {activePlanet.name}
                </h1>
                <p
                  ref={planetInfoTextRef}
                  className="max-w-[21.875rem] mx-auto md:mx-0 text-white lg:min-h-[13rem] text-[0.6875rem] lg:text-[0.875rem] py-[1.5rem] font-spartan leading-[1.5625rem] font-normal"
                >
                  {activePlanet[activeOption.value].content}
                </p>
                <div className="h-max lg:mb-[2.44rem] justify-center md:justify-start flex items-center gap-[0.5rem]">
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
              <div className="shrink-1 self-center flex-1">
                <PlanetOptions
                  activeOption={activeOption}
                  activeBackground={getPlanetColor(activePlanet.name)}
                  options={planetOptions}
                  setActiveOption={handleSetActiveOption}
                />
              </div>
            </div>
          </div>
          <div className="mt-[1.75rem] md:mt-[1.69rem] lg:mt-[5.44rem] pb-[2.94rem] md:pb-[2.25rem] lg:pb-[3.5rem]">
            <PlanetInformation
              data={{
                rotation,
                revolution,
                radius,
                temperature,
              }}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default App;
