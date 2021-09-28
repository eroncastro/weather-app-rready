import type {
  CityCurrentWeatherJSON,
  CurrentWeatherInput,
  OpenWeatherMapApiResponse,
} from '@/interfaces/clients/open_weather_map';

export default class OpenWeatherMapApiClient {
  private static BASE_URL = 'https://api.openweathermap.org/data/2.5/weather';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey
  }

  async fetchCurrentWeather(
    input: CurrentWeatherInput
  ): Promise<OpenWeatherMapApiResponse<CityCurrentWeatherJSON>> {
    const url = new URL(OpenWeatherMapApiClient.BASE_URL)
    url.searchParams.set('appid', this.apiKey);
    url.searchParams.set('q', `${input.city},${input.country}`);

    const response: OpenWeatherMapApiResponse<CityCurrentWeatherJSON> =
      await fetch(url.toString());

    response.jsonBody = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  }
}
