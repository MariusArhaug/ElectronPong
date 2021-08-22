"use strict";
exports.__esModule = true;
exports.Model = void 0;
var Model = /** @class */ (function () {
    function Model(ctx, x, y, color, props) {
        this.props = props;
        this.ctx = ctx;
        this.x = x;
        this.y = y;
        this.color = color;
    }
    Model.prototype.getX = function () {
        return this.x;
    };
    Model.prototype.getY = function () {
        return this.y;
    };
    Model.prototype.getCTX = function () {
        return this.ctx;
    };
    Model.prototype.getColor = function () {
        return this.color;
    };
    return Model;
}());
exports.Model = Model;
//# sourceMappingURL=Model.js.map