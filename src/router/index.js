import Vue from 'vue';
import Router from 'vue-router';
import { createSandbox } from 'vue-kindergarten';

import store from '@/store';
import child from '@/child';
import localStore from '@/utils/localStore';
import RouteGoverness from '@/governesses/RouteGoverness';
import articlesPerimeter from '@/perimeters/articles';
import loginPerimeter from '@/perimeters/login';
import projectsPerimeter from '@/perimeters/projects';
import signUpPerimeter from '@/perimeters/signUp';
import tagsPerimeter from '@/perimeters/tags';
import adminPerimeter from '@/perimeters/admin';

const About = () => import('@/pages/About');
const Admin = () => import('@/pages/Admin');
const AdminDashboard = () => import('@/pages/admin/Dashboard');
const AdminNewArticle = () => import('@/pages/admin/NewArticle');
const AdminArticleTable = () => import('@/pages/admin/ArticleTable');
const AdminNewProject = () => import('@/pages/admin/NewProject');
const AdminProjectTable = () => import('@/pages/admin/ProjectTable');
const Article = () => import('@/pages/Article');
const Articles = () => import('@/pages/Articles');
const CV = () => import('@/pages/CV');
const Projects = () => import('@/pages/Projects');
const Login = () => import('@/pages/Login');
const SignUp = () => import('@/pages/SignUp');
const NewTag = () => import('@/pages/NewTag');
const NotFound = () => import('@/pages/NotFound');

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
      path: '/articles/:slug',
      name: 'article',
      component: Article,
      meta: {
        perimeter: articlesPerimeter,
        perimeterAction: 'viewSingle',
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
      path: '/tags/new',
      name: 'new-tag',
      component: NewTag,
      meta: {
        perimeter: tagsPerimeter,
        perimeterAction: 'create',
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
      path: '/admin',
      component: Admin,
      meta: {
        perimeter: adminPerimeter,
      },

      children: [
        {
          path: '',
          name: 'admin-dashboard',
          component: AdminDashboard,
        },

        {
          path: 'articles/new',
          name: 'admin-new-article',
          component: AdminNewArticle,
        },

        {
          path: 'articles',
          name: 'admin-article-table',
          component: AdminArticleTable,
        },

        {
          path: 'projects/new',
          name: 'admin-new-project',
          component: AdminNewProject,
        },

        {
          path: 'projects',
          name: 'admin-project-table',
          component: AdminProjectTable,
        },
      ],
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
  const { meta } = routeRecord;
  const { perimeter } = meta;
  const Governess = meta.governess || RouteGoverness;
  const action = meta.perimeterAction || 'route';

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
      return store.dispatch('me/fetch')
        .then(() => protectRoute(routeRecord, to, from, next))
        .catch(() => {
          store.dispatch('me/logout');
          next('/');
        });
    }

    return protectRoute(routeRecord, to, from, next);
  });
});

export default router;
