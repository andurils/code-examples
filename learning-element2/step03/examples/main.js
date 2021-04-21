import Vue from 'vue';
import App from './App.vue';
import router from './router';
import MeUI from '../src/index';

Vue.config.productionTip = false;
Vue.use(MeUI);

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
