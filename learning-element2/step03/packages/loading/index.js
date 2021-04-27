/* eslint-disable no-unused-vars */
import Loading from './src/main';

// 插件应该暴露一个 install 方法
// 第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
Loading.install = function (Vue, options) {
  Vue.component(Loading.name, Loading); //使用component注册组件
};

// 默认导出组件
export default Loading;
