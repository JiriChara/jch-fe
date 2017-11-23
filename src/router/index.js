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
import articlesPerimeter from '@/perimeters/articles';
import loginPerimeter from '@/perimeters/login';
import projectsPerimeter from '@/perimeters/projects';
import signUpPerimeter from '@/perimeters/signUp';

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
      meta: {
        perimeter: articlesPerimeter,
        perimeterAction: 'viewList',
      },
    },

    {
      path: '/articles/new',
      name: 'new-article',
      component: NewArticle,
      meta: {
        perimeter: articlesPerimeter,
        perimeterAction: 'create',
      },
    },

    {
      path: '/articles/:slug',
      name: 'article',
      component: Article,
      meta: {
        perimeter: articlesPerimeter,
        perimeterAction: 'viewSingle',
      },
    },

    {
      path: '/articles/:slug/edit',
      name: 'edit-article',
      component: EditArticle,
      meta: {
        perimeter: articlesPerimeter,
        perimeterAction: 'update',
      },
    },

    {
      path: '/projects',
      name: 'projects',
      component: Projects,
      meta: {
        perimeter: projectsPerimeter,
        perimeterAction: 'viewList',
      },
    },

    {
      path: '/projects/new',
      name: 'new-project',
      component: NewProject,
      meta: {
        perimeter: projectsPerimeter,
        perimeterAction: 'create',
      },
    },

    {
      path: '/projects/:slug/edit',
      name: 'edit-project',
      component: EditProject,
      meta: {
        perimeter: projectsPerimeter,
        perimeterAction: 'update',
      },
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
      meta: {
        perimeter: signUpPerimeter,
      },
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
