# 封装组件封装、编写说明文档

> 原文地址： <https://juejin.cn/post/6953614014546968589>

## 封装组件

接下来封装一个loading组件。  

创建 `packages/loading/src/main.vue` 文件(篇幅问题，样式代码详见Github)。

![carbon (54).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5b1528dba18c4b9990f4c98ff49920d3~tplv-k3u1fbpfcp-watermark.image)

创建 `packages/loading/index.js` 文件。使用 `install` 方法来全局注册该组件，安装组件通过全局方法 `Vue.use()` 即可。[官网-Vue插件](https://cn.vuejs.org/v2/guide/plugins.html)

![carbon (49).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/34545b0937da488ea9eab2dc49c51271~tplv-k3u1fbpfcp-watermark.image)

创建 `src/index.js` 文件,该文件的作用:

1. 导入组件库所有组件
2. 定义组件库组件注册安装的install 方法
3. 整体导出版本、install、各个组件等。

![carbon (51).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/774a37cb51c04bb488de0558471d8d21~tplv-k3u1fbpfcp-watermark.image)

## 引用组件

在 `examples/main.js` 文件中引用组件库

![carbon (53).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/787545adae44478c8f9b71cc77e36e72~tplv-k3u1fbpfcp-watermark.image)

在 `examples/App.vue` 中添加组件引用

![carbon (52).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c2f29c8fb44459d8becb69ec01f9c77~tplv-k3u1fbpfcp-watermark.image)

页面效果如下

![page.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/a5d0de215058424d88848764ee61822e~tplv-k3u1fbpfcp-watermark.image)

## 编写组件说明文档

接下来基于 `markdown` 编写组件文档，能让示例代码像组件一样在页面中渲染。

### md-loader

`markdown` 文件的解析基于`markdown-it` 及其社区插件。

1. `markdown-it` 主要的解析器/渲染器。[官方文档](https://markdown-it.docschina.org/)
2. `markdown-it-anchor`  生成标题锚点。[官方文档](https://github.com/valeriangalliat/markdown-it-anchor/blob/HEAD/README-zh_CN.md)
3. `markdown-it-container`   创建块级自定义容器的解析插件。[官方文档](https://github.com/markdown-it/markdown-it-container)
4. `markdown-it-chain`  支持链式调用 markdown-it 。[官方文档](https://github.com/ULIVZ/markdown-it-chain)

```js
npm i  -D  markdown-it markdown-it-anchor markdown-it-container markdown-it-chain
```

其他核心插件

```js
npm i -D transliteration // 汉字转拼音
```

自定义loader
项目将使用element的自定义loader，在源码目录 `build\md-loader` 创建文件，目录结构如下。

```js
├─md-loader
|     ├─config.js
|     ├─containers.js
|     ├─fence.js
|     ├─index.js
|     └─util.js
```

`index.js`文件是loader的入口文件，通过提取template 与 script 的内容，把 Markdown 转化成 Vue 组件。

![carbon (57).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fada47e8d7546ac8c1cf811c112cb09~tplv-k3u1fbpfcp-watermark.image)

`config.js`文件使用 `markdown-it-chain` 配置`markdown-it`选项、插件和容器信息，初始化`markdown-it`实例。

![carbon (58).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/8af650119cda4cfa904f4782a9586416~tplv-k3u1fbpfcp-watermark.image)

`containers.js`文件使用 `markdown-it-container` 来转换自定义容器,将自定义容器 `:::demo`转换成 `demo-block` 组件。

![carbon (59).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4fe5ea568fdb4017bacf48b66646d73c~tplv-k3u1fbpfcp-watermark.image)

`fence.js`文件中重写了代码块（fence）默认渲染规则。

![carbon (60).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/29582f8f749f40d68198c06f2145456f~tplv-k3u1fbpfcp-watermark.image)

`util.js`文件提供 `stripScript` `stripStyle` `stripTemplate` `genInlineComponentText`等方法用于页面内容提取和生成组件。

![carbon (61).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6396f8b3269456bb6e695562a4bba27~tplv-k3u1fbpfcp-watermark.image)

### webpack 配置

创建`build/config.js`文件设置 `webpack` 公共配置信息。

![carbon (62).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1fd48b9a2a3d433090ddee80c87d4d17~tplv-k3u1fbpfcp-watermark.image)

更新 `build\webpack.config.js`文件，添加自定义 `md-loder` ，实现 `markdown` 文件的解析。

![carbon (63).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/187e473a09a249e4898a250f4caf59b8~tplv-k3u1fbpfcp-watermark.image)

## 编写文档

编写组件说明文档`examples\docs\loading.md`

![carbon (56).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61f44055de9d457fad4a09712d2d0bb0~tplv-k3u1fbpfcp-watermark.image)

安装 `vue-router` 插件。

```js
npm i -D vue-router  
```

新增 `examples/router.js` 文件配置路由信息。

![carbon (64).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/777be8ed0bb346c5b3dd848b55ecc689~tplv-k3u1fbpfcp-watermark.image)

调整 `examples` 目录下文档结构如下，详见源码。

```js
├─examples
|    ├─App.vue
|    ├─main.js
|    ├─router.js
|    ├─docs
|    |  └loading.md
|    ├─components
|    |     ├─HelloWorld.vue
|    |     └JSX.vue
|    ├─assets
|    |   └logo.png
```

`examples\main.js` 引入路由，`examples\App.vue` 更新路由导航信息。

```js
// main.js
...
...
import router from './router'; 
...
new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

// App.vue
<template>
  <div id="app">
    <div id="nav">
      <router-link to="/">Home</router-link> | <router-link to="/jsx">JSX</router-link> |
      <router-link to="/test">loading组件</router-link>
    </div>
    <router-view />
  </div>
</template>
```

页面效果如下

![Animation12.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/546834fb4a6c4d0d8895f861f333be7f~tplv-k3u1fbpfcp-watermark.image)

## demo-block 组件

上面的说明文档功能十分简陋，接下来编写 `demo-block` 组件,支持示例组件渲染、高亮代码等功能。

安装语法高亮插件 `highlight.js` 。

```js
npm i -D highlight.js    // 代码高亮
```

创建 `examples\components\demo-block.vue` 组件

![carbon (19).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/32ef6410925a495caab037f18d4929cc~tplv-k3u1fbpfcp-watermark.image)

`examples\main.js` 引入 `highlight` 插件、 `demo-block` 组件，配置语法高亮主题样式。增加 `afterEach` 全局后置钩子,高亮页面代码块。

![carbon (20).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7743f01d56594ac1a52c1928f8795eff~tplv-k3u1fbpfcp-watermark.image)

组件说明文档 `examples\docs\loading.md` 更新成约定的文档格式。

![carbon (21).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb520f7175394d5bbc06322cde88cab5~tplv-k3u1fbpfcp-watermark.image)

运行程序，页面示例代码块渲染组件，可以展开收起源代码，语法高亮显示，效果如下：

![page1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83ac9490b0a24fe18f839930ef71a030~tplv-k3u1fbpfcp-watermark.image)
