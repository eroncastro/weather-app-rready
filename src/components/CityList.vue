<template>
  <v-main>
    <v-container>
      <v-row>
        <v-col
          v-for="(cityData, i) in citiesWeather"
          :key="i"
          cols="4"
        >
          <city-weather
            v-bind="cityData"
            @removeCard="() => handleRemoveCard(cityData)"
          ></city-weather>
        </v-col>
      </v-row>
    </v-container>

    <new-city-dialog
      @citiesAdded="addCities"
    ></new-city-dialog>
  </v-main>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';
import {
  Getter,
  Action,
} from 'vuex-class';

import CityWeather from './CityWeather.vue';
import NewCityDialogVue from './NewCityDialog.vue';
import OpenWeatherMapApiClient from '../clients/open_weather_map';
import WeatherDataProcessor from '../utils/weather/data_processor';
import type {
  CurrentWeatherInput,
  CityCurrentWeatherJSON,
} from '../interfaces/clients/open_weather_map';
import {
  ADD_CITY_WEATHER,
  GET_CITIES_WEATHER,
  REMOVE_CITY_WEATHER,
} from '../store/weather';

// https://github.com/vuejs/vue-class-component/issues/56 -> Vuex usage

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

  // @ts-ignore
  @Action(REMOVE_CITY_WEATHER) removeCityWeather;

  cities!: Array<{city: string; country: string;}>;

  addCities(cities: Array<CurrentWeatherInput>) {
    cities.forEach(async (cityData: CurrentWeatherInput) => {
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

  handleRemoveCard(card: CityCurrentWeatherJSON) {
    this.removeCityWeather(card);
  }
}
</script>
