"use client";

import { LineSpinner } from "ldrs/react";
import "ldrs/react/LineSpinner.css";
import Image from "next/image";
import React, { useEffect } from "react";
import { useGeneralStore } from "../store/useGeneralStore";
import { useWeatherStore } from "../store/useWeatherStore";
import { CurrentWeatherApi } from "../utils/api/currentWeatherAPi";
import { useDebounce } from "use-debounce";
import { geoCodingApi } from "../utils/api/geoCodingAPi";
import { GeocodeResType } from "../types/GeocodeResType";
import { countryMap } from "../utils/countryCodes";
import "ldrs/react/DotWave.css";

export default function SearchBox() {
  const {
    searchFieldText,
    setSearchFieldText,
    setSearchFieldFallbackText,
    geoCodingResponse,
    setGeoCodingResponse,
  } = useWeatherStore();
  const { isLoading, isLoadingGeoCoding } = useGeneralStore();
  const inputRef = React.useRef<HTMLInputElement>(null);

  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CurrentWeatherApi(searchFieldText);
    inputRef.current?.blur();
  };

  const [debouncedSearchText] = useDebounce(searchFieldText, 1000);

  useEffect(() => {
    if (debouncedSearchText.trim()) {
      geoCodingApi(debouncedSearchText);
    } else setGeoCodingResponse(null);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [debouncedSearchText]);

  return (
    <div className="w-full md:mt-18 mt-12">
      <h1
        style={{ fontFamily: "var(--font-bricolage)" }}
        className="text-white text-center text-[52px] font-bold md:w-full sm:w-[482px] w-full mx-auto mb-8"
      >
        {"How's the sky looking today?"}
      </h1>

      <form
        onSubmit={handleSearch}
        className="w-full flex sm:flex-row flex-col items-center justify-center gap-3"
      >
        <div className="relative w-full md:max-w-[640px]">
          <input
            ref={inputRef}
            required
            type="search"
            value={searchFieldText}
            onChange={(e) => {
              setSearchFieldText(e.target.value);
              setSearchFieldFallbackText(e.target.value);
            }}
            placeholder="Search for a place..."
            className="!w-full py-3 pr-4 pl-12 border border-[#4B5563B2]/70 bg-[#262540] text-[#D4D3D9] rounded-lg cursor-pointer focus-visible:outline-2 focus-visible:outline-white outline-offset-2"
          />
          <Image
            alt="search-icon"
            src={"/icons/search-icon.svg"}
            width={20}
            height={20}
            className="absolute left-5 top-1/2 -translate-y-1/2"
          />

          {!!searchFieldText && geoCodingResponse !== null && (
            <div className="absolute top-14 z-50 w-full flex flex-col gap-2 bg-[#262540] border border-[#302F4A] rounded-xl p-2">
              {isLoadingGeoCoding ? (
                <button
                  type="button"
                  className="border border-transparent p-2.5 rounded-lg"
                >
                  <div className="text-white text-base font-medium text-left flex items-center gap-2">
                    <LineSpinner
                      size="16"
                      stroke="1.5"
                      speed="1"
                      color="white"
                    />
                    Loading...
                  </div>
                </button>
              ) : geoCodingResponse?.length ? (
                geoCodingResponse.map((item: GeocodeResType, index: number) => (
                  <button
                    type="button"
                    onClick={() => {
                      setSearchFieldText(item.name);
                      setSearchFieldFallbackText(item.name);
                      CurrentWeatherApi(item.name);
                      setGeoCodingResponse(null);
                    }}
                    key={item.name + "_" + index}
                    className="hover:bg-[#302F4A] border border-transparent hover:border-[#3C3B5E] p-2.5 rounded-lg cursor-pointer text-left"
                  >
                    <div className="text-white text-base font-medium">
                      {item.name}, {item.state}, {countryMap[item.country]}
                    </div>
                  </button>
                ))
              ) : geoCodingResponse !== null &&
                geoCodingResponse.length === 0 ? (
                <button
                  type="button"
                  className="border border-transparent p-2.5 rounded-lg"
                >
                  <div className="text-white text-base font-medium text-left">
                    No City Found.. Please try again.
                  </div>
                </button>
              ) : null}
            </div>
          )}
        </div>

        <button
          type="submit"
          disabled={isLoading}
          className="bg-[#4658D9] hover:bg-[#2B1B9C] text-white py-3 px-7 rounded-xl font-medium cursor-pointer focus-visible:outline-[#4658D9] focus-visible:outline-2 outline-offset-2 sm:w-max w-full"
        >
          {isLoading ? "Loading..." : "Search"}
          {isLoading && (
            <LineSpinner size="16" stroke="1.5" speed="1" color="white" />
          )}
        </button>
      </form>
    </div>
  );
}
