import Vue from 'vue';
import Router from 'vue-router';

import Articles from '@/pages/Articles';
import Projects from '@/pages/Projects';

Vue.use(Router);

export default new Router({
  mode: 'history',

  scrollBehavior(to) {
    if (to.hash) {
      return {
        selector: to.hash,
      };
    }

    return { x: 0, y: 0 };
  },

  routes: [
    {
      path: '/',
      name: 'articles',
      component: Articles,
    },

    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },
  ],
});
