import type {
  AutocompleteJSON,
  Feature,
  Properties
} from '@/interfaces/clients/geocode_earth';

export default class AutocompleteDataProcessor {

  static getCitiesData(data: AutocompleteJSON): Array<Properties> {
    return data.features.map((item: Feature) => {
      const {
        properties: {
          country,
          country_code,
          locality,
          label,
          name,
        }
      } = item;

      return {
        country,
        country_code,
        locality,
        label,
        name,
      };
    });
  }

}