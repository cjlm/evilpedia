const vega = require('vega');
const vegalite = require('vega-lite');

const HOSTS = ['chris', 'james', 'michael'];

const makeChart = async (inputSpec) => {
  const { spec } = vegalite.compile(inputSpec);
  const renderer = { renderer: 'none' };
  const view = new vega.View(vega.parse(spec), renderer);
  return view.toSVG().catch((err) => console.error(err));
};

async function charts(episodes) {
  const values = [];
  episodes.reverse().forEach((ep) => {
    HOSTS.forEach((host) => {
      const rating = ep[host];
      if (rating) {
        values.push({
          host,
          value: Math.min(rating, 10),
          episode: ep.no,
          title: (ep.man || ep.title).trim(),
        });
      }
    });
  });

  const font = (titleFont = labelFont = subtitleFont = 'monospace');
  const config = {
    axis: { labelFont, titleFont },
    legend: {
      labelFont,
      titleFont,
      orient: 'top',
      title: false,
      layout: { top: { anchor: 'middle' } },
    },
    header: { labelFont, titleFont },
    mark: { font },
    title: { font, subtitleFont },
  };

  const scatterSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description:
      'A scatterplot showing various scores given by the hosts of Evil Men',
    data: { values },
    width: 800,
    mark: 'point',
    encoding: {
      x: {
        field: 'episode',
        type: 'quantitative',
        scale: { zero: false, title: 'Episode Number' },
      },
      y: {
        field: 'value',
        title: 'rating',
        type: 'quantitative',
        scale: { zero: false },
        axis: { label: false, title: 'Evil Rating' },
      },
      color: { field: 'host', type: 'nominal' },
      shape: { field: 'host', type: 'nominal' },
    },
    config,
  };

  const barSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description: 'A histogram plot showing the sum of scores for each evil man',
    data: { values },
    width: 800,
    mark: 'bar',
    encoding: {
      x: {
        aggregate: 'sum',
        field: 'value',
        axis: { title: 'Sum of Evil Ratings' },
      },
      y: { field: 'title', sort: '-x', axis: { title: false } },
      color: { field: 'host' },
    },
    config,
  };

  const removeWidthHeight = (str) =>
    str.replace(/(width|height)\=\"\d*"/gm, '');

  return {
    scatter: removeWidthHeight(await makeChart(scatterSpec)),
    bar: removeWidthHeight(await makeChart(barSpec)),
  };
}

module.exports = charts;
