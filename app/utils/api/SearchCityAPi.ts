import { useWeatherStore } from "@/app/store/useWeatherStore";
import { BaseUrl, CurrentWeatherUrl, OpenWeatherApiKey } from "../Urls";

export const SearchCityApi = async (cityName: string) => {
  const { setWeatherResponse, units } = useWeatherStore.getState();
  try {
    const response = await fetch(
      `${BaseUrl}${CurrentWeatherUrl}?q=${cityName}&appid=${OpenWeatherApiKey}&units=${units}`,
    );
    const data = await response.json();
    setWeatherResponse(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
