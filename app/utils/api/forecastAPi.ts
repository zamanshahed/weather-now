import { useWeatherStore } from "@/app/store/useWeatherStore";
import { BaseUrl, ForecastWeatherUrl, OpenWeatherApiKey } from "../Urls";
import {
  Forecast3HrItem,
  ForecastResponseType,
} from "@/app/types/ForecastResponseType";

function getFiveDayForecast(data: ForecastResponseType) {
  const daily = {};

  data.list.forEach((entry: Forecast3HrItem) => {
    const date = entry.dt_txt.split(" ")[0];
    const temp = entry.main.temp;

    if (!daily[date]) {
      daily[date] = {
        temps: [],
        icons: [],
      };
    }

    daily[date].temps.push(temp);
    daily[date].icons.push(entry.weather[0].icon);
  });

  const result = Object.keys(daily)
    .slice(0, 5)
    .map((date) => {
      const temps = daily[date].temps;
      const dayTemp = Math.max(...temps); // daytime high
      const nightTemp = Math.min(...temps); // nighttime low

      // Most frequent icon
      const icons = daily[date].icons;
      const icon = icons
        .sort(
          (a, b) =>
            icons.filter((v) => v === a).length -
            icons.filter((v) => v === b).length,
        )
        .pop();

      // Format day name
      const dayName = new Date(date).toLocaleDateString("en-US", {
        weekday: "short",
      });

      return {
        day: dayName,
        day_temp: dayTemp.toFixed(1),
        night_temp: nightTemp.toFixed(1),
        icon,
      };
    });

  return result;
}

export const ForecastWeatherApi = async (
  cityName: string,
  numberOfTimeStamps: number,
) => {
  const { setForecastResponse, setFiveDayForecastResponse, units } =
    useWeatherStore.getState();
  try {
    const response = await fetch(
      `${BaseUrl}${ForecastWeatherUrl}?q=${cityName}&cnt=${numberOfTimeStamps}&appid=${OpenWeatherApiKey}&units=${units}`,
    );
    const data = await response.json();
    // console.log("ForecastWeatherApi", data);
    const fiveDaysData = getFiveDayForecast(data);
    // console.log("Five Days Forecast", fiveDaysData);
    setFiveDayForecastResponse(fiveDaysData);
    setForecastResponse(data);
    return data;
  } catch (error) {
    console.log(error);
  }
};
