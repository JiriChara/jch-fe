import Vue from 'vue';
import Buefy from 'buefy';
import VueProgressBar from 'vue-progressbar';
import { sync } from 'vuex-router-sync';
import VueKindergarten from 'vue-kindergarten';
import Vuelidate from 'vuelidate';

import App from '@/App';
import router from '@/router';
import store from '@/store';
import child from '@/child';

import '@/css/main.scss';

Vue.config.productionTip = false;

sync(store, router);

Vue.use(Buefy);

Vue.use(VueProgressBar, {
  color: '#332532',
  thickness: '3px',
});

Vue.use(VueKindergarten, {
  child,
});

Vue.use(Vuelidate);

const app = new Vue({
  template: '<App/>',
  components: { App },
  router,
  store,
});

app.$mount('#app');
