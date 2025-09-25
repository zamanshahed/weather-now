import { useWeatherStore } from "@/app/store/useWeatherStore";
import { BaseUrl, ForecastWeatherUrl, OpenWeatherApiKey } from "../Urls";
import {
  DailyForecastResponseType,
  Forecast3HrItem,
  ForecastResponseType,
} from "@/app/types/ForecastResponseType";

function getFiveDayForecast(
  data: ForecastResponseType,
): Array<DailyForecastResponseType> {
  // explicit typing for the accumulator
  const daily: Record<string, { temps: number[]; icons: string[] }> = {};

  data?.list!.forEach((entry: Forecast3HrItem) => {
    const date = entry.dt_txt!.split(" ")[0]; // "YYYY-MM-DD"
    const temp = entry.main!.temp;

    if (!daily[date]) {
      daily[date] = { temps: [], icons: [] };
    }

    daily[date].temps.push(temp!);
    // guard: ensure weather[0] exists and has an icon
    if (entry.weather && entry.weather[0] && entry.weather[0].icon) {
      daily[date].icons.push(entry.weather[0].icon);
    }
  });

  // sort dates to ensure chronological order, then take first 5
  const dates = Object.keys(daily).sort().slice(0, 5);

  const result = dates.map((date) => {
    const temps = daily[date].temps;
    const dayTemp = Math.max(...temps);
    const nightTemp = Math.min(...temps);

    // pick the most frequent icon safely
    const icons = daily[date].icons;
    let icon = "";
    if (icons.length) {
      const freq = icons.reduce<Record<string, number>>((acc, v) => {
        acc[v] = (acc[v] || 0) + 1;
        return acc;
      }, {});
      // find icon with max frequency
      icon = Object.entries(freq).reduce((best, cur) =>
        cur[1] > best[1] ? cur : best,
      )[0];
    }

    const dayName = new Date(date).toLocaleDateString("en-US", {
      weekday: "short",
    });

    return {
      day: dayName,
      day_temp: Number(dayTemp.toFixed(1)),
      night_temp: Number(nightTemp.toFixed(1)),
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
