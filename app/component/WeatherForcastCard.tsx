"use client";

import Image from "next/image";
import * as React from "react";
import { IconsUrl } from "../utils/Urls";
import { useWeatherStore } from "../store/useWeatherStore";

interface WeatherForecastCardProps {
  day: string;
  iconCode: string;
  dayTemp: number;
  nightTemp: number;
}

const WeatherForecastCard: React.FC<WeatherForecastCardProps> = ({
  day,
  iconCode,
  dayTemp,
  nightTemp,
}) => {
  const { units } = useWeatherStore();
  return (
    <div className="flex flex-col items-center justify-center gap-4 bg-[#262540] border border-[#3C3B5E] rounded-xl text-white py-4 px-2.5 w-full">
      <label className="text-lg capitalize font-medium">{day}</label>
      <Image
        src={IconsUrl + iconCode + "@2x.png"}
        alt="weather Icon"
        width={60}
        height={60}
      />
      <div className="flex w-full items-center justify-between">
        <label className="text-lg font-medium">
          {dayTemp}°{units === "metric" ? "C" : "F"}
        </label>
        <label className="text-lg font-medium">
          {nightTemp}°{units === "metric" ? "C" : "F"}
        </label>
      </div>
    </div>
  );
};

export default WeatherForecastCard;
