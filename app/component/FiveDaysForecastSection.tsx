"use client";

import * as React from "react";
import { useWeatherStore } from "../store/useWeatherStore";
import WeatherForecastCard from "./WeatherForcastCard";
import { useGeneralStore } from "../store/useGeneralStore";

const FiveDaysForecastSection: React.FC = () => {
  const { fiveDayForecastResponse, weatherResponse } = useWeatherStore();
  const { isLoading } = useGeneralStore();
  if (fiveDayForecastResponse?.length && weatherResponse?.name)
    return (
      <div className="mt-12 w-full">
        <h1 className="text-white text-xl font-semibold mb-5">
          Daily forecast
        </h1>
        <div className="grid grid-cols-3 md:grid-cols-5 gap-4">
          {fiveDayForecastResponse.map((item, index) => (
            <WeatherForecastCard
              key={index}
              isLoading={isLoading}
              day={item?.day}
              iconCode={item?.icon}
              dayTemp={item?.day_temp ? parseInt(item.day_temp.toFixed(0)) : 0}
              nightTemp={
                item?.night_temp ? parseInt(item.night_temp.toFixed(0)) : 0
              }
            />
          ))}
        </div>
      </div>
    );
};

export default FiveDaysForecastSection;
