"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useWeatherStore } from "../store/useWeatherStore";
import UnitSelector from "./UnitSelector";
import { CurrentWeatherApi } from "../utils/api/currentWeatherAPi";
import Link from "next/link";
import { setFaviconTitles } from "../utils/utility";

export default function TopSection() {
  const {
    units,
    setUnits,
    weatherResponse,
    setWeatherResponse,
    setSearchFieldText,
  } = useWeatherStore();

  const handleUnitChange = (value: string) => {
    const newUnit = value as "metric" | "imperial";
    setUnits(newUnit);
    localStorage.setItem("units", newUnit);
    if (weatherResponse?.name) CurrentWeatherApi(weatherResponse?.name); //note: refetch the data if there is any successful response, with changed units pref.
  };

  useEffect(() => {
    const localUnit = localStorage.getItem("units");
    if (!localUnit) {
      localStorage.setItem("units", "metric");
      setUnits("metric");
    } else setUnits(localUnit as "metric" | "imperial");

    setFaviconTitles("/icons/logo.png");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-between w-full">
      <Link
        href="/"
        onClick={() => {
          setWeatherResponse(null);
          setSearchFieldText("");
        }}
        className="gap-2.5 flex items-center"
      >
        <Image
          src="/icons/logo.svg"
          alt="logo"
          width={40}
          height={40}
          className="w-7 h-7 md:w-10 md:h-10"
        />
        <h1
          style={{ fontFamily: "var(--font-bricolage)" }}
          className="text-white md:text-[22px] text-sm font-bold"
        >
          Weather Today
        </h1>
      </Link>
      <UnitSelector value={units} onChange={handleUnitChange} />
    </div>
  );
}
