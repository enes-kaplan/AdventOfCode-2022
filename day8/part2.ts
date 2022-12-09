export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  const grid = data
    .split("\r\n")
    .map((m) => m.split("")
		.map((m2) => parseInt(m2)));

  let scenicScores: { x: number; y: number; tree: number; score: number }[] =
    [];
  for (let x = 1; x < grid.length - 1; x++) {
    const row = grid[x];
    for (let y = 1; y < row.length - 1; y++) {
      const tree = grid[x][y];
      const score = calculateScenicScore(grid, x, y);
      scenicScores.push({ x, y, tree, score });
    }
  }

  const sortedScores = scenicScores.sort((a, b) => b.score - a.score);
  console.log(sortedScores[0].score);
});

function calculateScenicScore(grid: number[][], x: number, y: number) {
  const myTree = grid[x][y];

  const visionRange = { top: 0, bottom: 0, left: 0, right: 0 };

  // checking rows in the same column, above myTree
  for (let row = 1; row <= x; row++) {
    const tree = grid[x - row][y];

    visionRange.top++;
    if (tree >= myTree) {
      break;
    }
  }

  // checking rows in the same column, below myTree
  const rowCount = grid.length;
  for (let row = x + 1; row < rowCount; row++) {
    const tree = grid[row][y];

    visionRange.bottom++;
    if (tree >= myTree) {
      break;
    }
  }

  // checking cols in the same row, left of myTree
  for (let col = 1; col <= y; col++) {
    const tree = grid[x][y - col];

    visionRange.left++;
    if (tree >= myTree) {
      break;
    }
  }

  // checking cols in the same row, right of myTree
  const colCount = grid[0].length;
  for (let col = y + 1; col < colCount; col++) {
    const tree = grid[x][col];

    visionRange.right++;
    if (tree >= myTree) {
      break;
    }
  }

  return (
    visionRange.top * visionRange.bottom * visionRange.left * visionRange.right
  );
}
