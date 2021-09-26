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
import { Component, Vue } from 'vue-property-decorator';
import CityWeather from './CityWeather.vue';
import data1 from '../data/rotterdam.json';
import data2 from '../data/uberlandia.json';
import data3 from '../data/zurich.json';
import WeatherDataProcessor from '../utils/weather/data_processor';
import NewCityDialogVue from './NewCityDialog.vue';

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

  data() {
    return {
      showDialog: false,
      citiesData: [
        rotterdamData,
        uberlandiaData,
        zurichData,
      ]
    };
  }
}
</script>
