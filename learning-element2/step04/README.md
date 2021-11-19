# 封装组件封装、编写说明文档

> 原文地址： <https://juejin.cn/post/6953614014546968589>

书接上文。项目第一个组件已经封装好，说明文档也已编写好。下面需要将说明文档发布到外网上，以此来展示和推广项目，使用 `Github Pages`功能实现。同时将组件发布之 `npm` 上，方便直接在项目中安装使用。  

![github-npm-twitter.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3b7a4bf98167468490e223c8678ad5db~tplv-k3u1fbpfcp-watermark.image)

## Github Pages发布

进入项目的 `Github repo`,点击右上角的 `Settings` 选项。

![微信截图_20210426160639.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6998133d5263474d8455ebe59b9430cc~tplv-k3u1fbpfcp-watermark.image)

点击左侧菜单的 `Pages` 选项，右侧显示项目 `Github Pages` 初始配置。`source` 配置项值为 `None` 说明此功能尚未开启。

![微信截图_20210426161236.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/dc9c2581024348a4b5d501118baa3d11~tplv-k3u1fbpfcp-watermark.image)

点击 `source` 配置项下拉菜单,只有 `master` (主分支/默认分支)、`None`(关闭功能) 两个选项。

![微信截图_20210426161933.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31566c59087b4b42a2a8202925218432~tplv-k3u1fbpfcp-watermark.image)

### root 路径

选择 `master` 分支后，可以指定发布文件源的路径，默认项目根路径`/(root)`,还可以指定根路径下的`docs`文件夹；然后点击 `Save` 按钮保存,就会提示项目的发布地址 <https://andurils.github.io/code-examples/> 。

![微信截图_20210426165638.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b0cd3506f8c8431cac53d71b283989aa~tplv-k3u1fbpfcp-watermark.image)

打开网址若未成功解析，需要等待1-2分钟，再次刷新页面即可（**当前根目录下只有readme.md文件,页面呈现内容为此文件**）。  

![Animation12.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/844b551952b9419f93bf542142aa1b0b~tplv-k3u1fbpfcp-watermark.image)

### docs 路径

作为一个开发分支根路径下放置发布文件，管理起来就比较混乱了，若不想维护新的分支用作静态网站发布，可以使用当前分支的 `docs` 路径,在配置里更改如下。
![微信截图_20210427090129.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/476ef7f83ae248d09c93a70e014621cb~tplv-k3u1fbpfcp-watermark.image)

创建 `build\webpack.docs.js` 文件，复制 `build\webpack.config.js`文件内容，修改 `output/path`属性值由 `dist` 至 `docs`。

```js
module.exports = {
  ...
  output: {
    path: path.resolve(process.cwd(), 'docs'),
    ...
  },
  ...
}
```

 在`package.json` 文件中的  `npm scripts`添加新的编译命令，将组件说明文档打包至 `docs` 路径下。

```json
...
"scripts": { 
    ...
    "build:docs": "cross-env NODE_ENV=development webpack --config  build/webpack.docs.js", 
    ...
},
...
```

至此将 `docs` 下的文件上传至 Github 即可。由于本项目路径为`/learning-element2/step03`,所以需要手动将 `docs` 内容复制至 Github 根目录下。`Github Repo` 最新目录结构如下：

```bash
├─docs
├─learning-element2
├─LICENSE 
├─README.md 
```

浏览器输入地址,打开页面效果如下：

![Animation12.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eff453bd5dfb4332914049dfc786f4b2~tplv-k3u1fbpfcp-watermark.image)

## gh-pages 分支

`gh-pages` 分支大家应该不陌生，按照早期的`约定`静态网站发布需要创建该分支,才能使用 `Github Pages`功能。接下将介绍如何快速的使用 `gh-pages` 进行项目发布。

先安装 `gh-pages` 插件， 在 `npm scripts`添加部署命令。

```json
// 安装插件
npm install -D  gh-pages 

// package.json 添加部署命令
"scripts": {  
    "deploy": "gh-pages -d dist" 
}
```

然后编译打包项目 `npm run build:dist`， 最后运行部署命令` npm run deploy ` 进行项目文档发布，发布成功控制台显示 `Published`。
"deploy": "gh-pages -d dist"

![微信截图_20210426133107.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/3741212ff38d4f79af9ec6848543fbea~tplv-k3u1fbpfcp-watermark.image)

打开 `Github Pages`配置，此时选项里出现了 `gh-pages` ，选择该分支即可。

![微信截图_20210427090211.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e524f487c8dc4517954d3659917bc8d7~tplv-k3u1fbpfcp-watermark.image)

> `gh-pages -d dist`等同于创建了一个`gh-pages`分支并将 `dist` 文件内容提交至该分支。  
> 同理可以在`Git Repo` 创建任何分支现在,直接通过`配置`可以指定具体的分支/路径（可以使用 `master`、`gh-pages`之外的任何分支）。

## 发布组件包

### webpack配置

安装编译进度条插件

```shell
npm i -D progress-bar-webpack-plugin
```

创建 `build\webpack.common.js`，采用 `commonjs2` 规范构建一个全量的包。

```js
const path = require('path');
const ProgressBarPlugin = require('progress-bar-webpack-plugin');
const VueLoaderPlugin = require('vue-loader/lib/plugin');

const config = require('./config');

module.exports = {
  mode: 'production',
  entry: {
    app: ['./src/index.js'], // Entry descriptor  传入一个对象 ./src/index.js
  },
  output: {
    path: path.resolve(process.cwd(), './lib'), // 绝对路径
    publicPath: '/dist/', // 相对于服务(server-relative)
    filename: 'me-vue-ui.common.js',
    chunkFilename: '[id].js',
    library: { 
      type: 'commonjs2', //配置将库暴露的方式
      export: 'default', // 指定哪一个导出应该被暴露为一个库
    },
  },
  resolve: {
    extensions: ['.js', '.vue', '.json'],
    alias: config.alias,
    modules: ['node_modules'],
  },
  // externals: config.externals, //外部扩展
  performance: {
    // 控制 webpack 如何通知「资源(asset)和入口起点超过指定文件限制」
    hints: false, // 不展示警告或错误提示
  },
  // 可以在统计输出里指定你想看到的信息
  stats: {
    children: false, // 是否添加关于子模块的信息
  },
  optimization: {
    //告知 webpack 使用 TerserPlugin 或其它在 optimization.minimizer 定义的插件压缩 bundle
    minimize: false,
  },
  module: {
    rules: [
      {
        test: /\.(jsx?|babel|es6)$/,
        include: process.cwd(),
        exclude: config.jsexclude,
        loader: 'babel-loader',
      },
      {
        test: /\.vue$/,
        loader: 'vue-loader',
        options: {
          compilerOptions: {
            preserveWhitespace: false,
          },
        },
      },
      {
        test: /\.css$/,
        use: ['style-loader', 'css-loader'],
      },
      {
        test: /\.(svg|otf|ttf|woff2?|eot|gif|png|jpe?g)(\?\S*)?$/,
        loader: 'url-loader',
        options: {
          limit: 10000, 
          name: path.posix.join('static', '[name].[hash:7].[ext]'),
        },
      },
    ],
  },
  plugins: [new ProgressBarPlugin(), new VueLoaderPlugin()],
};

```

在 `npm scripts`添加组件打包命令，生成至 `lib` 目录下。

```json
...
"scripts": { 
    ...
    "dist": "webpack --config build/webpack.common.js ",
    ...
},
...
```

输入命令 `npm run dist`  生成组件打包文件 `lib\me-vue-ui.common.js`。

![page11.gif](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/31123ec4083646d6a3181e110775a905~tplv-k3u1fbpfcp-watermark.image)

将 `examples\main.js` 文件中的组件引用 由 `'../src/index'` 替换成  `'../lib/me-vue-ui.common'`。

```js
// examples\main.js

// import MeUI from  '../src/index';
import MeUI from '../lib/me-vue-ui.common';
```

输入命令 `npm run dev` 运行项目，项目正常启动无错误，则组件打包成功。

## npm 配置

配置 `package.json` 文件中属性值用于npm 发布。

- name: 包名，该名字是唯一的。需要去[npm registry](http://registry.npmjs.org/)查看名字是否已被使用。
- version: 包版本号，版本号规则参考《语义化版本 2.0.0》。每次发布至 npm 需要修改版本号，不能和历史版本号相同。
- description: 包的描述，描述这个包的主要功能以及用途。
- main: 入口文件，该字段需指向项目编译后的包文件。
- keyword：关键字，数组、字符串。
- author：包的作者。
- private：是否私有，需要修改为 false 才能发布到 npm
- license： 开源协议。
- repository：包的Git Repo信息，包括type和URL。
- homepage：项目官网的url。

更新 `package.json` 文件内容。

```js
{
  "name": "me-vue-ui",
  "version": "0.1.2",
  "description": "A Vue.js 2.X UI Toolkit for Web",
  "main": "lib/me-vue-ui.common.js",
  "keyword": [
    "me-vue",
    "vuejs",
    "components",
    "ui-kit"
  ], 
  "repository": {
    "type": "git",
    "url": "git+https://github.com/andurils/code-examples.git"
  },
  "author": "anduril",
  "license": "MIT",
  "homepage": "https://andurils.github.io/code-examples"
}

```

添加`.npmignore` 文件，设置忽略发布文件。发布到 npm 中文件，只保留有的 lib 目录、package.json、README.md。  

```shell
# 忽略目录
build/
dist/
examples/
packages/
public/
src/
test/
docs/

# 忽略指定文件 
.eslintignore
.prettierignore        
.eslintrc.js
.prettierrc.js 
babel.config.json   
```

更新`README.md`内容，会作为npm包的 `Readme` Tab选项内容发布。

![微信截图_20210427210907.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/0a13bb62a47e4f0ab6a687d5b3efa90c~tplv-k3u1fbpfcp-watermark.image)

## npm 发布

首先 npmjs.com 上注册一个账号，确保 npm 使用的是原镜像。

```shell
npm config set registry http://registry.npmjs.org 
```

然后在命令行窗口跳转至项目路径下， 运行`npm login` 登录授权。  

![微信截图_20210427205726.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c174d5b55a7747dbb99993a4e48bbdb9~tplv-k3u1fbpfcp-watermark.image)

执行 `npm publish`命令发布组件包。

![微信截图_20210427171347.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6a978dfce83f4f2c8c00ee8031a96b1c~tplv-k3u1fbpfcp-watermark.image)

发布成功后，进入组件包信息页面  <https://www.npmjs.com/package/me-vue-ui>, 可以看到上面的项目配置信息 。

![微信截图_20210427211808.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/728e8bcfa4f94109ab3fd4f033054469~tplv-k3u1fbpfcp-watermark.image)
