<template>
  <v-row justify="center">
    <v-dialog v-model="dialog" max-width="600px">
      <template v-slot:activator="{ on, attrs }">
        <v-btn color="blue" dark absolute bottom right fab v-bind="attrs" v-on="on" style="bottom: 16px; right: 16px;">
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
                <v-autocomplete v-model="model" :items="items" :loading="isLoading" :search-input.sync="search" chips
                  clearable hide-details hide-selected item-text="name" item-value="symbol" label="Search for a coin..."
                  multiple>
                  <template v-slot:no-data>
                    <v-list-item>
                      <v-list-item-title>
                        Search for cities
                        <strong>Cryptocurrency</strong>
                      </v-list-item-title>
                    </v-list-item>
                  </template>
                  <template v-slot:selection="{ attr, on, item, selected }">
                    <v-chip v-bind="attr" :input-value="selected" color="blue-grey" class="white--text" v-on="on">
                      <v-icon left>
                        mdi-bitcoin
                      </v-icon>
                      <span v-text="item.name"></span>
                    </v-chip>
                  </template>
                  <template v-slot:item="{ item }">
                    <v-list-item-avatar color="indigo" class="text-h5 font-weight-light white--text">
                      {{ item.name.charAt(0) }}
                    </v-list-item-avatar>
                    <v-list-item-content>
                      <v-list-item-title v-text="item.name"></v-list-item-title>
                      <v-list-item-subtitle v-text="item.symbol"></v-list-item-subtitle>
                    </v-list-item-content>
                    <v-list-item-action>
                      <v-icon>mdi-bitcoin</v-icon>
                    </v-list-item-action>
                  </template>
                </v-autocomplete>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
        <v-card-actions>
          <v-spacer></v-spacer>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Close
          </v-btn>
          <v-btn color="blue darken-1" text @click="dialog = false">
            Save
          </v-btn>
        </v-card-actions>
      </v-card>
    </v-dialog>
  </v-row>
</template>

<script>
  export default {
    data: () => ({
      dialog: false,
      isLoading: false,
      items: [],
      model: null,
      search: null,
      tab: null,
    }),
    watch: {
      model (val) {
        if (val != null) this.tab = 0
        else this.tab = null
      },
      search (val) {
        // Items have already been loaded
        if (this.items.length > 0) return

        this.isLoading = true

        const url = `https://maps.googleapis.com/maps/api/place/autocomplete/json?input=${val}&types=(cities)&language=pt_BR&key=AIzaSyBJw7l0d3ok1nLsTTDUgFXLWnvCT-77X6Q`;

        // Lazily load input items
        fetch(url)
          .then(res => res.clone().json())
          .then(res => {
            this.items = res
          })
          .catch(err => {
            console.log(err)
          })
          .finally(() => (this.isLoading = false))
      },
    },
  }
</script>