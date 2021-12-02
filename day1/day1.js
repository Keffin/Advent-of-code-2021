const fs = require("fs");
const input = fs.readFileSync("./input1.txt", 'utf-8'); 
const lines = input.trim().split("\n").map((x)=>parseInt(x)); 

// Part 1:
let c = 0;

for (let i = 0; i < lines.length - 1; ++i) {
  if (lines[i] < lines[i + 1]) {
    c++;
  }
}
console.log(c);

// Part 2:
let k = 0;

for (let i = 0; i < lines.length - 2; ++i) {
  if (
    lines[i] + lines[i + 1] + lines[i + 2] >
    lines[i] + lines[i - 1] + lines[i + 1]
  ) {
    k++;
  }
}
console.log(k);
