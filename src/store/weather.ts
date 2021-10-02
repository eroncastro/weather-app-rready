import { v4 as uuidv4 } from 'uuid';
import store from '.';

import type { CityWeatherData } from '../interfaces/city_weather';
import type { CitiesWeatherState } from '../interfaces/store/weather';

export const GET_CITIES_WEATHER = 'weather/getCitiesWeather';
export const ADD_CITY_WEATHER = 'weather/addCityWeather';
export const REMOVE_CITY_WEATHER = 'weather/removeCityWeather';
export const UPDATE_CITY_WEATHER = 'weather/updateCityWeather';
export const UPDATE_CITY_WEATHER_LIST_ORDER =
  'weather/updateCityWeatherListOrder';

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
      state.cities = state.cities.filter(({ id }) => {
        return id !== cityWeatherData.id;
      });
    },
    [UPDATE_CITY_WEATHER](
      state: CitiesWeatherState,
      newCityWeather: CityWeatherData
    ) {
      state.cities = state.cities.map((cityWeather: CityWeatherData) => {
        return cityWeather.id !== newCityWeather.id
          ? cityWeather
          : {...cityWeather, ...newCityWeather};
      });
    },
    [UPDATE_CITY_WEATHER_LIST_ORDER](
      state: CitiesWeatherState,
      newCityWeatherList: Array<CityWeatherData>
    ) {
      state.cities = newCityWeatherList;
    }
  },
  actions: {
    [ADD_CITY_WEATHER](
      context: any,
      cityWeatherData: CityWeatherData
    ): CityWeatherData {
      const addedCityWeather = {
        id: uuidv4(),
        ...cityWeatherData
      } as CityWeatherData;

      context.commit(ADD_CITY_WEATHER, addedCityWeather);

      return addedCityWeather;
    },
    [REMOVE_CITY_WEATHER](
      context: any,
      cityWeatherData: CityWeatherData
    ) {
      context.commit(REMOVE_CITY_WEATHER, cityWeatherData);
    },
    [UPDATE_CITY_WEATHER](
      context: any,
      newCityWeather: CityWeatherData
    ) {
      context.commit(UPDATE_CITY_WEATHER, newCityWeather);
    },
    [UPDATE_CITY_WEATHER_LIST_ORDER](
      context: any,
      newCityWeatherList: Array<CityWeatherData>
    ) {
      context.commit(UPDATE_CITY_WEATHER_LIST_ORDER, newCityWeatherList);
    }
  }
}
