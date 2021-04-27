import Vue from 'vue'
import App from './App.vue'
import mevue from "me-vue-ui";

Vue.config.productionTip = false
Vue.use(mevue);
console.log(mevue)

new Vue({
  render: h => h(App),
}).$mount('#app')
