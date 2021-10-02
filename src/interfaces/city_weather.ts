import { Weather } from './weather';

export interface CityWeatherData {
  id?: number;
  loading: boolean;
  city: string;
  country: string;
  weather?: Weather;
}