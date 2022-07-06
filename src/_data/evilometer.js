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
      ratings: values[host],
      mean: mean(values[host]),
      extent: extent(values[host].filter((val) => Number(val) < 20)),
    };
    colorFns[host] = scaleSequential()
      // interpolatePiYG
      // scaleLinear()
      // scaleQuantile()
      .range(['white', 'hsl(0, 89%, 32%)'])
      .domain(stats[host].extent);
  });

  const computedEps = episodes.map(
    ({ ep, chris, michael, james, ...rest }) => ({
      ep,
      chris,
      james,
      michael,
      chrisColor: colorFns.chris(chris),
      jamesColor: colorFns.james(james),
      michaelColor: colorFns.michael(michael),
      avg: Number(mean([chris, michael, james])),
      ...rest,
    })
  );

  colorFns.average = scaleSequential()
    .range(['white', 'hsl(0, 89%, 32%)'])
    // .domain([extent(computedEps.map((ep) => ep.avg))]);
    .domain([0, 10]);

  const ratings = computedEps
    .map((data) => ({
      ...data,
      averageColor: colorFns.average(data.avg),
    }))
    .reverse();

  return { ratings, stats };
};
