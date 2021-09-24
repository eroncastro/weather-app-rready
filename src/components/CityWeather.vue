<template>
  <v-card
    class="mx-auto"
    max-width="344"
    outlined
  >
    <v-list-item three-line>
      <v-list-item-content>
        <div class="text-overline mb-4">
          OVERLINE
        </div>
        <v-list-item-title class="text-h5 mb-1">
          {{ city }}
        </v-list-item-title>
        <v-list-item-subtitle>Greyhound divisely hello coldly fonwderfully</v-list-item-subtitle>
      </v-list-item-content>

      <v-list-item-avatar
        tile
        size="80"
        color="grey"
      ></v-list-item-avatar>
    </v-list-item>

    <v-card-actions>
      <v-btn
        outlined
        rounded
        text
      >
        Button
      </v-btn>
    </v-card-actions>
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
  @Prop({ type: String, required: true }) condition!: number;
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
  @Prop(Number) minTemperature?: number;
  @Prop(Number) maxTemperature?: number;
  @Prop(Date) sunrise?: Date;
  @Prop(Date) sunset?: Date;
  @Prop(Number) windSpeed?: number;

  get convertedTemperature(): number {
    return this.temperatureScale === TemperatureScale.Celsius
      ? this.temperature - 100
      : ((this.temperature - 273.15) * 9/5) + 32;
  }
}
</script>