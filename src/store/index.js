import Vue from 'vue';
import Vuex from 'vuex';

import articles from '@/store/articles';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  modules: {
    articles,
  },
});
