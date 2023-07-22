const markdownIt = require("markdown-it");
const { Marpit } = require("@marp-team/marpit");
const marpConfig = require("./marp.config.js");
const fs = require("fs");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addWatchTarget("./themes/");
  const md = markdownIt({ html: true });
  // Define a custom Markdown rendering engine that checks for the `marp: true`
  // flag in the page's frontmatter and uses Marp to render the content if the flag is set.
  eleventyConfig.setLibrary("md", {
    render: function (content, data) {
      const defaultTheme = fs.readFileSync("./themes/default.css", "utf-8");
      const marpit = new Marpit(marpConfig);
      marpit.themeSet.default = marpit.themeSet.add(defaultTheme);
      if (data.marp) {
        let { html, css } = marpit.render(content);
        return `<style>${css}</style>${html}`;
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
