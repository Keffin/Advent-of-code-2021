import { table } from "console";
import { readFileSync } from "fs";

const input = readFileSync("./input.txt", "utf-8");
const lines = input.trim().split("\n");

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
  let l = [];
  if (lines[i] !== "") {
    l.push(
      lines[i]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    l.push(
      lines[i + 1]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    l.push(
      lines[i + 2]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    l.push(
      lines[i + 3]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    l.push(
      lines[i + 4]
        .split(/(\s+)/)
        .filter((e) => e.trim().length > 0)
        .map((x) => makeCell(x))
    );
    matrixOfMatrixes.push(l);
  }
}

let OGLen = matrixOfMatrixes.length;
let matrix2 = [...matrixOfMatrixes];

function markMatrix(matrix: any[][][], markedNum: number) {
  matrix.forEach((inner) => {
    inner.forEach((row) =>
      row.forEach((cell) => {
        if (parseInt(cell.value) === markedNum && cell.marked === false) {
          cell.marked = true;
        }
      })
    );
  });
}

let winIndex = 0;

function fiveInARow(matrix: any[][][]) {
  for (const m of matrix) {
    for (const row of m) {
      if (row.every((item) => item.marked)) {
        return { found: true, row: row, rowWin: true, colWin: false };
      }
    }
  }
  for (const m of matrix) {
    for (let i = 0; i < m[0].length; i++) {
      const elements = m.map((row) => row[i]);
      if (elements.every((item) => item.marked)) {
        let winRow: any[] = [];
        m.map((row) => {
          winRow.push(row);
        });
        return {
          found: true,
          row: elements,
          winTable: winRow,
          rowWin: false,
          colWin: true,
        };
      }
    }
  }

  return { found: false, row: "undefined" };
}

let won = false;
let winningTable: any[] = [];
let winNum = 0;

for (let i = 0; i < playerNumbers.length; i++) {
  for (let j = 0; j < matrixOfMatrixes.length; j++) {
    for (let k = 0; k < matrixOfMatrixes[j].length; k++) {
      markMatrix(matrixOfMatrixes, playerNumbers[i]);
      let { found, row, winTable, rowWin, colWin } =
        fiveInARow(matrixOfMatrixes);

      if (found) {
        won = true;
        winNum = playerNumbers[i];
        //console.log(winTable);
        if (rowWin) {
          winningTable = matrixOfMatrixes.find((elem: any[]) => {
            elem.includes(row);
          });
        }
        if (colWin) {
          matrixOfMatrixes.forEach((table: any[][]) => {
            table.forEach((t, index) => {
              if (t === winTable[index]) {
                winningTable.push(winTable[index]);
              }
            });
          });
        }
        break;
      }
    }
    if (won) {
      break;
    }
  }
  if (won) {
    break;
  }
}

let counter = 0;
winningTable.forEach((item: any) => {
  item.forEach((i: any) => {
    if (!i.marked) {
      counter += parseInt(i.value);
    }
  });
});
console.log(counter * winNum);

let won2 = false;
let winningTable2: any[] = [];
let winNum2 = 0;
let index = 0;
let done = false;
for (let i = 0; i < playerNumbers.length; i++) {
  for (let j = 0; j < matrix2.length; j++) {
    for (let k = 0; k < matrix2[j].length; k++) {
      markMatrix(matrix2, playerNumbers[i]);
      let { found, row, winTable, rowWin, colWin } = fiveInARow(matrix2);

      if (found) {
        won2 = true;
        winNum2 = playerNumbers[i];
        //console.log(winTable);
        if (rowWin) {
          winningTable2.push(row);
        }
        if (colWin) {
          winningTable2.push(winTable);
          index++;
        }
        if (winningTable2.length === matrix2.length) {
          done = true;
          winNum2 = playerNumbers[i];
          break;
        }
        break;
      }
      if (done) break;
    }
    if (done) break;
    if (won) {
      break;
    }
  }
}
console.log(winningTable2.length);
console.log(winningTable2[winningTable2.length - 1]);

let c = 0;
winningTable2.forEach((item: any) => {
  c += i);
});
console.log(c * winNum2);
/*let counter = 0;
winningTable.forEach((item: any) => {
  item.forEach((i: any) => {
    if (!i.marked) {
      counter += parseInt(i.value);
    }
  });
});
console.log(counter * winNum);*/
