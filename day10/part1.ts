export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  const instructions = data.split("\r\n");
  let currentCycle = 1;
  let xRegister = 1;
  const signalStrengths: number[] = [];

  instructions.forEach((inst, line) => {
    const [op, increment] = inst.split(" ");
    const incCount = parseInt(increment);

    if (op === "noop") {
      currentCycle++;

      checkCycle(signalStrengths, currentCycle, xRegister);
    } else {
      currentCycle++;
      checkCycle(signalStrengths, currentCycle, xRegister);

      currentCycle++;
      xRegister += incCount;
      checkCycle(signalStrengths, currentCycle, xRegister);
    }
  });

  console.log(signalStrengths.reduce((a, b) => a + b, 0));
});

function checkCycle(
  signalStrengths: number[],
  currentCycle: number,
  xRegister: number
) {
  const wantedCycles = [20, 60, 100, 140, 180, 220];
  if (wantedCycles.includes(currentCycle)) {
    signalStrengths.push(xRegister * currentCycle);
  }
}
