<template>
  <v-app id="inspire">
    <v-app-bar
      app
      color="blue darken-1"
    >
      <v-app-bar-nav-icon
        @click="showDrawer = !showDrawer"
        class="white--text"
      >
      </v-app-bar-nav-icon>

      <v-toolbar-title class="white--text">Weather App</v-toolbar-title>
    </v-app-bar>

    <v-navigation-drawer
      v-model="showDrawer"
      fixed
      temporary
    >
      <v-list-item>
        <v-list-item-content>
          <v-list-item-title class="text-h6">
            Weather App
          </v-list-item-title>
          <v-list-item-subtitle>
            Routes
          </v-list-item-subtitle>
        </v-list-item-content>
      </v-list-item>

      <v-divider></v-divider>

      <v-list
        dense
        nav
      >
        <router-link
          v-for="item in drawerItems"
          :key="item.title"
          :to="item.route"
          style="text-decoration: none;"
        >
          <v-list-item
            link
          >
            <v-list-item-icon>
              <v-icon>{{ item.icon }}</v-icon>
            </v-list-item-icon>

            <v-list-item-content>
              <v-list-item-title>{{ item.title }}</v-list-item-title>
            </v-list-item-content>
          </v-list-item>
        </router-link>
      </v-list>
    </v-navigation-drawer>

    <router-view></router-view>
  </v-app>
</template>

<script lang="ts">
import { Component, Vue } from 'vue-property-decorator';

@Component
export default class App extends Vue {

  showDrawer = false;
  drawerItems = [
    {
      title: 'Home',
      icon: 'mdi-view-dashboard',
      route: '/',
    },
    {
      title: 'Settings',
      icon: 'mdi-application-settings',
      route: '/settings'
    },
  ];

}

</script>

<style>

</style>
