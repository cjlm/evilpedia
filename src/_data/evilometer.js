const csv = require('csvtojson');

const { mean, extent } = require('d3-array');
const { scaleLinear } = require('d3-scale');
const { schemeBrBG } = require('d3-scale-chromatic');

module.exports = async function () {
  const episodes = await csv({ header: true, checkType: true }).fromFile(
    './src/_data/evilometer-data.csv'
  );

  const chris = episodes.map((ep) => ep.chris);
  const michael = episodes.map((ep) => ep.michael);
  const james = episodes.map((ep) => ep.james);

  const chrisColor = scaleLinear()
    .domain(extent(chris))
    .range(['green', 'white', 'red']);

  const jamesColor = scaleLinear()
    .domain(extent(james))
    .range(['green', 'white', 'red']);

  const michaelColor = scaleLinear()
    .domain(extent(michael))
    .range(['green', 'white', 'red']);

  const stats = {
    chris: {
      mean: mean(chris),
      extent: extent(chris),
    },
    michael: { mean: mean(michael), extent: extent(michael) },
    james: { mean: mean(james), extent: extent(james) },
  };

  const output = Object.fromEntries(
    episodes.map(({ ep, chris, michael, james, ...rest }) => [
      ep,
      {
        chris: Number(chris),
        michael: Number(michael),
        james: Number(james),
        chrisColor: chrisColor(chris),
        michaelColor: michaelColor(michael),
        jamesColor: jamesColor(james),
        avg: mean([chris, michael, james]),
        ...rest,
      },
    ])
  );

  return {
    ...output,
    stats,
  };
};
