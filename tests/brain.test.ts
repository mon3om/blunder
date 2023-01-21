import Blunder, { Path, State } from "../src/Blunder/Blunder";
import Brain from "../src/Blunder/Brain";
import { Direction } from "../src/Blunder/Movement";
import Point from "../src/Map/Point";

describe("Loop identifier (with a loop)", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();

  // Array of Path containing a loop
  let path: Path[] = [
    { point: new Point("E", 1, 1), direction: Direction.EAST },
    { point: new Point(" ", 2, 1), direction: Direction.EAST },
    { point: new Point(" ", 3, 1), direction: Direction.EAST },
    { point: new Point("S", 4, 1), direction: Direction.SOUTH },
    { point: new Point(" ", 4, 2), direction: Direction.SOUTH },
    { point: new Point(" ", 4, 3), direction: Direction.SOUTH },
    { point: new Point("W", 4, 4), direction: Direction.WEST },
    { point: new Point(" ", 3, 4), direction: Direction.WEST },
    { point: new Point(" ", 2, 4), direction: Direction.WEST },
    { point: new Point("N", 1, 4), direction: Direction.NORTH },
    { point: new Point(" ", 1, 3), direction: Direction.NORTH },
    { point: new Point(" ", 1, 2), direction: Direction.NORTH },
    { point: new Point("E", 1, 1), direction: Direction.EAST },
    { point: new Point(" ", 2, 1), direction: Direction.EAST },
    { point: new Point(" ", 3, 1), direction: Direction.EAST },
    { point: new Point("S", 4, 1), direction: Direction.SOUTH },
    { point: new Point(" ", 4, 2), direction: Direction.SOUTH },
    { point: new Point(" ", 4, 3), direction: Direction.SOUTH },
    { point: new Point("W", 4, 4), direction: Direction.WEST },
    { point: new Point(" ", 3, 4), direction: Direction.WEST },
    { point: new Point(" ", 2, 4), direction: Direction.WEST },
    { point: new Point("N", 1, 4), direction: Direction.NORTH },
    { point: new Point(" ", 1, 3), direction: Direction.NORTH },
    { point: new Point(" ", 1, 2), direction: Direction.NORTH },
    { point: new Point("E", 1, 1), direction: Direction.EAST },
  ];
  it("should identify a loop in an array of Paths {point:Point, direction: Direction}", () => {
    expect(brain.checkForInfiniteLoop(path)).toBeTruthy();
  });
});

describe("Loop identifier (without a loop)", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();

  // Array of Path containing a loop
  let path: Path[] = [
    { point: new Point("E", 1, 1), direction: Direction.EAST },
    { point: new Point(" ", 2, 1), direction: Direction.EAST },
    { point: new Point(" ", 3, 1), direction: Direction.EAST },
    { point: new Point("S", 4, 1), direction: Direction.SOUTH },
    { point: new Point(" ", 4, 2), direction: Direction.SOUTH },
    { point: new Point(" ", 4, 3), direction: Direction.SOUTH },
    { point: new Point("W", 4, 4), direction: Direction.WEST },
    { point: new Point(" ", 3, 4), direction: Direction.WEST },
    { point: new Point(" ", 2, 4), direction: Direction.WEST },
    { point: new Point("N", 1, 4), direction: Direction.NORTH },
    { point: new Point(" ", 1, 3), direction: Direction.NORTH },
    { point: new Point(" ", 1, 2), direction: Direction.NORTH },
    { point: new Point("E", 1, 1), direction: Direction.EAST },
    { point: new Point(" ", 2, 1), direction: Direction.EAST },
    { point: new Point(" ", 3, 1), direction: Direction.EAST },
    { point: new Point("S", 4, 1), direction: Direction.SOUTH },
    { point: new Point(" ", 4, 2), direction: Direction.SOUTH },
    { point: new Point(" ", 4, 3), direction: Direction.SOUTH },
    { point: new Point("W", 4, 4), direction: Direction.WEST },
    { point: new Point(" ", 3, 4), direction: Direction.WEST },
    { point: new Point(" ", 2, 4), direction: Direction.WEST },
    { point: new Point("N", 1, 4), direction: Direction.NORTH },
    { point: new Point(" ", 1, 3), direction: Direction.NORTH },
    { point: new Point(" ", 1, 2), direction: Direction.NORTH },
  ];
  it("should return false since no loop is in the array of Paths {point:Point, direction: Direction}", () => {
    expect(brain.checkForInfiniteLoop(path)).toBeFalsy();
  });
});

describe("Special behaviour - Breaker Mode Off", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    breakerMode: false,
    currentPoint: new Point("B", 0, 0),
  };

  it("should return a State object with 'breakerMode' value set to true", () => {
    expect(brain.checkForSpecialBehaviour(state).breakerMode).toBeTruthy();
  });
});

describe("Special behaviour - Breaker Mode On", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    breakerMode: true,
    currentPoint: new Point("B", 0, 0),
  };

  it("should return a State object with 'breakerMode' value set to false", () => {
    expect(brain.checkForSpecialBehaviour(state).breakerMode).toBeFalsy();
  });
});

describe("Special behaviour - Direction reverse", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    currentPoint: new Point("I", 0, 0),
  };

  it("should return a State object with 'directions' array reversed", () => {
    // Using JSON.stringify to check that the order of the array is actually reversed
    expect(
      JSON.stringify(brain.checkForSpecialBehaviour(state).directions)
    ).toEqual(JSON.stringify(new Blunder([""]).state.directions.reverse()));
  });
});

describe("Special behaviour - Breaker Mode On in X point", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    breakerMode: true,
    currentPoint: new Point("X", 0, 0),
  };

  it("should return a State object with 'willDestroyObstacle' value set to true", () => {
    expect(brain.checkForSpecialBehaviour(state).breakerMode).toBeTruthy();
  });
});

describe("Special behaviour - End reached", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    breakerMode: true,
    currentPoint: new Point("$", 0, 0),
  };

  it("should return a State object with 'endReached' value set to true", () => {
    expect(brain.checkForSpecialBehaviour(state).endReached).toBeTruthy();
  });
});

describe("Special behaviour - Teleport", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    currentPoint: new Point("T", 0, 0),
  };

  it("should return a State object with 'willTeleport' value set to true", () => {
    expect(brain.checkForSpecialBehaviour(state).willTeleport).toBeTruthy();
  });
});

describe("Special behaviour - Explicit direction change (E)", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    currentDirection: Direction.SOUTH,
    currentPoint: new Point("E", 0, 0),
  };

  it("should return a State object with 'currentDirection' value set to Direction.EAST", () => {
    expect(brain.checkForSpecialBehaviour(state).currentDirection).toEqual(
      Direction.EAST
    );
  });
});

describe("Special behaviour - Explicit direction change (W)", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    currentDirection: Direction.SOUTH,
    currentPoint: new Point("W", 0, 0),
  };

  it("should return a State object with 'currentDirection' value set to Direction.WEST", () => {
    expect(brain.checkForSpecialBehaviour(state).currentDirection).toEqual(
      Direction.WEST
    );
  });
});

describe("Special behaviour - Explicit direction change (N)", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    currentDirection: Direction.SOUTH,
    currentPoint: new Point("N", 0, 0),
  };

  it("should return a State object with 'currentDirection' value set to Direction.NORTH", () => {
    expect(brain.checkForSpecialBehaviour(state).currentDirection).toEqual(
      Direction.NORTH
    );
  });
});

describe("Special behaviour - Explicit direction change (S)", () => {
  // Instantiate required classes
  let brain: Brain = new Brain();
  let blunder: Blunder = new Blunder([""]);
  let state: State = {
    ...blunder.state,
    currentDirection: Direction.WEST,
    currentPoint: new Point("S", 0, 0),
  };

  it("should return a State object with 'currentDirection' value set to Direction.SOUTH", () => {
    expect(brain.checkForSpecialBehaviour(state).currentDirection).toEqual(
      Direction.SOUTH
    );
  });
});
