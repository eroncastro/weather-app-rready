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
                  item-text="city"
                  item-value="city"
                  label="Search for a city..."
                  return-object
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
                      @click:close="remove(data.item)"
                      close>
                      <span v-text="item.city"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-content>
                      <v-list-item-title v-text="item.city"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
                    </v-list-item-content>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="() => {
            hideDialog();
          }">
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
import { CurrentWeatherInput } from '@/interfaces/clients/open_weather_map';
import { Component, Vue, Watch } from 'vue-property-decorator';

const ITEMS = [
  { city: 'Uberlândia', country: 'BR' },
  { city: 'Zurich', country: 'CH' },
  { city: 'Rotterdam', country: 'NL' },
];

@Component
export default class NewCityDialog extends Vue {
  dialog = false;
  isLoading = false;
  timer = null;
  items = Array<CurrentWeatherInput>();
  search = '';
  selected = [];

  handleSave() {
    if (this.selected.length) {
      this.$emit('citiesAdded', this.selected);
    }

    this.hideDialog();
  }

  @Watch('search')
  async onSearchChange () {
    // Items have already been loaded
    if (this.items.length > 0) return;

    this.isLoading = true;
    const self = this;

    // simulate a request now.
    await new Promise(resolve => {
      setTimeout(() => {
        self.items = ITEMS;
        self.isLoading = false;
        resolve(true);
      }, 1000);
    })
  }

  hideDialog() {
    this.selected = [];
    this.dialog = false;
  }
}

</script>