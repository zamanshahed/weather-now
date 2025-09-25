"use client";

import * as React from "react";
import { useWeatherStore } from "../store/useWeatherStore";
import WeatherForecastCard from "./WeatherForcastCard";

const FiveDaysForecastSection: React.FC = () => {
  const { fiveDayForecastResponse } = useWeatherStore();
  if (fiveDayForecastResponse?.length)
    return (
      <div className="mt-12">
        <h1 className="text-white text-xl font-semibold mb-5">
          Daily forecast
        </h1>
        <div className="grid grid-cols-5 gap-6">
          {fiveDayForecastResponse.map((item, index) => (
            <WeatherForecastCard
              key={index}
              day={item?.day}
              iconCode={item?.icon}
              dayTemp={item?.day_temp}
              nightTemp={item?.night_temp}
            />
          ))}
        </div>
      </div>
    );
};

export default FiveDaysForecastSection;
