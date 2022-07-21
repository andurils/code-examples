# 封装组件封装、编写说明文档

![blog.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/ae49a99127be4f5589027c394c9d371e~tplv-k3u1fbpfcp-zoom-crop-mark:3024:3024:3024:1702.awebp)
> 原文地址： <https://juejin.cn/post/6953614014546968589>

书接上文。项目经过一系列的配置,开发脚手架已经搭建完毕。接下来开始封装自定义组件、并基于 `markdown` 文件生成文档和演示案例。

后续文章代码会根据篇幅，不影响理解的情况下进行部分删减，详细代码可在 `Github Repo` 查看。

## 封装第一个组件

### 封装组件

接下来封装一个loading组件。  

创建 `packages/loading/src/main.vue` 文件(篇幅问题，样式代码详见Github)。  

```html
<template>
  <div class="me-loading">
    <div class="loader">
      <div class="loader-inner">
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
        <div class="loader-line-wrap">
          <div class="loader-line"></div>
        </div>
      </div>
    </div>
    <div class="loading-text">{{ loadingText }}</div>
  </div>
</template>

<script>
export default {
  name: 'MeLoading',
  props: {
    loadingText: {
      type: String,
      default: '',
    },
  },
};
</script>  
```

创建 `packages/loading/index.js` 文件。使用 `install` 方法来全局注册该组件，安装组件通过全局方法 `Vue.use()` 即可。[官网-Vue插件](https://cn.vuejs.org/v2/guide/plugins.html)

```js
/* eslint-disable no-unused-vars */
import Loading from './src/main';

// 插件应该暴露一个 install 方法
// 第一个参数是 Vue 构造器，第二个参数是一个可选的选项对象
Loading.install = function (Vue, options) {
  Vue.component(Loading.name, Loading); //使用component注册组件
};

// 默认导出组件
export default Loading; 
```

创建 `src/index.js` 文件,该文件的作用:

1. 导入组件库所有组件
2. 定义组件库组件注册安装的install 方法
3. 整体导出版本、install、各个组件等。  

```js
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

```

### 引用组件

在 `examples/main.js` 文件中引用组件库

```js
import MeUI from '../src/index'; 

Vue.use(MeUI); 
```

在 `examples/App.vue` 中添加组件引用

```html
<template>
  <div id="app">
    <img alt="Vue logo" src="../assets/logo.png" />
    <JSX></JSX>
    <hl>welcome to My Vue.js UI By WebPack!</h1>
    <me-loading loading-text="页面加载中...."></me-loading> 
  </div>
</template>

<script>
import JSX from './JSX.vue';
export default {
  name: 'App',
  components: { JSX },
};
</script>
```

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

```js
const { stripScript, stripTemplate, genInlineComponentText } = require('./util');
const md = require('./config');

module.exports = function (source) {
  const content = md.render(source);
  // 注释Tag 开始结束的名称和长度
  const startTag = '<!--meui-demo:';
  const startTagLen = startTag.length;
  const endTag = ':meui-demo-->';
  const endTagLen = endTag.length;

  let componenetsString = '';
  let id = 0; // demo 的 id
  let output = []; // 输出的内容
  let start = 0; // 字符串开始位置

  let commentStart = content.indexOf(startTag); // 获取注释开始Tag内容起始位置
  let commentEnd = content.indexOf(endTag, commentStart + startTagLen); //从注释开始Tag之后的位置 获取注释结束Tag位置
  while (commentStart !== -1 && commentEnd !== -1) {
    output.push(content.slice(start, commentStart)); // 剔除注释开始Tag
    const commentContent = content.slice(commentStart + startTagLen, commentEnd); // 获取注释内容

    const html = stripTemplate(commentContent); // 获取template的html信息
    const script = stripScript(commentContent); // 获取script信息
    let demoComponentContent = genInlineComponentText(html, script); // 转成一个内联组件
    const demoComponentName = `meui-demo${id}`; // 内联组件名称

    output.push(`<template slot="source"><${demoComponentName} /></template>`); // 使用slot插槽 运行组件
    componenetsString += `${JSON.stringify(demoComponentName)}: ${demoComponentContent},`; // 页面组件注册   组件名称:组件内容

    // 重新计算下一次的位置
    id++;
    start = commentEnd + endTagLen;
    commentStart = content.indexOf(startTag, start);
    commentEnd = content.indexOf(endTag, commentStart + startTagLen);
  }

  // 仅允许在 demo 不存在时，才可以在 Markdown 中写 script 标签
  let pageScript = '';
  if (componenetsString) {
    pageScript = `<script>
      export default {
        name: 'component-doc',
        components: {
          ${componenetsString}
        }
      }
    </script>`;
  } else if (content.indexOf('<script>') === 0) {
    // 硬编码，有待改善
    start = content.indexOf('</script>') + '</script>'.length;
    pageScript = content.slice(0, start);
  }

  output.push(content.slice(start));
  return `
    <template>
      <section class="content me-doc">
        ${output.join('')}
      </section>
    </template>
    ${pageScript}
  `;
};

```

`config.js`文件使用 `markdown-it-chain` 配置`markdown-it`选项、插件和容器信息，初始化`markdown-it`实例。

```js
const Config = require('markdown-it-chain');
const anchorPlugin = require('markdown-it-anchor');
const slugify = require('transliteration').slugify;
const containers = require('./containers');
const overWriteFenceRule = require('./fence');

// 实例化配置对象
const config = new Config();

// 使用链式API调用配置
config.options // markdown-it 选项配置
  .html(true) // 在源码中启用 HTML 标签
  .end()

  // 插件配置
  .plugin('anchor')
  // 标题锚点生成插件
  // 第一个参数：使用的插件模块  第二个参数：插件使用配置参数
  .use(anchorPlugin, [
    {
      level: 2, // 最少包含的渲染层级
      slugify: slugify, // 生成有效url的自定义函数
      permalink: true, // 是否在标题旁加入永久链接
      permalinkBefore: true, // 将永久链接放在标题的前面
    },
  ])
  .end()

  .plugin('containers')
  // 创建块级自定义容器的解析插件
  .use(containers)
  .end();

// 使用上述配置创建一个 markdown-it 的实例
const md = config.toMd();
// 针对代码块（fence）覆盖默认渲染规则。当代码块在 demo 容器内要做一下特殊处理。
overWriteFenceRule(md);

module.exports = md; 
```

`containers.js`文件使用 `markdown-it-container` 来转换自定义容器,将自定义容器 `:::demo`转换成 `demo-block` 组件。

```js
const mdContainer = require('markdown-it-container');

module.exports = (md) => {
  // 约定的文档格式。
  // ::: demo 中写演示的例子，::: demo 中```(fence)中编写代码。
  // ::: 属于Markdown 中的拓展语法，通过它来自定义容器。
  md.use(mdContainer, 'demo', {
    // 验证代码块为 :::demo ::: 才进行渲染
    validate(params) {
      return params.trim().match(/^demo\s*(.*)$/);
    },
    // 自定义容器 demo 就被转成了 demo-block 组件
    render(tokens, idx) {
      const m = tokens[idx].info.trim().match(/^demo\s*(.*)$/);
      if (tokens[idx].nesting === 1) {
        // 获取第一行的内容使用markdown渲染html作为组件的描述
        const description = m && m.length > 1 ? m[1] : '';
        const content = tokens[idx + 1].type === 'fence' ? tokens[idx + 1].content : '';

        // 使用自定义开发组件 demo-block 来包裹内容并且渲染代码示例
        return `<demo-block>
        ${description ? `<div>${md.render(description)}</div>` : ''}
        <!--meui-demo: ${content}:meui-demo-->
        `;
      }
      return '</demo-block>';
    },
  });
  // 解析 :::tip :::
  md.use(mdContainer, 'tip');
  // 解析 :::warning :::
  md.use(mdContainer, 'warning');
};

```

`fence.js`文件中重写了代码块（fence）默认渲染规则。

```js
// 覆盖默认的 fence 渲染策略
module.exports = (md) => {
  const defaultRender = md.renderer.rules.fence; // 对于 token 的渲染规则，可以被更新和扩展
  // 覆盖默认渲染规则
  md.renderer.rules.fence = (tokens, idx, options, env, self) => {
    const token = tokens[idx];
    // 判断该 fence 是否在 :::demo 内
    const prevToken = tokens[idx - 1];
    const isInDemoContainer = prevToken && prevToken.nesting === 1 && prevToken.info.trim().match(/^demo\s*(.*)$/);
    if (token.info === 'html' && isInDemoContainer) {
      // v-pre 是 Vue 自带的指令，用来显示原始 Mustache 标签。考虑到代码片段会包含 Mustache 标签，使用该指令来跳过对 code 的编译
      return `<template slot="highlight"><pre v-pre><code class="html">${md.utils.escapeHtml(token.content)}</code></pre></template>`;
    }
    return defaultRender(tokens, idx, options, env, self);
  };
};

```

`util.js`文件提供 `stripScript` `stripStyle` `stripTemplate` `genInlineComponentText`等方法用于页面内容提取和生成组件。

```js
const { compileTemplate } = require('@vue/component-compiler-utils');
const compiler = require('vue-template-compiler');

// 获取 <script> 标签中的文本内容
function stripScript(content) {
  const result = content.match(/<(script)>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

// 获取 <style> 标签中的文本内容
function stripStyle(content) {
  const result = content.match(/<(style)\s*>([\s\S]+)<\/\1>/);
  return result && result[2] ? result[2].trim() : '';
}

// 编写例子时不一定有 template。所以采取的方案是剔除其他的内容
function stripTemplate(content) {
  content = content.trim();
  if (!content) {
    return content;
  }
  return content.replace(/<(script|style)[\s\S]+<\/\1>/g, '').trim();
}

// 参考 templateLoader.js  源码
// 将自定义容器中的 代码块（fence） 转成一个个内联component注入到整个页面中
function genInlineComponentText(template, script) {
  // https://github.com/vuejs/vue-loader/blob/423b8341ab368c2117931e909e2da9af74503635/lib/loaders/templateLoader.js#L46
  const finalOptions = {
    source: `<div>${template}</div>`,
    filename: 'inline-component',
    compiler,
  };
  const compiled = compileTemplate(finalOptions);
  // tips
  if (compiled.tips && compiled.tips.length) {
    compiled.tips.forEach((tip) => {
      console.warn(tip);
    });
  }
  // errors
  if (compiled.errors && compiled.errors.length) {
    console.error(`\n  Error compiling template:\n${pad(compiled.source)}\n` + compiled.errors.map((e) => `  - ${e}`).join('\n') + '\n');
  }
  // 组件内容
  let demoComponentContent = `
    ${compiled.code}
  `;
  // script内容
  script = script.trim();
  if (script) {
    script = script.replace(/export\s+default/, 'const democomponentExport =');
  } else {
    script = 'const democomponentExport = {}';
  }
  demoComponentContent = `(function() {
    ${demoComponentContent}
    ${script}
    return {
      render,
      staticRenderFns,
      ...democomponentExport
    }
  })()`;
  return demoComponentContent;
}

// 每行增加空格
function pad(source) {
  return source
    .split(/\r?\n/)
    .map((line) => `  ${line}`)
    .join('\n');
}

module.exports = {
  stripScript,
  stripStyle,
  stripTemplate,
  genInlineComponentText,
}; 
```

### webpack 配置

创建`build/config.js`文件设置 `webpack` 公共配置信息。

```js
var path = require('path');

//js忽略路径
exports.jsexclude = /node_modules|utils\/popper\.js|utils\/date\.js/;

exports.alias = {
  main: path.resolve(__dirname, '../src'),
  packages: path.resolve(__dirname, '../packages'),
  examples: path.resolve(__dirname, '../examples'),
  'me-ui': path.resolve(__dirname, '../'),
};

```

更新 `build\webpack.config.js`文件，添加自定义 `md-loder` ，实现 `markdown` 文件的解析。

```js
const config = require('./config');

module.exports = { 
  // ...
  resolve: {
    // 引入模块时不带扩展
    extensions: ['.js', '.vue', '.json'],
    // 创建 import 或 require 的别名，来确保模块引入变得更简单
    alias: config.alias,
    // 解析模块时应该搜索的目录
    modules: ['node_modules'],
  }, 
  module: {
    rules: [ 
      {
        test: /\.md$/,
        use: [
          {
            loader: 'vue-loader',
            options: {
              compilerOptions: {
                preserveWhitespace: false,
              },
            },
          },
          {
            loader: path.resolve(__dirname, './md-loader/index.js'),
          },
        ],
      }, 
      // ...
    ],
  }, 
};

```

### 编写文档

编写组件说明文档`examples\docs\loading.md`

![carbon (56).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/61f44055de9d457fad4a09712d2d0bb0~tplv-k3u1fbpfcp-watermark.image)

安装 `vue-router` 插件。

```js
npm i -D vue-router  
```

新增 `examples/router.js` 文件配置路由信息。

```js
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

```

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

### demo-block 组件

上面的说明文档功能十分简陋，接下来编写 `demo-block` 组件,支持示例组件渲染、高亮代码等功能。

安装语法高亮插件 `highlight.js` 。

```js
npm i -D highlight.js    // 代码高亮
```

创建 `examples\components\demo-block.vue` 组件

```html
<template>
  <div class="demo-block" :class="[blockClass, { hover: hovering }]" @mouseenter="hovering = true" @mouseleave="hovering = false">
    <div class="source">
      <slot name="source"></slot>
    </div>
    <div class="meta" ref="meta">
      <div class="description" v-if="$slots.default">
        <slot></slot>
      </div>
      <div class="highlight">
        <slot name="highlight"></slot>
      </div>
    </div>
    <div class="demo-block-control" ref="control" @click="isExpanded = !isExpanded">
      <span>{{ controlText }}</span>
    </div>
  </div>
</template> 

<script>
export default {
  data() {
    return {
      hovering: false,
      isExpanded: false,
    };
  },
  computed: {
    blockClass() {
      return ` demo-${this.$router.currentRoute.path.split('/').pop()}`;
    },
    controlText() {
      return this.isExpanded ? '隐藏代码' : '显示代码';
    },
    codeArea() {
      return this.$el.getElementsByClassName('meta')[0];
    },
    codeAreaHeight() {
      if (this.$el.getElementsByClassName('description').length > 0) {
        return this.$el.getElementsByClassName('description')[0].clientHeight + this.$el.getElementsByClassName('highlight')[0].clientHeight + 20;
      }
      return this.$el.getElementsByClassName('highlight')[0].clientHeight;
    },
  },
  watch: {
    isExpanded(val) {
      this.codeArea.style.height = val ? `${this.codeAreaHeight + 1}px` : '0';
      if (!val) {
        this.$refs.control.style.left = '0';
        return;
      }
    },
  }, 
};
</script>

```

`examples\main.js` 引入 `highlight` 插件、 `demo-block` 组件，配置语法高亮主题样式。增加 `afterEach` 全局后置钩子,高亮页面代码块。

```js
import hljs from 'highlight.js';
import demoBlock from './components/demo-block'; 
import 'highlight.js/styles/stackoverflow-light.css';
 
Vue.component('demo-block', demoBlock);

router.afterEach(() => {
  // https://github.com/highlightjs/highlight.js/issues/909#issuecomment-131686186
  Vue.nextTick(() => {
    const blocks = document.querySelectorAll('pre code:not(.hljs)');
    Array.prototype.forEach.call(blocks, hljs.highlightBlock);
  });
  document.title = 'me-ui';
});

new Vue({
  router,
  render: (h) => h(App),
}).$mount('#app');

```

组件说明文档 `examples\docs\loading.md` 更新成约定的文档格式。

![carbon (21).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb520f7175394d5bbc06322cde88cab5~tplv-k3u1fbpfcp-watermark.image)

运行程序，页面示例代码块渲染组件，可以展开收起源代码，语法高亮显示，效果如下：

![page1.gif](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/83ac9490b0a24fe18f839930ef71a030~tplv-k3u1fbpfcp-watermark.image)

## References

[Element 文档中的 Markdown 解析](https://zhuanlan.zhihu.com/p/65174076)\
[element的demo-block](https://github1s.com/ElemeFE/element/blob/master/examples/components/demo-block.vue)  
[highlight 97种主题样式列表](https://highlightjs.org/static/demo/)
