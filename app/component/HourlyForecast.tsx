"use client";

import * as React from "react";
import DaySelector, { dayString } from "./DaySelector";
import { useWeatherStore } from "../store/useWeatherStore";
import Image from "next/image";
import { IconsUrl } from "../utils/Urls";
import { useGeneralStore } from "../store/useGeneralStore";
import { DotPulse } from "ldrs/react";
import "ldrs/react/DotWave.css";

const HourlyForecastSection: React.FC = () => {
  const {
    units,
    selectedDay,
    setSelectedDay,
    weatherResponse,
    hourlyForecastResponse,
  } = useWeatherStore();
  const { isLoading } = useGeneralStore();

  if (weatherResponse?.name && hourlyForecastResponse) {
    const daysArray = Object.keys(hourlyForecastResponse) as dayString[];
    return (
      <div className="lg:w-[384px] w-full rounded-2xl bg-[#262540] text-white md:p-6 p-4 sm:mt-0 mt-3">
        <div className="flex items-center justify-between mb-4">
          <h1 className="md:text-xl text-base font-semibold">
            Hourly Forecast
          </h1>
          {isLoading ? (
            <DotPulse size="24" speed="1.3" color="white" />
          ) : (
            <DaySelector
              dayList={daysArray}
              value={selectedDay ? selectedDay : daysArray[0]}
              onChange={setSelectedDay}
            />
          )}
        </div>
        <ul className="space-y-4 max-h-[685px] overflow-y-auto">
          {isLoading
            ? [1, 2, 3, 4, 5, 6, 7, 8].map((item) => (
                <li
                  key={item}
                  className="flex items-center justify-between bg-[#302F4A] border border-[#3C3B5E] h-[62px] rounded-lg animate-pulse"
                ></li>
              ))
            : hourlyForecastResponse[selectedDay].map((item, index) => (
                <li
                  key={index}
                  className="flex items-center justify-between bg-[#302F4A] border border-[#3C3B5E] py-2.5 px-3 rounded-lg"
                >
                  <span className="flex items-center gap-2 font-medium">
                    <Image
                      src={IconsUrl + item.icon + "@2x.png"}
                      alt="Weather Icon"
                      width={40}
                      height={40}
                    />
                    <span className="text-xl">{item?.time}</span>
                  </span>
                  <span className="text-sm">
                    {item?.temp}°{units === "metric" ? "C" : "F"}
                  </span>
                </li>
              ))}
        </ul>
      </div>
    );
  }
};

export default HourlyForecastSection;
