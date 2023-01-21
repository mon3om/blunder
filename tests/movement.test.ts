import Blunder, { State } from "../src/Blunder/Blunder";
import Movement, { Direction } from "../src/Blunder/Movement";
import Point from "../src/Map/Point";

describe("Movement test - straight line (E)", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["@ "]);

  it("should return a State object with 'currentPosition' value set to (1, 0)", () => {
    expect(
      movement
        .move(Direction.EAST, blunder.state, blunder.blunderMap)
        .currentPoint.comparePoint(new Point(" ", 1, 0))
    ).toBeTruthy();
  });
});

describe("Movement test - straight line (W)", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder([" @"]);

  it("should return a State object with 'currentPosition' value set to (0, 0)", () => {
    expect(
      movement
        .move(Direction.WEST, blunder.state, blunder.blunderMap)
        .currentPoint.comparePoint(new Point(" ", 0, 0))
    ).toBeTruthy();
  });
});

describe("Movement test - straight line (N)", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["  ", "@ "]);

  it("should return a State object with 'currentPosition' value set to (0, 0)", () => {
    expect(
      movement
        .move(Direction.NORTH, blunder.state, blunder.blunderMap)
        .currentPoint.comparePoint(new Point(" ", 0, 0))
    ).toBeTruthy();
  });
});

describe("Movement test - straight line (S)", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["@ ", "  "]);

  it("should return a State object with 'currentPosition' value set to (0, 1)", () => {
    expect(
      movement
        .move(Direction.SOUTH, blunder.state, blunder.blunderMap)
        .currentPoint.comparePoint(new Point(" ", 0, 1))
    ).toBeTruthy();
  });
});

describe("Get next direction based on obstacles and state - # obstacles", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["   ", "#@#", "###"]);

  it("should return a Direction equal to Direction.NORTH", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.NORTH);
  });
});

describe("Get next direction based on obstacles and state - # obstacles", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["###", "#@#", "# #"]);
  blunder.state.currentDirection = Direction.EAST;

  it("should return a Direction equal to Direction.SOUTH", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.SOUTH);
  });
});

describe("Get next direction based on obstacles and state - # obstacles", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["#@ ", "###"]);

  it("should return a Direction equal to Direction.EAST", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.EAST);
  });
});

describe("Get next direction based on obstacles and state - # obstacles", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["###", " @#", "###"]);

  it("should return a Direction equal to Direction.WEST", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.WEST);
  });
});

describe("Get next direction based on obstacles and state - # obstacles", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["###", " @#", "###"]);

  it("should return a Direction equal to Direction.WEST", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.WEST);
  });
});

describe("Get next direction based on obstacles and state - X obstacles and Breaker Mode On", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["###", "#@#", "#X#"]);
  blunder.state.breakerMode = true;
  blunder.state.currentDirection = Direction.EAST;

  it("should return a Direction equal to Direction.SOUTH", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.SOUTH);
  });
});

describe("Get next direction based on obstacles and state - X obstacles and Breaker Mode On", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["#@X", "###"]);
  blunder.state.breakerMode = true;

  it("should return a Direction equal to Direction.EAST", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.EAST);
  });
});

describe("Get next direction based on obstacles and state - X obstacles and Breaker Mode On", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["###", "X@#", "###"]);
  blunder.state.breakerMode = true;

  it("should return a Direction equal to Direction.WEST", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.WEST);
  });
});

describe("Get next direction based on obstacles and state - X obstacles and Breaker Mode On", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["###", "X@#", "###"]);
  blunder.state.breakerMode = true;

  it("should return a Direction equal to Direction.WEST", () => {
    expect(
      movement.getNextDirection(blunder.state, blunder.blunderMap)
    ).toEqual(Direction.WEST);
  });
});

describe("Teleport", () => {
  // Instantiate required classes
  let movement: Movement = new Movement();
  let blunder: Blunder = new Blunder(["T##", "###", "##T"]);

  it("should return the other Portal point in the map", () => {
    expect(
      movement
        .teleport(new Point("T", 0, 0), blunder.blunderMap)
        .comparePoint(new Point("T", 2, 2))
    ).toBeTruthy();
  });
});
