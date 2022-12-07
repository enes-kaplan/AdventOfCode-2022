export const x = "";

const fs = require("fs");
fs.readFile("./input.txt", "utf-8", (err, data: string) => {
  if (err) return;

  const lines = data.split("\r\n");
  const dataStructure = createDataStructure(lines);
  const neededSpace = calculateNeededSpace(dataStructure);
  const searchedDirs = searchDirsWithSize(dataStructure, neededSpace, false);

  const orderedDirs = searchedDirs.sort((a, b) => a.size - b.size);
  console.log(orderedDirs[0]);
});

function createDataStructure(lines: string[]) {
  const dataStructure: any = {
    name: "/",
    size: 0,
    children: [],
  };

  let currentDirectory = [];
  lines.forEach((line) => {
    const lineSplit = line.split(" ");

    if (lineSplit[0] === "$" && lineSplit[1] === "cd") {
      if (lineSplit[2] === "/") {
        currentDirectory = [];
      } else if (lineSplit[2] === "..") {
        currentDirectory.pop();
      } else {
        currentDirectory.push(lineSplit[2]);
      }
    } else if (lineSplit[0] === "$" && lineSplit[1] === "ls") {
      // no special action, read the following lines
    } else if (lineSplit[0] === "dir") {
      let currentDepth = dataStructure;
      currentDirectory.forEach((dir) => {
        // go one level deeper for every currentDirectory item
        currentDepth = currentDepth.children.find((f) => f.name === dir);
      });

      const newDirectory = {
        name: lineSplit[1],
        size: 0,
        children: [],
      };
      currentDepth.children.push(newDirectory);
    } else {
      // the only other possibility is a file
      const fileName = lineSplit[1];
      const size = parseInt(lineSplit[0]);

      let currentDepth = dataStructure;
      dataStructure.size += size;
      currentDirectory.forEach((dir) => {
        // go one level deeper for every currentDirectory item
        // increase size of every parent directory as we go
        currentDepth = currentDepth.children.find((f) => f.name === dir);
        currentDepth.size += size;
      });

      currentDepth.children.push({
        name: fileName,
        size,
      });
    }
  });
  return dataStructure;
}

function searchDirsWithSize(
  dataStructure,
  size: number,
  isMax: boolean,
  searchedDirs = []
) {
  dataStructure.children.forEach((child) => {
    if (child.children) {
      if (isMax && child.size < size) {
        searchedDirs.push({ name: child.name, size: child.size });
      }
      if (!isMax && child.size > size) {
        searchedDirs.push({ name: child.name, size: child.size });
      }

      searchDirsWithSize(child, size, isMax, searchedDirs);
    }
  });

  return searchedDirs;
}

function calculateNeededSpace(dataStructure) {
  const totalSize = 70000000;
  const updateSize = 30000000;
  const currentFreeSpace = totalSize - dataStructure.size;
  const neededSpace = updateSize - currentFreeSpace;
  return neededSpace;
}
