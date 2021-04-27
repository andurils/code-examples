import Vue from "vue";
import App from "./App.vue";
import MeUI from "me-vue-ui";

Vue.config.productionTip = false;
Vue.use(MeUI);

new Vue({
  render: (h) => h(App),
}).$mount("#app");
