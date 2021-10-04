<template>
  <v-main>
    <v-container>
      <v-list subheader two-line flat>
        <v-subheader>Temperature Scale</v-subheader>

        <v-list-item-group
          :input-value="weatherOptions.scale"
          @change="scale => updateWeatherOptions({ scale })"
          :multiple="false"
        >
          <v-radio-group>
            <v-list-item>
              <template v-slot:default="{ }">
                <v-list-item-action>
                  <v-radio
                    :input-value="weatherOptions.scale === 0"
                    color="primary"
                  >
                  </v-radio>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Celsius</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template v-slot:default="{ }">
                <v-list-item-action>
                  <v-radio
                    :input-value="weatherOptions.scale === 1"
                    color="primary"
                  >
                  </v-radio>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Farenheit</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>
          </v-radio-group>
        </v-list-item-group>
      </v-list>

      <v-divider></v-divider>

      <v-list subheader two-line flat>
        <v-subheader>Enable extra weather information</v-subheader>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              :input-value="weatherOptions.minTemperature"
              @change="minTemperature => updateWeatherOptions({ minTemperature })"
            >
            </v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Minimum Temperature</v-list-item-title>
            <v-list-item-subtitle>Display minimum temperature</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              :input-value="weatherOptions.maxTemperature"
              @change="maxTemperature => updateWeatherOptions({ maxTemperature })"
            >
            </v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Maximum Temperature</v-list-item-title>
            <v-list-item-subtitle>Display maximum temperature</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              :input-value="weatherOptions.sunrise"
              @change="sunrise => updateWeatherOptions({ sunrise })"
            >
            </v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sunrise</v-list-item-title>
            <v-list-item-subtitle>Display sunrise time</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              :input-value="weatherOptions.sunset"
              @change="sunset => updateWeatherOptions({ sunset })"
            >
            </v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Sunset</v-list-item-title>
            <v-list-item-subtitle>Display sunset time</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>

        <v-list-item>
          <v-list-item-action>
            <v-checkbox
              :input-value="weatherOptions.wind"
              @change="wind => updateWeatherOptions({ wind })"
            >
            </v-checkbox>
          </v-list-item-action>
          <v-list-item-content>
            <v-list-item-title>Wind</v-list-item-title>
            <v-list-item-subtitle>Display wind speed</v-list-item-subtitle>
          </v-list-item-content>
        </v-list-item>
      </v-list>
    </v-container>
  </v-main>
</template>

<script lang="ts">
import {
  UpdateWeatherOptions,
  WeatherOptions
} from '@/interfaces/store/settings';
import {
  GET_WEATHER_OPTIONS,
  UPDATE_WEATHER_OPTIONS,
} from '@/store/settings';
import { Component, Vue } from 'vue-property-decorator';
import {
  Action,
  Getter,
} from 'vuex-class';

@Component
export default class Settings extends Vue {

  @Getter(GET_WEATHER_OPTIONS) weatherOptions!: WeatherOptions;

  @Action(UPDATE_WEATHER_OPTIONS) updateWeatherOptions!: UpdateWeatherOptions;

}
</script>