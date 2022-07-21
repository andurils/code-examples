# babel 配置

![blog.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0c757791e762403aa6b0acfc9bc3e4b2~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp)

> 原文地址： <https://juejin.cn/post/6951215878928678948>

书接上文，接下来项目将引入 babel 支持 ES6+语法兼容。

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。[中文官网](https://www.babeljs.cn/)

## babel 概念

Babel 是一个编译器（输入源码 => 输出编译后的代码）。编译过程分为三个阶段：解析、转换和打印输出。

**Babel 本身不具有任何转化功能**，它把转化的功能都分解到一个个 plugin 里面。因此当我们不配置任何插件时，经过 babel 的代码和输入是相同的。

### 插件(Plugins)

插件总共分为两种：语法插件(Syntax Plugins)和转译插件(Transform Plugins)。

- **转换插件**用于转换你的代码。
- **语法插件**只允许 Babel 解析(parse)特定类型的语法(而不是转换)。

> 转换插件会自动启用语法插件。因此，如果你已经使用了相应的转换插件，则不需要指定语法插件。
> 具体插件列表，详见官方文档。 [Plugins](https://babeljs.io/docs/en/plugins-list)

### 预设(Presets)

presets 可以看作一组预先设定的插件列表集合，我们可以不必再当独地一个一个地去添加我们需要的插件。

### 配置文件

babel 提供了 config 的方式，类似于 webpack 的 cli 方式以及 config 方式。[官方文档](https://babeljs.io/docs/en/config-files)

babel 7.X 之后，引入了`babel.config.json` (支持.js, .cjs, .mjs 等文件格式);在 7.X 之前，项目都是基于`.babelrc`(支持.json,.js, .cjs, .mjs 等文件格式)来进行配置。

一般`babel.config.json`会放置在根目录下，在执行编译时，babel 会首先去寻找`babel.config.json`文件，以此来作为整个项目的根配置。

**babel.config.json** 配置示例

```js
{
  "presets": ["@babel/env"],
  "plugins": ["transform-vue-jsx"]
}
```

### 插件的短名称

如果插件名称的前缀为 babel-plugin-，你还可以使用它的短名称：

```js
{
  "plugins": [
    "myPlugin",
    "babel-plugin-myPlugin" // 两个插件实际是同一个
  ]
}
```

适用于带有冠名（scope）的插件：

```js
{
  "plugins": [
    "@org/babel-plugin-name",
    "@org/name" // 两个插件实际是同一个
  ]
}
```

### 预设的短名称

如果 preset 名称的前缀为 babel-preset-，你还可以使用它的短名称：

```js
{
  "presets": [
    "myPreset",
    "babel-preset-myPreset" // equivalent
  ]
}
```

适用于带有冠名（scope）的 preset：

```js
{
  "presets": [
    "@org/babel-preset-name",
    "@org/name" // equivalent
  ]
}
```

### 执行顺序

- 插件执行顺序在 presets 之前
- 插件会按照声明的插件列表顺序顺序执行(first to last)
- preset 会按照声明的列表顺序逆序执行(last to first)

> 参考  
> <https://www.cnblogs.com/rynxiao/p/13665506.html>  
> <https://babeljs.io/docs/en/config-files>

## babel 安装与配置

### 安装所需包（package）

项目中引入 bable(babel 7.0 以后的插件与预设以@babel 为前缀)。

```js
npm install @babel/core @babel/cli @babel/preset-env --save-dev
```

`@babel/cli` 内置的 CLI 命令行工具，可通过命令行编译文件。[官方文档](https://www.babeljs.cn/docs/babel-cli)
`@babel/core` babel 的核心，包含各个核心的 API，供 babel 插件和打包工具使用。[官方文档](https://www.babeljs.cn/docs/babel-core)
`@babel/preset-env` 是一个常用的预设(Presets), 让你能使用最新的 JavaScript 语法, 它会帮你转换成代码的目标运行环境支持的语法, 提升你的开发效率并让打包后的代码体积更小。[相关参考](https://juejin.cn/post/6844903937900822536)

**webpack loader 模块安装**

```sh
npm install babel-loader --save-dev
```

**JSX 语法模块安装**

JSX 语法插件使用`babel-plugin-syntax-jsx`，没有使用高版本的`@babel/plugin-syntax-jsx`,项目运行中后者会出现 `Cannot find module babel-plugin-syntax-jsx` 异常。

```sh
npm install babel-plugin-syntax-jsx babel-plugin-transform-vue-jsx --save-dev
npm install babel-helper-vue-jsx-merge-props --save
```

### 功能验证

上述模块安装完毕后，在 test 目录下，创建一个名为`babel-es6-test.js`的文件

```js
// Babel输入:ES2015箭头函数
[1，2，3].map((n) =>n + 1);
```

在命令行窗口输入以下指令，编译整个`test`文件夹并输出到`lib`(不存在则自动创建)文件夹中

```sh
./node_modules/.bin/babel src --out-dir lib  // 功能测试
```

成功运行后，项目 lib 目录下也会创建一个`babel-es6-test.js`的文件，跟`test`目录下的文件是相同的，代码没有进行转换。

> Babel 本身不具有任何转化功能，不配置任何插件时，经过 babel 的代码和输入是相同的。

在根目录下创建`babel.config.json`文件，配置如下：

```js
{
  "presets": ["@babel/env"],
}

```

再次运行指令，`lib`下输出文件代码已经转换

```js
"use strict";
// Babel输入:ES2015箭头函数
[1，2，3].map( function (n){
    return n + 1;
});
```

### 项目配置

更新`babel.config.json`配置

```js
{
  "presets": ["@babel/env"],
  "plugins": ["transform-vue-jsx"]
}

```

`webpack.config.js`添加一条关于`babel-loader`的规则：

```js
{
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: /node_modules/,
        loader: "babel-loader",
      },
    ];
  }
}
```

目录`examples`新增文件`JSX.vue`用来测试 JSX 语法

```js
<script>
export default {
  name: "JSX",
  data() {
    return {};
  },
  render() {
    return (
      <div>
        <h1>Bebal Init</h1>
        <h2>hello, I am JSX!!</h2>
      </div>
    );
  },
};
</script>

```

更新`examples\App.vue`文件，引入`JSX.vue`组件

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="./logo.png" />
    <JSX></JSX>
    <h1>Welcome to My Vue.js UI By WebPack!</h1>
  </div>
</template>

<script>
  import JSX from "./JSX.vue";
  export default {
    name: "App",
    components: { JSX },
  };
</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
    margin-top: 60px;
  }
</style>
```

运行 npm run dev，打开浏览器，成功解析结果如下

![微信截图_20210415105826.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b2761b87c8548b7a0ed153e7e4a8afc~tplv-k3u1fbpfcp-watermark.image)

## 最新目录结构

![carbon (39).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bf5b11a54a342e6b3d5bcef02d15fde~tplv-k3u1fbpfcp-watermark.image)
