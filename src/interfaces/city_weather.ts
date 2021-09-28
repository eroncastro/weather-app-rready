import { Weather } from './weather';

export interface CityWeatherData {
  loading: boolean;
  city: string;
  country: string;
  weather?: Weather;
}