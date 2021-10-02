import { CityWeatherData } from '../../interfaces/city_weather';
import { Weather } from '../clients/open_weather_map';

export interface CitiesWeatherState {
  cities: Array<CityWeatherData>;
}

export interface AddCityWeather {
  (weather: Weather): void
}

export interface RemoveCityWeather {
  (weather: Weather): void
}