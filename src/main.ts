import {
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  COLOR,
  CENTER_X,
  CENTER_Y,
  DATA,
  DIFFICULTY,
} from "./constants";
import { Circle, Player } from "./models";
import { castHTML } from "./utils/castHTML";
import { randomSpeed } from "./utils/arrayRandom";

const canvas = document.getElementsByTagName("canvas")[0];
canvas.width = WINDOW_WIDTH;
canvas.height = WINDOW_HEIGHT;
const ctx = canvas.getContext("2d");

export function startGame(key: string): void {
  const SETTING = DIFFICULTY.get(key);
  const SPEED_X = randomSpeed(SETTING.speed);
  const SPEED_Y = randomSpeed(SETTING.speed);

  const CIRCLE = new Circle(ctx, CENTER_X, CENTER_Y, COLOR, {
    ctx,
    dx: SPEED_X,
    dy: SPEED_Y,
    radius: SETTING.radius,
    setting: SETTING,
  });

  const PLAYER_ONE = new Player(ctx, DATA.One.x, SETTING.y, COLOR, {
    height: SETTING.height,
    width: DATA.width,
    points: 0,
  });
  const PLAYER_TWO = new Player(ctx, DATA.Two.x, SETTING.y, COLOR, {
    height: SETTING.height,
    width: DATA.width,
    points: 0,
  });

  window.addEventListener("keydown", (event: KeyboardEvent) => {
    movePlayer(PLAYER_ONE, PLAYER_TWO, event);
  });

  castHTML(document.getElementsByClassName("menu-container")[0]).style.display =
    "none";
  castHTML(document.getElementsByClassName("sidebars")[0]).style.display =
    "none";
  castHTML(document.getElementsByClassName("sidebars")[1]).style.display =
    "none";
  castHTML(document.getElementsByTagName("h1")[0]).style.visibility = "visible";
  animate(CIRCLE, PLAYER_ONE, PLAYER_TWO);
}

let requestId: undefined | number;
function animate(circle: Circle, playerOne: Player, playerTwo: Player) {
  startAnimation(circle, playerOne, playerTwo);
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  circle.update(playerOne, playerTwo);
  playerOne.update();
  playerTwo.update();
  updateScore(playerOne, playerTwo);
}

function startAnimation(circle: Circle, playerOne: Player, playerTwo: Player) {
  if (!requestId) {
    requestId = window.requestAnimationFrame(() => {
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

function updateScore(playerOne: Player, playerTwo: Player) {
  document.getElementById("pOne-Counter").innerHTML = playerOne
    .getPoints()
    .toString();
  document.getElementById("pTwo-Counter").innerHTML = playerTwo
    .getPoints()
    .toString();
}

export function stopGame(playerOne: Player, playerTwo: Player): void {
  castHTML(document.getElementsByClassName("menu-container")[0]).style.display =
    "block";
  castHTML(document.getElementsByClassName("menu")[0]).style.display = "none";

  castHTML(
    document.getElementsByClassName("winner-container")[0]
  ).style.display = "block";
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

export function reset(): void {
  castHTML(document.getElementsByClassName("menu")[0]).style.display = "block";
  castHTML(
    document.getElementsByClassName("winner-container")[0]
  ).style.display = "none";
  document.getElementById("pOne-Counter").innerHTML = "0";
  document.getElementById("pTwo-Counter").innerHTML = "0";
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  castHTML(document.getElementsByClassName("sidebars")[0]).style.display =
    "block";
  castHTML(document.getElementsByClassName("sidebars")[1]).style.display =
    "block";
}

let lastKeyCode: string;
function movePlayer(playerOne: Player, playerTwo: Player, e: KeyboardEvent) {
  e.preventDefault();
  switch (e.key) {
    case "w":
      playerOne.move(-1);
      if (lastKeyCode == e.key) {
        playerOne.speedUp(-1);
      }
      break;
    case "s":
      playerOne.move(1);
      if (lastKeyCode == e.key) {
        playerOne.speedUp(1);
      }
      break;
    case "d":
      playerOne.pushForward(1);
      break;

    case "ArrowUp":
      playerTwo.move(-1);
      if (lastKeyCode == e.key) {
        playerTwo.speedUp(-1);
      }
      break;
    case "ArrowDown":
      playerTwo.move(1);
      if (lastKeyCode == e.key) {
        playerTwo.speedUp(1);
      }
      break;
    case "ArrowLeft":
      playerTwo.pushForward(-1);
      break;
  }
  lastKeyCode = e.key;
}

export function showInstructions(): void {
  castHTML(document.getElementsByClassName("menu")[0]).style.display = "none";
  castHTML(
    document.getElementsByClassName("instructions-container")[0]
  ).style.display = "flex";
}

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
