export type ForecastItem = {
  time: string;
  temp: number;
  icon: string;
};

export type ForecastData = Record<string, ForecastItem[]>;

export type DailyForecastResponseType = {
  day: string;
  day_temp: number;
  night_temp: number;
  icon: string;
};
export type Forecast3HrItem = {
  dt?: number;
  main?: {
    temp?: number;
    feels_like?: number;
    temp_min?: number;
    temp_max?: number;
    pressure?: number;
    sea_level?: number;
    grnd_level?: number;
    humidity?: number;
    temp_kf?: number;
  };
  weather?: {
    id?: number;
    main?: string;
    description?: string;
    icon?: string;
  }[];
  clouds?: {
    all?: number;
  };
  wind?: {
    speed?: number;
    deg?: number;
    gust?: number;
  };
  visibility?: number;
  pop?: number;
  rain?: {
    "3h"?: number; // quoted key because it starts with a digit
    [key: string]: number | undefined;
  };
  sys?: {
    pod?: string;
    [key: string]: unknown;
  };
  dt_txt?: string;
  [key: string]: unknown;
};

export type ForecastResponseType = {
  cod?: string;
  message?: number;
  cnt?: number;
  list?: Forecast3HrItem[];
  city?: {
    id?: number;
    name?: string;
    coord?: {
      lat?: number;
      lon?: number;
      [key: string]: unknown;
    };
    country?: string;
    population?: number;
    timezone?: number;
    sunrise?: number;
    sunset?: number;
    [key: string]: unknown;
  };
  [key: string]: unknown;
};
