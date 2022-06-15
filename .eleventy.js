const faviconPlugin = require("eleventy-favicon");
// SASS watcher
// https://jkc.codes/blog/using-sass-with-eleventy/
module.exports = function (eleventyConfig) {
    eleventyConfig.addPassthroughCopy("src/js/tablesort.js");
    eleventyConfig.addPlugin(faviconPlugin);
    eleventyConfig.setBrowserSyncConfig({
        files: './_site/css/**/*.css'
    });
    return {
        dir: {
            input: "src",
            output: "_site"
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk'
    };
};