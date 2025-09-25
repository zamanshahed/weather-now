"use client";

import Image from "next/image";
import React, { useEffect } from "react";
import { useWeatherStore } from "../store/useWeatherStore";
import UnitSelector from "./UnitSelector";
import { CurrentWeatherApi } from "../utils/api/currentWeatherAPi";

export default function TopSection() {
  const { units, setUnits, searchFieldText } = useWeatherStore();

  const handleUnitChange = (value: string) => {
    const newUnit = value as "metric" | "imperial";
    setUnits(newUnit);
    localStorage.setItem("units", newUnit);
    CurrentWeatherApi(searchFieldText); //refetch the data with desired units pref.
  };

  useEffect(() => {
    const localUnit = localStorage.getItem("units");
    if (!localUnit) {
      localStorage.setItem("units", "metric");
      setUnits("metric");
    } else setUnits(localUnit as "metric" | "imperial");
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  return (
    <div className="flex justify-between w-full">
      <div className="gap-2.5 flex items-center">
        <Image src="/icons/logo.svg" alt="logo" width={40} height={40} />
        <h1 className="text-white text-2xl font-semibold">Weather Today</h1>
      </div>
      <UnitSelector value={units} onChange={handleUnitChange} />
    </div>
  );
}
