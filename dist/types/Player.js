"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (Object.prototype.hasOwnProperty.call(b, p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        if (typeof b !== "function" && b !== null)
            throw new TypeError("Class extends value " + String(b) + " is not a constructor or null");
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
exports.__esModule = true;
exports.Player = void 0;
var constants_1 = require("./constants");
var Model_1 = require("./Model");
var Player = /** @class */ (function (_super) {
    __extends(Player, _super);
    function Player() {
        var _this = _super !== null && _super.apply(this, arguments) || this;
        _this.dx = 0;
        _this.dy = 0;
        return _this;
    }
    Player.prototype.getDX = function () {
        return this.dx;
    };
    Player.prototype.getDY = function () {
        return this.dy;
    };
    Player.prototype.getWidth = function () {
        return this.props.width;
    };
    Player.prototype.getHeight = function () {
        return this.props.height;
    };
    Player.prototype.getPoints = function () {
        return this.props.points;
    };
    Player.prototype.move = function (direction) {
        //direction is a value between 1 and -1, if positive move down, if negative move down
        this.dy = 3.5 * direction;
    };
    Player.prototype.speedUp = function (direction) {
        this.dy += 3.5 * direction;
    };
    Player.prototype.pushForward = function (direction) {
        //direction is a value between 1 and -1, if positive move right if negative move left
        this.dx = 5 * direction;
    };
    Player.prototype.pushBack = function (x) {
        this.x = x;
        this.dx = 0;
    };
    Player.prototype.draw = function () {
        this.ctx.beginPath();
        this.ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
        this.ctx.strokeStyle = this.color;
        this.ctx.lineWidth = 2;
        this.ctx.stroke();
        this.ctx.closePath();
    };
    Player.prototype.update = function () {
        if (this.y + this.getHeight() + this.getDY() >= constants_1.WINDOW_HEIGHT ||
            this.y + this.getDY() <= 0) {
            this.dy = -this.dy;
        }
        //if x cordinates is more than 27.5 from start position reverse speed
        if (this.x > constants_1.DATA.One.x + 27.5) {
            this.dx = -this.dx;
        }
        if (this.x > constants_1.DATA.Two.x - 27.5) {
            this.dx = -this.dx;
        }
        if (this.x < constants_1.DATA.One.x) {
            this.pushBack(constants_1.DATA.One.x);
        }
        if (this.x > constants_1.DATA.Two.x) {
            this.pushBack(constants_1.DATA.Two.x);
        }
        if (Math.abs(this.getDY()) > 3.5) {
            this.dy = this.dy * 0.985;
        }
        this.y += this.dy;
        if (this.getDX() !== 0) {
            this.x += this.dx;
        }
        this.draw();
    };
    Player.prototype.center = function () {
        this.dy = 0;
        this.y = 150;
    };
    Player.prototype.increasePoints = function () {
        this.props.points++;
        //if (this.props.points >= 10) {
        //  stopGame();
        //}
    };
    return Player;
}(Model_1.Model));
exports.Player = Player;
//# sourceMappingURL=Player.js.map