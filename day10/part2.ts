export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  const instructions = data.split("\r\n");
  let currentCycle = 0;
  let xRegister = 1; // this is sprite's horizontal position

  const crtScreen: string[][] = [];
  for (let row = 0; row < 6; row++) {
    const rowItems: string[] = [];
    for (let col = 0; col < 40; col++) {
      rowItems.push(".");
    }
    crtScreen.push(rowItems);
  }

  instructions.forEach((inst) => {
    const [op, increment] = inst.split(" ");
    const incCount = parseInt(increment);

    checkDrawing(crtScreen, currentCycle, xRegister);
    if (op === "noop") {
      currentCycle++;
    } else {
      currentCycle++;

      checkDrawing(crtScreen, currentCycle, xRegister);
      currentCycle++;
      xRegister += incCount;
    }
  });

  printOutScreen(crtScreen);
});

function checkDrawing(crtScreen, currentCycle: number, xRegister: number) {
  const [row, col] = moduloWithDivider(currentCycle, crtScreen[0].length);

  if (col === xRegister - 1 || col === xRegister || col === xRegister + 1) {
    crtScreen[row][col] = "#";
  }
}

function moduloWithDivider(num: number, mod: number) {
  const moduloResult = num % mod;
  const divisionResult = Math.floor(num / mod);
  return [divisionResult, moduloResult];
}

function printOutScreen(crtScreen: string[][]) {
  crtScreen.forEach((row) => {
    console.log(row.join(""));
  });
}
