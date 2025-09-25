"use client";

import { create } from "zustand";
import { WeatherResponseType } from "../types/WeatherResponseType";

type WeatherState = {
  searchFieldText: string;
  setSearchFieldText: (text: string) => void;

  weatherResponse: WeatherResponseType | null;
  setWeatherResponse: (response: WeatherResponseType | null) => void;

  units: "metric" | "imperial";
  setUnits: (units: "metric" | "imperial") => void;
};

export const useWeatherStore = create<WeatherState>((set) => ({
  searchFieldText: "",
  setSearchFieldText: (text: string) => set(() => ({ searchFieldText: text })),
  clearSearchFieldText: () => set(() => ({ searchFieldText: "" })),

  weatherResponse: null,
  setWeatherResponse: (response: WeatherResponseType | null) =>
    set(() => ({ weatherResponse: response })),

  units: "metric",
  setUnits: (units: "metric" | "imperial") => set(() => ({ units })),
}));
