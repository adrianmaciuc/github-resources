const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: false,
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("snippets", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/snippets/**/*.md")
      .sort((a, b) => {
        const aDate = new Date(a.data.date).getTime();
        const bDate = new Date(b.data.date).getTime();
        if (Number.isNaN(aDate) || Number.isNaN(bDate)) return 0;
        return bDate - aDate;
      });
  });

  return {
    dir: {
      input: "src",
      includes: "partials",
      layouts: "layouts",
      output: "_site",
    },
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"],
  };
};
