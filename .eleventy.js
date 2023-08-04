const markdownIt = require("markdown-it");
const marpConfig = require("./marp.config.js");
const { Marp } = require("@marp-team/marp-core");
const readCssFiles = require("./helpers/readCssFiles");
const eleventyNavigationPlugin = require("@11ty/eleventy-navigation");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy("./src/images");
  eleventyConfig.addPassthroughCopy("./src/css");
  eleventyConfig.addPassthroughCopy("./src/js");
  eleventyConfig.addWatchTarget("./themes/");
  eleventyConfig.addPlugin(eleventyNavigationPlugin);
  const md = markdownIt({ html: true });
  // Define a custom Markdown rendering engine that checks for the `marp: true`
  // flag in the page's frontmatter and uses Marp to render the content if the flag is set.
  eleventyConfig.setLibrary("md", {
    render: function (content, data) {
      if (data.marp) {
        const marp = new Marp(marpConfig);
        const themesDirectory = "./themes";
        readCssFiles(themesDirectory).forEach((themeCss) => {
          marp.themeSet.add(themeCss.content);
        });
        data.layout = "presentation";
        let { html, css, comments } = marp.render(content);
        return `<style>${css}</style>
        ${data.theme ? `<!-- theme: ${data.theme} -->` : ""}
        ${html}${comments
          .map((slideComments, index) => {
            return `<div class="bespoke-marp-note" data-index="${index}" tabindex="0">
          ${slideComments.map((comment) => `<p>${comment}</p>`).join("")}
          </div>"`;
          })
          .join("")}`;
      } else {
        return md.render(content, data);
      }
    },
  });
  return {
    dir: {
      input: "src",
      output: "public",
      markdownTemplateEngine: "njk",
    },
  };
};
