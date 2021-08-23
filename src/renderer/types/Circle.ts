import {
  ICTX,
  IDificulty,
  WINDOW_HEIGHT,
  WINDOW_WIDTH,
  CENTER_X,
  CENTER_Y,
} from "./constants";
import { rectCircleColliding, randomSpeed } from "../utils";
import { Model, Player } from ".";

interface ICircle {
  ctx: ICTX;
  dx: number;
  dy: number;
  radius: number;
  setting: IDificulty;
}

export class Circle extends Model<ICircle> {
  public getDX(): number {
    return this.props.dx;
  }

  public getDY(): number {
    return this.props.dy;
  }

  public getRadius(): number {
    return this.props.radius;
  }

  public draw(): void {
    this.props.ctx.beginPath();
    this.props.ctx.arc(
      this.getX(),
      this.getY(),
      this.getRadius(),
      0,
      2 * Math.PI
    );
    this.props.ctx.strokeStyle = this.getColor();
    this.props.ctx.stroke();
    this.props.ctx.closePath();
  }

  private getSpeed(): number[] {
    return this.props.setting.speed;
  }

  private playerHasScored(playerOne: Player, playerTwo: Player): boolean {
    if (this.getX() - this.getRadius() * 3 > WINDOW_WIDTH) {
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
  }

  public update(playerOne: Player, playerTwo: Player): void {
    if (this.playerHasScored) {
      this.center();
    }

    if (
      this.y + this.getDY() > WINDOW_HEIGHT - this.getRadius() ||
      this.y + this.getDY() < this.getRadius()
    ) {
      this.props.dy = -this.props.dy;
    }

    const detectionOne = rectCircleColliding(this, playerOne);
    const detectionTwo = rectCircleColliding(this, playerTwo);

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

    if (this.props.dx > Math.abs(randomSpeed(this.getSpeed()))) {
      this.props.dx = this.props.dx * 0.75;
    }
    if (this.props.dx < Math.abs(randomSpeed(this.getSpeed())) * -1) {
      this.props.dx = this.props.dx * 0.75;
    }

    this.props.dx += this.getDX();
    this.props.dy += this.getDY();
    this.draw();
  }

  public center(): void {
    this.x = CENTER_X;
    this.y = CENTER_Y;
    this.props.dx = randomSpeed(this.getSpeed());
    this.props.dy = randomSpeed(this.getSpeed());
  }
}
