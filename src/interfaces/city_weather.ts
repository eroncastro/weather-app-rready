import { Weather } from './weather';

export interface CityWeatherData {
  loading: boolean;
  city: string;
  weather?: Weather;
}