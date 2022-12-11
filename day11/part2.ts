export const x = "";

type OperationParam = "old" | number;
type OperationOperator = "+" | "*";
type Monkey = {
  inspectCount: number;
  no: number;
  items: number[];
  p1: OperationParam;
  op: OperationOperator;
  p2: OperationParam;
  divisible: number;
  trueThrow: number;
  falseThrow: number;
};
let monkeys: Monkey[] = [];
let greatestCommonFactor = 0;

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  const monkeyInstructions = data.split("\r\n\r\n");
  monkeys = parseMonkeyInstructions(monkeyInstructions);
  calcGreatestCommonFactor(monkeys);

  let roundCount = 10000;
  for (let round = 0; round < roundCount; round++) {
    playRound(monkeys);
  }

  const monkeyBusiness = calculateMonkeyBusiness();
  // 10.197 for 20 rounds
  console.log(monkeyBusiness);
});
function parseMonkeyInstructions(monkeyInstructions: string[]) {
  const monkeys: Monkey[] = [];

  monkeyInstructions.forEach((inst) => {
    const [noLine, itemsLine, operationLine, testLine, trueLine, falseLine] =
      inst.split("\r\n");

    const no = parseInt(noLine.split(" ")[1].replace(":", ""));

    const items = itemsLine
      .split(": ")[1]
      .split(" ")
      .map((m) => parseInt(m));

    const [param1, operator, param2] = operationLine
      .split("new = ")[1]
      .split(" ");

    const divisible = parseInt(testLine.split("by ")[1]);
    const trueThrow = parseInt(trueLine.split("monkey ")[1]);
    const falseThrow = parseInt(falseLine.split("monkey ")[1]);

    monkeys.push({
      inspectCount: 0,
      no,
      items,
      p1: param1 as OperationParam,
      op: operator as OperationOperator,
      p2: param2 as OperationParam,
      divisible,
      trueThrow,
      falseThrow,
    });
  });

  return monkeys;
}

function playRound(monkeys: Monkey[]) {
  monkeys.forEach((monkey) => {
    playTurn(monkey);
  });
}

function playTurn(monkey: Monkey) {
  const itemIteration = monkey.items.length;
  for (let i = 0; i < itemIteration; i++) {
    let item = monkey.items[0];
    monkey.inspectCount++;

    item = inspectItem(item, monkey.p1, monkey.op, monkey.p2);
    item = boredWithItem(item);
    testItem(monkey, item);
  }
}

function inspectItem(
  item: number,
  _p1: OperationParam,
  op: OperationOperator,
  p2: OperationParam
) {
  const it = item as number;
  const param2 = p2 === "old" ? item : p2;

  // weird bug with types, had to parseInt
  if (op === "+") return item + parseInt(param2.toString());
  else return it * parseInt(param2.toString());
}

function boredWithItem(item: number) {
  return item % greatestCommonFactor;
}

function testItem(monkey: Monkey, item: number) {
  const isTestSuccessful = item % monkey.divisible === 0;
  if (isTestSuccessful)
    monkeys[monkey.trueThrow].items = [
      ...monkeys[monkey.trueThrow].items,
      item,
    ];
  else
    monkeys[monkey.falseThrow].items = [
      ...monkeys[monkey.falseThrow].items,
      item,
    ];

  monkey.items.splice(0, 1);
}

function calculateMonkeyBusiness() {
  const sortedByInspect = monkeys.sort(
    (a, b) => b.inspectCount - a.inspectCount
  );
  console.log(sortedByInspect.map((m) => m.inspectCount));
  return sortedByInspect[0].inspectCount * sortedByInspect[1].inspectCount;
}

function calcGreatestCommonFactor(monkeys: Monkey[]) {
  const sortedNumbers = monkeys.map((m) => m.divisible).sort((a, b) => b - a);

  greatestCommonFactor = sortedNumbers[0];
  while (true) {
    greatestCommonFactor++;
    const isGreatestCommonFactor = sortedNumbers.every(
      (n) => greatestCommonFactor % n === 0
    );
    if (isGreatestCommonFactor) break;
  }

  return greatestCommonFactor;
}
