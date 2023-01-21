import Blunder, { State } from "../blunder/blunder";
import { Direction } from "../blunder/movement";
import Point from "./point";

class BlunderMap {
  public startPoint: Point;
  public endPoint: Point;
  public portals: Point[];

  private mapArray: string[];

  constructor(mapArray: string[]) {
    this.mapArray = mapArray;
    this.startPoint = this.getPointByValue("@") as Point;
    this.endPoint = this.getPointByValue("$") as Point;
    this.portals = this.getPointByValue("T", true) as Point[];
  }

  private getPointByPosition = (x: number, y: number): Point => {
    let outOfBoundaries: boolean =
      this.mapArray[0].length <= x ||
      this.mapArray.length <= y ||
      x < 0 ||
      y < 0;

    if (outOfBoundaries) {
      throw new Error(`Point out of map boundaries [${x}, ${y}]`);
    }

    return new Point(this.mapArray[y][x], x, y);
  };

  protected getPointByValue = (
    value: string,
    multiple: boolean = false
  ): Point | Point[] => {
    let occ: Point[] = [];
    for (let y = 0; y < this.mapArray.length; y++)
      for (let x = 0; x < this.mapArray[0].length; x++)
        if (this.mapArray[y][x] === value) {
          if (!multiple) return new Point(value, x, y);
          else occ.push(new Point(value, x, y));
        }

    return occ;
  };

  public getPoint = (direction: Direction, point: Point): Point => {
    let x, y: number;
    let nextPoint: Point;
    x = point.x;
    y = point.y;

    switch (direction) {
      case Direction.EAST:
        nextPoint = this.getPointByPosition(x + 1, y);
        return nextPoint;
      case Direction.NORTH:
        nextPoint = this.getPointByPosition(x, y - 1);
        return nextPoint;
      case Direction.SOUTH:
        nextPoint = this.getPointByPosition(x, y + 1);
        return nextPoint;
      case Direction.WEST:
        nextPoint = this.getPointByPosition(x - 1, y);
        return nextPoint;
    }
  };

  public removeObstacle = (point: Point) => {
    let arr = [...this.mapArray[point.y]];
    arr[point.x] = " ";
    this.mapArray[point.y] = arr.join("");
  };
}

export default BlunderMap;
