export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  const markerLength = 14;
  for (let i = 0; i < data.length - markerLength; i++) {
    const isMessageMarker = checkForMarker(data, i, markerLength);
    if (isMessageMarker) {
      console.log(i + markerLength);
      break;
    }
  }
});

function checkForMarker(data: string, i: number, length: number) {
  const charArr = data.slice(i, i + length).split("");
  return new Set(charArr).size === charArr.length; // this will return true if all chars are unique
}
