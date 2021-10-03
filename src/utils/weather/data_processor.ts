import type {
  CityCurrentWeatherJSON,
  Weather,
} from '../../interfaces/clients/open_weather_map';

export default class WeatherDataProcessor {
  static ICON_URL = {
    prefix: 'https://openweathermap.org/img/wn/',
    suffix: '@2x.png',
  };

  static getWeatherData(data: CityCurrentWeatherJSON): Weather {
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
      timezone,
      main: {
        temp: temperature,
        temp_min: minTemperature,
        temp_max: maxTemperature,
      }
    } = data;
    const { prefix, suffix } = WeatherDataProcessor.ICON_URL;
    const iconUrl = `${prefix}${icon}${suffix}`;

    return {
      icon: iconUrl,
      condition: description,
      city,
      country,
      temperature,
      datetime: new Date(currentTime * 1000),
      timezone: 1000 * timezone,
      wind,
      sunrise: new Date(sunrise * 1000),
      sunset: new Date(sunset * 1000),
      minTemperature,
      maxTemperature
    };
  }

}
