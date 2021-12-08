import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");
const lines = input.trim().split("\n");

interface Cell {
  xCord: number;
  yCord: number;
}

const map: number[][] = new Array(1000)
  .fill(0)
  .map((_) => new Array(1000).fill(0));

for (const i of lines) {
  const [x1y1, x2y2] = i.split("->");
  const [x1, y1] = x1y1.split(",");
  const [x2, y2] = x2y2.split(",");

  const cell1: Cell = {
    xCord: parseInt(x1),
    yCord: parseInt(y1),
  };
  const cell2: Cell = {
    xCord: parseInt(x2),
    yCord: parseInt(y2),
  };

  if (cell1.xCord === cell2.xCord) {
    if (cell1.yCord > cell2.yCord) {
      for (let i = cell2.yCord; i <= cell1.yCord; i++) {
        map[i][cell1.xCord]++;
      }
    } else {
      for (let i = cell1.yCord; i <= cell2.yCord; i++) {
        map[i][cell1.xCord]++;
      }
    }
  } else if (cell1.yCord === cell2.yCord) {
    if (cell1.xCord > cell2.xCord) {
      for (let i = cell2.xCord; i <= cell1.xCord; i++) {
        map[cell1.yCord][i]++;
      }
    } else {
      for (let i = cell1.xCord; i <= cell2.xCord; i++) {
        map[cell1.yCord][i]++;
      }
    }
  }
  // In case it is diagonal, we wan't to traverse the coordinate system differently.
  else {
    if (cell1.yCord > cell2.yCord) {
      let j = cell1.xCord;
      // Think like a downward staircase
      if (cell1.xCord > cell2.xCord) {
        for (let i = cell1.yCord; i >= cell2.yCord; i--, j--) {
          map[i][j]++;
        }
      } else {
        for (let i = cell1.yCord; i >= cell2.yCord; i--, j++) {
          map[i][j]++;
        }
      }
    } else {
      let j = cell1.xCord;
      if (cell1.xCord > cell2.xCord) {
        for (let i = cell1.yCord; i <= cell2.yCord; i++, j--) {
          map[i][j]++;
        }
      } else {
        for (let i = cell1.yCord; i <= cell2.yCord; i++, j++) {
          map[i][j]++;
        }
      }
    }
  }
}

let counter = 0;
for (const row of map) {
  for (const cell of row) {
    if (cell >= 2) counter++;
  }
}
console.log(counter);
