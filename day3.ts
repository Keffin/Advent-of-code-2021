import { readFileSync } from "fs";
import { exit } from "process";

const input = readFileSync("./input.txt", "utf-8");
const lines = input.trim().split("\n");

let g = "";
let e = "";

for (let i = 0; i < lines[0].length; i++) {
  let o = 0;
  let z = 0;

  for (let j = 0; j < lines.length; j++) {
    if (lines[j][i] === "1") o++;
    else z++;
  }
  if (o > z) {
    g += "1";
    e += "0";
  } else {
    g += "0";
    e += "1";
  }
}

console.log(parseInt(g, 2) * parseInt(e, 2));

const test = `00100
11110
10110
10111
10101
01111
00111
11100
10000
11001
00010
01010`;

// keep only numbers selected by bit criteria for type of rating value for which you are searching. Discartd numbers yhat do not match bit crieria
// if only one number left, stop. this is the rating value for which you are searching
// otherwise, repeat the process, considering the next bit to the right

// bit criteria depends in which type of rating value you want to find:

// To find OXYGEN GENERATOR rating:
// Determine the most common value (0 or 1) in the current bit position, and keep only numbers with that bit in that position
// if 0 and 1 are equally common keep values with a 1 in the position being considered.

// To find CO2 SCRUBBER RATING:
// Determine the least common value (0 or 1) in the current bit position. And keep only numbers with that bit in that position.
// If 0 and 1 are equally common keep values with a 0 in the position being considered.

let oxyList: Array<string> = test.split("\n");

const test2 = test.split("\n");
let zeroCountOxy = 0;
let oneCountOxy = 0;

for (let i = 0; i < test2[0].length; i++) {
  for (let j = 0; j < test2.length; j++) {
    if (test2[j][i] === "1") zeroCountOxy++;
    else oneCountOxy++;
  }
}
console.log(zeroCountOxy, oneCountOxy);
