import Vue from 'vue';
import Router from 'vue-router';
import { createSandbox } from 'vue-kindergarten';

import store from '@/store';
import child from '@/child';
import localStore from '@/utils/localStore';
import About from '@/pages/About';
import Article from '@/pages/Article';
import Articles from '@/pages/Articles';
import NewArticle from '@/pages/NewArticle';
import EditArticle from '@/pages/EditArticle';
import CV from '@/pages/CV';
import Projects from '@/pages/Projects';
import EditProject from '@/pages/EditProject';
import NewProject from '@/pages/NewProject';
import Login from '@/pages/Login';
import SignUp from '@/pages/SignUp';
import NotFound from '@/pages/NotFound';
import RouteGoverness from '@/governesses/RouteGoverness';
import loginPerimeter from '@/perimeters/login';

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
      path: '/articles/new',
      name: 'new-article',
      component: NewArticle,
    },

    {
      path: '/articles/:slug',
      name: 'article',
      component: Article,
    },

    {
      path: '/articles/:slug/edit',
      name: 'edit-article',
      component: EditArticle,
    },

    {
      path: '/projects',
      name: 'projects',
      component: Projects,
    },

    {
      path: '/projects/new',
      name: 'new-project',
      component: NewProject,
    },

    {
      path: '/projects/:slug/edit',
      name: 'edit-project',
      component: EditProject,
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
      path: '/login',
      name: 'login',
      component: Login,
      meta: {
        perimeter: loginPerimeter,
      },
    },

    {
      path: '/join',
      name: 'sign-up',
      component: SignUp,
    },

    {
      path: '*',
      name: 'not-found',
      component: NotFound,
    },
  ],
});

const protectRoute = (routeRecord, to, form, next) => {
  const perimeter = routeRecord.meta.perimeter;
  const Governess = routeRecord.meta.governess || RouteGoverness;
  const action = routeRecord.meta.perimeterAction || 'route';

  if (perimeter) {
    const sandbox = createSandbox(child(store), {
      governess: new Governess(),

      perimeters: [
        perimeter,
      ],
    });

    const guard = () => sandbox.guard(action, { next });

    return guard();
  }

  return next();
};

router.beforeEach((to, from, next) => {
  // Hide menu on mobile when route is changed
  store.dispatch('navbar/hideMobileMenu');

  to.matched.some((routeRecord) => {
    if (!child(store) && localStore.get('jwt')) {
      return store.dispatch('me/fetch').then(() => protectRoute(routeRecord, to, from, next));
    }

    return protectRoute(routeRecord, to, from, next);
  });
});

export default router;
