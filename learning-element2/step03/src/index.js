import Loading from '../packages/loading/index';

// 导入组件库所有组件
const components = [Loading];

// 定义组件库组件注册安装的install方法
const install = function (Vue) {
  components.forEach((component) => {
    Vue.component(component.name, component); // 使用component注册组件
  });
};

// 自动安装  用<script scr=''></script>的方式直接引入文件
if (typeof window.Vue !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// 导出install、各个组件
export default {
  install,
  Loading,
};
