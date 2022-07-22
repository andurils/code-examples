modules["math"] = function (require, exports) {
  exports.add = function () {
    var sum = 0,
      i = 0,
      args = arguments,
      l = args.length;
    while (i < l) {
      sum += args[i++];
    }
    return sum;
  };
};

modules["increment"] = function (require, exports) {
  var add = require("math").add;
  exports.increment = function (val) {
    return add(val, 1);
  };
};

modules["program"] = function (require, exports) {
  var inc = require("increment").increment;
  var a = 1;
  console.log(inc(a)); // 2
};
