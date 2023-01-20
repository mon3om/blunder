import Blunder from "../Blunder/Blunder";
import { DIRECTIONS } from "../Blunder/Movement";
import Point from "./Point";

class BlunderMap {
  public static Instance: BlunderMap;
  public static StartPoint: Point;
  public static EndPoint: Point;
  public static portals: Point[];

  mapArray: string[];

  constructor(mapArray: string[]) {
    this.mapArray = mapArray;
    BlunderMap.Instance = this;
    BlunderMap.StartPoint = this.getPointByValue("@") as Point;
    BlunderMap.EndPoint = this.getPointByValue("$") as Point;
    BlunderMap.portals = this.getPointByValue("T", true) as Point[];
  }

  private getPointByPosition = (x: number, y: number): Point => {
    let outOfBoundaries: boolean =
      this.mapArray[0].length <= x ||
      this.mapArray.length <= y ||
      x < 0 ||
      y < 0;

    if (outOfBoundaries) return new Point("", x, y, true);
    return new Point(this.mapArray[y][x], x, y);
  };

  private getPointByValue = (
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

  public GetPoint = (direction: DIRECTIONS): Point => {
    let x, y: number;
    let nextPoint: Point;
    x = Blunder.Instance.currentPoint.x;
    y = Blunder.Instance.currentPoint.y;

    switch (direction) {
      case DIRECTIONS.EAST:
        nextPoint = BlunderMap.Instance.getPointByPosition(x + 1, y);
        return nextPoint;
      case DIRECTIONS.NORTH:
        nextPoint = BlunderMap.Instance.getPointByPosition(x, y - 1);
        return nextPoint;
      case DIRECTIONS.SOUTH:
        nextPoint = BlunderMap.Instance.getPointByPosition(x, y + 1);
        return nextPoint;
      case DIRECTIONS.WEST:
        nextPoint = BlunderMap.Instance.getPointByPosition(x - 1, y);
        return nextPoint;
    }
  };

  public RemoveObstacle = (point: Point) => {
    let arr = [...this.mapArray[point.y]];
    arr[point.x] = " ";
    this.mapArray[point.y] = arr.join("");
  };
}

export default BlunderMap;
