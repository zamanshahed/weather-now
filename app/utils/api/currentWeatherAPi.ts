import { useWeatherStore } from "@/app/store/useWeatherStore";
import { BaseUrl, CurrentWeatherUrl, OpenWeatherApiKey } from "../Urls";
import { ForecastWeatherApi } from "./forecastAPi";
import { useGeneralStore } from "@/app/store/useGeneralStore";

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
      setIsLoading(false);
    } else {
      if (data?.coord?.lat && data?.coord?.lon)
        ForecastWeatherApi(cityName, 40);
      setWeatherResponse(data);
      return data;
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
