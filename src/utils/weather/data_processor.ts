import type { Weather, WeatherApiJSON } from '../../interfaces/weather';

const ICON_URL = {
  prefix: 'https://openweathermap.org/img/wn/',
  suffix: '@2x.png',
}

export default class WeatherDataProcessor {
  private data!: WeatherApiJSON;

  constructor(data: WeatherApiJSON) {
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
    return `${ICON_URL.prefix}${iconCode}${ICON_URL.suffix}`;
  }
}