import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';
import router from './router';
import store from './store';

import '@/assets/scss/index.scss';

Vue.use(Fragment.Plugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
