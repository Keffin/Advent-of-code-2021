import { readFileSync } from 'fs';

const input = readFileSync("./input2.txt", 'utf-8'); 
const lines = input.trim().split("\n"); 

enum DIRECTION {
  UP = "up",
  DOWN = "down",
  FORWARD = "forward",
}

interface submarine {
  finalDepth: number;
  depth: number;
  horizontal: number;
}

let sub: submarine = {
  finalDepth: 0,
  depth: 0,
  horizontal: 0,
};

for (let i = 0; i < lines.length; i++) {
  let x = lines[i].split(" ");

  if (x[0] === DIRECTION.UP) {
    sub.depth -= parseInt(x[1]);
  }
  if (x[0] === DIRECTION.DOWN) {
    sub.depth += parseInt(x[1]);
  }
  if (x[0] === DIRECTION.FORWARD) {
    sub.horizontal += parseInt(x[1]);
  }
}
sub.finalDepth = sub.depth * sub.horizontal;
console.log(sub);

// Part 2:
interface newSub extends submarine {
  aim: number;
}

let sub2: newSub = {
  finalDepth: 0,
  depth: 0,
  horizontal: 0,
  aim: 0,
};

for (let i = 0; i < lines.length; i++) {
  let x = lines[i].split(" ");

  if (x[0] === DIRECTION.UP) {
    sub2.aim -= parseInt(x[1]);
  }
  if (x[0] === DIRECTION.DOWN) {
    sub2.aim += parseInt(x[1]);
  }
  if (x[0] === DIRECTION.FORWARD) {
    sub2.horizontal += parseInt(x[1]);
    sub2.depth += sub2.aim * parseInt(x[1]);
  }
}
sub2.finalDepth = sub2.depth * sub2.horizontal;
console.log(sub2);
