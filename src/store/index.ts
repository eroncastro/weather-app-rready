import Vue from 'vue';
import Vuex from 'vuex';

import settings from './settings';
import weather from './weather';

Vue.use(Vuex);

export default new Vuex.Store({
  modules: {
    weather,
    settings,
  },
});
