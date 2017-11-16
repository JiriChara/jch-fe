import Vue from 'vue';
import Router from 'vue-router';

import store from '@/store';
import About from '@/pages/About';
import Article from '@/pages/Article';
import Articles from '@/pages/Articles';
import CV from '@/pages/CV';
import Projects from '@/pages/Projects';

Vue.use(Router);

const router = new Router({
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

    {
      path: '/about',
      name: 'about',
      component: About,
    },

    {
      path: '/cv',
      name: 'cv',
      component: CV,
    },

    {
      path: '/:slug',
      name: 'article',
      component: Article,
    },
  ],
});

router.beforeEach((to, from, next) => {
  // Hide menu on mobile when route is changed
  store.dispatch('navbar/hideMobileMenu');

  next();
});

export default router;
