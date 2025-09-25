import { useWeatherStore } from "@/app/store/useWeatherStore";
import { BaseUrl, CurrentWeatherUrl, OpenWeatherApiKey } from "../Urls";
import { ForecastWeatherApi } from "./forecastAPi";

export const CurrentWeatherApi = async (cityName: string) => {
  const { setWeatherResponse, units } = useWeatherStore.getState();
  try {
    const response = await fetch(
      `${BaseUrl}${CurrentWeatherUrl}?q=${cityName}&appid=${OpenWeatherApiKey}&units=${units}`,
    );
    const data = await response.json();
    if (data?.coord?.lat && data?.coord?.lon) ForecastWeatherApi(cityName, 7);
    setWeatherResponse(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
