import { useWeatherStore } from "@/app/store/useWeatherStore";
import { BaseUrl, ForecastWeatherUrl, OpenWeatherApiKey } from "../Urls";

export const ForecastWeatherApi = async (
  cityName: string,
  numberOfDays: number,
) => {
  const { setForecastResponse, units } = useWeatherStore.getState();
  try {
    const response = await fetch(
      // /forecast?q=London&appid=9d729cfd40c256defac28e6a8266b774&units=metric
      `${BaseUrl}${ForecastWeatherUrl}?q=${cityName}&cnt=${numberOfDays}&appid=${OpenWeatherApiKey}&units=${units}`,
    );
    const data = await response.json();
    console.log("ForecastWeatherApi", data);
    setForecastResponse(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
