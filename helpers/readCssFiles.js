const fs = require("fs");
const path = require("path");

const readCssFiles = (directoryPath) => {
  try {
    const files = fs.readdirSync(directoryPath);
    const cssFiles = files.filter((file) => path.extname(file) === ".css");
    const themesArray = [];

    for (const cssFile of cssFiles) {
      const filePath = path.join(directoryPath, cssFile);
      const content = fs.readFileSync(filePath, "utf8");
      themesArray.push({ fileName: cssFile, content });
    }

    return themesArray;
  } catch (err) {
    console.error("Error:", err);
    return [];
  }
};

module.exports = readCssFiles;
