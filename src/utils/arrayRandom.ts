export function arrayRandom(length: number): number {
  return Math.floor(Math.random() * length);
}

export function randomSpeed(array: number[]): number {
  return array[arrayRandom(array.length)];
}
