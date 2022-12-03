export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data) => {
  if (err) return;

  const rucksacks = data.split("\r\n");
  const alphabet = "abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ";
  let score = 0;
  rucksacks.forEach((rucksack) => {
    const firstComp: string[] = rucksack
      .slice(0, rucksack.length / 2)
      .split("");
    const secondComp: string[] = rucksack.slice(rucksack.length / 2).split("");

    const conflictItem = firstComp.find((f) => secondComp.includes(f));
    score += alphabet.indexOf(conflictItem) + 1; // indexOf starts from 0 and we want to start from 1
    console.log(score);
  });
});
