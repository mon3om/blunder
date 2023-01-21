import Blunder from "../src/Blunder/Blunder";
import Point from "../src/Map/Point";

describe("Check if point is accessible - ( )", () => {
  // Instantiate required classes
  let point: Point = new Point(" ", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Check if point is accessible - (#)", () => {
  // Instantiate required classes
  let point: Point = new Point("#", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return false", () => {
    expect(point.isPointAccessible(blunder.state)).toBeFalsy();
  });
});

describe("Check if point is accessible - (X) without Breaker Mode", () => {
  // Instantiate required classes
  let point: Point = new Point("X", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return false", () => {
    expect(point.isPointAccessible(blunder.state)).toBeFalsy();
  });
});

describe("Check if point is accessible - (X) with Breaker Mode", () => {
  // Instantiate required classes
  let point: Point = new Point("X", 0, 0);
  let blunder: Blunder = new Blunder([""]);
  blunder.state.breakerMode = true;

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Check if point is accessible - (I)", () => {
  // Instantiate required classes
  let point: Point = new Point("I", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Check if point is accessible - (B)", () => {
  // Instantiate required classes
  let point: Point = new Point("B", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Check if point is accessible - (T)", () => {
  // Instantiate required classes
  let point: Point = new Point("T", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Check if point is accessible - (E)", () => {
  // Instantiate required classes
  let point: Point = new Point("E", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Check if point is accessible - (W)", () => {
  // Instantiate required classes
  let point: Point = new Point("W", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Check if point is accessible - (S)", () => {
  // Instantiate required classes
  let point: Point = new Point("S", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Check if point is accessible - (N)", () => {
  // Instantiate required classes
  let point: Point = new Point("N", 0, 0);
  let blunder: Blunder = new Blunder([""]);

  it("should return true", () => {
    expect(point.isPointAccessible(blunder.state)).toBeTruthy();
  });
});

describe("Compare two points", () => {
  // Instantiate required classes
  let point: Point = new Point(" ", 0, 0);
  let point1: Point = new Point(" ", 0, 0);

  it("should return true", () => {
    expect(point.comparePoint(point1)).toBeTruthy();
  });
});

describe("Compare two points", () => {
  // Instantiate required classes
  let point: Point = new Point(" ", 0, 0);
  let point1: Point = new Point(" ", 1, 0);

  it("should return false", () => {
    expect(point.comparePoint(point1)).toBeFalsy();
  });
});
