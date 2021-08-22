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
exports.Circle = void 0;
var constants_1 = require("./constants");
var utils_1 = require("../utils");
var _1 = require(".");
var Circle = /** @class */ (function (_super) {
    __extends(Circle, _super);
    function Circle() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Circle.prototype.getDX = function () {
        return this.props.dx;
    };
    Circle.prototype.getDY = function () {
        return this.props.dy;
    };
    Circle.prototype.getRadius = function () {
        return this.props.radius;
    };
    Circle.prototype.draw = function () {
        this.props.ctx.beginPath();
        this.props.ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, 2 * Math.PI);
        this.props.ctx.strokeStyle = this.getColor();
        this.props.ctx.stroke();
        this.props.ctx.closePath();
    };
    Circle.prototype.getSpeed = function () {
        return this.props.setting.speed;
    };
    Circle.prototype.playerHasScored = function (playerOne, playerTwo) {
        if (this.getX() - this.getRadius() * 3 > constants_1.WINDOW_WIDTH) {
            //If ball passes the right wall and goes past it
            playerOne.increasePoints();
            return true;
        }
        if (this.getX() + this.getRadius() * 3 < 0) {
            //If ball passes with left wall and goes past it
            playerTwo.increasePoints();
            return true;
        }
        return false;
    };
    Circle.prototype.update = function (playerOne, playerTwo) {
        if (this.playerHasScored) {
            this.center();
        }
        if (this.y + this.getDY() > constants_1.WINDOW_HEIGHT - this.getRadius() ||
            this.y + this.getDY() < this.getRadius()) {
            this.props.dy = -this.props.dy;
        }
        var detectionOne = utils_1.rectCircleColliding(this, playerOne);
        var detectionTwo = utils_1.rectCircleColliding(this, playerTwo);
        if (detectionOne || detectionTwo) {
            if (playerOne.getDX() > 0) {
                this.props.dx -= 3;
            }
            if (playerTwo.getDX() < 0) {
                this.props.dx += 3;
            }
            if (playerOne.getDY() < 0 || playerTwo.getDY() < 0) {
                this.props.dy = -this.props.dy;
            }
            this.props.dx = -this.props.dx;
        }
        if (this.props.dx > Math.abs(utils_1.randomSpeed(this.getSpeed()))) {
            this.props.dx = this.props.dx * 0.75;
        }
        if (this.props.dx < Math.abs(utils_1.randomSpeed(this.getSpeed())) * -1) {
            this.props.dx = this.props.dx * 0.75;
        }
        this.props.dx += this.getDX();
        this.props.dy += this.getDY();
        this.draw();
    };
    Circle.prototype.center = function () {
        this.x = constants_1.CENTER_X;
        this.y = constants_1.CENTER_Y;
        this.props.dx = utils_1.randomSpeed(this.getSpeed());
        this.props.dy = utils_1.randomSpeed(this.getSpeed());
    };
    return Circle;
}(_1.Model));
exports.Circle = Circle;
//# sourceMappingURL=Circle.js.map