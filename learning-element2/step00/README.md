# 项目初始化和 webpack 配置

![blog.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc2956ba6b4c4c6099f63ba81d42b68a~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp)

> 原文地址： <https://juejin.cn/post/6950905030635421710>

## 项目初始化

### 创建项目

新建一个空的文件夹，使用`npm init` 来初始化项目，并安装 vue 模块。

```sh
npm init -y   // -y直接生成的黑默认的package.json
npm i vue --save-dev
```

### 修改目录结构

根目录中添加以下文件夹：

- build： 存放打包工具的配置文件。
- examples：存放组件示例。
- packages：存放组件源码，也是之后源码分析的主要目标。
- src：存放入口文件以及各种辅助文件。
- test：存放单元测试文件
- public： 模板信息

根目录下创建项目配置文件: `.gitignore` `README.md`  
public 目录下，创建模板页文件: `favicon.ico` `index.html`
examples 目录下，创建示例入口文件: `App.vue` `main.js` `logo.png`

## wepack 安装与配置

项目使用 webpack 实现模块化管理和打包。

### 局部安装 webpack

```sh
npm install webpack --save-dev
./node_modules/.bin/webpack -h  // 检查安装是否成功
```

`webpack-cli`最新为`4.X`版本，`webpack-dev-server`无法正常运行，安装时需要指定版本（确保两模块版本皆为`3.X`）。

```sh
npm i webpack-cli@3.3.12 --save-dev
npm i webpack-dev-server@3.11.2--save-dev
```

`webpack-cli` 提供了许多命令来使 webpack 的工作变得简单。[官方文档](https://webpack.docschina.org/api/cli/)  
`webpack-dev-server`为你提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能。[官方文档](https://webpack.docschina.org/guides/development/#using-webpack-dev-server)

### 安装 webpack loaders

webpack 使用 loader 对文件进行预处理。可以构建包括 JavaScript 在内的任何静态资源。  
[官方插件列表](https://webpack.docschina.org/loaders/)
[webpack 插件中文文档](http://www.febeacon.com/webpack-plugins-docs-cn/)

```sh
npm install vue-loader vue-template-compiler --save-dev // vue组件处理
npm install url-loader file-loader html-loader --save-devl //文件处理
npm install style-loader css-loader --save-devl //样式处理
npm install html-webpack-plugin --save-dev //生成一个html文件
```

> **参考**  
> vue-loader 详解： <https://segmentfault.com/a/1190000020629508>  
> html-webpack-plugin 详解：<https://www.cnblogs.com/wonyun/p/6030090.html>

### webpack 配置

在`build`目录下创建 webpack 配置文件`webpack.config.js`,提供`入口(entry)`、`模式（Mode）`、`输出(output)`、`模块（Module）`、`插件(Plugins)`、`开发服务器(DevServer)`等配置选项。[官方文档](https://webpack.docschina.org/configuration/mode/)

```js
const path = require("path");
const VueLoaderPlugin = require("vue-loader/lib/plugin");
const HtmlWebpackPlugin = require("html-webpack-plugin");

module.exports = {
  mode: process.env.NODE_ENV,
  entry: "./examples/main.js",
  output: {
    path: path.resolve(process.cwd(), "dist"),
    filename: "bundle.js",
  },
  devServer: {
    contentBase: "./dist",
  },
  module: {
    rules: [
      {
        test: /\.vue$/,
        loader: "vue-loader",
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 8192,
              esModule: false, //“[object Module]”问题
            },
          },
        ],
      },
    ],
  },
  plugins: [
    new VueLoaderPlugin(),
    new HtmlWebpackPlugin({
      title: "Development",
      favicon: "./public/favicon.ico",
      template: "public/index.html",
      filename: "index.html",
      inject: true,
    }),
  ],
};
```

## 项目运行

### npm scripts 配置

在 npm 脚本中新增 webpack 命令，执行的命令会自动去`node_modules`寻找，不用加上目录。

修改`package.json`配置

```js
.
...
"scripts": {
    "build:dist": "webpack --config  build/webpack.config.js",
    "dev": "webpack-dev-server --config build/webpack.config.js"
},
...
.
```

### cross-env 配置

cross-env 是一款运行跨平台设置和使用环境变量的脚本，不同平台使用唯一指令，无需担心跨平台问题。

```sh
npm i cross-env --save-dev
```

修改`package.json`配置

```js
{
    "scripts": {
        "build:dist": "cross-env NODE_ENV=development webpack --config  build/webpack.config.js",
        "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js"
    },
}
```

### 运行测试

命令行窗口中，在该项目根目录下输入`npm run dev` 即可进行本地开发调试。

![微信截图_20210414165142.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31a6919dfe1a49298406ceb5870aba4b~tplv-k3u1fbpfcp-watermark.image)

成功运行后，项目第一个页面结果如下：

![微信截图_20210414165237.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cb30e00352f4900b9061fe5991958e0~tplv-k3u1fbpfcp-watermark.image)

## 最终目录结构

![carbon (19).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f05fd21ece94fbd9ddd47fb7c05144c~tplv-k3u1fbpfcp-watermark.image)
