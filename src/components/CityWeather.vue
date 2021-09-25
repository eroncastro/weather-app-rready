<template>
  <v-card
    class="mx-auto weather-card"
    max-width="400"
    outlined
  >
    <v-list-item two-line>
      <v-list-item-content>
        <v-list-item-title class="text-h5 mb-1">
          {{ city }}
        </v-list-item-title>
        <v-list-item-subtitle>
          {{ currentTime }}
        </v-list-item-subtitle>
      </v-list-item-content>
    </v-list-item>

    <div class="temperature-indicator">
      <v-img
        :src="icon"
        max-height="120"
        max-width="120"
      ></v-img>

      <div class="temperature-info">
        <div class="temperature-value">
          {{ `${Math.round(convertedTemperature, 0)}º` }}
        </div>
        <div class="temperature-scale">
          <div class="temperature-scale-letter">
            {{ temperatureScaleText }}
          </div>
        </div>
      </div>
    </div>

    <div>
      {{ condition }}
    </div>
  </v-card>
</template>

<script lang="ts">
import { Component, Prop, Vue } from 'vue-property-decorator';

import { TemperatureScale } from '../interfaces/weather';

@Component
export default class CityWeather extends Vue {

  // Mandatory Props
  @Prop({ type: String, required: true }) city!: string;
  @Prop({ type: Number, required: true }) temperature!: number;
  @Prop({ type: String, required: true }) condition!: string;
  @Prop({ type: String, required: true }) icon!: string;
  @Prop({
    default: TemperatureScale.Celsius,
    validator: (value) => {
      return [
        TemperatureScale.Celsius,
        TemperatureScale.Farenheit
      ].indexOf(value) !== -1;
    }
  }) temperatureScale!: TemperatureScale;

  // Optional Props
  @Prop(Date) datetime?: Date;
  @Prop(Number) minTemperature?: number;
  @Prop(Number) maxTemperature?: number;
  @Prop(Date) sunrise?: Date;
  @Prop(Date) sunset?: Date;
  @Prop(Number) windSpeed?: number;

  get convertedTemperature(): number {
    return this.temperatureScale === TemperatureScale.Celsius
      ? this.temperature - 273.15
      : ((this.temperature - 273.15) * 9/5) + 32;
  }

  get temperatureScaleText(): string {
    return this.temperatureScale === TemperatureScale.Celsius
      ? 'C'
      : 'F';
  }

  get currentTime(): string {
    if (!this.datetime) {
      return '';
    }

    return this.datetime
      .toLocaleTimeString('en', {
        hour: '2-digit',
        minute:'2-digit'
      });
  }
}
</script>

<style scoped>
  .weather-card {
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
  }

  .temperature-indicator {
    display: flex;
    align-items: center;
  }

  .temperature-info {
    display: flex;
  }

  .temperature-value {
    font-size: 3.5rem;
  }

  .temperature-scale {
    position: relative;
    font-size: 1.2rem;
    color: #909090;
  }

  .temperature-scale-letter {
    position: absolute;
    top: 40px;
    right: 7px;
  }
</style>
