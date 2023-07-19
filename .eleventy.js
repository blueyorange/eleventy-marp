// import markdownIt from "markdown-it";
// import Marpit from "@marp-team/marpit";
// import marpConfig from "./marp.config.js";

const markdownIt = require("markdown-it");
const { Marp, Element } = require("@marp-team/marp-core");
const marpConfig = require("./marp.config.js");

module.exports = function (eleventyConfig) {
  const md = markdownIt({ html: true });

  // Define a custom Markdown rendering engine that checks for the `marp: true`
  // flag in the page's frontmatter and uses Marp to render the content if the flag is set.
  eleventyConfig.setLibrary("md", {
    render: function (content, data) {
      if (data.marp) {
        const marp = new Marp({ ...marpConfig });
        let { html, css } = marp.render(content, { html: true });
        html = html.replace(
          '<div class="marpit"',
          '<div class="marpit" id="p"'
        );
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
