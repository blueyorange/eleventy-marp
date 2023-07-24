const markdownIt = require("markdown-it");
const { Marp } = require("@marp-team/marp-core");
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
      // const defaultTheme = fs.readFileSync("./themes/default.css", "utf-8");
      const marpit = new Marp(marpConfig);
      console.log(marpit.themeSet);
      // marpit.themeSet.default = marpit.themeSet.add(defaultTheme);
      if (data.marp) {
        let { html, css } = marpit.render(
          `<!-- theme: uncover -->\n${content}`
        );
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
