import Vue from 'vue';
import App from './App.vue';
import router from './router';
import MeUI from '../src/index';
// import MeUI from '../lib/me-vue-ui.common';
import hljs from 'highlight.js';
import demoBlock from './components/demo-block';

// import 'highlight.js/styles/github.css';
// import 'highlight.js/styles/darcula.css';
// import 'highlight.js/styles/arduino-light.css';
import 'highlight.js/styles/stackoverflow-light.css';

Vue.config.productionTip = false;
Vue.use(MeUI);
Vue.component('demo-block', demoBlock);

router.afterEach(() => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  document.title = 'me-ui';
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');
