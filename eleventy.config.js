const syntaxHighlight = require("@11ty/eleventy-plugin-syntaxhighlight");
const markdownIt = require("markdown-it");

module.exports = function (eleventyConfig) {
  eleventyConfig.addPlugin(syntaxHighlight);
  eleventyConfig.addPassthroughCopy({ "src/assets": "assets" });

  const md = markdownIt({
    html: true,
    linkify: true,
    typographer: false,
  });

  eleventyConfig.setLibrary("md", md);

  eleventyConfig.addCollection("snippets", (collectionApi) => {
    return collectionApi
      .getFilteredByGlob("src/content/snippets/**/*.md")
      .filter((item) => item.inputPath.includes("/snippets/"))
      .sort((a, b) => {
        const aDate = new Date(a.data.date).getTime();
        const bDate = new Date(b.data.date).getTime();
        if (Number.isNaN(aDate) || Number.isNaN(bDate)) return 0;
        return bDate - aDate;
      });
  });

  // Determine pathPrefix intelligently:
  // - If a CNAME file exists at the repository root we assume this is a
  //   GitHub Pages custom domain build and serve assets from the site root
  //   (i.e. pathPrefix = "/").
  // - Otherwise fall back to the repo-based path used previously. You can
  //   also override the value by setting the PATH_PREFIX environment variable.
  const fs = require("fs");
  const path = require("path");
  const repoPathPrefix = process.env.PATH_PREFIX || "/github-resources/";
  const cnamePath = path.join(process.cwd(), "CNAME");
  const pathPrefix = fs.existsSync(cnamePath) ? "/" : repoPathPrefix;

  return {
    dir: {
      input: "src",
      includes: "partials",
      layouts: "layouts",
      output: "_site",
    },
    pathPrefix,
    markdownTemplateEngine: "njk",
    htmlTemplateEngine: "njk",
    templateFormats: ["md", "njk"],
  };
};
