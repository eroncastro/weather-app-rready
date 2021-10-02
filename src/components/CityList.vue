<template>
  <v-main>
    <v-container>
        <draggable v-model="citiesWeather" class="row">
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
        </draggable>
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
import draggable from 'vuedraggable'

import CityWeather from './CityWeather.vue';
import NewCityDialogVue from './NewCityDialog.vue';
import OpenWeatherMapApiClient from '../clients/open_weather_map';
import WeatherDataProcessor from '../utils/weather/data_processor';
import type {
  CurrentWeatherInput,
  CityCurrentWeatherJSON,
  Weather,
} from '../interfaces/clients/open_weather_map';
import {
  ADD_CITY_WEATHER,
  GET_CITIES_WEATHER,
  REMOVE_CITY_WEATHER,
} from '../store/weather';
import { AddCityWeather, RemoveCityWeather } from '@/interfaces/store/weather';

@Component({
  components: {
    cityWeather: CityWeather,
    newCityDialog: NewCityDialogVue,
    draggable,
  }
})
export default class CityList extends Vue {
  @Prop({ required: true }) openWeatherMapApiClient!: OpenWeatherMapApiClient;

  @Getter(GET_CITIES_WEATHER) citiesWeather!: Array<Weather>;

  @Action(ADD_CITY_WEATHER) addCityWeather!: AddCityWeather;

  @Action(REMOVE_CITY_WEATHER) removeCityWeather!: RemoveCityWeather;

  cities!: Array<{city: string; country: string;}>;

  addCities(newCities: Array<CurrentWeatherInput>) {
    newCities.forEach(async (cityData: CurrentWeatherInput) => {
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

  handleRemoveCard(card: Weather) {
    this.removeCityWeather(card);
  }
}
</script>
