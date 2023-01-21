import Blunder from "./Blunder/Blunder";

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
