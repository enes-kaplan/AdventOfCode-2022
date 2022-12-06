export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  for (let i = 0; i < data.length; i++) {
    const isMarkerStart = checkMarkerStart(data, i);
    if (isMarkerStart) {
      console.log(i + 4);
      break;
    }
  }
});

function checkMarkerStart(data: string, i: number) {
  const charArr = data.slice(i, i + 4).split("");
  return new Set(charArr).size === charArr.length; // this will return true if all chars are unique
}
