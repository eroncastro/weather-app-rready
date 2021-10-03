import { TemperatureScale } from '../clients/open_weather_map';

export interface Settings {
  scale: TemperatureScale;
  minTemperature: boolean;
  maxTemperature: boolean;
  sunrise: boolean;
  sunset: boolean;
  wind: boolean;
}

export type SettingsPayload = TemperatureScale | boolean;

export interface UpdateSettings {
  (payload: SettingsPayload): Promise<Settings>
}
