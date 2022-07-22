# JavaScript Module Pattern: In-Depth

> 原文: <http://www.adequatelygood.com/JavaScript-Module-Pattern-In-Depth.html>\
> 翻译: <https://gist.github.com/zxhfighter/612ddf3698e9e1e16f82>

The module pattern is a common JavaScript coding pattern. It’s generally well understood, but there are a number of advanced uses that have not gotten a lot of attention. In this article, I’ll review the basics and cover some truly remarkable advanced topics, including one which I think is original.

> 模块模式在 JavaScript 中是一种常见的编程模式。理解它很容易，但还是有一些高级用法没有引起足够关注。本文，我将回顾下模块模式的一些基本用法，然后探讨一些我原创的模块模式的高级用法。

## The Basics（基础）

We’ll start out with a simple overview of the module pattern, which has been well-known since Eric Miraglia (of YUI) first blogged about it three years ago. If you’re already familiar with the module pattern, feel free to skip ahead to “Advanced Patterns”.

> 我们首先简单回顾一下什么是模块模式。模块模式由 YUI 的 Eric Miraglia 三年前提出，然后被人熟知。如果你已经很熟悉模块模式了，可以跳过此节，直接阅读“高级模式”。

### Anonymous Closures（匿名闭包）

This is the fundamental construct that makes it all possible, and really is the single best feature of JavaScript. We’ll simply create an anonymous function, and execute it immediately. All of the code that runs inside the function lives in a closure, which provides privacy and state throughout the lifetime of our application.

> 匿名函数形成的闭包使模块模式有了可能，这也是 JavaScript 最大的一个优点。创建一个匿名函数，立即执行它，该匿名函数会形成一个闭包，在应用程序的整个生命周期中提供了隐私和状态管理。

```js
(function () {
  // ... all vars and functions are in this scope only
  // still maintains access to all globals
})();
```

Notice the () around the anonymous function. This is required by the language, since statements that begin with the token function are always considered to be function declarations. Including () creates a function expression instead.

> 注意匿名函数结束处的括号。JavaScript 语言规定，以 `function` 标记开始的语句被认为是一个函数声明，加上 `()` 才会执行创建一个函数表达式。

### Global Import（全局引入）

JavaScript has a feature known as implied globals. Whenever a name is used, the interpreter walks the scope chain backwards looking for a var statement for that name. If none is found, that variable is assumed to be global. If it’s used in an assignment, the global is created if it doesn’t already exist. This means that using or creating global variables in an anonymous closure is easy. Unfortunately, this leads to hard-to-manage code, as it’s not obvious (to humans) which variables are global in a given file.

> JavaScript 存在隐式全局变量。当使用某个变量时，会沿着作用域链查找用 `var` 定义了该变量的语句。如果没有找到，该变量就被视为全局变量。如果该变量在赋值语句中使用，该变量不存在，该变量也会成为全局变量。这意味着在匿名闭包函数中使用或者创建全局变量相当容易。不幸的是，这将导致代码难以维护，人们很难发现文件中究竟哪些是全局变量。

Luckily, our anonymous function provides an easy alternative. By passing globals as parameters to our anonymous function, we import them into our code, which is both clearer and faster than implied globals. Here’s an example:

> 好消息是，匿名函数提供了一种简单的替代方法。通过将全局变量作为匿名函数的参数传入，相比隐式全局变量，这样更加清晰（明确哪些是全局变量）和快速（无需作用域链多级查找），如下例所示：

```js
(function ($, YAHOO) {
  // now have access to globals jQuery (as $) and YAHOO in this code
})(jQuery, YAHOO);
```

### Module Export（模块输出）

Sometimes you don’t just want to use globals, but you want to declare them. We can easily do this by exporting them, using the anonymous function’s return value. Doing so will complete the basic module pattern, so here’s a complete example:

> 有时候你不仅仅想只使用全局变量，还想将模块作为一个全局变量供其他模块使用。我们可以使用匿名函数的 `return` 语句暴漏模块。这就形成了一个基本的模块模式。完整的例子如下：

```js
var MODULE = (function () {
  var my = {};
  var privateVarible = 1;

  function privateMethod() {
    // ...
  }

  my.moduleProperty = 1;
  my.moduleMethod = function () {
    // ...
  };

  return my;
})();
```

Notice that we’ve declared a global module named MODULE, with two public properties: a method named MODULE.moduleMethod and a variable named MODULE.moduleProperty. In addition, it maintains private internal state using the closure of the anonymous function. Also, we can easily import needed globals, using the pattern we learned above.

> 注意我们声明了一个名字为 `MODULE` 的全局模块，它对外提供了两个公有属性：一个名为 `MODULE.moduleMethod` 的方法，一个名为 `MODULE.moduleProperty` 的变量。另外，通过匿名函数形成的闭包维护了私有变量的状态管理（注：例如变量`privateVariable`）。最后，我们可以向上面所述的那样简单的引入需要的全局变量。

## Advanced Patterns（高级模式）

While the above is enough for many uses, we can take this pattern farther and create some very powerful, extensible constructs. Lets work through them one-by-one, continuing with our module named MODULE.

> 基本上，上面介绍的的情况够用了。我们还可以对这种模式研究的更加深入，并创建一些强大、可扩展的模式。我们接着上边创造的名为 `MODULE` 的全局模块，来逐个剖析。

### Augmentation（扩展）

One limitation of the module pattern so far is that the entire module must be in one file. Anyone who has worked in a large code-base understands the value of splitting among multiple files. Luckily, we have a nice solution to augment modules. First, we import the module, then we add properties, then we export it. Here’s an example, augmenting our MODULE from above:

> 目前为止，模块模式的一个不足是整个模块必须定义在一个文件中。有过大型代码开发经验的人都知道拆分文件的价值所在（注：也就是说一个模块可能拆分到了多个文件）。幸运的是，有一个优雅的方式能够扩展模块（注：在原有模块上添加新的方法、属性等）。首先，我们引入该模块，然后给该模块添加属性，最后返回这个模块。下面的例子扩展了上文的 `MODULE` 模块。

```js
var MODULE = (function (my) {
  my.anotherMethod = function () {
    // ...
  };

  return my;
})(MODULE);
```

We use the var keyword again for consistency, even though it’s not necessary. After this code has run, our module will have gained a new public method named MODULE.anotherMethod. This augmentation file will also maintain its own private internal state and imports.

> 为了保持一致性，我们这里使用 `var` 变量，尽管不必要（注：这里如果 MODULE 是一个全局变量，不需要用 `var` 声明，默认就会是全局的）。这段代码运行后，我们的模块将会扩展了一个名为 `MODULE.anotherMethod` 的公有方法。这个扩展的文件也能够维护它自己的内部状态和全局引入。

### Loose Augmentation（松散扩展）

While our example above requires our initial module creation to be first, and the augmentation to happen second, that isn’t always necessary. One of the best things a JavaScript application can do for performance is to load scripts asynchronously. We can create flexible multi-part modules that can load themselves in any order with loose augmentation. Each file should have the following structure:

> 上面的例子需要传入的模块必须事先存在，然后才能给其扩展方法（注：否则会报错，变量未定义）。JavaScript 应用能够异步加载脚本以提高性能。我们可以使用 `松散扩展`，灵活的异步加载多个文件，而不用考虑它们的加载顺序，每个文件的结构如下；

```js
var MODULE = (function (my) {
  // add capabilities ...

  return my;
})(MODULE || {});
```

In this pattern, the var statement is always necessary. Note that the import will create the module if it does not already exist. This means you can use a tool like LABjs and load all of your module files in parallel, without needing to block.

> 这个模式中，`var` 变量必不可少。注意到如果模块不存在，会创建一个空的模块。这意味着你能使用 LABjs 之类的脚本加载工具并行加载一个模块的多个文件，而不用以阻塞的方式一个一个加载。

### Tight Augmentation（紧密扩展）

While loose augmentation is great, it does place some limitations on your module. Most importantly, you cannot override module properties safely. You also cannot use module properties from other files during initialization (but you can at run-time after intialization). Tight augmentation implies a set loading order, but allows overrides. Here is a simple example (augmenting our original MODULE):

> `松散扩展` 很棒，但同时也限制了你的模块。最重要的一点是，你不能安全的重写模块属性（注：加载顺序和执行顺序不定），你也不能在初始化的时候使用其他文件中定义的模块属性，但是能够在初始化完成后使用（备注：加载时依赖和运行时依赖的区别）。`紧密扩展` 能够安全重写模块属性，但是失去了并行加载的优势，例子如下：

```js
var MODULE = (function (my) {
  var old_moduleMethod = my.moduleMethod;

  my.moduleMethod = function () {
    // method override, has access to old through old_moduleMethod...
  };

  return my;
})(MODULE);
```

Here we’ve overridden MODULE.moduleMethod, but maintain a reference to the original method, if needed.

> 这里我们重写了 `MODULE.moduleMethod` 方法，同时也维持了一个原始方法的引用（如果需要）。

### Cloning and Inheritance（克隆和继承）

```js
var MODULE_TWO = (function (old) {
  var my = {},
    key;

  for (key in old) {
    if (old.hasOwnProperty(key)) {
      my[key] = old[key];
    }
  }

  var super_moduleMethod = old.moduleMethod;
  my.moduleMethod = function () {
    // override method on the clone, access to super through super_moduleMethod
  };

  return my;
})(MODULE);
```

This pattern is perhaps the least flexible option. It does allow some neat compositions, but that comes at the expense of flexibility. As I’ve written it, properties which are objects or functions will not be duplicated, they will exist as one object with two references. Changing one will change the other. This could be fixed for objects with a recursive cloning process, but probably cannot be fixed for functions, except perhaps with eval. Nevertheless, I’ve included it for completeness.

> 这个模式最不灵活。尽管它支持一些巧妙的组合，但是灵活性大大降低。正如我写的，对象和函数没有被复制，否则这些对象和函数会被多个对象所引用，修改其中的一个会影响到另一个。对于对象，能够以递归的方式进行深度复制，但是对方法就不行了，除非使用 `eval` 函数。 尽管如此，为了完备性，我还是将它添加到了这里。

### Cross-File Private State（跨文件私有状态）

One severe limitation of splitting a module across multiple files is that each file maintains its own private state, and does not get access to the private state of the other files. This can be fixed. Here is an example of a loosely augmented module that will maintain private state across all augmentations:

> 将一个模块拆分到多个文件，每个文件只能维护自己的私有状态，而不能获取其他文件的私有状态。这也是可以解决的，下面的 `松散扩展` 例子将会在所有扩展文件中维护私有状态：

```js
var MODULE = (function (my) {
  var _private = (my._private = my._private || {}),
    _seal = (my._seal =
      my._seal ||
      function () {
        delete my._private;
        delete my._seal;
        delete my._unseal;
      }),
    _unseal = (my._unseal =
      my._unseal ||
      function () {
        my._private = _private;
        my._seal = _seal;
        my._unseal = _unseal;
      });

  // permanent access to _private, _seal, and _unseal

  return my;
})(MODULE || {});
```

Any file can set properties on their local variable \_private, and it will be immediately available to the others. Once this module has loaded completely, the application should call MODULE.\_seal(), which will prevent external access to the internal \_private. If this module were to be augmented again, further in the application’s lifetime, one of the internal methods, in any file, can call \_unseal() before loading the new file, and call \_seal() again after it has been executed. This pattern occurred to me today while I was at work, I have not seen this elsewhere. I think this is a very useful pattern, and would have been worth writing about all on its own.

> 任何文件都可以设置私有变量 `_private`，并且会被其他文件立即获取（注：设置的时候通过`my._private`输出）。一旦这个模块完全加载，应该调用 `MODULE._seal()` 来禁止外部访问私有变量 `_private`。如果这个模块需要进一步扩展，在任意文件的内部方法中，在加载新文件之前调用 `_unseal`（注：解封，也即将私有变量放在`my._private`上），新文件执行完毕后，调用 `_seal()`（注：加封，也即删掉`my._private`）。今天我在工作的时候突然发现了这个模式，我认为这是个很有用的模式，也值得在这里写下来。

### Sub-modules（子模块）

Our final advanced pattern is actually the simplest. There are many good cases for creating sub-modules. It is just like creating regular modules:

> 最后一个高级模式最简单：创建子模式。创建子模式同创建普通模式一样：

```js
MODULE.sub = (function () {
  var my = {};
  // ...

  return my;
})();
```

While this may have been obvious, I thought it worth including. Sub-modules have all the advanced capabilities of normal modules, including augmentation and private state.

> 尽管显而易见，还是提一下。子模式拥有模块模式所有的优点，包括扩展和私有状态。

## Conclusions（总结）

Most of the advanced patterns can be combined with each other to create more useful patterns. If I had to advocate a route to take in designing a complex application, I’d combine loose augmentation, private state, and sub-modules.

> 这些高级模式组合起来能够形成更加有用的模式。如果要我来使用这些模式来设计一个复杂的系统。我会组合 `松散扩展`、私有状态和子模式。

I haven’t touched on performance here at all, but I’d like to put in one quick note: The module pattern is good for performance. It minifies really well, which makes downloading the code faster. Using loose augmentation allows easy non-blocking parallel downloads, which also speeds up download speeds. Initialization time is probably a bit slower than other methods, but worth the trade-off. Run-time performance should suffer no penalties so long as globals are imported correctly, and will probably gain speed in sub-modules by shortening the reference chain with local variables.

> 目前为止还没有涉及性能，不过我有个小建议：模块模式有很好的性能。它能很好的压缩，使下载更快；使用 `松散扩展` 支持并行下载。初始化时间可能略慢于其他方法，不过还是值当的。只要全局变量正常导入了，运行时的性能也不会有影响，并且有可能在子模式中通过缩短变量引用链而获得性能提升。

To close, here’s an example of a sub-module that loads itself dynamically to its parent (creating it if it does not exist). I’ve left out private state for brevity, but including it would be simple. This code pattern allows an entire complex heirarchical code-base to be loaded completely in parallel with itself, sub-modules and all.

> 最后，下面这个例子动态加载子模块到父模块中（如果父模块不存在则动态创建），为了简便，这里没有使用私有状态，其实加上也很简单。这段代码允许整个复杂、层级的代码库、及其子模块完全的并行加载。

```js
var UTIL = (function (parent, $) {
  var my = (parent.ajax = parent.ajax || {});

  my.get = function (url, params, callback) {
    // ok, so I'm cheating a bit :)
    return $.getJSON(url, params, callback);
  };

  // etc...

  return parent;
})(UTIL || {}, jQuery);
```

I hope this has been useful, and please leave a comment to share your thoughts. Now, go forth and write better, more modular JavaScript!

> 我希望你从中收益，不要吝啬，在评论区分享你的想法。现在，请继续前进，编写更多更好的模块化 JavaScript 代码。

This post was featured on Ajaxian.com, and there is a little bit more discussion going on there as well, which is worth reading in addition to the comments below.

> 这篇文字最初发表在 ajaxian.com，那里的评论区也有很多精彩的评论。
