import { useEffect, useLayoutEffect, useRef, useState } from 'react';
import Spinner from '@components/Spinner.tsx';
import getPlanetColor from '@utils/getPlanetColor.ts';
import lowercase from '@utils/lowercase.ts';
import { fadeIn } from '@/animations';

type PlanetImageProps = {
  planetName: string;
  src: string;
  geologyImageSrc: string;
  showGeologyImage: boolean;
};

const PlanetImage = ({
  planetName,
  src,
  geologyImageSrc,
  showGeologyImage,
}: PlanetImageProps) => {
  const [planetImageLoading, setPlanetImageLoading] = useState(true);
  const geologyImageRef = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (showGeologyImage) {
      fadeIn({
        element: geologyImageRef,
      });
    }
  }, [showGeologyImage]);

  useEffect(() => {
    setPlanetImageLoading(true);
  }, [planetName]);

  return (
    <div className="relative select-none pointer-events-none">
      <div className={`${planetImageLoading ? 'block' : 'hidden'}`}>
        <Spinner fillColor={getPlanetColor(planetName)} />
      </div>
      <div className={`${planetImageLoading ? 'hidden' : 'block'}`}>
        <img
          className={`block object-contain h-auto max-w-full mx-auto lg:mx-0 planet-image ${lowercase(
            planetName
          )}`}
          src={src}
          onLoad={() => setPlanetImageLoading(false)}
          alt={planetName}
        />
        <div
          ref={geologyImageRef}
          className={`${
            showGeologyImage ? 'block' : 'hidden'
          } absolute left-1/2 -translate-x-1/2 top-[63%] opacity-0`}
        >
          <img
            className="object-contain h-auto max-w-[4.2rem] md:max-w-[6.8rem] lg:max-w-[10.1875rem]"
            src={geologyImageSrc}
            alt="Planet geology"
          />
        </div>
      </div>
    </div>
  );
};

export default PlanetImage;
