const sass = require('sass');
const path = require('node:path');

const fs = require('fs');

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/js/tablesort.js');
  eleventyConfig.addPlugin(faviconPlugin);

  eleventyConfig.addTemplateFormats('scss');
  eleventyConfig.addExtension('scss', {
    outputFileExtension: 'css',

    compile: async function (inputContent, inputPath) {
      let parsed = path.parse(inputPath);
      let result = sass.compileString(inputContent, {
        loadPaths: [parsed.dir || '.', this.config.dir.includes],
      });

      return async (data) => result.css;
    },

    compileOptions: {
      permalink: function (contents, inputPath) {
        let parsed = path.parse(inputPath);

        if (parsed.name.startsWith('_')) {
          return false;
        }
        return `${parsed.name}.css`;
      },
    },
  });

  eleventyConfig.addFilter('nan', function (num) {
    if (isNaN(num)) {
      return '';
    }
    return num;
  });

  return {
    dir: {
      input: 'src',
      output: '_site',
    },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
