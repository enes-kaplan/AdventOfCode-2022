export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) return;

  const pairs: string[] = data.split("\r\n");
  let fullPairs = 0;
  pairs.forEach((p) => {
    const pair = p.split(",");
    const pairOneRange = pair[0].split("-").map((m) => parseInt(m));
    const pairTwoRange = pair[1].split("-").map((m) => parseInt(m));

    if (
      (pairOneRange[0] >= pairTwoRange[0] && pairOneRange[1] <= pairTwoRange[1]) ||
      (pairTwoRange[0] >= pairOneRange[0] && pairTwoRange[1] <= pairOneRange[1])
    ) {
      fullPairs++;
    }
  });

  console.log(fullPairs);
});
