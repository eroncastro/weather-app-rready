<template>
  <v-main>
    <v-container>
      <v-list subheader two-line flat>
        <v-subheader>Temperature Scale</v-subheader>

        <v-list-item-group
          :input-value="scale"
          @change="scale => updateSettings({ scale })"
          :multiple="false"
        >
          <v-radio-group>
            <v-list-item>
              <template v-slot:default="{ }">
                <v-list-item-action>
                  <v-radio
                    :input-value="scale === 0"
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
                    :input-value="scale === 1"
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
              :input-value="minTemperature"
              @change="minTemperature => updateSettings({ minTemperature })"
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
              :input-value="maxTemperature"
              @change="maxTemperature => updateSettings({ maxTemperature })"
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
              :input-value="sunrise"
              @change="sunrise => updateSettings({ sunrise })"
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
              :input-value="sunset"
              @change="sunset => updateSettings({ sunset })"
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
              :input-value="wind"
              @change="wind => updateSettings({ wind })"
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
import type {
  TemperatureScale
} from '@/interfaces/clients/open_weather_map';
import {
  GET_MAX_TEMPERATURE,
  GET_MIN_TEMPERATURE,
  GET_SUNRISE,
  GET_SUNSET,
  GET_TEMPERATURE_SCALE,
  GET_WIND,
} from '@/store/settings';
import { Component, Vue } from 'vue-property-decorator';
import {
  Getter,
  // Action,
} from 'vuex-class';

@Component
export default class Settings extends Vue {
  @Getter(GET_TEMPERATURE_SCALE) scale!: TemperatureScale;
  @Getter(GET_MIN_TEMPERATURE) minTemperature!: boolean;
  @Getter(GET_MAX_TEMPERATURE) maxTemperature!: boolean;
  @Getter(GET_WIND) wind!: boolean;
  @Getter(GET_SUNRISE) sunrise!: boolean;
  @Getter(GET_SUNSET) sunset!: boolean;

  mounted() {
    console.log(this.scale);
    console.log(this.minTemperature);
  }
}
</script>