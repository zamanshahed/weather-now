"use client";

import { create } from "zustand";
import { WeatherResponseType } from "../types/WeatherResponseType";
import {
  DailyForecastResponseType,
  ForecastResponseType,
} from "../types/ForecastResponseType";

type WeatherState = {
  searchFieldText: string;
  setSearchFieldText: (text: string) => void;

  weatherResponse: WeatherResponseType | null;
  setWeatherResponse: (response: WeatherResponseType | null) => void;

  forecastResponse: ForecastResponseType | null;
  setForecastResponse: (response: ForecastResponseType | null) => void;

  fiveDayForecastResponse: DailyForecastResponseType[] | null;
  setFiveDayForecastResponse: (
    response: DailyForecastResponseType[] | null,
  ) => void;

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

  forecastResponse: null,
  setForecastResponse: (response: ForecastResponseType | null) =>
    set(() => ({ forecastResponse: response })),

  fiveDayForecastResponse: null,
  setFiveDayForecastResponse: (response: DailyForecastResponseType[] | null) =>
    set(() => ({ fiveDayForecastResponse: response })),

  units: "metric",
  setUnits: (units: "metric" | "imperial") => set(() => ({ units })),
}));
