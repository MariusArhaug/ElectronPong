export type ICTX = CanvasRenderingContext2D;
export interface IDificulty {
  speed: number[];
  y: number;
  height: number;
  radius: number;
}

const EASY: IDificulty = {
  speed: [5, 5, -5, -5],
  y: 200,
  height: 245,
  radius: 27.5,
};

const NORMAL: IDificulty = {
  speed: [7.5, 7.5, -7.5, -7.5],
  y: 175,
  height: 215,
  radius: 22.5,
};

const HARD: IDificulty = {
  speed: [10, 10, -10, -10],
  y: 150,
  height: 185,
  radius: 17.5,
};

const EXTREME: IDificulty = {
  speed: [15, 15, -15, -15],
  y: 125,
  height: 155,
  radius: 15,
};

export const DIFFICULTY = new Map<string, IDificulty>([
  ["easy", EASY],
  ["normal", NORMAL],
  ["hard", HARD],
  ["extreme", EXTREME],
]);
export const COLOR = "#fce094";
export const WINDOW_WIDTH = window.innerWidth;
export const WINDOW_HEIGHT = window.innerHeight - 40;
export const CENTER_X = WINDOW_WIDTH / 2;
export const CENTER_Y = WINDOW_HEIGHT / 2;

export const DATA = {
  One: {
    x: 80,
  },
  Two: {
    x: WINDOW_WIDTH - 80, //makes the to player x coordinate 80 from each side.
  },
  width: 7.5,
};
