import BlunderMap from "../Map/Map";
import Point from "../Map/Point";
import Blunder, { Path } from "./Blunder";
import { DIRECTIONS } from "./Movement";

class Brain {
  private blunder: Blunder;

  public constructor(blunder: Blunder) {
    this.blunder = blunder;
  }

  CheckForInfiniteLoop = (): boolean => {
    let currentPoint: Point = this.blunder.currentPoint;
    let currentDir: DIRECTIONS = this.blunder.currentDirection;
    let occ: number[] = [];
    for (let i = 0; i < this.blunder.path.length - 1; i++) {
      let pathPoint: Path = this.blunder.path[i];
      if (
        currentPoint.ComparePoint(pathPoint.point) &&
        currentDir === pathPoint.direction
      )
        occ.push(i);
    }
    if (occ.length > 2) {
      let checkedCounter = 0;
      let isLoop = true;

      while (checkedCounter < occ.length - 1) {
        let i = 0,
          j = 0;
        for (
          i = occ[checkedCounter], j = occ[checkedCounter + 1];
          j < occ[checkedCounter + 2];
          i++, j++
        ) {
          let p1 = this.blunder.path[i];
          let p2 = this.blunder.path[j];
          if (
            !p1.point.ComparePoint(p2.point) ||
            p1.direction !== p2.direction
          ) {
            isLoop = false;
            break;
          }
        }
        checkedCounter++;
      }

      return isLoop;
    }
  };

  CheckForSpecialBehaviour = () => {
    switch (this.blunder.currentPoint.character) {
      case " ":
        break;
      case "B":
        this.blunder.breakerMode = !this.blunder.breakerMode;
        break;
      case "I":
        this.blunder.directions = this.blunder.directions.reverse();
        break;
      case "X":
        BlunderMap.Instance.RemoveObstacle(this.blunder.currentPoint);
        break;
      case "$":
        this.blunder.endReached = true;
        break;
      case "T":
        this.blunder.movement.Teleport();
        break;
      default:
        if ("NWES".indexOf(this.blunder.currentPoint.character) > -1) {
          this.ChangeDirectionExplicitly();
          this.blunder.explicitDirection = true;
        } else
          throw new Error(
            `Unexpected value in the map: [${this.blunder.currentPoint.character}]`
          );
        break;
    }
  };

  ChangeDirectionExplicitly = (): void => {
    switch (this.blunder.currentPoint.character) {
      case "N":
        this.blunder.currentDirection = DIRECTIONS.NORTH;
        break;
      case "E":
        this.blunder.currentDirection = DIRECTIONS.EAST;
        break;
      case "S":
        this.blunder.currentDirection = DIRECTIONS.SOUTH;
        break;
      case "W":
        this.blunder.currentDirection = DIRECTIONS.WEST;
        break;
      default:
        break;
    }
  };

  public printPath = (extended: boolean = false) => {
    if (!extended)
      for (let p of this.blunder.path) console.log(DIRECTIONS[p.direction]);
    else {
      for (let i = 1; i < this.blunder.path.length; i++)
        console.log(
          "FROM " +
            this.blunder.path[i - 1].point.toString() +
            " [" +
            this.blunder.path[i - 1].point.character +
            "]  " +
            "  -  TO " +
            this.blunder.path[i].point.toString() +
            " [" +
            this.blunder.path[i].point.character +
            "]  " +
            "  -  DIRECTION = " +
            DIRECTIONS[this.blunder.path[i - 1].direction]
        );
    }
  };
}

export default Brain;
