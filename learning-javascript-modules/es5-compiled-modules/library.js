var require = (function () {
  // memoized export objects
  var exportsObjects = {};

  // don't want outsider redefining "require" and don't want
  // to use arguments.callee so name the function here.
  var require = function (name) {
    if (exportsObjects.hasOwnProperty(name)) {
      return exportsObjects[name];
    }
    var exports = {};
    // memoize before executing module for cyclic dependencies
    exportsObjects[name] = exports;
    modules[name](require, exports);
    return exports;
  };

  return require;
})();

var run = function (name) {
  require(name); // doesn't return exports
};

var modules = {};
