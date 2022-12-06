export const x = "";

type LayoutType = {
  [key: string]: string[];
};

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) return;

  const lines: string[] = data.split("\r\n");
  const seperationLine = lines.indexOf(lines.find((f) => f === ""));

  const crateRows = lines.slice(0, seperationLine - 1);
  let crateLayout = createLayout(crateRows);

  const instructionLines = lines.slice(seperationLine + 1);
  instructionLines.forEach((instruction) => {
    const [_move, howMany, _from, from, _to, to] = instruction.split(" ");
    applyInstruction(crateLayout, howMany, from, to);
  });

  const result = getResult(crateLayout);
  console.log(result);
});

function createLayout(crateRows: string[]): LayoutType {
  const crateLayout = {};

  crateRows.forEach((row) => {
    for (let i = 0; i < row.length; i += 4) {
      const col = i / 4 + 1;
      const crate = row.charAt(i + 1);
      crateLayout[col] = crateLayout[col]
        ? [...crateLayout[col], crate]
        : [crate];
    }
  });

  // removing empty crates from layout
  for (const key in crateLayout) {
    crateLayout[key] = crateLayout[key].filter((f) => f !== " ");
  }

  return crateLayout;
}

function applyInstruction(
  crateLayout: LayoutType,
  howMany: string,
  from: string,
  to: string
) {
  const movedCrates = crateLayout[from].splice(0, parseInt(howMany));
  crateLayout[to] = [...movedCrates, ...crateLayout[to]];
}

function getResult(crateLayout: LayoutType) {
  let result = "";

  for (const key in crateLayout) {
    const col = crateLayout[key];
    if (col.length > 0) result += col[0];
  }

  return result;
}
