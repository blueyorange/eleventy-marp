const { Element } = require("@marp-team/marpit");

const config = {
  inlineSVG: true,
  markdown: {
    html: true,
  },
  container: [new Element("div", { id: "p" })],
};

module.exports = config;
