import { readFileSync } from "fs";


const input = readFileSync("./input.txt", "utf-8");
const lines = input.trim().split("\n");

// Part 1
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




function solver(isMostCommon: boolean): any{
  let iteration = lines; 
  for (let i = 0; i < lines[0].length; i++){
    let numberOfOccurrences: {[key: string]: any[]} = {"zero": [], "one": []}; 
    for (let j = 0; j < iteration.length; j++){
      let currBit = iteration[j][i];
      if (currBit === "0"){
        currBit = "zero"; 
      }
      else {
        currBit = "one";
      }
      numberOfOccurrences[currBit].push(iteration[j]);
    }

    if (iteration.length === 1) return iteration; 

    let zeroBitOcc = true; 

    if (numberOfOccurrences["zero"].length > numberOfOccurrences["one"].length){
      zeroBitOcc = true; 
    }
    else {
      zeroBitOcc = false; 
    }

    if (isMostCommon){
      iteration = zeroBitOcc ? numberOfOccurrences["zero"] : numberOfOccurrences["one"]; 
    }
    else {
      iteration = zeroBitOcc ? numberOfOccurrences["one"] : numberOfOccurrences["zero"]; 
    }
  }
  return iteration; 
}

console.log(parseInt(solver(true), 2));
console.log(parseInt(solver(false), 2));
console.log(parseInt(solver(true), 2)*parseInt(solver(false), 2));