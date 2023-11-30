import type { PlanetInformation as PlanetInformationType } from '@/types';

type PlanetInformationProps = {
  data: PlanetInformationType;
};

type InformationBoxProps = {
  title: string;
  value: string;
};

const InformationBox = ({ title, value }: InformationBoxProps) => {
  return (
    <div className="w-full flex flex-row md:flex-col pt-0 md:pt-[1rem] lg:pt-[1.25rem] px-[1.5rem] md:px-[0.94rem] lg:px-[1.44rem] items-center md:items-start justify-between border border-[rgba(255,255,255,0.2)]">
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
  return (
    <div className="w-full flex flex-col md:flex-row gap-0 gap-y-[0.5rem] lg:gap-[1.88rem] md:gap-[0.69rem] justify-between">
      <div className="flex-1 md:basis-[16rem]">
        <InformationBox title="rotation time" value={rotation} />
      </div>
      <div className="flex-1 md:basis-[16rem]">
        <InformationBox title="revolution time" value={revolution} />
      </div>
      <div className="flex-1 md:basis-[16rem]">
        <InformationBox title="radius" value={radius} />
      </div>
      <div className="flex-1 md:basis-[16rem]">
        <InformationBox title="average temp." value={temperature} />
      </div>
    </div>
  );
};

export default PlanetInformation;
