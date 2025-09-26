import { useGeneralStore } from "@/app/store/useGeneralStore";
import { useWeatherStore } from "@/app/store/useWeatherStore";
import { GeocodingUrl, OpenWeatherApiKey } from "../Urls";

export const geoCodingApi = async (cityName: string) => {
  const { setGeoCodingResponse } = useWeatherStore.getState();

  const { setIsLoadingGeoCoding, setCentralErrorDepo } =
    useGeneralStore.getState();
  try {
    setIsLoadingGeoCoding(true);
    const response = await fetch(
      `${GeocodingUrl}/direct?q=${cityName}&limit=5&appid=${OpenWeatherApiKey}`,
    );
    const data = await response.json();
    setIsLoadingGeoCoding(false);
    setGeoCodingResponse(data);
    if (!response.ok) {
      setCentralErrorDepo([data?.message]);
    } else {
      return data;
    }
    setIsLoadingGeoCoding(false);
  } catch (error) {
    console.log(error);
    setIsLoadingGeoCoding(false);
  }
};
