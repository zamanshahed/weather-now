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
      <div className="w-full">
        <HeroCard />
        <div className="w-full md:pt-8 pt-5 grid grid-cols-2 md:grid-cols-4 md:gap-6 gap-4 items-center justify-center">
          <WeatherInfoCard
            isLoading={isLoading}
            label="Feels Like"
            value={`${weatherResponse?.main?.feels_like ? weatherResponse?.main?.feels_like.toFixed(0) : 0}°${units === "metric" ? "C" : "F"}`}
          />
          <WeatherInfoCard
            isLoading={isLoading}
            label="Humidity"
            value={`${weatherResponse?.main?.humidity ? weatherResponse?.main?.humidity.toFixed(0) : 0}%`}
          />
          <WeatherInfoCard
            isLoading={isLoading}
            label="Wind"
            value={`${weatherResponse?.wind?.speed ? (weatherResponse?.wind?.speed * 3.6).toFixed(0) : 0}${units === "metric" ? " km/h" : " mph"}`}
          />
          <WeatherInfoCard
            isLoading={isLoading}
            label="Precipitation"
            value={`${weatherResponse?.rain?.["1h"] ? weatherResponse?.rain?.["1h"].toFixed(0) : 0}${units === "metric" ? " mm" : " in"}`}
          />
        </div>
      </div>
    );
  else if (centralErrorDepo?.length > 0)
    return (
      <div className="-mt-5 text-white font-bold text-3xl capitalize">
        {centralErrorDepo?.length > 0
          ? centralErrorDepo[0] === "city not found"
            ? "No search result found!"
            : centralErrorDepo[0]
          : ""}
      </div>
    );
};

export default HeroSection;
