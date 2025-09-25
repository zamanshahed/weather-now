import * as React from "react";

interface WeatherInfoCardProps {
  label: string;
  value: string;
}

const WeatherInfoCard: React.FC<WeatherInfoCardProps> = ({ label, value }) => {
  return (
    <div className="flex flex-col items-start justify-center gap-6 bg-[#262540] border border-[#3C3B5E] rounded-xl text-white p-5">
      <label className="text-lg capitalize font-medium">{label}</label>
      <span className="text-[32px] leading-8 font-light">{value}</span>
    </div>
  );
};

export default WeatherInfoCard;
