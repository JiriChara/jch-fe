import Vue from 'vue';
import Router from 'vue-router';

import Articles from '@/pages/Articles';
import Projects from '@/pages/Projects';

Vue.use(Router);

export default new Router({
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
