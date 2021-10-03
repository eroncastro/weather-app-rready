import type {
  AutocompleteJSON,
  Feature,
  Properties
} from '@/interfaces/clients/geocode_earth';

export default class AutocompleteDataProcessor {

  private data: AutocompleteJSON;

  constructor(data: AutocompleteJSON) {
    this.data = data;
  }

  getCitiesData(): Array<Properties> {
    return this.data.features.map((item: Feature) => {
      const {
        properties: {
          country,
          country_code,
          localadmin,
          label
        }
      } = item;

      return {
        country,
        country_code,
        localadmin,
        label,
      };
    });
  }

}