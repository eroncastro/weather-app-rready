import { TemperatureScale } from "@/interfaces/clients/open_weather_map";
import { Settings, SettingsPayload } from "@/interfaces/store/settings";

const SETTINGS_KEY = 'WEATHER_APP_SETTINGS';

function getInitialState(): Settings {
  try {
    const cacheData = localStorage.getItem(SETTINGS_KEY);

    // eslint-disable-next-line no-debugger
    debugger;

    if (!cacheData) {
      return defaultInitialState();
    }

    return JSON.parse(cacheData);
  } catch(e) {
    return defaultInitialState();
  }
}

function defaultInitialState(): Settings {
  return {
    scale: TemperatureScale.Celsius,
    minTemperature: false,
    maxTemperature: false,
    sunrise: false,
    sunset: false,
    wind: false,
  };
}

function saveNewState(state: Settings) {
  localStorage.setItem(SETTINGS_KEY, JSON.stringify(state));
}

export const GET_TEMPERATURE_SCALE = 'settings/getTemperatureScale';
export const GET_MIN_TEMPERATURE = 'settings/getMinTemperature';
export const GET_MAX_TEMPERATURE = 'settings/getMaxTemperature';
export const GET_WIND = 'settings/getWind';
export const GET_SUNRISE = 'settings/getSunset';
export const GET_SUNSET = 'settings/getSunrise';

export const UPDATE_TEMPERATURE_SCALE = 'settings/updateTemperatureScale';
export const UPDATE_MIN_TEMPERATURE = 'settings/updateMinTemperature';
export const UPDATE_MAX_TEMPERATURE = 'settings/updateMaxTemperature';
export const UPDATE_SUNRISE = 'settings/updateSunrise';
export const UPDATE_SUNSET = 'settings/updateSunset';
export const UPDATE_WIND = 'settings/updateWind';

export default {
  state: getInitialState(),
  getters: {
    [GET_TEMPERATURE_SCALE](state: Settings): TemperatureScale {
      return state.scale;
    },
    [GET_MIN_TEMPERATURE](state: Settings): boolean {
      return state.minTemperature;
    },
    [GET_MAX_TEMPERATURE](state: Settings): boolean {
      return state.maxTemperature;
    },
    [GET_WIND](state: Settings): boolean {
      return state.wind;
    },
    [GET_SUNRISE](state: Settings): boolean {
      return state.sunrise;
    },
    [GET_SUNSET](state: Settings): boolean {
      return state.sunset;
    }
  },
  mutations: {
    [UPDATE_TEMPERATURE_SCALE](state: Settings, scale: TemperatureScale) {
      state.scale = scale;

      saveNewState(state);
    },
    [UPDATE_MIN_TEMPERATURE](state: Settings, minTemperature: boolean) {
      state.minTemperature = minTemperature;

      saveNewState(state);
    },
    [UPDATE_MAX_TEMPERATURE](state: Settings, maxTemperature: boolean) {
      state.maxTemperature = maxTemperature;

      saveNewState(state);
    },
    [UPDATE_WIND](state: Settings, wind: boolean) {
      state.wind = wind;

      saveNewState(state);
    },
    [UPDATE_SUNRISE](state: Settings, sunrise: boolean) {
      state.sunrise = sunrise;

      saveNewState(state);
    },
    [UPDATE_SUNSET](state: Settings, sunset: boolean) {
      state.sunset = sunset;

      saveNewState(state);
    },
  },
  actions: {
    [UPDATE_TEMPERATURE_SCALE](context: any, scale: TemperatureScale) {
      context.commit(UPDATE_TEMPERATURE_SCALE, scale);
    },
    [UPDATE_MIN_TEMPERATURE](context: any, minTemperature: boolean) {
      context.commit(UPDATE_MIN_TEMPERATURE, minTemperature);
    },
    [UPDATE_MAX_TEMPERATURE](context: any, maxTemperature: boolean) {
      context.commit(UPDATE_MIN_TEMPERATURE, maxTemperature);
    },
    [UPDATE_WIND](context: any, wind: boolean) {
      context.commit(UPDATE_WIND, wind);
    },
    [UPDATE_SUNRISE](context: any, sunrise: boolean) {
      context.commit(UPDATE_SUNRISE, sunrise);
    },
    [UPDATE_SUNSET](context: any, sunset: boolean) {
      context.commit(UPDATE_SUNSET, sunset);
    },
  }
}
