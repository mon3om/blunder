import { Path, State } from "./blunder";
import { Direction } from "./movement";

class Brain {
  public checkForInfiniteLoop = (path: Path[]): boolean => {
    let occ: number[] = [];

    // Get all occurences of path inside an array of path
    for (let i = 0; i < path.length; i++) {
      let pathPoint: Path = path[i];
      if (
        path[path.length - 1].point.comparePoint(pathPoint.point) &&
        path[path.length - 1].direction === pathPoint.direction
      )
        occ.push(i);
    }

    // If number of occurences is >= 3, then a loop is possible
    // Check all path points between fist and second occurences, and between second and third occurences
    // If they have the same exact points, then it's a loop
    if (occ.length > 2) {
      let checkedCounter = 0;
      let isLoop = true;

      let i = 0,
        j = 0;
      while (checkedCounter < occ.length - 1) {
        for (
          i = occ[checkedCounter] + 1, j = occ[checkedCounter + 1] + 1;
          j < occ[checkedCounter + 2];
          i++, j++
        ) {
          let p1 = path[i];
          let p2 = path[j];
          if (
            !p1.point.comparePoint(p2.point) ||
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

  public checkForSpecialBehaviour = (state: State): State => {
    switch (state.currentPoint.character) {
      case " ":
        break;
      case "@":
        break;
      case "B":
        state.breakerMode = !state.breakerMode;
        break;
      case "I":
        state.directions = state.directions.reverse();
        break;
      case "X":
        state.willDestroyObstacle = true;
        break;
      case "$":
        state.endReached = true;
        break;
      case "T":
        state.willTeleport = true;
        break;
      default:
        if ("NWES".indexOf(state.currentPoint.character) > -1) {
          state.currentDirection = this.changeDirectionExplicitly(state);
        } else
          throw new Error(
            `Unexpected value in the map: [${state.currentPoint.character}]`
          );
        break;
    }

    return state;
  };

  private changeDirectionExplicitly = (state: State): Direction => {
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

export default Brain;
