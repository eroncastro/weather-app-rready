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
          sm="16"
          md="4"
        >
          <city-weather
            :datetime="currentTime"
            :loading="cityData.loading"
            :city="cityData.city"
            :country="cityData.country"
            :temperatureScale="temperatureScale"
            v-bind="cityData.weather"
            @removeCard="() => handleRemoveCard(cityData)"
          ></city-weather>
        </v-col>
      </draggable>
    </v-container>

    <new-city-dialog
      :geocodeEarthApiClient="geocodeEarthApiClient"
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
import draggable from 'vuedraggable';

import CityWeather from './CityWeather.vue';
import NewCityDialogVue from './NewCityDialog.vue';
import OpenWeatherMapApiClient from '../clients/open_weather_map';
import WeatherDataProcessor from '../utils/weather/data_processor';
import type {
  CurrentWeatherInput,
  CityCurrentWeatherJSON,
  Weather,
  TemperatureScale,
} from '../interfaces/clients/open_weather_map';
import {
  ADD_CITY_WEATHER,
  GET_CITIES_WEATHER,
  REMOVE_CITY_WEATHER,
  UPDATE_CITY_WEATHER,
  UPDATE_CITY_WEATHER_LIST_ORDER,
} from '../store/weather';
import {
  AddCityWeather,
  RemoveCityWeather,
  UpdateCityWeather,
  UpdateCityWeatherListOrder
} from '@/interfaces/store/weather';
import { CityWeatherData } from '@/interfaces/city_weather';
import type GeocodeEarthApiClient from '@/clients/geocode_earth';
import { GET_WEATHER_OPTIONS } from '@/store/settings';
import { WeatherOptions } from '@/interfaces/store/settings';

@Component({
  components: {
    cityWeather: CityWeather,
    newCityDialog: NewCityDialogVue,
    draggable,
  }
})
export default class CityList extends Vue {
  @Prop({ required: true }) openWeatherMapApiClient!: OpenWeatherMapApiClient;
  @Prop({ required: true }) geocodeEarthApiClient!: GeocodeEarthApiClient;

  @Getter(GET_CITIES_WEATHER) citiesWeather!: Array<Weather>;
  @Getter(GET_WEATHER_OPTIONS) weatherOptions!: WeatherOptions;

  @Action(ADD_CITY_WEATHER) addCityWeather!: AddCityWeather;
  @Action(REMOVE_CITY_WEATHER) removeCityWeather!: RemoveCityWeather;
  @Action(UPDATE_CITY_WEATHER) updateCityWeather!: UpdateCityWeather;
  @Action(UPDATE_CITY_WEATHER_LIST_ORDER)
  updateCityWeatherListOrder!: UpdateCityWeatherListOrder;

  cities = Array<CurrentWeatherInput>();
  timer!: number;
  currentTime = new Date();

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

    addedCities.forEach(cityWeather => {
      this.updateCityWeatherData(cityWeather);
    });
  }

  async updateCityWeatherData(cityWeather: CityWeatherData) {
    try {
      const { city, country } = cityWeather;

      const weatherData = await this
        .openWeatherMapApiClient
        .fetchCurrentWeather({ city, country });

      const weather = WeatherDataProcessor.getWeatherData(
        weatherData.jsonBody as CityCurrentWeatherJSON
      );

      this.updateCityWeather({...cityWeather, weather, loading: false });
    } catch(e) {
      console.log(e);
    }
  }

  get temperatureScale(): TemperatureScale {
    return this.weatherOptions.scale;
  }

  handleRemoveCard(card: CityWeatherData) {
    this.removeCityWeather(card);
  }

  handleOrderChange(newCityWeatherList: Array<CityWeatherData>) {
    this.updateCityWeatherListOrder(newCityWeatherList);
  }

  mounted() {
    const self = this;
    self.timer = setInterval(() => {
      self.currentTime = new Date();
    }, 2000);
  }

  destroyed() {
    clearInterval(this.timer);
  }
}
</script>
