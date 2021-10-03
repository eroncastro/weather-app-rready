import { TemperatureScale } from '../clients/open_weather_map';

export interface Settings {
  scale: TemperatureScale;
  minTemperature: boolean;
  maxTemperature: boolean;
  sunrise: boolean;
  sunset: boolean;
  wind: boolean;
}

export interface SettingsPayload {
  scale?: TemperatureScale;
  minTemperature?: number;
  maxTemperature?: number;
  sunrise?: Date;
  sunset?: Date;
  wind?: number;
}

export interface UpdateSettings {
  (payload: SettingsPayload): Promise<Settings>
}
