import { TemperatureScale } from '../clients/open_weather_map';

export interface WeatherOptions {
  scale: TemperatureScale;
  minTemperature: boolean;
  maxTemperature: boolean;
  sunrise: boolean;
  sunset: boolean;
  wind: boolean;
}

export interface Settings {
  weatherOptions: WeatherOptions;
}

export interface SettingsPayload {
  scale?: TemperatureScale;
  minTemperature?: boolean;
  maxTemperature?: boolean;
  sunrise?: boolean;
  sunset?: boolean;
  wind?: boolean;
}

export interface UpdateWeatherOptions {
  (payload: SettingsPayload): Promise<void>
}
