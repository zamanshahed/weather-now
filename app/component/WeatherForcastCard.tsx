import Image from "next/image";
import * as React from "react";
import { IconsUrl } from "../utils/Urls";

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
  return (
    <div className="flex flex-col items-center justify-center gap-6 bg-[#262540] border border-[#3C3B5E] rounded-xl text-white p-5">
      <label className="text-lg capitalize font-medium">{day}</label>
      <Image
        src={IconsUrl + iconCode + "@2x.png"}
        alt="weather Icon"
        width={100}
        height={100}
      />
      <div className="flex items-center justify-center gap-2">
        <label className="text-lg font-medium">{dayTemp}°</label>
        <label className="text-lg font-medium">{nightTemp}°</label>
      </div>
    </div>
  );
};

export default WeatherForecastCard;
