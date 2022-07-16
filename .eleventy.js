const sass = require('sass');
const path = require('node:path');

const fs = require('fs');

const tablesortPath = require.resolve('tablesort');
const tablesortNumberPath = require.resolve(
  'tablesort/dist/sorts/tablesort.number.min.js'
);

module.exports = function (eleventyConfig) {
  eleventyConfig.addPassthroughCopy('src/robots.txt');
  eleventyConfig.addPassthroughCopy('src/js/*');
  eleventyConfig.addPassthroughCopy('src/fonts/*');
  eleventyConfig.addPassthroughCopy('src/favicon/*');

  eleventyConfig.addPassthroughCopy({
    [tablesortPath]: 'js/tablesort.min.js',
    [tablesortNumberPath]: 'js/tablesort.number.min.js',
  });

  eleventyConfig.addPassthroughCopy('src/background.svg');

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

  eleventyConfig.addFilter('nan', (n) => (isNaN(n) || n === '' ? '' : n));
  eleventyConfig.addFilter('rating', (n) => (n === undefined ? '?' : n));

  return {
    dir: { input: 'src', output: '_site' },
    templateFormats: ['md', 'njk', 'html'],
    markdownTemplateEngine: 'njk',
    htmlTemplateEngine: 'njk',
    dataTemplateEngine: 'njk',
  };
};
