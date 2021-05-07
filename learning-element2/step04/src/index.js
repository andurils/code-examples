import Loading from '../packages/loading/index';

// 导入组件库所有组件
const components = [Loading];

// 定义组件库组件注册安装的install方法
// 如果使用 use 注册插件，则所有的组件都将被注册
const install = function (Vue) {
  // 判断是否安装
  if (install.installed) return;

  components.forEach((component) => {
    Vue.component(component.name, component); // 使用component注册组件
  });
};

// 自动安装  判断是否用<script scr=''></script>的方式直接引入文件
if (typeof window.Vue !== 'undefined' && window.Vue) {
  install(window.Vue);
}

// 导出install、各个组件
export default {
  // 导出的对象必须具有 install，才能被 Vue.use() 方法安装
  install,
  // 具体的组件列表
  Loading,
};
