/**
 * Copy and paste the content of this file in Coding Games IDE after clearing it
 */

export type Path = {
  point: Point;
  direction: Direction;
};

export type State = {
  currentDirection: Direction;
  currentPoint: Point;
  breakerMode: boolean;
  willDestroyObstacle: boolean;
  willTeleport: boolean;
  directions: Direction[];
  path: Path[];
  endReached: boolean;
};

class Blunder {
  // Blunder parts
  public movement: Movement;
  public brain: Brain;
  public state: State;
  public blunderMap: BlunderMap;

  constructor(mapArray: string[]) {
    // Init the map
    this.blunderMap = new BlunderMap(mapArray);

    // Init Blunder state
    this.state = {
      currentDirection: Direction.SOUTH,
      breakerMode: false,
      endReached: false,
      directions: [
        Direction.SOUTH,
        Direction.EAST,
        Direction.NORTH,
        Direction.WEST,
      ],
      willTeleport: false,
      currentPoint: this.blunderMap.startPoint,
      path: [],
      willDestroyObstacle: false,
    };

    // Init blunder parts
    this.movement = new Movement();
    this.brain = new Brain();
  }

  private printPath = (state: State) => {
    for (let p of state.path) console.log(Direction[p.direction]);
  };

  private addToPath = (state: State): Path[] => {
    let tempPath: Path[] = [
      ...state.path,
      { point: state.currentPoint, direction: state.currentDirection },
    ];
    return tempPath;
  };

  public startMoving = (): void => {
    while (!this.state.endReached) {
      // Get next direction
      let nextDir = this.movement.getNextDirection(this.state, this.blunderMap);

      // Move / Update position
      // Move / Update position
      this.state.currentDirection = nextDir;
      this.state = this.movement.move(
        this.state.currentDirection,
        this.state,
        this.blunderMap
      );

      // Track new position
      this.state.path = this.addToPath(this.state);

      // Check fo infinite loop
      if (this.brain.checkForInfiniteLoop(this.state.path)) {
        console.log("LOOP");
        return;
      }

      // Check for special behaviour in the new position and update the state
      this.state = this.brain.checkForSpecialBehaviour(this.state);

      // Teleport
      if (this.state.willTeleport) {
        this.state.currentPoint = this.movement.teleport(
          this.state.currentPoint,
          this.blunderMap
        );
        this.state.willTeleport = false;
      }

      // Destroy obstacle
      if (this.state.willDestroyObstacle) {
        this.blunderMap.removeObstacle(this.state.currentPoint);
        this.state.willDestroyObstacle = false;
      }
    } // End of while loop

    // End is reached
    this.printPath(this.state);
  };
}

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
}

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

var inputs: string[] = readline().split(" ");
const L: number = parseInt(inputs[0]);
const C: number = parseInt(inputs[1]);
let mapArray = [];
for (let i = 0; i < L; i++) {
  const row: string = readline();
  mapArray.push(row);
}

new Blunder(mapArray).startMoving();
