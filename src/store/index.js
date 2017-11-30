import Vue from 'vue';
import Vuex from 'vuex';

import aboutMe from '@/store/aboutMe';
import articles from '@/store/articles';
import images from '@/store/images';
import me from '@/store/me';
import navbar from '@/store/navbar';
import projects from '@/store/projects';
import tags from '@/store/tags';
import tokens from '@/store/tokens';
import users from '@/store/users';

Vue.use(Vuex);

export default new Vuex.Store({
  state: {},

  modules: {
    aboutMe,
    articles,
    images,
    me,
    navbar,
    projects,
    tags,
    tokens,
    users,
  },
});
