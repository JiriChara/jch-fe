import Vue from 'vue';
import Vuex from 'vuex';

import articles from '@/store/articles';
import navbar from '@/store/navbar';
import projects from '@/store/projects';
import tags from '@/store/tags';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  modules: {
    articles,
    navbar,
    projects,
    tags,
  },
});
