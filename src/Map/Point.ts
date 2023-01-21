import Blunder, { State } from "../blunder/blunder";

class Point {
  public x: number;
  public y: number;
  public character: string;

  public constructor(character: string, x: number, y: number) {
    this.character = character;
    this.x = x;
    this.y = y;
  }

  isPointAccessible = (state: State): boolean => {
    if (
      (this.character === "X" && !state.breakerMode) ||
      this.character === "#"
    ) {
      return false;
    }
    return true;
  };

  public comparePoint = (point: Point) => {
    return this.x === point.x && this.y === point.y;
  };

  public toString = (): string => `[${this.x}, ${this.y}]`;
}

export default Point;
