const { performance } = require("node:perf_hooks");

module.exports = {
  perfTime,
};

function perfTime(func) {
  return function (arg) {
    const startTime = performance.now();

    func.call(this, arg);

    const endTime = performance.now();
    const perfTime = Math.round(endTime - startTime);

    console.log(`>\n> Took ${perfTime} ms`);
  };
}
