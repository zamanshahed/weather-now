"use client";

import Image from "next/image";
import * as React from "react";
import { IconsUrl } from "../utils/Urls";
import { useWeatherStore } from "../store/useWeatherStore";
import { DotPulse } from "ldrs/react";
import "ldrs/react/DotWave.css";

interface WeatherForecastCardProps {
  day: string;
  iconCode: string;
  dayTemp: number;
  nightTemp: number;
  isLoading: boolean;
}

const WeatherForecastCard: React.FC<WeatherForecastCardProps> = ({
  day,
  iconCode,
  dayTemp,
  nightTemp,
  isLoading,
}) => {
  const { units } = useWeatherStore();
  if (isLoading)
    return (
      <div className="h-[182px] flex flex-col items-center justify-center gap-4 bg-[#262540] border border-[#3C3B5E] rounded-xl text-white py-4 px-2.5 w-full">
        <DotPulse size="24" speed="1.3" color="white" />
      </div>
    );
  else
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
