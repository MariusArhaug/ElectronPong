"use strict";
exports.__esModule = true;
exports.randomSpeed = exports.arrayRandom = void 0;
function arrayRandom(length) {
    return Math.floor(Math.random() * length);
}
exports.arrayRandom = arrayRandom;
function randomSpeed(array) {
    return array[arrayRandom(array.length)];
}
exports.randomSpeed = randomSpeed;
//# sourceMappingURL=arrayRandom.js.map