import { WINDOW_HEIGHT, DATA, ICTX } from "./constants";
import { Model } from "./Model";

interface IPlayer {
  dx: number;
  dy: number;
  width: number;
  height: number;
  points: number;
}

export class Player extends Model<IPlayer> {
  constructor(ctx: ICTX, x: number, y: number, color: string, props: IPlayer) {
    super(ctx, x, y, color, props);
    this.props.dx = 0;
    this.props.dy = 0;
  }

  public getDX(): number {
    return this.props.dx;
  }

  public getDY(): number {
    return this.props.dy;
  }

  public getWidth(): number {
    return this.props.width;
  }

  public getHeight(): number {
    return this.props.height;
  }

  public move(direction: number): void {
    //direction is a value between 1 and -1, if positive move down, if negative move down
    this.props.dy = 3.5 * direction;
  }

  public speedUp(direction: number): void {
    this.props.dy += 3.5 * direction;
  }

  public pushForward(direction: number): void {
    //direction is a value between 1 and -1, if positive move right if negative move left
    this.props.dx = 5 * direction;
  }
  public pushBack(x: number): void {
    this.x = x;
    this.props.dx = 0;
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
      this.props.dy = -this.props.dy;
    }

    //if x cordinates is more than 27.5 from start position reverse speed
    if (this.x > DATA.One.x + 27.5) {
      this.props.dx = -this.props.dx;
    }

    if (this.x > DATA.Two.x - 27.5) {
      this.props.dx = -this.props.dx;
    }

    if (this.x < DATA.One.x) {
      this.pushBack(DATA.One.x);
    }
    if (this.x > DATA.Two.x) {
      this.pushBack(DATA.Two.x);
    }

    if (Math.abs(this.getDY()) > 3.5) {
      this.props.dy = this.props.dy * 0.985;
    }

    this.y += this.props.dy;

    if (this.getDX() !== 0) {
      this.x += this.props.dx;
    }

    this.draw();
  }

  center(): void {
    this.props.dy = 0;
    this.y = 150;
  }

  increasePoints(): void {
    this.props.points++;
    //if (this.props.points >= 10) {
    //  stopGame();
    //}
  }
}
