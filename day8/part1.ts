export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  const grid = data
		.split("\r\n")
		.map((m) => m.split("")
		.map((m2) => parseInt(m2)));

  let visibleTrees = [];
  for (let x = 1; x < grid.length - 1; x++) {
    const row = grid[x];
    for (let y = 1; y < row.length - 1; y++) {
      if (checkTreeVisibility(grid, x, y, true)) {
        const tree = grid[x][y];
        visibleTrees.push({ x, y, tree });
      }
    }
  }

  // adding outer trees
  for (let x = 0; x < grid.length; x++) {
    const row = grid[x];
    for (let y = 0; y < grid[0].length; y++) {
      const tree = row[y];
      if (x === 0 || x === grid.length - 1 || y === 0 || y === row.length - 1) {
        visibleTrees.push({ x, y, tree });
      }
    }
  }

  console.log(visibleTrees.length);
});

function checkTreeVisibility(
  grid: number[][],
  x: number,
  y: number,
  isVisible: boolean
) {
  const myTree = grid[x][y];
  if (myTree === 0) return !isVisible;

  let hiddenAngleCount = 0;

  // checking rows in the same column, above myTree
  for (let row = 0; row < x; row++) {
    const tree = grid[row][y];

    if (tree >= myTree) {
      hiddenAngleCount++;
      break;
    }
  }

  // checking rows in the same column, below myTree
  const rowCount = grid.length;
  for (let row = x + 1; row < rowCount; row++) {
    const tree = grid[row][y];

    if (tree >= myTree) {
      hiddenAngleCount++;
      break;
    }
  }

  // checking cols in the same row, left of myTree
  for (let col = 0; col < y; col++) {
    const tree = grid[x][col];

    if (tree >= myTree) {
      hiddenAngleCount++;
      break;
    }
  }

  // checking cols in the same row, right of myTree
  const colCount = grid[0].length;
  for (let col = y + 1; col < colCount; col++) {
    const tree = grid[x][col];

    if (tree >= myTree) {
      hiddenAngleCount++;
      break;
    }
  }

  // if the tree is not hidden from all 4 angles, then it is visible
  const isMyTreeVisible = hiddenAngleCount < 4;
  return isMyTreeVisible === isVisible;
}
