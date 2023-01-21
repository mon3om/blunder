import Blunder from "../src/blunder/Blunder";
import { Direction } from "../src/blunder/Movement";
import BlunderMap from "../src/Map/Map";
import Point from "../src/Map/Point";

describe("Get point by direction and current position", () => {
  // Instantiate required classes
  let map: BlunderMap = new BlunderMap(["T#@N ", "ES W#", "$#TIB"]);
  let blunder: Blunder = new Blunder(["T#@N ", "ES W#", "$#TIB"]);

  it("should return a Point", () => {
    expect(
      map
        .getPoint(Direction.EAST, blunder.state.currentPoint)
        .comparePoint(new Point("N", 3, 0))
    ).toBeTruthy();
  });
});

describe("Remove Obstacle from a map permanently", () => {
  // Instantiate required classes
  let map: BlunderMap = new BlunderMap(["X#@N "]);

  it("should return a Point", () => {
    map.removeObstacle(new Point("X", 0, 0));
    expect((map["mapArray"] as string[])[0]).toEqual(" #@N ");
  });
});

describe("Get all Portals in a map", () => {
  // Instantiate required classes
  let map: BlunderMap = new BlunderMap(["T##N ", "ES W#", "##TIB"]);

  it("should return an array holding all T points", () => {
    expect(
      ((map["getPointByValue"]("T", true) as Point[])[0] as Point).comparePoint(
        new Point("T", 0, 0)
      )
    ).toBeTruthy();
    expect(
      ((map["getPointByValue"]("T", true) as Point[])[1] as Point).comparePoint(
        new Point("T", 2, 2)
      )
    ).toBeTruthy();
  });
});

describe("Get Start point in a map", () => {
  // Instantiate required classes
  let map: BlunderMap = new BlunderMap(["T#@N ", "ES W#", "##TIB"]);

  it("should return @ point", () => {
    expect(
      (map["getPointByValue"]("@") as Point).comparePoint(new Point("@", 2, 0))
    ).toBeTruthy();
  });
});

describe("Get End point in a map", () => {
  // Instantiate required classes
  let map: BlunderMap = new BlunderMap(["T#@N ", "ES W#", "$#TIB"]);

  it("should return $ point", () => {
    expect(
      (map["getPointByValue"]("$") as Point).comparePoint(new Point("$", 0, 2))
    ).toBeTruthy();
  });
});

describe("Get point by position", () => {
  // Instantiate required classes
  let map: BlunderMap = new BlunderMap(["T#@N ", "ES W#", "$#TIB"]);

  it("should return point(x=1, y=1) and character = S", () => {
    expect(
      (map["getPointByPosition"](1, 1) as Point).comparePoint(
        new Point("S", 1, 1)
      )
    ).toBeTruthy();
  });
});

describe("Get point by position", () => {
  // Instantiate required classes
  let map: BlunderMap = new BlunderMap(["T#@N ", "ES W#", "$#TIB"]);

  it("should throw an error because the wanted point is out of boundaries of the map", () => {
    try {
      map["getPointByPosition"](10, 1);
    } catch (error) {
      expect(error.message).toContain("Point out of map boundaries");
    }
  });
});
