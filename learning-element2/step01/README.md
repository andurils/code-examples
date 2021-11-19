# babel配置

> 原文地址： <https://juejin.cn/post/6951215878928678948>

Babel 是一个工具链，主要用于将 ECMAScript 2015+ 版本的代码转换为向后兼容的 JavaScript 语法，以便能够运行在当前和旧版本的浏览器或其他环境中。[中文官网](https://www.babeljs.cn/)

## babel概念

Babel 是一个编译器（输入源码 => 输出编译后的代码）。编译过程分为三个阶段：解析、转换和打印输出。

**Babel 本身不具有任何转化功能**，它把转化的功能都分解到一个个plugin 里面。因此当我们不配置任何插件时，经过 babel 的代码和输入是相同的。

### 插件(Plugins)

插件总共分为两种：语法插件(Syntax Plugins)和转译插件(Transform Plugins)。

- **转换插件**用于转换你的代码。
- **语法插件**只允许Babel解析(parse)特定类型的语法(而不是转换)。

> 转换插件会自动启用语法插件。因此，如果你已经使用了相应的转换插件，则不需要指定语法插件。
具体插件列表，详见官方文档。 [Plugins](https://babeljs.io/docs/en/plugins-list)

### 预设(Presets)

presets可以看作一组预先设定的插件列表集合，我们可以不必再当独地一个一个地去添加我们需要的插件。

### 配置文件

babel提供了config的方式，类似于webpack的cli方式以及config方式。[官方文档](https://babeljs.io/docs/en/config-files)

babel 7.X 之后，引入了`babel.config.json` (支持.js, .cjs, .mjs等文件格式);在7.X之前，项目都是基于`.babelrc`(支持.json,.js, .cjs, .mjs等文件格式)来进行配置。

一般`babel.config.json`会放置在根目录下，在执行编译时，babel会首先去寻找`babel.config.json`文件，以此来作为整个项目的根配置。

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

- 插件执行顺序在presets之前
- 插件会按照声明的插件列表顺序顺序执行(first to last)
- preset会按照声明的列表顺序逆序执行(last to first)

> 参考  
> <https://www.cnblogs.com/rynxiao/p/13665506.html>  
> <https://babeljs.io/docs/en/config-files>  

## babel安装与配置

### 安装所需包（package）

项目中引入bable(babel 7.0 以后的插件与预设以@babel为前缀)。  

![carbon (22).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/63bf6efb01fc44f49dac57d30fd3ff6b~tplv-k3u1fbpfcp-watermark.image)

`@babel/cli` 内置的 CLI 命令行工具，可通过命令行编译文件。[官方文档](https://www.babeljs.cn/docs/babel-cli)
`@babel/core` babel的核心，包含各个核心的API，供babel插件和打包工具使用。[官方文档](https://www.babeljs.cn/docs/babel-core)
`@babel/preset-env` 是一个常用的预设(Presets), 让你能使用最新的JavaScript语法, 它会帮你转换成代码的目标运行环境支持的语法, 提升你的开发效率并让打包后的代码体积更小。[相关参考](https://juejin.cn/post/6844903937900822536)

**webpack loader 模块安装**

![carbon (25).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe910df162ef45c2b79589ee135f5c20~tplv-k3u1fbpfcp-watermark.image)

**JSX语法模块安装**

JSX语法插件使用`babel-plugin-syntax-jsx`，没有使用高版本的`@babel/plugin-syntax-jsx`,项目运行中后者会出现  `Cannot find module babel-plugin-syntax-jsx` 异常。

![carbon (26).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/9fb3c988f184407f8f6cd3567aae8b12~tplv-k3u1fbpfcp-watermark.image)

### 功能验证

上述模块安装完毕后，在test目录下，创建一个名为`babel-es6-test.js`的文件

![carbon (23).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c192c702dc35436f94789f6cce7adec8~tplv-k3u1fbpfcp-watermark.image)

在命令行窗口输入以下指令，编译整个`test`文件夹并输出到`lib`(不存在则自动创建)文件夹中

![carbon (24).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6138c9049c43464ab5dde692f222268f~tplv-k3u1fbpfcp-watermark.image)

成功运行后，项目lib目录下也会创建一个`babel-es6-test.js`的文件，跟`test`目录下的文件是相同的，代码没有进行转换。
> Babel 本身不具有任何转化功能，不配置任何插件时，经过 babel 的代码和输入是相同的。

在根目录下创建`babel.config.json`文件，配置如下：

![carbon (27).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b13fe9fa38aa49b7a4c19b913fbdd284~tplv-k3u1fbpfcp-watermark.image)

再次运行指令，`lib`下输出文件代码已经转换

![carbon (28).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eafaa19a5a724310ba8d5859d3bc357f~tplv-k3u1fbpfcp-watermark.image)

### 项目配置

更新`babel.config.json`配置

![carbon (33).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/05c7ddbad5e44e408bc175618f49ce3e~tplv-k3u1fbpfcp-watermark.image)

`webpack.config.js`添加一条关于`babel-loader`的规则：

![carbon (35).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fad3f515a4254f4a970a94ee3c8d81c8~tplv-k3u1fbpfcp-watermark.image)

目录`examples`新增文件`JSX.vue`用来测试JSX语法

![carbon (34).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ce92882066f7419ebf4f2524a593b534~tplv-k3u1fbpfcp-watermark.image)

更新`examples\App.vue`文件，引入`JSX.vue`组件

![carbon (36).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c1865b4f27a945069914d3d2f6c8506c~tplv-k3u1fbpfcp-watermark.image)

运行npm run dev，打开浏览器，成功解析结果如下

![微信截图_20210415105826.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0b2761b87c8548b7a0ed153e7e4a8afc~tplv-k3u1fbpfcp-watermark.image)

**最新目录结构**

![carbon (39).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/1bf5b11a54a342e6b3d5bcef02d15fde~tplv-k3u1fbpfcp-watermark.image)
