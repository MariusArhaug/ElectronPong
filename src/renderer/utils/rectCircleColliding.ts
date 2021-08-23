import { Circle, Player } from "../types";

export function rectCircleColliding(circle: Circle, player: Player): boolean {
  const PLAYER_WIDTH = player.getWidth() / 2;
  const CIRLCE_RADIUS = circle.getRadius();
  const distX = Math.abs(
    circle.getX() +
      circle.getDX() -
      player.getX() -
      PLAYER_WIDTH -
      player.getDY()
  );
  const distY = Math.abs(
    circle.getY() +
      circle.getDY() -
      player.getY() -
      PLAYER_WIDTH -
      player.getDY()
  );

  if ((distX || distY) > PLAYER_WIDTH + CIRLCE_RADIUS) {
    return false;
  }

  if ((distX || distY) <= PLAYER_WIDTH) {
    return true;
  }

  const dx = distX - PLAYER_WIDTH;
  const dy = distY - PLAYER_WIDTH;
  return dx * dx + dy * dy <= CIRLCE_RADIUS * CIRLCE_RADIUS;
}
