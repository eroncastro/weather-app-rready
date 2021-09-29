<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col
          v-for="(cityData, i) in citiesWeather"
          :key="i"
          cols="3"
        >
          <city-weather v-bind="cityData"></city-weather>
        </v-col>
      </v-row>
    </v-container>

    <new-city-dialog></new-city-dialog>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Getter,
  Action,
} from 'vuex-class';

import CityWeather from './CityWeather.vue';
import data1 from '../data/rotterdam.json';
import data2 from '../data/uberlandia.json';
import data3 from '../data/zurich.json';
import NewCityDialogVue from './NewCityDialog.vue';
import OpenWeatherMapApiClient from '../clients/open_weather_map';
import WeatherDataProcessor from '../utils/weather/data_processor';
import type {
  CurrentWeatherInput,
  CityCurrentWeatherJSON,
} from '../interfaces/clients/open_weather_map';
import {
  GET_CITIES_WEATHER,
  ADD_CITY_WEATHER
} from '../store/weather';

// https://github.com/vuejs/vue-class-component/issues/56 -> Vuex usage

const rotterdamData = new WeatherDataProcessor(data1).getWeatherData();
const uberlandiaData = new WeatherDataProcessor(data2).getWeatherData();
const zurichData = new WeatherDataProcessor(data3).getWeatherData();

@Component({
  components: {
    cityWeather: CityWeather,
    newCityDialog: NewCityDialogVue,
  }
})
export default class CityList extends Vue {
  // @Prop(Array) readonly citiesWeather!: Array<CityWeather>;
  @Prop({ required: true }) openWeatherMapApiClient!: OpenWeatherMapApiClient;

  // @ts-ignore
  @Getter(GET_CITIES_WEATHER) citiesWeather;

  // @ts-ignore
  @Action(ADD_CITY_WEATHER) addCityWeather;

  cities!: Array<{city: string; country: string;}>;

  data() {
    return {
      showDialog: false,
      citiesData: [
        rotterdamData,
        uberlandiaData,
        zurichData,
      ],
      cities: [
        { city: 'Rotterdam', country: 'NL' },
        { city: 'Uberlândia', country: 'BR' },
        { city: 'Zurich', country: 'CH' },
      ],
    };
  }

  created() {
    this.cities.forEach(async (cityData: CurrentWeatherInput) => {
      try {
        const { city, country } = cityData;
        const cityWeather = await this
          .openWeatherMapApiClient
          .fetchCurrentWeather({ city, country });

        const data = new WeatherDataProcessor(
          cityWeather.jsonBody as CityCurrentWeatherJSON
        ).getWeatherData();

        this.addCityWeather(data);
      } catch(e) {
        console.log(e);
      }
    });
  }
}
</script>
