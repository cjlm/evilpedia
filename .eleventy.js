// SASS watcher
// https://jkc.codes/blog/using-sass-with-eleventy/
module.exports = function (eleventyConfig) {
    eleventyConfig.setBrowserSyncConfig({
        files: './public/css/**/*.css'
    });
    return {
        dir: {
            input: "src",
            ouput: "public"
        },
        templateFormats: ['md', 'njk', 'html'],
        markdownTemplateEngine: 'njk',
        htmlTemplateEngine: 'njk',
        dataTemplateEngine: 'njk'
    };
};