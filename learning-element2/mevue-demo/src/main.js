import Vue from 'vue'
import App from './App.vue'
import MeVue from "me-vue-ui";

Vue.config.productionTip = false
Vue.use(MeVue); 

new Vue({
  render: h => h(App),
}).$mount('#app')
