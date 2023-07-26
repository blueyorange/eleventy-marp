const { Element } = require("@marp-team/marpit");
const { Marp } = require("@marp-team/marp-core");
const readCssFiles = require("./helpers/readCssFiles");

const config = {
  inlineSVG: true,
  markdown: {
    html: true,
  },
  container: [new Element("div", { id: "p" })],
};

const marp = new Marp(config);
const themesDirectory = "./themes";
readCssFiles(themesDirectory).forEach((themeCss) => {
  marp.themeSet.add(themeCss.content);
});

module.exports = marp;
