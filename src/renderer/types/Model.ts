import { ICTX } from "./constants";

export class Model<T> {
  protected props: T;
  protected ctx: ICTX;
  protected x: number;
  protected y: number;
  protected color: string;

  constructor(ctx: ICTX, x: number, y: number, color: string, props: T) {
    this.props = props;
    this.ctx = ctx;
    this.x = x;
    this.y = y;
    this.color = color;
  }

  public getX(): number {
    return this.x;
  }

  public getY(): number {
    return this.y;
  }

  public getCTX(): ICTX {
    return this.ctx;
  }

  public getColor(): string {
    return this.color;
  }
}
