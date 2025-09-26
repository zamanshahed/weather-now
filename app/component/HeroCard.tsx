"use client";

import Image from "next/image";
import * as React from "react";
import { useWeatherStore } from "../store/useWeatherStore";
import { IconsUrl } from "../utils/Urls";
import { countryMap } from "../utils/countryCodes";
import { useGeneralStore } from "../store/useGeneralStore";
import { DotWave } from "ldrs/react";
import "ldrs/react/DotWave.css";

const HeroCard: React.FC = () => {
  const { weatherResponse, units } = useWeatherStore();
  const { isLoading } = useGeneralStore();
  return (
    <div className="relative text-white">
      {isLoading ? (
        <div className="bg-[#262540] w-[800px] h-[286px] rounded-xl" />
      ) : (
        <>
          <Image
            src="/icons/d-hero-bg.svg"
            alt="hero-image"
            width={800}
            height={286}
            className="w-full object-cover sm:block hidden"
          />
          <Image
            alt="hero-image-sm"
            src={"/icons/hero-bg-sm.svg"}
            width={343}
            height={286}
            className="w-full sm:hidden block"
          />
        </>
      )}
      {isLoading ? (
        <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
          <DotWave size="80" speed="1" color="white" />
          <p className="text-center">Loading...</p>
        </div>
      ) : (
        <div className="absolute top-1/2 left-0 transform -translate-y-1/2 flex sm:flex-row flex-col sm:gap-4 items-center justify-between w-full p-6">
          <div className="flex flex-col items-center sm:items-start">
            <h1 className="sm:text-[28px] text-xl font-bold text-center sm:text-left">
              {weatherResponse?.name}
              {weatherResponse?.sys.country
                ? `, ${countryMap[weatherResponse?.sys.country]}`
                : ""}
            </h1>
            <p className="sm:text-lg text-sm font-medium capitalize">
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
            <div className="flex items-center text-[96px] font-semibold italic">
              <p className="">{weatherResponse?.main.temp.toFixed(0)}</p>
              <span className="sm:block hidden">
                {units === "metric" ? "°C" : "°F"}
              </span>
              <span className="sm:hidden block">°</span>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default HeroCard;
