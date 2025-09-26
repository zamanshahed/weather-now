"use client";

import * as React from "react";
import HeroCard from "./HeroCard";
import WeatherInfoCard from "./WeatherInfoCard";
import { useWeatherStore } from "../store/useWeatherStore";
import { useGeneralStore } from "../store/useGeneralStore";

const HeroSection: React.FC = () => {
  const { weatherResponse, units } = useWeatherStore();
  const { centralErrorDepo, isLoading } = useGeneralStore();
  if (weatherResponse?.name)
    return (
      <div className="">
        <HeroCard />
        <div className="pt-8 grid grid-cols-4 gap-6 items-center justify-center">
          <WeatherInfoCard
            isLoading={isLoading}
            label="Feels Like"
            value={`${weatherResponse?.main?.feels_like}°${units === "metric" ? "C" : "F"}`}
          />
          <WeatherInfoCard
            isLoading={isLoading}
            label="Humidity"
            value={`${weatherResponse?.main?.humidity}%`}
          />
          <WeatherInfoCard
            isLoading={isLoading}
            label="Wind"
            value={`${weatherResponse?.wind?.speed ? (weatherResponse?.wind?.speed * 3.6).toFixed(1) : 0}${units === "metric" ? "km/h" : "mph"}`}
          />
          <WeatherInfoCard
            isLoading={isLoading}
            label="Precipitation"
            value={`${weatherResponse?.rain?.["1h"] ? weatherResponse?.rain?.["1h"] : 0}${units === "metric" ? "mm" : "in"}`}
          />
        </div>
      </div>
    );
  else if (centralErrorDepo?.length > 0)
    return (
      <div className="-mt-5 text-white font-bold text-3xl capitalize">
        {centralErrorDepo?.length > 0 ? centralErrorDepo[0] : ""}!
      </div>
    );
};

export default HeroSection;
