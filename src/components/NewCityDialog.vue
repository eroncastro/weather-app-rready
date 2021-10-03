<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          color="blue"
          dark
          absolute
          bottom
          right
          fab
          v-bind="attrs"
          v-on="on"
          class="new-city-weather"
        >
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New cities</span>
        </v-card-title>

        <v-card-text>
          <v-chip-group
            active-class="primary--text"
            column
          >
            <v-chip
              close
              @click:close="removeItem(item)"
              v-for="(item, i) in selected"
              :key="i"
            >
              {{ item.label }}
            </v-chip>
          </v-chip-group>
        </v-card-text>

        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="selected"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  :value="search"
                  item-text="label"
                  item-value="label"
                  filled
                  hide-details
                  hide-selected
                  label="Search for a city..."
                  return-object
                  no-filter
                  multiple
                  @change="search=''"
                  @blur="handleLoseFocus"
                >
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for
                        <strong>Cities</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="">
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.label"></v-list-item-title>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn
            color="blue darken-1"
            text
            @click="() => hideDialog()">
            Close
          </v-btn>
          <v-btn
            color="blue darken-1"
            text
            :disabled="!selected.length"
            @click="() => handleSave()">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script lang="ts">
import { Component, Prop, Vue, Watch } from 'vue-property-decorator';

import type GeocodeEarthApiClient from '@/clients/geocode_earth';
import AutocompleteDataProcessor from '@/utils/autocomplete/data_processor';
import { AutocompleteJSON, Properties } from '@/interfaces/clients/geocode_earth';
import { CurrentWeatherInput } from '@/interfaces/clients/open_weather_map';

@Component
export default class NewCityDialog extends Vue {
  static TIMEOUT = 800;

  dialog = false;
  isLoading = false;
  timer!: number;
  items = Array<Properties>();
  search = '';
  selected = Array<Properties>();

  @Prop({ required: true }) geocodeEarthApiClient!: GeocodeEarthApiClient;

  @Watch('search')
  async onSearchChange(text: string) {
    const self = this;

    if (!text) {
      return;
    }
    if (self.timer) {
      clearTimeout(self.timer);
    }

    self.timer = setTimeout(async () => {
      self.isLoading = true;
      const items = await self.fetchSearchData(text);

      self.$nextTick(() => {
        self.items = items.filter(item => typeof item.locality === 'string');
        self.isLoading = false;
      });
    }, NewCityDialog.TIMEOUT);
  }

  async fetchSearchData(text: string) {
    const rawData =
      await this.geocodeEarthApiClient.fetchAutocompleteSearch(text);

    return AutocompleteDataProcessor
      .getCitiesData(rawData.jsonBody as AutocompleteJSON);
  }

  handleSave() {
    if (this.selected.length) {
      const data: Array<CurrentWeatherInput> = this.selected.map(item => {
        const {
          country_code: country,
          locality: city = '',
        } = item;

        return { country, city };
      })

      this.$emit('citiesAdded', data);
    }

    this.hideDialog();
  }

  handleLoseFocus() {
    this.items = Array<Properties>();
  }

  removeItem(item: any) {
    this.selected = this.selected.filter(el => el !== item);
  }

  hideDialog() {
    this.selected = Array<Properties>();
    this.items = Array<Properties>();
    this.search = '';
    this.dialog = false;
  }
}

</script>

<style scoped>
  .new-city-weather {
    position: fixed;
    bottom: 16px !important;
    right: 16px !important;
  }
</style>