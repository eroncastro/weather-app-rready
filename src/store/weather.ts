import type { CityWeatherData } from '../interfaces/city_weather'

interface WeatherState {
  cities: Array<CityWeatherData>;
}

export default {
  state: {
    cities: Array<CityWeatherData>()
  },
  getters: {
    cities(state: WeatherState) {
      return state.cities;
    }
  },
  mutations: {
    addCityWeather(state: WeatherState, cityWeatherData: CityWeatherData) {
      state.cities.push(cityWeatherData);
    }
  },

}