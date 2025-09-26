"use client";

import * as React from "react";
import { useWeatherStore } from "../store/useWeatherStore";
import Image from "next/image";
import { CurrentWeatherApi } from "../utils/api/currentWeatherAPi";
import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";
import { useGeneralStore } from "../store/useGeneralStore";

interface ApiErrorSectionProps {
  children: React.ReactNode;
}

const ApiErrorSection: React.FC<ApiErrorSectionProps> = ({ children }) => {
  const { weatherResponse, searchFieldFallbackText } = useWeatherStore();
  const { isLoading } = useGeneralStore();
  if (Number(weatherResponse?.cod) >= 500)
    return (
      <div className="flex flex-col justify-center items-center space-y-6 p-10 mt-16 text-white">
        <Image src="/icons/wrong.svg" alt="Error" width={42} height={50} />
        <h1
          style={{ fontFamily: "var(--font-bricolage)" }}
          className="text-[52px] font-bold"
        >
          Something went wrong
        </h1>

        <p className="text-xl font-medium max-w-[550px] text-center">
          We couldn’t connect to the server (API error). Please try again in a
          few moments.
        </p>

        <button
          onClick={() => {
            CurrentWeatherApi(searchFieldFallbackText);
          }}
          disabled={isLoading}
          className="bg-[#262540] hover:bg-[#262540]/80 text-white font-medium py-3 px-4 cursor-pointer rounded-lg flex items-center gap-2.5 select-none"
        >
          {isLoading ? "Retrying..." : "Retry"}
          {isLoading ? (
            <LineSpinner size="16" stroke="1.5" speed="1" color="white" />
          ) : (
            <Image src="/icons/retry.svg" alt="Retry" width={16} height={16} />
          )}
        </button>
      </div>
    );
  else return children;
};

export default ApiErrorSection;
