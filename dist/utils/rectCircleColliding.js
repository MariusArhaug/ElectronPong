"use strict";
exports.__esModule = true;
exports.rectCircleColliding = void 0;
function rectCircleColliding(circle, player) {
    var PLAYER_WIDTH = player.getWidth() / 2;
    var CIRLCE_RADIUS = circle.getRadius();
    var distX = Math.abs(circle.getX() +
        circle.getDX() -
        player.getX() -
        PLAYER_WIDTH -
        player.getDY());
    var distY = Math.abs(circle.getY() +
        circle.getDY() -
        player.getY() -
        PLAYER_WIDTH -
        player.getDY());
    if ((distX || distY) > PLAYER_WIDTH + CIRLCE_RADIUS) {
        return false;
    }
    if ((distX || distY) <= PLAYER_WIDTH) {
        return true;
    }
    var dx = distX - PLAYER_WIDTH;
    var dy = distY - PLAYER_WIDTH;
    return dx * dx + dy * dy <= CIRLCE_RADIUS * CIRLCE_RADIUS;
}
exports.rectCircleColliding = rectCircleColliding;
//# sourceMappingURL=rectCircleColliding.js.map