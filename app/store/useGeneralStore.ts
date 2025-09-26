"use client";

import { create } from "zustand";

type WeatherState = {
  centralErrorDepo: string[];
  setCentralErrorDepo: (error: string[]) => void;

  isLoading: boolean;
  setIsLoading: (loading: boolean) => void;
};

export const useGeneralStore = create<WeatherState>((set) => ({
  centralErrorDepo: [],
  setCentralErrorDepo: (error: string[]) =>
    set(() => ({ centralErrorDepo: error })),

  isLoading: false,
  setIsLoading: (loading: boolean) => set(() => ({ isLoading: loading })),
}));
