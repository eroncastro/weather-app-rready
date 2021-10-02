import { CityWeatherData } from '../../interfaces/city_weather';

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
  (weather: CityWeatherData): void
}

export interface UpdateCityWeatherListOrder {
  (newCityWeatherList: Array<CityWeatherData>): void
}
