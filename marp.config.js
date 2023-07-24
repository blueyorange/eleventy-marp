const { Element } = require("@marp-team/marpit");

module.exports = {
  inlineSVG: true,
  markdown: {
    html: true,
  },
  theme: "gaia",
  container: [new Element("div", { id: "p" })],
};
