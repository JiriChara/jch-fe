import Vue from 'vue';
import Buefy from 'buefy';
import VueProgressBar from 'vue-progressbar';
import { sync } from 'vuex-router-sync';
import VueKindergarten from 'vue-kindergarten';
import Vuelidate from 'vuelidate';
import Meta from 'vue-meta';

import App from '@/App';
import router from '@/router';
import store from '@/store';
import child from '@/child';

import '@/css/main.scss';
import JChLoader from '@/components/utils/Loader';

Vue.config.productionTip = false;

sync(store, router);

// Plugins
Vue.use(Buefy, {
  defaultIconPack: 'fa',
  defaultContentElement: '#app',
});

Vue.use(VueProgressBar, {
  color: '#332532',
  thickness: '3px',
});

Vue.use(VueKindergarten, {
  child,
});

Vue.use(Vuelidate);

Vue.use(Meta);

// Global Components
Vue.component('jch-loader', JChLoader);

const app = new Vue({
  template: '<App/>',
  components: { App },
  router,
  store,
});

router.onReady(() => {
  app.$mount('#app');
});
