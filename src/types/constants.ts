export type ICTX = CanvasRenderingContext2D

export const data = {
  One: {
    x: 80,
  },
  Two: {
    x: windowWidth-80,	//makes the to player x coordinate 80 from each side.
  },
  w: 7.5,
}


export interface IDificulty {
  speed: number[]
  y: number
  h: number
  radius: number
}

const EASY : IDificulty = {
  speed: [5,5,-5,-5],
  y: 200,
  h: 245,
  radius: 27.5,
}

const NORMAL: IDificulty = {
  speed: [7.5,7.5,-7.5,-7.5],
  y: 175,
  h: 215,
  radius: 22.5,
}

const HARD : IDificulty = {
  speed: [10,10,-10,-10],
  y: 150,
  h: 185,
  radius: 17.5,
}

const EXTREME : IDificulty = {
  speed: [15,15,-15,-15],
  y: 125,
  h: 155,
  radius: 15,
}

export const DIFFICULTY: IDificulty[] = [EASY, NORMAL, HARD, EXTREME]


export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_HEIGHT = window.innerHeight-40;
export const CENTER_X = WINDOW_WIDTH /2;
export const CENTER_Y = WINDOW_HEIGHT/2;