export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) return;

  const elfInventories = data.split("\r\n\r\n");
  let i = 0;
  const elfObj: { i: number; cal: number }[] = elfInventories.reduce(
    (acc, currInv) => {
      const cals = currInv.split("\r\n").map((m) => parseInt(m));
      const totalCal = cals.reduce((a, b) => a + b, 0);
      acc.push({ i, cal: totalCal });
      i++;
      return acc;
    },
    []
  );

  elfObj.sort((a, b) => b.cal - a.cal);

  // this is the answer to part 1
  console.log(elfObj[0].cal);

  return elfObj;
});
