import Vue from 'vue';
import VueRouter from 'vue-router';

Vue.use(VueRouter);

const routes = [
  {
    path: '/',
    name: 'index',
    component: (resolve) => require(['./components/HelloWorld.vue'], resolve), //使用vue的异步组件技术 , 可以实现按需加载 .
  },
];

routes.push({
  path: '/test',
  name: 'test',
  component: (resolve) => require(['./docs/loading.md'], resolve),
});

routes.push({
  path: '/jsx',
  name: 'jsx',
  component: (resolve) => require(['./components/JSX.vue'], resolve),
  // component: () => import('./components/JSX.vue'),
});

export default new VueRouter({
  mode: 'hash',
  base: __dirname,
  routes,
});
