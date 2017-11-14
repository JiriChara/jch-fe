import Vue from 'vue';
import Router from 'vue-router';
import Articles from '@/pages/Articles';

Vue.use(Router);

export default new Router({
  routes: [
    {
      path: '/',
      name: 'articles',
      component: Articles,
    },
  ],
});
