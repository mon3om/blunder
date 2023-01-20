import BlunderMap from "../Map/Map";
import Point from "../Map/Point";
import Blunder from "./Blunder";

export enum DIRECTIONS {
  SOUTH,
  EAST,
  NORTH,
  WEST,
}

class Movement {
  private blunder: Blunder;

  public constructor(blunder: Blunder) {
    this.blunder = blunder;
  }

  public Move = (direction: DIRECTIONS): void => {
    let newPosition: Point;
    if (this.blunder.explicitDirection) {
      newPosition = BlunderMap.Instance.GetPoint(this.blunder.currentDirection);
      this.blunder.explicitDirection = false;
    } else newPosition = BlunderMap.Instance.GetPoint(direction);

    // Add current position an direction to the path
    this.blunder.path.push({
      point: this.blunder.currentPoint,
      direction: this.blunder.explicitDirection
        ? this.blunder.currentDirection
        : direction,
    });

    this.blunder.currentPoint = newPosition;
  };

  GetNextDirection = (): DIRECTIONS => {
    let nextPoint: Point;
    let nextDirection: DIRECTIONS = null;

    if (this.blunder.explicitDirection) {
      this.blunder.explicitDirection = false;

      return this.blunder.currentDirection;
    }

    // Check if Blunder can move in the same direction
    nextPoint = BlunderMap.Instance.GetPoint(this.blunder.currentDirection);

    if (nextPoint.IsPointAccessible()) {
      nextDirection = this.blunder.currentDirection;
    }

    // Get the next direction based on priority and accessibility
    for (let i = 0; i < 4; i++) {
      if (nextDirection != null) break;
      nextPoint = BlunderMap.Instance.GetPoint(this.blunder.directions[i]);
      if (nextPoint.IsPointAccessible()) {
        nextDirection = this.blunder.directions[i];
        break;
      }
    }

    // console.log(
    //   this.blunder.currentPoint.toString() +
    //     " -- Next = " +
    //     nextPoint.toString() +
    //     " |" +
    //     nextPoint.character +
    //     "| " +
    //     " ACCESSIBLE = " +
    //     nextPoint.IsPointAccessible() +
    //     "  --  DIRECTION = " +
    //     DIRECTIONS[this.blunder.currentDirection]
    // );

    this.blunder.currentDirection = nextDirection;
    return nextDirection;
  };

  public Teleport = (): void => {
    if (this.blunder.currentPoint.ComparePoint(BlunderMap.portals[0]))
      this.blunder.currentPoint = BlunderMap.portals[1];
    else this.blunder.currentPoint = BlunderMap.portals[0];
  };
}

export default Movement;
