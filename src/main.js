/* eslint-disable no-restricted-globals */
/* eslint-disable no-param-reassign */
import Vue from 'vue';
import Fragment from 'vue-fragment';
import App from './App.vue';
import router from './router';
import store from './store';
import LoadingPage from './components/LoadingPage.vue';
import NotificationError from './components/NotificationError.vue';

import '@/assets/scss/index.scss';

Vue.component('LoadingPage', LoadingPage);
Vue.component('NotificationError', NotificationError);

Vue.filter('priceNumber', (value) => {
  value = Number(value);
  if (!isNaN(value)) {
    return value.toLocaleString('pt-br', {
      style: 'currency',
      currency: 'BRL',
    });
  }
  return '';
});

Vue.use(Fragment.Plugin);
Vue.config.productionTip = false;

new Vue({
  router,
  store,
  render: (h) => h(App),
}).$mount('#app');
