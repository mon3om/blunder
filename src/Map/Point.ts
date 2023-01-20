import Blunder from "../Blunder/Blunder";

class Point {
  public x: number;
  public y: number;
  public character: string;
  public outOfBoundaries: boolean = false;

  public constructor(
    character: string,
    x: number,
    y: number,
    outOfBoundaries?: boolean
  ) {
    this.character = character;
    this.x = x;
    this.y = y;
    this.outOfBoundaries = Boolean(outOfBoundaries);
  }

  IsPointAccessible = (): boolean => {
    if (
      (this.character === "X" && !Blunder.Instance.breakerMode) ||
      this.character === "#" ||
      this.outOfBoundaries
    ) {
      return false;
    }
    return true;
  };

  public ComparePoint = (point: Point) => {
    return this.x === point.x && this.y === point.y;
  };

  public toString = (): string => `[${this.x}, ${this.y}]`;
}

export default Point;
