import { CityWeatherData } from '../../interfaces/city_weather';
import { Weather } from '../clients/open_weather_map';

export interface CitiesWeatherState {
  cities: Array<CityWeatherData>;
}

export interface AddCityWeather {
  (weather: CityWeatherData): Promise<CityWeatherData>
}

export interface UpdateCityWeather {
  (weather: CityWeatherData): CityWeatherData
}

export interface RemoveCityWeather {
  (weather: Weather): void
}

export interface UpdateCityWeatherListOrder {
  (newCityWeatherList: Array<Weather>): void
}