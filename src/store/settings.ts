import { TemperatureScale } from "@/interfaces/clients/open_weather_map";
import { WeatherOptions, SettingsPayload, Settings } from "@/interfaces/store/settings";

const SETTINGS_KEY = 'WEATHER_APP_SETTINGS';

function getInitialState(): Settings {
  try {
    const cacheData = localStorage.getItem(SETTINGS_KEY);

    if (!cacheData) {
      return defaultInitialState();
    }

    return JSON.parse(cacheData);
  } catch(e) {
    return defaultInitialState();
  }
}

function defaultInitialState(): Settings {
  const weatherOptions = {
    scale: TemperatureScale.Celsius,
    minTemperature: false,
    maxTemperature: false,
    sunrise: false,
    sunset: false,
    wind: false,
  };

  return {
    weatherOptions,
  };
}

function saveNewState(state: Settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state));
}

export const GET_WEATHER_OPTIONS = 'settings/getWeatherOptions';

export const UPDATE_WEATHER_OPTIONS = 'settings/updateWeatherOptions';

export default {
  state: getInitialState(),
  getters: {
    [GET_WEATHER_OPTIONS](state: Settings): WeatherOptions {
      return state.weatherOptions;
    },
  },
  mutations: {
    [UPDATE_WEATHER_OPTIONS](state: Settings, payload: SettingsPayload) {
      state.weatherOptions = {
        ...state.weatherOptions,
        ...payload,
      };

      saveNewState(state);
    },
  },
  actions: {
    [UPDATE_WEATHER_OPTIONS](context: any, payload: SettingsPayload) {
      context.commit(UPDATE_WEATHER_OPTIONS, payload);
    },
  }
}
