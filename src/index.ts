import Blunder from "./blunder/blunder";

let map = [
  "##########",
  "#        #",
  "#  @     #",
  "#  B     #",
  "#  S   W #",
  "# XXX    #",
  "#  B   N #",
  "# XXXXXXX#",
  "#       $#",
  "##########",
];

new Blunder(map).startMoving();
