<template>
  <v-main>
    <v-container>
      <v-list subheader two-line flat>
        <v-subheader>Temperature Scale</v-subheader>

        <v-list-item-group v-model="settings" :multiple="false">
          <v-radio-group>
            <v-list-item>
              <template v-slot:default="{ active, }">
                <v-list-item-action>
                  <v-radio checked :input-value="active" color="primary"></v-radio>
                </v-list-item-action>

                <v-list-item-content>
                  <v-list-item-title>Celsius</v-list-item-title>
                </v-list-item-content>
              </template>
            </v-list-item>

            <v-list-item>
              <template v-slot:default="{ active, }">
                <v-list-item-action>
                  <v-radio :input-value="active" color="primary"></v-radio>
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

        <v-list-item-group v-model="settings" multiple>
          <v-list-item>
            <template v-slot:default="{ active, }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Wind Speed</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active, }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Minimum temperature</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active, }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Maximum temperature</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active, }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Sunrise time</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>

          <v-list-item>
            <template v-slot:default="{ active, }">
              <v-list-item-action>
                <v-checkbox :input-value="active" color="primary"></v-checkbox>
              </v-list-item-action>

              <v-list-item-content>
                <v-list-item-title>Sunset time</v-list-item-title>
              </v-list-item-content>
            </template>
          </v-list-item>
        </v-list-item-group>
      </v-list>
    </v-container>
  </v-main>
</template>