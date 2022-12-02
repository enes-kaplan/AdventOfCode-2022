export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) return;

  const matchups: string[] = data.split("\r\n");
  let myScore = 0;
  matchups.forEach((m) => {
    const mArray = m.split(" ");
    myScore += resolveMatchup(mArray);
  });

  console.log("Final score", myScore);
  return myScore;
});

const letterScore = {
  X: 1,
  Y: 2,
  Z: 3,
};
const scoreMapping = {
  X: {
    A: 3,
    B: 0,
    C: 6,
  },
  Y: {
    A: 6,
    B: 3,
    C: 0,
  },
  Z: {
    A: 0,
    B: 6,
    C: 3,
  },
};
const resolveMatchup = (matchup: string[]): number => {
  let matchupScore = 0;

  const opponent = matchup[0];
  const me = matchup[1];

  matchupScore += scoreMapping[me][opponent];
  matchupScore += letterScore[me];

  return matchupScore;
};
