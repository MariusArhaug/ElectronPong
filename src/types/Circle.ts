import { ICTX, IDificulty, WINDOW_HEIGHT, WINDOW_WIDTH, CENTER_X, CENTER_Y } from './constants'
import { Model } from './Model'
import { RectCircleColliding } from '../utils/rectCircleColliding'

interface ICircle {
  ctx: ICTX
  x : number;
  y: number;
  velocity: IVelocity;
  radius: number;
  color: string;
}

interface IVelocity {
  dx: number;
  dy: number;
}



export class Circle extends Model<ICircle> {
  readonly setting : IDificulty 
  public getX(): number {
    return this.props.x;
  }

  public getY(): number {
    return this.props.y;
  }

  public getVelocity(): IVelocity {
    return this.props.velocity
  }

  public getDX(): number {
    return this.getVelocity().dx;
  }

  public getDY(): number {
    return this.getVelocity().dy;
  }

  public getRadius(): number {
    return this.props.radius;
  }

  public getColor(): string {
    return this.props.color;
  }


	public draw(): void {
		this.props.ctx.beginPath(); 
		this.props.ctx.arc(this.getX(), this.getY(), this.getRadius(), 0, 2 * Math.PI);
		this.props.ctx.strokeStyle = this.getColor();
		this.props.ctx.stroke();
		this.props.ctx.closePath();
	}

  private playerHasScored(playerOne: Player, playerTwo: Player): boolean {
    if ((this.getX() - this.getRadius() * 3 ) > WINDOW_WIDTH) {
      //If ball passes the right wall and goes past it
      playerOne.increasePoints()
      return true
    }
    if ((this.getX() + this.getRadius()*3) < 0) {
      //If ball passes with left wall and goes past it
      playerTwo.increasePoints()
      return true
    }
    return false
  }


	public update(playerOne: Player, playerTwo: Player): void {
		if (this.playerHasScored) {
      this.center()
    }

		if (this.y+this.velocity.y > WindowHeight - this.radius || this.y+this.velocity.y < this.radius) {
			this.velocity.y = -this.velocity.y;
		}


		const detectionOne = RectCircleColliding(this, playerOne);
		const detectionTwo = RectCircleColliding(this, playerTwo);

		if (detectionOne == true || detectionTwo == true) {

			if(playerOne.dx > 0) {
				this.velocity.x -= 3;
			}

			if(playerTwo.dx < 0) {
				this.velocity.x += 3;
			}

			if(playerOne.dy < 0 || playerTwo.dy < 0) {
				this.velocity.y = this.velocity.y;
			}

			this.velocity.x = -this.velocity.x;
		}

		if (this.velocity.x > Math.abs(randomSpeed(this.setting.speed))) {
				this.velocity.x = this.velocity.x*0.75;
			}
		if (this.velocity.x < Math.abs(randomSpeed(this.setting.speed))*-1) {
				this.velocity.x = this.velocity.x*0.75;
			}


		this.props.x += this.getDX();
		this.props.y += this.getDY();
		this.draw();
	}

	public center(): void {
		this.props.x = CENTER_X;
		this.props.y = CENTER_Y;
		this.props.velocity.dx = randomSpeed(this.setting.speed);
		this.props.velocity.dy = randomSpeed(this.setting.speed);
	}
}