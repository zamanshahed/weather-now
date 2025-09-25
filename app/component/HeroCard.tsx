"use client";

import Image from "next/image";
import * as React from "react";
import { useWeatherStore } from "../store/useWeatherStore";
import { IconsUrl } from "../utils/Urls";
import { countryMap } from "../utils/countryCodes";

const HeroCard: React.FC = () => {
  const { weatherResponse } = useWeatherStore();
  // console.log({ weatherResponse });

  return (
    <div className="relative text-white">
      <Image
        src="/icons/d-hero-bg.svg"
        alt="Hero Image"
        width={800}
        height={286}
      />
      <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 flex items-center justify-between w-full p-6">
        <div>
          <h1 className="text-[28px] font-bold">
            {weatherResponse?.name}
            {weatherResponse?.sys.country
              ? `, ${countryMap[weatherResponse?.sys.country]}`
              : ""}
          </h1>
          <p className="text-xs font-medium capitalize">
            {new Date().toLocaleDateString("en-US", {
              weekday: "long",
              month: "short",
              day: "numeric",
              year: "numeric",
            })}
          </p>
        </div>

        <div className="flex items-baseline gap-5">
          <div className="">
            <Image
              src={IconsUrl + weatherResponse?.weather[0].icon + "@2x.png"}
              alt="weather Icon"
              width={100}
              height={100}
            />
            <p className="text-sm text-center mx-auto font-medium capitalize -mt-4">
              {weatherResponse?.weather[0]?.description}
            </p>
          </div>
          <div className="flex flex-col items-center">
            <p className="text-[96px] font-semibold">
              {weatherResponse?.main.temp.toFixed(1)}
              {"°"}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default HeroCard;
