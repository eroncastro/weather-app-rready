import type {
  AutocompleteJSON,
  GeocodeEarthApiResponse
} from '@/interfaces/clients/geocode_earth';

export default class GeocodeEarthApiClient {

  private static BASE_URL = 'https://api.geocode.earth/v1/autocomplete';
  private apiKey: string;

  constructor(apiKey: string) {
    this.apiKey = apiKey;
  }

  async fetchCurrentWeather(
    input: string
  ): Promise<GeocodeEarthApiResponse<AutocompleteJSON>> {
    const url = new URL(GeocodeEarthApiClient.BASE_URL)
    const options = {
      method: 'GET',
      headers: {
        'Accept': 'application/json'
      }
    };
    url.searchParams.set('api_key', this.apiKey);
    url.searchParams.set('text', input);

    const response: GeocodeEarthApiResponse<AutocompleteJSON> =
      await fetch(url.toString(), options);

    response.jsonBody = await response.json();

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    return response;
  }
}