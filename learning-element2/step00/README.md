# 项目初始化和webpack配置

> 原文地址： <https://juejin.cn/post/6950905030635421710>

## 创建项目

新建一个空的文件夹，使用`npm init` 来初始化项目，并安装vue模块。

![carbon (17).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/20d8aaae727a4420ad274ce77a504110~tplv-k3u1fbpfcp-watermark.image)

## 修改目录结构

根目录中添加文件夹

![carbon (18).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/073947dca5f3499e90d03d9fc912a3e0~tplv-k3u1fbpfcp-watermark.image)

根目录下创建项目配置文件: `.gitignore`  `README.md`  
public目录下，创建模板页文件: `favicon.ico`  `index.html`
examples目录下，创建示例入口文件: `App.vue` `main.js`  `logo.png`

---
项目使用webpack实现模块化管理和打包。

## 局部安装webpack

![carbon (16).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/076b89f1e12e4be1af60b388b79bf0ab~tplv-k3u1fbpfcp-watermark.image)

`webpack-cli`最新为`4.X`版本，`webpack-dev-server`无法正常运行，安装时需要指定版本（确保两模块版本皆为`3.X`）。

![carbon (14).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7910affb1b2d4cf580f50893c8a317a8~tplv-k3u1fbpfcp-watermark.image)

`webpack-cli` 提供了许多命令来使 webpack 的工作变得简单。[官方文档](https://webpack.docschina.org/api/cli/)  
`webpack-dev-server`为你提供了一个简单的 web server，并且具有 live reloading(实时重新加载) 功能。[官方文档](https://webpack.docschina.org/guides/development/#using-webpack-dev-server)

## 安装 webpack loaders

webpack 使用 loader 对文件进行预处理。可以构建包括 JavaScript 在内的任何静态资源。  
[官方插件列表](https://webpack.docschina.org/loaders/)
[webpack 插件中文文档](http://www.febeacon.com/webpack-plugins-docs-cn/)  

![carbon (15).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c2389dc05454e3c9f25afe8d58dc749~tplv-k3u1fbpfcp-watermark.image)

> **参考**  
> vue-loader详解： <https://segmentfault.com/a/1190000020629508>  
> html-webpack-plugin详解：<https://www.cnblogs.com/wonyun/p/6030090.html>

## webpack配置

在`build`目录下创建webpack配置文件`webpack.config.js`,提供`入口(entry)`、`模式（Mode）`、`输出(output)`、`模块（Module）`、`插件(Plugins)`、`开发服务器(DevServer)`等配置选项。[官方文档](https://webpack.docschina.org/configuration/mode/)

![carbon (11).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c9f78183c08245fdb5bfe4564fe77200~tplv-k3u1fbpfcp-watermark.image)

# 0x02.项目运行

## npm scripts 配置

在npm脚本中新增webpack命令，执行的命令会自动去`node_modules`寻找，不用加上目录。

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

## cross-env配置

cross-env是一款运行跨平台设置和使用环境变量的脚本，不同平台使用唯一指令，无需担心跨平台问题。

![carbon (13).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7e4d78aca6ef4ad8b4e28e8dd6aac0a9~tplv-k3u1fbpfcp-watermark.image)

修改`package.json`配置

```js
.
...
"scripts": { 
    "build:dist": "cross-env NODE_ENV=development webpack --config  build/webpack.config.js",
    "dev": "cross-env NODE_ENV=development webpack-dev-server --config build/webpack.config.js"
},
...
.
```

## 运行测试

命令行窗口中，在该项目根目录下输入`npm run dev` 即可进行本地开发调试。

![微信截图_20210414165142.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31a6919dfe1a49298406ceb5870aba4b~tplv-k3u1fbpfcp-watermark.image)

成功运行后，项目第一个页面结果如下：

![微信截图_20210414165237.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6cb30e00352f4900b9061fe5991958e0~tplv-k3u1fbpfcp-watermark.image)

## 最终目录结构

![carbon (19).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5f05fd21ece94fbd9ddd47fb7c05144c~tplv-k3u1fbpfcp-watermark.image)
