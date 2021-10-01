import type { CityWeatherData } from '../interfaces/city_weather';
import type { CitiesWeatherState } from '../interfaces/store/weather';

export const GET_CITIES_WEATHER = 'weather/getCitiesWeather';
export const ADD_CITY_WEATHER = 'weather/addCityWeather';
export const REMOVE_CITY_WEATHER = 'weather/removeCityWeather';

export default {
  state: {
    cities: Array<CityWeatherData>()
  },
  getters: {
    [GET_CITIES_WEATHER](state: CitiesWeatherState) {
      return state.cities;
    }
  },
  mutations: {
    [ADD_CITY_WEATHER](
      state: CitiesWeatherState,
      cityWeatherData: CityWeatherData
    ) {
      state.cities.push(cityWeatherData);
    },
    [REMOVE_CITY_WEATHER](
      state: CitiesWeatherState,
      cityWeatherData: CityWeatherData,
    ) {
      state.cities = state.cities.filter(({ city, country }) => {
        return (
          city !== cityWeatherData.city &&
          country !== cityWeatherData.country
        );
      });
    }
  },
  actions: {
    [ADD_CITY_WEATHER](
      context: any,
      cityWeatherData: CityWeatherData
    ) {
      context.commit(ADD_CITY_WEATHER, cityWeatherData);
    },
    [REMOVE_CITY_WEATHER](
      context: any,
      cityWeatherData: CityWeatherData
    ) {
      context.commit(REMOVE_CITY_WEATHER, cityWeatherData);
    }
  }
}
