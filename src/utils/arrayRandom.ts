import { DIFFICULTY, IDificulty } from "../types";

export function arrayRandom(length: number): number {
  return Math.floor(Math.random() * length);
}

export function randomDifficulty(): IDificulty {
  return DIFFICULTY[arrayRandom(DIFFICULTY.length)];
}

export function randomSpeed(array: number[]): number {
  return array[arrayRandom(array.length)];
}
