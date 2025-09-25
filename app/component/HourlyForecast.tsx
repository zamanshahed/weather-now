"use client";

import * as React from "react";
import DaySelector, { dayString } from "./DaySelector";
import { useWeatherStore } from "../store/useWeatherStore";
import Image from "next/image";
import { IconsUrl } from "../utils/Urls";

const HourlyForecastSection: React.FC = () => {
  const {
    units,
    selectedDay,
    setSelectedDay,
    weatherResponse,
    hourlyForecastResponse,
  } = useWeatherStore();

  if (weatherResponse?.name && hourlyForecastResponse) {
    const daysArray = Object.keys(hourlyForecastResponse) as dayString[];
    return (
      <div className="w-[384px] rounded-2xl bg-[#262540] text-white p-6">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-xl font-semibold">Hourly Forecast</h1>
          <DaySelector
            dayList={daysArray}
            value={selectedDay ? selectedDay : daysArray[0]}
            onChange={setSelectedDay}
          />
        </div>
        <ul className="space-y-4">
          {hourlyForecastResponse[selectedDay].map((item, index) => (
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
