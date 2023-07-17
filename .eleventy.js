const { Marpit } = require("@marp-team/marpit");
const markdownIt = require("markdown-it");
const marpConfig = require("./marp.config.js");

module.exports = function (eleventyConfig) {
  const md = markdownIt({ html: true });

  // Define a custom Markdown rendering engine that checks for the `marp: true`
  // flag in the page's frontmatter and uses Marp to render the content if the flag is set.
  eleventyConfig.setLibrary("md", {
    render: function (content, data) {
      if (data.marp) {
        const marpit = new Marpit(marpConfig);
        const { html, css } = marpit.render(content, { html: true });
        return { html, css };
      } else {
        return md.render(content, data);
      }
    },
  });
  return {
    dir: {
      input: "src",
      output: "public",
    },
  };
};
