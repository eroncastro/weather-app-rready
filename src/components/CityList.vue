<template>
  <v-main>
    <v-container>
      <draggable
        class="row"
        :value="citiesWeather"
        @input="handleOrderChange">
        <v-col
          v-for="(cityData, i) in citiesWeather"
          :key="i"
          cols="4"
        >
          <city-weather
            :loading="cityData.loading"
            :city="cityData.city"
            :country="cityData.country"
            v-bind="cityData.weather"
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
  UPDATE_CITY_WEATHER,
  UPDATE_CITY_WEATHER_LIST_ORDER,
} from '../store/weather';
import { AddCityWeather, RemoveCityWeather, UpdateCityWeather, UpdateCityWeatherListOrder } from '@/interfaces/store/weather';
import { CityWeatherData } from '@/interfaces/city_weather';

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
  @Action(UPDATE_CITY_WEATHER) updateCityWeather!: UpdateCityWeather;
  @Action(UPDATE_CITY_WEATHER_LIST_ORDER)
  updateCityWeatherListOrder!: UpdateCityWeatherListOrder;

  cities!: Array<{city: string; country: string;}>;

  async addCities(newCities: Array<CurrentWeatherInput>) {
    const addedCities = await Promise.all(
      newCities.map((weatherInput: CurrentWeatherInput) => {
        const { city, country } = weatherInput;

        return this.addCityWeather({
          loading: true,
          city,
          country,
        });
      })
    );

    addedCities.forEach(async (cityData: CityWeatherData) => {
      try {
        const { city, country } = await cityData;

        const weatherData = await this
          .openWeatherMapApiClient
          .fetchCurrentWeather({ city, country });

        const weather = new WeatherDataProcessor(
          weatherData.jsonBody as CityCurrentWeatherJSON
        ).getWeatherData();

        this.updateCityWeather({...cityData, weather, loading: false });
      } catch(e) {
        console.log(e);
      }
    });
  }

  handleRemoveCard(card: CityWeatherData) {
    this.removeCityWeather(card);
  }

  handleOrderChange(newCityWeatherList: Array<CityWeatherData>) {
    this.updateCityWeatherListOrder(newCityWeatherList);
  }
}
</script>
