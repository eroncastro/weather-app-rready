<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="blue darken-1"
    >
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>

      <v-toolbar-title color="white">Weather App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="drawer"
      fixed
      temporary
      color="white"
    >
      <!--  -->
    </v-navigation-drawer>

    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {
  data() {
    return { drawer: null };
  }
}

</script>
