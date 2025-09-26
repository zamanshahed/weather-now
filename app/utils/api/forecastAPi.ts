import { dayString } from "@/app/component/DaySelector";
import { useGeneralStore } from "@/app/store/useGeneralStore";
import { useWeatherStore } from "@/app/store/useWeatherStore";
import {
  DailyForecastResponseType,
  Forecast3HrItem,
  ForecastResponseType,
} from "@/app/types/ForecastResponseType";
import { BaseUrl, ForecastWeatherUrl, OpenWeatherApiKey } from "../Urls";

type HourlyForecast = {
  dt_txt: string;
  main: { temp: number };
  weather: { icon: string }[];
};

export type ProcessedForecast = {
  time: string;
  temp: number;
  icon: string;
};

type DailyForecastRecord = Record<string, ProcessedForecast[]>;

function processHourlyForecastByDay(data: {
  list: HourlyForecast[];
}): DailyForecastRecord {
  const result: DailyForecastRecord = {};

  data.list.forEach((item) => {
    // Parse as UTC explicitly (API dt_txt is UTC). Appending 'Z' forces UTC parsing.
    const utcDate = new Date(item.dt_txt + "Z");

    // Convert and format in Bangladesh time (Asia/Dhaka, UTC+6)
    const bdDayName = utcDate.toLocaleDateString("en-US", {
      weekday: "long",
      timeZone: "Asia/Dhaka",
    });

    // 12-hour time like "6 PM" in BD time
    const timeStr = utcDate.toLocaleTimeString("en-US", {
      hour: "numeric",
      hour12: true,
      timeZone: "Asia/Dhaka",
    });

    const weatherIcon = item.weather?.[0]?.icon ?? "";

    const tempC = Math.round(item.main.temp);

    // Use a temporary object that includes timestamp for sorting
    const processedWithTs = {
      time: timeStr,
      temp: tempC,
      icon: weatherIcon,
      ts: utcDate.getTime(), // keep UTC ms so relative ordering is stable
    } as ProcessedForecast & { ts: number };

    if (!result[bdDayName]) result[bdDayName] = [];

    // Push the processed item (we'll sort and strip ts later)
    // We store ts alongside in the array via type assertion
    (result[bdDayName] as Array<ProcessedForecast & { ts: number }>).push(
      processedWithTs,
    );
  });

  // Sort each day's entries by timestamp (chronological in BD time), then remove ts field
  Object.keys(result).forEach((day) => {
    const arr = result[day] as Array<ProcessedForecast & { ts: number }>;
    arr.sort((a, b) => a.ts - b.ts);
    // strip ts
    result[day] = arr.map(({ ts, ...rest }) => rest); // eslint-disable-line @typescript-eslint/no-unused-vars
  });

  return result;
}

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
  const {
    units,
    setSelectedDay,
    setForecastResponse,
    setFiveDayForecastResponse,
    setHourlyForecastResponse,
    setSearchFieldText,
  } = useWeatherStore.getState();
  const { setIsLoading, setCentralErrorDepo, centralErrorDepo } =
    useGeneralStore.getState();
  try {
    const response = await fetch(
      `${BaseUrl}${ForecastWeatherUrl}?q=${cityName}&cnt=${numberOfTimeStamps}&appid=${OpenWeatherApiKey}&units=${units}`,
    );
    const data = await response.json();

    if (!response.ok) {
      setIsLoading(false);
      setCentralErrorDepo([...centralErrorDepo, data?.message]);
    } else {
      const fiveDaysData = getFiveDayForecast(data);
      const processed = processHourlyForecastByDay(data);
      console.log(processed);
      setHourlyForecastResponse(processed);
      const processedDayArray = Object.keys(processed) as dayString[];
      setSelectedDay(processedDayArray[0]);
      setFiveDayForecastResponse(fiveDaysData);
      setForecastResponse(data);

      setSearchFieldText(""); //reset the input field, after fetching data...
      setIsLoading(false);
      return data;
    }
  } catch (error) {
    console.log(error);
    setIsLoading(false);
  }
};
