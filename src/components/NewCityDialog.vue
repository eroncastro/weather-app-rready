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
          style="bottom: 16px; right: 16px;">
          <v-icon>mdi-plus</v-icon>
        </v-btn>
      </template>
      <v-card>
        <v-card-title>
          <span class="text-h5">New cities</span>
        </v-card-title>
        <v-card-text>
          <v-container>
            <v-row>
              <v-col cols="12">
                <v-autocomplete
                  v-model="selected"
                  :items="items"
                  :loading="isLoading"
                  :search-input.sync="search"
                  :value="selected"
                  chips
                  clearable
                  hide-details
                  hide-selected
                  label="Search for a city..."
                  return-object
                  no-filter
                  multiple>
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for
                        <strong>Cities</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip
                      v-bind="attr"
                      :input-value="selected"
                      color="blue-grey"
                      class="white--text"
                      v-on="on"
                      @click:close="removeItem(item)"
                      close>
                      <span v-text="item.label"></span>
                    </v-chip>
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
    if (!text) return;

    const self = this;

    if (self.timer) {
      clearTimeout(self.timer);
    }

    self.timer = setTimeout(async () => {
      console.log(text);
      self.isLoading = true;
      const items = await self.fetchSearchData(text);

      self.$nextTick(() => {
        self.items = items.filter(item => typeof item.locality === 'string');
        self.isLoading = false;
      });
    }, NewCityDialog.TIMEOUT);
  }

  @Watch('selected')
  onSelect(val: any) {
    console.log('selected', val);
  }

  @Watch('search')
  onSearch(val: any) {
    console.log('search', val);
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

  removeItem(item: any) {
    this.selected = this.selected.filter(el => el !== item);
  }

  hideDialog() {
    this.selected = [];
    this.dialog = false;
  }
}

</script>