const { Element } = require("@marp-team/marpit");

module.exports = {
  inlineSVG: true,
  markdown: {
    html: true,
  },
  theme: "default",
  container: [new Element("div", { id: "p" })],
};
