# 代码风格检查和格式化配置（ESlint ＆ Prettier）

> 原文地址： <https://juejin.cn/post/6951808773354684447>


在代码格式化方面， Prettier 和 ESLint 有重叠，但两者侧重点不同：ESLint 所能提供的格式化功能很有限；而 Prettier 在格式化代码方面具有更大优势。而 Prettier 被设计为易于与 ESLint 集成，所以在项目中使用两者，无需担心冲突。。

## Prettier 概览

### 配置文件

Prettier 支持几种格式的配置文件,优先级顺序如下：

1. 在 `package.json` 里创建一个 `prettier` 属性，在那里定义你的配置.
2. 使用 `.prettierrc`，可以使 JSON 也可以是 YAML。
3. 使用 `.prettierrc.json`, `.prettierrc.yml`, `.prettierrc.yaml`,`.prettierrc.json5` 去定义配置的结构.
4. 使用 `.prettierrc.js`, `.prettierrc.cjs`, `prettier.config.js`,  `prettier.config.cjs` 去定义配置的结构--必须使用 `module.exports` 暴露对象.
5. 使用 `.prettierrc.toml` 去定义配置的结构.

### .prettierignore

在根目录下加一个`.prettierignore`文件实现文件级别的忽略(语法同`.gitignore`)。

## ESlint 配置文件

ESLint 支持几种格式的配置文件：

- JavaScript - 使用 `.eslintrc.js` 然后输出一个配置对象。
- YAML - 使用 `.eslintrc.yaml` 或 `.eslintrc.yml` 去定义配置的结构。
- JSON - 使用 `.eslintrc.json` 去定义配置的结构，ESLint 的 JSON 文件允许 JavaScript 风格的注释。
- ~~(弃用) - 使用 `.eslintrc`，可以使 JSON 也可以是 YAML~~。
- package.json - 在 `package.json` 里创建一个 `eslintConfig` 属性，在那里定义你的配置。

如果同一个目录下有多个配置文件，ESLint 只会使用一个。优先级顺序如下：

1. `.eslintrc.js`
2. `.eslintrc.yaml`
3. `.eslintrc.yml`
4. `.eslintrc.json`
5. ~~`.eslintrc`~~
6. `package.json`

配置文件常用属性 `root`  `env`  `parserOptions`  `parser`  `extends`  `plugins`  `rules` 等功能配置如下：

### root 属性

ESLint 会在所有父级目录里寻找配置文件，一直到根目录。一旦发现配置文件中有 `"root": true`，它就会停止在父级目录中寻找。  

### env 属性

使用 `env` 关键字指定想启用的环境，并设置它们为 true。环境并不是互斥的，所以可以同时定义多个。
[更多可用的环境列表](https://cn.eslint.org/docs/user-guide/configuring#specifying-environments)

### parserOptions 属性

解析器选项使用 `parserOptions` 属性设置。可用的选项有：

- `ecmaVersion` - 默认设置为 3，5（默认）， 你可以使用 6、7、8、9 或 10 来指定你想要使用的 ECMAScript 版本。你也可以用使用年份命名的版本号指定为 2015（同 6），2016（同 7），或 2017（同 8）或 2018（同 9）或 2019 (same as 10)
- `sourceType` - 设置为 "script" (默认) 或 "module"（如果你的代码是 ECMAScript 模块)。
- `ecmaFeatures` - 这是个对象，表示你想使用的额外的语言特性:
  - `globalReturn` - 允许在全局作用域下使用 return 语句
  - `impliedStrict` - 启用全局 strict mode (如果 ecmaVersion 是 5 或更高)
  - `jsx` - 启用 JSX
  - `experimentalObjectRestSpread` - 启用实验性的 object rest/spread properties 支持。(重要：这是一个实验性的功能,在未来可能会有明显改变。 建议你写的规则 不要 依赖该功能，除非当它发生改变时你愿意承担维护成本。)

### parser 属性

在配置文件中指定一个不同的解析器。在使用自定义解析器时，为了让 ESLint 在处理非 ECMAScript 5 特性时正常工作，配置属性 `parserOptions` 仍然是必须的。解析器会被传入 `parserOptions`，但是不一定会使用它们来决定功能特性的开关。

### extends 属性

通过声明扩展配置、启用规则。

`extends` 的属性值可以是：

- 指定配置的字符串(配置文件的路径、可共享配置的名称、`eslint:recommended` 或 `eslint:all`)
- 字符串数组：每个配置继承它前面的配置

`extends` 属性值可以使用短名称，省略包名的前缀 `eslint-config-`  。

![carbon (5).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f73e588558b741249f7757b7fe6147b3~tplv-k3u1fbpfcp-watermark.image)

值为 `"eslint:recommended"`的 `extends` 属性启用一系列核心规则，在 [规则页面](https://cn.eslint.org/docs/rules/)中被标记为✔️。  
值为 `"eslint:all"`的 `extends` 属性启用当前安装的 ESLint 中所有的核心规则，**不推荐在产品中使用**。

### plugins 属性

插件是一个 npm 包，通常输出规则。一些插件也可以输出一个或多个命名的 `配置(Configs)` 。  
`plugins` 属性值可以使用短名称，省略包名的前缀 `eslint-plugin-`  。

![carbon (6).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/6c1dc376c1ba41d6b61ba59f8c7b3fee~tplv-k3u1fbpfcp-watermark.image)

## ESlint 插件打包配置

插件在 `configs` 键下指定打包的配置，且支持多配置。

![carbon (4).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/7238ec9580634d19ae29ccbcccdc9f9d~tplv-k3u1fbpfcp-watermark.image)

示例插件名为 `eslint-plugin-myPlugin`，那么 `myConfig` 和 `myOtherConfig` 配置可以分别从 `"plugin:myPlugin/myConfig"` 和 `"plugin:myPlugin/myOtherConfig"` 扩展出来。

此时 `extends` 属性值由以下组成：

`plugin:` + `包名 (省略了前缀 myPlugin )` + `/` + `配置名称 (myConfig)`

![carbon (7).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/71cdbcec435a4c7285d323aa46396df0~tplv-k3u1fbpfcp-watermark.image)

⭐ **在默认情况下，配置不会启用插件中的任何规则。必须在 `plugins` 数组中指定插件名，`extends` 数组中指定想使用的插件中的规则。任何插件中的规则必须带有插件名或其简写前缀。**

> [官方文档 Configs in Plugins](https://cn.eslint.org/docs/developer-guide/working-with-plugins#configs-in-plugins)

## ESlint rules 属性

`rules` 属性启用额外的规则、改变规则的级别和选项。
要改变一个规则设置，必须将规则 ID 设置为下列值之一：

- "off" 或 0 - 关闭规则
- "warn" 或 1 - 开启规则，使用警告级别的错误：warn (不会导致程序退出)
- "error" 或 2 - 开启规则，使用错误级别的错误：error (当被触发的时候，程序会退出)

## .eslintignore

过在项目根目录创建一个 `.eslintignore` 文件告诉 ESLint 去忽略特定的文件和目录。.eslintignore 文件是一个纯文本文件，其中的每一行都是一个 glob 模式表明哪些路径应该忽略检测。

## prettier 配置

在项目中安装 `prettier` 。

![carbon (8).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/405652d5699148f2a6acb46fcaa4d14e~tplv-k3u1fbpfcp-watermark.image)

在根目录下创建 `.prettierrc.js` 配置文件 。

![carbon (11).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/11157ddab02a4b06916695e48c5f14a3~tplv-k3u1fbpfcp-watermark.image)

在根目录下创建 `.prettierignore` 文件 。

![carbon (12).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/f24b3383f6754badafd882c968181c2e~tplv-k3u1fbpfcp-watermark.image)

执行指令，格式化整个项目。

![carbon (13).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/fe776233b0314c95b0302bcee8469451~tplv-k3u1fbpfcp-watermark.image)

成功执行后，输出文件列表，被格式化的文件名称 **白色高亮** 。
![微信截图_20210416214937.png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/eb44ab0929904e89929d2481789c51d8~tplv-k3u1fbpfcp-watermark.image)

## eslint 配置

安装 `eslint`和相关插件 `eslint-config-prettier` `eslint-plugin-prettier` `eslint-plugin-vue`，让Prettier 和 ESLint更好的一起工作。
![carbon (45).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/c171ed2f12964c17a434f1d137d205f9~tplv-k3u1fbpfcp-watermark.image)

在根目录下创建 `.eslintrc.js` 配置文件 。  
![carbon (47).png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e1d116388d914a7d9dea87220d878901~tplv-k3u1fbpfcp-watermark.image)

> ℹ️ `eslint-config-prettier` 8.0.0 版本之后, 直接声明 `"prettier"` 就可以使用所有的插件。
> [8.0.0 更新日志](https://github.com/prettier/eslint-config-prettier/blob/main/CHANGELOG.md#version-800-2021-02-21)
>
> <https://github.com/prettier/eslint-config-prettier#special-rules>
> <https://github.com/prettier/eslint-plugin-prettier#recommended-configuration>

在根目录下创建 `.eslintignore` 文件 。

![carbon (16).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/4b44c7174e2e4883b6da4eed364522fe~tplv-k3u1fbpfcp-watermark.image)

项目运行后，若文件格式不符合规范，编辑器窗口有提示出现

![微信截图_20210417013312.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/5068dec0b88c42808f5d9878df743f83~tplv-k3u1fbpfcp-watermark.image)

光标移到问题行，会显示问题类型，可以点击`快速修复`选项来修复问题。

![微信截图_20210417013429.png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e061c81764434471893c72a2c3368d9d~tplv-k3u1fbpfcp-watermark.image)

## webpack loader

IDE插件会直接显示文件格式问题，为了能在编译窗口中直接显示问题，安装 `eslint-webpack-plugin` (`eslint-loader` 已废弃)插件。

![carbon (48).png](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/570ab39469b74eec8b9c1825b837c79d~tplv-k3u1fbpfcp-watermark.image)

更新 `build\webpack.config.js` 内容。

![carbon (41).png](https://p9-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/774f6c3244c648e2a812c83ca0e6c5ef~tplv-k3u1fbpfcp-watermark.image)

项目编译失败，输入问题列表，点击可以快速定位。(若编译时自动修复问题，在插件中设置`fix: true`即可)

![微信截图_20210419164847.png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b6e5842079fa4d8bb6905dce1fc32a68~tplv-k3u1fbpfcp-watermark.image)

## 最新目录结构

![carbon (18).png](https://p1-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/bf7c093f11fb4cbb92cf5df7d1ed887a~tplv-k3u1fbpfcp-watermark.image)
