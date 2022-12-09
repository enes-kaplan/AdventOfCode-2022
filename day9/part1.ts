export const x = "";

type Position = {
  x: number;
  y: number;
};

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  const headInstructions = data.split("\r\n");
  const headPos: Position = { x: 0, y: 0 };
  const tailPos: Position = { x: 0, y: 0 };
  const tailPositionHistory: Position[] = [{ x: 0, y: 0 }];

  headInstructions.forEach((inst) => {
    const [direction, distance] = inst.split(" ");
    for (let i = 0; i < parseInt(distance); i++) {
      applyInstruction(headPos, direction);

      applyTailMovement(headPos, tailPos);
      tailPositionHistory.push({ ...tailPos });
    }
  });

  const uniqueTailPositions: Position[] = [];
  tailPositionHistory.forEach((pos) => {
    const existingPos = uniqueTailPositions.find(
      (f) => f.x == pos.x && f.y === pos.y
    );
    if (!existingPos) uniqueTailPositions.push(pos);
  });
  console.log(uniqueTailPositions.length);
});

function applyInstruction(pos: Position, dir: string) {
  if (dir === "R") {
    pos.y++;
  } else if (dir === "L") {
    pos.y--;
  } else if (dir === "U") {
    pos.x++;
  } else if (dir === "D") {
    pos.x--;
  }
}

function applyTailMovement(headPos: Position, tailPos: Position) {
  if (
    Math.abs(headPos.x - tailPos.x) <= 1 &&
    Math.abs(headPos.y - tailPos.y) <= 1
  ) {
    // if  head and tail are touching, don't move tail
    return;
  }

  if (headPos.x - tailPos.x > 1) {
    tailPos.x++;
    if (tailPos.y !== headPos.y) {
      tailPos.y = headPos.y;
    }
  } else if (headPos.x - tailPos.x < -1) {
    tailPos.x--;
    if (tailPos.y !== headPos.y) {
      tailPos.y = headPos.y;
    }
  } else if (headPos.y - tailPos.y > 1) {
    tailPos.y++;
    if (tailPos.x !== headPos.x) {
      tailPos.x = headPos.x;
    }
  } else if (headPos.y - tailPos.y < -1) {
    tailPos.y--;
    if (tailPos.x !== headPos.x) {
      tailPos.x = headPos.x;
    }
  }
}
