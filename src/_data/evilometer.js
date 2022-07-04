const csv = require('csvtojson');

const { mean, extent } = require('d3-array');
const { scaleSequential, scaleLinear, scaleQuantile } = require('d3-scale');
const { interpolatePiYG } = require('d3-scale-chromatic');

const HOSTS = ['chris', 'james', 'michael'];

module.exports = async function () {
  const episodes = await csv({ header: true, checkType: true }).fromFile(
    './src/_data/evilometer-data.csv'
  );

  const values = {};
  const colorFns = {};
  const stats = {};

  HOSTS.forEach((host) => {
    values[host] = episodes.map((ep) => Number(ep[host]));
    stats[host] = {
      mean: mean(values[host]),
      extent: extent(values[host].filter((val) => Number(val) < 20)),
    };
    colorFns[host] = scaleSequential()
      // interpolatePiYG
      // scaleLinear()
      // scaleQuantile()
      .range(['white', '#69b3a2'])
      .domain(stats[host].extent);

    console.log(stats[host]);
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
