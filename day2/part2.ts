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
// we are still assuming X is Rock, Y is Paper, Z is scissors
const meMapping = {
  X: {
    A: "Z",
    B: "X",
    C: "Y",
  },
  Y: {
    A: "X",
    B: "Y",
    C: "Z",
  },
  Z: {
    A: "Y",
    B: "Z",
    C: "X",
  },
};
const outcomeScores = {
  X: 0,
  Y: 3,
  Z: 6,
};
const resolveMatchup = (matchup: string[]): number => {
  let matchupScore = 0;

  const opponent = matchup[0];
  const outcome = matchup[1];

  matchupScore += outcomeScores[outcome];
  const me = meMapping[outcome][opponent];

  matchupScore += letterScore[me];

  return matchupScore;
};
