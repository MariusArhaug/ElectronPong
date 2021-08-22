"use strict";
exports.__esModule = true;
exports.DATA = exports.CENTER_Y = exports.CENTER_X = exports.WINDOW_HEIGHT = exports.WINDOW_WIDTH = exports.COLOR = exports.DIFFICULTY = void 0;
var EASY = {
    speed: [5, 5, -5, -5],
    y: 200,
    height: 245,
    radius: 27.5
};
var NORMAL = {
    speed: [7.5, 7.5, -7.5, -7.5],
    y: 175,
    height: 215,
    radius: 22.5
};
var HARD = {
    speed: [10, 10, -10, -10],
    y: 150,
    height: 185,
    radius: 17.5
};
var EXTREME = {
    speed: [15, 15, -15, -15],
    y: 125,
    height: 155,
    radius: 15
};
exports.DIFFICULTY = new Map([
    ["easy", EASY],
    ["normal", NORMAL],
    ["hard", HARD],
    ["extreme", EXTREME],
]);
exports.COLOR = "#fce094";
exports.WINDOW_WIDTH = window.innerWidth;
exports.WINDOW_HEIGHT = window.innerHeight - 40;
exports.CENTER_X = exports.WINDOW_WIDTH / 2;
exports.CENTER_Y = exports.WINDOW_HEIGHT / 2;
exports.DATA = {
    One: {
        x: 80
    },
    Two: {
        x: exports.WINDOW_WIDTH - 80
    },
    width: 7.5
};
//# sourceMappingURL=constants.js.map