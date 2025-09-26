import * as React from "react";
import { DotPulse } from "ldrs/react";
import "ldrs/react/DotPulse.css";

interface WeatherInfoCardProps {
  label: string;
  value: string;
  isLoading: boolean;
}

const WeatherInfoCard: React.FC<WeatherInfoCardProps> = ({
  label,
  value,
  isLoading,
}) => {
  return (
    <div className="flex flex-col items-start justify-center gap-6 bg-[#262540] border border-[#3C3B5E] rounded-xl text-white p-5">
      <label className="text-lg capitalize font-medium">{label}</label>
      {isLoading ? (
        <div className="h-6">
          <DotPulse size="24" speed="1.3" color="white" />
        </div>
      ) : (
        <span className="text-[32px] leading-8 font-light">{value}</span>
      )}
    </div>
  );
};

export default WeatherInfoCard;
