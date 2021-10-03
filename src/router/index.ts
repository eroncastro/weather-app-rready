import GeocodeEarthApiClient from '@/clients/geocode_earth';
import OpenWeatherMapApiClient from '@/clients/open_weather_map';
import Vue from 'vue';
import VueRouter from 'vue-router';

import CityList from '../components/CityList.vue';
import Settings from '../components/WeatherSettings.vue';

Vue.use(VueRouter);

// https://router.vuejs.org/guide/essentials/passing-props.html
// passing props to avoid coupling
const openWeatherMapApiClient =
  new OpenWeatherMapApiClient(process.env.VUE_APP_OPEN_WEATHER_MAP_KEY);

const geocodeEarthApiClient =
  new GeocodeEarthApiClient(process.env.VUE_APP_GEOCODE_EARTH_API_KEY);

const routes = [
  {
    path: '/',
    component: CityList,
    props: {
      openWeatherMapApiClient,
      geocodeEarthApiClient,
    },
  },
  {
    path: '/settings',
    component: Settings
  },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
