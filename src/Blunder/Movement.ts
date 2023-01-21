import BlunderMap from "../map/map";
import Point from "../map/point";
import Blunder, { State } from "./blunder";

export enum Direction {
  SOUTH,
  EAST,
  NORTH,
  WEST,
}

class Movement {
  public move = (
    direction: Direction,
    state: State,
    map: BlunderMap
  ): State => {
    let tempState = { ...state };
    let newPosition: Point;

    newPosition = map.getPoint(direction, state.currentPoint);
    tempState.currentPoint = newPosition;

    return tempState;
  };

  public getNextDirection = (state: State, map: BlunderMap): Direction => {
    let nextPoint: Point;
    let nextDirection: Direction = null;

    // Check if Blunder can move in the same direction
    nextPoint = map.getPoint(state.currentDirection, state.currentPoint);
    if (nextPoint.isPointAccessible(state)) {
      nextDirection = state.currentDirection;
      return nextDirection;
    }

    // Get the next direction based on priority and accessibility
    for (let i = 0; i < 4; i++) {
      nextPoint = map.getPoint(state.directions[i], state.currentPoint);
      if (nextPoint.isPointAccessible(state)) {
        nextDirection = state.directions[i];
        break;
      }
    }

    return nextDirection;
  };

  public teleport = (currentPortal: Point, map: BlunderMap): Point => {
    let newPosition: Point;
    if (currentPortal.comparePoint(map.portals[0]))
      newPosition = map.portals[1];
    else newPosition = map.portals[0];

    return newPosition;
  };

  public static changeDirectionExplicitly = (state: State): Direction => {
    let newDir: Direction;
    switch (state.currentPoint.character) {
      case "N":
        newDir = Direction.NORTH;
        break;
      case "E":
        newDir = Direction.EAST;
        break;
      case "S":
        newDir = Direction.SOUTH;
        break;
      case "W":
        newDir = Direction.WEST;
        break;
      default:
        throw new Error(
          `Unexpected character: Expected: [N, E, S, W], found: ${state.currentPoint.character}`
        );
    }

    return newDir;
  };
}

export default Movement;
