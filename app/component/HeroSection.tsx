"use client";

import * as React from "react";
import HeroCard from "./HeroCard";
import WeatherInfoCard from "./WeatherInfoCard";
import { useWeatherStore } from "../store/useWeatherStore";

const HeroSection: React.FC = () => {
  const { weatherResponse } = useWeatherStore();
  if (weatherResponse?.name)
    return (
      <div className="mt-18">
        <HeroCard />
        <div className="pt-8 grid grid-cols-4 gap-6 items-center justify-center">
          <WeatherInfoCard
            label="Feels Like"
            value={`${weatherResponse?.main?.feels_like}°`}
          />
          <WeatherInfoCard
            label="Humidity"
            value={`${weatherResponse?.main?.humidity}%`}
          />
          <WeatherInfoCard
            label="Wind"
            value={`${weatherResponse?.wind?.speed ? (weatherResponse?.wind?.speed * 3.6).toFixed(1) : 0} km/h`}
          />
          <WeatherInfoCard
            label="Precipitation"
            value={`${weatherResponse?.rain?.["1h"] ? weatherResponse?.rain?.["1h"] : 0}mm`}
          />
        </div>
      </div>
    );
  else if (weatherResponse && !weatherResponse?.name)
    return (
      <div className="mt-5 text-gray-300 font-semibold text-base">
        City not found
      </div>
    );
};

export default HeroSection;
