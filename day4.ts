import { readFileSync } from "fs";

//const input = readFileSync("./input.txt", "utf-8");
//const lines = input.trim().split("\n");

const input = `7,4,9,5,11,17,23,2,0,14,21,24,10,16,13,6,15,25,12,22,18,20,8,19,3,26,1

22 13 17 11  0
 8  2 23  4 24
21  9 14 16  7
 6 10  3 18  5
 1 12 20 15 19

 3 15  0  2 22
 9 18 13 17  5
19  8  7 25 23
20 11 10 24  4
14 21 16 12  6

14 21 17 24  4
10 16 15  9 19
18  8 23 26 20
22 11 13  6  5
 2  0 12  3  7`;

const lines = input.trim().split("\n");
//console.log(lines);

//console.log(lines[2].split(/(\s+)/).filter((e) => e.trim().length > 0));

interface BingoCell {
  marked: boolean;
  value: number;
}

const playerNumbers = lines[0].split(",").map((x) => parseInt(x));

const matrixOfMatrixes: any = [];

const makeCell = (x: any): BingoCell => {
  return { marked: false, value: x };
};

for (let i = 2; i < lines.length - 1; i += 6) {
  if (lines[i] !== "") {
    matrixOfMatrixes.push(
      lines[i]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    matrixOfMatrixes.push(
      lines[i + 1]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    matrixOfMatrixes.push(
      lines[i + 2]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    matrixOfMatrixes.push(
      lines[i + 3]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    matrixOfMatrixes.push(
      lines[i + 4]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
  }
}

function markMatrix(matrix: any[][], markedNum: number) {
  matrix.forEach((row) => {
    row.forEach((cell) => {
      console.log(cell);
      if (parseInt(cell.value) === markedNum && cell.marked === false) {
        cell.marked = true;
      }
    });
  });
}

function fiveInARow(matrix: any[][]) {
  for (const row of matrix) {
    if (row.every((item) => item.marked)) {
      return true;
    }
  }
  for (let i = 0; i < matrix[0].length; i++) {
    const elements = matrix.map((row) => row[i]);
    if (elements.every((item) => item.marked)) {
      return true;
    }
  }
  return false;
}

for (let i = 0; i < playerNumbers.length; i++) {
  for (let j = 0; j < matrixOfMatrixes.length; j++) {
    markMatrix(matrixOfMatrixes, playerNumbers[i]);
    if (fiveInARow(matrixOfMatrixes)) {
      break;
    }
    break;
  }
}

/*playerNumbers.forEach((num) => {
  for (let i = 0; i < matrixOfMatrixes.length; i++) {
    markMatrix(matrixOfMatrixes, num);
    console.log(matrixOfMatrixes);
    if (fiveInARow(matrixOfMatrixes)) {
      break;
    }
    /*if (fiveInARow(matrixOfMatrixes)) {
      console.log("BINGO");
      break;
    }
  }
});*/

/*let c = 0;
for (let i = 0; i < matrixOfMatrixes.length; i++) {
  for (let j = 0; j < matrixOfMatrixes[0].length; j++) {
    if (matrixOfMatrixes[i][j].marked === false) {
      c += parseInt(matrixOfMatrixes[i][j].value);
    }
  }
}*/

/*


function run(input: any[], matrix: any[][]) {
  for (let i = 0; i < input.length; i++) {
    for (let j = 0; j < matrix.length; j++) {
      console.log(matrix[i][j]);
      markMatrix(matrix, i, j);
      const res = fiveInARow(matrix);
      if (res) {
        console.log("BINGO");
        console.log(input[i], matrix[i][j]);
      }
    }
  }
}

run(playerNumbers, matrixOfMatrixes);
//printMatrix(matrixOfMatrixes);
//console.log(matrixOfMatrixes);

function fiveInARow(matrix: any[][][], i: number, j: number, k: number) {
  if (
    matrix[i][j][k].marked &&
    matrix[i][j][k + 1].marked &&
    matrix[i][j][k + 2].marked &&
    matrix[i][j][k + 3].marked &&
    matrix[i][j][k + 4].marked
  ) {
    return true;
  } else {
    return false;
  }
}

playerNumbers.forEach((bingoNumber, index) => {
  for (let i = 0; i < matrixOfMatrixes.length; i++) {
    for (let j = 0; j < matrixOfMatrixes[i].length; j++) {
      for (let k = 0; k < matrixOfMatrixes[i][j].length; k++) {
        if (fiveInARow(matrixOfMatrixes, i, j, k)) {
          console.log("BINGO");
          break;
        }
        if (
          bingoNumber === parseInt(matrixOfMatrixes[i][j][k].value) &&
          matrixOfMatrixes[i][j][k].marked === false
        ) {
          matrixOfMatrixes[i][j][k].marked = true;
        }
      }
      console.log(matrixOfMatrixes[i][j]);
    }
  }
});

//printMatrix(matrixOfMatrixes);*/
