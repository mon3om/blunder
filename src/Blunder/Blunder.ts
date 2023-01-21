import BlunderMap from "../map/map";
import Point from "../map/point";
import Brain from "./brain";
import Movement, { Direction } from "./movement";

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

export default Blunder;
