# CommonJS

<http://github.com/kriskowal/commonjs/>

<https://www.commonjs.org/>
<https://wiki.commonjs.org/wiki/CommonJS>
<https://en.wikipedia.org/wiki/CommonJS>

<https://arstechnica.com/information-technology/2009/12/commonjs-effort-sets-javascript-on-path-for-world-domination/>

## CommonJS Project History

- January 2009: the group was formed as "ServerJS" following a blog post on Kevin Dangoor's Blue Sky on Mars
- March 2009: the dust had settled around "securable modules" as the module style for the group. This is CommonJS API 0.1
- April 2009: CommonJS modules were shown off with several implementations at the first JSConf in Washington, DC.
- August 2009: The group name was formally changed to CommonJS to reflect the broader applicability of the APIs.

There are several implementations of the CommonJS standard, and you can choose the one that fits what you're trying to do.

node 版本发布时间
https://nodejs.org/zh-cn/download/releases/
<https://nodejs.org/docs/v0.1.16/api.html#_modules>

<https://github.com/nodejs/node-v0.x-archive/blob/v0.1.16/ChangeLog>

```
2009.11.03, Version 0.1.16

  * API: Use CommonJS-style module requiring
    - require("/sys.js") becomes require("sys")
    - require("circle.js") becomes require("./circle")
    - process.path.join() becomes require("path").join()
    - __module becomes module
```

目前已经 12th

https://www.ecma-international.org/publications-and-standards/standards/ecma-262/
首次出现在 6th 2015 年
https://exploringjs.com/es6/ch_modules.html

https://stackoverflow.com/questions/18952884/javascript-module-pattern-for-jquery-applications
https://stackoverflow.com/questions/24084617/javascript-module-pattern-with-sub-modules-cross-access-or-better-pattern

The pattern in few words:
Every webpage must include only one scope, and could include many modules.
Every module is an IIFE, with subfunctions.
Every scope has a document ready and calls one or many modules.

http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html

## Module Pattern

https://www.patterns.dev/posts/classic-design-patterns/#modulepatternjavascript

Modules are an integral piece of any robust application's architecture and typically help in keeping the units of code for a project both cleanly separated and organized.

In JavaScript, there are several options for implementing modules. These include:

The Module pattern
Object literal notation
AMD modules
CommonJS modules
JavaScript modules

JavaScript modules also known as “ES modules” or “ECMAScript modules” have already been introduced in an earlier section JavaScript Modules and ES2015+. We will primarily use ES modules for the examples in this section. Before ES2015, CommonJS modules or AMD modules were popular alternatives as they allowed you to export the contents of a module. We will be exploring AMD, CommonJS, and UMD modules later on in the book in the section Modular Design Patterns for Classic JavaScript. First, let us understand the Module Pattern and its origins.

What is commonjs2
https://github.com/webpack/webpack/issues/1114
https://webpack.js.org/configuration/output/#module-definition-systems

module.exports

https://nodejs.org/docs/v0.1.14/api.html#_modules

A reference to the current module (of type node.Module). In particular \_\_module.exports is the same as the exports object. See src/node.js for more information.

https://nodejs.org/docs/v0.1.16/api.html#_modules

A reference to the current module (of type process.Module). In particular module.exports is the same as the exports object. See src/process.js for more information.
https://github.dev/nodejs/node/tree/v0.1.16
