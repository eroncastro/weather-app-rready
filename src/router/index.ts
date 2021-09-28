import OpenWeatherMapApiClient from '@/clients/open_weather_map';
import Vue from 'vue';
import VueRouter from 'vue-router';

import CityList from '../components/CityList.vue';

Vue.use(VueRouter);

const Settings = { template: '<div>Settings</div>' };

// https://router.vuejs.org/guide/essentials/passing-props.html
// passing props to avoid coupling
const openWeatherMapApiClient = new OpenWeatherMapApiClient(process.env.OPEN_WEATHER_MAP_KEY);

const routes = [
  {
    path: '/',
    component: CityList,
    props: {
      openWeatherMapApiClient
    },
  },
  { path: '/settings', component: Settings },
];

export default new VueRouter({
  mode: 'history',
  routes,
});
