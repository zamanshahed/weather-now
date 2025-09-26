"use client";

import { LineSpinner } from "ldrs/react";
import "ldrs/react/DotWave.css";
import "ldrs/react/LineSpinner.css";
import Image from "next/image";
import React from "react";
import { useGeneralStore } from "../store/useGeneralStore";
import { useWeatherStore } from "../store/useWeatherStore";
import { CurrentWeatherApi } from "../utils/api/currentWeatherAPi";

export default function SearchBox() {
  const { searchFieldText, setSearchFieldText } = useWeatherStore();
  const { isLoading } = useGeneralStore();
  const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    CurrentWeatherApi(searchFieldText);
  };
  return (
    <div className="w-full mt-18">
      <h1
        style={{ fontFamily: "var(--font-bricolage)" }}
        className="text-white text-center text-[52px] font-bold w-full mb-8"
      >
        How is the sky looking today?
      </h1>
      <form
        onSubmit={handleSearch}
        className="w-full flex items-center justify-center gap-3"
      >
        <div className="relative w-full max-w-[640px]">
          <input
            required
            type="search"
            value={searchFieldText}
            onChange={(e) => setSearchFieldText(e.target.value)}
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
        </div>
        <button
          type="submit"
          disabled={isLoading}
          className="bg-blue-500 hover:bg-blue-700 text-white py-3 px-7 rounded-xl font-medium cursor-pointer hover:outline-blue-500 hover:outline-2 outline-offset-2"
        >
          {isLoading ? "Loading..." : "Search"}
          {isLoading && (
            <LineSpinner size="16" stroke="1.5" speed="1" color="black" />
          )}
        </button>
      </form>
    </div>
  );
}
