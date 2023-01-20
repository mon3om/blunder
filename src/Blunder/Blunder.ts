import BlunderMap from "../Map/Map";
import Point from "../Map/Point";
import Brain from "./Brain";
import Movement, { DIRECTIONS } from "./Movement";

export type Path = {
  point: Point;
  direction: DIRECTIONS;
};

class Blunder {
  // Blunder parts
  public movement: Movement;
  public brain: Brain;

  // Directions
  public currentDirection: DIRECTIONS = DIRECTIONS.SOUTH;
  public prioritiesInversed: boolean;
  public explicitDirection: boolean = false;
  public directions = [
    DIRECTIONS.SOUTH,
    DIRECTIONS.EAST,
    DIRECTIONS.NORTH,
    DIRECTIONS.WEST,
  ];
  public currentPoint: Point;

  public path: Path[] = [];
  public endReached: boolean = false;

  public breakerMode: boolean = false;

  // Singleton
  static Instance: Blunder;

  constructor(mapArray: string[]) {
    // Init the map
    new BlunderMap(mapArray);

    this.currentPoint = BlunderMap.StartPoint;

    // Init blunder parts
    this.movement = new Movement(this);
    this.brain = new Brain(this);
    Blunder.Instance = this;
  }

  public StartMoving = (): void => {
    this.currentPoint = BlunderMap.StartPoint;
    while (!this.endReached) {
      if (this.brain.CheckForInfiniteLoop()) {
        console.log("LOOP");
        return;
      }

      // Calculate next direction based on priorities, power ups and obstacles
      let nextDir = this.movement.GetNextDirection();
      this.movement.Move(nextDir);
      this.brain.CheckForSpecialBehaviour();
    }

    // End is reached
    this.brain.printPath();
  };
}

export default Blunder;
