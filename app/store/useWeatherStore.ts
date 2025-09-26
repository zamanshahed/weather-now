"use client";

import { create } from "zustand";
import { WeatherResponseType } from "../types/WeatherResponseType";
import {
  DailyForecastResponseType,
  ForecastData,
  ForecastResponseType,
} from "../types/ForecastResponseType";
import { dayString } from "../component/DaySelector";
import { GeocodeResType } from "../types/GeocodeResType";

type WeatherState = {
  searchFieldText: string;
  setSearchFieldText: (text: string) => void;

  searchFieldFallbackText: string;
  setSearchFieldFallbackText: (text: string) => void;

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

  selectedDay: dayString | "";
  setSelectedDay: (day: dayString) => void;

  hourlyForecastResponse: ForecastData | null;
  setHourlyForecastResponse: (response: ForecastData | null) => void;

  geoCodingResponse: GeocodeResType[] | null;
  setGeoCodingResponse: (response: GeocodeResType[] | null) => void;
};

export const useWeatherStore = create<WeatherState>((set) => ({
  searchFieldText: "",
  setSearchFieldText: (text: string) => set(() => ({ searchFieldText: text })),
  clearSearchFieldText: () => set(() => ({ searchFieldText: "" })),

  searchFieldFallbackText: "",
  setSearchFieldFallbackText: (text: string) =>
    set(() => ({ searchFieldFallbackText: text })),

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

  selectedDay: "",
  setSelectedDay: (day: dayString) => set(() => ({ selectedDay: day })),

  hourlyForecastResponse: null,
  setHourlyForecastResponse: (response: ForecastData | null) =>
    set(() => ({ hourlyForecastResponse: response })),

  geoCodingResponse: null,
  setGeoCodingResponse: (response: GeocodeResType[] | null) =>
    set(() => ({ geoCodingResponse: response })),
}));
