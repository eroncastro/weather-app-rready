<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col
          v-for="(cityData, i) in citiesData"
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

import CityWeather from './CityWeather.vue';
import data1 from '../data/rotterdam.json';
import data2 from '../data/uberlandia.json';
import data3 from '../data/zurich.json';
import NewCityDialogVue from './NewCityDialog.vue';
import OpenWeatherMapApiClient from '../clients/open_weather_map';
import type { CurrentWeatherInput } from '../interfaces/clients/open_weather_map';
import WeatherDataProcessor from '../utils/weather/data_processor';

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
}
</script>
