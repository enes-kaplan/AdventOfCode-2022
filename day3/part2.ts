export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) return;

  const rucksacks: string[] = data.split("\r\n");

  const groupedRucksacks = rucksacks.reduce((acc: string[][][], curr, i) => {
    const rucksackItems = curr.split("");
    if (i % 3 === 0) {
      acc.push([rucksackItems]);
    } else {
      acc[acc.length - 1].push(rucksackItems);
    }

    return acc;
  }, []);

  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let score = 0;
  groupedRucksacks.forEach((group, i) => {
    const commonItem = group[0].find(
      (f) => group[1].includes(f) && group[2].includes(f)
    );
    score += alphabet.indexOf(commonItem) + 1; // indexOf starts from 0 and we want to start from 1
  });
  console.log(score);
});
