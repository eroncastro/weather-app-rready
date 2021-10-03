export interface GeocodeEarthApiResponse<T> extends Response {
  jsonBody?: T;
}

export interface Properties {
  country: string;
  country_code: string;
  localadmin: string;
  label: string;
}

export interface Feature {
  properties: Properties;
}

export interface AutocompleteJSON {
  features: Array<Feature>;
}
