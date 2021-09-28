import type {
  CityCurrentWeatherJSON,
  Weather,
} from '../../interfaces/clients/open_weather_map';

export default class WeatherDataProcessor {
  static ICON_URL = {
    prefix: 'https://openweathermap.org/img/wn/',
    suffix: '@2x.png',
  };
  private data: CityCurrentWeatherJSON;

  constructor(data: CityCurrentWeatherJSON) {
    this.data = data;
  }

  getWeatherData(): Weather {
    const {
      weather: [{
        icon,
        description
      }],
      wind: {
        speed: wind
      },
      name: city,
      sys: {
        sunrise,
        sunset,
        country,
      },
      dt: currentTime,
      main: {
        temp: temperature,
        temp_min: minTemperature,
        temp_max: maxTemperature,
      }
    } = this.data;

    return {
      icon: this.iconUrl(icon),
      condition: description,
      city,
      country,
      temperature,
      datetime: new Date(currentTime * 1000),
      wind,
      sunrise: new Date(sunrise * 1000),
      sunset: new Date(sunset * 1000),
      minTemperature,
      maxTemperature
    };
  }

  private iconUrl(iconCode: string): string {
    const { prefix, suffix } = WeatherDataProcessor.ICON_URL;

    return `${prefix}${iconCode}${suffix}`;
  }
}