import { WINDOW_HEIGHT, DATA } from "../constants";
import { Model } from "./Model";

interface IPlayer {
  width: number;
  height: number;
  points: number;
}

export class Player extends Model<IPlayer> {
  private dx = 0;
  private dy = 0;

  public getDX(): number {
    return this.dx;
  }

  public getDY(): number {
    return this.dy;
  }

  public getWidth(): number {
    return this.props.width;
  }

  public getHeight(): number {
    return this.props.height;
  }

  public getPoints(): number {
    return this.props.points;
  }

  public move(direction: number): void {
    //direction is a value between 1 and -1, if positive move down, if negative move down
    this.dy = 3.5 * direction;
  }

  public speedUp(direction: number): void {
    this.dy += 3.5 * direction;
  }

  public pushForward(direction: number): void {
    //direction is a value between 1 and -1, if positive move right if negative move left
    this.dx = 5 * direction;
  }
  public pushBack(x: number): void {
    this.x = x;
    this.dx = 0;
  }

  public draw(): void {
    this.ctx.beginPath();
    this.ctx.rect(this.getX(), this.getY(), this.getWidth(), this.getHeight());
    this.ctx.strokeStyle = this.color;
    this.ctx.lineWidth = 2;
    this.ctx.stroke();
    this.ctx.closePath();
  }

  public update(): void {
    if (
      this.y + this.getHeight() + this.getDY() >= WINDOW_HEIGHT ||
      this.y + this.getDY() <= 0
    ) {
      this.dy = -this.dy;
    }

    //if x cordinates is more than 27.5 from start position reverse speed
    if (this.x > DATA.One.x + 27.5) {
      this.dx = -this.dx;
    }

    if (this.x > DATA.Two.x - 27.5) {
      this.dx = -this.dx;
    }

    if (this.x < DATA.One.x) {
      this.pushBack(DATA.One.x);
    }
    if (this.x > DATA.Two.x) {
      this.pushBack(DATA.Two.x);
    }

    if (Math.abs(this.getDY()) > 3.5) {
      this.dy = this.dy * 0.985;
    }

    this.y += this.dy;

    if (this.getDX() !== 0) {
      this.x += this.dx;
    }

    this.draw();
  }

  center(): void {
    this.dy = 0;
    this.y = 150;
  }

  increasePoints(): void {
    this.props.points++;
    //if (this.props.points >= 10) {
    //  stopGame();
    //}
  }
}
