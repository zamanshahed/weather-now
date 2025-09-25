"use client";

import * as React from "react";
import HeroCard from "./HeroCard";
import WeatherInfoCard from "./WeatherInfoCard";
import { useWeatherStore } from "../store/useWeatherStore";

const HeroSection: React.FC = () => {
  const { weatherResponse, units } = useWeatherStore();
  if (weatherResponse?.name)
    return (
      <div className="">
        <HeroCard />
        <div className="pt-8 grid grid-cols-4 gap-6 items-center justify-center">
          <WeatherInfoCard
            label="Feels Like"
            value={`${weatherResponse?.main?.feels_like}°${units === "metric" ? "C" : "F"}`}
          />
          <WeatherInfoCard
            label="Humidity"
            value={`${weatherResponse?.main?.humidity}%`}
          />
          <WeatherInfoCard
            label="Wind"
            value={`${weatherResponse?.wind?.speed ? (weatherResponse?.wind?.speed * 3.6).toFixed(1) : 0}${units === "metric" ? "km/h" : "mph"}`}
          />
          <WeatherInfoCard
            label="Precipitation"
            value={`${weatherResponse?.rain?.["1h"] ? weatherResponse?.rain?.["1h"] : 0}${units === "metric" ? "mm" : "in"}`}
          />
        </div>
      </div>
    );
  else if (weatherResponse && !weatherResponse?.name)
    return (
      <div className="mt-5 text-white font-bold text-3xl">
        No search result found!
      </div>
    );
};

export default HeroSection;
