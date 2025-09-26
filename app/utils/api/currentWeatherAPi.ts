import { useWeatherStore } from "@/app/store/useWeatherStore";
import {
  BaseUrl,
  CurrentWeatherUrl,
  IconsUrl,
  OpenWeatherApiKey,
} from "../Urls";
import { ForecastWeatherApi } from "./forecastAPi";
import { useGeneralStore } from "@/app/store/useGeneralStore";
import { setFaviconTitles } from "../utility";

export const CurrentWeatherApi = async (cityName: string) => {
  const { setWeatherResponse, units } = useWeatherStore.getState();

  const { setIsLoading, setCentralErrorDepo } = useGeneralStore.getState();
  try {
    setIsLoading(true);
    const response = await fetch(
      `${BaseUrl}${CurrentWeatherUrl}?q=${cityName}&appid=${OpenWeatherApiKey}&units=${units}`,
    );
    const data = await response.json();
    if (!response.ok) {
      setCentralErrorDepo([data?.message]);
      setWeatherResponse(data);
      setIsLoading(false);
    } else {
      setFaviconTitles(
        IconsUrl + data?.weather[0].icon + "@2x.png",
        data?.name +
          " " +
          data?.main.temp.toFixed(0) +
          `${units === "metric" ? "°C" : "°F"}`,
      );
      setWeatherResponse(data);
      if (data?.coord?.lat && data?.coord?.lon)
        ForecastWeatherApi(cityName, 40);
      return data;
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
