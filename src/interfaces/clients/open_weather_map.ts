export enum TemperatureScale {
  Farenheit,
  Celsius,
}

export interface Weather {
  city: string;
  country: string;
  temperature: number;
  condition: string;
  icon: string;
  datetime: Date;
  minTemperature: number;
  maxTemperature: number;
  sunrise: Date;
  sunset: Date;
  wind: number;
}

export interface Coordinates {
  lon: number;
  lat: number;
}

export interface Condition {
  id: number;
  main: string;
  description: string;
  icon: string;
}

export interface Temperature {
  temp: number;
  feels_like: number;
  temp_min: number;
  temp_max: number;
  pressure: number;
  humidity: number;
}

export interface Wind {
  speed: number;
  deg: number;
}

export interface Sys {
  type: number;
  id: number;
  country: string;
  sunrise: number;
  sunset: number;
}

export interface OpenWeatherMapApiResponse<T> extends Response {
  jsonBody?: T;
}

export interface CityCurrentWeatherJSON {
  coord: Coordinates;
  weather: Array<Condition>;
  base: string;
  main: Temperature,
  visibility: number;
  wind: Wind;
  clouds: {
    all: number;
  },
  dt: number;
  sys: Sys;
  timezone: number;
  id: number;
  name: string;
  cod: number;
}

export interface CurrentWeatherInput {
  city: string;
  country: string;
}
