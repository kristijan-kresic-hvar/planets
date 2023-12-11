import type {
  AnimationProps,
  PlanetInformation as PlanetInformationType,
} from '@/types';
import { fadeInUp } from '@/animations';
import { BASE_DELAY, PLANET_INFORMATION_TITLES } from '@/constants';
import { useLayoutEffect, useMemo, useRef } from 'react';

type PlanetInformationProps = {
  data: PlanetInformationType;
};

type InformationBoxProps = {
  title: string;
  value: string;
} & AnimationProps;

const InformationBox = ({
  title,
  value,
  animation = true,
  animationDuration = 0.5,
  animationDelay = 0,
}: InformationBoxProps) => {
  const ref = useRef<HTMLDivElement | null>(null);

  useLayoutEffect(() => {
    if (!animation) return;
    const animationFrame = requestAnimationFrame(() => {
      fadeInUp({
        element: ref,
        duration: animationDuration,
        delay: animationDelay,
      });
    });
    return () => {
      if (animationFrame) cancelAnimationFrame(animationFrame);
    };
  }, [animation, animationDelay, animationDuration, value]);

  if (!title || !value) return null;

  return (
    <div
      ref={ref}
      className="w-full flex flex-row md:flex-col pt-0 md:pt-[1rem] lg:pt-[1.25rem] px-[1.5rem] md:px-[0.94rem] lg:px-[1.44rem] items-center md:items-start justify-between border border-[rgba(255,255,255,0.2)]"
    >
      <h3 className="text-opacity-50 mt-[0.44rem] md:mt-0 font-bold text-white uppercase font-spartan text-[0.5rem] lg:text-[0.6875rem] mb-[0.25rem] whitespace-nowrap">
        {title}
      </h3>
      <p className="text-white leading-normal tracking-[-0.04688rem] md:tracking-[-0.05625rem] lg:tracking-[-0.09375rem] font-antonio text-[1.25rem] md:text-[1.5rem] lg:text-[2.5rem] whitespace-nowrap my-[0.56rem] md:mb-[1.19rem] lg:mb-[1.69rem]">
        {value}
      </p>
    </div>
  );
};

const PlanetInformation = ({
  data: { rotation, revolution, radius, temperature },
}: PlanetInformationProps) => {
  const infoData = useMemo(
    () => [
      {
        title: PLANET_INFORMATION_TITLES.rotation,
        value: rotation,
      },
      {
        title: PLANET_INFORMATION_TITLES.revolution,
        value: revolution,
      },
      {
        title: PLANET_INFORMATION_TITLES.radius,
        value: radius,
      },
      {
        title: PLANET_INFORMATION_TITLES.temperature,
        value: temperature,
      },
    ],
    [radius, revolution, rotation, temperature]
  );

  return (
    <div className="w-full flex flex-col md:flex-row gap-0 gap-y-[0.5rem] lg:gap-[1.88rem] md:gap-[0.69rem] justify-between">
      {infoData.map(({ title, value }, index) => (
        <div key={title} className="flex-1 md:basis-[16rem]">
          <InformationBox
            title={title}
            value={value}
            animationDelay={index * BASE_DELAY}
          />
        </div>
      ))}
    </div>
  );
};

export default PlanetInformation;
