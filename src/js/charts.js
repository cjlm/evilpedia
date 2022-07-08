const vega = require('vega');
const vegalite = require('vega-lite');

const HOSTS = ['chris', 'james', 'michael'];

async function charts(episodes) {
  const values = [];
  episodes.reverse().forEach((ep) => {
    HOSTS.forEach((host) => {
      const rating = ep[host];
      if (rating) {
        values.push({ host, value: Math.min(rating, 10), episode: ep.no });
      }
    });
  });

  const font = (titleFont = labelFont = subtitleFont = 'monospace');

  const chartSpec = {
    $schema: 'https://vega.github.io/schema/vega-lite/v5.json',
    description:
      'A scatterplot showing various scores given by the hosts of Evil Men',
    data: { values },
    width: 800,
    // height: 200,
    mark: 'point',
    encoding: {
      x: {
        field: 'episode',
        type: 'quantitative',
        scale: { zero: false },
      },
      y: {
        field: 'value',
        title: 'rating',
        type: 'quantitative',
        scale: { zero: false },
      },
      color: { field: 'host', type: 'nominal' },
      shape: { field: 'host', type: 'nominal' },
    },
    config: {
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
    },
  };

  const { spec } = vegalite.compile(chartSpec);

  const renderer = { renderer: 'none' };
  const view = new vega.View(vega.parse(spec), renderer);

  return { scatter: await view.toSVG().catch((err) => console.error(err)) };
}

module.exports = charts;
