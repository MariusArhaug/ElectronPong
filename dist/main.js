"use strict";
exports.__esModule = true;
exports.showInstructions = exports.reset = exports.stopGame = exports.startGame = void 0;
var types_1 = require("./types");
var utils_1 = require("./utils");
var canvas = document.getElementsByTagName("canvas")[0];
canvas.width = types_1.WINDOW_WIDTH;
canvas.height = types_1.WINDOW_HEIGHT;
var ctx = canvas.getContext("2d");
function startGame(key) {
    var SETTING = types_1.DIFFICULTY.get(key);
    var SPEED_X = utils_1.randomSpeed(SETTING.speed);
    var SPEED_Y = utils_1.randomSpeed(SETTING.speed);
    var CIRCLE = new types_1.Circle(ctx, types_1.CENTER_X, types_1.CENTER_Y, types_1.COLOR, {
        ctx: ctx,
        dx: SPEED_X,
        dy: SPEED_Y,
        radius: SETTING.radius,
        setting: SETTING
    });
    var PLAYER_ONE = new types_1.Player(ctx, types_1.DATA.One.x, SETTING.y, types_1.COLOR, {
        height: SETTING.height,
        width: types_1.DATA.width,
        points: 0
    });
    var PLAYER_TWO = new types_1.Player(ctx, types_1.DATA.Two.x, SETTING.y, types_1.COLOR, {
        height: SETTING.height,
        width: types_1.DATA.width,
        points: 0
    });
    window.addEventListener("keydown", function (event) {
        movePlayer(PLAYER_ONE, PLAYER_TWO, event);
    });
    utils_1.castHTML(document.getElementsByClassName("menu-container")[0]).style.display =
        "none";
    utils_1.castHTML(document.getElementsByClassName("sidebars")[0]).style.display =
        "none";
    utils_1.castHTML(document.getElementsByClassName("sidebars")[1]).style.display =
        "none";
    utils_1.castHTML(document.getElementsByTagName("h1")[0]).style.visibility = "visible";
    animate(CIRCLE, PLAYER_ONE, PLAYER_TWO);
}
exports.startGame = startGame;
var requestId;
function animate(circle, playerOne, playerTwo) {
    startAnimation(circle, playerOne, playerTwo);
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    circle.update(playerOne, playerTwo);
    playerOne.update();
    playerTwo.update();
    updateScore(playerOne, playerTwo);
}
function startAnimation(circle, playerOne, playerTwo) {
    if (!requestId) {
        requestId = window.requestAnimationFrame(function () {
            animate(circle, playerOne, playerTwo);
        });
    }
}
function stopAnimation() {
    if (requestId) {
        window.cancelAnimationFrame(requestId);
        requestId = undefined;
    }
}
function updateScore(playerOne, playerTwo) {
    document.getElementById("pOne-Counter").innerHTML = playerOne
        .getPoints()
        .toString();
    document.getElementById("pTwo-Counter").innerHTML = playerTwo
        .getPoints()
        .toString();
}
function stopGame(playerOne, playerTwo) {
    utils_1.castHTML(document.getElementsByClassName("menu-container")[0]).style.display =
        "block";
    utils_1.castHTML(document.getElementsByClassName("menu")[0]).style.display = "none";
    utils_1.castHTML(document.getElementsByClassName("winner-container")[0]).style.display = "block";
    if (playerOne.getPoints() === 10) {
        document.getElementsByClassName("winner-message")[0].innerHTML =
            "Player One wins!";
    }
    if (playerTwo.getPoints() === 10) {
        document.getElementsByClassName("winner-message")[0].innerHTML =
            "Player Two wins!";
    }
    stopAnimation();
}
exports.stopGame = stopGame;
function reset() {
    utils_1.castHTML(document.getElementsByClassName("menu")[0]).style.display = "block";
    utils_1.castHTML(document.getElementsByClassName("winner-container")[0]).style.display = "none";
    document.getElementById("pOne-Counter").innerHTML = "0";
    document.getElementById("pTwo-Counter").innerHTML = "0";
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    utils_1.castHTML(document.getElementsByClassName("sidebars")[0]).style.display =
        "block";
    utils_1.castHTML(document.getElementsByClassName("sidebars")[1]).style.display =
        "block";
}
exports.reset = reset;
var lastKeyCode;
function movePlayer(playerOne, playerTwo, e) {
    e.preventDefault();
    switch (e.key) {
        //player one has WS
        case "w":
            playerOne.move(-1);
            //up W key pressed
            if (lastKeyCode == e.key) {
                playerOne.speedUp(-1);
            }
            break;
        case "s":
            playerOne.move(1);
            //down S key pressed
            if (lastKeyCode == e.key) {
                playerOne.speedUp(1);
            }
            break;
        case "d":
            playerOne.pushForward(1);
            //D key, move to the right
            break;
        //player two has up and down arrow
        case "ArrowUp":
            playerTwo.move(-1);
            // up arrow key pressed
            if (lastKeyCode == e.key) {
                playerTwo.speedUp(-1);
            }
            break;
        case "ArrowDown":
            playerTwo.move(1);
            // down arrow key pressed
            if (lastKeyCode == e.key) {
                playerTwo.speedUp(1);
            }
            break;
        case "ArrowLeft":
            playerTwo.pushForward(-1);
            //left arrow key, move to the left
            break;
    }
    lastKeyCode = e.key;
}
function showInstructions() {
    utils_1.castHTML(document.getElementsByClassName("menu")[0]).style.display = "none";
    utils_1.castHTML(document.getElementsByClassName("instructions-container")[0]).style.display = "flex";
}
exports.showInstructions = showInstructions;
// function rotate(velocity, angle) {
//   const rotatedVelocities = {
//     x: velocity.x * Math.cos(angle) - velocity.y * Math.sin(angle),
//     y: velocity.x * Math.sin(angle) - velocity.y * Math.cos(angle),
//   };
//   return rotatedVelocities;
// }
// function momentum(ball, player) {
//   const angle = -Math.atan2(player.y - ball.y, player.x - ball.x);
//   const m1 = ball.masss;
//   const m2 = player.mass;
//   const u1 = rotate(ball.velocity, angle);
//   const u2 = rotate(player.dy, angle);
// }
//# sourceMappingURL=main.js.map