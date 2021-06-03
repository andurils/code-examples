var fs = require("fs");
var save = require("file-save");
var resolve = require("path").resolve;
var basename = require("path").basename;
// 本地化的翻译文件目录
var localePath = resolve(__dirname, "../../src/locale/lang");
// 获取目录下所有文件名称的数组对像
var fileList = fs.readdirSync(localePath);

// 转换函数
var transform = function (filename, name, cb) {
  require("babel-core").transformFile(
    resolve(localePath, filename),
    {
      plugins: [
        "add-module-exports",
        ["transform-es2015-modules-umd", { loose: true }],
      ],
      moduleId: name,
    },
    cb
  );
};

// 遍历所有文件
fileList
  // 只处理 js 文件
  .filter(function (file) {
    return /\.js$/.test(file);
  })
  .forEach(function (file) {
    var name = basename(file, ".js");

    // 调用转换函数， 利用babel-core、 插件(add-module-exports transform-es2015-modules-umd)
    // 处理src/locale/lang下的文件，生成 `umd` 格式的文件，输出至 `lib/umd/locale` 目录下
    transform(file, name, function (err, result) {
      if (err) {
        console.error(err);
      } else {
        var code = result.code;

        code = code
          .replace("define('", "define('element/locale/")
          .replace(
            "global.",
            "global.ELEMENT.lang = global.ELEMENT.lang || {}; \n    global.ELEMENT.lang."
          );
        save(resolve(__dirname, "../../lib/umd/locale", file)).write(code);

        console.log(file);
      }
    });
  });
