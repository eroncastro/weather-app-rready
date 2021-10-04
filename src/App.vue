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

      <v-toolbar-title class="white--text">{{ routeTitle}}</v-toolbar-title>
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
        <v-list-item-group
          active-class="highlighted"
          :value="selected"
        >
          <router-link
            v-for="(item, i) in drawerItems"
            :key="i"
            :to="item.route"
            style="text-decoration: none;"
          >
            <v-list-item link>
              <v-list-item-icon>
                <v-icon>{{ item.icon }}</v-icon>
              </v-list-item-icon>

              <v-list-item-content>
                <v-list-item-title v-text="item.title"></v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </router-link>
        </v-list-item-group>
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
  routeTitleMap = new Map([
    ['/', 'Weather App'],
    ['/settings', 'Settings'],
  ]);
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
  selectedIndex = null;

  get routeTitle(): string {
    return this.routeTitleMap.get(this.$route.path) ?? '';
  }

  get selected(): number {
    return this.drawerItems.findIndex(item => item.route === this.$route.path);
  }

}

</script>

<style>

</style>
