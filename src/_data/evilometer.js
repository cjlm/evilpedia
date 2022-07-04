const csv = require('csvtojson');

const { mean, extent } = require('d3-array');
const { scaleLinear } = require('d3-scale');
const { schemePiYG } = require('d3-scale-chromatic');

const HOSTS = ['chris', 'james', 'michael'];

module.exports = async function () {
  const episodes = await csv({ header: true, checkType: true }).fromFile(
    './src/_data/evilometer-data.csv'
  );

  const values = {};
  const colorFns = {};
  const stats = {};

  HOSTS.forEach((host) => {
    values[host] = episodes.map((ep) => ep[host]);

    colorFns[host] = scaleLinear()
      .domain(extent(values[host]))
      .range(schemePiYG[7]);

    stats[host] = { mean: mean(values[host]), extent: extent(values[host]) };
  });

  const output = Object.fromEntries(
    episodes.map(({ ep, chris, michael, james, ...rest }) => [
      ep,
      {
        chris,
        james,
        michael,
        chrisColor: colorFns.chris(chris),
        jamesColor: colorFns.james(james),
        michaelColor: colorFns.michael(michael),
        avg: mean([chris, michael, james]),
        ...rest,
      },
    ])
  );

  return { ...output, stats };
};
